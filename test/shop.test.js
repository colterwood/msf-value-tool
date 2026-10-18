'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('../engine.js');

const table = {
  meta: { unit: 'USD', unitPerUsd: 1, fxToUsd: { USD: 1 },
    grades: [{ min: 2.5, label: 'A' }, { min: 1.75, label: 'B' }, { min: 1.25, label: 'C' }, { min: 1, label: 'D' }, { min: 0, label: 'F' }] },
  items: {
    'gold': { name: 'Gold', category: 'currency', per: 1000000, value: 1, observed: { perUsd: 1000000, observations: 50 } },
    'training_module:l4': { name: 'L4 Training Module', category: 'training', per: 100, value: 1, observed: { perUsd: 100, observations: 40 } },
    'shard:iron man': { name: 'Iron Man shards', category: 'shard', character: 'Iron Man', per: 1, value: 0.1, observed: { perUsd: 10, observations: 12 } },
    'promotion:iron_man_3_diamond': { name: 'Iron Man — 3 diamond promotion', category: 'promotion', character: 'Iron Man', per: 1, value: 30, observed: { perUsd: 0.033, observations: 8 } },
    'ability_material:iron_man_basic': { name: "Iron Man's Basic Awakened Ability Material", category: 'ability', character: 'Iron Man', per: 1, value: 0.05, observed: { perUsd: 20, observations: 8 } },
    'ability_material:t4': { name: 'T4 Ability Material', category: 'ability', per: 100, value: 3, observed: { perUsd: 33, observations: 30 } },
    'points:event': { name: 'Event Milestone Points', category: 'points', per: 1000000, value: 0.3, excludeFromValue: true, observed: { perUsd: 3300000, observations: 200 } },
    'iso8:t3 level 5 ions': { name: 'T3 Level 5 Ions', category: 'iso8', per: 1000000, value: 3, observed: { perUsd: 333333, observations: 50 } },
    'gear:crimson_vial': { name: 'Crimson Vial', category: 'gear', per: 1, value: null },
    'orb:premium': { name: 'Premium Orb Fragments', category: 'orb', per: 1000, value: 2, observed: { perUsd: 500, observations: 20 } },
    'power_cores': { name: 'Power Cores', category: 'currency', per: 100, value: 1, observed: { perUsd: 100, observations: 60 } }
  }
};

test('items map to the shopping buckets', () => {
  const b = (k) => E.shopBucket(table.items[k], k);
  assert.equal(b('gold'), 'gold');
  assert.equal(b('training_module:l4'), 'training');
  assert.equal(b('shard:iron man'), 'character');
  assert.equal(b('promotion:iron_man_3_diamond'), 'character');
  assert.equal(b('ability_material:iron_man_basic'), 'character');
  assert.equal(b('ability_material:t4'), 'ability');
  assert.equal(b('points:event'), 'points');
  assert.equal(b('iso8:t3 level 5 ions'), 'iso');
  assert.equal(b('gear:crimson_vial'), 'gear');
  assert.equal(b('orb:premium'), 'orbs');
  assert.equal(b('power_cores'), 'other');
  assert.deepEqual(E.SHOP_BUCKETS.map((x) => x.key), ['gold', 'training', 'character', 'ability', 'points', 'iso', 'gear', 'orbs', 'other']);
});

test('orbs count a fraction of face value, by default 20%, editable in meta.valueMultipliers', () => {
  const r = E.valueOffer({ price: 10, contents: [{ item: 'Premium Orb Fragments', qty: 10000 }] }, table);  // face $20
  assert.equal(r.totalUsd, 4);
  assert.equal(r.lines[0].categoryMultiplier, 0.2);
  assert.match(r.lines[0].note, /orb items count 20% of face value/);
  const t = JSON.parse(JSON.stringify(table)); t.meta.valueMultipliers = { orb: 0.5 };
  assert.equal(E.valueOffer({ price: 10, contents: [{ item: 'Premium Orb Fragments', qty: 10000 }] }, t).totalUsd, 10);
  const full = JSON.parse(JSON.stringify(table)); full.meta.valueMultipliers = { orb: 1 };
  assert.equal(E.valueOffer({ price: 10, contents: [{ item: 'Premium Orb Fragments', qty: 10000 }] }, full).totalUsd, 20);
  assert.equal(E.valueMultiplier(table.items['gold'], table.meta), 1);
});

test('shopBy lists offers containing the bucket with the bucket value and the whole-offer value', () => {
  const offers = [
    { name: 'Gold Pack', price: 10, contents: [{ item: 'Gold', qty: 15000000 }] },                                   // gold 1.5x, whole 1.5x
    { name: 'Bundle', price: 10, contents: [{ item: 'Gold', qty: 10000000 }, { item: 'L4 Training Module', qty: 2000 }] }, // gold 1x, whole 3x
    { name: 'Training Only', price: 10, contents: [{ item: 'L4 Training Module', qty: 1500 }] },
    { name: 'Points', price: 10, contents: [{ item: 'Event Milestone Points', qty: 50000000 }] }
  ];
  const ranked = E.rankOffers(offers, table, null, { personalize: false });
  const gold = E.shopBy(ranked, table, 'gold');
  assert.deepEqual(gold.map((r) => r.name), ['Gold Pack', 'Bundle']);
  assert.equal(gold[0].bucketRatio, 1.5);
  assert.equal(gold[0].wholeRatio, 1.5);
  assert.equal(gold[0].items[0].perUsd, 1500000);
  assert.equal(gold[0].items[0].vsTypical, 1.5);
  assert.equal(gold[1].bucketRatio, 1);
  assert.equal(gold[1].wholeRatio, 3);
  assert.equal(gold[1].grade, 'A');
  // event points have no value but do have units per dollar
  const pts = E.shopBy(ranked, table, 'points');
  assert.equal(pts.length, 1);
  assert.equal(pts[0].bucketRatio, null);
  assert.equal(pts[0].items[0].perUsd, 5000000);
  assert.ok(Math.abs(pts[0].items[0].vsTypical - 5000000 / 3300000) < 1e-9);
  assert.equal(pts[0].items[0].excluded, true);
  assert.deepEqual(E.shopBy(ranked, table, 'gear'), []);
});

test('a chain step beyond the first unbought step is ranked and graded on the whole path', () => {
  const steps = [
    { step: 1, name: 'Starter', price: 5, currency: 'USD', contents: [{ item: 'Iron Man shards', qty: 80 }] },      // $8 for $5: 1.6x
    { step: 2, name: 'Rising', price: 10, currency: 'USD', contents: [{ item: 'Iron Man shards', qty: 130 }] },     // $13 for $10: 1.3x
    { step: 3, name: 'Empowered', price: 10, currency: 'USD', contents: [{ item: 'Iron Man shards', qty: 300 }] }   // $30 for $10: 3x alone
  ];
  const mk = (n, current) => ({ name: steps[n - 1].name, price: steps[n - 1].price, currency: 'USD', contents: steps[n - 1].contents, chain: { name: 'Iron Man', step: n, of: 3, current: current, steps } });
  const s3 = E.valueOffer(mk(3, 1), table);
  assert.equal(s3.perDollar, 3);                       // this step alone
  assert.equal(s3.chain.requires.length, 2);
  assert.equal(s3.chain.cumulativePriceUsd, 25);
  assert.equal(s3.chain.cumulativeUsd, 51);
  assert.ok(Math.abs(s3.chain.cumulativePerDollar - 2.04) < 1e-9);
  assert.ok(Math.abs(s3.rankRatio - 2.04) < 1e-9);     // ranked on the path
  assert.equal(s3.grade, 'B');                         // 2.04x is a B, not the A its own 3x would be
  // once steps 1 and 2 are bought (current = 3) the step stands alone
  const s3now = E.valueOffer(mk(3, 3), table);
  assert.deepEqual(s3now.chain.requires, []);
  assert.equal(s3now.rankRatio, 3);
  assert.equal(s3now.grade, 'A');
  // step 1 is buyable now and is just itself
  const s1 = E.valueOffer(mk(1, 1), table);
  assert.equal(s1.rankRatio, 1.6);
  assert.equal(s1.chain.requires.length, 0);
  // ranking order uses the path ratio
  const ranked = E.rankOffers([mk(3, 1), mk(1, 1), { name: 'Gold', price: 10, contents: [{ item: 'Gold', qty: 25000000 }] }], table, null, { personalize: false });
  assert.deepEqual(ranked.map((r) => r.name), ['Gold', 'Empowered', 'Starter']);
  // an incomplete earlier step makes the later step incomplete too
  const t = JSON.parse(JSON.stringify(table));
  const broken = steps.map((x) => Object.assign({}, x));
  broken[0] = Object.assign({}, broken[0], { contents: [{ item: 'Mystery', qty: 1 }] });
  const s2 = E.valueOffer({ name: 'Rising', price: 10, currency: 'USD', contents: steps[1].contents, chain: { step: 2, of: 3, current: 1, steps: broken } }, t);
  assert.equal(s2.complete, false);
  assert.equal(s2.chain.requires[0].complete, false);
});
