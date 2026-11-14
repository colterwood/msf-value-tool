'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('../engine.js');

const table = {
  meta: { unit: 'USD', unitPerUsd: 1, fxToUsd: { USD: 1, CAD: 0.5 } },
  items: {
    'gold': { name: 'Gold', category: 'currency', per: 1000000, value: 1, observed: { perUsd: 1000000, observations: 50 } },
    'shard:iron man': { name: 'Iron Man shards', category: 'shard', character: 'Iron Man', per: 1, value: 0.5, observed: { perUsd: 2, observations: 12 } },
    'strike_points': { name: 'Strike Points', category: 'currency', per: 100, value: 1, excludeFromValue: true, observed: { perUsd: 100, observations: 700 } },
    'power_cores': { name: 'Power Cores', category: 'currency', per: 100, value: 1, observed: { perUsd: 100, observations: 60 } }
  }
};

test('prices in an in-game currency the table knows convert through its value', () => {
  // 500 Strike Points at 100 per US$ is $5
  const r = E.valueOffer({ price: 500, currency: 'Strike Points', contents: [{ item: 'Gold', qty: 10000000 }] }, table);
  assert.equal(r.priceUsd, 5);
  assert.equal(r.priceVia, 'item');
  assert.equal(r.perDollar, 2);
  // money goes through fx
  const cad = E.valueOffer({ price: 20, currency: 'CAD', contents: [{ item: 'Gold', qty: 10000000 }] }, table);
  assert.equal(cad.priceUsd, 10);
  assert.equal(cad.priceVia, 'fx');
  // unknown currencies are taken as dollars, and say so
  const odd = E.valueOffer({ price: 7, currency: 'Gems', contents: [{ item: 'Gold', qty: 10000000 }] }, table);
  assert.equal(odd.priceUsd, 7);
  assert.equal(odd.priceVia, 'assumed');
  assert.equal(E.priceToUsdDetail(1000, 'power cores', table).usd, 10);
});

test('bestPrices finds the cheapest offer per resource on the whole price and on the price share', () => {
  const offers = [
    { name: 'Gold Pack', price: 10, currency: 'USD', contents: [{ item: 'Gold', qty: 15000000 }] },                 // 1.5M gold per $
    { name: 'Bundle', price: 10, currency: 'USD', contents: [{ item: 'Gold', qty: 10000000 }, { item: 'Iron Man shards', qty: 20 }] }, // gold $10, shards $10
    { name: 'Shards Only', price: 10, currency: 'USD', contents: [{ item: 'Iron Man shards', qty: 30 }] },           // 3 shards per $
    { name: 'Points Only', price: 10, currency: 'USD', contents: [{ item: 'Strike Points', qty: 1000 }] }            // excluded: no value
  ];
  const ranked = E.rankOffers(offers, table, null, { personalize: false });
  const best = E.bestPrices(ranked, table);
  const gold = best.find((b) => b.key === 'gold');
  const shards = best.find((b) => b.key === 'shard:iron man');
  assert.equal(best.length, 2);               // Strike Points never counted
  assert.equal(gold.offers, 2);
  assert.equal(gold.typicalPerUsd, 1000000);
  assert.equal(gold.whole.name, 'Gold Pack');
  assert.equal(gold.whole.perUsd, 1500000);
  // in the bundle gold is half the value, so it is charged $5: 2M gold per $ on the share
  assert.equal(gold.share.name, 'Bundle');
  assert.equal(gold.share.perUsd, 2000000);
  assert.equal(gold.share.sharePrice, 5);
  assert.equal(shards.whole.name, 'Shards Only');
  assert.equal(shards.whole.perUsd, 3);
  assert.equal(shards.share.name, 'Bundle');   // 20 shards for $5 = 4 per $
  assert.equal(shards.share.perUsd, 4);
  // sorted by category then name
  assert.deepEqual(best.map((b) => b.category), ['currency', 'shard']);
});

test('bestPrices skips offers without a usable price and lines that are thin or unknown', () => {
  const t = JSON.parse(JSON.stringify(table));
  t.items['shard:iron man'].observed.observations = 1;   // thin
  const ranked = E.rankOffers([
    { name: 'No price', contents: [{ item: 'Gold', qty: 1000000 }] },
    { name: 'Thin', price: 1, contents: [{ item: 'Iron Man shards', qty: 10 }] },
    { name: 'Mystery', price: 1, contents: [{ item: 'Mystery', qty: 10 }] }
  ], t, null, { personalize: false });
  assert.deepEqual(E.bestPrices(ranked, t), []);
});

const crystalTable = {
  meta: { currency: 'CAD', fxToUsd: { CAD: 1 } },
  items: {
    'gold': { name: 'Gold', category: 'currency', per: 1000000, value: 1, coreValue: 8, observed: { perCash: 1000000, perCore: 125000, basis: 'own' } },
    'iso8:t3_blaster_armor': { name: 'T3 Blaster Armor Level 1 Iso-8', category: 'iso8', per: 1, value: 0.1, coreValue: 0.75, observed: { perCash: 10, perCore: 1.3333333, basis: 'own', family: 'family:t3_crystals' } },
    'iso8:t3_blaster_damage': { name: 'T3 Blaster Damage Level 1 Iso-8', category: 'iso8', per: 1, value: 0.1, coreValue: 0.75, observed: { perCash: 10, perCore: 1.3333333, basis: 'own', family: 'family:t3_crystals' } },
    'iso8:t3_brawler_armor': { name: 'T3 Brawler Armor Level 1 Iso-8', category: 'iso8', per: 1, value: 0.1, coreValue: 0.75, observed: { perCash: 10, perCore: 1.3333333, basis: 'own', family: 'family:t3_crystals' } },
    'strike_points': { name: 'Strike Points', category: 'currency', per: 100, value: null, excludeFromValue: true }
  }
};

test('items that share one price are one resource: what an offer holds of them is added up', () => {
  const offers = [
    { name: 'Blaster Pack', price: 10, currency: 'CAD', ultraCores: 80, contents: [{ item: 'T3 Blaster Armor Level 1 Iso-8', qty: 81 }, { item: 'T3 Blaster Damage Level 1 Iso-8', qty: 81 }, { item: 'Gold', qty: 1000000 }] },
    { name: 'Brawler Single', price: 10, currency: 'CAD', ultraCores: 80, contents: [{ item: 'T3 Brawler Armor Level 1 Iso-8', qty: 120 }] }
  ];
  const ranked = E.rankOffers(offers, crystalTable, null, { personalize: false });
  const best = E.bestPrices(ranked, crystalTable);
  assert.deepEqual(best.map((b) => b.key), ['gold', 'family:t3_crystals']);
  const fam = best[1];
  assert.equal(fam.name, 'T3 stat crystals');
  assert.equal(fam.family, 'family:t3_crystals');
  assert.equal(crystalTable.items[fam.itemKey].observed.family, 'family:t3_crystals');   // a row of the family, for its prices
  assert.equal(fam.typicalPerUsd, 10);
  assert.equal(fam.offers, 2);
  // 162 crystals for CA$10 beat 120 of one kind: per kind the pack would read 8.1 against a usual 10
  assert.equal(fam.whole.name, 'Blaster Pack');
  assert.equal(fam.whole.qty, 162);
  assert.equal(fam.whole.perUsd, 16.2);
  assert.ok(Math.abs(fam.whole.perUsd / fam.typicalPerUsd - 1.62) < 1e-12);
  // in the pack the crystals are 16.2 of the 17.2 of value, so they are charged that share of the price
  assert.ok(Math.abs(fam.share.perUsd - 162 / (10 * 16.2 / 17.2)) < 1e-9);
  assert.equal(best[0].family, null);
  assert.equal(best[0].itemKey, 'gold');
  assert.equal(E.familyLabel('family:t4_crystals'), 'T4 stat crystals');
  assert.equal(E.priceKey(crystalTable.items, 'gold'), 'gold');
  assert.equal(E.priceKey(crystalTable.items, 'iso8:t3_brawler_armor'), 'family:t3_crystals');
  // the same in Ultra Cores
  const cores = E.bestPrices(E.rankOffers(offers, crystalTable, null, { personalize: false, mode: 'cores' }), crystalTable).find((b) => b.family);
  assert.equal(cores.whole.perUsd, 162 / 80);
  assert.ok(Math.abs(cores.typicalPerUsd - 1.3333333) < 1e-9);
});

test('an entry carries the offer it came from, so two offers with one name and price stay apart', () => {
  const offers = [
    { name: 'Twin Pack', price: 12.99, currency: 'CAD', contents: [{ item: 'Gold', qty: 6000000 }] },
    { name: 'Twin Pack', price: 12.99, currency: 'CAD', contents: [{ item: 'Gold', qty: 1000000 }, { item: 'T3 Brawler Armor Level 1 Iso-8', qty: 40 }] }
  ];
  const ranked = E.rankOffers(offers, crystalTable, null, { personalize: false });
  const best = E.bestPrices(ranked, crystalTable);
  const gold = best.find((b) => b.key === 'gold');
  assert.equal(gold.whole.qty, 6000000);
  assert.equal(gold.whole.result.offer, offers[0]);
  assert.equal(gold.share.result.offer, offers[0]);          // alone in its offer: 6M for the whole price
  assert.equal(best.find((b) => b.family).whole.result.offer, offers[1]);
});

test('a day of the price history keeps a family as one record and names the offer behind the best whole price', () => {
  const offers = { updated: '2026-11-14T16:45:48Z', offers: [
    { name: 'Blaster Pack', price: 10, currency: 'CAD', ultraCores: 80, contents: [{ item: 'T3 Blaster Armor Level 1 Iso-8', qty: 81 }, { item: 'T3 Blaster Damage Level 1 Iso-8', qty: 81 }, { item: 'Strike Points', qty: 800 }] },
    { name: 'Crystal Max', price: 40, currency: 'CAD', ultraCores: 300, contents: [{ item: 'T3 Brawler Armor Level 1 Iso-8', qty: 405 }] },
    { name: 'Gold', price: 10, currency: 'CAD', ultraCores: 80, contents: [{ item: 'Gold', qty: 12000000 }] }
  ] };
  const day = E.priceSnapshot(offers, crystalTable);
  assert.deepEqual(Object.keys(day.items).sort(), ['family:t3_crystals', 'gold']);
  assert.deepEqual(day.items['family:t3_crystals'], { n: 2, wb: 16.2, wa: (16.2 + 10.125) / 2, sb: 16.2, sa: (16.2 + 10.125) / 2, wo: 'Blaster Pack' });
  assert.equal(day.items.gold.wo, 'Gold');
  const coreDay = E.priceSnapshot(offers, crystalTable, { mode: 'cores' });
  assert.equal(coreDay.items['family:t3_crystals'].wb, 162 / 80);
  assert.equal(coreDay.items['family:t3_crystals'].wo, 'Blaster Pack');
  const h = E.mergeHistory(null, { date: day.date, items: day.items, coreItems: coreDay.items });
  assert.equal(E.historyFor(h, 'family:t3_crystals')[0].wo, 'Blaster Pack');
  assert.equal(E.historyFor(h, 'family:t3_crystals', 'cores')[0].n, 2);
});

test('a Strike Points bonus puts no offer in the "everything else" bucket', () => {
  const t = JSON.parse(JSON.stringify(crystalTable));
  t.items['other:shop_credits'] = { name: 'Shop Credits', category: 'other', per: 100, value: 1, observed: { perCash: 100, basis: 'own' } };
  const offers = [
    { name: 'Gold and bonus', price: 10, currency: 'CAD', contents: [{ item: 'Gold', qty: 5000000 }, { item: 'Strike Points', qty: 800 }] },
    { name: 'Credits', price: 10, currency: 'CAD', contents: [{ item: 'Shop Credits', qty: 500 }, { item: 'Strike Points', qty: 800 }] }
  ];
  const ranked = E.rankOffers(offers, t, null, { personalize: false });
  const other = E.shopBy(ranked, t, 'other');
  assert.deepEqual(other.map((r) => r.name), ['Credits']);
  assert.deepEqual(other[0].items.map((i) => i.key), ['other:shop_credits']);
  assert.equal(E.shopBy(ranked, t, 'all').length, 2);          // the whole-offer list still has both
});
