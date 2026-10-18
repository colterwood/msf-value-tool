/*
 * MSF Store Value engine.
 *
 * Pure functions only: no DOM, no storage. Loaded by the browser page as
 * window.MSFEngine and by Node tests via module.exports.
 *
 * Value table shape (see data/values.js):
 *   {
 *     meta: {
 *       source: "msfwar.com Spenders Guide",
 *       unit: "USD" | "cores",       // what item values are expressed in
 *       unitPerUsd: 1,                // how many units one US dollar buys (1 for USD)
 *       grades: [{ min: 3, label: "Excellent" }, ...], // by value-per-dollar, descending
 *       shardRules: { maxedMultiplier: 0 }
 *     },
 *     items: {
 *       "gold": { name: "Gold", category: "currency", per: 100000, value: 0.5, aliases: [] },
 *       "shard:iron man": { name: "Iron Man shards", category: "shard", character: "Iron Man", per: 1, value: 0.2 }
 *     }
 *   }
 *
 * Offer shape (see data/offers.js and README):
 *   { name, price, currency, purchaseLimit, expires, source,
 *     contents: [{ item: "Gold", qty: 500000 }, { key: "shard:iron man", qty: 50 }] }
 *
 * Roster shape (see data/roster.js):
 *   { characters: { "Iron Man": { stars: 7, redStars: 5, gearTier: 17 } } }
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
  function resolveItem(table, index, nameOrKey) {
    if (!isTable(table) || nameOrKey == null) return null;
    var raw = String(nameOrKey);
    if (Object.prototype.hasOwnProperty.call(table.items, raw)) {
      return { key: raw, item: table.items[raw] };
    }
    var k = normalizeKey(raw);
    if (!k) return null;
    index = index || buildIndex(table);
    if (Object.prototype.hasOwnProperty.call(index, k)) {
      return { key: index[k], item: table.items[index[k]] };
    }
    // Common store phrasing: "50x Iron Man shards", "Iron Man Shard x50", "Iron Man character shards"
    var stripped = k
      .replace(/^\d+\s*x\s*/, '')
      .replace(/\s*x\s*\d+$/, '')
      .replace(/\bcharacter shards?\b/, 'shards')
      .replace(/\bshard\b/, 'shards')
      .trim();
    if (stripped !== k && Object.prototype.hasOwnProperty.call(index, stripped)) {
      return { key: index[stripped], item: table.items[index[stripped]] };
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

  function findRosterEntry(roster, character) {
    if (!roster || !roster.characters || !character) return null;
    var chars = roster.characters;
    if (Object.prototype.hasOwnProperty.call(chars, character)) return chars[character];
    var want = normalizeKey(character);
    var keys = Object.keys(chars);
    for (var i = 0; i < keys.length; i++) {
      if (normalizeKey(keys[i]) === want) return chars[keys[i]];
    }
    return null;
  }

  /**
   * Personal multiplier for an item given the roster. Returns { multiplier, note }.
   * Only shard rules exist today; gear and ISO-8 rules can be added here later.
   */
  function personalMultiplier(item, roster, shardRules) {
    var rules = Object.assign({}, DEFAULT_SHARD_RULES, shardRules || {});
    if (!item || item.category !== 'shard' || !item.character) return { multiplier: 1, note: null };
    var entry = findRosterEntry(roster, item.character);
    if (!entry) return { multiplier: 1, note: null };
    var stars = Number(entry.stars);
    if (!isNaN(stars) && stars >= rules.maxStars) {
      return {
        multiplier: Number(rules.maxedMultiplier),
        note: item.character + ' is already at ' + rules.maxStars + ' stars'
      };
    }
    return { multiplier: 1, note: null };
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
   * Value a single offer.
   *
   * options: { index, personalize (default true when roster given), grades }
   */
  function valueOffer(offer, table, roster, options) {
    options = options || {};
    var meta = (isTable(table) && table.meta) || {};
    var index = options.index || buildIndex(table);
    var personalize = options.personalize == null ? !!roster : !!options.personalize;
    var price = Number(offer && offer.price);
    var hasPrice = !isNaN(price) && price > 0;
    var contents = (offer && offer.contents) || [];

    var lines = [];
    var unknown = [];
    var unpriced = [];
    var totalUnits = 0;
    var personalTotalUnits = 0;
    var complete = true;

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
      var uv = unitValue(resolved.item);
      if (uv == null) {
        unpriced.push(resolved.item.name || resolved.key);
        complete = false;
        lines.push({ item: resolved.item.name || label, key: resolved.key, qty: qty, unitValue: null, multiplier: 1, value: null, personalValue: null, note: 'no value in table yet' });
        return;
      }
      var pm = personalize ? personalMultiplier(resolved.item, roster, meta.shardRules) : { multiplier: 1, note: null };
      var value = uv * qty;
      var personalValue = value * pm.multiplier;
      totalUnits += value;
      personalTotalUnits += personalValue;
      lines.push({
        item: resolved.item.name || label,
        key: resolved.key,
        qty: qty,
        unitValue: uv,
        multiplier: pm.multiplier,
        value: value,
        personalValue: personalValue,
        note: pm.note
      });
    });

    var totalUsd = toUsd(totalUnits, meta);
    var personalUsd = toUsd(personalTotalUnits, meta);
    var perDollar = hasPrice ? totalUsd / price : null;
    var personalPerDollar = hasPrice ? personalUsd / price : null;
    var effective = personalize ? personalPerDollar : perDollar;

    return {
      name: (offer && offer.name) || '',
      price: hasPrice ? price : null,
      currency: (offer && offer.currency) || meta.currency || 'USD',
      unit: meta.unit || 'USD',
      totalUnits: totalUnits,
      personalTotalUnits: personalTotalUnits,
      totalUsd: totalUsd,
      personalUsd: personalUsd,
      perDollar: perDollar,
      personalPerDollar: personalPerDollar,
      grade: gradeFor(effective, options.grades || meta.grades),
      personalized: personalize,
      complete: complete,
      unknown: unknown,
      unpriced: unpriced,
      lines: lines
    };
  }

  /** Value every offer and sort best value-per-dollar first. Incomplete offers sort last. */
  function rankOffers(offers, table, roster, options) {
    options = options || {};
    var index = options.index || buildIndex(table);
    var results = (offers || []).map(function (o) {
      var r = valueOffer(o, table, roster, Object.assign({}, options, { index: index }));
      r.offer = o;
      return r;
    });
    results.sort(function (a, b) {
      var av = a.personalized ? a.personalPerDollar : a.perDollar;
      var bv = b.personalized ? b.personalPerDollar : b.perDollar;
      if (a.complete !== b.complete) return a.complete ? -1 : 1;
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      return bv - av;
    });
    return results;
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

  return {
    DEFAULT_GRADES: DEFAULT_GRADES,
    DEFAULT_SHARD_RULES: DEFAULT_SHARD_RULES,
    normalizeKey: normalizeKey,
    buildIndex: buildIndex,
    resolveItem: resolveItem,
    unitValue: unitValue,
    personalMultiplier: personalMultiplier,
    gradeFor: gradeFor,
    valueOffer: valueOffer,
    rankOffers: rankOffers,
    parseContentsText: parseContentsText
  };
});
