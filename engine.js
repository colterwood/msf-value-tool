/*
 * MSF Store Value engine.
 *
 * Pure functions only: no DOM, no storage. Loaded by the browser page as
 * window.MSFEngine and by Node tests via module.exports.
 *
 * Value table shape (see data/values.js):
 *   {
 *     meta: {
 *       currency: "CAD",              // the money every value is in: the store's own currency
 *       fxToUsd: { CAD: 1 },          // other price currencies, in units of meta.currency (the name is historical)
 *       grades: [{ min: 1.5, label: "Excellent" }, ...], // by value per unit of price, descending
 *       valueMultipliers: {},         // optional discount by item category, e.g. { orb: 0.2 }; none by default
 *       shardRules: { maxedMultiplier: 0 }
 *     },
 *     items: {
 *       "gold": { name: "Gold", category: "currency", per: 1000000, value: 0.83, coreValue: 6.4, aliases: [], id: "SC",
 *                 observed: { perCash: 1200480, perCore: 150000, basis: "own", days: ["2026-10-18", "2026-10-24"], firstSeen: false } },
 *                       // value: money for `per` units at the item's usual price; coreValue: Ultra Cores for `per` units.
 *                       // observed.perCash / perCore: usual units per CA$ / per Ultra Core, from the player's own
 *                       // store reads before the one being rated (tools/market.js). basis: "own" (sold on its own)
 *                       // or "set" (only sold together with other things, the price split evenly). An item that
 *                       // only comes beside things sold on their own has no value at all. days: the read days the
 *                       // usual price is the middle of. firstSeen: no earlier read carried it.
 *                       // id (and ids: [...]) is the store's own resource id: an offer line that carries one resolves by it.
 *       "shard:iron man": { name: "Iron Man shards", category: "shard", character: "Iron Man", per: 1, value: 0.2 },
 *       "points:iron_vengeance": { name: "...", category: "points", excludeFromValue: true }
 *     }
 *   }
 *   Names with "Usd" in this file (priceUsd, totalUsd, perDollar) are historical: the amounts are in
 *   meta.currency, or in Ultra Cores when an offer is valued with options.mode "cores".
 *
 * Offer shape (see data/offers.js and README):
 *   { name, price, currency, ultraCores, purchaseLimit, expires, source, notes,
 *     // ultraCores: what the same offer costs in Ultra Cores, when the store gives that price
 *     contents: [{ item: "Gold", qty: 500000 }, { key: "shard:iron man", qty: 50 }, { item: "Gold", id: "SC", qty: 1 }],
 *     chain: {                        // optional: one step of a chain offer
 *       name: "Kestrel", step: 3, of: 4, current: 1,   // current = first step still unbought
 *       steps: [{ step: 1, name, price, currency, contents }, ...]  // every step of the chain
 *     } }
 *   A step cannot be bought before the steps ahead of it. result.chain always carries the whole
 *   path to a step beyond `current` (steps current..step together). By default
 *   (options.chainMode "step") every step is ranked and graded on its own; with chainMode
 *   "path" a step beyond `current` is ranked and graded on that path instead.
 *
 * Roster shape (see data/roster.js):
 *   { characters: { "Iron Man": { stars: 7, redStars: 5, gearTier: 17 } } }
 *
 * Plan shape (see data/personal.js): what the player builds and what they are short of.
 *   {
 *     characters: { "Iron Man": {} },        // the build list, keyed by roster name
 *     offListMultiplier: 0,                   // character-bound items for anyone else count this much
 *     surplusMultiplier: 0.25,                // resources marked surplus count this much
 *     uselessMultiplier: 0,                   // resources marked useless count this much
 *     resources: { "gold": { status: "short", need: 1, have: 0, note: "..." } },  // by value-table key
 *                       // status: "short" (full), "surplus", "useless"; multiplier (optional) overrides the status
 *     resourceRules: [{ category: "iso8", pattern: "\\bT4\\b", status: "surplus", note: "..." }]
 *                       // pattern: regex on the item name; keyPattern (optional): regex on the table key;
 *                       // status or multiplier as above
 *   }
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.MSFEngine = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var DEFAULT_GRADES = [
    { min: 3, label: 'Excellent' },
    { min: 2, label: 'Good' },
    { min: 1, label: 'Fair' },
    { min: 0, label: 'Poor' }
  ];

  var DEFAULT_SHARD_RULES = {
    // Multiplier applied to shards of a character the roster already has at 7 stars.
    maxedMultiplier: 0,
    // Star count that counts as maxed.
    maxStars: 7
  };

  var DEFAULT_PLAN_RULES = { uselessMultiplier: 0,
    offListMultiplier: 0,
    surplusMultiplier: 0.25
  };

  /** A baseline that the table flags with a count of observations below this is shown but not counted. */
  var DEFAULT_MIN_OBSERVATIONS = 5;

  function normalizeKey(s) {
    return String(s == null ? '' : s)
      .trim()
      .toLowerCase()
      .replace(/['’]/g, '')
      .replace(/[\s_\-]+/g, ' ')
      .replace(/\s*\(\s*/g, ' (')
      .replace(/\s*\)\s*/g, ') ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function isTable(table) {
    return !!(table && typeof table === 'object' && table.items && typeof table.items === 'object');
  }

  /** Every store resource id a row answers to: item.id and item.ids. */
  function itemIds(item) {
    var out = [];
    if (!item) return out;
    var add = function (x) { if (x != null && x !== '' && out.indexOf(String(x)) === -1) out.push(String(x)); };
    add(item.id);
    (Array.isArray(item.ids) ? item.ids : []).forEach(add);
    return out;
  }

  /** Event milestone points and Strike Points by the store's resource id: never counted. */
  function isPointsId(id) {
    return /^BFYB-CUR$/.test(String(id)) || /^EVTA_/.test(String(id));
  }

  /**
   * Pass tiers, pass upgrades, Time Heist levels and trial unlocks: the store gives them an id but
   * no contents. Nothing to price.
   */
  function isOpaqueId(id) {
    return /^(BPEPASS|BPETIER|BPPASS|BPTIER|TIMEHEIST_LEVEL|UT_)/.test(String(id));
  }

  /** alias (normalized) -> item key. Keys, names and aliases all resolve; a store resource id resolves as '#' + id. */
  function buildIndex(table) {
    var index = {};
    if (!isTable(table)) return index;
    Object.keys(table.items).forEach(function (key) {
      var item = table.items[key] || {};
      var names = [key, item.name].concat(item.aliases || []);
      if (item.character && item.category === 'shard') {
        names.push(item.character + ' shards');
        names.push(item.character + ' shard');
        names.push(item.character);
      }
      names.forEach(function (n) {
        var k = normalizeKey(n);
        if (k && !(k in index)) index[k] = key;
      });
      itemIds(item).forEach(function (id) {
        if (!(('#' + id) in index)) index['#' + id] = key;
      });
    });
    return index;
  }

  /**
   * Resolve a free-text item name or an explicit key to a table entry.
   * Returns { key, item } or null when nothing matches.
   */
  /**
   * An item priced from another by a fixed ratio, for levels with no price of their own:
   *   derivedFrom: { key: 'training_module:l4', ratio: 0.5, basis: 'XP' }
   * says an L3 Training Module is worth half an L4 (800 of 1,600 XP). The base's observed
   * baseline carries over, so the derived item is scored whenever the base is, and the line is
   * noted as derived. An item with a value of its own (typed in, or in the table) is left alone.
   */
  function deriveItem(table, key) {
    var item = isTable(table) ? table.items[key] : null;
    if (!item) return null;
    var d = item.derivedFrom;
    if (!d || !d.key || unitValue(item) != null || coreUnitValue(item) != null) return item;
    var base = table.items[d.key];
    var ratio = Number(d.ratio);
    if (!base || base === item || !(ratio > 0)) return item;
    var buv = unitValue(base);
    var per = Number(item.per || 1);
    if (!(per > 0)) per = 1;
    var bo = base.observed || {};
    var basis = d.basis || null;
    var note = 'priced from ' + (base.name || d.key) + (basis === 'XP' && item.xp != null && base.xp != null
      ? ' by XP (' + item.xp + ' vs ' + base.xp + ')'
      : ' at ' + ratio + ' of its value' + (basis ? ' by ' + basis : ''));
    var out = Object.assign({}, item);
    var bcv = coreUnitValue(base);
    var baseCash = usualPer(base, 'cash'), baseCore = usualPer(base, 'cores');
    out.value = buv == null ? null : buv * ratio * per;
    out.coreValue = bcv == null ? null : bcv * ratio * per;
    out.observed = Object.assign({}, item.observed || {}, {
      perUsd: bo.perUsd != null && !isNaN(Number(bo.perUsd)) ? Number(bo.perUsd) / ratio : null,
      perCash: baseCash != null ? baseCash / ratio : null,
      perCore: baseCore != null ? baseCore / ratio : null,
      basis: bo.basis, firstSeen: bo.firstSeen,
      observations: bo.observations, days: bo.days, readAt: bo.readAt,
      earlyEstimate: bo.earlyEstimate, suspect: bo.suspect,
      note: note
    });
    if (base.userValue) out.userValue = true;   // a value typed for the base is trusted for the levels priced from it too
    out.derived = { from: d.key, fromName: base.name || d.key, ratio: ratio, basis: basis, note: note };
    return out;
  }

  /** Every item of the table with derived values filled in. */
  function itemsOf(table) {
    var out = {};
    if (!isTable(table)) return out;
    Object.keys(table.items).forEach(function (k) { out[k] = deriveItem(table, k); });
    return out;
  }

  /**
   * Event milestone points the table does not list: every event brings a new name ("Feast of
   * Shadows Milestone Points") and they are never counted, so an offer that
   * carries them is not incomplete for it. A table row with the same name takes precedence.
   */
  function genericPoints(name) {
    return { name: String(name).trim(), category: 'points', per: 1, value: null, aliases: [], excludeFromValue: true, generic: true, note: 'event milestone points: not counted' };
  }

  /**
   * Shards of a character the table has no row for. The store labels a shard line with the
   * character portrait and a count ("Dracula x810"), so valueOffer reads a bare roster name
   * with a count above one as that character's shards: unpriced until the table gets a row.
   */
  function genericShards(character) {
    var c = String(character).trim();
    return { name: c + ' shards', category: 'shard', character: c, per: 1, value: null, aliases: [], generic: true };
  }

  function resolveItem(table, index, nameOrKey) {
    if (!isTable(table) || nameOrKey == null) return null;
    var raw = String(nameOrKey);
    if (Object.prototype.hasOwnProperty.call(table.items, raw)) {
      return { key: raw, item: deriveItem(table, raw) };
    }
    var k = normalizeKey(raw);
    if (!k) return null;
    index = index || buildIndex(table);
    if (Object.prototype.hasOwnProperty.call(index, k)) {
      return { key: index[k], item: deriveItem(table, index[k]) };
    }
    // Common store phrasing: "50x Iron Man shards", "Iron Man Shard x50", "Iron Man character shards"
    var stripped = k
      .replace(/^\d+\s*x\s*/, '')
      .replace(/\s*x\s*\d+$/, '')
      .replace(/\bcharacter shards?\b/, 'shards')
      .replace(/\bshard\b/, 'shards')
      .trim();
    if (stripped !== k && Object.prototype.hasOwnProperty.call(index, stripped)) {
      return { key: index[stripped], item: deriveItem(table, index[stripped]) };
    }
    var pts = /^(.+?) milestone points$/.exec(stripped);   // "50x Feast of Shadows Milestone Points" keys like the plain name
    if (pts) return { key: 'points:' + pts[1].replace(/\s+/g, '_'), item: genericPoints(raw.trim().replace(/^\d+\s*x\s*/i, '').replace(/\s*x\s*\d+$/i, '')) };
    return null;
  }

  /**
   * Resolve one offer line. A line read from the store page's own data carries the store's
   * resource id, which names the item exactly: the row with that id wins, then the name. An id
   * the table has no row for still says what kind of thing it is: points are never counted and
   * SHARD_ ids are that character's shards.
   */
  function resolveLine(table, index, row) {
    var id = row && row.id != null && row.id !== '' ? String(row.id) : '';
    var label = (row && (row.key || row.item)) || '';
    if (id && isTable(table)) {
      index = index || buildIndex(table);
      var k = index['#' + id];
      if (k != null && Object.prototype.hasOwnProperty.call(table.items, k)) return { key: k, item: deriveItem(table, k) };
    }
    var byName = resolveItem(table, index, label);
    if (!id) return byName;
    // an id the table has no row for still says what kind of thing it is: a row found by the
    // name only counts when it is that kind (a promotion named after a character is not her shards)
    var kind = isOpaqueId(id) ? 'opaque' : isPointsId(id) ? 'points' : /^SHARD_/.test(id) ? 'shard' : /^(RS|PD)_.+_\d+$/.test(id) ? 'promotion' : null;
    if (byName && kind) {
      var it = byName.item || {};
      var fits = kind === 'points' ? !!it.excludeFromValue : kind === 'shard' ? it.category === 'shard' : kind === 'promotion' ? it.category === 'promotion' : false;
      if (!fits) byName = null;
    }
    if (byName) return byName;
    var shown = String(label || id).trim();
    if (kind === 'points') return { key: 'points:' + normalizeKey(shown).replace(/ milestone points$/, '').replace(/\s+/g, '_'), item: genericPoints(shown) };
    if (kind === 'shard' && label) {
      var who = String(label).trim().replace(/\s+shards?$/i, '');
      return { key: 'shard:' + normalizeKey(who), item: genericShards(who) };
    }
    return null;
  }

  /**
   * The parts of an offer's notes that mean the card did not show everything the price buys:
   * "+N More" or an icon with no name. A count the card did not show ("qty unreadable for X") is
   * judged line by line in valueOffer instead, so an unreadable count on points that are not
   * counted anyway does not make the offer incomplete; an unreadable price ("price unreadable")
   * is a problem with the price, not the contents, and is reported as priceUnreadable. "free claim"
   * (an offer with no price at all) hides nothing.
   */
  function hiddenNotes(notes) {
    return String(notes == null ? '' : notes).split(/;\s*/).filter(function (p) { return p && !/^qty unreadable for /i.test(p) && !/^price unreadable/i.test(p) && !/^free claim$/i.test(p); });
  }

  /** Value of one unit of the item, in table units. null when the table has no number yet. */
  function unitValue(item) {
    if (!item || item.value == null || isNaN(Number(item.value))) return null;
    var per = Number(item.per || 1);
    if (!(per > 0)) per = 1;
    return Number(item.value) / per;
  }

  /** What one unit of the item usually costs in Ultra Cores (item.coreValue is for item.per units). null when unknown. */
  function coreUnitValue(item) {
    if (!item || item.coreValue == null || isNaN(Number(item.coreValue))) return null;
    var per = Number(item.per || 1);
    if (!(per > 0)) per = 1;
    return Number(item.coreValue) / per;
  }

  /** The unit value for a pricing mode: 'cores' reads the Ultra Core price, anything else the money price. */
  function modeUnitValue(item, mode) {
    return mode === 'cores' ? coreUnitValue(item) : unitValue(item);
  }

  /**
   * The item's usual units per unit of price, from the table: per CA$ ('cash') or per Ultra Core
   * ('cores'). observed.perCash / perCore when the table carries them, else worked out from the
   * value; observed.perUsd is read for tables written before the two were split.
   */
  function usualPer(item, mode) {
    if (!item) return null;
    var o = item.observed || {};
    var given = mode === 'cores' ? o.perCore : (o.perCash != null ? o.perCash : o.perUsd);
    if (given != null && !isNaN(Number(given)) && Number(given) > 0) return Number(given);
    var uv = modeUnitValue(item, mode);
    return uv > 0 ? 1 / uv : null;
  }

  /**
   * Why an item's baseline should not be scored, or null when it is fine.
   * A baseline is thin when fewer than minObservations dated offers carried it, and suspect when
   * the table flags it (observed.suspect), for example shards at thousands per dollar.
   */
  function baselineProblem(item, scoring) {
    var obs = item && item.observed;
    if (!obs || usualPer(item, 'cash') == null) return null;
    if (item.userValue) return null;  // a value typed on the Value table tab overrides the baseline guard
    if (obs.source === 'store') return null;  // priced from the player's own store on request: shown with a note, not guarded
    if (obs.suspect) return 'baseline looks wrong' + (typeof obs.suspect === 'string' ? ': ' + obs.suspect : '');
    // meta.minObservations, or { minObservations } itself (meta.scoring.minObservations in older tables)
    var min = Number(scoring && (scoring.minObservations != null ? scoring.minObservations : (scoring.scoring || {}).minObservations));
    if (isNaN(min)) min = DEFAULT_MIN_OBSERVATIONS;
    if (obs.observations != null && Number(obs.observations) < min) {
      return 'baseline too thin: ' + obs.observations + ' offer observation' + (Number(obs.observations) === 1 ? '' : 's') + ', fewer than ' + min;
    }
    return null;
  }

  function findByName(map, name) {
    if (!map || !name) return null;
    if (Object.prototype.hasOwnProperty.call(map, name)) return map[name];
    var want = normalizeKey(name);
    var keys = Object.keys(map);
    for (var i = 0; i < keys.length; i++) {
      if (normalizeKey(keys[i]) === want) return map[keys[i]];
    }
    return null;
  }

  function findRosterEntry(roster, character) {
    if (!roster || !roster.characters) return null;
    return findByName(roster.characters, character);
  }

  /** The plan's resource rule for an item: { status, note } or null. Explicit keys win over pattern rules. */
  function resourceRule(item, key, plan) {
    if (!plan || !item) return null;
    var explicit = plan.resources && (plan.resources[key] || findByName(plan.resources, key));
    if (explicit && (explicit.status || explicit.multiplier != null)) return { status: explicit.status || null, multiplier: explicit.multiplier != null ? Number(explicit.multiplier) : null, note: explicit.note || null, source: 'resource' };
    var rules = plan.resourceRules || [];
    for (var i = 0; i < rules.length; i++) {
      var r = rules[i];
      if (r.category && r.category !== item.category) continue;
      if (r.pattern) {
        var re;
        try { re = new RegExp(r.pattern, 'i'); } catch (e) { continue; }
        if (!re.test(String(item.name || ''))) continue;
      }
      if (r.keyPattern) {
        var kre;
        try { kre = new RegExp(r.keyPattern, 'i'); } catch (e2) { continue; }
        if (!kre.test(String(key || ''))) continue;
      }
      return { status: r.status || null, multiplier: r.multiplier != null ? Number(r.multiplier) : null, note: r.note || null, source: 'rule' };
    }
    return null;
  }

  /**
   * Personal multiplier for an item given the roster and the plan. Returns { multiplier, notes }.
   *   - shards of a character the roster has at maxStars count shardRules.maxedMultiplier
   *   - character-bound items (shards, awakened ability materials, promotions) for a character
   *     who is not on the plan's build list count plan.offListMultiplier
   *   - resources the plan marks surplus count plan.surplusMultiplier; short ones count in full
   * Multipliers multiply when more than one rule applies.
   */
  function personalMultiplier(item, roster, shardRules, plan, key) {
    var rules = Object.assign({}, DEFAULT_SHARD_RULES, shardRules || {});
    var prules = Object.assign({}, DEFAULT_PLAN_RULES, plan || {});
    var multiplier = 1;
    var notes = [];
    if (!item) return { multiplier: 1, notes: [], note: null };

    if (item.category === 'shard' && item.character) {
      var entry = findRosterEntry(roster, item.character);
      var stars = entry ? Number(entry.stars) : NaN;
      if (!isNaN(stars) && stars >= rules.maxStars) {
        multiplier *= Number(rules.maxedMultiplier);
        notes.push(item.character + ' is already at ' + rules.maxStars + ' stars');
      }
    }

    if (item.character && plan && plan.characters && Object.keys(plan.characters).length) {
      if (!findByName(plan.characters, item.character)) {
        var off = Number(prules.offListMultiplier);
        if (isNaN(off)) off = DEFAULT_PLAN_RULES.offListMultiplier;
        multiplier *= off;
        notes.push(item.character + ' is not on your build list');
      }
    }

    var rr = resourceRule(item, key, plan);
    if (rr) {
      var rm = null, why = null;
      if (rr.multiplier != null && !isNaN(Number(rr.multiplier))) {
        rm = Number(rr.multiplier);
        why = 'counts ' + Math.round(rm * 100) + '% for you';
      } else if (rr.status === 'surplus') {
        rm = Number(prules.surplusMultiplier);
        if (isNaN(rm)) rm = DEFAULT_PLAN_RULES.surplusMultiplier;
        why = 'you have enough of this';
      } else if (rr.status === 'useless') {
        rm = Number(prules.uselessMultiplier);
        if (isNaN(rm)) rm = DEFAULT_PLAN_RULES.uselessMultiplier;
        why = 'no use to you';
      }
      if (rm != null && rm !== 1) {
        multiplier *= rm;
        notes.push(why + (rr.note ? ': ' + rr.note : ''));
      }
    }

    return { multiplier: multiplier, notes: notes, note: notes.length ? notes.join('; ') : null, resource: rr };
  }

  var DEFAULT_VALUE_MULTIPLIERS = {};   // no discount unless the table's meta.valueMultipliers sets one

  /** What one Power Core is worth to the player when comparing the in-game core route with cash: meta.powerCore { price, currency }. */
  var DEFAULT_POWER_CORE = { price: 0.15, currency: 'CAD' };

  /** US dollars per Power Core from meta.powerCore (price in a currency meta.fxToUsd knows), or null. */
  function powerCoreUsd(meta) {
    var pc = Object.assign({}, DEFAULT_POWER_CORE, (meta && meta.powerCore) || {});
    var price = Number(pc.price);
    if (!(price > 0)) return null;
    var cur = String(pc.currency || 'USD').toUpperCase();
    var fx = cur === 'USD' ? 1 : Number(meta && meta.fxToUsd && meta.fxToUsd[cur]);
    if (!(fx > 0)) return null;
    return price * fx;
  }

  /** Power Cores one unit of the item costs in the in-game store (item.cores is per item.per units); Power Cores themselves cost one each. */
  function coresPerUnit(item, key) {
    if (!item) return null;
    if (item.cores != null && item.cores !== '' && !isNaN(Number(item.cores)) && Number(item.cores) >= 0) {
      var per = Number(item.per || 1);
      if (!(per > 0)) per = 1;
      return Number(item.cores) / per;
    }
    if (key === 'power_cores' || item.category === 'currency' && /^power cores?$/i.test(String(item.name || ''))) return 1;
    return null;
  }

  /** Generic discount for an item's category (orbs count a fraction of their face value). */
  function valueMultiplier(item, meta) {
    var m = Object.assign({}, DEFAULT_VALUE_MULTIPLIERS, (meta && meta.valueMultipliers) || {});
    var v = item && item.category != null ? Number(m[item.category]) : NaN;
    return isNaN(v) ? 1 : v;
  }

  /**
   * Sub-groups inside a shop bucket, chosen by explicit item keys first (items), then by a regex on
   * the item name (pattern), first match wins. meta.shopGroups { gear: [...], iso: [...] } in
   * data/values.js replaces a bucket's list. A group with `set` is bought in sets (a trait of
   * ISO-8 crystals is 81 of each of the 5 crystals), and the shop view prices the set.
   */
  var GEAR_GROUPS = [
    { key: 'crimson_catalyst', label: 'Crimson Catalyst', pattern: '^Crimson\\b.*Catalyst' },
    { key: 'crimson_unique', label: 'Crimson Unique', pattern: '^Crimson\\b' },
    { key: 'teal_catalyst', label: 'Teal Catalyst', pattern: '^Teal\\b.*Catalyst' },
    { key: 'teal_unique', label: 'Teal Unique', pattern: '^Teal\\b' },
    { key: 'g21_mini', label: 'Gear 21 Mini Unique', pattern: '\\b(?:G|GT|Gear(?: Tier)?)\\s?21\\b.*Mini|Mini.*\\b21\\b', items: [] },
    { key: 'g20_mini', label: 'Gear 20 Mini Unique', pattern: '\\b(?:G|GT|Gear(?: Tier)?)\\s?20\\b.*Mini|Mini.*\\b20\\b', items: [] },
    { key: 'g19_mini', label: 'Gear 19 Mini Unique', pattern: '\\b(?:G|GT|Gear(?: Tier)?)\\s?19\\b.*Mini|Mini.*\\b19\\b', items: [] },
    { key: 'g18_mini', label: 'Gear 18 Mini Unique', pattern: '\\b(?:G|GT|Gear(?: Tier)?)\\s?18\\b.*Mini|Mini.*\\b18\\b', items: [] },
    { key: 'g17_mini', label: 'Gear 17 Mini Unique', pattern: '\\b(?:G|GT|Gear(?: Tier)?)\\s?17\\b.*Mini|Mini.*\\b17\\b', items: [] },
    { key: 'g16_mini', label: 'Gear 16 Mini Unique', pattern: '\\b(?:G|GT|Gear(?: Tier)?)\\s?16\\b.*Mini|Mini.*\\b16\\b', items: [] }
  ];
  var ISO_GROUPS = (function () {
    var out = [];
    [4, 3, 2, 1].forEach(function (t) {
      [5, 4, 1].forEach(function (l) {
        out.push({ key: 't' + t + '_l' + l, label: 'T' + t + ' Level ' + l + ' Ions', pattern: '^T' + t + ' Level ' + l + ' Ions' + (t === 1 && l === 1 ? '|^T1 Ions$' : '') });
      });
    });
    [4, 3, 2].forEach(function (t) {
      out.push({ key: 't' + t + '_crystals', label: 'T' + t + ' Trait Crystals', pattern: '^T' + t + ' \\w+ (?:Armor|Damage|Focus|Health|Resist) Level 1 Iso-8$', set: 405, setLabel: '81 of each of the 5 crystals' });
    });
    return out;
  })();

  function bucketDef(bucketKey) {
    return SHOP_BUCKETS.filter(function (b) { return b.key === bucketKey; })[0] || null;
  }

  /** The groups of a bucket (meta.shopGroups overrides the defaults), each with the table items it covers when a table is given. */
  function bucketGroups(bucketKey, table) {
    var def = bucketDef(bucketKey);
    var meta = (isTable(table) && table.meta) || {};
    var list = (meta.shopGroups && Array.isArray(meta.shopGroups[bucketKey]) ? meta.shopGroups[bucketKey] : null) || (def && def.groups) || [];
    list = list.filter(function (g) { return g && g.key; });
    var groups = list.map(function (g) { return Object.assign({}, g, { keys: [] }); });
    if (isTable(table)) {
      Object.keys(table.items).forEach(function (k) {
        var gk = shopGroup(table.items[k], k, bucketKey, groups);
        if (!gk) return;
        var g = groups.filter(function (x) { return x.key === gk; })[0];
        if (g) g.keys.push(k);
      });
    }
    groups.forEach(function (g) { g.count = g.keys.length; g.empty = isTable(table) ? g.keys.length === 0 : null; });
    return groups;
  }

  /** The group key an item falls in within a bucket, or null. */
  function shopGroup(item, key, bucketKey, groups) {
    if (!item || shopBucket(item, key) !== bucketKey) return null;
    var list = groups || bucketGroups(bucketKey, null);
    for (var i = 0; i < list.length; i++) {
      if ((list[i].items || []).indexOf(key) !== -1) return list[i].key;
    }
    var name = String(item.name || '');
    for (var j = 0; j < list.length; j++) {
      if (!list[j].pattern) continue;
      var re;
      try { re = new RegExp(list[j].pattern, 'i'); } catch (e) { continue; }
      if (re.test(name)) return list[j].key;
    }
    return null;
  }

  var SHOP_BUCKETS = [
    { key: 'all', label: 'All' },   // every offer, nothing filtered: the bucket value is the whole offer's
    { key: 'gold', label: 'Gold' },
    { key: 'power_cores', label: 'Power Cores' },
    { key: 'ultra_cores', label: 'Ultra Cores' },
    { key: 'training', label: 'Training materials', unit: { field: 'xp', label: 'XP' } },
    { key: 'character', label: 'Character upgrades' },
    { key: 'ability', label: 'Ability materials' },
    { key: 'points', label: 'Event points' },
    { key: 'iso', label: 'ISO-8', groups: ISO_GROUPS },
    { key: 'gear', label: 'Gear', groups: GEAR_GROUPS },
    { key: 'orbs', label: 'Orbs' },
    { key: 'other', label: 'Everything else' }
  ];

  /** Which shopping bucket an item belongs to. Character-bound items of any kind are character upgrades. */
  function shopBucket(item, key) {
    if (!item) return 'other';
    if (key === 'gold' || normalizeKey(item.name) === 'gold') return 'gold';
    if (key === 'power_cores' || /^power cores?$/i.test(String(item.name || ''))) return 'power_cores';
    if (key === 'ultra_cores' || /^ultra cores?$/i.test(String(item.name || ''))) return 'ultra_cores';
    if (item.category === 'shard' || item.category === 'promotion') return 'character';
    if (item.category === 'ability') return item.character ? 'character' : 'ability';
    if (item.category === 'training') return 'training';
    if (item.category === 'points') return 'points';
    if (item.category === 'iso8') return 'iso';
    if (item.category === 'gear') return 'gear';
    if (item.category === 'orb') return 'orbs';
    return 'other';
  }

  /**
   * What a buyer actually pays and gets for a result: the offer itself, or, when the result was
   * valued with chainMode 'path' and needs earlier steps, the whole path (their lines and prices
   * added). Already-bought steps and paths with an unreadable price return null.
   */
  function pathLines(r) {
    if (!r) return null;
    var c = r.chain;
    if (c && c.bought) return null;
    if (c && c.mode === 'path' && c.requires.length) {
      if (c.priceUnknown || !(c.cumulativePriceUsd > 0)) return null;
      var lines = [];
      c.requires.forEach(function (p) { lines = lines.concat(p.lines || []); });
      return { priceUsd: c.cumulativePriceUsd, price: c.cumulativePrice, currency: r.currency, lines: lines.concat(r.lines), steps: c.requires.map(function (p) { return p.step; }).concat([c.step]), totalUsd: c.cumulativeUsd, personalUsd: c.cumulativePersonalUsd };
    }
    if (!(r.priceUsd > 0)) return null;
    return { priceUsd: r.priceUsd, price: r.price, currency: r.currency, lines: r.lines, steps: null, totalUsd: r.totalUsd, personalUsd: r.personalUsd };
  }

  /**
   * Shopping view: every offer that contains something in `bucket` ('all' takes every offer), with two readings:
   *   bucketRatio  what the bucket's items in the offer are worth divided by the whole price
   *                (the value you get for that resource alone, as if you bought the offer for it)
   *   wholeRatio   the whole offer's value per US dollar (r.perDollar, personal when personalized)
   * Each bucket item also carries units per unit of price and its ratio to the item's usual price, so gold
   * can be read as "2.7M gold per US$, 3.1x typical". Event points have no value but do have
   * units per dollar. Rows sort by bucketRatio, then by units per dollar; rows without a valued
   * bucket item sort last. `results` come from rankOffers().
   * Each row is also read against the best offer in the store for the bucket: vsBest is the row's ratio divided by the best row's (1 for the best,
   * 0.5 for half the value per dollar), bestScore is that as a 0-100 score (best 100, half 50)
   * and pctBelowBest is 1 - vsBest. The 'all' bucket compares whole offers (wholeRatio).
   * Rows without a ratio (unvalued buckets) read null and never set the best.
   */
  function shopBy(results, table, bucket, options) {
    options = options || {};
    var meta = (isTable(table) && table.meta) || {};
    var items = itemsOf(table);
    var parts = String(bucket || 'all').split('/');
    var bucketKey = parts[0];
    var groupKey = parts[1] || null;
    var def = bucketDef(bucketKey);
    var groups = groupKey ? bucketGroups(bucketKey, table) : null;
    var group = groups ? groups.filter(function (g) { return g.key === groupKey; })[0] || null : null;
    if (groupKey && !group) return [];
    var unit = def && def.unit ? def.unit : null;   // a common unit for the bucket (XP for training materials)
    var rows = [];
    (results || []).forEach(function (r) {
      var path = pathLines(r);
      if (!path) return;
      var byKey = {};
      var order = [];
      var valueUsd = 0, personalUsd = 0, valued = 0;
      var unitQty = 0, unitAll = !!unit;
      var groupQty = 0;
      path.lines.forEach(function (l) {
        if (!l.key) return;
        var item = items[l.key] || l.generic;   // generic: points or shards the table has no row for
        if (!item || (bucketKey !== 'all' && shopBucket(item, l.key) !== bucketKey)) return;
        if (bucketKey === 'other' && item.excludeFromValue) return;   // never counted and on every offer: a Strike Points bonus makes no offer an "everything else" offer
        if (group && shopGroup(item, l.key, bucketKey, groups) !== group.key) return;
        if (l.qty > 0) groupQty += l.qty;
        var agg = byKey[l.key];
        if (!agg) {
          agg = byKey[l.key] = { item: l.item, key: l.key, qty: 0, unreadable: false, perUsd: null, typicalPerUsd: usualPer(item, r.mode), basis: (item.observed && item.observed.basis) || null, firstSeen: !!(item.observed && item.observed.firstSeen), typicalSource: (item.observed && item.observed.source) || (item.derived ? 'derived' : 'history'), vsTypical: null, valueUsd: null, faceUsd: null, personalValueUsd: null, multiplier: l.multiplier, note: l.note || null, excluded: !!l.excluded, thin: !!l.thin, unitQty: null, unitPerUsd: null };
          order.push(l.key);
        }
        agg.qty += l.qty > 0 ? l.qty : 0;
        if (l.qty == null) agg.unreadable = true;   // the card showed no count for this line
        if (unit && l.qty > 0) {
          var ux = Number(item[unit.field]);
          if (ux > 0) { agg.unitQty = (agg.unitQty || 0) + l.qty * ux; unitQty += l.qty * ux; }
          else unitAll = false;
        }
        if (l.value != null) {
          var v = toUsd(l.value, meta);
          var pv = l.personalValue == null ? v : toUsd(l.personalValue, meta);
          agg.valueUsd = (agg.valueUsd || 0) + v;
          agg.faceUsd = (agg.faceUsd || 0) + toUsd(l.faceValue == null ? l.value : l.faceValue, meta);
          agg.personalValueUsd = (agg.personalValueUsd || 0) + pv;
          valueUsd += v; personalUsd += pv; valued += 1;
          if (l.multiplier !== agg.multiplier) agg.multiplier = null;
        }
      });
      if (!order.length) return;
      var rowItems = order.map(function (k) {
        var a = byKey[k];
        a.perUsd = a.qty > 0 ? a.qty / path.priceUsd : null;
        a.unitPerUsd = a.unitQty > 0 ? a.unitQty / path.priceUsd : null;
        // ratio to the item's usual price, undiscounted: what the offer is worth for this item alone
        a.vsTypical = a.faceUsd != null ? a.faceUsd / path.priceUsd : (a.perUsd != null && a.typicalPerUsd ? a.perUsd / a.typicalPerUsd : null);
        return a;
      });
      var useUsd = r.personalized ? personalUsd : valueUsd;
      rows.push({
        result: r,
        name: r.name, price: r.price, currency: r.currency, priceUsd: r.priceUsd,
        pathPriceUsd: path.priceUsd, pathPrice: path.price, pathSteps: path.steps,
        items: rowItems,
        unitLabel: unit ? unit.label : null,
        unitsPerUsd: unit && unitAll && unitQty > 0 ? unitQty / path.priceUsd : null,
        group: group ? group.key : null,
        groupQty: groupQty,
        setSize: group && group.set ? group.set : null,
        setLabel: group && group.set ? group.setLabel || (group.set + ' units') : null,
        setCostUsd: group && group.set && groupQty > 0 ? group.set * path.priceUsd / groupQty : null,
        bucketValueUsd: valued ? useUsd : null,
        bucketRatio: valued ? useUsd / path.priceUsd : null,
        wholeRatio: r.rankRatio,
        grade: r.grade,
        complete: r.complete,
        helpsPlan: r.helpsPlan
      });
    });
    rows.sort(function (a, b) {
      if ((a.bucketRatio == null) !== (b.bucketRatio == null)) return a.bucketRatio == null ? 1 : -1;
      if (a.bucketRatio != null && a.bucketRatio !== b.bucketRatio) return b.bucketRatio - a.bucketRatio;
      var ap = a.items[0].perUsd || 0, bp = b.items[0].perUsd || 0;
      return bp - ap;
    });
    // against the best offer in the store for this bucket: best 100, half the value per dollar 50
    var ratioOf = function (row) { return bucket === 'all' ? row.wholeRatio : row.bucketRatio; };
    var best = null;
    rows.forEach(function (row) {
      var x = ratioOf(row);
      if (x != null && !isNaN(x) && (best == null || x > best)) best = x;
    });
    rows.forEach(function (row) {
      var x = ratioOf(row);
      var vs = x != null && !isNaN(x) && best > 0 ? x / best : null;
      row.vsBest = vs;
      row.bestScore = vs == null ? null : Math.round(100 * vs);
      row.pctBelowBest = vs == null ? null : 1 - vs;
    });
    return rows;
  }

  function joinNotes(a, b) {
    return [a, b].filter(Boolean).join('; ') || null;
  }

  function gradeFor(perDollar, grades) {
    var list = (grades && grades.length ? grades : DEFAULT_GRADES).slice().sort(function (a, b) {
      return b.min - a.min;
    });
    if (perDollar == null || isNaN(perDollar)) return null;
    // graded on the number the page shows (two decimals), so 0.9998 reads "1.00x" and grades as 1.00x
    var shown = Math.round(Number(perDollar) * 100) / 100;
    for (var i = 0; i < list.length; i++) {
      if (shown >= list[i].min) return list[i].label;
    }
    return list[list.length - 1].label;
  }

  function toUsd(valueInUnits, meta) {
    var unitPerUsd = Number(meta && meta.unitPerUsd);
    if (!(unitPerUsd > 0)) unitPerUsd = 1;
    return valueInUnits / unitPerUsd;
  }

  /**
   * What an offer costs in Ultra Cores: { cores, inferred }. A read from the page's own data says
   * so (offer.ultraCores). A card read does not, but the store's price tiers each carry one core
   * price (meta.coreTiers: [[price, cores], ...], CA$12.99 is 100 cores), so a price in the table's
   * currency that sits exactly on a tier gets that tier's. cores is null when neither applies.
   */
  function coresFor(offer, meta) {
    var given = Number(offer && offer.ultraCores);
    if (given > 0) return { cores: given, inferred: false, via: 'given' };
    // A read from the page's own data names every item by id and gives the core price wherever
    // there is one, so an offer without it there has none. Ultra Cores are never sold for cores.
    var contents = (offer && offer.contents) || [];
    var fromPage = contents.some(function (c) { return c && c.id != null && c.id !== ''; });
    var sellsCores = contents.some(function (c) { return c && (c.id === 'UC' || /^ultra cores$/i.test(String(c.item || '').trim())); });
    if (fromPage || sellsCores) return { cores: null, inferred: false };
    // A card read shows no core price, but every money offer pays a web bonus of 10 Strike Points
    // per Ultra Core of its price: the bonus line says what it costs in cores.
    var points = 0;
    contents.forEach(function (c) { if (c && /^strike points$/i.test(String(c.item || '').trim()) && Number(c.qty) > 0) points += Number(c.qty); });
    var money = !!(meta && meta.currency) && String((offer && offer.currency) || meta.currency).toUpperCase() === String(meta.currency).toUpperCase();
    if (points > 0 && money && Number(offer && offer.price) > 0) return { cores: Math.round(points) / 10, inferred: true, via: 'bonus' };
    var price = Number(offer && offer.price);
    var tiers = meta && Array.isArray(meta.coreTiers) ? meta.coreTiers : [];
    var cur = String((offer && offer.currency) || (meta && meta.currency) || '').toUpperCase();
    if (!(price > 0) || !meta || !meta.currency || cur !== String(meta.currency).toUpperCase()) return { cores: null, inferred: false };
    for (var i = 0; i < tiers.length; i++) {
      if (tiers[i] && Math.abs(Number(tiers[i][0]) - price) < 0.005 && Number(tiers[i][1]) > 0) return { cores: Number(tiers[i][1]), inferred: true, via: 'tier' };
    }
    return { cores: null, inferred: false };
  }

  /** A price in money (the table's currency, or one it has a rate for), as opposed to Strike Points or cores. */
  function isMoneyVia(via) {
    return via === 'fx';
  }

  /**
   * Convert an offer price to the table's currency (meta.currency): 1 for that currency itself,
   * meta.fxToUsd for another the table has a rate for, or through the value table when the price
   * is in an in-game currency the table values (Power Cores).
   * Returns { usd, via }: via 'fx' for money, 'item' for a valued in-game currency, 'unpriced' (usd
   * null) for an in-game currency the table knows but has no value for (Strike Points), and
   * 'assumed' for a currency it has never heard of, taken at 1.
   */
  function priceToUsdDetail(price, currency, table, index) {
    var p = Number(price);
    if (isNaN(p)) return { usd: null, via: null };
    var meta = (isTable(table) && table.meta) || (table && (table.fxToUsd || table.currency) ? table : {});
    var fx = meta.fxToUsd || {};
    var cur = String(currency || meta.currency || 'USD');
    if (meta.currency && cur.toUpperCase() === String(meta.currency).toUpperCase()) return { usd: p, via: 'fx' };
    var rate = Number(fx[cur.toUpperCase()]);
    if (rate > 0) return { usd: p * rate, via: 'fx' };
    if (isTable(table)) {
      var resolved = resolveItem(table, index, cur);
      var uv = resolved ? unitValue(resolved.item) : null;
      if (uv != null) return { usd: toUsd(p * uv, meta), via: 'item' };
      if (resolved && Object.prototype.hasOwnProperty.call(table.items, resolved.key)) return { usd: null, via: 'unpriced' };
    }
    return { usd: p, via: 'assumed' };
  }
  function priceToUsd(price, currency, meta) {
    return priceToUsdDetail(price, currency, isTable(meta) ? meta : { meta: meta, items: {} }).usd;
  }

  /**
   * Value a single offer.
   *
   * options: { index, personalize (default true when roster or plan given), grades, plan,
   *            chainMode ('step' rates a chain step on its own, the default; 'path' rates it on the whole path),
   *            mode ('cash', the default: the offer's money price against each item's usual money price;
   *                  'cores': its Ultra Core price, offer.ultraCores, against each item's usual price in cores) }
   * Every valued line carries vsTypical: its value over the offer's price, what the offer is worth
   * for that item alone. The lines add up to perDollar, the whole offer.
   */
  function valueOffer(offer, table, roster, options) {
    options = options || {};
    var meta = (isTable(table) && table.meta) || {};
    var plan = options.plan || null;
    var index = options.index || buildIndex(table);
    var personalize = options.personalize == null ? !!(roster || plan) : !!options.personalize;
    var mode = options.mode === 'cores' ? 'cores' : 'cash';
    var corePrice = coresFor(offer, meta);   // the read's own core price, else the one its price tier always carries
    var price = Number(mode === 'cores' ? corePrice.cores : (offer && offer.price));
    var hasPrice = !isNaN(price) && price > 0;
    var currency = mode === 'cores' ? 'Ultra Cores' : ((offer && offer.currency) || meta.currency || 'USD');
    var priced = !hasPrice ? { usd: null, via: null } : (mode === 'cores' ? { usd: price, via: 'cores' } : priceToUsdDetail(price, currency, table, index));
    var priceUsd = priced.usd;
    var contents = (offer && offer.contents) || [];
    // the offer's own price when it is in something with no money value (Strike Store offers)
    var ownPrice = Number(offer && offer.price);
    var foreignPrice = ownPrice > 0 && priceToUsdDetail(ownPrice, (offer && offer.currency) || meta.currency || 'USD', table, index).via === 'unpriced' ? ownPrice : null;

    var lines = [];
    var unknown = [];
    var unpriced = [];
    var thin = [];
    var excluded = [];
    var unreadable = [];
    var promotions = [];
    var opaque = [];
    var fresh = [];          // valued items with no price before this read: they rate about 1x by construction
    var freshUnits = 0;
    var totalUnits = 0;
    var personalTotalUnits = 0;
    var complete = true;
    var valuedLines = 0;
    var planLines = 0;      // resolvable lines the plan could judge
    var planUseful = 0;     // ...of which it kept at least something

    contents.forEach(function (row) {
      // a count the card did not show (the bookmarklet leaves qty null) is kept apart from a count of 0
      var qtyKnown = !!row && row.qty != null && row.qty !== '' && !isNaN(Number(row.qty));
      var qty = qtyKnown ? Number(row.qty) : null;
      var label = (row && (row.item || row.key)) || '';
      var hasId = !!(row && row.id != null && row.id !== '');   // read from the page's own data: the id names the item exactly
      var resolved = resolveLine(table, index, row);
      // a card labels shard lines with the character portrait: a bare character name is read by its count below
      var bare = !hasId && !!(resolved && resolved.item.category === 'shard' && resolved.item.character && !/\bshards?\b/i.test(label) && normalizeKey(label) === normalizeKey(resolved.item.character));
      if (!resolved && !hasId && findRosterEntry(roster, label)) {
        // a roster name the table has no row for: "Dracula x810" is 810 Dracula shards
        resolved = { key: 'shard:' + normalizeKey(label), item: genericShards(label) };
        bare = true;
      }
      if (!resolved && hasId && isOpaqueId(row.id)) {
        // a pass tier, level or unlock: the store does not say what it holds, so it cannot be priced or added to the table
        opaque.push(label);
        complete = false;
        lines.push({ item: label, key: null, qty: qty, unitValue: null, multiplier: 1, value: null, personalValue: null, opaque: true, note: 'a pass tier, level or unlock the store does not itemize: not priced' });
        return;
      }
      if (!resolved) {
        unknown.push(label);
        complete = false;
        lines.push({ item: label, key: null, qty: qty, unitValue: null, multiplier: 1, value: null, personalValue: null, note: qtyKnown ? 'not in value table' : 'not in value table; count unreadable on the card' });
        return;
      }
      var name = resolved.item.name || label;
      if (resolved.item.excludeFromValue) {
        excluded.push(name);
        lines.push({ item: name, key: resolved.key, qty: qty, unitValue: null, multiplier: 1, value: null, personalValue: null, excluded: true, generic: resolved.item.generic ? resolved.item : undefined, note: joinNotes('not counted: event or loyalty points', qtyKnown ? null : 'count unreadable on the card') });
        return;
      }
      if (bare && qtyKnown && !(qty > 1)) {
        // a character portrait with a count of one is a diamond or red star promotion the card does not name
        promotions.push(label);
        complete = false;
        lines.push({ item: label, key: null, qty: qty, unitValue: null, multiplier: 1, value: null, personalValue: null, promotion: true, note: 'a character icon without a shard count: a diamond or red star promotion the card does not name' });
        return;
      }
      if (!qtyKnown) {
        // listed under the name the card showed: for a character portrait that is the bare name
        unreadable.push(bare ? label : name);
        complete = false;
        lines.push({ item: bare ? label : name, key: resolved.key, qty: null, unitValue: modeUnitValue(resolved.item, mode), multiplier: 1, value: null, personalValue: null, generic: resolved.item.generic ? resolved.item : undefined, note: 'count unreadable on the card' + (bare ? '; a character icon with no count may also be a diamond or promotion' : '') });
        return;
      }
      var pm = personalize ? personalMultiplier(resolved.item, roster, meta.shardRules, plan, resolved.key) : { multiplier: 1, notes: [], note: null };
      if (resolved.item.derived) pm.note = joinNotes(resolved.item.derived.note, pm.note);
      planLines += 1;
      if (pm.multiplier > 0) planUseful += 1;
      var uv = modeUnitValue(resolved.item, mode);
      var ob = resolved.item.observed || {};
      if (uv == null) {
        unpriced.push(name);
        complete = false;
        lines.push({ item: name, key: resolved.key, qty: qty, unitValue: null, multiplier: pm.multiplier, value: null, personalValue: null, resource: pm.resource ? pm.resource.status : null, generic: resolved.item.generic ? resolved.item : undefined, note: joinNotes(resolved.item.generic ? 'read as shards from the character icon; no row in the table yet' : 'no value in table yet', pm.note) });
        return;
      }
      var problem = baselineProblem(resolved.item, meta);
      if (problem) {
        thin.push(name);
        complete = false;
        lines.push({ item: name, key: resolved.key, qty: qty, unitValue: null, multiplier: pm.multiplier, value: null, personalValue: null, thin: true, rawValue: uv * qty, resource: pm.resource ? pm.resource.status : null, note: joinNotes(problem, pm.note) });
        return;
      }
      var cm = valueMultiplier(resolved.item, meta);
      // The table's values are what each item usually costs in the player's own earlier store reads
      // (tools/market.js), so the lines of an offer simply add up to what the whole offer is worth.
      var face = uv * qty;
      var value = face * cm;
      var personalValue = value * pm.multiplier;
      totalUnits += value;
      personalTotalUnits += personalValue;
      valuedLines += 1;
      var isFresh = !!ob.firstSeen && !resolved.item.userValue;
      if (isFresh) { freshUnits += value; if (fresh.indexOf(name) === -1) fresh.push(name); }
      if (cm !== 1) pm.note = joinNotes(pm.note, resolved.item.category + ' items count ' + Math.round(cm * 100) + '% of face value');
      lines.push({
        item: name,
        key: resolved.key,
        qty: qty,
        unitValue: uv,
        multiplier: pm.multiplier,
        value: value,
        faceValue: face,
        vsTypical: priceUsd ? toUsd(face, meta) / priceUsd : null,
        personalValue: personalValue,
        basis: ob.basis || null,
        firstSeen: isFresh,
        usualPer: usualPer(resolved.item, mode),
        earlyEstimate: !!(resolved.item.observed && resolved.item.observed.earlyEstimate),
        resource: pm.resource ? pm.resource.status : null,
        categoryMultiplier: cm,
        bucket: shopBucket(resolved.item, resolved.key),
        note: pm.note
      });
    });

    // The core route: what the same contents cost in Power Cores in the in-game store, for the
    // lines whose item carries a core price. Points are left out (they cannot be bought with cores).
    var coreRateUsd = powerCoreUsd(meta);
    var coreTotal = 0, coreLines = 0, coreMissing = [], coreUnreadable = [];
    var coreApplicable = lines.some(function (l) { return !l.excluded; });   // points cannot be bought with cores
    lines.forEach(function (l) {
      if (l.excluded) { l.cores = null; return; }
      var cpu = l.key ? coresPerUnit(isTable(table) ? table.items[l.key] : null, l.key) : null;
      if (cpu != null && l.qty > 0) { l.cores = l.qty * cpu; coreTotal += l.cores; coreLines += 1; }
      else if (cpu != null && l.qty == null) { l.cores = null; coreUnreadable.push(l.item); }   // a core price, but the card showed no count
      else { l.cores = null; coreMissing.push(l.item); }
    });

    var hidden = hiddenNotes(offer && offer.notes);   // "+N More" and the like: the price buys more than the lines show
    if (hidden.length) complete = false;
    var priceUnreadable = /(^|;\s*)price unreadable/i.test(String((offer && offer.notes) || ''));
    if (priceUnreadable) complete = false;

    var totalUsd = toUsd(totalUnits, meta);
    var personalUsd = toUsd(personalTotalUnits, meta);
    var perDollar = priceUsd && valuedLines ? totalUsd / priceUsd : null;
    var personalPerDollar = priceUsd && valuedLines ? personalUsd / priceUsd : null;

    // Chain offers: the steps before this one (from the first unbought step) must be bought first.
    // chainMode 'step' (default) rates each step on its own; 'path' rates a later step on the whole
    // path to it, steps and prices added. The path figures are computed either way, for display.
    var chainMode = options && options.chainMode === 'path' ? 'path' : 'step';
    var chainInfo = null;
    var ch = offer && offer.chain;
    if (ch && ch.steps && ch.steps.length) {
      var stepNo = Number(ch.step) || 1;
      var current = Number(ch.current) || 1;
      var bought = stepNo < current;
      var requires = bought ? [] : ch.steps.filter(function (st) { var n = Number(st.step); return n >= current && n < stepNo; });
      var cumPrice = priceUsd || 0, cumUsd = totalUsd, cumPersonal = personalUsd, cumValued = valuedLines;
      var priceUnknown = !(priceUsd > 0);
      var assumedCurrency = priced.via === 'assumed';
      var cumLocal = hasPrice ? price : null;
      var pathComplete = true;
      var cumCores = coreLines ? coreTotal : 0, cumCoreLines = coreLines, cumCoreMissing = coreMissing.slice(), cumCoreUnreadable = coreUnreadable.slice();
      var cumCoresOk = coreLines > 0 && !coreMissing.length && !coreUnreadable.length && !hidden.length;
      var path = requires.map(function (st) {
        var sr = valueOffer({ name: st.name, price: st.price, currency: st.currency, ultraCores: st.ultraCores, contents: st.contents, notes: st.notes }, table, roster, Object.assign({}, options, { index: index }));
        if (!(sr.priceUsd > 0)) priceUnknown = true;
        if (sr.priceVia === 'assumed') assumedCurrency = true;
        cumPrice += sr.priceUsd || 0;
        cumUsd += sr.totalUsd;
        cumPersonal += sr.personalUsd;
        cumValued += sr.valuedLines;
        if (cumLocal != null) cumLocal = (sr.price != null && (mode === 'cores' || String(st.currency || currency) === String(currency))) ? cumLocal + sr.price : null;
        if (!sr.complete) pathComplete = false;
        cumCores += sr.coreCost || 0;
        cumCoreLines += sr.coreLines || 0;
        cumCoreMissing = cumCoreMissing.concat(sr.coreMissing || []);
        cumCoreUnreadable = cumCoreUnreadable.concat(sr.coreUnreadable || []);
        if (!sr.coreComplete) cumCoresOk = false;
        return { step: Number(st.step), name: st.name, price: st.price, currency: st.currency, priceUsd: sr.priceUsd, priceVia: sr.priceVia, totalUsd: sr.totalUsd, personalUsd: sr.personalUsd, perDollar: sr.perDollar, personalPerDollar: sr.personalPerDollar, complete: sr.complete, notes: sr.notes, hidden: sr.hidden, unreadable: sr.unreadable, promotions: sr.promotions, opaque: sr.opaque, priceUnreadable: sr.priceUnreadable, lines: sr.lines, coreCost: sr.coreCost, coreComplete: sr.coreComplete, coreUnreadable: sr.coreUnreadable };
      });
      if (priceUnknown && !bought) pathComplete = false;
      if (chainMode === 'path' && !pathComplete) complete = false;
      chainInfo = {
        name: ch.name || null, step: stepNo, of: Number(ch.of) || ch.steps.length, current: current,
        mode: chainMode,
        bought: bought,
        pathComplete: pathComplete,
        requires: path,
        priceUnknown: priceUnknown,
        assumedCurrency: assumedCurrency,
        cumulativePriceUsd: priceUnknown ? null : cumPrice,
        cumulativePrice: cumLocal,
        cumulativeCoreCost: cumCoreLines > 0 ? cumCores : null,
        cumulativeCoreComplete: cumCoreLines > 0 && cumCoresOk,
        cumulativeCoreMissing: cumCoreMissing,
        cumulativeCoreUnreadable: cumCoreUnreadable,
        cumulativeUsd: cumUsd, cumulativePersonalUsd: cumPersonal,
        cumulativePerDollar: !priceUnknown && cumPrice > 0 && cumValued ? cumUsd / cumPrice : null,
        cumulativePersonalPerDollar: !priceUnknown && cumPrice > 0 && cumValued ? cumPersonal / cumPrice : null
      };
    }
    var effective = personalize ? personalPerDollar : perDollar;
    if (chainInfo && chainInfo.bought) effective = null;
    else if (chainInfo && chainMode === 'path' && chainInfo.requires.length) effective = personalize ? chainInfo.cumulativePersonalPerDollar : chainInfo.cumulativePerDollar;
    // Does this offer give the plan anything? null when nothing in it could be judged.
    var helpsPlan = null;
    if (personalize && planLines > 0) helpsPlan = planUseful > 0;

    return {
      name: (offer && offer.name) || '',
      price: hasPrice ? price : null,
      currency: currency,
      priceUsd: priceUsd,
      priceVia: priced.via,
      mode: mode,
      ultraCores: corePrice.cores,
      coresInferred: corePrice.inferred,
      coresVia: corePrice.via || null,   // how a core price the read did not state was found: 'bonus' (its Strike Points line) or 'tier'
      unit: mode === 'cores' ? 'Ultra Cores' : (meta.currency || meta.unit || 'USD'),
      // a price in something the table cannot turn into money or cores (Strike Points): the value,
      // in the mode's unit, that one unit of that price buys
      perPriceUnit: foreignPrice != null && valuedLines ? totalUsd / foreignPrice : null,
      totalUnits: totalUnits,
      personalTotalUnits: personalTotalUnits,
      totalUsd: totalUsd,
      personalUsd: personalUsd,
      perDollar: perDollar,
      personalPerDollar: personalPerDollar,
      grade: gradeFor(effective, options.grades || meta.grades),
      rankRatio: effective,
      chain: chainInfo,
      coreCost: coreLines ? coreTotal : null,
      coreLines: coreLines,
      coreMissing: coreMissing,
      coreUnreadable: coreUnreadable,
      coreApplicable: coreApplicable,
      coreComplete: coreLines > 0 && !coreMissing.length && !coreUnreadable.length && !hidden.length,
      coreRateUsd: coreRateUsd,
      coreCostUsd: coreLines && coreRateUsd ? coreTotal * coreRateUsd : null,
      coreVsPrice: mode === 'cash' && coreLines && coreRateUsd && priceUsd > 0 ? (coreTotal * coreRateUsd) / priceUsd : null,
      personalized: personalize,
      helpsPlan: helpsPlan,
      valuedLines: valuedLines,
      complete: complete,
      unknown: unknown,
      unpriced: unpriced,
      thin: thin,
      excluded: excluded,
      unreadable: unreadable,
      promotions: promotions,
      opaque: opaque,
      fresh: fresh,
      freshShare: totalUnits > 0 ? freshUnits / totalUnits : 0,
      hidden: hidden.length > 0,
      priceUnreadable: priceUnreadable,
      notes: (offer && offer.notes) || null,
      lines: lines
    };
  }

  /** Value every offer and sort best value per dollar first (a chain step on its own, or by its whole path under chainMode 'path'): complete offers, then incomplete ones, and offers with nothing priceable (points only, or nothing the table knows) last. */
  function rankOffers(offers, table, roster, options) {
    options = options || {};
    var index = options.index || buildIndex(table);
    if (offers && !Array.isArray(offers) && Array.isArray(offers.offers)) offers = offers.offers;
    var results = (offers || []).map(function (o) {
      var r = valueOffer(o, table, roster, Object.assign({}, options, { index: index }));
      r.offer = o;
      return r;
    });
    function sortKey(r) {
      return r.rankRatio;
    }
    results.sort(function (a, b) {
      var av = sortKey(a);
      var bv = sortKey(b);
      if ((av == null) !== (bv == null)) return av == null ? 1 : -1;   // nothing priceable: last, complete or not
      if (a.complete !== b.complete) return a.complete ? -1 : 1;
      if (av == null) return 0;
      return bv - av;
    });
    return results;
  }

  /**
   * For every resource the ranked offers contain, the offer that sells it cheapest.
   * Two readings per resource: `whole` counts the offer's full price against that one resource
   * (what you pay if you only wanted it); `share` charges each item its share of the price in
   * proportion to its value at the table's averages, so bundles are compared fairly.
   * Only generic values are used: the best price for gold does not depend on your plan.
   * Items that share one price (the stat crystals of a tier, observed.family) are one resource:
   * what an offer holds of them is added up, as the store list does.
   * Returns [{ key, itemKey, family, name, category, typicalPerUsd, offers, whole: {name, perUsd, price, currency, qty}, share: {...} }],
   * sorted by category then name. key is the table key, or the family's; itemKey is a table row
   * of it. perUsd is units per unit of price (CA$, or Ultra Cores in mode "cores").
   */
  /** A line's weight when a bundle's price is shared out by value: its face value at the table's typical price. */
  function shareFace(l, meta) {
    return toUsd(l.faceValue == null ? l.value : l.faceValue, meta);
  }
  /** What a table row is priced as: itself, or the family it shares one price with (observed.family). */
  function priceKey(items, key) {
    var it = items && items[key];
    return it && it.observed && it.observed.family ? String(it.observed.family) : key;
  }
  /** A family's name: "T3 stat crystals". */
  function familyLabel(fam) {
    var m = /^family:(t\d+)_crystals$/i.exec(String(fam));
    return m ? m[1].toUpperCase() + ' stat crystals' : String(fam).replace(/^family:/, '').replace(/_/g, ' ');
  }

  function bestPrices(results, table) {
    var meta = (isTable(table) && table.meta) || {};
    var items = itemsOf(table);
    var out = {};
    (results || []).forEach(function (r) {
      var path = pathLines(r);
      if (!path) return;
      // shares are allocated by face value (before any category discount), as the table's averages price things
      var faceTotal = 0;
      path.lines.forEach(function (l) { if (l.value != null && !l.excluded && !l.thin) faceTotal += shareFace(l, meta); });
      if (!(faceTotal > 0)) return;
      // the same item can appear in several lines of a path (every step of a shard chain): total it first
      var byKey = {}, order = [];
      path.lines.forEach(function (l) {
        if (l.value == null || l.excluded || l.thin || !l.key || !(l.qty > 0)) return;
        var gk = priceKey(items, l.key);
        var agg = byKey[gk];
        if (!agg) { agg = byKey[gk] = { item: l.item, first: l.key, qty: 0, faceUsd: 0 }; order.push(gk); }
        agg.qty += l.qty;
        agg.faceUsd += shareFace(l, meta);
      });
      order.forEach(function (key) {
        var l = byKey[key];
        var sharePrice = path.priceUsd * (l.faceUsd / faceTotal);
        var whole = l.qty / path.priceUsd;
        var share = sharePrice > 0 ? l.qty / sharePrice : null;
        var item = items[l.first] || {};
        var family = key !== l.first ? key : null;
        var entry = out[key] || (out[key] = {
          key: key, itemKey: l.first, family: family, name: family ? familyLabel(family) : (item.name || l.item), category: item.category || 'other',
          typicalPerUsd: usualPer(item, r.mode),
          basis: (item.observed && item.observed.basis) || null,
          firstSeen: !!(item.observed && item.observed.firstSeen),
          typicalSource: (item.observed && item.observed.source) || (item.derived ? 'derived' : (item.userValue ? 'user' : 'history')),
          offers: 0, whole: null, share: null
        });
        entry.offers += 1;
        var ref = { name: r.name, price: path.price, currency: r.currency, priceUsd: path.priceUsd, qty: l.qty, steps: path.steps, result: r };
        if (!entry.whole || whole > entry.whole.perUsd) entry.whole = Object.assign({ perUsd: whole }, ref);
        if (share != null && (!entry.share || share > entry.share.perUsd)) entry.share = Object.assign({ perUsd: share, sharePrice: sharePrice }, ref);
      });
    });
    return Object.keys(out).map(function (k) { return out[k]; }).sort(function (a, b) {
      if (a.category !== b.category) return a.category < b.category ? -1 : 1;
      return a.name < b.name ? -1 : 1;
    });
  }

  /**
   * One day's price record for every item the store sells: units per unit of price counting the
   * whole price (whole) and the item's share of the price by face value (share, null when the
   * bundle holds something the table cannot value), best and average over the offers that contain
   * it: { n, wb, wa, sb, sa, wo } with wo the offer behind wb. Items that share one price (a
   * family, see bestPrices) are one record under the family's key. Chain steps count on their own;
   * offers with hidden contents, and offers not priced in money (unless options.fiatOnly is
   * false), are left out.
   */
  function priceSnapshot(offers, table, options) {
    options = options || {};
    var meta = (isTable(table) && table.meta) || {};
    var items = itemsOf(table);
    var results = rankOffers(offers, table, null, { personalize: false, chainMode: 'step', index: options.index, mode: options.mode });
    var acc = {};
    results.forEach(function (r) {
      var path = pathLines(r);
      if (!path || !(path.priceUsd > 0)) return;
      if (r.hidden) return;   // hidden contents would understate what the price buys
      if (options.fiatOnly !== false && !isMoneyVia(r.priceVia) && r.priceVia !== 'cores') return;   // Strike Point prices are not money
      var faceTotal = 0, hasUnknown = false;
      var byKey = {}, order = [];
      path.lines.forEach(function (l) {
        if (!l.excluded && (!l.key || l.qty == null)) hasUnknown = true;   // an unknown item, or an unreadable count, takes an unknown share of the price
        if (!l.key || l.excluded || !(l.qty > 0)) return;
        var gk = priceKey(items, l.key);
        var a = byKey[gk] || (byKey[gk] = { qty: 0, face: 0, valued: true });
        if (!a.seen) { order.push(gk); a.seen = true; }
        a.qty += l.qty;
        if (l.value != null && !l.thin) { var f = shareFace(l, meta); a.face += f; faceTotal += f; }
        else a.valued = false;
      });
      var allValued = !hasUnknown && order.every(function (k) { return byKey[k].valued; });
      order.forEach(function (k) {
        var a = byKey[k];
        var e = acc[k] || (acc[k] = { whole: [], share: [], n: 0, top: 0, wo: null });
        e.n += 1;
        var w = a.qty / path.priceUsd;
        e.whole.push(w);
        if (w > e.top) { e.top = w; e.wo = r.name || null; }
        if (allValued && faceTotal > 0 && a.face > 0) e.share.push(a.qty / (path.priceUsd * (a.face / faceTotal)));
      });
    });
    var day = {};
    Object.keys(acc).forEach(function (k) {
      var e = acc[k];
      var best = function (arr) { return arr.length ? Math.max.apply(null, arr) : null; };
      var avg = function (arr) { return arr.length ? arr.reduce(function (x, y) { return x + y; }, 0) / arr.length : null; };
      day[k] = { n: e.n, wb: best(e.whole), wa: avg(e.whole), sb: best(e.share), sa: avg(e.share) };
      if (e.wo) day[k].wo = e.wo;
    });
    var date = options.date || (offers && offers.updated ? String(offers.updated).slice(0, 10) : null);
    if (!isDay(date)) date = null;
    return { date: date, readAt: (offers && offers.updated) || null, source: (offers && offers.source) || null, account: (offers && offers.account) || null, items: day };
  }

  /** A calendar day as the history keys it: YYYY-MM-DD. */
  function isDay(d) { return /^\d{4}-\d{2}-\d{2}$/.test(String(d || '')); }

  /** Add a day's snapshot to a history ({ days: [] }), replacing the same date; days stay sorted. */
  function mergeHistory(history, snapshot) {
    var days = ((history && history.days) || []).filter(function (d) { return d && isDay(d.date) && (!snapshot || d.date !== snapshot.date); });
    if (snapshot && isDay(snapshot.date)) days.push(snapshot);
    days.sort(function (a, b) { return a.date < b.date ? -1 : (a.date > b.date ? 1 : 0); });
    return { days: days };
  }

  /** One item's history: [{ date, n, wb, wa, sb, sa, wo }] oldest first. key is a table key, or a family's. */
  function historyFor(history, key, mode) {
    var field = mode === 'cores' ? 'coreItems' : 'items';   // a day holds one record per item and currency
    return ((history && history.days) || []).filter(function (d) { return d[field] && d[field][key]; }).map(function (d) { return Object.assign({ date: d.date }, d[field][key]); });
  }

  /**
   * Parse a quick plain-text offer description, one item per line:
   *   500000 Gold
   *   50x Iron Man shards
   *   Premium Orb x3
   * Returns contents rows; a price is NOT parsed here.
   */
  function parseContentsText(text) {
    var rows = [];
    String(text || '').split(/\r?\n|;/).forEach(function (line) {
      var s = line.trim();
      if (!s) return;
      var m = s.match(/^(\d[\d,\.]*)\s*[x×]?\s+(.+)$/i) || s.match(/^(.+?)\s*[x×]\s*(\d[\d,\.]*)$/i);
      if (m) {
        var qtyStr = /^\d/.test(m[1]) ? m[1] : m[2];
        var name = /^\d/.test(m[1]) ? m[2] : m[1];
        rows.push({ item: name.trim(), qty: Number(qtyStr.replace(/,/g, '')) });
      } else {
        rows.push({ item: s, qty: 1 });
      }
    });
    return rows;
  }

  /** Parse a plain-text character list, one name per line or comma separated, into a plan.characters map. */
  function parseCharacterList(text) {
    var out = {};
    String(text || '').split(/\r?\n|,|;/).forEach(function (s) {
      var n = s.trim();
      if (n) out[n] = {};
    });
    return out;
  }

  return {
    DEFAULT_GRADES: DEFAULT_GRADES,
    DEFAULT_SHARD_RULES: DEFAULT_SHARD_RULES,
    DEFAULT_PLAN_RULES: DEFAULT_PLAN_RULES,
    DEFAULT_MIN_OBSERVATIONS: DEFAULT_MIN_OBSERVATIONS,
    normalizeKey: normalizeKey,
    buildIndex: buildIndex,
    itemIds: itemIds,
    isPointsId: isPointsId,
    isOpaqueId: isOpaqueId,
    resolveItem: resolveItem,
    resolveLine: resolveLine,
    isMoneyVia: isMoneyVia,
    genericPoints: genericPoints,
    genericShards: genericShards,
    hiddenNotes: hiddenNotes,
    unitValue: unitValue,
    coreUnitValue: coreUnitValue,
    coresFor: coresFor,
    modeUnitValue: modeUnitValue,
    usualPer: usualPer,
    baselineProblem: baselineProblem,
    resourceRule: resourceRule,
    personalMultiplier: personalMultiplier,
    gradeFor: gradeFor,
    priceToUsd: priceToUsd,
    priceToUsdDetail: priceToUsdDetail,
    bestPrices: bestPrices,
    priceKey: priceKey,
    familyLabel: familyLabel,
    pathLines: pathLines,
    deriveItem: deriveItem,
    itemsOf: itemsOf,
    DEFAULT_POWER_CORE: DEFAULT_POWER_CORE,
    powerCoreUsd: powerCoreUsd,
    coresPerUnit: coresPerUnit,
    GEAR_GROUPS: GEAR_GROUPS,
    ISO_GROUPS: ISO_GROUPS,
    bucketGroups: bucketGroups,
    shopGroup: shopGroup,
    priceSnapshot: priceSnapshot,
    mergeHistory: mergeHistory,
    historyFor: historyFor,
    isDay: isDay,
    DEFAULT_VALUE_MULTIPLIERS: DEFAULT_VALUE_MULTIPLIERS,
    valueMultiplier: valueMultiplier,
    SHOP_BUCKETS: SHOP_BUCKETS,
    shopBucket: shopBucket,
    shopBy: shopBy,
    valueOffer: valueOffer,
    rankOffers: rankOffers,
    parseContentsText: parseContentsText,
    parseCharacterList: parseCharacterList
  };
});
