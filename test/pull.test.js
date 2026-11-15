'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const P = require('../pull.js');

// A slice of what the store page gave on 18 October 2026: duplicated Buy Again cards, the pass
// card, three chain offers, the dual offer, "+N More" cards, a card with nameless icons, the
// Strike Store, and the eleven core packs.
const raw = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures', 'store-raw.json'), 'utf8'));

test('normalizeExtract turns the page extract into the offers.js shape', () => {
  const out = P.normalizeExtract(raw);
  assert.equal(out.source, 'web-store');
  assert.equal(out.updated, raw.readAt);
  assert.equal(out.account, 'CZARFACE level 105');
  assert.equal(out.priceCurrency, 'CAD');
  assert.ok(Array.isArray(out.offers) && out.offers.length > 20);
  const byName = {};
  out.offers.forEach((o) => { byName[o.name] = byName[o.name] || o; });

  // counts: x200, x4,000, x3.6M, x40K; prices: CA$ -> CAD; limits and timers
  const rush = byName['Extra Energy Rush'];
  assert.equal(rush.price, 3.99);
  assert.equal(rush.currency, 'CAD');
  assert.equal(rush.purchaseLimit, 3);
  assert.equal(rush.expires, '3d 1h');
  assert.deepEqual(rush.contents, [
    { item: 'Campaign Energy', qty: 200 },
    { item: 'Premium Orb Fragments', qty: 4000 },
    { item: 'Strike Points', qty: 300, webBonus: true }
  ]);
  const ions = byName['ISO Fest: T3 Level 1 Ions'];
  assert.equal(ions.contents.find((c) => c.item === 'T3 Level 1 Ions').qty, 3000000);
  assert.equal(ions.contents.find((c) => c.item === 'Basic T3 Iso-8 Orb Fragments').qty, 30000);
  assert.equal(ions.contents.find((c) => c.item === 'ISO Fest Milestone Points').qty, 6000000);
});

test('cards that appear in several sections are kept once with every section listed', () => {
  const out = P.normalizeExtract(raw);
  const boosts = out.offers.filter((o) => o.name === 'Golden Boost');
  assert.ok(boosts.length >= 1);
  const buyAgain = boosts.find((o) => o.sections.indexOf('Buy Again') !== -1);
  assert.ok(buyAgain, 'the Buy Again copy is merged into one entry');
  assert.ok(buyAgain.sections.length >= 2);
  // the raw extract had three Golden Boost cards with identical contents and price
  assert.equal(raw.offers.filter((o) => o.title === 'Golden Boost').length, 3);
  assert.equal(boosts.length, 1);
});

test('dual offers become one entry per option, chain offers are flagged, item costs are kept', () => {
  const out = P.normalizeExtract(raw);
  const surge = out.offers.filter((o) => o.name.indexOf('Amazing Avengers Surge') === 0);
  assert.deepEqual(surge.map((o) => o.name), ['Amazing Avengers Surge (option 1)', 'Amazing Avengers Surge (option 2)']);
  assert.equal(surge[0].price, 69.99);
  assert.equal(surge[1].price, 19.99);
  assert.equal(surge[0].contents.find((c) => c.item === 'Gold').qty, 200000000);
  const chain = out.offers.find((o) => o.name === '(1/6) Boot Sequence');
  assert.equal(chain.chain, true);
  assert.equal(chain.contents[0].item, 'Jocasta');
  const strike = out.offers.find((o) => o.name === 'Maximum Ability');
  assert.equal(strike.paidWith, 'Strike Points');
  assert.equal(strike.price, 5000);
  assert.equal(strike.currency, 'Strike Points');
  const orb = out.offers.find((o) => o.name === 'Mutant GT21 Premium Orb');
  assert.equal(orb.price, 25000);
});

test('hidden contents and nameless icons become notes rather than guesses', () => {
  const out = P.normalizeExtract(raw);
  const bundle = out.offers.find((o) => o.name === 'Ability Essentials Bundle');
  assert.match(bundle.notes, /4 more item\(s\) not shown on the card/);
  assert.ok(!bundle.contents.some((c) => /More/.test(c.item)));
  const squad = out.offers.find((o) => o.name === 'Power Up Your Squad');
  assert.equal(squad.contents.find((c) => c.item === 'Silver Surfer (Breaker)').qty, null);
  assert.match(squad.notes, /qty unreadable for Silver Surfer \(Breaker\)/);
  assert.match(squad.notes, /2 more item\(s\)/);
});

test('core packs come from their own cards and replace the stray items-wrapper entries', () => {
  const out = P.normalizeExtract(raw);
  const cores = out.offers.filter((o) => /Cores$/.test(o.name));
  assert.equal(cores.length, 11);
  const crate = out.offers.find((o) => o.name === 'Crate of Power Cores');
  assert.deepEqual(crate.contents, [{ item: 'Power Cores', qty: 4130 }, { item: 'Strike Points', qty: 5000, webBonus: true }]);
  assert.equal(crate.price, 69.99);
  assert.equal(crate.section, 'Power Cores');
  assert.ok(!out.offers.some((o) => o.name === '(untitled)'));
});

test('chain cards become one offer per step with the chain attached, counters stripped, notes kept, duplicates merged', () => {
  const card = (section, titleStep1) => ({ section, sub: '', title: titleStep1, timer: '1d', limit: '1 purchases left', flags: ['daisy-chain'], chainCurrent: 2,
    chainSteps: [
      { step: 1, title: titleStep1, price: { text: 'CA$6.99', costCurrency: 'fiat' }, items: [{ name: 'Jocasta', count: 'x45', webBonus: false }, { name: '+2 More', count: '+2More', webBonus: true }], limit: '1 purchases left' },
      { step: 2, title: '(2/6) Power Surge', price: { text: 'CA$12.99', costCurrency: 'fiat' }, items: [{ name: 'Jocasta', count: 'x80', webBonus: false }], limit: '1 purchases left' },
      { step: 3, title: '(3/6) Overdrive', price: { text: '', costCurrency: 'fiat' }, items: [{ name: 'Jocasta', count: 'x100', webBonus: false }], limit: '1 purchases left' }
    ],
    variants: [{ price: { text: 'CA$12.99', costCurrency: 'fiat' }, items: [] }] });
  const out = P.normalizeExtract({ readAt: 't', offers: [card('Buy Again', '(1/6) Boot Sequence'), card('Chain Offers', '(1/6) Boot Sequence')], cores: [] });
  assert.equal(out.offers.length, 3);                                   // the second card is the same chain: merged, not repeated
  assert.deepEqual(out.offers.map((o) => o.name), ['Boot Sequence (step 1 of 3)', 'Power Surge (step 2 of 3)', 'Overdrive (step 3 of 3)']);
  assert.deepEqual(out.offers[0].sections, ['Buy Again', 'Chain Offers']);
  assert.equal(out.offers[0].chain.name, 'Boot Sequence');
  assert.equal(out.offers[0].chain.current, 2);
  assert.equal(out.offers[0].notes, '2 more item(s) not shown on the card'); // the hidden-items note, not an 'already bought' note
  assert.equal(out.offers[0].chain.steps[0].notes, '2 more item(s) not shown on the card');
  assert.equal(out.offers[2].price, null);
  assert.equal(out.offers[2].notes, 'price unreadable');
  assert.equal(out.offers[2].chain.steps[2].notes, 'price unreadable');
  assert.equal(out.offers[1].chain.steps[1].notes, undefined);
});

test('the JSON carries the bookmarklet version the page checks on import', () => {
  const out = P.normalizeExtract({ readAt: 't', offers: [], cores: [] });
  assert.equal(typeof P.BOOKMARKLET_VERSION, 'string');
  assert.equal(out.bookmarklet, P.BOOKMARKLET_VERSION);
  assert.match(P.bookmarkletHref(), new RegExp(encodeURIComponent("bookmarklet: '" + P.BOOKMARKLET_VERSION + "'").replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});

test('bookmarkletHref is a self-contained javascript: URL built from the two functions', () => {
  const href = P.bookmarkletHref();
  assert.ok(href.startsWith('javascript:'));
  const src = decodeURIComponent(href.slice('javascript:'.length));
  assert.ok(src.indexOf('.offer-card[aria-busy="true"]') !== -1, 'renders lazy cards');
  assert.ok(src.indexOf('function normalizeExtract') !== -1, 'normalizer travels with it');
  // the only thing the bookmark ever clicks is a chain card's step number, which previews that step:
  // one click call in the whole source, on the step selector, inside the card route
  const lines = src.split(String.fromCharCode(10));
  const at = lines.map((l, i) => (l.indexOf('.click(') !== -1 ? i : -1)).filter((i) => i !== -1);
  assert.equal(at.length, 1, 'exactly one click call');
  const clicks = [lines[at[0]]];
  assert.equal(clicks[0].trim(), 'target.click();');
  assert.ok(lines[at[0] - 1].indexOf("var target = steps[i].querySelector('.step-inner')") !== -1, 'the target is a chain card step number');
  assert.ok(src.indexOf(clicks[0]) > src.indexOf('function readChains'), 'the click is in the chain reader');
  assert.ok(!/\.submit\(|dispatchEvent|\.value\s*=|fetch\(|XMLHttpRequest/.test(src.replace(/ta\.value = json/, '')), 'nothing is submitted, typed or sent');
  // it parses as JavaScript
  assert.doesNotThrow(() => new Function(src));
});

// ---------- the state route ----------
// A slice of the store page's own offer data (its Vuex state) read 14 November 2026, in the raw
// shape extractStore packs: a recommended offer bought before, the Savage Leader chain (seven
// steps, shards and red star and diamond promotions) and the Cyber Breach chain (step 1 bought,
// four left), both also repeated step by step in the offer list as the page has them, the dual
// offer, the 37-line ISO Fest trove, an unlocked offer, the pass ticket pack, the nameless Time
// Heist offer, a Strike Store item and one pack of each kind of core.
const state = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures', 'store-state.json'), 'utf8'));
const named = (out, name) => out.offers.filter((o) => o.name === name);
const one = (out, name) => { const hit = named(out, name); assert.equal(hit.length, 1, name + ' appears once'); return hit[0]; };

test('a state read gives the same top-level object as a card read, with nothing hidden', () => {
  const out = P.normalizeExtract(state);
  assert.deepEqual(Object.keys(out), ['updated', 'source', 'bookmarklet', 'account', 'priceCurrency', 'note', 'offers']);
  assert.equal(out.source, 'web-store');
  assert.equal(out.updated, state.readAt);
  assert.equal(out.account, 'CZARFACE level 109');
  assert.equal(out.priceCurrency, 'CAD');                        // the Strike Point price does not count
  assert.equal(out.bookmarklet, P.BOOKMARKLET_VERSION);
  assert.equal(P.BOOKMARKLET_VERSION, '2026-11-15');
  assert.match(out.note, /own offer data/);
  assert.doesNotMatch(out.note, /grade as incomplete/);          // the card route's warning does not apply
  assert.match(P.normalizeExtract(raw).note, /grade as incomplete/);
  assert.equal(out.offers.length, 21);                           // 9 plain offers (the dual one twice) and 11 chain steps
  assert.ok(!out.offers.some((o) => o.notes), 'no notes: nothing hidden, every count and price read');
  out.offers.forEach((o) => {
    assert.deepEqual(o.sections, o.sections.slice().sort());
    assert.ok(o.sections.indexOf(o.section) !== -1);
    o.contents.forEach((c) => {
      assert.equal(typeof c.id, 'string', o.name + ': ' + c.item + ' carries the store id');
      assert.equal(typeof c.qty, 'number');
      assert.ok(!/\u00a0/.test(c.item));
    });
  });
});

test('a state read lists every line of an offer: counts, ids, names and web bonuses', () => {
  const out = P.normalizeExtract(state);
  const trove = one(out, 'ISO Fest: T3 Level 5 Ions Trove');
  assert.equal(trove.contents.length, 37);                       // the card shows five and "+32 More"
  assert.equal(trove.price, 129.99);
  assert.equal(trove.currency, 'CAD');
  assert.equal(trove.ultraCores, 1000);                          // the Ultra Core price beside the money price is only recorded
  assert.equal(trove.paidWith, undefined);
  assert.equal(trove.purchaseLimit, 3);
  assert.equal(trove.expires, '15d 4h');
  assert.equal(trove.section, 'Offers / EVENTS');
  assert.deepEqual(trove.sections, ['Offers / EVENTS']);
  assert.match(trove.description, /^Seize the T3 Level 5 Ions/);
  assert.deepEqual(trove.contents.slice(0, 4), [
    { item: 'ISO Fest Milestone Points', id: 'EVTA_META_NOV_H', qty: 225000000 },      // '225M'
    { item: 'T3 Level 5 Ions', id: 'ISO8-TIER-2-C-CURRENCY', qty: 40000000 },          // '40M'
    { item: 'T3 Level 4 Ions', id: 'ISO8-TIER-2-B-CURRENCY', qty: 40000000 },
    { item: 'T3 Level 1 Ions', id: 'ISO8-TIER-2-A-CURRENCY', qty: 7500000 }            // '7.5M'
  ]);
  assert.equal(trove.contents.filter((c) => c.id === 'ISO8-TIER-2-A-CURRENCY' && c.qty === 7500000).length, 5);   // repeated lines stay
  // the fixture has the store's non-breaking space in "Level\u00a01"
  assert.ok(state.offers.some((o) => o.choices.some((c) => c.rewards.some((r) => r.name === 'T3 Blaster Damage Level\u00a01 Iso-8'))));
  assert.deepEqual(trove.contents.find((c) => c.id === 'ISOITEM_PURPLE_BLASTER_DAMAGE_11'), { item: 'T3 Blaster Damage Level 1 Iso-8', id: 'ISOITEM_PURPLE_BLASTER_DAMAGE_11', qty: 405 });
  // rewards first, then the web rewards and the web real-cost rewards as web bonuses
  assert.ok(!trove.contents.slice(0, 34).some((c) => c.webBonus));
  assert.deepEqual(trove.contents.slice(34), [
    { item: 'ISO Fest Milestone Points', id: 'EVTA_META_NOV_H', qty: 10000000, webBonus: true },
    { item: 'T3 Level 5 Ions', id: 'ISO8-TIER-2-C-CURRENCY', qty: 1500000, webBonus: true },   // '1.5M'
    { item: 'Strike Points', id: 'BFYB-CUR', qty: 10000, webBonus: true }                      // '10K'
  ]);
});

test('state line names: shards and promotions from the id, an id where the store gives no name', () => {
  const out = P.normalizeExtract(state);
  const first = one(out, 'Savage Leader (step 1 of 7)');
  assert.deepEqual(first.contents.slice(0, 2), [
    { item: 'Cyclops (Mighty) shards', id: 'SHARD_CYCLOPSMIGHTY', qty: 45 },
    { item: 'Cyclops (Mighty) — 4 red star promotion', id: 'RS_CYCLOPSMIGHTY_4', qty: 1 }
  ]);
  assert.equal(first.contents.length, 7);                        // the card showed three and "+4 More"
  assert.deepEqual(one(out, 'Savage Leader (step 7 of 7)').contents[0], { item: 'Cyclops (Mighty) — 1 diamond promotion', id: 'PD_CYCLOPSMIGHTY_1', qty: 1 });
  const heist = one(out, '(untitled)');                          // the Time Heist offer has no name
  assert.equal(heist.section, 'Time Heist');
  assert.equal(heist.price, 34.99);
  assert.deepEqual(heist.contents[0], { item: 'TIMEHEIST_LEVEL_45', id: 'TIMEHEIST_LEVEL_45', qty: 1 });
  assert.deepEqual(heist.contents[4], { item: 'Elite 4 Credit', id: 'ELITE_4_CUR', qty: 25000 });   // '25K'
});

test('state sections keep the names the page groups by', () => {
  const out = P.normalizeExtract(state);
  const wasp = one(out, "Catch up on Wasp (Janet)'s Milestones");
  assert.equal(wasp.section, 'Offers / RECOMMENDED');
  assert.deepEqual(wasp.sections, ['Offers / RECOMMENDED']);
  assert.equal(wasp.boughtBefore, true);   // previouslyPurchased: a fact about the offer, not the page's Buy Again section
  assert.equal(wasp.expires, '9d 4h');
  assert.equal(one(out, 'Awakened Protector of the Universe').section, 'Offers / UNLOCKED OFFERS');   // ID_OCAT_CHARACTER_UNLOCK
  assert.equal(one(out, 'Premium Plus Chapter Battle Pass Ticket Pack').section, 'battle pass and s.t.r.i.k.e pass offers');
  const cores = one(out, 'Shipment of Power Cores');
  assert.equal(cores.section, 'Power Cores');
  assert.equal(cores.price, 129.99);
  assert.equal(cores.purchaseLimit, null);
  assert.equal(cores.expires, null);
  assert.deepEqual(cores.contents, [{ item: 'Power Cores', id: 'HC', qty: 8630 }, { item: 'Strike Points', id: 'BFYB-CUR', qty: 10000, webBonus: true }]);
  const ultra = one(out, 'Crate of Ultra Cores');
  assert.equal(ultra.section, 'Ultra Cores');
  assert.deepEqual(ultra.contents[0], { item: 'Ultra Cores', id: 'UC', qty: 1000 });
  assert.ok(!('ultraCores' in ultra));                           // it has no Ultra Core price
  const counts = {};
  out.offers.forEach((o) => { counts[o.section] = (counts[o.section] || 0) + 1; });
  assert.deepEqual(counts, { 'Offers / RECOMMENDED': 1, 'Chain Offers': 11, 'dual offers': 2, 'Offers / EVENTS': 1, 'Offers / UNLOCKED OFFERS': 1,
    'battle pass and s.t.r.i.k.e pass offers': 1, 'Time Heist': 1, 'STRIKE STORE': 1, 'Power Cores': 1, 'Ultra Cores': 1 });
});

test('a state dual offer becomes one entry per option; a Strike Store item is priced in Strike Points', () => {
  const out = P.normalizeExtract(state);
  const dual = out.offers.filter((o) => o.name.indexOf('Turn Up the Power') === 0);
  assert.deepEqual(dual.map((o) => o.name), ['Turn Up the Power (option 1)', 'Turn Up the Power (option 2)']);
  assert.deepEqual(dual.map((o) => o.section), ['dual offers', 'dual offers']);
  assert.deepEqual(dual.map((o) => o.price), [6.99, 12.99]);
  assert.deepEqual(dual.map((o) => o.ultraCores), [50, 100]);
  assert.deepEqual(dual.map((o) => o.expires), ['4h 14m', '4h 14m']);
  assert.deepEqual(dual[1].contents, [
    { item: 'T4 Ability Material', id: 'ABILITY_MATERIAL_ORANGE_ABILITY_MAT', qty: 460 },
    { item: 'T4 Level 1 Ions', id: 'ISO8-TIER-3-A-CURRENCY', qty: 69300 },             // '69.3K'
    { item: 'Strike Points', id: 'BFYB-CUR', qty: 1000, webBonus: true }               // '1,000'
  ]);
  const strike = one(out, 'Maximum Ability');
  assert.equal(strike.price, 5000);                              // '5,000' Strike Points and no money price
  assert.equal(strike.currency, 'Strike Points');
  assert.equal(strike.paidWith, 'Strike Points');
  assert.equal(strike.section, 'STRIKE STORE');
  assert.deepEqual(strike.sections, ['STRIKE STORE']);
  assert.equal(strike.boughtBefore, true);
  assert.ok(!('ultraCores' in strike));
  assert.deepEqual(strike.contents, [{ item: 'T4 Ability Material', id: 'ABILITY_MATERIAL_ORANGE_ABILITY_MAT', qty: 50 }]);
});

test('state chains: one entry per step still to buy, the shape the card route emits, and no step twice', () => {
  const out = P.normalizeExtract(state);
  // the page keeps every remaining step in the offer list too: 11 of the fixture's 20 offers
  assert.equal(state.offers.filter((o) => o.chain).length, 11);
  const breach = out.offers.filter((o) => /^Cyber Breach: Cores Pack/.test(o.name));
  assert.deepEqual(breach.map((o) => o.name), ['Cyber Breach: Cores Pack (step 2 of 5)', 'Cyber Breach: Cores Pack (step 3 of 5)', 'Cyber Breach: Cores Pack (step 4 of 5)', 'Cyber Breach: Cores Pack (step 5 of 5)']);
  assert.ok(!out.offers.some((o) => /\(\d+\s*\/\s*\d+\)/.test(o.name)), 'no raw "(2/5)" step is left as an offer of its own');
  breach.forEach((o, i) => {
    assert.equal(o.section, 'Chain Offers');
    assert.deepEqual(o.sections, ['Chain Offers']);
    assert.equal(o.chain.name, 'Cyber Breach: Cores Pack');
    assert.equal(o.chain.step, i + 2);
    assert.equal(o.chain.of, 5);                                 // from the "(2/5)" counter, not the four steps left
    assert.equal(o.chain.current, 2);                            // step 1 is bought: the store no longer lists it
    assert.deepEqual(o.chain.steps.map((s) => s.step), [2, 3, 4, 5]);
    assert.deepEqual(o.chain.steps[i].contents, o.contents);
    assert.equal(o.purchaseLimit, 1);
    assert.equal(o.expires, '1d 4h');
  });
  assert.deepEqual(breach.map((o) => o.price), [12.99, 12.99, 24.99, 69.99]);
  assert.deepEqual(breach[0].chain.steps[0], { step: 2, name: 'Cyber Breach: Cores Pack', price: 12.99, currency: 'CAD', contents: [
    { item: 'Cyber Breach Milestone Points', id: 'EVTA_META_NOV_D', qty: 30000 },
    { item: 'Power Cores', id: 'HC', qty: 1000 },
    { item: 'Cyber Breach Milestone Points', id: 'EVTA_META_NOV_D', qty: 1500, webBonus: true },
    { item: 'Strike Points', id: 'BFYB-CUR', qty: 1000, webBonus: true }
  ], ultraCores: 100 });   // every step carries its Ultra Core price too
  const leader = out.offers.filter((o) => /^Savage Leader/.test(o.name));
  assert.deepEqual(leader.map((o) => o.name), [1, 2, 3, 4, 5, 6, 7].map((n) => 'Savage Leader (step ' + n + ' of 7)'));   // "(1/7) Savage Leader": counter in front
  leader.forEach((o) => { assert.equal(o.chain.current, 1); assert.equal(o.chain.of, 7); assert.equal(o.chain.steps.length, 7); });
  assert.deepEqual(leader.map((o) => o.price), [39.99, 39.99, 49.99, 69.99, 79.99, 129.99, 129.99]);

  // a chain the offer list does not repeat is still read, and so is one only the offer list has
  const onlyChains = P.normalizeExtract({ readAt: state.readAt, source: 'state', offers: [], chains: { nov26e1cyberbreach: state.chains.nov26e1cyberbreach } });
  assert.deepEqual(onlyChains.offers.map((o) => o.name), breach.map((o) => o.name));
  const onlyOffers = P.normalizeExtract({ readAt: state.readAt, source: 'state', offers: state.offers.filter((o) => o.chain && o.chain.id === 'nov26e1cyberbreach'), chains: {} });
  assert.deepEqual(onlyOffers.offers.map((o) => [o.name, o.chain.current]), breach.map((o) => [o.name, 2]));
  // a bought step the offer list still shows joins its chain behind the current step
  const bought = JSON.parse(JSON.stringify(state.chains.nov26e1cyberbreach[0]));
  bought.id = 'bought-step'; bought.name = 'Cyber Breach: Cores Pack (1/5)'; bought.chain.index = 1;
  const withBought = P.normalizeExtract({ readAt: state.readAt, source: 'state', offers: [bought], chains: { nov26e1cyberbreach: state.chains.nov26e1cyberbreach } });
  assert.deepEqual(withBought.offers.map((o) => [o.chain.step, o.chain.current]), [[1, 2], [2, 2], [3, 2], [4, 2], [5, 2]]);
});

test('state reads: counts, prices, time left and duplicates on the edges', () => {
  const offer = (over) => Object.assign({ id: 'a', name: 'Test Pack', description: null, locations: ['web_standard'], category: 'ID_OCAT_NEW_CHARACTERS', expiration: null, remainingPurchases: null, previouslyPurchased: false, choices: [] }, over);
  const choice = (over) => Object.assign({ id: 1, rewards: [], webRewards: [], webRealCostRewards: [], realCost: null, itemCost: null }, over);
  const line = (quantity, name, id) => ({ id: id === undefined ? 'X' : id, name: name === undefined ? 'Gold' : name, quantity });
  const read = (offers, readAt) => P.normalizeExtract({ readAt: readAt || '2026-11-14T12:00:00.000Z', source: 'state', offers, chains: {} }).offers;
  const cad = { amount: '9.99', currency: 'CAD' };

  const qty = read([offer({ choices: [choice({ realCost: cad, rewards: ['45', '1,000', '10K', '7.5M', '225M', '1.2B', '69.3K', 12, 'lots', null].map((q) => line(q)) })] })])[0];
  assert.deepEqual(qty.contents.map((c) => c.qty), [45, 1000, 10000, 7500000, 225000000, 1200000000, 69300, 12, null, null]);
  assert.equal(qty.notes, 'qty unreadable for Gold; qty unreadable for Gold');
  assert.equal(qty.section, 'Offers / NEW CHARACTERS');
  assert.equal(qty.purchaseLimit, null);
  assert.equal(qty.expires, null);

  // prices: money; Strike Points alone; neither; a thousands separator; Ultra Cores alone
  const free = read([offer({ choices: [choice({ rewards: [line('5')] })] })])[0];
  assert.equal(free.price, null);
  assert.equal(free.currency, null);
  assert.equal(free.notes, 'free claim');
  assert.equal(read([offer({ choices: [choice({ realCost: { amount: '1,299.99', currency: 'USD' }, rewards: [line('5')] })] })])[0].price, 1299.99);
  const cores = read([offer({ choices: [choice({ itemCost: { id: 'UC', name: 'Ultra Cores', quantity: '1,500' }, rewards: [line('5')] })] })])[0];
  assert.deepEqual([cores.price, cores.currency, cores.paidWith, cores.ultraCores], [1500, 'Ultra Cores', 'Ultra Cores', 1500]);
  assert.equal(read([offer({ choices: [choice()] })]).length, 0);       // no price and nothing in it: not an offer
  assert.equal(read([offer({ name: null, choices: [choice({ realCost: cad, rewards: [line('5')] })] })])[0].name, '(untitled)');
  assert.equal(read([offer({ category: null, choices: [choice({ realCost: cad, rewards: [line('5')] })] })])[0].section, 'Offers');

  // names: a shard line already named as shards, a line with neither name nor id
  const names = read([offer({ choices: [choice({ realCost: cad, rewards: [line('5', 'Wasp (Janet)', 'SHARD_WASPJANET'), line('5', 'Kestrel Shards', 'SHARD_KESTREL'), line('5', 'Kingo', 'PD_KINGO_3'), line('5', null, 'SHARD_NEWHERO'), line('3', null, null)] })] })])[0];
  assert.deepEqual(names.contents.map((c) => c.item), ['Wasp (Janet) shards', 'Kestrel Shards', 'Kingo — 3 diamond promotion', 'SHARD_NEWHERO']);
  assert.equal(names.notes, 'item with no name (qty 3)');

  // time left from the read to the expiry (epoch seconds), null when past or missing
  const at = Date.parse('2026-11-14T12:00:00.000Z') / 1000;
  const left = (seconds) => read([offer({ expiration: at + seconds, choices: [choice({ realCost: cad, rewards: [line('5')] })] })])[0].expires;
  assert.equal(left(15 * 86400 + 4 * 3600 + 59 * 60), '15d 4h');
  assert.equal(left(4 * 3600 + 12 * 60 + 59), '4h 12m');
  assert.equal(left(12 * 60 + 30), '12m 30s');
  assert.equal(left(0), null);
  assert.equal(left(-60), null);

  // the same offer twice is kept once with every section; a different price is another offer
  const twice = read([
    offer({ id: 'a', choices: [choice({ realCost: cad, rewards: [line('5')] })] }),
    offer({ id: 'b', category: 'ID_OCAT_FEATURED', previouslyPurchased: true, choices: [choice({ realCost: cad, rewards: [line('5')] })] }),
    offer({ id: 'c', choices: [choice({ realCost: { amount: '19.99', currency: 'CAD' }, rewards: [line('5')] })] })
  ]);
  assert.deepEqual(twice.map((o) => o.price), [9.99, 19.99]);
  assert.deepEqual(twice[0].sections, ['Offers / FEATURED', 'Offers / NEW CHARACTERS']);
  assert.equal(twice[0].boughtBefore, true);
  assert.equal(twice[0].section, 'Offers / NEW CHARACTERS');
});

// A page with only what the bookmarklet touches. Every click and scroll is counted.
function fakePage(offersState) {
  const touched = { clicks: 0, scrolls: 0, copied: [] };
  const element = (tag) => ({ tagName: String(tag).toUpperCase(), style: {}, children: [], textContent: '', value: '',
    appendChild(c) { this.children.push(c); return c; }, remove() {}, select() {},
    click() { touched.clicks += 1; }, scrollIntoView() { touched.scrolls += 1; },
    querySelector() { return null; }, querySelectorAll() { return []; } });
  const body = element('body');
  const document = {
    body,
    querySelector(sel) {
      if (sel === '#app') return offersState === undefined ? null : { __vue__: { $store: { state: { offers: offersState } } } };
      if (sel === 'a[href*="player/info"]') return { textContent: ' CZARFACE  level 109 ' };
      return null;
    },
    querySelectorAll() { return []; },
    createElement: element,
    execCommand() { return true; }
  };
  const navigator = { clipboard: { writeText(text) { touched.copied.push(text); return Promise.resolve(); } } };
  const location = { href: 'https://marvelstrikeforce.com/en/store' };
  const box = () => body.children[0];
  return { document, navigator, location, touched, line: () => box().children[0].textContent, textarea: () => box().children.find((c) => c.tagName === 'TEXTAREA'),
    says: () => box().children.filter((c) => c.tagName === 'DIV' && !c.children.length).map((c) => c.textContent),          // the panel's lines of text, in order
    button: (label) => box().children.find((c) => c.tagName === 'DIV' && c.children.length).children.find((b) => b.textContent === label) };
}
// Run the bookmarklet itself (the javascript: URL's source) in that page.
function runBookmarklet(page) {
  const src = decodeURIComponent(P.bookmarkletHref().slice('javascript:'.length));
  return new Function('location', 'document', 'navigator', 'alert', 'return ' + src)(page.location, page.document, page.navigator, (m) => { throw new Error('alert: ' + m); });
}
// The page's own shape for one offer: what the state route packs from.
const pageLine = (id, name, quantity) => ({ item: { id, name, icon: 'https://cdn.example/' + id + '.png', description: 'A long description of ' + name + '.' }, quantity });
const pageOffer = (over) => Object.assign({
  id: 'offer-1', name: 'Founding Force Pack', description: 'Recruit   the Founding Force!', icon: 'https://cdn.example/pack.png', art: { hero: 'https://cdn.example/hero.png' },
  locations: ['web_standard', 'web_special'], expiration: 4102444800, remainingPurchases: 3, previouslyPurchased: true,
  heading: { category: 'ID_OCAT_NEW_CHARACTERS', filters: ['ID_FILTER_CHARACTERS'] },
  choices: [{
    id: 1,
    rewards: { allOf: [pageLine('SHARD_WASPJANET', 'Wasp (Janet)', '45'), pageLine('RS_WASPJANET_5', 'Wasp (Janet)', '1'), pageLine('SC', 'Gold', '7.5M'), pageLine('ISOITEM_PURPLE_BLASTER_DAMAGE_11', 'T3 Blaster Damage Level\u00a01 Iso-8', '81'), pageLine('GEAR_A', 'Gear A', '10'), pageLine('GEAR_B', 'Gear B', '10'), pageLine('GEAR_C', 'Gear C', '10')] },
    webRewards: { allOf: [pageLine('EVTA_META_SEP_N', 'Founding Force Milestone Points', '10K')] },
    webRealCostRewards: { allOf: [pageLine('BFYB-CUR', 'Strike Points', '1,000')] },
    realCost: { amount: '12.99', currency: 'CAD', display: 'CA$12.99' },
    itemCost: { item: { id: 'UC', name: 'Ultra Cores', icon: 'https://cdn.example/uc.png' }, quantity: '100' },
    totalItemCost: { item: { id: 'UC', name: 'Ultra Cores' }, quantity: '100' }
  }]
}, over);
const pageStep = (n, id, amount) => pageOffer({ id, name: 'Boot Sequence (' + n + '/3)', description: undefined, previouslyPurchased: undefined, chain: { id: 'bootchain', index: n },
  choices: [{ id: 1, rewards: { allOf: [pageLine('SHARD_JOCASTA', 'Jocasta', String(40 * n))] }, realCost: { amount, currency: 'CAD', display: 'CA$' + amount }, itemCost: { item: { id: 'UC', name: 'Ultra Cores' }, quantity: '50' } }] });

test('the bookmarklet reads the page state at once: nothing scrolled or clicked, every item, steps once', async () => {
  const steps = [pageStep(2, 'step-2', '6.99'), pageStep(3, 'step-3', '12.99')];       // step 1 is bought: the page no longer holds it
  const core = { id: 'core-1', name: 'Crate of Ultra Cores', locations: ['ultra_cores'], choices: [{ id: 1, rewards: { allOf: [pageLine('UC', 'Ultra Cores', '1,000')] }, realCost: { amount: '129.99', currency: 'CAD' } }] };   // no heading, limit or expiry
  const page = fakePage({ offers: [pageOffer(), steps[0], steps[1], core], daisychainOffers: { bootchain: { offers: steps, meta: { id: 'bootchain' } } } });
  const before = Date.now();
  await runBookmarklet(page);
  assert.equal(page.touched.clicks, 0);
  assert.equal(page.touched.scrolls, 0);
  const json = page.textarea().value;
  assert.deepEqual(page.touched.copied, [json]);                 // the clipboard gets the read
  const out = JSON.parse(json);
  // the panel says in words what was read and what to do next; the JSON stays out of sight until asked for
  const items = out.offers.reduce((a, o) => a + o.contents.length, 0);
  assert.deepEqual(page.says(), [
    "MSF Store Value: your store was read. 4 offers with " + items + " items from the page's own offer data, every item included.",
    'Offers 1 \u00b7 Chain Offers 2 \u00b7 Ultra Cores 1',
    'It is instant because the store page already holds every offer as data: nothing has to scroll or load, and nothing is clicked.',
    "Copied. Next: double-click update.cmd in the tool folder, then reload the tool's page."
  ]);
  assert.match(page.textarea().style.cssText, /^display:none/);
  assert.deepEqual(['Copy', 'Show what was copied', 'Close'].map((l) => typeof page.button(l).onclick), ['function', 'function', 'function']);
  page.button('Show what was copied').onclick();
  assert.equal(page.textarea().style.display, 'block');
  assert.equal(out.source, 'web-store');
  assert.equal(out.bookmarklet, P.BOOKMARKLET_VERSION);
  assert.equal(out.account, 'CZARFACE level 109');
  assert.ok(Date.parse(out.updated) >= before);
  assert.doesNotMatch(json, /cdn\.example|A long description/);  // no icons, art or item descriptions travel
  assert.deepEqual(out.offers.map((o) => o.name), ['Founding Force Pack', 'Boot Sequence (step 2 of 3)', 'Boot Sequence (step 3 of 3)', 'Crate of Ultra Cores']);
  const pack = out.offers[0];
  assert.deepEqual(pack.contents.map((c) => [c.item, c.id, c.qty, !!c.webBonus]), [
    ['Wasp (Janet) shards', 'SHARD_WASPJANET', 45, false],
    ['Wasp (Janet) — 5 red star promotion', 'RS_WASPJANET_5', 1, false],
    ['Gold', 'SC', 7500000, false],
    ['T3 Blaster Damage Level 1 Iso-8', 'ISOITEM_PURPLE_BLASTER_DAMAGE_11', 81, false],
    ['Gear A', 'GEAR_A', 10, false], ['Gear B', 'GEAR_B', 10, false], ['Gear C', 'GEAR_C', 10, false],   // past the five a card shows
    ['Founding Force Milestone Points', 'EVTA_META_SEP_N', 10000, true],
    ['Strike Points', 'BFYB-CUR', 1000, true]
  ]);
  assert.deepEqual([pack.price, pack.currency, pack.ultraCores, pack.purchaseLimit], [12.99, 'CAD', 100, 3]);
  assert.equal(pack.description, 'Recruit the Founding Force!');
  assert.deepEqual(pack.sections, ['Offers / NEW CHARACTERS']);
  assert.equal(pack.boughtBefore, true);
  assert.match(pack.expires, /^\d+d \d+h$/);
  assert.deepEqual(out.offers.slice(1, 3).map((o) => [o.section, o.price, o.chain.step, o.chain.of, o.chain.current, o.chain.steps.length]), [['Chain Offers', 6.99, 2, 3, 2, 2], ['Chain Offers', 12.99, 3, 3, 2, 2]]);
  assert.deepEqual(out.offers[3], { name: 'Crate of Ultra Cores', price: 129.99, currency: 'CAD', purchaseLimit: null, expires: null, section: 'Ultra Cores', sections: ['Ultra Cores'], contents: [{ item: 'Ultra Cores', id: 'UC', qty: 1000 }] });
  // what it hands the normalizer is the fixture's shape
  let packed = null;
  const direct = fakePage({ offers: [pageOffer()], daisychainOffers: {} });
  new Function('location', 'document', 'navigator', 'alert', 'normalize', 'return (' + P.extractStore.toString() + ')(normalize)')(direct.location, direct.document, direct.navigator, () => {}, (r) => { packed = r; return P.normalizeExtract(r); });
  assert.deepEqual(Object.keys(packed), Object.keys(state).filter((k) => k !== 'about'));
  assert.deepEqual(Object.keys(packed.offers[0]), Object.keys(state.offers[0]));
  assert.deepEqual(Object.keys(packed.offers[0].choices[0]), Object.keys(state.offers[0].choices[0]));
  assert.deepEqual(packed.offers[0].choices[0].rewards[0], { id: 'SHARD_WASPJANET', name: 'Wasp (Janet)', quantity: '45' });
});

test('rewards the page gives any other way than "all of" are flagged, not dropped in silence', async () => {
  const pick = pageOffer({ choices: [{ id: 1, rewards: { allOf: [pageLine('SC', 'Gold', '1M')], oneOf: [pageLine('SHARD_JOCASTA', 'Jocasta', '100'), pageLine('SHARD_ULTRON', 'Ultron', '100')] }, realCost: { amount: '6.99', currency: 'CAD' } }] });
  const page = fakePage({ offers: [pick] });                     // no daisychainOffers at all
  await runBookmarklet(page);
  const out = JSON.parse(page.textarea().value);
  assert.deepEqual(out.offers[0].contents, [{ item: 'Gold', id: 'SC', qty: 1000000 }]);
  assert.equal(out.offers[0].notes, 'rewards not read: rewards.oneOf');   // any such note grades the offer as incomplete
});

test('without the page state the bookmarklet falls back to reading the cards', async () => {
  const src = decodeURIComponent(P.bookmarkletHref().slice('javascript:'.length));
  assert.doesNotThrow(() => new Function(src));                  // both routes in it, and it still parses
  ['__vue__', '$store', 'daisychainOffers', "source: 'state'", '.offer-card[aria-busy="true"]'].forEach((s) => assert.ok(src.indexOf(s) !== -1, 'the bookmarklet carries ' + s));
  for (const offersState of [undefined, null, {}, { offers: [] }, { offers: 'loading' }, { offers: [null] }, { offers: [{ id: 'x', choices: 'broken' }] }]) {
    const page = fakePage(offersState);
    await runBookmarklet(page);                                  // the fake page has no cards, so the card route reads nothing
    assert.match(page.line(), /^MSF Store Value: no offers were found on this page\. Reload the store page/);
    assert.deepEqual(page.says().slice(1), ['']);                // nothing was read: no sections, no "copied", no next step
    const out = JSON.parse(page.textarea().value);
    assert.deepEqual(out.offers, []);
    assert.match(out.note, /grade as incomplete/);
  }
});

test('when the browser refuses the automatic copy, the panel says so and its Copy button does it', async () => {
  const page = fakePage({ offers: [pageOffer()], daisychainOffers: {} });
  page.navigator.clipboard.writeText = () => Promise.reject(new Error('Document is not focused'));
  await runBookmarklet(page);
  const last = () => page.says()[page.says().length - 1];
  assert.equal(last(), "The browser did not allow the copy. Click Copy, then double-click update.cmd in the tool folder, then reload the tool's page.");
  page.button('Copy').onclick();                                 // selects the read and copies it the old way
  assert.equal(page.textarea().style.display, 'block');
  assert.equal(last(), "Copied. Next: double-click update.cmd in the tool folder, then reload the tool's page.");
  // a browser with no clipboard API at all gets the same instruction
  const bare = fakePage({ offers: [pageOffer()], daisychainOffers: {} });
  delete bare.navigator.clipboard;
  await runBookmarklet(bare);
  assert.match(bare.says()[bare.says().length - 1], /^The browser did not allow the copy\. Click Copy/);
  assert.match(bare.line(), /^MSF Store Value: your store was read\. 1 offer with \d+ items from the page's own offer data, every item included\.$/);
});
