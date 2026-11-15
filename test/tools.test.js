'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const P = require('../pull.js');

const root = path.join(__dirname, '..');
const fixture = path.join(__dirname, 'fixtures', 'store-state.json');
const run = (args) => spawnSync(process.execPath, [path.join(root, 'tools', 'save-store.js')].concat(args), { encoding: 'utf8' });
const loadOffers = (file) => { const w = {}; new Function('window', fs.readFileSync(file, 'utf8'))(w); return w.MSF_OFFERS; };

test('the state snippet only reads: it packs the page\'s offer data and leaves it on window as JSON', () => {
  const page = { offers: [
    { id: 'o1', name: 'Gold Pack', description: 'Lots of gold', locations: ['web_standard'], expiration: 1794000000, remainingPurchases: 2, heading: { category: 'ID_OCAT_GENERAL', filters: [] }, icon: 'x.png',
      choices: [{ id: 'c1', art: 'y.png', rewards: { allOf: [{ item: { id: 'SC', name: 'Gold', icon: 'g.png' }, quantity: '7.5M' }, { item: { id: 'SHARD_KINGO', name: 'Kingo' }, quantity: '45' }] }, webRewards: { allOf: [{ item: { id: 'BFYB-CUR', name: 'Strike Points' }, quantity: '1,000' }] }, realCost: { amount: '12.99', currency: 'CAD', display: 'CA$12.99' }, itemCost: { item: { id: 'UC', name: 'Ultra Cores' }, quantity: '100' } }] }
  ], daisychainOffers: {} };
  const clicks = [];
  const doc = { querySelector: (sel) => (sel === '#app' ? { __vue__: { $store: { state: { offers: page } } } } : sel.indexOf('player/info') !== -1 ? { textContent: '  CZARFACE   level 109 ' } : null), querySelectorAll: () => [], addEventListener: () => clicks.push('listener') };
  const win = {};
  const summary = new Function('document', 'window', 'return ' + P.stateSnippet())(doc, win);
  assert.equal(summary.offers, 1);
  assert.equal(summary.chains, 0);
  assert.equal(summary.chars, win.__msfRaw.length);
  assert.deepEqual(clicks, []);
  const raw = JSON.parse(win.__msfRaw);
  assert.equal(raw.source, 'state');
  assert.equal(raw.account, 'CZARFACE level 109');
  assert.equal(JSON.stringify(raw).indexOf('.png'), -1);          // no icons or art travel
  const data = P.normalizeExtract(raw);
  assert.equal(data.bookmarklet, P.BOOKMARKLET_VERSION);
  assert.deepEqual(data.offers[0].contents, [{ item: 'Gold', id: 'SC', qty: 7500000 }, { item: 'Kingo shards', id: 'SHARD_KINGO', qty: 45 }, { item: 'Strike Points', id: 'BFYB-CUR', qty: 1000, webBonus: true }]);
  assert.equal(data.offers[0].price, 12.99);
  assert.equal(data.offers[0].currency, 'CAD');
  assert.equal(data.offers[0].ultraCores, 100);
  // no page state: null, and nothing left behind
  const empty = {};
  assert.equal(new Function('document', 'window', 'return ' + P.stateSnippet())({ querySelector: () => null }, empty), null);
  assert.equal(empty.__msfRaw, null);
});

test('save-store writes a raw state extract or the bookmark\'s JSON, and refuses an older read', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'msfv-'));
  const out = path.join(dir, 'offers.js');
  try {
    // a raw extract is normalized on the way in
    let r = run([fixture, '--out', out]);
    assert.equal(r.status, 0, r.stderr);
    const first = loadOffers(out);
    const raw = JSON.parse(fs.readFileSync(fixture, 'utf8'));
    assert.deepEqual(first, JSON.parse(JSON.stringify(P.normalizeExtract(raw))));
    assert.ok(first.offers.length > 10);
    assert.match(fs.readFileSync(out, 'utf8'), /^\/\*[\s\S]*?\*\/\nwindow\.MSF_OFFERS = \{/);
    // the same read again changes nothing
    r = run([fixture, '--out', out]);
    assert.equal(r.status, 0);
    assert.match(r.stdout, /already holds this read/);
    // an older read is refused, softly with --if-newer, and saved with --force
    const older = path.join(dir, 'older.json');
    fs.writeFileSync(older, JSON.stringify(Object.assign({}, first, { updated: '2026-01-01T00:00:00.000Z', offers: first.offers.slice(0, 2) })));
    r = run([older, '--out', out]);
    assert.equal(r.status, 1);
    assert.match(r.stderr, /older than the one on file/);
    r = run([older, '--out', out, '--if-newer']);
    assert.equal(r.status, 0);
    assert.match(r.stdout, /kept as it is/);
    assert.equal(loadOffers(out).offers.length, first.offers.length);
    r = run([older, '--out', out, '--force']);
    assert.equal(r.status, 0);
    assert.equal(loadOffers(out).offers.length, 2);
    // things that are not a store read
    const junk = path.join(dir, 'junk.json');
    fs.writeFileSync(junk, 'just some text that was on the clipboard');
    r = run([junk, '--out', out]);
    assert.equal(r.status, 1);
    r = run([junk, '--out', out, '--if-newer']);
    assert.equal(r.status, 0);
    fs.writeFileSync(junk, JSON.stringify({ offers: [] }));
    assert.equal(run([junk, '--out', out]).status, 1);
    assert.equal(loadOffers(out).offers.length, 2);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
