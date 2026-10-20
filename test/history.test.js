'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('../engine.js');

// Fixture only: numbers chosen to make the arithmetic obvious.
const table = {
  meta: { unit: 'USD', unitPerUsd: 1, fxToUsd: { USD: 1, CAD: 0.5 }, scoring: { minObservations: 5 }, valueMultipliers: { orb: 1 } },
  items: {
    'gold': { name: 'Gold', category: 'currency', per: 1000000, value: 1, observed: { perUsd: 1000000, observations: 50 } },
    'training_module:l4': { name: 'L4 Training Module', category: 'training', per: 100, value: 1, observed: { perUsd: 100, observations: 40 } },
    'gear:crimson_uru': { name: 'Crimson Uru', category: 'gear', per: 1, value: null },
    'strike_points': { name: 'Strike Points', category: 'other', per: 1, value: null, excludeFromValue: true }
  }
};

test('priceSnapshot records best and average units per US$ for every item sold that day', () => {
  const offers = { updated: '2026-10-18T22:19:33Z', source: 'web-store', account: 'X', offers: [
    { name: 'Gold A', price: 10, currency: 'USD', contents: [{ item: 'Gold', qty: 20000000 }, { item: 'Strike Points', qty: 100 }] },          // 2M per $
    { name: 'Gold B', price: 20, currency: 'CAD', contents: [{ item: 'Gold', qty: 10000000 }] },                                              // $10: 1M per $
    { name: 'Bundle', price: 10, currency: 'USD', contents: [{ item: 'Gold', qty: 5000000 }, { item: 'L4 Training Module', qty: 500 }] },      // $5 + $5 of value: shares 1M and 100 per $
    { name: 'Uru', price: 10, currency: 'USD', contents: [{ item: 'Crimson Uru', qty: 50 }, { item: 'Gold', qty: 1000000 }] },                 // unpriced item: whole only
    { name: 'Hidden', price: 1, currency: 'USD', notes: '3 more item(s) not shown on the card', contents: [{ item: 'Gold', qty: 90000000 }] }, // hidden contents: left out
    { name: 'Mystery', price: 10, currency: 'USD', contents: [{ item: 'Gold', qty: 100000 }, { item: 'Mystery Box', qty: 1 }] },                // unknown item: whole only
    { name: 'Strike', price: 1000, currency: 'Strike Points', contents: [{ item: 'Gold', qty: 100000000 }] },                                  // not money: left out
    { name: 'Free', contents: [{ item: 'Gold', qty: 1 }] }
  ] };
  const snap = E.priceSnapshot(offers, table);
  assert.equal(snap.date, '2026-10-18');
  assert.equal(snap.readAt, '2026-10-18T22:19:33Z');
  assert.deepEqual(Object.keys(snap.items).sort(), ['gear:crimson_uru', 'gold', 'training_module:l4']);
  const gold = snap.items.gold;
  assert.equal(gold.n, 5);
  assert.equal(gold.wb, 2000000);
  assert.equal(gold.wa, (2000000 + 1000000 + 500000 + 100000 + 10000) / 5);
  assert.equal(gold.sb, 2000000);                       // share: 2M, 1M, 1M (the Uru and Mystery bundles have no share)
  assert.equal(gold.sa, (2000000 + 1000000 + 1000000) / 3);
  const t2 = JSON.parse(JSON.stringify(table)); t2.items.strike_points.value = 0.01;
  assert.equal(E.priceSnapshot(offers, t2, { fiatOnly: false }).items.gold.n, 6);   // Strike Point offers only when asked
  assert.equal(E.priceSnapshot({ updated: 'yesterday', offers: offers.offers }, table).date, null);   // not a day
  assert.equal(E.priceSnapshot(offers.offers, table, { date: '18/10/2026' }).date, null);
  assert.equal(E.isDay('2026-10-18'), true);
  assert.equal(E.isDay('2026-10-18T22:19:33Z'), false);
  assert.equal(snap.items['training_module:l4'].sb, 100);
  assert.equal(snap.items['gear:crimson_uru'].wb, 5);
  assert.equal(snap.items['gear:crimson_uru'].sb, null);
  assert.equal(E.priceSnapshot(offers.offers, table, { date: '2026-01-01' }).date, '2026-01-01');
  assert.equal(E.priceSnapshot(offers.offers, table).date, null);
});

test('history days merge by date and read back per item', () => {
  const d1 = { date: '2026-10-17', items: { gold: { n: 1, wb: 1, wa: 1, sb: 1, sa: 1 } } };
  const d2 = { date: '2026-10-18', items: { gold: { n: 2, wb: 2, wa: 2, sb: 2, sa: 2 }, 'training_module:l4': { n: 1, wb: 100, wa: 100, sb: 100, sa: 100 } } };
  const d2b = { date: '2026-10-18', items: { gold: { n: 3, wb: 3, wa: 3, sb: 3, sa: 3 } } };
  let h = E.mergeHistory(null, d2);
  h = E.mergeHistory(h, d1);
  assert.deepEqual(h.days.map((d) => d.date), ['2026-10-17', '2026-10-18']);
  h = E.mergeHistory(h, d2b);                            // same date replaces
  assert.equal(h.days.length, 2);
  assert.equal(h.days[1].items.gold.wb, 3);
  assert.deepEqual(E.historyFor(h, 'gold').map((d) => [d.date, d.wb]), [['2026-10-17', 1], ['2026-10-18', 3]]);
  assert.deepEqual(E.historyFor(h, 'training_module:l4'), []);
  assert.deepEqual(E.mergeHistory({ days: [{ date: '2026-10-01', items: {} }, { bad: true }] }, null).days.map((d) => d.date), ['2026-10-01']);
  assert.deepEqual(E.mergeHistory(h, { date: null, items: {} }).days.length, 2);
  assert.deepEqual(E.mergeHistory(h, { date: 'yesterday', items: {} }).days.length, 2);       // a bad date is not recorded
  assert.deepEqual(E.mergeHistory({ days: [{ date: 'nope', items: {} }, d1] }, null).days.map((d) => d.date), ['2026-10-17']);   // and not kept
});
