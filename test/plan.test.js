'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('../engine.js');

// Fixture only: numbers chosen to make the arithmetic obvious.
const table = {
  meta: {
    unit: 'USD', unitPerUsd: 1, fxToUsd: { USD: 1 },
    scoring: { typicalScore: 70, scorePerRatio: 40, maxScore: 100, minScore: 0, minObservations: 5,
      weights: { gold: 30, training: 30, orangeIso: 20, shard: 15, other: 5 } },
    shardRules: { maxedMultiplier: 0, maxStars: 7 }
  },
  items: {
    'gold': { name: 'Gold', category: 'currency', per: 1000000, value: 1, observed: { perUsd: 1000000, observations: 50 } },
    'training_module:l4': { name: 'L4 Training Module', category: 'training', per: 100, value: 1, observed: { perUsd: 100, observations: 40 } },
    'training_module:l3': { name: 'L3 Training Module', category: 'training', per: 100, value: 0.5, observed: { perUsd: 200, observations: 40 } },
    'shard:iron man': { name: 'Iron Man shards', category: 'shard', character: 'Iron Man', per: 1, value: 0.1, observed: { perUsd: 10, observations: 12 } },
    'shard:thor': { name: 'Thor shards', category: 'shard', character: 'Thor', per: 1, value: 0.1, observed: { perUsd: 10, observations: 12 } },
    'shard:loki': { name: 'Loki shards', category: 'shard', character: 'Loki', per: 1, value: 0.1, observed: { perUsd: 10, observations: 4 } },
    'shard:hela': { name: 'Hela shards', category: 'shard', character: 'Hela', per: 1, value: 0.1, observed: { perUsd: 10, observations: 40, suspect: 'looks wrong' } },
    'ability_material:thor_ultimate': { name: "Thor's Ultimate Awakened Ability Material", category: 'ability', character: 'Thor', per: 1, value: 0.05, observed: { perUsd: 20, observations: 9 } },
    'iso8:t4 level 1 ions': { name: 'T4 Level 1 Ions', category: 'iso8', per: 1000, value: 1, observed: { perUsd: 1000, observations: 9 } },
    'iso8:t3 level 1 ions': { name: 'T3 Level 1 Ions', category: 'iso8', per: 1000, value: 1, observed: { perUsd: 1000, observations: 9 } },
    'gear:crimson_vial': { name: 'Crimson Vial', category: 'gear', per: 1, value: 1, observed: { perUsd: 1, observations: 9 } },
    'gear:superior_vial': { name: 'Superior Vial', category: 'gear', per: 1, value: 1, observed: { perUsd: 1, observations: 9 } }
  }
};
const plan = {
  characters: { 'Iron Man': {} },
  offListMultiplier: 0,
  surplusMultiplier: 0.25,
  resources: { 'training_module:l3': { status: 'surplus', note: 'only L4 budgeted' }, 'gold': { status: 'short' } },
  resourceRules: [
    { category: 'iso8', pattern: '\\bT4\\b', status: 'surplus', note: 'no orange ISO needed' },
    { category: 'iso8', pattern: '\\bT[123]\\b', status: 'short' },
    { category: 'gear', pattern: '^Crimson', status: 'short' },
    { category: 'gear', pattern: '^(Superior|Advanced)', status: 'surplus' }
  ]
};

test('character-bound items for someone off the build list count offListMultiplier', () => {
  const offer = { price: 10, contents: [{ item: 'Iron Man shards', qty: 100 }, { item: 'Thor shards', qty: 100 }] };
  const r = E.valueOffer(offer, table, null, { plan });
  assert.equal(r.personalized, true);
  assert.equal(r.totalUsd, 20);
  assert.equal(r.personalUsd, 10);
  assert.equal(r.lines[1].multiplier, 0);
  assert.match(r.lines[1].note, /not on your build list/);
  assert.equal(r.lines[0].multiplier, 1);
  // awakened materials carry the character too
  const r2 = E.valueOffer({ price: 1, contents: [{ item: "Thor's Ultimate Awakened Ability Material", qty: 20 }] }, table, null, { plan });
  assert.equal(r2.personalUsd, 0);
  assert.equal(r2.helpsPlan, false);
  assert.equal(r2.personalScore, 30);  // ratio 0 for you
  assert.equal(r2.score, 70);          // typical for everyone else
});

test('a custom offListMultiplier and an empty list behave sensibly', () => {
  const offer = { price: 10, contents: [{ item: 'Thor shards', qty: 100 }] };
  assert.equal(E.valueOffer(offer, table, null, { plan: Object.assign({}, plan, { offListMultiplier: 0.25 }) }).personalUsd, 2.5);
  // no characters listed: the list rule does not apply at all
  assert.equal(E.valueOffer(offer, table, null, { plan: Object.assign({}, plan, { characters: {} }) }).personalUsd, 10);
});

test('explicit resource status and pattern rules set the surplus multiplier', () => {
  const offer = { price: 10, contents: [
    { item: 'Gold', qty: 10000000 },            // short: full
    { item: 'L3 Training Module', qty: 1000 },  // explicit surplus: 25%
    { item: 'T4 Level 1 Ions', qty: 10000 },    // rule surplus: 25%
    { item: 'T3 Level 1 Ions', qty: 10000 },    // rule short: full
    { item: 'Crimson Vial', qty: 5 },           // rule short
    { item: 'Superior Vial', qty: 5 }           // rule surplus
  ] };
  const r = E.valueOffer(offer, table, null, { plan });
  const byItem = {};
  r.lines.forEach((l) => { byItem[l.item] = l; });
  assert.equal(byItem['Gold'].multiplier, 1);
  assert.equal(byItem['L3 Training Module'].multiplier, 0.25);
  assert.match(byItem['L3 Training Module'].note, /only L4 budgeted/);
  assert.equal(byItem['T4 Level 1 Ions'].multiplier, 0.25);
  assert.equal(byItem['T3 Level 1 Ions'].multiplier, 1);
  assert.equal(byItem['Crimson Vial'].multiplier, 1);
  assert.equal(byItem['Superior Vial'].multiplier, 0.25);
  assert.equal(E.resourceRule(table.items['iso8:t4 level 1 ions'], 'iso8:t4 level 1 ions', plan).status, 'surplus');
  assert.equal(E.resourceRule(table.items['gold'], 'gold', null), null);
});

test('thin and suspect baselines are listed but not scored', () => {
  const offer = { price: 10, contents: [{ item: 'Gold', qty: 10000000 }, { item: 'Loki shards', qty: 100 }, { item: 'Hela shards', qty: 100 }] };
  const r = E.valueOffer(offer, table, null, { plan: Object.assign({}, plan, { characters: {} }) });
  assert.deepEqual(r.thin, ['Loki shards', 'Hela shards']);
  assert.equal(r.totalUsd, 10);
  assert.equal(r.score, 70);
  assert.equal(r.complete, false);   // like unpriced items: the real value is higher than shown
  assert.match(r.lines[1].note, /too thin: 4 msfwar observations/);
  assert.match(r.lines[2].note, /looks wrong: looks wrong/);
  assert.equal(r.lines[1].rawValue, 10);
  // an offer made only of thin items gets no score and ranks after scored ones
  const only = E.valueOffer({ price: 10, contents: [{ item: 'Loki shards', qty: 100 }] }, table);
  assert.equal(only.score, null);
  const ranked = E.rankOffers([{ name: 'thin', price: 10, contents: [{ item: 'Loki shards', qty: 100 }] }, { name: 'gold', price: 10, contents: [{ item: 'Gold', qty: 10000000 }] }], table).map((x) => x.name);
  assert.deepEqual(ranked, ['gold', 'thin']);
  // the threshold is editable
  const loose = JSON.parse(JSON.stringify(table)); loose.meta.scoring.minObservations = 1;
  assert.deepEqual(E.valueOffer(offer, loose).thin, ['Hela shards']);
});

test('maxed-star and off-list rules multiply, and the plan alone turns personalization on', () => {
  const roster = { characters: { 'Thor': { stars: 7 } } };
  const r = E.valueOffer({ price: 10, contents: [{ item: 'Thor shards', qty: 100 }] }, table, roster, { plan: Object.assign({}, plan, { offListMultiplier: 0.5 }) });
  assert.equal(r.lines[0].multiplier, 0);
  assert.match(r.lines[0].note, /7 stars/);
  assert.match(r.lines[0].note, /build list/);
  const noPlan = E.valueOffer({ price: 10, contents: [{ item: 'Thor shards', qty: 100 }] }, table, null);
  assert.equal(noPlan.personalized, false);
  assert.equal(noPlan.helpsPlan, null);
});

test('helpsPlan judges every resolvable line, not the dollar total', () => {
  const onList = Object.assign({}, plan, { characters: { 'Iron Man': {}, 'Loki': {} } });
  // thin baseline but the character is on the list: the plan still wants it
  const thinOnList = E.valueOffer({ price: 10, contents: [{ item: 'Loki shards', qty: 100 }] }, table, null, { plan: onList });
  assert.equal(thinOnList.helpsPlan, true);
  assert.equal(thinOnList.lines[0].multiplier, 1);
  assert.equal(thinOnList.perDollar, null);    // nothing could be valued, so no ratio, no grade
  assert.equal(thinOnList.grade, null);
  assert.equal(thinOnList.complete, false);
  // thin baseline and off the list
  const thinOff = E.valueOffer({ price: 10, contents: [{ item: 'Loki shards', qty: 100 }] }, table, null, { plan });
  assert.equal(thinOff.helpsPlan, false);
  assert.equal(thinOff.lines[0].multiplier, 0);
  assert.match(thinOff.lines[0].note, /too thin.*; Loki is not on your build list/);
  // unpriced but marked short: still helps
  const t2 = JSON.parse(JSON.stringify(table)); t2.items['gear:crimson_vial'].value = null;
  const unpricedShort = E.valueOffer({ price: 10, contents: [{ item: 'Crimson Vial', qty: 5 }] }, t2, null, { plan });
  assert.equal(unpricedShort.helpsPlan, true);
  assert.equal(unpricedShort.unpriced.length, 1);
  // nothing resolvable at all: unknown
  const unknown = E.valueOffer({ price: 10, contents: [{ item: 'Mystery', qty: 1 }] }, table, null, { plan });
  assert.equal(unknown.helpsPlan, null);
  // only excluded points: unknown too
  const t3 = JSON.parse(JSON.stringify(table)); t3.items['points:x'] = { name: 'Event Points', category: 'points', per: 1, value: 1, excludeFromValue: true };
  assert.equal(E.valueOffer({ price: 10, contents: [{ item: 'Event Points', qty: 1 }] }, t3, null, { plan }).helpsPlan, null);
  // valued lines all zeroed: false; some kept: true
  assert.equal(E.valueOffer({ price: 10, contents: [{ item: 'Thor shards', qty: 100 }] }, table, null, { plan }).helpsPlan, false);
  assert.equal(E.valueOffer({ price: 10, contents: [{ item: 'Thor shards', qty: 100 }, { item: 'Gold', qty: 1 }] }, table, null, { plan }).helpsPlan, true);
});

test('a value typed by the user overrides a thin or suspect baseline', () => {
  const t = JSON.parse(JSON.stringify(table));
  t.items['shard:hela'].value = 0.2; t.items['shard:hela'].userValue = true;
  const r = E.valueOffer({ price: 10, contents: [{ item: 'Hela shards', qty: 100 }] }, t);
  assert.deepEqual(r.thin, []);
  assert.equal(r.totalUsd, 20);
  assert.equal(r.score, 100);
  assert.equal(E.baselineProblem(t.items['shard:hela'], t.meta.scoring), null);
  assert.match(E.baselineProblem(table.items['shard:hela'], table.meta.scoring), /looks wrong/);
});

test('resource rule patterns match the item name; keyPattern matches the table key', () => {
  const item = { name: 'L4 Training Module', category: 'training', per: 100, value: 1 };
  assert.equal(E.resourceRule(item, 'training_module:l4', { resourceRules: [{ category: 'training', pattern: 'Module$', status: 'surplus' }] }).status, 'surplus');
  assert.equal(E.resourceRule(item, 'training_module:l4', { resourceRules: [{ category: 'training', pattern: '^L4 Training Module$', status: 'surplus' }] }).status, 'surplus');
  assert.equal(E.resourceRule(item, 'training_module:l4', { resourceRules: [{ category: 'training', pattern: 'training_module', status: 'surplus' }] }), null);
  assert.equal(E.resourceRule(item, 'training_module:l4', { resourceRules: [{ category: 'training', keyPattern: ':l4$', status: 'short' }] }).status, 'short');
  assert.equal(E.resourceRule(item, 'training_module:l4', { resourceRules: [{ category: 'training', keyPattern: ':l3$', status: 'short' }] }), null);
  assert.equal(E.resourceRule(item, 'training_module:l4', { resourceRules: [{ category: 'training', pattern: '(', status: 'short' }] }), null);
});

test('parseCharacterList accepts lines and commas', () => {
  assert.deepEqual(Object.keys(E.parseCharacterList('Iron Man\nThor, Hela;  \n')), ['Iron Man', 'Thor', 'Hela']);
});
