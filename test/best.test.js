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
