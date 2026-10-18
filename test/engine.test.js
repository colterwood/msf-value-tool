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
    shardRules: { maxedMultiplier: 0, maxStars: 7 }
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
