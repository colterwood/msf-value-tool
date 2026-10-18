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
 *       scoring: {                    // msfwar-style 0-100 score (optional)
 *         typicalScore: 70, scorePerRatio: 40, maxScore: 100, minScore: 0,
 *         weights: { gold: 30, training: 30, orangeIso: 20, shard: 15, other: 5 },
 *         letters: [{ min: 90, label: "A" }, ...]
 *       },
 *       shardRules: { maxedMultiplier: 0 }
 *     },
 *     items: {
 *       "gold": { name: "Gold", category: "currency", per: 1000000, value: 1.13, aliases: [] },
 *       "shard:iron man": { name: "Iron Man shards", category: "shard", character: "Iron Man", per: 1, value: 0.2 },
 *       "points:iron_vengeance": { name: "...", category: "points", excludeFromValue: true }
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

  // msfwar's published scoring rules: typical historical value earns 70 (C); a resource giving
  // 25% more for the price earns 80 (B), 50% more earns 90 (A). Categories combine by weight and
  // only the categories present share the weighting. Letters below C and the clamp are this
  // tool's reading, so they live in the value table's meta.scoring where they can be edited.
  var DEFAULT_SCORING = {
    typicalScore: 70,
    scorePerRatio: 40,
    maxScore: 100,
    minScore: 0,
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

  /** Convert an offer price to US dollars through meta.fxToUsd. Unknown currencies pass through at 1. */
  function priceToUsd(price, currency, meta) {
    var p = Number(price);
    if (isNaN(p)) return null;
    var fx = (meta && meta.fxToUsd) || {};
    var cur = String(currency || 'USD').toUpperCase();
    var rate = Number(fx[cur]);
    if (!(rate > 0)) rate = 1;
    return p * rate;
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
      l.ratio = ratio;
      if (useKey === 'personalValue') l.personalScore = s; else l.score = s;
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
   * options: { index, personalize (default true when roster given), grades }
   */
  function valueOffer(offer, table, roster, options) {
    options = options || {};
    var meta = (isTable(table) && table.meta) || {};
    var index = options.index || buildIndex(table);
    var personalize = options.personalize == null ? !!roster : !!options.personalize;
    var price = Number(offer && offer.price);
    var hasPrice = !isNaN(price) && price > 0;
    var currency = (offer && offer.currency) || meta.currency || 'USD';
    var priceUsd = hasPrice ? priceToUsd(price, currency, meta) : null;
    var contents = (offer && offer.contents) || [];

    var lines = [];
    var unknown = [];
    var unpriced = [];
    var excluded = [];
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
      if (resolved.item.excludeFromValue) {
        excluded.push(resolved.item.name || resolved.key);
        lines.push({ item: resolved.item.name || label, key: resolved.key, qty: qty, unitValue: null, multiplier: 1, value: null, personalValue: null, excluded: true, note: 'not counted: event or loyalty points' });
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
        scoringCategory: scoringCategory(resolved.item, resolved.key),
        earlyEstimate: !!(resolved.item.observed && resolved.item.observed.earlyEstimate),
        note: pm.note
      });
    });

    if (offer && offer.notes) complete = false;

    var totalUsd = toUsd(totalUnits, meta);
    var personalUsd = toUsd(personalTotalUnits, meta);
    var perDollar = priceUsd ? totalUsd / priceUsd : null;
    var personalPerDollar = priceUsd ? personalUsd / priceUsd : null;
    var effective = personalize ? personalPerDollar : perDollar;

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
      lines[i].personalScore = c.personalScore;
    });

    return {
      name: (offer && offer.name) || '',
      price: hasPrice ? price : null,
      currency: currency,
      priceUsd: priceUsd,
      unit: meta.unit || 'USD',
      totalUnits: totalUnits,
      personalTotalUnits: personalTotalUnits,
      totalUsd: totalUsd,
      personalUsd: personalUsd,
      perDollar: perDollar,
      personalPerDollar: personalPerDollar,
      grade: gradeFor(effective, options.grades || meta.grades),
      score: generic.score,
      letter: generic.letter,
      personalScore: personal.score,
      personalLetter: personal.letter,
      scoring: personalize ? personal.categories : generic.categories,
      personalized: personalize,
      complete: complete,
      unknown: unknown,
      unpriced: unpriced,
      excluded: excluded,
      notes: (offer && offer.notes) || null,
      lines: lines
    };
  }

  /** Value every offer and sort best first. Score (when the table has one) beats ratio; incomplete offers sort last. */
  function rankOffers(offers, table, roster, options) {
    options = options || {};
    var index = options.index || buildIndex(table);
    var results = (offers || []).map(function (o) {
      var r = valueOffer(o, table, roster, Object.assign({}, options, { index: index }));
      r.offer = o;
      return r;
    });
    function sortKey(r) {
      var s = r.personalized ? r.personalScore : r.score;
      if (s != null) return s;
      var v = r.personalized ? r.personalPerDollar : r.perDollar;
      return v;
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
    DEFAULT_SCORING: DEFAULT_SCORING,
    normalizeKey: normalizeKey,
    buildIndex: buildIndex,
    resolveItem: resolveItem,
    unitValue: unitValue,
    personalMultiplier: personalMultiplier,
    gradeFor: gradeFor,
    letterFor: letterFor,
    priceToUsd: priceToUsd,
    scoringCategory: scoringCategory,
    scoreLines: scoreLines,
    valueOffer: valueOffer,
    rankOffers: rankOffers,
    parseContentsText: parseContentsText
  };
});
