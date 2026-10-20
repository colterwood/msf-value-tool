/*
 * MSF Store Value engine.
 *
 * Pure functions only: no DOM, no storage. Loaded by the browser page as
 * window.MSFEngine and by Node tests via module.exports.
 *
 * Value table shape (see data/values.js):
 *   {
 *     meta: {
 *       source: "msfwar.com Spender's Guide",
 *       unit: "USD" | "cores",       // what item values are expressed in
 *       unitPerUsd: 1,                // how many units one US dollar buys (1 for USD)
 *       fxToUsd: { USD: 1, CAD: 0.71 }, // US dollars per unit of each price currency
 *       grades: [{ min: 1.5, label: "Excellent" }, ...], // by value-per-dollar, descending
 *       valueMultipliers: { orb: 0.2 },  // generic discount by item category: orbs are lottery tickets
 *       scoring: {                    // msfwar-style 0-100 score (optional)
 *         typicalScore: 70, scorePerRatio: 40, maxScore: 100, minScore: 0,
 *         minObservations: 5,         // baselines with fewer msfwar observations are not scored
 *         weights: { gold: 30, training: 30, orangeIso: 20, shard: 15, other: 5 },
 *         letters: [{ min: 90, label: "A" }, ...]
 *       },
 *       shardRules: { maxedMultiplier: 0 }
 *     },
 *     items: {
 *       "gold": { name: "Gold", category: "currency", per: 1000000, value: 1.13, aliases: [] },
 *       "shard:iron man": { name: "Iron Man shards", category: "shard", character: "Iron Man", per: 1, value: 0.2,
 *                           observed: { perUsd: 5, days: 5, observations: 12, suspect: false } },
 *       "points:iron_vengeance": { name: "...", category: "points", excludeFromValue: true }
 *     }
 *   }
 *
 * Offer shape (see data/offers.js and README):
 *   { name, price, currency, purchaseLimit, expires, source, notes,
 *     contents: [{ item: "Gold", qty: 500000 }, { key: "shard:iron man", qty: 50 }],
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

  // msfwar's published scoring rules: typical historical value earns 70 (C); a resource giving
  // 25% more for the price earns 80 (B), 50% more earns 90 (A). Categories combine by weight and
  // only the categories present share the weighting. Letters below C, the clamp and the
  // minimum-observation guard are this tool's reading, so they live in the value table's
  // meta.scoring where they can be edited.
  var DEFAULT_SCORING = {
    typicalScore: 70,
    scorePerRatio: 40,
    maxScore: 100,
    minScore: 0,
    minObservations: 5,
    weights: { gold: 30, training: 30, orangeIso: 20, shard: 15, other: 5 },
    letters: [
      { min: 90, label: 'A' },
      { min: 80, label: 'B' },
      { min: 70, label: 'C' },
      { min: 60, label: 'D' },
      { min: 0, label: 'F' }
    ]
  };

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

  /** alias (normalized) -> item key. Keys, names and aliases all resolve. */
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
    });
    return index;
  }

  /**
   * Resolve a free-text item name or an explicit key to a table entry.
   * Returns { key, item } or null when nothing matches.
   */
  /**
   * An item priced from another by a fixed ratio, for levels msfwar does not list:
   *   derivedFrom: { key: 'training_module:l4', ratio: 0.5, basis: 'XP' }
   * says an L3 Training Module is worth half an L4 (800 of 1,600 XP). The base's observed
   * baseline carries over, so the derived item is scored whenever the base is, and the line is
   * noted as derived. An item with a value of its own (typed in, or in the table) is left alone.
   */
  function deriveItem(table, key) {
    var item = isTable(table) ? table.items[key] : null;
    if (!item) return null;
    var d = item.derivedFrom;
    if (!d || !d.key || unitValue(item) != null) return item;
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
    out.value = buv == null ? null : buv * ratio * per;
    out.observed = Object.assign({}, item.observed || {}, {
      perUsd: bo.perUsd != null && !isNaN(Number(bo.perUsd)) ? Number(bo.perUsd) / ratio : null,
      observations: bo.observations, days: bo.days, readAt: bo.readAt,
      earlyEstimate: bo.earlyEstimate, suspect: bo.suspect,
      note: note
    });
    if (base.userValue) out.userValue = true;   // a value typed for the base is trusted for the levels priced from it too
    out.derived = { from: d.key, fromName: base.name || d.key, ratio: ratio, basis: basis, note: note };
    return out;
  }

  function storeNote(obs) {
    var n = Number(obs.observations);
    return 'priced from your store' + (n > 0 ? ' (' + n + ' offer' + (n === 1 ? '' : 's') + (obs.method === 'shared' ? ', split evenly with the other unpriced items' : '') + ')' : '') + (obs.readAt ? ', ' + obs.readAt : '');
  }

  /** Every item of the table with derived values filled in. */
  function itemsOf(table) {
    var out = {};
    if (!isTable(table)) return out;
    Object.keys(table.items).forEach(function (k) { out[k] = deriveItem(table, k); });
    return out;
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
    return null;
  }

  /** Value of one unit of the item, in table units. null when the table has no number yet. */
  function unitValue(item) {
    if (!item || item.value == null || isNaN(Number(item.value))) return null;
    var per = Number(item.per || 1);
    if (!(per > 0)) per = 1;
    return Number(item.value) / per;
  }

  /**
   * Why an item's msfwar baseline should not be scored, or null when it is fine.
   * A baseline is thin when msfwar saw it in fewer than minObservations offers, and suspect when
   * the table flags it (observed.suspect), for example shards at thousands per dollar.
   */
  function baselineProblem(item, scoring) {
    var obs = item && item.observed;
    if (!obs || obs.perUsd == null) return null;
    if (item.userValue) return null;  // a value typed on the Value table tab overrides the baseline guard
    if (obs.source === 'store') return null;  // priced from the player's own store on request: shown with a note, not guarded
    if (obs.suspect) return 'baseline looks wrong' + (typeof obs.suspect === 'string' ? ': ' + obs.suspect : '');
    var min = Number(scoring && scoring.minObservations);
    if (isNaN(min)) min = DEFAULT_SCORING.minObservations;
    if (obs.observations != null && Number(obs.observations) < min) {
      return 'baseline too thin: ' + obs.observations + ' msfwar observation' + (Number(obs.observations) === 1 ? '' : 's') + ', fewer than ' + min;
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

  var DEFAULT_VALUE_MULTIPLIERS = { orb: 0.2 };

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
   * Each bucket item also carries units per US dollar and its ratio to msfwar's typical, so gold
   * can be read as "2.7M gold per US$, 3.1x typical". Event points have no value but do have
   * units per dollar. Rows sort by bucketRatio, then by units per dollar; rows without a valued
   * bucket item sort last. `results` come from rankOffers().
   * Each row is also read against the best offer in the store for the bucket, the way msfwar's
   * resource view does: vsBest is the row's ratio divided by the best row's (1 for the best,
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
        var item = items[l.key];
        if (!item || (bucketKey !== 'all' && shopBucket(item, l.key) !== bucketKey)) return;
        if (group && shopGroup(item, l.key, bucketKey, groups) !== group.key) return;
        if (l.qty > 0) groupQty += l.qty;
        var agg = byKey[l.key];
        if (!agg) {
          agg = byKey[l.key] = { item: l.item, key: l.key, qty: 0, perUsd: null, typicalPerUsd: item.observed && item.observed.perUsd != null ? Number(item.observed.perUsd) : null, typicalSource: (item.observed && item.observed.source) || (item.derived ? 'derived' : 'msfwar'), vsTypical: null, valueUsd: null, faceUsd: null, personalValueUsd: null, multiplier: l.multiplier, note: l.note || null, excluded: !!l.excluded, thin: !!l.thin, unitQty: null, unitPerUsd: null };
          order.push(l.key);
        }
        agg.qty += l.qty > 0 ? l.qty : 0;
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
        // ratio to msfwar's typical, undiscounted: units per dollar against the observed average
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
    for (var i = 0; i < list.length; i++) {
      if (perDollar >= list[i].min) return list[i].label;
    }
    return list[list.length - 1].label;
  }

  function toUsd(valueInUnits, meta) {
    var unitPerUsd = Number(meta && meta.unitPerUsd);
    if (!(unitPerUsd > 0)) unitPerUsd = 1;
    return valueInUnits / unitPerUsd;
  }

  /**
   * Convert an offer price to US dollars: through meta.fxToUsd for money, or through the value
   * table when the price is in an in-game currency the table knows (Strike Points, Power Cores).
   * Returns { usd, via } where via is 'fx', 'item' or 'assumed' (unknown currency taken at 1).
   */
  function priceToUsdDetail(price, currency, table, index) {
    var p = Number(price);
    if (isNaN(p)) return { usd: null, via: null };
    var meta = (isTable(table) && table.meta) || (table && table.fxToUsd ? table : {});
    var fx = meta.fxToUsd || {};
    var cur = String(currency || 'USD');
    var rate = Number(fx[cur.toUpperCase()]);
    if (rate > 0) return { usd: p * rate, via: 'fx' };
    if (isTable(table)) {
      var resolved = resolveItem(table, index, cur);
      var uv = resolved ? unitValue(resolved.item) : null;
      if (uv != null) return { usd: toUsd(p * uv, meta), via: 'item' };
    }
    return { usd: p, via: 'assumed' };
  }
  function priceToUsd(price, currency, meta) {
    return priceToUsdDetail(price, currency, isTable(meta) ? meta : { meta: meta, items: {} }).usd;
  }

  /** Which msfwar weighting bucket an item belongs to. */
  function scoringCategory(item, key) {
    if (!item) return 'other';
    if (key === 'gold' || normalizeKey(item.name) === 'gold') return 'gold';
    if (item.category === 'training') return 'training';
    if (item.category === 'shard') return 'shard';
    if (item.category === 'iso8' && /\b(t4|orange)\b/i.test(String(item.name) + ' ' + String(key))) return 'orangeIso';
    return 'other';
  }

  function letterFor(score, letters) {
    var list = (letters && letters.length ? letters : DEFAULT_SCORING.letters).slice().sort(function (a, b) {
      return b.min - a.min;
    });
    if (score == null || isNaN(score)) return null;
    for (var i = 0; i < list.length; i++) {
      if (score >= list[i].min) return list[i].label;
    }
    return list[list.length - 1].label;
  }

  /**
   * msfwar-style score for a set of valued lines against a US-dollar price.
   * Each line's ratio is (what its quantity is worth at the observed average) / (the offer price):
   * the units per dollar this offer gives, relative to the units per dollar seen historically.
   * ratio 1 scores typicalScore; every +1.0 of ratio adds scorePerRatio, clamped to the range.
   * Lines average within their category, categories combine by weight.
   * Returns { score, letter, categories: [...] } or { score: null } when nothing can be scored.
   */
  function scoreLines(lines, priceUsd, scoring, useKey) {
    var rules = Object.assign({}, DEFAULT_SCORING, scoring || {});
    var weights = Object.assign({}, DEFAULT_SCORING.weights, rules.weights || {});
    if (!(priceUsd > 0)) return { score: null, letter: null, categories: [] };
    var byCat = {};
    lines.forEach(function (l) {
      if (l.excluded || l.unitValue == null) return;
      var v = useKey === 'personalValue' ? l.personalValue : l.value;
      if (v == null) return;
      var ratio = v / priceUsd;
      var s = rules.typicalScore + (ratio - 1) * rules.scorePerRatio;
      s = Math.max(rules.minScore, Math.min(rules.maxScore, s));
      if (useKey === 'personalValue') { l.personalRatio = ratio; l.personalScore = s; } else { l.ratio = ratio; l.score = s; }
      var cat = l.scoringCategory || 'other';
      (byCat[cat] = byCat[cat] || []).push(s);
    });
    var cats = Object.keys(byCat);
    if (!cats.length) return { score: null, letter: null, categories: [] };
    var totalWeight = 0, acc = 0, breakdown = [];
    cats.forEach(function (c) {
      var w = Number(weights[c]);
      if (!(w > 0)) w = Number(weights.other) || 1;
      var avg = byCat[c].reduce(function (a, b) { return a + b; }, 0) / byCat[c].length;
      totalWeight += w;
      acc += w * avg;
      breakdown.push({ category: c, weight: w, score: avg, items: byCat[c].length });
    });
    var score = acc / totalWeight;
    return { score: score, letter: letterFor(score, rules.letters), categories: breakdown };
  }

  /**
   * Value a single offer.
   *
   * options: { index, personalize (default true when roster or plan given), grades, plan,
   *            chainMode ('step' rates a chain step on its own, the default; 'path' rates it on the whole path) }
   */
  function valueOffer(offer, table, roster, options) {
    options = options || {};
    var meta = (isTable(table) && table.meta) || {};
    var plan = options.plan || null;
    var index = options.index || buildIndex(table);
    var personalize = options.personalize == null ? !!(roster || plan) : !!options.personalize;
    var price = Number(offer && offer.price);
    var hasPrice = !isNaN(price) && price > 0;
    var currency = (offer && offer.currency) || meta.currency || 'USD';
    var priced = hasPrice ? priceToUsdDetail(price, currency, table, index) : { usd: null, via: null };
    var priceUsd = priced.usd;
    var contents = (offer && offer.contents) || [];

    var lines = [];
    var unknown = [];
    var unpriced = [];
    var thin = [];
    var excluded = [];
    var totalUnits = 0;
    var personalTotalUnits = 0;
    var complete = true;
    var valuedLines = 0;
    var planLines = 0;      // resolvable lines the plan could judge
    var planUseful = 0;     // ...of which it kept at least something

    contents.forEach(function (row) {
      var qty = Number(row && row.qty);
      if (isNaN(qty)) qty = 0;
      var label = (row && (row.item || row.key)) || '';
      var resolved = resolveItem(table, index, (row && row.key) || label);
      if (!resolved) {
        unknown.push(label);
        complete = false;
        lines.push({ item: label, key: null, qty: qty, unitValue: null, multiplier: 1, value: null, personalValue: null, note: 'not in value table' });
        return;
      }
      var name = resolved.item.name || label;
      if (resolved.item.excludeFromValue) {
        excluded.push(name);
        lines.push({ item: name, key: resolved.key, qty: qty, unitValue: null, multiplier: 1, value: null, personalValue: null, excluded: true, note: 'not counted: event or loyalty points' });
        return;
      }
      var pm = personalize ? personalMultiplier(resolved.item, roster, meta.shardRules, plan, resolved.key) : { multiplier: 1, notes: [], note: null };
      if (resolved.item.derived) pm.note = joinNotes(resolved.item.derived.note, pm.note);
      if (resolved.item.observed && resolved.item.observed.source === 'store' && !resolved.item.userValue) pm.note = joinNotes(storeNote(resolved.item.observed), pm.note);
      planLines += 1;
      if (pm.multiplier > 0) planUseful += 1;
      var uv = unitValue(resolved.item);
      if (uv == null) {
        unpriced.push(name);
        complete = false;
        lines.push({ item: name, key: resolved.key, qty: qty, unitValue: null, multiplier: pm.multiplier, value: null, personalValue: null, resource: pm.resource ? pm.resource.status : null, note: joinNotes('no value in table yet', pm.note) });
        return;
      }
      var problem = baselineProblem(resolved.item, meta.scoring);
      if (problem) {
        thin.push(name);
        complete = false;
        lines.push({ item: name, key: resolved.key, qty: qty, unitValue: null, multiplier: pm.multiplier, value: null, personalValue: null, thin: true, rawValue: uv * qty, resource: pm.resource ? pm.resource.status : null, note: joinNotes(problem, pm.note) });
        return;
      }
      var cm = valueMultiplier(resolved.item, meta);
      var face = uv * qty;
      var value = face * cm;
      var personalValue = value * pm.multiplier;
      totalUnits += value;
      personalTotalUnits += personalValue;
      valuedLines += 1;
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
        scoringCategory: scoringCategory(resolved.item, resolved.key),
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
    var coreTotal = 0, coreLines = 0, coreMissing = [];
    var coreApplicable = lines.some(function (l) { return !l.excluded; });   // points cannot be bought with cores
    lines.forEach(function (l) {
      if (l.excluded) { l.cores = null; return; }
      var cpu = l.key ? coresPerUnit(table.items[l.key], l.key) : null;
      if (cpu != null && l.qty > 0) { l.cores = l.qty * cpu; coreTotal += l.cores; coreLines += 1; }
      else { l.cores = null; coreMissing.push(l.item); }
    });

    if (offer && offer.notes) complete = false;

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
      var cumCores = coreLines ? coreTotal : 0, cumCoreLines = coreLines, cumCoreMissing = coreMissing.slice();
      var cumCoresOk = coreLines > 0 && !coreMissing.length && !(offer && offer.notes);
      var path = requires.map(function (st) {
        var sr = valueOffer({ name: st.name, price: st.price, currency: st.currency, contents: st.contents, notes: st.notes }, table, roster, Object.assign({}, options, { index: index }));
        if (!(sr.priceUsd > 0)) priceUnknown = true;
        if (sr.priceVia === 'assumed') assumedCurrency = true;
        cumPrice += sr.priceUsd || 0;
        cumUsd += sr.totalUsd;
        cumPersonal += sr.personalUsd;
        cumValued += sr.valuedLines;
        if (cumLocal != null) cumLocal = (sr.price != null && String(st.currency || currency) === String(currency)) ? cumLocal + sr.price : null;
        if (!sr.complete) pathComplete = false;
        cumCores += sr.coreCost || 0;
        cumCoreLines += sr.coreLines || 0;
        cumCoreMissing = cumCoreMissing.concat(sr.coreMissing || []);
        if (!sr.coreComplete) cumCoresOk = false;
        return { step: Number(st.step), name: st.name, price: st.price, currency: st.currency, priceUsd: sr.priceUsd, priceVia: sr.priceVia, totalUsd: sr.totalUsd, personalUsd: sr.personalUsd, perDollar: sr.perDollar, personalPerDollar: sr.personalPerDollar, complete: sr.complete, notes: sr.notes, lines: sr.lines, coreCost: sr.coreCost, coreComplete: sr.coreComplete };
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

    // msfwar-style score works on dollar-valued lines; convert line values when the table is in cores.
    var usdLines = lines.map(function (l) {
      var c = Object.assign({}, l);
      if (c.value != null) c.value = toUsd(c.value, meta);
      if (c.personalValue != null) c.personalValue = toUsd(c.personalValue, meta);
      return c;
    });
    var generic = scoreLines(usdLines, priceUsd, meta.scoring, 'value');
    var personal = personalize ? scoreLines(usdLines, priceUsd, meta.scoring, 'personalValue') : generic;
    usdLines.forEach(function (c, i) {
      lines[i].ratio = c.ratio;
      lines[i].score = c.score;
      lines[i].personalRatio = personalize ? c.personalRatio : c.ratio;
      lines[i].personalScore = personalize ? c.personalScore : c.score;
    });

    return {
      name: (offer && offer.name) || '',
      price: hasPrice ? price : null,
      currency: currency,
      priceUsd: priceUsd,
      priceVia: priced.via,
      unit: meta.unit || 'USD',
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
      coreApplicable: coreApplicable,
      coreComplete: coreLines > 0 && !coreMissing.length && !(offer && offer.notes),
      coreRateUsd: coreRateUsd,
      coreCostUsd: coreLines && coreRateUsd ? coreTotal * coreRateUsd : null,
      coreVsPrice: coreLines && coreRateUsd && priceUsd > 0 ? (coreTotal * coreRateUsd) / priceUsd : null,
      score: generic.score,
      letter: generic.letter,
      personalScore: personal.score,
      personalLetter: personal.letter,
      scoring: personalize ? personal.categories : generic.categories,
      personalized: personalize,
      helpsPlan: helpsPlan,
      valuedLines: valuedLines,
      complete: complete,
      unknown: unknown,
      unpriced: unpriced,
      thin: thin,
      excluded: excluded,
      notes: (offer && offer.notes) || null,
      lines: lines
    };
  }

  /** Value every offer and sort best value per dollar first (a chain step on its own, or by its whole path under chainMode 'path'); incomplete offers sort last. */
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
      if (a.complete !== b.complete) return a.complete ? -1 : 1;
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
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
   * Returns [{ key, name, category, typicalPerUsd, offers, whole: {name, perUsd, price, currency, qty}, share: {...} }],
   * sorted by category then name. perUsd is units per US dollar.
   */
  function bestPrices(results, table) {
    var meta = (isTable(table) && table.meta) || {};
    var items = itemsOf(table);
    var out = {};
    (results || []).forEach(function (r) {
      var path = pathLines(r);
      if (!path) return;
      // shares are allocated by face value (before any category discount), as the table's averages price things
      var faceTotal = 0;
      path.lines.forEach(function (l) { if (l.value != null && !l.excluded && !l.thin) faceTotal += toUsd(l.faceValue == null ? l.value : l.faceValue, meta); });
      if (!(faceTotal > 0)) return;
      // the same item can appear in several lines of a path (every step of a shard chain): total it first
      var byKey = {}, order = [];
      path.lines.forEach(function (l) {
        if (l.value == null || l.excluded || l.thin || !l.key || !(l.qty > 0)) return;
        var agg = byKey[l.key];
        if (!agg) { agg = byKey[l.key] = { item: l.item, qty: 0, faceUsd: 0 }; order.push(l.key); }
        agg.qty += l.qty;
        agg.faceUsd += toUsd(l.faceValue == null ? l.value : l.faceValue, meta);
      });
      order.forEach(function (key) {
        var l = byKey[key];
        var sharePrice = path.priceUsd * (l.faceUsd / faceTotal);
        var whole = l.qty / path.priceUsd;
        var share = sharePrice > 0 ? l.qty / sharePrice : null;
        var item = items[key] || {};
        var entry = out[key] || (out[key] = {
          key: key, name: item.name || l.item, category: item.category || 'other',
          typicalPerUsd: item.observed && item.observed.perUsd != null ? Number(item.observed.perUsd) : (unitValue(item) ? 1 / toUsd(unitValue(item), meta) : null),
          typicalSource: (item.observed && item.observed.source) || (item.derived ? 'derived' : (item.userValue ? 'user' : 'msfwar')),
          offers: 0, whole: null, share: null
        });
        entry.offers += 1;
        var ref = { name: r.name, price: path.price, currency: r.currency, priceUsd: path.priceUsd, qty: l.qty, steps: path.steps };
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
   * Price the items the table cannot value from the player's own store. For each unpriced item
   * (no value, no derivedFrom, not excluded) in an offer whose other lines are all valued:
   *   residual: the only unpriced item takes the price left after the valued lines (face value);
   *   shared:   several unpriced items of the same category split that residual evenly per unit.
   * Offers with an unknown, thin or unpriced item of another category are skipped, as are
   * bought chain steps, offers without a readable price and offers whose card hides part of the
   * contents ("+N More", carried as notes). Only offers priced in money count
   * unless options.fiatOnly is false (Strike Point prices are not real prices), and
   * options.categories (array) limits which unpriced items are estimated; an unpriced item
   * outside it blocks its offer. Returns { key: estimate } with perUsd (units per US$, the mean
   * over offers), observations, method, offers[] and value (table units for item.per).
   * Nothing is written: tools/fill-from-store.js does that.
   */
  function estimateFromStore(offers, table, options) {
    options = options || {};
    if (!isTable(table)) return {};
    // with refreshStore, items priced from the store earlier are priced again from today's offers
    if (options.refreshStore) {
      var work = { meta: table.meta, items: {} };
      Object.keys(table.items).forEach(function (k) {
        var it = table.items[k];
        work.items[k] = it && it.observed && it.observed.source === 'store' && !it.userValue ? Object.assign({}, it, { value: null }) : it;
      });
      table = work;
    }
    var meta = table.meta || {};
    var items = itemsOf(table);
    var cats = Array.isArray(options.categories) && options.categories.length ? options.categories : null;
    var results = rankOffers(offers, table, null, { personalize: false, chainMode: 'step', index: options.refreshStore ? null : options.index });
    var acc = {};
    results.forEach(function (r) {
      var path = pathLines(r);
      if (!path || !(path.priceUsd > 0)) return;
      if (r.notes) return;   // part of the contents is hidden: the price buys more than the listed items
      if (options.fiatOnly !== false && r.priceVia !== 'fx') return;
      var valuedUsd = 0, blocked = false;
      var upByKey = {}, upOrder = [];
      path.lines.forEach(function (l) {
        if (l.excluded) return;
        if (!l.key) { blocked = true; return; }
        var it = items[l.key];
        if (l.value != null) { valuedUsd += toUsd(l.faceValue == null ? l.value : l.faceValue, meta); return; }
        if (l.thin || !it || it.derivedFrom || it.excludeFromValue) { blocked = true; return; }
        if (cats && cats.indexOf(it.category || 'other') === -1) { blocked = true; return; }
        if (!(l.qty > 0)) { blocked = true; return; }
        var u = upByKey[l.key];
        if (!u) { u = upByKey[l.key] = { key: l.key, qty: 0, category: it.category || 'other', per: Number(it.per || 1) > 0 ? Number(it.per || 1) : 1 }; upOrder.push(l.key); }
        u.qty += l.qty;   // the same item listed twice (web bonus) is one observation
      });
      var unpriced = upOrder.map(function (k) { return upByKey[k]; });
      if (blocked || !unpriced.length) return;
      var cat = unpriced[0].category;
      if (unpriced.some(function (u) { return u.category !== cat; })) return;
      var residual = path.priceUsd - valuedUsd;
      if (!(residual > 0)) return;
      var totalQty = unpriced.reduce(function (a, u) { return a + u.qty; }, 0);
      var method = unpriced.length === 1 ? 'residual' : 'shared';
      unpriced.forEach(function (u) {
        var usdPerUnit = residual / totalQty;       // residual: totalQty is the item's own qty
        var e = acc[u.key] || (acc[u.key] = { key: u.key, name: items[u.key].name || u.key, per: u.per, estimates: [], offers: [], methods: {} });
        e.estimates.push(1 / usdPerUnit);
        e.offers.push({ name: r.name, price: path.price, currency: r.currency, priceUsd: path.priceUsd, qty: u.qty, totalQty: totalQty, items: unpriced.length, residualUsd: residual, method: method, perUsd: 1 / usdPerUnit });
        e.methods[method] = (e.methods[method] || 0) + 1;
      });
    });
    var out = {};
    Object.keys(acc).forEach(function (k) {
      var e = acc[k];
      var mean = e.estimates.reduce(function (a, b) { return a + b; }, 0) / e.estimates.length;
      out[k] = {
        key: k, name: e.name, per: e.per,
        perUsd: mean, observations: e.estimates.length,
        method: e.methods.residual && !e.methods.shared ? 'residual' : (e.methods.shared && !e.methods.residual ? 'shared' : 'mixed'),
        value: (e.per / mean) * (Number(meta.unitPerUsd) > 0 ? Number(meta.unitPerUsd) : 1),
        offers: e.offers
      };
    });
    return out;
  }

  /**
   * One day's price record for every item the store sells: units per US$ counting the whole
   * price (whole) and the item's share of the price by face value (share, null when the bundle
   * holds something the table cannot value), best and average over the offers that contain it,
   * for the trend view. Chain steps count on their own; offers with hidden contents, and offers
   * not priced in money (unless options.fiatOnly is false), are left out.
   */
  function priceSnapshot(offers, table, options) {
    options = options || {};
    var meta = (isTable(table) && table.meta) || {};
    var items = itemsOf(table);
    var results = rankOffers(offers, table, null, { personalize: false, chainMode: 'step', index: options.index });
    var acc = {};
    results.forEach(function (r) {
      var path = pathLines(r);
      if (!path || !(path.priceUsd > 0)) return;
      if (r.notes) return;   // hidden contents would understate what the price buys
      if (options.fiatOnly !== false && r.priceVia !== 'fx') return;   // Strike Point prices are not dollars
      var faceTotal = 0, hasUnknown = false;
      var byKey = {}, order = [];
      path.lines.forEach(function (l) {
        if (!l.key && !l.excluded && l.qty > 0) hasUnknown = true;   // an unknown item takes an unknown share of the price
        if (!l.key || l.excluded || !(l.qty > 0)) return;
        var a = byKey[l.key] || (byKey[l.key] = { qty: 0, face: 0, valued: true });
        if (!byKey[l.key].seen) { order.push(l.key); byKey[l.key].seen = true; }
        a.qty += l.qty;
        if (l.value != null && !l.thin) { var f = toUsd(l.faceValue == null ? l.value : l.faceValue, meta); a.face += f; faceTotal += f; }
        else a.valued = false;
      });
      var allValued = !hasUnknown && order.every(function (k) { return byKey[k].valued; });
      order.forEach(function (k) {
        var a = byKey[k];
        var e = acc[k] || (acc[k] = { whole: [], share: [], n: 0 });
        e.n += 1;
        e.whole.push(a.qty / path.priceUsd);
        if (allValued && faceTotal > 0 && a.face > 0) e.share.push(a.qty / (path.priceUsd * a.face / faceTotal));
      });
    });
    var day = {};
    Object.keys(acc).forEach(function (k) {
      var e = acc[k];
      var best = function (arr) { return arr.length ? Math.max.apply(null, arr) : null; };
      var avg = function (arr) { return arr.length ? arr.reduce(function (x, y) { return x + y; }, 0) / arr.length : null; };
      day[k] = { n: e.n, wb: best(e.whole), wa: avg(e.whole), sb: best(e.share), sa: avg(e.share) };
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

  /** One item's history: [{ date, n, wb, wa, sb, sa }] oldest first. */
  function historyFor(history, key) {
    return ((history && history.days) || []).filter(function (d) { return d.items && d.items[key]; }).map(function (d) { return Object.assign({ date: d.date }, d.items[key]); });
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
    DEFAULT_SCORING: DEFAULT_SCORING,
    normalizeKey: normalizeKey,
    buildIndex: buildIndex,
    resolveItem: resolveItem,
    unitValue: unitValue,
    baselineProblem: baselineProblem,
    resourceRule: resourceRule,
    personalMultiplier: personalMultiplier,
    gradeFor: gradeFor,
    letterFor: letterFor,
    priceToUsd: priceToUsd,
    priceToUsdDetail: priceToUsdDetail,
    bestPrices: bestPrices,
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
    estimateFromStore: estimateFromStore,
    priceSnapshot: priceSnapshot,
    mergeHistory: mergeHistory,
    historyFor: historyFor,
    isDay: isDay,
    DEFAULT_VALUE_MULTIPLIERS: DEFAULT_VALUE_MULTIPLIERS,
    valueMultiplier: valueMultiplier,
    SHOP_BUCKETS: SHOP_BUCKETS,
    shopBucket: shopBucket,
    shopBy: shopBy,
    scoringCategory: scoringCategory,
    scoreLines: scoreLines,
    valueOffer: valueOffer,
    rankOffers: rankOffers,
    parseContentsText: parseContentsText,
    parseCharacterList: parseCharacterList
  };
});
