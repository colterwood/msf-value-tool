'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('../engine.js');

// Fixture only: these numbers are made up for exercising the engine and are not
// the msfwar values. The shipped table lives in data/values.js.
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

test('estimateFromStore skips an offer with an unreadable count and reads unlisted points as nothing', () => {
  const offers = [
    { name: 'Teal', price: 10, currency: 'USD', contents: [{ item: 'Teal Gear Tier 17 piece', qty: 5 }, { item: 'Gold', qty: 500000 }, { item: 'Feast of Shadows Milestone Points', qty: 1000 }] },   // $5 left over 5 pieces
    { name: 'Teal?', price: 10, currency: 'USD', notes: 'qty unreadable for Gold', contents: [{ item: 'Teal Gear Tier 17 piece', qty: 5 }, { item: 'Gold', qty: null }] },
    { name: 'Teal??', price: 10, currency: 'USD', notes: 'qty unreadable for Teal Gear Tier 17 piece', contents: [{ item: 'Teal Gear Tier 17 piece', qty: null }, { item: 'Gold', qty: 500000 }] }   // the unpriced item itself has no count
  ];
  const est = E.estimateFromStore(offers, table, { categories: ['gear'], fiatOnly: false });
  assert.equal(est['gear:t17 teal'].observations, 1);
  assert.equal(est['gear:t17 teal'].perUsd, 1);
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
