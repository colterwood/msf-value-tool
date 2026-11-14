'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('../engine.js');

// Fixture only: these numbers are made up for exercising the engine. The shipped table lives in
// data/values.js.
const table = {
  meta: {
    source: 'test fixture',
    unit: 'USD',
    unitPerUsd: 1,
    grades: [
      { min: 3, label: 'Excellent' },
      { min: 2, label: 'Good' },
      { min: 1, label: 'Fair' },
      { min: 0, label: 'Poor' }
    ],
    shardRules: { maxedMultiplier: 0, maxStars: 7 },
    valueMultipliers: { orb: 1 }   // this fixture prices orbs at face value; the lottery discount is tested in shop.test.js
  },
  items: {
    'gold': { name: 'Gold', category: 'currency', per: 100000, value: 1, aliases: ['Gold Coins'] },
    'power_cores': { name: 'Power Cores', category: 'currency', per: 100, value: 1, aliases: ['cores'] },
    'shard:iron man': { name: 'Iron Man shards', category: 'shard', character: 'Iron Man', per: 1, value: 0.1 },
    'orb:premium': { name: 'Premium Orb', category: 'orb', per: 1, value: 2.5, aliases: ['Premium Orbs'] },
    'gear:t17 teal': { name: 'Teal Gear Tier 17 piece', category: 'gear', per: 1, value: null }
  }
};

test('resolves keys, names, aliases and shard phrasing', () => {
  const idx = E.buildIndex(table);
  assert.equal(E.resolveItem(table, idx, 'gold').key, 'gold');
  assert.equal(E.resolveItem(table, idx, 'Gold').key, 'gold');
  assert.equal(E.resolveItem(table, idx, 'gold coins').key, 'gold');
  assert.equal(E.resolveItem(table, idx, 'Cores').key, 'power_cores');
  assert.equal(E.resolveItem(table, idx, 'Iron Man Shards').key, 'shard:iron man');
  assert.equal(E.resolveItem(table, idx, 'Iron Man character shards').key, 'shard:iron man');
  assert.equal(E.resolveItem(table, idx, 'Iron Man shard').key, 'shard:iron man');
  assert.equal(E.resolveItem(table, idx, 'Premium  Orbs').key, 'orb:premium');
  assert.equal(E.resolveItem(table, idx, 'Mystery Item'), null);
  assert.equal(E.resolveItem(table, idx, ''), null);
});

test('values an offer and grades it by value per dollar', () => {
  const offer = {
    name: 'Gold & Cores',
    price: 10,
    contents: [
      { item: 'Gold', qty: 1000000 },   // 10 USD
      { item: 'Power Cores', qty: 500 } // 5 USD
    ]
  };
  const r = E.valueOffer(offer, table);
  assert.equal(r.complete, true);
  assert.equal(r.totalUsd, 15);
  assert.equal(r.perDollar, 1.5);
  assert.equal(r.grade, 'Fair');
  assert.equal(r.personalized, false);
  assert.deepEqual(r.unknown, []);
  assert.equal(r.lines.length, 2);
  assert.equal(r.lines[0].value, 10);
});

test('per-unit scaling via "per" is applied', () => {
  assert.equal(E.unitValue(table.items.gold), 1 / 100000);
  assert.equal(E.unitValue({ value: 5 }), 5);
  assert.equal(E.unitValue({ value: null }), null);
  assert.equal(E.unitValue({ value: 'abc' }), null);
});

test('unknown and unpriced items mark the offer incomplete but still sum known value', () => {
  const offer = {
    price: 5,
    contents: [
      { item: 'Gold', qty: 500000 },           // 5 USD
      { item: 'Teal Gear Tier 17 piece', qty: 2 }, // in table, no value yet
      { item: 'Mystery Widget', qty: 1 }        // not in table
    ]
  };
  const r = E.valueOffer(offer, table);
  assert.equal(r.complete, false);
  assert.deepEqual(r.unknown, ['Mystery Widget']);
  assert.deepEqual(r.unpriced, ['Teal Gear Tier 17 piece']);
  assert.equal(r.totalUsd, 5);
  assert.equal(r.perDollar, 1);
  assert.equal(r.lines[1].note, 'no value in table yet');
  assert.equal(r.lines[2].note, 'not in value table');
});

test('roster personalization zeroes shards of a 7-star character', () => {
  const offer = { price: 10, contents: [{ item: 'Iron Man shards', qty: 100 }, { item: 'Premium Orb', qty: 4 }] };
  const roster = { characters: { 'iron man': { stars: 7 } } };
  const r = E.valueOffer(offer, table, roster);
  assert.equal(r.personalized, true);
  assert.equal(r.totalUsd, 20);          // 10 shards + 10 orbs, generic
  assert.equal(r.personalUsd, 10);       // shards worth nothing to this player
  assert.equal(r.perDollar, 2);
  assert.equal(r.personalPerDollar, 1);
  assert.equal(r.grade, 'Fair');         // grade follows the personal number
  assert.match(r.lines[0].note, /7 stars/);

  const below = E.valueOffer(offer, table, { characters: { 'Iron Man': { stars: 5 } } });
  assert.equal(below.personalUsd, 20);
  assert.equal(below.lines[0].note, null);

  const off = E.valueOffer(offer, table, roster, { personalize: false });
  assert.equal(off.personalized, false);
  assert.equal(off.grade, 'Good');
});

test('maxedMultiplier from table meta is honoured', () => {
  const t = JSON.parse(JSON.stringify(table));
  t.meta.shardRules.maxedMultiplier = 0.25;
  const r = E.valueOffer({ price: 1, contents: [{ item: 'Iron Man shards', qty: 40 }] }, t, { characters: { 'Iron Man': { stars: 7 } } });
  assert.equal(r.totalUsd, 4);
  assert.equal(r.personalUsd, 1);
});

test('core-denominated tables convert to dollars through unitPerUsd', () => {
  const t = {
    meta: { unit: 'cores', unitPerUsd: 100, grades: table.meta.grades },
    items: { 'gold': { name: 'Gold', category: 'currency', per: 100000, value: 200 } }
  };
  const r = E.valueOffer({ price: 1, contents: [{ item: 'Gold', qty: 100000 }] }, t);
  assert.equal(r.totalUnits, 200);
  assert.equal(r.totalUsd, 2);
  assert.equal(r.perDollar, 2);
  assert.equal(r.unit, 'cores');
});

test('offers without a price get no ratio or grade', () => {
  const r = E.valueOffer({ contents: [{ item: 'Gold', qty: 100000 }] }, table);
  assert.equal(r.price, null);
  assert.equal(r.perDollar, null);
  assert.equal(r.grade, null);
  assert.equal(r.totalUsd, 1);
});

test('rankOffers sorts best ratio first and incomplete offers last', () => {
  const offers = [
    { name: 'meh', price: 10, contents: [{ item: 'Gold', qty: 500000 }] },          // 0.5
    { name: 'great', price: 1, contents: [{ item: 'Premium Orb', qty: 2 }] },       // 5
    { name: 'partial', price: 1, contents: [{ item: 'Premium Orb', qty: 10 }, { item: '???', qty: 1 }] }, // 25 but incomplete
    { name: 'ok', price: 2, contents: [{ item: 'Power Cores', qty: 400 }] }         // 2
  ];
  const ranked = E.rankOffers(offers, table).map((r) => r.name);
  assert.deepEqual(ranked, ['great', 'ok', 'meh', 'partial']);
});

test('gradeFor uses descending thresholds and tolerates unsorted input', () => {
  const grades = [{ min: 0, label: 'Poor' }, { min: 2, label: 'Good' }, { min: 1, label: 'Fair' }];
  assert.equal(E.gradeFor(2.5, grades), 'Good');
  assert.equal(E.gradeFor(1, grades), 'Fair');
  assert.equal(E.gradeFor(0.2, grades), 'Poor');
  assert.equal(E.gradeFor(null, grades), null);
  assert.equal(E.gradeFor(3, undefined), 'Excellent');
});

test('parseContentsText handles common quantity phrasings', () => {
  const rows = E.parseContentsText('500,000 Gold\n50x Iron Man shards\nPremium Orb x3\n  \nRaid Ticket');
  assert.deepEqual(rows, [
    { item: 'Gold', qty: 500000 },
    { item: 'Iron Man shards', qty: 50 },
    { item: 'Premium Orb', qty: 3 },
    { item: 'Raid Ticket', qty: 1 }
  ]);
});

test('empty or malformed tables never throw', () => {
  assert.equal(E.resolveItem(null, null, 'Gold'), null);
  assert.equal(E.resolveItem({}, null, 'Gold'), null);
  const r = E.valueOffer({ price: 5, contents: [{ item: 'Gold', qty: 1 }] }, { meta: {}, items: {} });
  assert.equal(r.complete, false);
  assert.deepEqual(r.unknown, ['Gold']);
  assert.equal(r.totalUsd, 0);
  assert.equal(r.perDollar, null);   // nothing could be valued: no ratio and no grade rather than a confident 0x
  assert.equal(r.grade, null);
});

test('event milestone points the table does not list are read as points: listed, not counted, offer still complete', () => {
  const idx = E.buildIndex(table);
  const pts = E.resolveItem(table, idx, 'Feast of Shadows Milestone Points');
  assert.equal(pts.key, 'points:feast_of_shadows');
  assert.equal(pts.item.excludeFromValue, true);
  assert.equal(pts.item.generic, true);
  assert.equal(E.resolveItem(table, idx, "Mephisto's Summoning Milestone Points").key, 'points:mephistos_summoning');
  assert.equal(E.resolveItem(table, idx, 'Milestone Points'), null);   // no event name
  const r = E.valueOffer({ price: 10, contents: [{ item: 'Gold', qty: 1000000 }, { item: 'Feast of Shadows Milestone Points', qty: 300000000 }, { item: 'Feast of Shadows Milestone Points', qty: null }] }, table);
  assert.equal(r.complete, true);
  assert.deepEqual(r.unknown, []);
  assert.deepEqual(r.unreadable, []);
  assert.deepEqual(r.excluded, ['Feast of Shadows Milestone Points', 'Feast of Shadows Milestone Points']);
  assert.equal(r.perDollar, 1);
  assert.equal(r.lines[2].qty, null);
  assert.match(r.lines[2].note, /count unreadable/);
  // the event points bucket lists the offer, through the generic item
  const rows = E.shopBy([r], table, 'points');
  assert.equal(rows.length, 1);
  assert.equal(rows[0].items[0].key, 'points:feast_of_shadows');
  assert.equal(rows[0].items[0].excluded, true);
  // a table row with that name wins over the generic reading
  const t2 = JSON.parse(JSON.stringify(table));
  t2.items['points:feast'] = { name: 'Feast of Shadows Milestone Points', category: 'points', per: 1, value: null, excludeFromValue: true };
  assert.equal(E.resolveItem(t2, null, 'Feast of Shadows Milestone Points').key, 'points:feast');
});

test('a bare roster name with a count is that character\'s shards; a count of one is a promotion the card does not name', () => {
  const roster = { characters: { 'Dracula': { stars: 0 }, 'Iron Man': { stars: 3 } } };
  const r = E.valueOffer({ price: 10, contents: [{ item: 'Dracula', qty: 810 }, { item: 'Gold', qty: 1000000 }] }, table, roster, { personalize: false });
  assert.deepEqual(r.unknown, []);
  assert.deepEqual(r.unpriced, ['Dracula shards']);
  assert.equal(r.lines[0].key, 'shard:dracula');
  assert.equal(r.lines[0].qty, 810);
  assert.equal(r.lines[0].generic.character, 'Dracula');
  assert.match(r.lines[0].note, /read as shards/);
  assert.equal(r.complete, false);
  assert.equal(r.perDollar, 1);
  const rows = E.shopBy([r], table, 'character');     // the character bucket lists it
  assert.equal(rows.length, 1);
  assert.equal(rows[0].items[0].key, 'shard:dracula');
  // without a roster, with a count of one, or for a name the roster lacks, the name stays unknown
  assert.deepEqual(E.valueOffer({ price: 10, contents: [{ item: 'Dracula', qty: 810 }] }, table).unknown, ['Dracula']);
  const d1 = E.valueOffer({ price: 10, contents: [{ item: 'Dracula', qty: 1 }, { item: 'Dracula', qty: null }] }, table, roster, { personalize: false });
  assert.deepEqual(d1.unknown, []);
  assert.deepEqual(d1.promotions, ['Dracula']);          // a count of one: a diamond or promotion, even with no table row
  assert.deepEqual(d1.unreadable, ['Dracula']);          // no count: listed under the name the card showed
  assert.equal(d1.lines[0].key, null);
  assert.equal(d1.lines[1].key, 'shard:dracula');
  assert.equal(d1.complete, false);
  assert.deepEqual(E.valueOffer({ price: 10, contents: [{ item: 'Nobody', qty: 810 }] }, table, roster, { personalize: false }).unknown, ['Nobody']);
  // a character the table lists: the bare name with a count is shards, with a count of one a diamond or promotion
  const im = E.valueOffer({ price: 10, contents: [{ item: 'Iron Man', qty: 45 }, { item: 'Iron Man', qty: 1 }, { item: 'Iron Man', qty: null }] }, table);
  assert.equal(im.lines[0].key, 'shard:iron man');
  assert.equal(im.lines[0].value, 4.5);
  assert.equal(im.lines[1].key, null);
  assert.match(im.lines[1].note, /diamond or red star promotion/);
  assert.deepEqual(im.unknown, []);
  assert.deepEqual(im.promotions, ['Iron Man']);
  assert.equal(im.lines[1].promotion, true);
  assert.deepEqual(im.unreadable, ['Iron Man']);
  assert.equal(im.lines[2].item, 'Iron Man');
  assert.equal(im.lines[2].qty, null);
  assert.match(im.lines[2].note, /count unreadable on the card; a character icon/);
  assert.equal(im.complete, false);
  assert.equal(im.totalUsd, 4.5);
  assert.equal(E.valueOffer({ price: 1, contents: [{ item: 'Iron Man shards', qty: 1 }] }, table).lines[0].value, 0.1);   // "shards" said outright: one shard
});

test('an unreadable count makes the offer incomplete; a note about an unreadable count on points does not', () => {
  const r = E.valueOffer({ price: 10, notes: 'qty unreadable for Feast of Shadows Milestone Points', contents: [{ item: 'Gold', qty: 1000000 }, { item: 'Feast of Shadows Milestone Points', qty: null }] }, table);
  assert.equal(r.complete, true);
  assert.equal(r.hidden, false);
  assert.equal(r.notes, 'qty unreadable for Feast of Shadows Milestone Points');
  const r2 = E.valueOffer({ price: 10, notes: 'qty unreadable for Gold', contents: [{ item: 'Gold', qty: null }] }, table);
  assert.equal(r2.complete, false);
  assert.deepEqual(r2.unreadable, ['Gold']);
  assert.equal(r2.hidden, false);
  assert.equal(r2.totalUsd, 0);
  assert.equal(r2.lines[0].unitValue, 1 / 100000);
  const r3 = E.valueOffer({ price: 10, notes: 'qty unreadable for Feast of Shadows Milestone Points; 2 more item(s) not shown on the card', contents: [{ item: 'Gold', qty: 1000000 }, { item: 'Feast of Shadows Milestone Points', qty: null }] }, table);
  assert.equal(r3.complete, false);
  assert.equal(r3.hidden, true);
  assert.deepEqual(E.hiddenNotes('qty unreadable for X; 2 more item(s) not shown on the card; price unreadable'), ['2 more item(s) not shown on the card']);
  // an unreadable price is its own problem: incomplete, not hidden
  const r4 = E.valueOffer({ price: null, notes: 'price unreadable: CA$?', contents: [{ item: 'Gold', qty: 1000000 }] }, table);
  assert.equal(r4.complete, false);
  assert.equal(r4.hidden, false);
  assert.equal(r4.priceUnreadable, true);
  assert.equal(r3.priceUnreadable, false);
  assert.deepEqual(E.hiddenNotes(null), []);
  assert.deepEqual(E.hiddenNotes('item with no name (qty x5)'), ['item with no name (qty x5)']);
  // a chain path: a step whose only note is an unreadable points count is complete, so the path is too
  const steps = [
    { step: 1, name: 'A', price: 5, currency: 'USD', notes: 'qty unreadable for ISO Fest Milestone Points', contents: [{ item: 'Gold', qty: 500000 }, { item: 'ISO Fest Milestone Points', qty: null }] },
    { step: 2, name: 'B', price: 5, currency: 'USD', contents: [{ item: 'Gold', qty: 500000 }] }
  ];
  const s2 = E.valueOffer({ name: 'B', price: 5, currency: 'USD', contents: steps[1].contents, chain: { step: 2, of: 2, current: 1, steps } }, table, null, { chainMode: 'path' });
  assert.equal(s2.chain.pathComplete, true);
  assert.equal(s2.chain.requires[0].hidden, false);
  assert.equal(s2.complete, true);
});

test('generic points key the same whatever the count phrasing, and never throw on a non-table with a roster', () => {
  const idx = E.buildIndex(table);
  const a = E.resolveItem(table, idx, '50x Feast of Shadows Milestone Points');
  const b = E.resolveItem(table, idx, 'Feast of Shadows Milestone Points x50');
  assert.equal(a.key, 'points:feast_of_shadows');
  assert.equal(b.key, 'points:feast_of_shadows');
  assert.equal(a.item.name, 'Feast of Shadows Milestone Points');
  assert.equal(b.item.name, 'Feast of Shadows Milestone Points');
  const roster = { characters: { 'Dracula': {} } };
  [null, {}, { meta: {} }, { meta: {}, items: {} }].forEach((t) => {
    assert.doesNotThrow(() => E.valueOffer({ price: 5, contents: [{ item: 'Dracula', qty: 810 }, { item: 'Dracula', qty: 1 }] }, t, roster));
  });
  const r = E.valueOffer({ price: 5, contents: [{ item: 'Dracula', qty: 810 }] }, null, roster, { personalize: false });
  assert.deepEqual(r.unpriced, ['Dracula shards']);
  assert.deepEqual(r.coreMissing, ['Dracula shards']);
});

test('shop rows say when a count was unreadable, and offers with nothing priceable rank last', () => {
  const r = E.valueOffer({ name: 'Squad', price: 10, contents: [{ item: 'Iron Man shards', qty: null }, { item: 'Gold', qty: 500000 }] }, table);
  const rows = E.shopBy([r], table, 'character');
  assert.equal(rows.length, 1);
  assert.equal(rows[0].items[0].unreadable, true);
  assert.equal(rows[0].items[0].qty, 0);
  assert.equal(rows[0].items[0].perUsd, null);
  assert.equal(E.shopBy([r], table, 'gold')[0].items[0].unreadable, false);
  const ranked = E.rankOffers([
    { name: 'points only', price: 10, contents: [{ item: 'Feast of Shadows Milestone Points', qty: 100 }] },    // complete, nothing priceable
    { name: 'hidden', price: 10, notes: '2 more item(s) not shown on the card', contents: [{ item: 'Gold', qty: 1000000 }] },   // incomplete, 1x
    { name: 'plain', price: 10, contents: [{ item: 'Gold', qty: 500000 }] },                                     // complete, 0.5x
    { name: 'mystery', price: 10, contents: [{ item: '???', qty: 1 }] }                                           // incomplete, nothing priceable
  ], table);
  assert.deepEqual(ranked.map((x) => x.name), ['plain', 'hidden', 'points only', 'mystery']);
  assert.equal(ranked[2].complete, true);
  assert.equal(ranked[2].valuedLines, 0);
});

test('line values simply add up: no per-item divisor, and a setOf left on a row is ignored', () => {
  const t = { meta: { unit: 'USD', unitPerUsd: 1, valueMultipliers: { orb: 1 } }, items: {
    'iso8:a': { name: 'T3 Controller Armor Level 1 Iso-8', category: 'iso8', per: 1, value: 0.05, setOf: 5, observed: { perUsd: 20, observations: 20 } },
    'iso8:d': { name: 'T3 Controller Damage Level 1 Iso-8', category: 'iso8', per: 1, value: 0.05, observed: { perUsd: 20, observations: 20 } },
    gold: { name: 'Gold', category: 'currency', per: 1, value: 0.000001, observed: { perUsd: 1000000, observations: 50 } }
  } };   // share-basis values: each crystal type is worth its own share of what a set costs
  const offer = { name: 'Set', price: 10, contents: [{ item: 'T3 Controller Armor Level 1 Iso-8', qty: 50 }, { item: 'T3 Controller Damage Level 1 Iso-8', qty: 50 }] };
  const r = E.valueOffer(offer, t);
  assert.equal(r.lines[0].value, 2.5);            // 50 crystals at 20 per US$, counted in full
  assert.equal(r.lines[0].faceValue, 2.5);
  assert.equal(r.lines[0].setOf, undefined);
  assert.equal(r.lines[0].note, null);
  assert.equal(r.lines[0].vsTypical, 0.25);       // this line alone covers a quarter of the price
  assert.equal(r.totalUsd, 5);
  assert.equal(r.perDollar, 0.5);                 // and the lines add up to the offer's reading
  assert.equal(r.lines[0].vsTypical + r.lines[1].vsTypical, r.perDollar);
  // shop by resource reads the same numbers
  const rows = E.shopBy(E.rankOffers([offer], t), t, 'iso');
  assert.equal(rows[0].bucketRatio, 0.5);
  assert.equal(rows[0].items[0].vsTypical, 0.25);
  // the history snapshot and best buys share the price by value: each type pays half of it
  const tUsd = Object.assign({}, t, { meta: Object.assign({ fxToUsd: { USD: 1 } }, t.meta) });
  const snap = E.priceSnapshot({ updated: '2026-11-06T01:00:00Z', offers: [Object.assign({ currency: 'USD' }, offer)] }, tUsd);
  assert.equal(snap.items['iso8:a'].wb, 5);       // whole price: 50 for $10
  assert.equal(snap.items['iso8:a'].sb, 10);      // its share: 50 for $5
  const best = E.bestPrices(E.rankOffers([offer], t), t).find((x) => x.key === 'iso8:a');
  assert.equal(best.whole.perUsd, 5);
  assert.equal(best.share.perUsd, 10);
  assert.equal(best.share.sharePrice, 5);
  // beside gold: every item is charged its share by value, so each reads the offer's own ratio against typical
  const mixed = { name: 'Mixed', price: 20, contents: offer.contents.concat([{ item: 'Gold', qty: 10000000 }]) };   // $2.5 + $2.5 + $10 of value: 0.75x
  const mr = E.valueOffer(mixed, t);
  assert.equal(mr.perDollar, 0.75);
  const mb = E.bestPrices(E.rankOffers([mixed], t), t);
  assert.ok(Math.abs(mb.find((x) => x.key === 'gold').share.perUsd - 750000) < 1);
  assert.ok(Math.abs(mb.find((x) => x.key === 'iso8:a').share.perUsd - 15) < 1e-9);
});

test('a line with the store\'s resource id resolves by it; ids the table lacks still say what they are', () => {
  const t = { meta: { unit: 'USD', unitPerUsd: 1, valueMultipliers: { orb: 1 } }, items: {
    gold: { name: 'Gold', category: 'currency', per: 1000000, value: 1, id: 'SC', observed: { perUsd: 1000000, observations: 50 } },
    'shard:kingo': { name: 'Kingo shards', category: 'shard', character: 'Kingo', per: 1, value: 0.25, id: 'SHARD_KINGO', observed: { perUsd: 4, observations: 9 } },
    'promotion:kingo_3': { name: 'Kingo — 3 diamond promotion', category: 'promotion', character: 'Kingo', per: 1, value: 60, id: 'PD_KINGO_3', ids: ['PD_KINGO_3_ALT'], observed: { perUsd: 1 / 60, observations: 9 } }
  } };
  const r = E.valueOffer({ name: 'By id', price: 100, contents: [
    { item: 'Coins, as some page calls them', id: 'SC', qty: 2000000 },           // the id wins over a name the table never heard
    { item: 'Kingo', id: 'PD_KINGO_3_ALT', qty: 1 },                              // a bare name with an id is not guessed at: it is the promotion
    { item: 'Kingo shards', id: 'SHARD_KINGO', qty: 40 },
    { item: 'Cyber Breach Milestone Points', id: 'EVTA_META_NOV_C', qty: 5000 },  // points by id, no row needed
    { item: 'Strike Points', id: 'BFYB-CUR', qty: 300 },
    { item: 'Newcomer shards', id: 'SHARD_NEWCOMER', qty: 30 },                   // shards the table has no row for yet
    { item: 'BPTIER_STORM_1', id: 'BPTIER_STORM_1', qty: 1 }                      // a pass tier: nothing the store itemizes
  ] }, t);
  assert.deepEqual(r.lines.map((l) => l.key), ['gold', 'promotion:kingo_3', 'shard:kingo', 'points:cyber_breach', 'points:strike_points', 'shard:newcomer', null]);
  assert.equal(r.lines[1].value, 60);
  assert.deepEqual(r.promotions, []);
  assert.deepEqual(r.excluded, ['Cyber Breach Milestone Points', 'Strike Points']);
  assert.deepEqual(r.unpriced, ['Newcomer shards']);
  assert.deepEqual(r.unknown, []);
  assert.deepEqual(r.opaque, ['BPTIER_STORM_1']);
  assert.match(r.lines[6].note, /does not itemize/);
  assert.equal(r.complete, false);
  assert.equal(r.totalUsd, 2 + 60 + 10);
  // without an id the old card reading still applies: a bare character name with a count of one is an unnamed promotion
  const card = E.valueOffer({ price: 10, contents: [{ item: 'Kingo', qty: 1 }] }, t);
  assert.deepEqual(card.promotions, ['Kingo']);
  // a free claim hides nothing
  const free = E.valueOffer({ price: null, notes: 'free claim', contents: [{ item: 'Gold', id: 'SC', qty: 1000000 }] }, t);
  assert.equal(free.hidden, false);
  assert.equal(free.complete, true);
});

test('prices are money in the table\'s own currency; in-game prices with no value are not converted; grades follow the number shown', () => {
  const t = { meta: { currency: 'CAD', fxToUsd: { CAD: 1, USD: 1.35 } }, items: {
    gold: { name: 'Gold', category: 'currency', per: 1000000, value: 1, observed: { perCash: 1000000 } },
    power_cores: { name: 'Power Cores', category: 'currency', per: 100, value: 1.25 },
    strike_points: { name: 'Strike Points', category: 'currency', per: 100, value: null, excludeFromValue: true }
  } };
  assert.deepEqual(E.priceToUsdDetail(129.99, 'CAD', t), { usd: 129.99, via: 'fx' });   // the store's own currency: what you pay
  assert.deepEqual(E.priceToUsdDetail(10, 'usd', t), { usd: 13.5, via: 'fx' });          // another currency the table has a rate for
  assert.deepEqual(E.priceToUsdDetail(200, 'Power Cores', t), { usd: 2.5, via: 'item' });
  assert.deepEqual(E.priceToUsdDetail(2500, 'Strike Points', t), { usd: null, via: 'unpriced' });   // known, but nothing says what a point costs
  assert.deepEqual(E.priceToUsdDetail(10, 'Gems', t), { usd: 10, via: 'assumed' });
  assert.equal(E.isMoneyVia('fx'), true);
  assert.equal(E.isMoneyVia('item'), false);
  assert.equal(E.isMoneyVia('cores'), false);
  // with no currency named, the offer is in the table's
  const plain = E.valueOffer({ price: 10, contents: [{ item: 'Gold', qty: 15000000 }] }, t);
  assert.equal(plain.currency, 'CAD');
  assert.equal(plain.perDollar, 1.5);
  assert.equal(plain.unit, 'CAD');
  // a Strike Store price: no ratio and no grade, but the value each point buys
  const sp = E.valueOffer({ name: 'Gold Standard', price: 2500, currency: 'Strike Points', contents: [{ item: 'Gold', qty: 2000000 }] }, t);
  assert.equal(sp.priceUsd, null);
  assert.equal(sp.priceVia, 'unpriced');
  assert.equal(sp.perDollar, null);
  assert.equal(sp.grade, null);
  assert.equal(sp.totalUsd, 2);
  assert.equal(sp.perPriceUnit, 2 / 2500);
  assert.equal(plain.perPriceUnit, null);
  // the same in Ultra Cores: no core price either, so the cores of value each point buys
  const tc = JSON.parse(JSON.stringify(t)); tc.items.gold.coreValue = 8;
  const spCores = E.valueOffer({ name: 'Gold Standard', price: 2500, currency: 'Strike Points', contents: [{ item: 'Gold', qty: 2000000 }] }, tc, null, { mode: 'cores' });
  assert.equal(spCores.perDollar, null);
  assert.equal(spCores.totalUsd, 16);
  assert.equal(spCores.perPriceUnit, 16 / 2500);
  // 0.9998x shows as 1.00x, so it grades as 1.00x
  const grades = [{ min: 1, label: 'D' }, { min: 0, label: 'F' }];
  assert.equal(E.gradeFor(0.9998, grades), 'D');
  assert.equal(E.gradeFor(0.994, grades), 'F');
  const r = E.valueOffer({ price: 9.99, currency: 'CAD', contents: [{ item: 'Gold', qty: 9988000 }] }, Object.assign({}, t, { meta: Object.assign({ grades: grades }, t.meta) }));
  assert.equal(r.perDollar.toFixed(2), '1.00');
  assert.equal(r.grade, 'D');
});

test('an offer is valued per CA$ or per Ultra Core: each item on its own, adding up to the whole offer', () => {
  const t = { meta: { currency: 'CAD', fxToUsd: { CAD: 1 }, grades: [{ min: 1.5, label: 'B' }, { min: 1, label: 'D' }, { min: 0, label: 'F' }] }, items: {
    'ability_material:t4': { name: 'T4 Ability Material', category: 'ability', per: 100, value: 2.5, coreValue: 20, observed: { perCash: 40, perCore: 5, basis: 'own', days: ['2026-10-18', '2026-10-24'] } },
    'iso8:t4_level_1_ions': { name: 'T4 Level 1 Ions', category: 'iso8', per: 1000, value: 0.2, coreValue: 1.25, observed: { perCash: 5000, perCore: 800, basis: 'own', firstSeen: true } },
    'orb:new': { name: 'New Orb Fragments', category: 'orb', per: 1, value: 0.01, coreValue: null, observed: { perCash: 100, perCore: null, basis: 'set' } },
    'training_module:l4': { name: 'L4 Training Module', category: 'training', per: 100, value: 0.5, coreValue: 4, xp: 1600, observed: { perCash: 200, perCore: 25, basis: 'own' } },
    'training_module:l3': { name: 'L3 Training Module', category: 'training', per: 1, value: null, xp: 800, derivedFrom: { key: 'training_module:l4', ratio: 0.5, basis: 'XP' } },
    strike_points: { name: 'Strike Points', category: 'currency', per: 100, value: null, excludeFromValue: true }
  } };
  const offer = { name: 'Turn Up the Power', price: 6.99, currency: 'CAD', ultraCores: 50, contents: [
    { item: 'T4 Ability Material', qty: 200 }, { item: 'T4 Level 1 Ions', qty: 20000 }, { item: 'Strike Points', qty: 500 }] };
  const cash = E.valueOffer(offer, t);
  assert.equal(cash.mode, 'cash');
  assert.equal(cash.unit, 'CAD');
  assert.equal(cash.lines[0].value, 5);                      // 200 at 40 per CA$
  assert.equal(cash.lines[1].value, 4);                      // 20,000 at 5,000 per CA$
  assert.ok(Math.abs(cash.lines[0].vsTypical - 5 / 6.99) < 1e-12);     // the offer for the ability materials alone
  assert.ok(Math.abs(cash.lines[1].vsTypical - 4 / 6.99) < 1e-12);     // ... for the ions alone
  assert.ok(Math.abs(cash.perDollar - 9 / 6.99) < 1e-12);              // ... and whole: the lines add up
  assert.ok(Math.abs(cash.lines[0].vsTypical + cash.lines[1].vsTypical - cash.perDollar) < 1e-12);
  assert.equal(cash.lines[0].usualPer, 40);
  assert.equal(cash.lines[0].basis, 'own');
  assert.equal(cash.grade, 'D');
  // the same offer by its Ultra Core price, against each item's usual price in cores
  const cores = E.valueOffer(offer, t, null, { mode: 'cores' });
  assert.equal(cores.mode, 'cores');
  assert.equal(cores.unit, 'Ultra Cores');
  assert.equal(cores.currency, 'Ultra Cores');
  assert.equal(cores.price, 50);
  assert.equal(cores.priceVia, 'cores');
  assert.equal(cores.lines[0].value, 40);                    // 200 at 5 per core
  assert.equal(cores.lines[1].value, 25);                    // 20,000 at 800 per core
  assert.equal(cores.lines[0].vsTypical, 0.8);
  assert.equal(cores.lines[1].vsTypical, 0.5);
  assert.equal(cores.perDollar, 1.3);
  assert.equal(cores.lines[0].usualPer, 5);
  // items with no earlier price are named: they rate about 1x by construction
  assert.deepEqual(cash.fresh, ['T4 Level 1 Ions']);
  assert.ok(Math.abs(cash.freshShare - 4 / 9) < 1e-12);
  assert.equal(cash.lines[1].firstSeen, true);
  assert.equal(cash.lines[0].firstSeen, false);
  // a card read shows no core price: with nothing else to go by there is nothing to rate in cores, and the value still shows
  const bare = offer.contents.slice(0, 2);
  const noCores = E.valueOffer({ name: 'Card read', price: 6.99, currency: 'CAD', contents: bare }, t, null, { mode: 'cores' });
  assert.equal(noCores.price, null);
  assert.equal(noCores.perDollar, null);
  assert.equal(noCores.totalUsd, 65);
  assert.equal(noCores.ultraCores, null);
  // its web bonus says what it costs in cores: 10 Strike Points per Ultra Core
  const byBonus = E.valueOffer({ name: 'Card read', price: 6.99, currency: 'CAD', contents: offer.contents }, t, null, { mode: 'cores' });
  assert.equal(byBonus.price, 50);
  assert.equal(byBonus.coresInferred, true);
  assert.equal(byBonus.coresVia, 'bonus');                  // and the result says where the core price came from
  assert.equal(byBonus.perDollar, 1.3);
  // with no bonus line, a price that sits on a tier the table knows the core price of
  const tiered = Object.assign({}, t, { meta: Object.assign({ coreTiers: [[6.99, 50], [12.99, 100], [99.99, 700]] }, t.meta) });
  const inferred = E.valueOffer({ name: 'Card read', price: 6.99, currency: 'CAD', contents: bare }, tiered, null, { mode: 'cores' });
  assert.equal(inferred.price, 50);
  assert.equal(inferred.coresInferred, true);
  assert.equal(inferred.coresVia, 'tier');
  assert.equal(inferred.perDollar, 1.3);
  // the bonus wins over the tier: CA$99.99 is sold at 700, 750 and 800 cores
  assert.deepEqual(E.coresFor({ price: 99.99, currency: 'CAD', contents: [{ item: 'Gold', qty: 1 }, { item: 'Strike Points', qty: 7500 }] }, tiered.meta), { cores: 750, inferred: true, via: 'bonus' });
  assert.deepEqual(E.coresFor({ price: 12.99, currency: 'CAD' }, tiered.meta), { cores: 100, inferred: true, via: 'tier' });
  assert.deepEqual(E.coresFor({ price: 12.99, currency: 'CAD', ultraCores: 90 }, tiered.meta), { cores: 90, inferred: false, via: 'given' });   // the read's own figure wins
  assert.deepEqual(E.coresFor({ price: 13.5, currency: 'CAD' }, tiered.meta), { cores: null, inferred: false });                  // not a tier
  assert.deepEqual(E.coresFor({ price: 6.99, currency: 'Strike Points' }, tiered.meta), { cores: null, inferred: false });       // not money
  // a read from the page data (its lines carry ids) gives the core price where there is one: none given means none
  assert.deepEqual(E.coresFor({ price: 12.99, currency: 'CAD', contents: [{ item: 'Gold', id: 'SC', qty: 1 }] }, tiered.meta), { cores: null, inferred: false });
  assert.deepEqual(E.coresFor({ price: 12.99, currency: 'CAD', contents: [{ item: 'Ultra Cores', qty: 100 }] }, tiered.meta), { cores: null, inferred: false });   // cores are not sold for cores
  assert.equal(E.valueOffer(offer, tiered).ultraCores, 50);                    // the cash view knows the core price too
  // an item with a money price but no core price is unpriced in cores, and the offer incomplete there
  const mixed = E.valueOffer({ price: 1, ultraCores: 10, contents: [{ item: 'New Orb Fragments', qty: 50 }, { item: 'T4 Ability Material', qty: 100 }] }, t, null, { mode: 'cores' });
  assert.deepEqual(mixed.unpriced, ['New Orb Fragments']);
  assert.equal(mixed.complete, false);
  assert.equal(mixed.totalUsd, 20);
  assert.equal(E.valueOffer({ price: 1, ultraCores: 10, contents: [{ item: 'New Orb Fragments', qty: 50 }] }, t).totalUsd, 0.5);
  // a level priced from another carries both prices
  const l3 = E.deriveItem(t, 'training_module:l3');
  assert.equal(E.unitValue(l3), 0.0025);
  assert.equal(E.coreUnitValue(l3), 0.02);
  assert.equal(E.usualPer(l3, 'cash'), 400);
  assert.equal(E.usualPer(l3, 'cores'), 50);
  assert.equal(E.valueOffer({ price: 1, ultraCores: 8, contents: [{ item: 'L3 Training Module', qty: 400 }] }, t, null, { mode: 'cores' }).perDollar, 1);
  // usualPer falls back to the value when the table gives no per-price figure
  assert.equal(E.usualPer({ per: 100, value: 4 }, 'cash'), 25);
  assert.equal(E.usualPer({ per: 100, value: 4 }, 'cores'), null);
  // chain steps carry their own core price, and a path adds them up
  const step = (n, price, uc, qty) => ({ step: n, name: 'Chain', price: price, currency: 'CAD', ultraCores: uc, contents: [{ item: 'T4 Ability Material', qty: qty }] });
  const steps = [step(1, 6.99, 50, 200), step(2, 12.99, 100, 600)];
  const second = { name: 'Chain (step 2 of 2)', price: 12.99, currency: 'CAD', ultraCores: 100, contents: steps[1].contents, chain: { name: 'Chain', step: 2, of: 2, current: 1, steps: steps } };
  const path = E.valueOffer(second, t, null, { mode: 'cores', chainMode: 'path' });
  assert.equal(path.chain.cumulativePrice, 150);
  assert.equal(path.chain.cumulativePriceUsd, 150);
  assert.ok(Math.abs(path.chain.cumulativePerDollar - (40 + 120) / 150) < 1e-12);
  assert.ok(Math.abs(path.rankRatio - 160 / 150) < 1e-12);
  // rankOffers, shop rows and best buys follow the mode
  const ranked = E.rankOffers([offer], t, null, { mode: 'cores', personalize: false });
  assert.equal(ranked[0].mode, 'cores');
  const rows = E.shopBy(ranked, t, 'ability');
  assert.equal(rows[0].items[0].typicalPerUsd, 5);
  assert.equal(rows[0].items[0].perUsd, 4);                  // 200 for 50 cores
  assert.equal(rows[0].bucketRatio, 0.8);
  const best = E.bestPrices(ranked, t).find((b) => b.key === 'ability_material:t4');
  assert.equal(best.typicalPerUsd, 5);
  assert.equal(best.whole.perUsd, 4);
  const snap = E.priceSnapshot({ updated: '2026-11-14T01:00:00Z', offers: [offer] }, t, { mode: 'cores' });
  assert.equal(snap.items['ability_material:t4'].wb, 4);
  assert.equal(E.priceSnapshot({ updated: '2026-11-14T01:00:00Z', offers: [offer] }, t).items['ability_material:t4'].wb, 200 / 6.99);
  const hist = { days: [{ date: '2026-11-14', items: { gold: { n: 1, wb: 3 } }, coreItems: { gold: { n: 1, wb: 7 } } }] };
  assert.deepEqual(E.historyFor(hist, 'gold'), [{ date: '2026-11-14', n: 1, wb: 3 }]);
  assert.deepEqual(E.historyFor(hist, 'gold', 'cores'), [{ date: '2026-11-14', n: 1, wb: 7 }]);
});
