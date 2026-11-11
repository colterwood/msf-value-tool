'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('../engine.js');

// Fixture only: numbers chosen to make the arithmetic obvious.
const table = {
  meta: { unit: 'USD', unitPerUsd: 1, fxToUsd: { USD: 1 }, scoring: { minObservations: 5 }, valueMultipliers: { orb: 1 } },
  items: {
    'gold': { name: 'Gold', category: 'currency', per: 1000000, value: 1, observed: { perUsd: 1000000, observations: 50 } },
    'gear:crimson_basic_catalyst_part': { name: 'Crimson Basic Catalyst Part', category: 'gear', per: 1, value: null },
    'gear:crimson_uru': { name: 'Crimson Uru', category: 'gear', per: 1, value: null },
    'gear:crimson_security_bypass': { name: 'Crimson Security Bypass', category: 'gear', per: 1, value: null },
    'gear:teal_catalyst_pack': { name: 'Teal Catalyst Pack', category: 'gear', per: 1, value: 0.5, observed: { perUsd: 2, observations: 9 } },
    'gear:teal_vial': { name: 'Teal Vial', category: 'gear', per: 1, value: 0.25, observed: { perUsd: 4, observations: 9 } },
    'gear:improved_vial': { name: 'Improved Vial', category: 'gear', per: 1, value: 0.01, observed: { perUsd: 100, observations: 9 } },
    'iso8:t4_level_5_ions': { name: 'T4 Level 5 Ions', category: 'iso8', per: 1000, value: 1, observed: { perUsd: 1000, observations: 9 } },
    'iso8:t1_ions': { name: 'T1 Ions', category: 'iso8', per: 1000, value: 0.001, observed: { perUsd: 1000000, observations: 9 } },
    'iso8:t4_blaster_armor_level_1_iso-8': { name: 'T4 Blaster Armor Level 1 Iso-8', category: 'iso8', per: 1, value: 2, observed: { perUsd: 0.5, observations: 9 } },
    'iso8:t4_blaster_damage_level_1_iso-8': { name: 'T4 Blaster Damage Level 1 Iso-8', category: 'iso8', per: 1, value: 2, observed: { perUsd: 0.5, observations: 9 } },
    'iso8:t3_iso-8_credits': { name: 'T3 Iso-8 Credits', category: 'iso8', per: 100, value: 0.3, observed: { perUsd: 333, observations: 9 } },
    'orb:premium': { name: 'Premium Orb Fragments', category: 'orb', per: 1, value: null },
    'strike_points': { name: 'Strike Points', category: 'other', per: 1, value: null, excludeFromValue: true }
  }
};

test('gear and ISO buckets split into groups by key list, then by name pattern', () => {
  const gear = E.bucketGroups('gear', table);
  assert.deepEqual(gear.map((g) => g.key).slice(0, 4), ['crimson_catalyst', 'crimson_unique', 'teal_catalyst', 'teal_unique']);
  assert.deepEqual(gear.find((g) => g.key === 'crimson_catalyst').keys, ['gear:crimson_basic_catalyst_part']);
  assert.deepEqual(gear.find((g) => g.key === 'crimson_unique').keys, ['gear:crimson_uru', 'gear:crimson_security_bypass']);
  assert.deepEqual(gear.find((g) => g.key === 'teal_catalyst').keys, ['gear:teal_catalyst_pack']);
  assert.deepEqual(gear.find((g) => g.key === 'teal_unique').keys, ['gear:teal_vial']);
  assert.equal(gear.find((g) => g.key === 'g21_mini').empty, true);
  assert.equal(E.shopGroup(table.items['gear:improved_vial'], 'gear:improved_vial', 'gear'), null);   // in the bucket, in no group
  assert.equal(E.shopGroup(table.items.gold, 'gold', 'gear'), null);
  // meta.shopGroups replaces a bucket's list; explicit items win over patterns
  const t2 = JSON.parse(JSON.stringify(table));
  t2.meta.shopGroups = { gear: [
    { key: 'g21_mini', label: 'Gear 21 Mini Unique', items: ['gear:crimson_security_bypass'] },
    { key: 'crimson_unique', label: 'Crimson Unique', pattern: '^Crimson\\b' }
  ] };
  const g2 = E.bucketGroups('gear', t2);
  assert.deepEqual(g2.map((g) => g.key), ['g21_mini', 'crimson_unique']);
  assert.deepEqual(g2[0].keys, ['gear:crimson_security_bypass']);
  assert.deepEqual(g2[1].keys, ['gear:crimson_basic_catalyst_part', 'gear:crimson_uru']);
  const iso = E.bucketGroups('iso', table);
  assert.equal(iso.length, 15);
  assert.deepEqual(iso.find((g) => g.key === 't4_l5').keys, ['iso8:t4_level_5_ions']);
  assert.deepEqual(iso.find((g) => g.key === 't1_l1').keys, ['iso8:t1_ions']);              // plain "T1 Ions" counts as level 1
  assert.deepEqual(iso.find((g) => g.key === 't4_crystals').keys, ['iso8:t4_blaster_armor_level_1_iso-8', 'iso8:t4_blaster_damage_level_1_iso-8']);
  assert.equal(iso.find((g) => g.key === 't4_crystals').set, 405);
  assert.equal(E.shopGroup(table.items['iso8:t3_iso-8_credits'], 'iso8:t3_iso-8_credits', 'iso'), null);
  assert.deepEqual(E.bucketGroups('gold', table), []);
  assert.equal(E.SHOP_BUCKETS.find((b) => b.key === 'gear').groups, E.GEAR_GROUPS);
});

test('shopBy takes bucket/group and prices a crystal set', () => {
  const ranked = E.rankOffers([
    { name: 'Boost', price: 10, contents: [{ item: 'T4 Blaster Armor Level 1 Iso-8', qty: 9 }, { item: 'T4 Blaster Damage Level 1 Iso-8', qty: 9 }] },
    { name: 'Ions', price: 10, contents: [{ item: 'T4 Level 5 Ions', qty: 20000 }] },
    { name: 'Catalysts', price: 10, contents: [{ item: 'Teal Catalyst Pack', qty: 40 }, { item: 'Gold', qty: 1000000 }] }
  ], table, null, { personalize: false });
  const crystals = E.shopBy(ranked, table, 'iso/t4_crystals');
  assert.deepEqual(crystals.map((r) => r.name), ['Boost']);
  assert.equal(crystals[0].group, 't4_crystals');
  assert.equal(crystals[0].groupQty, 18);
  assert.equal(crystals[0].setSize, 405);
  assert.equal(crystals[0].setCostUsd, 225);           // 18 crystals for $10 -> 405 cost $225
  assert.equal(crystals[0].bucketRatio, 3.6);          // 18 x $2 for $10
  assert.equal(crystals[0].items.length, 2);
  const ions = E.shopBy(ranked, table, 'iso/t4_l5');
  assert.deepEqual(ions.map((r) => r.name), ['Ions']);
  assert.equal(ions[0].setCostUsd, null);
  assert.equal(E.shopBy(ranked, table, 'iso').length, 2);          // the whole bucket still lists both
  assert.deepEqual(E.shopBy(ranked, table, 'gear/teal_catalyst').map((r) => r.name), ['Catalysts']);
  assert.equal(E.shopBy(ranked, table, 'gear/teal_catalyst')[0].items.length, 1);   // the gold is not in the group
  assert.deepEqual(E.shopBy(ranked, table, 'gear/teal_unique'), []);
  assert.deepEqual(E.shopBy(ranked, table, 'gear/nope'), []);
});

test('estimateFromStore prices unpriced items from the residual of valued bundles, or an even split', () => {
  const offers = [
    { name: 'Catalysts', price: 12, currency: 'USD', contents: [{ item: 'Crimson Basic Catalyst Part', qty: 1000 }, { item: 'Strike Points', qty: 500 }] },  // residual: $12 for 1000
    { name: 'Catalysts again', price: 8, currency: 'USD', contents: [{ item: 'Crimson Basic Catalyst Part', qty: 1000 }, { item: 'Gold', qty: 4000000 }] },  // residual $4 for 1000
    { name: 'Uniques', price: 20, currency: 'USD', contents: [{ item: 'Crimson Uru', qty: 50 }, { item: 'Crimson Security Bypass', qty: 150 }] },       // shared: $20 over 200 units
    { name: 'Mixed bag', price: 5, currency: 'USD', contents: [{ item: 'Crimson Uru', qty: 10 }, { item: 'Premium Orb Fragments', qty: 100 }] },         // two categories unpriced: skipped
    { name: 'Unknown', price: 5, currency: 'USD', contents: [{ item: 'Crimson Uru', qty: 10 }, { item: 'Mystery', qty: 1 }] },                           // unknown item: skipped
    { name: 'Too cheap', price: 3, currency: 'USD', contents: [{ item: 'Crimson Uru', qty: 10 }, { item: 'Gold', qty: 4000000 }] },                      // no residual: skipped
    { name: 'Free', contents: [{ item: 'Crimson Uru', qty: 10 }] }
  ];
  const est = E.estimateFromStore(offers, table);
  assert.deepEqual(Object.keys(est).sort(), ['gear:crimson_basic_catalyst_part', 'gear:crimson_security_bypass', 'gear:crimson_uru']);
  const cat = est['gear:crimson_basic_catalyst_part'];
  assert.equal(cat.observations, 2);
  assert.equal(cat.method, 'residual');
  assert.ok(Math.abs(cat.perUsd - (1000 / 12 + 1000 / 4) / 2) < 1e-9);   // mean of 83.3 and 250 per US$
  assert.ok(Math.abs(cat.value - 1 / cat.perUsd) < 1e-12);
  const uru = est['gear:crimson_uru'];
  assert.equal(uru.observations, 1);
  assert.equal(uru.method, 'shared');
  assert.equal(uru.perUsd, 10);                          // $20 / 200 units = $0.10 each
  assert.equal(est['gear:crimson_security_bypass'].perUsd, 10);
  assert.equal(uru.offers[0].name, 'Uniques');
  // a store-priced item is valued without the thin guard and says where the number came from
  const t2 = JSON.parse(JSON.stringify(table));
  t2.items['gear:crimson_uru'].value = 0.1;
  t2.items['gear:crimson_uru'].observed = { perUsd: 10, observations: 1, source: 'store', readAt: '2026-10-18', method: 'shared' };
  const r = E.valueOffer({ price: 10, contents: [{ item: 'Crimson Uru', qty: 100 }] }, t2);
  assert.equal(r.complete, true);
  assert.equal(r.perDollar, 1);
  assert.match(r.lines[0].note, /priced from your store \(1 offer, split evenly with the other unpriced items\), 2026-10-18/);
  assert.equal(E.baselineProblem(t2.items['gear:crimson_uru'], { minObservations: 5 }), null);
  // nothing to estimate once priced
  assert.deepEqual(Object.keys(E.estimateFromStore(offers.slice(2, 3), t2)), ['gear:crimson_security_bypass']);
  // the same item listed twice in one offer (web bonus) is one observation with the total quantity
  const twice = [{ name: 'Twice', price: 10, currency: 'USD', contents: [{ item: 'Crimson Uru', qty: 60 }, { item: 'Crimson Uru', qty: 40, webBonus: true }] }];
  const tw = E.estimateFromStore(twice, table)['gear:crimson_uru'];
  assert.equal(tw.observations, 1);
  assert.equal(tw.offers.length, 1);
  assert.equal(tw.perUsd, 10);
  assert.equal(tw.offers[0].qty, 100);
  assert.equal(tw.offers[0].totalQty, 100);
  // refreshStore prices store-sourced items again from today's offers; a typed value stays
  const again = JSON.parse(JSON.stringify(t2));                       // Uru priced from the store at 10 per US$
  const fresh = [{ name: 'New price', price: 10, currency: 'USD', contents: [{ item: 'Crimson Uru', qty: 200 }] }];
  assert.deepEqual(Object.keys(E.estimateFromStore(fresh, again)), []);
  assert.equal(E.estimateFromStore(fresh, again, { refreshStore: true })['gear:crimson_uru'].perUsd, 20);
  again.items['gear:crimson_uru'].userValue = true;
  assert.deepEqual(Object.keys(E.estimateFromStore(fresh, again, { refreshStore: true })), []);
  assert.equal(again.items['gear:crimson_uru'].value, 0.1);           // the table itself is untouched
  // an offer with hidden contents cannot price anything
  const hidden = [{ name: 'Hidden', price: 10, currency: 'USD', notes: '2 more item(s) not shown on the card', contents: [{ item: 'Crimson Uru', qty: 10 }] }];
  assert.deepEqual(Object.keys(E.estimateFromStore(hidden, table)), []);
  // only money prices count unless asked, and categories limit what is estimated
  const t3 = JSON.parse(JSON.stringify(table));
  t3.items.strike_points.value = 0.01;                 // the table can price Strike Points, so the offer has a US$ figure
  const sp = [{ name: 'Strike store', price: 1000, currency: 'Strike Points', contents: [{ item: 'Crimson Uru', qty: 10 }] }];
  assert.deepEqual(Object.keys(E.estimateFromStore(sp, t3)), []);
  assert.deepEqual(Object.keys(E.estimateFromStore(sp, t3, { fiatOnly: false })), ['gear:crimson_uru']);
  const mixed = [{ name: 'Orbs and gear', price: 10, currency: 'USD', contents: [{ item: 'Premium Orb Fragments', qty: 100 }, { item: 'Crimson Uru', qty: 10 }] }];
  assert.deepEqual(Object.keys(E.estimateFromStore(mixed, table, { categories: ['gear'] })), []);   // the orb blocks the offer
  assert.deepEqual(Object.keys(E.estimateFromStore(offers, table, { categories: ['iso8'] })), []);
  assert.deepEqual(Object.keys(E.estimateFromStore(offers, table, { categories: ['gear'] })).sort(), ['gear:crimson_basic_catalyst_part', 'gear:crimson_security_bypass', 'gear:crimson_uru']);
});
