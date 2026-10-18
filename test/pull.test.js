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

test('bookmarkletHref is a self-contained javascript: URL built from the two functions', () => {
  const href = P.bookmarkletHref();
  assert.ok(href.startsWith('javascript:'));
  const src = decodeURIComponent(href.slice('javascript:'.length));
  assert.ok(src.indexOf('.offer-card[aria-busy="true"]') !== -1, 'renders lazy cards');
  assert.ok(src.indexOf('function normalizeExtract') !== -1, 'normalizer travels with it');
  assert.ok(src.indexOf('Buy') === -1 || !/click\(\)/.test(src.split('purchase')[1] || ''), 'never clicks a purchase button');
  // it parses as JavaScript
  assert.doesNotThrow(() => new Function(src));
});
