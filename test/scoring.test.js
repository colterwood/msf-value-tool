'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('../engine.js');

// Fixture only: numbers chosen to make the arithmetic obvious, not msfwar's values.
const table = {
  meta: {
    unit: 'USD',
    unitPerUsd: 1,
    fxToUsd: { USD: 1, CAD: 0.5 },
    scoring: {
      typicalScore: 70, scorePerRatio: 40, maxScore: 100, minScore: 0,
      weights: { gold: 30, training: 30, orangeIso: 20, shard: 15, other: 5 },
      letters: [{ min: 90, label: 'A' }, { min: 80, label: 'B' }, { min: 70, label: 'C' }, { min: 60, label: 'D' }, { min: 0, label: 'F' }]
    },
    shardRules: { maxedMultiplier: 0, maxStars: 7 }
  },
  items: {
    'gold': { name: 'Gold', category: 'currency', per: 1000000, value: 1 },          // $1 per million
    'training_module:l4': { name: 'L4 Training Module', category: 'training', per: 100, value: 1 }, // $1 per 100
    'shard:iron man': { name: 'Iron Man shards', category: 'shard', character: 'Iron Man', per: 1, value: 0.1 },
    'iso8:t4 level 1 ions': { name: 'T4 Level 1 Ions', category: 'iso8', per: 1000, value: 1 },
    'points:event': { name: 'Event Milestone Points', category: 'points', per: 1, value: 0.001, excludeFromValue: true },
    'strike_points': { name: 'Strike Points', category: 'currency', per: 100, value: 1, excludeFromValue: true }
  }
};

test('a typical offer scores 70 and a C', () => {
  const r = E.valueOffer({ price: 10, currency: 'USD', contents: [{ item: 'Gold', qty: 10000000 }] }, table);
  assert.equal(r.priceUsd, 10);
  assert.equal(r.score, 70);
  assert.equal(r.letter, 'C');
  assert.equal(r.lines[0].ratio, 1);
});

test('25% and 50% more per dollar earn B and A; the score is capped', () => {
  assert.equal(E.valueOffer({ price: 8, contents: [{ item: 'Gold', qty: 10000000 }] }, table).letter, 'B');
  assert.equal(E.valueOffer({ price: 8, contents: [{ item: 'Gold', qty: 10000000 }] }, table).score, 80);
  const a = E.valueOffer({ price: 10, contents: [{ item: 'Gold', qty: 15000000 }] }, table);
  assert.equal(a.score, 90);
  assert.equal(a.letter, 'A');
  assert.equal(E.valueOffer({ price: 1, contents: [{ item: 'Gold', qty: 100000000 }] }, table).score, 100);
  // 1% of typical: 70 + (0.01 - 1) * 40 = 30.4, well above the floor of 0
  assert.ok(Math.abs(E.valueOffer({ price: 100, contents: [{ item: 'Gold', qty: 1000000 }] }, table).score - 30.4) < 1e-9);
  assert.equal(E.valueOffer({ price: 100, contents: [{ item: 'Gold', qty: 0 }] }, table).score, 30);
});

test('categories combine by weight, only those present', () => {
  // Gold at typical (70), training at 50% better (90): weights 30/30 -> 80.
  const r = E.valueOffer({ price: 10, contents: [{ item: 'Gold', qty: 10000000 }, { item: 'L4 Training Module', qty: 1500 }] }, table);
  assert.equal(r.score, 80);
  assert.equal(r.letter, 'B');
  assert.deepEqual(r.scoring.map((c) => c.category).sort(), ['gold', 'training']);
  // Add an orange ISO line at typical: (30*70 + 30*90 + 20*70) / 80 = 77.5
  const r2 = E.valueOffer({ price: 10, contents: [{ item: 'Gold', qty: 10000000 }, { item: 'L4 Training Module', qty: 1500 }, { item: 'T4 Level 1 Ions', qty: 10000 }] }, table);
  assert.equal(r2.score, 77.5);
});

test('items in one category share its weight', () => {
  // two shard lines, one typical and one double: shard category averages to (70+110->100)/2 = 85
  const t = JSON.parse(JSON.stringify(table));
  t.items['shard:thor'] = { name: 'Thor shards', category: 'shard', character: 'Thor', per: 1, value: 0.1 };
  const r = E.valueOffer({ price: 10, contents: [{ item: 'Iron Man shards', qty: 100 }, { item: 'Thor shards', qty: 200 }] }, t);
  assert.equal(r.score, 85);
});

test('event and loyalty points are listed but never counted', () => {
  const r = E.valueOffer({ price: 10, contents: [{ item: 'Gold', qty: 10000000 }, { item: 'Event Milestone Points', qty: 1e9 }, { item: 'Strike Points', qty: 1e6 }] }, table);
  assert.equal(r.totalUsd, 10);
  assert.equal(r.score, 70);
  assert.equal(r.complete, true);
  assert.deepEqual(r.excluded, ['Event Milestone Points', 'Strike Points']);
  assert.equal(r.lines[1].excluded, true);
});

test('prices in another currency convert through fxToUsd before any ratio', () => {
  const r = E.valueOffer({ price: 20, currency: 'CAD', contents: [{ item: 'Gold', qty: 10000000 }] }, table);
  assert.equal(r.priceUsd, 10);
  assert.equal(r.perDollar, 1);
  assert.equal(r.score, 70);
  const unknownCurrency = E.valueOffer({ price: 20, currency: 'XYZ', contents: [{ item: 'Gold', qty: 10000000 }] }, table);
  assert.equal(unknownCurrency.priceUsd, 20);
});

test('personal score drops when shards go to a maxed character', () => {
  const offer = { price: 10, contents: [{ item: 'Gold', qty: 10000000 }, { item: 'Iron Man shards', qty: 100 }] };
  const r = E.valueOffer(offer, table, { characters: { 'Iron Man': { stars: 7 } } });
  assert.equal(r.score, 70);          // generic: gold typical, shards typical
  assert.equal(r.letter, 'C');
  // personal: shards worth 0 -> ratio 0 -> score 30; (30*70 + 15*30) / 45 = 56.67
  assert.ok(Math.abs(r.personalScore - 56.666666) < 0.001);
  assert.equal(r.personalLetter, 'F');
});

test('an offer with hidden contents is incomplete, and rankOffers prefers score over ratio', () => {
  const offers = [
    { name: 'typical', price: 10, contents: [{ item: 'Gold', qty: 10000000 }] },
    { name: 'great', price: 10, contents: [{ item: 'Gold', qty: 20000000 }] },
    { name: 'hidden', price: 10, notes: '3 more item(s) not shown on the card', contents: [{ item: 'Gold', qty: 30000000 }] },
    { name: 'unknown', price: 10, contents: [{ item: 'Mystery', qty: 1 }] }
  ];
  const ranked = E.rankOffers(offers, table).map((r) => r.name);
  assert.deepEqual(ranked, ['great', 'typical', 'hidden', 'unknown']);
  const hidden = E.valueOffer(offers[2], table);
  assert.equal(hidden.complete, false);
  assert.equal(hidden.notes, '3 more item(s) not shown on the card');
});

test('tables without scoring still grade by ratio and return no score', () => {
  const t = { meta: { unit: 'USD', unitPerUsd: 1 }, items: { 'gold': { name: 'Gold', category: 'currency', per: 1000000, value: 1 } } };
  const r = E.valueOffer({ price: 5, contents: [{ item: 'Gold', qty: 10000000 }] }, t);
  assert.equal(r.perDollar, 2);
  assert.equal(r.grade, 'Good');
  assert.equal(typeof r.score, 'number'); // DEFAULT_SCORING applies when meta.scoring is absent
  assert.equal(r.score, 100);
  assert.equal(E.scoreLines([], 10, null, 'value').score, null);
});

test('scoringCategory buckets items the way msfwar weights them', () => {
  assert.equal(E.scoringCategory({ name: 'Gold', category: 'currency' }, 'gold'), 'gold');
  assert.equal(E.scoringCategory({ name: 'L4 Training Module', category: 'training' }, 'training_module:l4'), 'training');
  assert.equal(E.scoringCategory({ name: 'T4 Level 1 Ions', category: 'iso8' }, 'iso8:t4 level 1 ions'), 'orangeIso');
  assert.equal(E.scoringCategory({ name: 'T3 Level 5 Ions', category: 'iso8' }, 'iso8:t3 level 5 ions'), 'other');
  assert.equal(E.scoringCategory({ name: 'Thor shards', category: 'shard' }, 'shard:thor'), 'shard');
  assert.equal(E.scoringCategory({ name: 'Premium Orb Fragments', category: 'orb' }, 'orb:premium'), 'other');
});
