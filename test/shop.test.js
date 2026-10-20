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
  assert.deepEqual(E.SHOP_BUCKETS.map((x) => x.key), ['all', 'gold', 'training', 'character', 'ability', 'points', 'iso', 'gear', 'orbs', 'other']);
  assert.ok(Object.keys(table.items).every((k) => E.shopBucket(table.items[k], k) !== 'all'));   // 'all' is a view, never an item's bucket
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

test("the 'all' bucket lists every offer with everything in it, best whole offer first", () => {
  const ranked = E.rankOffers([
    { name: 'Gold', price: 10, contents: [{ item: 'Gold', qty: 20000000 }] },                                   // 2x
    { name: 'Mixed', price: 10, contents: [{ item: 'Gold', qty: 5000000 }, { item: 'Iron Man shards', qty: 100 }] }, // 1.5x
    { name: 'Nothing known', price: 10, contents: [{ item: 'Mystery Box', qty: 1 }] },
    { name: 'Free', contents: [{ item: 'Gold', qty: 1 }] }
  ], table, null, { personalize: false });
  const rows = E.shopBy(ranked, table, 'all');
  assert.deepEqual(rows.map((x) => x.name), ['Gold', 'Mixed']);    // unpriced offers and offers without a known item are left out
  assert.equal(rows[1].items.length, 2);
  assert.equal(rows[1].bucketRatio, rows[1].wholeRatio);           // nothing filtered: the bucket is the whole offer
  assert.equal(rows[0].unitsPerUsd, null);
});

test('vs typical ignores the category discount; the bucket and whole values keep it', () => {
  const r = E.valueOffer({ price: 10, contents: [{ item: 'Premium Orb Fragments', qty: 5000 }] }, table); // 500 per $ = exactly typical
  assert.equal(r.lines[0].vsTypical, 1);
  assert.equal(r.lines[0].faceValue, 10);
  assert.equal(r.perDollar, 0.2);
  const rows = E.shopBy(E.rankOffers([{ name: 'Orbs', price: 10, contents: [{ item: 'Premium Orb Fragments', qty: 10000 }] }], table, null, { personalize: false }), table, 'orbs');
  assert.equal(rows[0].items[0].perUsd, 1000);
  assert.equal(rows[0].items[0].vsTypical, 2);      // twice the typical fragments per dollar
  assert.equal(rows[0].bucketRatio, 0.4);            // but worth 20% of face
  // best buys allocate the share by face value, so a bundle of typically priced gold and orbs reads 1x for both
  const bundle = E.rankOffers([{ name: 'Mixed', price: 10, contents: [{ item: 'Gold', qty: 5000000 }, { item: 'Premium Orb Fragments', qty: 2500 }] }], table, null, { personalize: false });
  const best = E.bestPrices(bundle, table);
  assert.ok(Math.abs(best.find((b) => b.key === 'gold').share.perUsd - 1000000) < 1e-6);
  assert.ok(Math.abs(best.find((b) => b.key === 'orb:premium').share.perUsd - 500) < 1e-6);
});

test("chainMode 'path': a chain step beyond the first unbought step is ranked and graded on the whole path", () => {
  const PATH = { chainMode: 'path' };
  const steps = [
    { step: 1, name: 'Starter', price: 5, currency: 'USD', contents: [{ item: 'Iron Man shards', qty: 80 }] },      // $8 for $5: 1.6x
    { step: 2, name: 'Rising', price: 10, currency: 'USD', contents: [{ item: 'Iron Man shards', qty: 130 }] },     // $13 for $10: 1.3x
    { step: 3, name: 'Empowered', price: 10, currency: 'USD', contents: [{ item: 'Iron Man shards', qty: 300 }] }   // $30 for $10: 3x alone
  ];
  const mk = (n, current) => ({ name: steps[n - 1].name, price: steps[n - 1].price, currency: 'USD', contents: steps[n - 1].contents, chain: { name: 'Iron Man', step: n, of: 3, current: current, steps } });
  const s3 = E.valueOffer(mk(3, 1), table, null, PATH);
  assert.equal(s3.perDollar, 3);                       // this step alone
  assert.equal(s3.chain.requires.length, 2);
  assert.equal(s3.chain.cumulativePriceUsd, 25);
  assert.equal(s3.chain.cumulativeUsd, 51);
  assert.ok(Math.abs(s3.chain.cumulativePerDollar - 2.04) < 1e-9);
  assert.ok(Math.abs(s3.rankRatio - 2.04) < 1e-9);     // ranked on the path
  assert.equal(s3.grade, 'B');                         // 2.04x is a B, not the A its own 3x would be
  // once steps 1 and 2 are bought (current = 3) the step stands alone
  const s3now = E.valueOffer(mk(3, 3), table, null, PATH);
  assert.deepEqual(s3now.chain.requires, []);
  assert.equal(s3now.rankRatio, 3);
  assert.equal(s3now.grade, 'A');
  // step 1 is buyable now and is just itself
  const s1 = E.valueOffer(mk(1, 1), table, null, PATH);
  assert.equal(s1.rankRatio, 1.6);
  assert.equal(s1.chain.requires.length, 0);
  // ranking order uses the path ratio
  const ranked = E.rankOffers([mk(3, 1), mk(1, 1), { name: 'Gold', price: 10, contents: [{ item: 'Gold', qty: 25000000 }] }], table, null, { personalize: false, chainMode: 'path' });
  assert.deepEqual(ranked.map((r) => r.name), ['Gold', 'Empowered', 'Starter']);
  // shop and best buys price the step over its path, aggregate the path's items, and never list bought steps
  const shopRows = E.shopBy(E.rankOffers([mk(3, 1), mk(1, 1), mk(2, 1)], table, null, { personalize: false, chainMode: 'path' }), table, 'character');
  assert.deepEqual(shopRows.map((x) => x.name), ['Empowered', 'Starter', 'Rising']); // paths: 2.04x, 1.6x, 1.4x
  assert.equal(shopRows[0].pathPriceUsd, 25);
  assert.equal(shopRows[0].pathPrice, 25);
  assert.deepEqual(shopRows[0].pathSteps, [1, 2, 3]);
  assert.equal(shopRows[0].items[0].qty, 510);
  assert.ok(Math.abs(shopRows[0].items[0].perUsd - 20.4) < 1e-9);
  assert.ok(Math.abs(shopRows[0].bucketRatio - 2.04) < 1e-9);
  assert.ok(Math.abs(shopRows[0].wholeRatio - 2.04) < 1e-9);
  const bestRows = E.bestPrices(E.rankOffers([mk(3, 1), mk(1, 1)], table, null, { personalize: false, chainMode: 'path' }), table);
  assert.equal(bestRows[0].whole.name, 'Empowered');
  assert.ok(Math.abs(bestRows[0].whole.perUsd - 20.4) < 1e-9);
  assert.equal(bestRows[0].whole.priceUsd, 25);
  assert.deepEqual(bestRows[0].whole.steps, [1, 2, 3]);
  // already bought: no grade, ranked last, absent from shop and best buys, still complete
  const bought = E.valueOffer(mk(1, 3), table, null, PATH);
  assert.equal(bought.chain.bought, true);
  assert.equal(bought.rankRatio, null);
  assert.equal(bought.grade, null);
  assert.equal(bought.complete, true);
  const withBought = E.rankOffers([mk(1, 3), mk(3, 3)], table, null, { personalize: false, chainMode: 'path' });
  assert.deepEqual(withBought.map((r) => r.name), ['Empowered', 'Starter']);
  assert.deepEqual(E.shopBy(withBought, table, 'character').map((x) => x.name), ['Empowered']);
  assert.equal(E.bestPrices(withBought, table)[0].offers, 1);
  assert.equal(E.pathLines(bought), null);
  // an earlier step without a readable price leaves the path unvalued and incomplete
  const noPrice = steps.map((x) => Object.assign({}, x));
  noPrice[0] = Object.assign({}, noPrice[0], { price: null, notes: 'price unreadable' });
  const s2np = E.valueOffer({ name: 'Rising', price: 10, currency: 'USD', contents: steps[1].contents, chain: { step: 2, of: 3, current: 1, steps: noPrice } }, table, null, PATH);
  assert.equal(s2np.chain.priceUnknown, true);
  assert.equal(s2np.rankRatio, null);
  assert.equal(s2np.grade, null);
  assert.equal(s2np.complete, false);
  assert.equal(E.pathLines(s2np), null);
  // an incomplete earlier step makes the later step incomplete too
  const t = JSON.parse(JSON.stringify(table));
  const broken = steps.map((x) => Object.assign({}, x));
  broken[0] = Object.assign({}, broken[0], { contents: [{ item: 'Mystery', qty: 1 }] });
  const s2 = E.valueOffer({ name: 'Rising', price: 10, currency: 'USD', contents: steps[1].contents, chain: { step: 2, of: 3, current: 1, steps: broken } }, t, null, PATH);
  assert.equal(s2.complete, false);
  assert.equal(s2.chain.requires[0].complete, false);
  // a note on an earlier step (hidden items) travels with the chain
  const noted = steps.map((x) => Object.assign({}, x));
  noted[0] = Object.assign({}, noted[0], { notes: '2 more item(s) not shown on the card' });
  const s2n = E.valueOffer({ name: 'Rising', price: 10, currency: 'USD', contents: steps[1].contents, chain: { step: 2, of: 3, current: 1, steps: noted } }, table, null, PATH);
  assert.equal(s2n.complete, false);
  assert.match(s2n.chain.requires[0].notes, /2 more item/);
  // the plan is carried into the earlier steps, and the path is ranked on the personal figures
  const onList = { characters: { 'Iron Man': {} }, offListMultiplier: 0 };
  const s3p = E.valueOffer(mk(3, 1), table, null, { chainMode: 'path', plan: onList });
  assert.equal(s3p.chain.requires[0].personalPerDollar, 1.6);
  assert.ok(Math.abs(s3p.rankRatio - 2.04) < 1e-9);
  const offList = { characters: { 'Thor': {} }, offListMultiplier: 0 };
  const s3off = E.valueOffer(mk(3, 1), table, null, { chainMode: 'path', plan: offList });
  assert.equal(s3off.personalized, true);
  assert.equal(s3off.chain.requires[0].perDollar, 1.6);
  assert.equal(s3off.chain.requires[0].personalPerDollar, 0);
  assert.equal(s3off.chain.cumulativePersonalUsd, 0);
  assert.ok(Math.abs(s3off.chain.cumulativePerDollar - 2.04) < 1e-9);
  assert.equal(s3off.chain.cumulativePersonalPerDollar, 0);
  assert.equal(s3off.rankRatio, 0);
  assert.equal(s3off.grade, 'F');
  assert.equal(E.valueOffer(mk(3, 1), table, null, { plan: offList }).rankRatio, 0);   // step mode: its own personal ratio
});

test("chainMode 'step' (the default): every chain step is ranked, graded and shopped on its own, with the path kept for display", () => {
  const steps = [
    { step: 1, name: 'Starter', price: 5, currency: 'USD', contents: [{ item: 'Iron Man shards', qty: 80 }] },      // 1.6x
    { step: 2, name: 'Rising', price: 10, currency: 'USD', contents: [{ item: 'Iron Man shards', qty: 130 }] },     // 1.3x
    { step: 3, name: 'Empowered', price: 10, currency: 'USD', contents: [{ item: 'Iron Man shards', qty: 300 }] }   // 3x
  ];
  const mk = (n, current) => ({ name: steps[n - 1].name, price: steps[n - 1].price, currency: 'USD', contents: steps[n - 1].contents, chain: { name: 'Iron Man', step: n, of: 3, current: current, steps } });
  const s3 = E.valueOffer(mk(3, 1), table);
  assert.equal(s3.chain.mode, 'step');
  assert.equal(s3.rankRatio, 3);                       // its own value, not the path's 2.04x
  assert.equal(s3.grade, 'A');
  assert.equal(s3.chain.requires.length, 2);           // the path is still described
  assert.ok(Math.abs(s3.chain.cumulativePerDollar - 2.04) < 1e-9);
  assert.equal(s3.chain.cumulativePriceUsd, 25);
  assert.equal(E.valueOffer(mk(3, 1), table, null, { chainMode: 'step' }).rankRatio, 3);
  assert.equal(E.valueOffer(mk(3, 1), table, null, { chainMode: 'nonsense' }).chain.mode, 'step');
  // ranking order uses each step's own ratio
  const ranked = E.rankOffers([mk(1, 1), mk(2, 1), mk(3, 1), { name: 'Gold', price: 10, contents: [{ item: 'Gold', qty: 25000000 }] }], table, null, { personalize: false });
  assert.deepEqual(ranked.map((r) => r.name), ['Empowered', 'Gold', 'Starter', 'Rising']);
  // shop and best buys use the step's own price and items
  const shopRows = E.shopBy(ranked, table, 'character');
  assert.deepEqual(shopRows.map((x) => x.name), ['Empowered', 'Starter', 'Rising']);
  assert.equal(shopRows[0].pathSteps, null);
  assert.equal(shopRows[0].pathPriceUsd, 10);
  assert.equal(shopRows[0].items[0].qty, 300);
  assert.equal(shopRows[0].items[0].perUsd, 30);
  assert.equal(shopRows[0].bucketRatio, 3);
  assert.equal(shopRows[0].wholeRatio, 3);
  const best = E.bestPrices(ranked, table).find((b) => b.key === 'shard:iron man');
  assert.equal(best.whole.name, 'Empowered');
  assert.equal(best.whole.perUsd, 30);
  assert.equal(best.whole.steps, null);
  const pl = E.pathLines(s3);
  assert.equal(pl.priceUsd, 10);
  assert.equal(pl.steps, null);
  assert.equal(pl.lines.length, 1);
  // a bought step is still unranked and left out of the shop
  const bought = E.valueOffer(mk(1, 3), table);
  assert.equal(bought.chain.bought, true);
  assert.equal(bought.rankRatio, null);
  assert.equal(E.pathLines(bought), null);
  assert.deepEqual(E.shopBy(E.rankOffers([mk(1, 3), mk(3, 3)], table, null, { personalize: false }), table, 'character').map((x) => x.name), ['Empowered']);
  // trouble on an earlier step is recorded on the path but does not touch this step's own reading
  const noPrice = steps.map((x) => Object.assign({}, x));
  noPrice[0] = Object.assign({}, noPrice[0], { price: null, notes: 'price unreadable' });
  const s2np = E.valueOffer({ name: 'Rising', price: 10, currency: 'USD', contents: steps[1].contents, chain: { step: 2, of: 3, current: 1, steps: noPrice } }, table);
  assert.equal(s2np.complete, true);
  assert.equal(s2np.rankRatio, 1.3);
  assert.equal(s2np.chain.priceUnknown, true);
  assert.equal(s2np.chain.pathComplete, false);
  assert.equal(s2np.chain.cumulativePerDollar, null);
  const noted = steps.map((x) => Object.assign({}, x));
  noted[0] = Object.assign({}, noted[0], { notes: '2 more item(s) not shown on the card' });
  const s2n = E.valueOffer({ name: 'Rising', price: 10, currency: 'USD', contents: steps[1].contents, chain: { step: 2, of: 3, current: 1, steps: noted } }, table);
  assert.equal(s2n.complete, true);
  assert.equal(s2n.chain.pathComplete, false);
  assert.equal(s2n.chain.requires[0].complete, false);
  // its own unreadable price still leaves the step unranked
  const own = E.valueOffer({ name: 'Rising', price: null, currency: 'USD', contents: steps[1].contents, chain: { step: 2, of: 3, current: 1, steps } }, table);
  assert.equal(own.rankRatio, null);
  assert.equal(own.grade, null);
});

test('vs best in your store: the best offer for the bucket reads 100, half the value per dollar 50, no value no reading', () => {
  const ranked = E.rankOffers([
    { name: 'Ten', price: 10, contents: [{ item: 'Power Cores', qty: 100 }] },       // 10 cores per $
    { name: 'Twenty', price: 10, contents: [{ item: 'Power Cores', qty: 200 }] },    // 20 cores per $: the best
    { name: 'Five', price: 10, contents: [{ item: 'Power Cores', qty: 50 }] },       // 5 cores per $
    { name: 'Points', price: 10, contents: [{ item: 'Event Milestone Points', qty: 50000000 }] }
  ], table, null, { personalize: false });
  const rows = E.shopBy(ranked, table, 'other');
  assert.deepEqual(rows.map((x) => x.name), ['Twenty', 'Ten', 'Five']);
  assert.deepEqual(rows.map((x) => x.items[0].perUsd), [20, 10, 5]);
  assert.deepEqual(rows.map((x) => x.vsBest), [1, 0.5, 0.25]);
  assert.deepEqual(rows.map((x) => x.bestScore), [100, 50, 25]);
  assert.deepEqual(rows.map((x) => x.pctBelowBest), [0, 0.5, 0.75]);
  // a row without a bucket value has no reading and never sets the best
  const pts = E.shopBy(ranked, table, 'points');
  assert.equal(pts[0].bucketRatio, null);
  assert.equal(pts[0].vsBest, null);
  assert.equal(pts[0].bestScore, null);
  assert.equal(pts[0].pctBelowBest, null);
  // the 'all' bucket compares whole offers: a row is read on its wholeRatio, not its bucketRatio
  const all = E.shopBy(ranked, table, 'all');
  assert.deepEqual(all.map((x) => x.name), ['Twenty', 'Ten', 'Five', 'Points']);
  assert.deepEqual(all.map((x) => x.vsBest), [1, 0.5, 0.25, null]);
  assert.deepEqual(all.map((x) => x.bestScore), [100, 50, 25, null]);
  const tilted = ranked.map((r) => Object.assign({}, r, r.name === 'Ten' ? { rankRatio: 0.4 } : {}));   // pretend Ten's whole offer is worth 0.4x
  const allTilted = E.shopBy(tilted, table, 'all');
  const by = (name) => allTilted.find((x) => x.name === name);
  assert.equal(by('Ten').wholeRatio, 0.4);
  assert.equal(by('Ten').bucketRatio, 0.1);
  assert.equal(by('Ten').vsBest, 1);                                 // best whole offer
  assert.equal(by('Twenty').vsBest, 0.5);                            // 0.2x against 0.4x
  assert.equal(E.shopBy(tilted, table, 'other').find((x) => x.name === 'Twenty').vsBest, 1);   // the resource bucket still reads the bucket value
  // one offer alone is the best of its kind
  const one = E.shopBy(E.rankOffers([{ name: 'Only', price: 10, contents: [{ item: 'Power Cores', qty: 100 }] }], table, null, { personalize: false }), table, 'other');
  assert.equal(one[0].vsBest, 1);
  assert.equal(one[0].bestScore, 100);
});
