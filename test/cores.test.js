'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('../engine.js');

// Fixture only: numbers chosen to make the arithmetic obvious.
const table = {
  meta: { unit: 'USD', unitPerUsd: 1, fxToUsd: { USD: 1, CAD: 0.5 }, powerCore: { price: 0.2, currency: 'CAD' }, scoring: { minObservations: 5 } },
  items: {
    'gold': { name: 'Gold', category: 'currency', per: 100000, value: 0.1, cores: 50, observed: { perUsd: 1000000, observations: 50 } },     // 50 cores per 100k gold
    'training_module:l4': { name: 'L4 Training Module', category: 'training', per: 100, value: 1, cores: 200, observed: { perUsd: 100, observations: 40 } }, // 2 cores each
    'shard:iron man': { name: 'Iron Man shards', category: 'shard', character: 'Iron Man', per: 1, value: 0.1, observed: { perUsd: 10, observations: 12 } },  // no core price
    'power_cores': { name: 'Power Cores', category: 'currency', per: 100, value: 1, observed: { perUsd: 100, observations: 60 } },
    'strike_points': { name: 'Strike Points', category: 'other', per: 1, value: null, excludeFromValue: true }
  }
};

test('a Power Core is worth meta.powerCore in US dollars', () => {
  assert.equal(E.powerCoreUsd(table.meta), 0.1);                                     // CA$0.20 at 0.5
  assert.equal(E.powerCoreUsd({ fxToUsd: { CAD: 0.7 } }), 0.15 * 0.7);                // the default CA$0.15
  assert.equal(E.powerCoreUsd({ powerCore: { price: 0.1, currency: 'USD' } }), 0.1);
  assert.equal(E.powerCoreUsd({ powerCore: { price: 0.1, currency: 'XYZ' } }), null);  // no rate
  assert.equal(E.powerCoreUsd({ powerCore: { price: 0 } }), null);
  assert.equal(E.coresPerUnit(table.items.gold, 'gold'), 0.0005);
  assert.equal(E.coresPerUnit(table.items['training_module:l4'], 'training_module:l4'), 2);
  assert.equal(E.coresPerUnit(table.items['shard:iron man'], 'shard:iron man'), null);
  assert.equal(E.coresPerUnit(table.items.power_cores, 'power_cores'), 1);           // cores cost one core each
  assert.equal(E.coresPerUnit({ name: 'X', per: 1, cores: '' }, 'x'), null);
  assert.equal(E.coresPerUnit({ name: 'X', per: 1, cores: 'abc' }, 'x'), null);
});

test('an offer says how many Power Cores the same contents cost in game, and what that is worth', () => {
  const r = E.valueOffer({ price: 10, currency: 'USD', contents: [{ item: 'Gold', qty: 1000000 }, { item: 'L4 Training Module', qty: 500 }, { item: 'Strike Points', qty: 100 }] }, table);
  assert.equal(r.coreCost, 500 + 1000);                 // 10 x 50 + 500 x 2
  assert.equal(r.coreComplete, true);
  assert.deepEqual(r.coreMissing, []);
  assert.equal(r.coreRateUsd, 0.1);
  assert.equal(r.coreCostUsd, 150);
  assert.equal(r.coreVsPrice, 15);                      // coring costs 15x the offer price
  assert.equal(r.lines[0].cores, 500);
  assert.equal(r.lines[2].cores, null);                 // points are not sold for cores
  // an item without a core price leaves the total partial and named
  const r2 = E.valueOffer({ price: 10, contents: [{ item: 'Gold', qty: 1000000 }, { item: 'Iron Man shards', qty: 10 }, { item: 'Mystery', qty: 1 }] }, table);
  assert.equal(r2.coreCost, 500);
  assert.equal(r2.coreComplete, false);
  assert.deepEqual(r2.coreMissing, ['Iron Man shards', 'Mystery']);
  // nothing priced in cores: no total at all
  const r3 = E.valueOffer({ price: 10, contents: [{ item: 'Iron Man shards', qty: 10 }] }, table);
  assert.equal(r3.coreCost, null);
  assert.equal(r3.coreCostUsd, null);
  assert.equal(r3.coreVsPrice, null);
  // a core pack: the cores themselves
  const r4 = E.valueOffer({ price: 10, contents: [{ item: 'Power Cores', qty: 1500 }] }, table);
  assert.equal(r4.coreCost, 1500);
  // no core rate: the count stands, the dollars do not
  const noRate = JSON.parse(JSON.stringify(table)); noRate.meta.powerCore = { price: 0.2, currency: 'XYZ' };
  const r5 = E.valueOffer({ price: 10, contents: [{ item: 'Gold', qty: 1000000 }] }, noRate);
  assert.equal(r5.coreCost, 500);
  assert.equal(r5.coreCostUsd, null);
});

test('a chain path adds the core cost of its steps when every step has one', () => {
  const steps = [
    { step: 1, name: 'A', price: 5, currency: 'USD', contents: [{ item: 'Gold', qty: 1000000 }] },            // 500 cores
    { step: 2, name: 'B', price: 5, currency: 'USD', contents: [{ item: 'L4 Training Module', qty: 100 }] }, // 200 cores
    { step: 3, name: 'C', price: 5, currency: 'USD', contents: [{ item: 'Iron Man shards', qty: 10 }] }      // none
  ];
  const mk = (n) => ({ name: steps[n - 1].name, price: 5, currency: 'USD', contents: steps[n - 1].contents, chain: { step: n, of: 3, current: 1, steps } });
  const s2 = E.valueOffer(mk(2), table, null, { chainMode: 'path' });
  assert.equal(s2.coreCost, 200);
  assert.equal(s2.chain.cumulativeCoreCost, 700);
  assert.equal(s2.chain.requires[0].coreCost, 500);
  assert.equal(s2.chain.cumulativeCoreComplete, true);
  assert.deepEqual(s2.chain.cumulativeCoreMissing, []);
  const s3 = E.valueOffer(mk(3), table, null, { chainMode: 'path' });
  assert.equal(s3.coreCost, null);
  assert.equal(s3.chain.cumulativeCoreCost, 700);      // the path's partial sum: steps 1 and 2
  assert.equal(s3.chain.cumulativeCoreComplete, false);
  assert.deepEqual(s3.chain.cumulativeCoreMissing, ['Iron Man shards']);
  assert.equal(E.valueOffer(mk(2), table).chain.cumulativeCoreCost, 700);  // computed in step mode too, for display
  // a step with a complete core price after a partial step: the path sum stands, marked partial, naming the earlier gap
  const steps2 = [steps[2], steps[0]].map((st, i) => Object.assign({}, st, { step: i + 1 }));
  const later = E.valueOffer({ name: 'A', price: 5, currency: 'USD', contents: steps[0].contents, chain: { step: 2, of: 2, current: 1, steps: steps2 } }, table, null, { chainMode: 'path' });
  assert.equal(later.coreComplete, true);
  assert.equal(later.chain.cumulativeCoreCost, 500);
  assert.equal(later.chain.cumulativeCoreComplete, false);
  assert.deepEqual(later.chain.cumulativeCoreMissing, ['Iron Man shards']);
});

test('points-only offers are not sold for cores, and hidden contents keep a core total partial', () => {
  const pts = E.valueOffer({ price: 10, contents: [{ item: 'Strike Points', qty: 100 }] }, table);
  assert.equal(pts.coreApplicable, false);
  assert.equal(pts.coreCost, null);
  assert.deepEqual(pts.coreMissing, []);
  assert.equal(E.valueOffer({ price: 10, contents: [{ item: 'Gold', qty: 1 }] }, table).coreApplicable, true);
  const hidden = E.valueOffer({ price: 10, notes: '2 more item(s) not shown on the card', contents: [{ item: 'Gold', qty: 1000000 }] }, table);
  assert.equal(hidden.coreCost, 500);
  assert.equal(hidden.coreComplete, false);
  const steps = [
    { step: 1, name: 'A', price: 5, currency: 'USD', notes: '1 more item(s) not shown on the card', contents: [{ item: 'Gold', qty: 1000000 }] },
    { step: 2, name: 'B', price: 5, currency: 'USD', contents: [{ item: 'Gold', qty: 1000000 }] }
  ];
  const s2 = E.valueOffer({ name: 'B', price: 5, currency: 'USD', contents: steps[1].contents, chain: { step: 2, of: 2, current: 1, steps } }, table, null, { chainMode: 'path' });
  assert.equal(s2.chain.cumulativeCoreCost, 1000);
  assert.equal(s2.chain.cumulativeCoreComplete, false);
});
