'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('../engine.js');

// Fixture only: numbers chosen to make the arithmetic obvious.
const table = {
  meta: { unit: 'USD', unitPerUsd: 1, fxToUsd: { USD: 1 }, scoring: { minObservations: 5 }, valueMultipliers: { orb: 1 } },
  items: {
    'gold': { name: 'Gold', category: 'currency', per: 1000000, value: 1, observed: { perUsd: 1000000, observations: 50 } },
    'training_module:l4': { name: 'L4 Training Module', category: 'training', per: 100, value: 1, xp: 1600, observed: { perUsd: 100, observations: 40 } },
    'training_module:l3': { name: 'L3 Training Module', category: 'training', per: 1, value: null, xp: 800, derivedFrom: { key: 'training_module:l4', ratio: 0.5, basis: 'XP' }, observed: { perUsd: null, note: 'not on msfwar' } },
    'training_module:l1': { name: 'L1 Training Module', category: 'training', per: 1, value: null, xp: 50, derivedFrom: { key: 'training_module:l4', ratio: 0.03125, basis: 'XP' }, observed: { perUsd: null } },
    'training_module:l2': { name: 'L2 Training Module', category: 'training', per: 1, value: 0.001, xp: 200, derivedFrom: { key: 'training_module:l4', ratio: 0.125, basis: 'XP' }, observed: { perUsd: 1000, observations: 9 } },
    'training_module:lx': { name: 'LX Training Module', category: 'training', per: 10, value: null, derivedFrom: { key: 'training_module:l4', ratio: 0.125 }, observed: { perUsd: null } },
    'training_module:l0': { name: 'L0 Training Module', category: 'training', per: 1, value: 0.001, observed: { perUsd: 1000, observations: 9 } },
    'ability_material:t1': { name: 'T1 Ability Material', category: 'ability', per: 1, value: 0.01, observed: { perUsd: 100, observations: 9 } },
    'ability_material:t2': { name: 'T2 Ability Material', category: 'ability', per: 1, value: 0.01, observed: { perUsd: 100, observations: 9 } },
    'ability_material:t3': { name: 'T3 Ability Material', category: 'ability', per: 1, value: 0.01, observed: { perUsd: 100, observations: 9 } },
    'ability_material:t4': { name: 'T4 Ability Material', category: 'ability', per: 1, value: 0.01, observed: { perUsd: 100, observations: 9 } }
  }
};

test('an item derived from another is priced by the ratio and inherits the baseline', () => {
  const l3 = E.deriveItem(table, 'training_module:l3');
  assert.equal(l3.value, 0.005);                       // half an L4 (0.01 each)
  assert.equal(l3.observed.perUsd, 200);               // 100 L4 per $ -> 200 L3 per $
  assert.equal(l3.observed.observations, 40);
  assert.equal(l3.derived.from, 'training_module:l4');
  assert.match(l3.derived.note, /priced from L4 Training Module by XP \(800 vs 1600\)/);
  assert.equal(table.items['training_module:l3'].value, null); // the table itself is untouched
  // an item with a value of its own is left alone
  const l2 = E.deriveItem(table, 'training_module:l2');
  assert.equal(l2.value, 0.001);
  assert.equal(l2.derived, undefined);
  assert.equal(E.itemsOf(table)['training_module:l1'].observed.perUsd, 3200);
  // per is honoured: LX is priced per 10 at an eighth of an L4 each
  const lx = E.deriveItem(table, 'training_module:lx');
  assert.ok(Math.abs(lx.value - 0.0125) < 1e-12);
  assert.ok(Math.abs(E.unitValue(lx) - 0.00125) < 1e-12);
  assert.equal(lx.observed.perUsd, 800);
  assert.match(lx.derived.note, /at 0\.125 of its value/);
  // a value typed for the base is trusted for the levels priced from it
  const typed = JSON.parse(JSON.stringify(table));
  typed.items['training_module:l4'].observed.observations = 2;
  typed.items['training_module:l4'].userValue = true;
  assert.equal(E.deriveItem(typed, 'training_module:l3').userValue, true);
  const rTyped = E.valueOffer({ price: 10, contents: [{ item: 'L4 Training Module', qty: 500 }, { item: 'L3 Training Module', qty: 1000 }] }, typed);
  assert.equal(rTyped.complete, true);
  assert.equal(rTyped.perDollar, 1);
  assert.equal(E.itemsOf(table)['gold'].derived, undefined);
  assert.equal(E.deriveItem(table, 'nope'), null);
  // a ratio or base that makes no sense leaves the item unpriced
  const bad = { meta: table.meta, items: { a: { name: 'A', category: 'training', per: 1, value: null, derivedFrom: { key: 'missing', ratio: 0.5 } }, b: { name: 'B', category: 'training', per: 1, value: null, derivedFrom: { key: 'b', ratio: 0.5 } } } };
  assert.equal(E.deriveItem(bad, 'a').value, null);
  assert.equal(E.deriveItem(bad, 'b').value, null);
});

test('offers with derived items are valued, noted and shopped in the common unit', () => {
  const r = E.valueOffer({ price: 10, contents: [{ item: 'L3 Training Module', qty: 2000 }] }, table);
  assert.equal(r.complete, true);
  assert.equal(r.perDollar, 1);                        // 2000 x $0.005 = $10
  assert.match(r.lines[0].note, /priced from L4 Training Module by XP/);
  assert.equal(r.lines[0].thin, undefined);
  const r1 = E.valueOffer({ price: 10, contents: [{ item: 'L1 Training Module', qty: 32000 }] }, table);
  assert.equal(r1.perDollar, 1);
  // a thin base makes the derived item thin too
  const thinTable = JSON.parse(JSON.stringify(table));
  thinTable.items['training_module:l4'].observed.observations = 2;
  const rt = E.valueOffer({ price: 10, contents: [{ item: 'L3 Training Module', qty: 2000 }] }, thinTable);
  assert.equal(rt.complete, false);
  assert.equal(rt.lines[0].thin, true);
  // shop by training: XP per US$ across levels, value ratio as usual
  const ranked = E.rankOffers([
    { name: 'Mixed', price: 10, contents: [{ item: 'L4 Training Module', qty: 1000 }, { item: 'L3 Training Module', qty: 2000 }] },
    { name: 'L1 only', price: 10, contents: [{ item: 'L1 Training Module', qty: 64000 }] },
    { name: 'Gold', price: 10, contents: [{ item: 'Gold', qty: 10000000 }] }
  ], table, null, { personalize: false });
  const rows = E.shopBy(ranked, table, 'training');
  assert.deepEqual(rows.map((x) => x.name).sort(), ['L1 only', 'Mixed']);   // both 2x: a tie
  const mixed = rows.find((x) => x.name === 'Mixed');
  const l1only = rows.find((x) => x.name === 'L1 only');
  assert.equal(mixed.unitLabel, 'XP');
  assert.equal(mixed.unitsPerUsd, 320000);             // 1.6M + 1.6M XP for $10
  assert.equal(mixed.bucketRatio, 2);
  assert.equal(mixed.items[1].unitPerUsd, 160000);
  assert.equal(l1only.unitsPerUsd, 320000);
  assert.equal(l1only.bucketRatio, 2);
  assert.equal(E.shopBy(ranked, table, 'gold')[0].unitsPerUsd, null);
  // a training line without xp leaves the row without an XP figure, the other items keep theirs
  const noXp = E.shopBy(E.rankOffers([{ name: 'Odd', price: 10, contents: [{ item: 'L4 Training Module', qty: 1000 }, { item: 'L0 Training Module', qty: 1000 }] }], table, null, { personalize: false }), table, 'training');
  assert.equal(noXp[0].unitsPerUsd, null);
  assert.equal(noXp[0].items[0].unitPerUsd, 160000);
  assert.equal(noXp[0].items[1].unitPerUsd, null);
  assert.equal(E.shopBy(ranked, table, 'gold')[0].unitLabel, null);
  const best = E.bestPrices(ranked, table).find((b) => b.key === 'training_module:l3');
  assert.equal(best.typicalPerUsd, 200);
  assert.equal(best.whole.perUsd, 200);
});

test('plan resources can be useless or carry their own multiplier', () => {
  const plan = {
    characters: {},
    resources: {
      'ability_material:t1': { status: 'useless', note: 'a nuisance' },
      'ability_material:t3': { status: 'useless', multiplier: 0.1, note: 'next to useless' },
      'ability_material:t4': { status: 'short' }
    },
    resourceRules: [{ category: 'ability', pattern: '\\bT2\\b', status: 'useless' }]
  };
  const contents = ['T1', 'T2', 'T3', 'T4'].map((t) => ({ item: t + ' Ability Material', qty: 100 }));
  const r = E.valueOffer({ price: 1, contents }, table, null, { plan });
  assert.equal(r.totalUsd, 4);
  assert.ok(Math.abs(r.personalUsd - 1.1) < 1e-9);     // 0 + 0 + 0.1 + 1
  assert.deepEqual(r.lines.map((l) => l.multiplier), [0, 0, 0.1, 1]);
  assert.match(r.lines[0].note, /no use to you: a nuisance/);
  assert.match(r.lines[1].note, /no use to you/);
  assert.match(r.lines[2].note, /counts 10% for you: next to useless/);
  assert.equal(r.lines[3].note, null);
  assert.equal(r.helpsPlan, true);
  assert.equal(E.valueOffer({ price: 1, contents: contents.slice(0, 2) }, table, null, { plan }).helpsPlan, false);
  // uselessMultiplier can be raised; an explicit multiplier of 1 adds nothing
  const r2 = E.valueOffer({ price: 1, contents: contents.slice(0, 1) }, table, null, { plan: Object.assign({}, plan, { uselessMultiplier: 0.05 }) });
  assert.ok(Math.abs(r2.lines[0].multiplier - 0.05) < 1e-12);
  const r3 = E.valueOffer({ price: 1, contents: [{ item: 'Gold', qty: 1000000 }] }, table, null, { plan: { characters: {}, resources: { gold: { multiplier: 1, note: 'fine' } } } });
  assert.equal(r3.lines[0].multiplier, 1);
  assert.equal(r3.lines[0].note, null);
  assert.equal(E.resourceRule(table.items['ability_material:t3'], 'ability_material:t3', plan).multiplier, 0.1);
  // a rule may carry its own multiplier, and may match on the table key
  const rulePlan = { characters: {}, resourceRules: [
    { category: 'ability', pattern: '\\bT2\\b', multiplier: 0.3, note: 'rule' },
    { keyPattern: '^ability_material:t1$', status: 'useless', note: 'by key' }
  ] };
  assert.equal(E.resourceRule(table.items['ability_material:t2'], 'ability_material:t2', rulePlan).multiplier, 0.3);
  const r4 = E.valueOffer({ price: 1, contents: contents.slice(0, 2) }, table, null, { plan: rulePlan });
  assert.deepEqual(r4.lines.map((l) => l.multiplier), [0, 0.3]);
  assert.match(r4.lines[0].note, /no use to you: by key/);
  assert.match(r4.lines[1].note, /counts 30% for you: rule/);
});
