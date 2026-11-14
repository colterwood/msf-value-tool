'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const E = require('../engine.js');
const M = require('../tools/market.js');

const near = (a, b, tol) => assert.ok(Math.abs(a - b) <= (tol == null ? 1e-9 : tol), a + ' is not within ' + (tol == null ? 1e-9 : tol) + ' of ' + b);
const o = (day, title, price, lines) => ({ day: day, title: title, price: price, lines: lines });
const RATED = '2026-11-14';

test('an item sold on its own: the day\'s price is its cheapest own offer, the usual price the middle of the earlier days', () => {
  const info = M.priceItems([
    o('2026-10-18', 'Small pack', 10, [['gold', 5000000]]),        // 2.0 per million
    o('2026-10-18', 'Big pack', 30, [['gold', 30000000]]),         // 1.0 per million: the best way that day
    o('2026-10-24', 'Big pack', 30, [['gold', 30000000]]),         // 1.0
    o('2026-11-06', 'Dear pack', 30, [['gold', 20000000]]),        // 1.5
    o(RATED, 'Sale', 10, [['gold', 40000000]]),                    // 0.25: today, a sale
    o('2026-11-20', 'Later', 10, [['gold', 90000000]])             // after the rated read: not part of this rating at all
  ], RATED).gold;
  assert.equal(info.basis, 'own');
  assert.equal(info.firstSeen, false);
  assert.deepEqual(info.days, ['2026-10-18', '2026-10-24', '2026-11-06']);   // the rated read is not among them
  near(info.usual, 1e-6);                                                     // the middle of 1.0, 1.0, 1.5 per million
  near(info.byDay['2026-10-18'].price, 1e-6);
  assert.equal(info.byDay['2026-10-18'].offer, 'Big pack');
  assert.equal(info.byDay['2026-10-18'].offers, 2);
  assert.equal(info.offers, 5);
  assert.equal(info.byDay['2026-11-20'], undefined);
  // the cheapest it has ever been is today's sale, and that sale reads as one
  assert.deepEqual(info.best, { cost: 10 / 40000000, day: RATED, offer: 'Sale' });
  near(40000000 * info.usual / 10, 4);
  // an even number of days: the geometric middle of the two central ones
  const two = M.priceItems([o('2026-10-18', 'a', 10, [['x', 10]]), o('2026-10-24', 'b', 40, [['x', 10]]), o(RATED, 'c', 1, [['x', 10]])], RATED).x;
  near(two.usual, 2);
  near(M.median([1, 4]), 2); near(M.median([3, 1, 2]), 2); assert.ok(isNaN(M.median([])));
  // the same observations in any order give the same prices
  const a = [o('2026-10-18', 'p', 10, [['x', 10]]), o('2026-10-18', 'q', 9, [['x', 10], ['y', 3]]), o('2026-10-24', 'r', 8, [['y', 4], ['z', 1]]), o(RATED, 's', 7, [['z', 2]])];
  assert.deepEqual(M.priceItems(a.slice().reverse(), RATED), M.priceItems(a, RATED));
});

test('an item with no earlier read is priced by the rated read itself and marked first seen', () => {
  const info = M.priceItems([o('2026-10-18', 'Gold', 10, [['gold', 10]]), o(RATED, 'New thing', 20, [['new', 4]]), o(RATED, 'New thing, bigger', 30, [['new', 10]]), o(RATED, 'New pair', 12, [['p', 2], ['q', 60]])], RATED);
  assert.equal(info.new.firstSeen, true);
  assert.deepEqual(info.new.days, [RATED]);
  near(info.new.usual, 3);            // the cheapest of today's own offers
  assert.equal(info.new.basis, 'own');
  assert.equal(info.gold.firstSeen, false);
  // a new set is priced by today's split, line by line
  assert.deepEqual([info.p.basis, info.p.firstSeen, info.q.firstSeen], ['set', true, true]);
  near(info.p.usual, 3); near(info.q.usual, 0.1);
});

test('items only sold together split the offer evenly; today\'s offers do not move their usual price', () => {
  const info = M.priceItems([
    o('2026-10-18', 'Ions Special', 20, [['l5', 2700000], ['l4', 2700000]]),
    o('2026-10-24', 'Ions Special', 20, [['l5', 2700000], ['l4', 2700000]]),
    o('2026-10-24', 'Ions Bundle', 130, [['l5', 21800000], ['l4', 21800000]]),     // cheaper per ion that day
    o(RATED, 'Fest L5', 7, [['l5', 3000000], ['frags', 50000]])
  ], RATED);
  assert.equal(info.l5.basis, 'set');
  assert.equal(info.l4.basis, 'set');
  near(info.l5.byDay['2026-10-18'].price, 10 / 2700000);
  near(info.l5.byDay['2026-10-24'].price, 65 / 21800000);                         // the cheaper of the two that day
  near(info.l5.usual, Math.sqrt((10 / 2700000) * (65 / 21800000)));
  assert.deepEqual(info.l5.days, ['2026-10-18', '2026-10-24']);
  // today's fest offer is a set too (nothing in it has ever been sold alone): it gives today's price, not the usual one
  near(info.l5.byDay[RATED].price, 3.5 / 3000000);
  assert.deepEqual(info.l5.best, { cost: 3.5 / 3000000, day: RATED, offer: 'Fest L5' });
  assert.equal(info.frags.basis, 'set');
  assert.equal(info.frags.firstSeen, true);
  near(info.l4.usual, info.l5.usual);
});

test('an item that only comes beside things sold on their own has no price, and is never guessed at', () => {
  const info = M.priceItems([
    o('2026-10-18', 'T4 alone', 25, [['t4', 1000]]),
    o('2026-10-18', 'Dear special', 70, [['t4', 1000], ['t3', 750], ['t1', 100]]),   // t4 is sold on its own: nothing here prices t3 or t1
    o('2026-10-24', 'Dear special', 70, [['t4', 1000], ['t3', 750], ['t1', 100]]),
    o(RATED, 'Vault', 26, [['t4', 1000], ['t3', 500], ['t1', 400]]),
    o(RATED, 'Great deal', 20, [['t4', 1000], ['t1', 5000]])
  ], RATED);
  assert.deepEqual(Object.keys(info), ['t4']);
  near(info.t4.usual, 0.025);
  assert.equal(info.t4.offers, 1);              // only its own offer is evidence; the bundles are not
});

test('a new kind of offer today never rewrites an item\'s history', () => {
  // X and Y were only ever sold together, at 0.10 each. Today X is sold alone at half price.
  const pair = (d) => o(d, 'Pair', 2, [['x', 10], ['y', 10]]);
  const sale = o(RATED, 'X alone', 0.5, [['x', 10]]);
  let info = M.priceItems([pair('2026-10-18'), pair('2026-10-24'), sale], RATED);
  assert.deepEqual([info.x.basis, info.x.firstSeen, info.x.days], ['set', false, ['2026-10-18', '2026-10-24']]);
  near(info.x.usual, 0.1);
  near(10 * info.x.usual / 0.5, 2);             // the sale reads 2x, not 1x
  near(info.y.usual, 0.1);
  assert.equal(info.y.firstSeen, false);
  // On the next read that sale is one day of history among three, and Y keeps the price it had.
  const NEXT = '2026-11-20';
  info = M.priceItems([pair('2026-10-18'), pair('2026-10-24'), sale, pair(NEXT), o(NEXT, 'X alone', 1, [['x', 10]])], NEXT);
  assert.deepEqual(info.x.days, ['2026-10-18', '2026-10-24', RATED]);
  near(info.x.usual, 0.1);                      // the middle of 0.10, 0.10 and the 0.05 sale
  assert.equal(info.x.basis, 'own');
  assert.deepEqual(info.y.days, ['2026-10-18', '2026-10-24']);    // the pair is no longer a set once X sells alone
  near(info.y.usual, 0.1);
  assert.equal(info.y.byDay[NEXT], undefined);
  // an item with a price of its own that turns up beside something new: it keeps its price, the new thing has none
  info = M.priceItems([o('2026-10-18', 'Z alone', 3, [['z', 1]]), o(RATED, 'Z and W', 2, [['z', 1], ['w', 1]])], RATED);
  near(info.z.usual, 3);
  assert.equal(info.w, undefined);
});

function miniTable() {
  return { meta: { currency: 'CAD', fxToUsd: { CAD: 1 } }, items: {
    gold: { name: 'Gold', category: 'currency', per: 1, value: null, aliases: [], id: 'SC' },
    'training_module:l4': { name: 'L4 Training Module', category: 'training', per: 1, value: null, aliases: [], id: 'XP80', xp: 1600 },
    'training_module:l3': { name: 'L3 Training Module', category: 'training', per: 1, value: null, aliases: [], id: 'XP60', xp: 800, derivedFrom: { key: 'training_module:l4', ratio: 0.5, basis: 'XP' } },
    'iso8:t3_blaster_armor_level_1_iso-8': { name: 'T3 Blaster Armor Level 1 Iso-8', category: 'iso8', per: 1, value: null, aliases: [], id: 'ISOITEM_PURPLE_BLASTER_ARMOR_11' },
    'iso8:t3_brawler_focus_level_1_iso-8': { name: 'T3 Brawler Focus Level 1 Iso-8', category: 'iso8', per: 1, value: null, aliases: [], id: 'ISOITEM_PURPLE_BRAWLER_FOCUS_11' },
    'shard:kingo': { name: 'Kingo shards', category: 'shard', character: 'Kingo', per: 1, value: null, aliases: [] },
    'orb:orange_mega_orb': { name: 'Orange Mega Orb', category: 'orb', per: 1, value: null, aliases: [] },
    ultra_cores: { name: 'Ultra Cores', category: 'currency', per: 1, value: null, aliases: [], id: 'UC' },
    'points:fest': { name: 'Fest Milestone Points', category: 'points', per: 1, value: null, aliases: [], excludeFromValue: true, id: 'EVTA_FEST' },
    strike_points: { name: 'Strike Points', category: 'currency', per: 100, value: 1, aliases: [], excludeFromValue: true, id: 'BFYB-CUR' },
    'other:never_sold': { name: 'Never Sold', category: 'other', per: 1, value: 3, aliases: [], observed: { perCash: 0.33 } }
  } };
}

test('rows for store resource ids: by id, by name when it is the same kind and product, else a row of their own', () => {
  const t = miniTable();
  const ctx = { index: E.buildIndex(t), byId: M.idIndex(t) };
  assert.deepEqual(M.ensureRow(t, ctx, 'SC', 'Gold'), { key: 'gold', created: false });
  // a row with no id takes the id of the thing with its name
  assert.deepEqual(M.ensureRow(t, ctx, 'SHARD_KINGO', 'Kingo shards'), { key: 'shard:kingo', created: false });
  assert.equal(t.items['shard:kingo'].id, 'SHARD_KINGO');
  assert.deepEqual(M.ensureRow(t, ctx, 'GACHA_7570aa11bb22cc33dd44ee55ff6677889900aabbccddeeff0011223344556677', 'Orange Mega Orb'), { key: 'orb:orange_mega_orb', created: false });
  // an id that is only a hash names no product: a reissue with the same label is the same row
  assert.deepEqual(M.ensureRow(t, ctx, 'GACHA_0bb6fd319dfe9bd2ba800bddac3dff0b7c85739457bcb626f5a927e218eb546d', 'Orange Mega Orb'), { key: 'orb:orange_mega_orb', created: false });
  assert.equal(M.isHashId('GACHA_0bb6fd319dfe9bd2ba800bddac3dff0b7c85739457bcb626f5a927e218eb546d'), true);
  assert.equal(M.isHashId('GACHA_CRATE_GOLD_TOKEN_b39f19f5'), false);
  // a promotion is never folded into the shard row
  const p = M.ensureRow(t, ctx, 'PD_KINGO_3', 'Kingo — 3 diamond promotion');
  assert.deepEqual([p.key, p.created, t.items[p.key].character, t.items[p.key].category], ['promotion:kingo_—_3_diamond_promotion', true, 'Kingo', 'promotion']);
  // categories from the id; names cleaned of non-breaking spaces
  assert.equal(M.ensureRow(t, ctx, 'GACHA_CRATE_NEW_TOKEN_1a2b3c4d', 'Shiny Orb Fragments').key, 'orb:shiny');
  assert.equal(M.ensureRow(t, ctx, 'ISOITEM_PURPLE_BLASTER_DAMAGE_11', 'T3 Blaster Damage Level 1 Iso-8').key, 'iso8:t3_blaster_damage_level_1_iso-8');
  // the same product with a new hash is the same row; a different product with the same label is not
  assert.deepEqual(M.ensureRow(t, ctx, 'GACHA_CRATE_NEW_TOKEN_99887766', 'Shiny Orb Fragments'), { key: 'orb:shiny', created: false });
  const other = M.ensureRow(t, ctx, 'GACHA_CRATE_OTHER_20_TOKEN_0a0b0c0d', 'Shiny Orb Fragments');
  assert.deepEqual([other.key, other.created], ['orb:shiny_2', true]);
  // ... and a new hash of that second product finds the second row again
  assert.deepEqual(M.ensureRow(t, ctx, 'GACHA_CRATE_OTHER_20_TOKEN_11111111', 'Shiny Orb Fragments'), { key: 'orb:shiny_2', created: false });
  assert.deepEqual(E.itemIds(t.items['orb:shiny']), ['GACHA_CRATE_NEW_TOKEN_1a2b3c4d', 'GACHA_CRATE_NEW_TOKEN_99887766']);
  // event points keep one row per name however many ids the months bring
  assert.deepEqual(M.ensureRow(t, ctx, 'EVTA_FEST_NOV', 'Fest Milestone Points'), { key: 'points:fest', created: false });
  assert.equal(t.items[M.ensureRow(t, ctx, 'EVTA_NEW', 'Cyber Breach Milestone Points').key].excludeFromValue, true);
  // a character's awakened material is listed under the character
  const aw = M.ensureRow(t, ctx, 'ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_JEFF_BASIC', "Jeff the Land Shark's Basic Awakened Ability Material");
  assert.equal(t.items[aw.key].character, 'Jeff the Land Shark');
  assert.equal(t.items[aw.key].category, 'ability');
  // the engine resolves a line by any of a row's ids
  assert.equal(E.resolveLine(t, E.buildIndex(t), { item: 'whatever the page calls it', id: 'EVTA_FEST_NOV' }).key, 'points:fest');
  assert.equal(E.resolveLine(t, E.buildIndex(t), { item: 'Shiny Orb Fragments', id: 'GACHA_CRATE_OTHER_20_TOKEN_11111111' }).key, 'orb:shiny_2');
});

test('a store read as evidence: complete money offers only, both prices kept, steps you cannot buy yet marked', () => {
  const t = miniTable();
  const read = { updated: '2026-11-14T16:45:48.102Z', priceCurrency: 'CAD', account: 'X', bookmarklet: '2026-11-14', offers: [
    { name: 'Good', price: 12.99, currency: 'CAD', ultraCores: 100, contents: [{ item: 'Gold', id: 'SC', qty: 2000000 }, { item: 'Gold', id: 'SC', qty: 500000, webBonus: true }, { item: 'L3 Training Module', qty: 10 }, { item: 'Strike Points', id: 'BFYB-CUR', qty: 1000 }] },
    { name: 'Chain (step 2 of 2)', price: 6.99, currency: 'CAD', ultraCores: 50, chain: { name: 'Chain', step: 2, of: 2, current: 1, steps: [] }, contents: [{ item: 'Gold', id: 'SC', qty: 9 }] },
    { name: 'Chain (step 1 of 2)', price: 6.99, currency: 'CAD', chain: { name: 'Chain', step: 1, of: 2, current: 1, steps: [] }, contents: [{ item: 'Gold', id: 'SC', qty: 8 }] },
    { name: 'Old chain card', price: 6.99, currency: 'CAD', chain: true, contents: [{ item: 'Gold', id: 'SC', qty: 7 }] },                          // an old read knew only that it is a chain: buyable
    { name: 'Points unreadable', price: 6.99, currency: 'CAD', contents: [{ item: 'Gold', qty: 6 }, { item: 'Fest Milestone Points', qty: null }] },   // points are not counted anyway
    { name: 'Hidden', price: 12.99, currency: 'CAD', notes: '+3 more items not shown on the card', contents: [{ item: 'Gold', qty: 1 }] },
    { name: 'Strike', price: 500, currency: 'Strike Points', contents: [{ item: 'Gold', qty: 1 }] },
    { name: 'Free', price: null, currency: 'CAD', notes: 'free claim', contents: [{ item: 'Gold', qty: 1 }] },
    { name: 'Mystery', price: 6.99, currency: 'CAD', contents: [{ item: 'Gold', qty: 1 }, { item: 'Never heard of it', qty: 2 }] },
    { name: 'Pass', price: 6.99, currency: 'CAD', contents: [{ item: 'Gold', qty: 1 }, { item: 'BPTIER_X', id: 'BPTIER_X', qty: 1 }] },
    { name: 'No count', price: 6.99, currency: 'CAD', contents: [{ item: 'Gold', qty: null }] }
  ] };
  const se = M.storeEntries(read, t, E.buildIndex(t));
  assert.equal(se.day, '2026-11-14');
  assert.deepEqual(se.offers.map((x) => x.title), ['Good', 'Chain (step 2 of 2)', 'Chain (step 1 of 2)', 'Old chain card', 'Points unreadable']);
  // a line with an id keeps it; a line without one keeps the name, which is all that read knew
  assert.deepEqual(se.offers[0], { title: 'Good', cur: 'CAD', lines: [['SC', 2500000], ['=L3 Training Module', 10], ['BFYB-CUR', 1000]], days: { '2026-11-14': 12.99 }, cores: { '2026-11-14': 100 } });
  assert.deepEqual(se.offers[1].locked, { '2026-11-14': true });
  assert.equal(se.offers[2].locked, undefined);
  assert.equal(se.offers[3].locked, undefined);
  assert.deepEqual(se.offers[4].lines, [['=Gold', 6]]);
  assert.equal(se.skipped, 4);                        // Hidden, Mystery, Pass, No count; Strike and Free are not money offers at all
  assert.deepEqual(se.meta, { readAt: '2026-11-14T16:45:48.102Z', account: 'X', source: 'page data', bookmarklet: '2026-11-14', offers: 11, used: 5 });
  assert.ok(se.seen.SC && se.seen['=L3 Training Module'] && se.seen.BPTIER_X && se.seen['=Never heard of it']);
  // a read with no date is not evidence
  assert.equal(M.storeEntries({ offers: read.offers }, t, E.buildIndex(t)).day, null);
});

test('the archive as observations: points dropped, derived levels as the base, crystals as one family, both currencies', () => {
  const t = miniTable();
  const archive = M.emptyArchive();
  archive.reads = { '2026-11-06': { source: 'cards' }, '2026-11-14': { source: 'page data' }, '2026-11-15': { source: 'page data' } };
  const add = (e) => M.addToArchive(archive, e);
  add({ title: 'Pack', cur: 'CAD', lines: [['SC', 1000000], ['EVTA_FEST', 500], ['XP60', 10]], days: { '2026-11-06': 12.99, '2026-11-14': 12.99 }, cores: { '2026-11-14': 100 } });
  add({ title: 'Crystal Max', cur: 'CAD', lines: [['ISOITEM_PURPLE_BLASTER_ARMOR_11', 81], ['=T3 Brawler Focus Level 1 Iso-8', 81]], days: { '2026-11-06': 39.99 } });
  add({ title: 'Gold Galore', cur: 'CAD', lines: [['=Gold', 115000000], ['=Strike Points', 7500]], days: { '2026-11-06': 99.99 } });
  add({ title: 'Tier A', cur: 'CAD', lines: [['SC', 6]], days: { '2026-11-14': 49.99 }, cores: { '2026-11-14': 350 } });
  add({ title: 'Tier B', cur: 'CAD', lines: [['SC', 7]], days: { '2026-11-14': 49.99 }, cores: { '2026-11-14': 400 } });
  add({ title: 'T4 Ions', cur: 'CAD', lines: [['SC', 5]], days: { '2026-11-14': 99.99 }, cores: { '2026-11-14': 700 } });
  add({ title: 'Later step', cur: 'CAD', lines: [['SC', 8]], days: { '2026-11-14': 6.99 }, cores: { '2026-11-14': 50 }, locked: { '2026-11-14': true } });
  add({ title: 'No cores on the page', cur: 'CAD', lines: [['SC', 9]], days: { '2026-11-14': 12.99 } });
  add({ title: 'Ultra Cores', cur: 'CAD', lines: [['=Ultra Cores', 100], ['=Strike Points', 1000]], days: { '2026-11-06': 12.99 } });
  add({ title: 'Unplaced', cur: 'CAD', lines: [['=Something else', 3]], days: { '2026-11-14': 12.99 } });
  add({ title: 'Pass', cur: 'CAD', lines: [['SC', 3], ['BPTIER_X', 1]], days: { '2026-11-14': 12.99 } });
  add({ title: 'Points only', cur: 'CAD', lines: [['EVTA_FEST', 3], ['=Some Event Milestone Points', 9]], days: { '2026-11-14': 12.99 } });
  // the same offer again only adds its new days and prices
  assert.deepEqual(add({ title: 'Pack', cur: 'CAD', lines: [['EVTA_FEST', 500], ['SC', 1000000], ['XP60', 10]], days: { '2026-11-14': 12.99, '2026-11-15': 12.99 }, cores: { '2026-11-15': 100 } }), { added: false, days: 1 });
  assert.equal(archive.offers.length, 12);
  assert.equal(M.latestDay(archive), '2026-11-15');
  // CA$12.99 always carries 100 cores; CA$49.99 is two tiers, so it has none
  assert.deepEqual(M.coreTiers(archive), [[6.99, 50], [12.99, 100], [99.99, 700]]);
  assert.equal(M.tierCores(12.99, M.coreTiers(archive)), 100);
  assert.equal(M.tierCores(49.99, M.coreTiers(archive)), null);
  const cash = M.observations(archive, t, { mode: 'cash' });
  assert.equal(cash.skipped, 3);                                       // Unplaced, Pass, Points only
  assert.deepEqual(cash.unplaced, { '=Something else': 1 });
  const pack = cash.obs.filter((x) => x.title === 'Pack');
  assert.deepEqual(pack.map((x) => x.day).sort(), ['2026-11-06', '2026-11-14', '2026-11-15']);
  assert.deepEqual(pack[0].lines, [['gold', 1000000], ['training_module:l4', 5]]);   // ten L3 modules are five L4 by XP; the points are gone
  assert.deepEqual(cash.obs.find((x) => x.title === 'Crystal Max').lines, [['family:t3_crystals', 162]]);   // two crystal types, one priced thing
  assert.equal(cash.obs.filter((x) => x.title === 'Later step').length, 0);          // not for sale on its own that day
  const cores = M.observations(archive, t, { mode: 'cores' });
  const price = (title) => cores.obs.filter((x) => x.title === title).map((x) => [x.day, x.price]).sort();
  assert.deepEqual(price('Pack'), [['2026-11-06', 100], ['2026-11-14', 100], ['2026-11-15', 100]]);   // the card day by its price tier, the page days by their own figure
  // a card read's own Strike Points bonus says what it cost in cores: 10 points per core, whatever the tier table would say
  assert.deepEqual(price('Gold Galore'), [['2026-11-06', 750]]);
  assert.equal(M.bonusCores([['=Gold', 1], ['=Strike Points', 7500]]), 750);
  assert.equal(M.bonusCores([['SC', 1], ['BFYB-CUR', 500], ['BFYB-CUR', 500]]), 100);
  assert.equal(M.bonusCores([['SC', 1]]), null);
  assert.deepEqual(price('Tier A').concat(price('Tier B')), [['2026-11-14', 350], ['2026-11-14', 400]]);
  assert.deepEqual(price('Crystal Max'), []);                          // no bonus line, and CA$39.99 was never seen with a core price here
  assert.deepEqual(price('No cores on the page'), []);                 // the page data gives a core price wherever there is one
  assert.deepEqual(price('Ultra Cores'), []);                          // cores are not sold for cores
  assert.equal(M.familyOf('gold', t.items.gold), 'gold');
  assert.equal(M.familyOf('x', { name: 'T4 Controller Resist Level 1 Iso-8' }), 'family:t4_crystals');
  assert.equal(M.familyOf('x', { name: 'Kingo — 3 diamond promotion' }), 'x');       // a character's things are priced for that character
  // a later read of a day replaces that day instead of blending with it
  assert.equal(M.removeDay(archive, '2026-11-14'), 9);
  assert.equal(archive.reads['2026-11-14'], undefined);
  assert.deepEqual(archive.offers.find((x) => x.title === 'Pack').days, { '2026-11-06': 12.99, '2026-11-15': 12.99 });
  assert.equal(archive.offers.filter((x) => x.title === 'Tier A' || x.title === 'Later step').length, 0);   // offers with no day left are gone
});

test('prices written into the table: both currencies, where the number comes from, family members alike, the rest left alone', () => {
  const t = miniTable();
  const archive = M.emptyArchive();
  [['2026-10-18', 12.99], ['2026-10-24', 12.99], ['2026-11-14', 6.99]].forEach((d, i) => {
    const e = { title: 'Gold ' + i, cur: 'CAD', lines: [['SC', 13000000]], days: {}, cores: {} };
    e.days[d[0]] = d[1]; if (d[0] === '2026-11-14') e.cores[d[0]] = 50;
    M.addToArchive(archive, e);
  });
  M.addToArchive(archive, { title: 'Tier', cur: 'CAD', lines: [['XP80', 1300]], days: { '2026-10-24': 12.99, '2026-11-14': 12.99 }, cores: { '2026-11-14': 100 } });
  M.addToArchive(archive, { title: 'Crystal Max', cur: 'CAD', lines: [['ISOITEM_PURPLE_BLASTER_ARMOR_11', 130]], days: { '2026-10-24': 12.99 } });
  const p = M.prices(archive, t);
  assert.equal(p.ratedDay, '2026-11-14');
  assert.deepEqual(p.tiers, [[6.99, 50], [12.99, 100]]);
  const rep = M.applyPrices(t, p);
  const g = t.items.gold;
  near(g.observed.perCash, 13000000 / 12.99, 1);        // the two earlier days; today's half-price sale is not the usual price
  near(g.observed.perCore, 130000, 1e-6);               // 100 cores by the price tier on both earlier days
  assert.equal(g.observed.basis, 'own');
  assert.deepEqual(g.observed.days, ['2026-10-18', '2026-10-24']);
  assert.equal(g.observed.firstSeen, false);
  assert.equal(g.observed.offers, 3);
  assert.deepEqual(g.observed.best, { per: Number((13000000 / 6.99).toPrecision(6)), day: '2026-11-14', offer: 'Gold 2' });
  assert.deepEqual(g.observed.bestCore, { per: 260000, day: '2026-11-14', offer: 'Gold 2' });
  // its price on each read day, the rated one included: what the usual price is the middle of, and what today is
  const perDay = (price) => Number((13000000 / price).toPrecision(6));
  assert.deepEqual(g.observed.byDay, {
    '2026-10-18': { per: perDay(12.99), offer: 'Gold 0' },
    '2026-10-24': { per: perDay(12.99), offer: 'Gold 1' },
    '2026-11-14': { per: perDay(6.99), offer: 'Gold 2' }
  });
  assert.deepEqual(Object.keys(g.observed.coreByDay), ['2026-10-18', '2026-10-24', '2026-11-14']);
  assert.deepEqual(g.observed.coreByDay['2026-11-14'], { per: 260000, offer: 'Gold 2' });
  assert.equal(g.per, 1000000);                         // a scale on which the value is readable
  near(g.value, 1000000 / g.observed.perCash, 1e-6);
  near(g.coreValue, 1000000 / 130000, 1e-4);
  // both crystal rows carry the family's price, the one no offer named included
  const a = t.items['iso8:t3_blaster_armor_level_1_iso-8'], b = t.items['iso8:t3_brawler_focus_level_1_iso-8'];
  assert.equal(a.observed.family, 'family:t3_crystals');
  assert.equal(b.observed.perCash, a.observed.perCash);
  near(a.observed.perCash, 130 / 12.99, 1e-4);
  assert.equal(a.observed.perCore, 1.3);
  // rows priced from another, points rows and rows no read carried
  assert.equal(t.items['training_module:l3'].value, null);
  near(E.unitValue(E.deriveItem(t, 'training_module:l3')), E.unitValue(t.items['training_module:l4']) / 2, 1e-12);
  near(E.coreUnitValue(E.deriveItem(t, 'training_module:l3')), E.coreUnitValue(t.items['training_module:l4']) / 2, 1e-12);
  assert.equal(t.items.strike_points.value, null);      // nothing says what a Strike Point costs
  assert.equal(t.items['other:never_sold'].value, null);
  assert.deepEqual(t.items['other:never_sold'].observed, { perCash: null });
  assert.equal(t.items['shard:kingo'].value, null);
  assert.deepEqual([rep.own, rep.set, rep.firstSeen, rep.unpriced], [4, 0, 0, 4]);
  // rating an older read: the later days are no part of its yardstick
  const older = M.prices(archive, miniTable(), { ratedDay: '2026-10-24' });
  assert.deepEqual(older.cash.gold.days, ['2026-10-18']);
  assert.equal(older.cash.gold.byDay['2026-11-14'], undefined);
  assert.equal(older.cash['training_module:l4'].firstSeen, true);
  // one read day's offers back out of the archive, for the price history
  const day = M.dayOffers(archive, '2026-10-24', p.tiers);
  assert.deepEqual(day.map((x) => [x.name, x.price, x.ultraCores]).sort(), [['Crystal Max', 12.99, 100], ['Gold 1', 12.99, 100], ['Tier', 12.99, 100]]);
  assert.deepEqual(day.find((x) => x.name === 'Tier').contents, [{ id: 'XP80', item: 'XP80', qty: 1300 }]);
});

/* ---------- the data in the repository ---------- */

const ROOT = path.join(__dirname, '..');
const ROW_FIELDS = ['name', 'category', 'per', 'value', 'coreValue', 'aliases', 'character', 'xp', 'derivedFrom', 'excludeFromValue', 'cores', 'id', 'ids', 'observed', 'note'];

function loadGlobal(file, name) {
  const w = {};
  new Function('window', fs.readFileSync(path.join(ROOT, file), 'utf8'))(w);
  return w[name];
}

test('data/values.js is exactly what data/reads.json prices to, in both currencies, and holds nothing from outside', () => {
  const table = loadGlobal('data/values.js', 'MSF_VALUE_TABLE');
  const archive = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'reads.json'), 'utf8'));
  const b = table.meta.baseline;
  assert.equal(b.method, 'own-history');
  assert.equal(table.meta.currency, 'CAD');
  const p = M.prices(archive, table, { ratedDay: b.ratedDay });
  assert.deepEqual(Object.keys(archive.reads).sort(), b.readDays);
  assert.deepEqual(table.meta.coreTiers, p.tiers);
  let checked = 0, withCores = 0;
  Object.keys(table.items).forEach((k) => {
    const it = table.items[k];
    Object.keys(it).forEach((f) => assert.ok(ROW_FIELDS.indexOf(f) !== -1, k + ' carries a field this tool does not write: ' + f));
    if (it.excludeFromValue || it.derivedFrom) { assert.equal(it.value, null, k); return; }
    const c = p.cash[M.familyOf(k, it)], u = p.cores[M.familyOf(k, it)];
    if (!c) { assert.equal(it.value, null, k); return; }
    near(it.observed.perCash * c.usual, 1, 1e-5);
    near(it.value * it.observed.perCash / it.per, 1, 1e-5);
    assert.ok(it.observed.basis === 'own' || it.observed.basis === 'set', k);
    assert.equal(it.observed.basis, c.basis, k);
    assert.equal(it.observed.firstSeen, c.firstSeen, k);
    if (u) { near(it.observed.perCore * u.usual, 1, 1e-5); near(it.coreValue * it.observed.perCore / it.per, 1, 1e-5); withCores += 1; }
    else assert.equal(it.coreValue, null, k);
    // the yardstick never includes the read being rated, except for what that read shows for the first time
    assert.ok(c.firstSeen ? c.days.every((d) => d === b.ratedDay) : c.days.every((d) => d < b.ratedDay), k);
    checked += 1;
  });
  assert.equal(checked, b.priced);
  assert.ok(checked > 150 && withCores > 150, checked + ' rows priced, ' + withCores + ' in cores too');
  // every id on a row is one a read from the page data has shown
  Object.keys(table.items).forEach((k) => E.itemIds(table.items[k]).forEach((id) => assert.ok(archive.names[id] != null, k + ' carries an id no read has shown: ' + id)));
  // the prices come from the reads alone: no web address anywhere in the files they are built from or written to
  ['data/values.js', 'data/reads.json', 'data/history.js'].forEach((f) => assert.ok(!/https?:\/\//i.test(fs.readFileSync(path.join(ROOT, f), 'utf8')), f));
  assert.deepEqual(Object.keys(table.meta).sort(), ['baseline', 'coreTiers', 'currency', 'fxToUsd', 'gradeNote', 'grades', 'source', 'unit', 'updated', 'xpNote']);
});

test('the latest read: every item on its own and the whole offer, per CA$ and per Ultra Core', () => {
  const table = loadGlobal('data/values.js', 'MSF_VALUE_TABLE');
  const offers = loadGlobal('data/offers.js', 'MSF_OFFERS');
  const history = loadGlobal('data/history.js', 'MSF_HISTORY');
  assert.equal(String(offers.updated).slice(0, 10), table.meta.baseline.ratedDay);
  const cash = E.rankOffers(offers, table, null, { personalize: false, mode: 'cash' });
  const cores = E.rankOffers(offers, table, null, { personalize: false, mode: 'cores' });
  // the items of an offer add up to the offer, in both currencies
  [cash, cores].forEach((list) => list.forEach((r) => {
    if (r.perDollar == null) return;
    const sum = r.lines.reduce((a, l) => a + (l.vsTypical || 0) * (l.categoryMultiplier == null ? 1 : l.categoryMultiplier), 0);
    near(sum, r.perDollar, 1e-9);
  }));
  // Strike Store: no money price, so a value per point and no grade
  const strike = cash.filter((r) => r.currency === 'Strike Points');
  assert.ok(strike.every((r) => r.perDollar == null && r.grade == null));
  // Ultra Core packs are never sold for cores
  cores.filter((r) => r.lines.some((l) => l.key === 'ultra_cores')).forEach((r) => assert.equal(r.perDollar, null, r.name));
  assert.equal(table.items.ultra_cores.coreValue, null);
  // the price history covers every read day in both currencies
  assert.deepEqual(history.days.map((d) => d.date), table.meta.baseline.readDays);
  assert.ok(history.days.every((d) => d.items && d.coreItems && d.items.gold));
  assert.ok(E.historyFor(history, 'gold', 'cores').length >= 1);
  // a read from the page data hides nothing and names everything
  if (offers.offers.every((x) => (x.contents || []).every((c) => c.id))) {
    assert.equal(cash.filter((r) => r.hidden).length, 0);
    assert.equal(cash.filter((r) => r.unknown.length).length, 0);
  }

  // The rest pins the README's worked example to the read it was taken from. A later read has
  // other offers, so it only runs while the read of 14 November 2026 is the one on file.
  if (table.meta.baseline.ratedDay !== '2026-11-14') return;
  const pick = (list, name) => list.find((r) => r.name === name);
  const tup = pick(cash, 'Turn Up the Power (option 1)'), tupCores = pick(cores, 'Turn Up the Power (option 1)');
  assert.equal(tup.price, 6.99);
  assert.deepEqual(tup.lines.filter((l) => !l.excluded).map((l) => [l.item, l.qty, l.value.toFixed(2), l.vsTypical.toFixed(2)]), [['T4 Ability Material', 210, '5.61', '0.80'], ['T4 Level 1 Ions', 31000, '5.17', '0.74']]);
  assert.equal(tup.perDollar.toFixed(2), '1.54');
  assert.equal(tupCores.price, 50);
  assert.deepEqual(tupCores.lines.filter((l) => !l.excluded).map((l) => l.vsTypical.toFixed(2)), ['0.90', '0.72']);
  assert.equal(tupCores.perDollar.toFixed(2), '1.62');
  // a sale reads as a sale: the ISO Fest bundles against what crystals and ions cost on the earlier reads
  assert.ok(pick(cash, 'ISO Fest: T3 Level 5 Ions Trove').perDollar > 5);
  assert.ok(pick(cash, 'T3 L5 Ions Brawler Pack').perDollar > 3);
  assert.equal(pick(cash, 'T3 L5 Ions Brawler Pack').perDollar, pick(cash, 'T3 L5 Ions Blaster Pack').perDollar);   // a crystal is a crystal
  assert.equal(pick(cash, 'T4 Ions').perDollar.toFixed(2), '1.00');                                               // sold at its usual price
  // the Orange Mega Orb is one row whatever id a read showed for it: the same offer at the same price reads 1x
  assert.equal(Object.keys(table.items).filter((k) => table.items[k].name === 'Orange Mega Orb').length, 1);
  assert.ok(cash.filter((r) => /Orange Mega Orb$/.test(r.name) && r.price === 129.99).every((r) => r.perDollar.toFixed(2) === '1.00'));
  assert.ok(strike.length > 0 && strike.some((r) => r.perPriceUnit > 0));
  assert.ok(E.historyFor(history, 'ultra_cores').length >= 3);
});

test('refresh.js: running it again changes nothing but the time, and a later read of a day replaces that day', () => {
  // a throwaway copy of what the tool reads and writes
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'msfv-refresh-'));
  try {
    ['engine.js', 'pull.js'].forEach((f) => fs.copyFileSync(path.join(ROOT, f), path.join(dir, f)));
    ['tools', 'data'].forEach((d) => fs.mkdirSync(path.join(dir, d)));
    ['market.js', 'refresh.js'].forEach((f) => fs.copyFileSync(path.join(ROOT, 'tools', f), path.join(dir, 'tools', f)));
    ['values.js', 'offers.js', 'reads.json', 'history.js'].forEach((f) => fs.copyFileSync(path.join(ROOT, 'data', f), path.join(dir, 'data', f)));
    const run = (args) => spawnSync(process.execPath, [path.join(dir, 'tools', 'refresh.js')].concat(args || []), { encoding: 'utf8' });
    const strip = (s) => s.replace(/"(builtAt|updated)": ?"[^"]*"/g, '"$1":"-"').replace(/built \d{4}-\d{2}-\d{2}/g, 'built -');
    const read = (f) => strip(fs.readFileSync(path.join(dir, 'data', f), 'utf8'));
    const before = { values: read('values.js'), reads: read('reads.json'), history: read('history.js') };
    let r = run();
    assert.equal(r.status, 0, r.stderr);
    assert.deepEqual({ values: read('values.js'), reads: read('reads.json'), history: read('history.js') }, before);
    // --dry-run writes nothing
    const raw = fs.readFileSync(path.join(dir, 'data', 'values.js'), 'utf8');
    r = run(['--dry-run']);
    assert.equal(r.status, 0, r.stderr);
    assert.equal(fs.readFileSync(path.join(dir, 'data', 'values.js'), 'utf8'), raw);
    // the same day read again, with one offer repriced and one gone: the day is replaced, not blended
    const offers = loadGlobal('data/offers.js', 'MSF_OFFERS');
    const day = String(offers.updated).slice(0, 10);
    const archive0 = JSON.parse(fs.readFileSync(path.join(dir, 'data', 'reads.json'), 'utf8'));
    const count0 = archive0.offers.filter((x) => x.days[day] != null).length;
    const inArchive = (x) => archive0.offers.some((a) => a.title === x.name && a.days[day] === x.price);
    const money = offers.offers.filter((x) => x.currency === 'CAD' && x.price > 0 && !x.chain && inArchive(x));
    const gone = money[0], repriced = money[1];
    const again = Object.assign({}, offers, { updated: day + 'T23:00:00.000Z', offers: offers.offers.filter((x) => x !== gone).map((x) => (x === repriced ? Object.assign({}, x, { price: x.price + 10 }) : x)) });
    fs.writeFileSync(path.join(dir, 'data', 'offers.js'), 'window.MSF_OFFERS = ' + JSON.stringify(again) + ';\n');
    r = run();
    assert.equal(r.status, 0, r.stderr);
    const archive1 = JSON.parse(fs.readFileSync(path.join(dir, 'data', 'reads.json'), 'utf8'));
    assert.equal(archive1.reads[day].readAt, day + 'T23:00:00.000Z');
    const onDay = archive1.offers.filter((x) => x.days[day] != null);
    assert.equal(onDay.length, count0 - 1);                                                                          // the offer that left is gone from that day
    assert.equal(onDay.filter((x) => x.title === gone.name && x.days[day] === gone.price).length, 0);
    assert.equal(onDay.filter((x) => x.title === repriced.name && x.days[day] === repriced.price).length, 0);       // the old price of that day is gone
    assert.ok(onDay.some((x) => x.title === repriced.name && Math.abs(x.days[day] - (repriced.price + 10)) < 1e-9));
    // an archive that went missing is said out loud
    fs.unlinkSync(path.join(dir, 'data', 'reads.json'));
    r = run(['--dry-run']);
    assert.equal(r.status, 0, r.stderr);
    assert.match(r.stdout, /WARNING: data\/reads\.json is missing/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
