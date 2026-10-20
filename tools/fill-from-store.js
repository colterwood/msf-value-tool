#!/usr/bin/env node
'use strict';
/*
 * Price the items msfwar has no baseline for from the player's own store (data/offers.js) and
 * write them into data/values.js as observed.source "store". Run after a pull:
 *   node tools/fill-from-store.js                        # write gear and ISO-8 prices
 *   node tools/fill-from-store.js --dry-run              # show what would change
 *   node tools/fill-from-store.js --categories gear,iso8,orb   # other categories too
 * Only offers priced in money and without hidden contents are used. Items priced from the store
 * on an earlier run are priced again from today's offers; an item with an msfwar baseline or a
 * derivedFrom is left alone. Values typed on the Value table tab live in the browser, not in
 * this file, so the tool cannot see them: they still win on the page. See
 * engine.estimateFromStore for the method (residual price of the unpriced item, or an even
 * split between the unpriced items of one category).
 */
const fs = require('fs');
const path = require('path');
const E = require('../engine.js');

const root = path.join(__dirname, '..');
const valuesPath = path.join(root, 'data', 'values.js');
const offersPath = path.join(root, 'data', 'offers.js');
const dry = process.argv.indexOf('--dry-run') !== -1;
const catArg = process.argv.indexOf('--categories');
const categories = catArg !== -1 && process.argv[catArg + 1] ? process.argv[catArg + 1].split(',').map((c) => c.trim()).filter(Boolean) : ['gear', 'iso8'];

function loadGlobal(file, name) {
  const w = {};
  const src = fs.readFileSync(file, 'utf8');
  new Function('window', src)(w);
  return { value: w[name], src: src };
}

const values = loadGlobal(valuesPath, 'MSF_VALUE_TABLE');
const offers = loadGlobal(offersPath, 'MSF_OFFERS').value;
const table = values.value;
if (!table || !table.items) throw new Error('data/values.js did not set window.MSF_VALUE_TABLE');
if (!offers || !offers.offers) throw new Error('data/offers.js did not set window.MSF_OFFERS');

const readAt = String(offers.updated || '').slice(0, 10) || null;
const est = E.estimateFromStore(offers.offers, table, { categories: categories, refreshStore: true });
console.log('categories: ' + categories.join(', ') + '; money-priced offers only');
const keys = Object.keys(est).sort();
let changed = 0;
keys.forEach((k) => {
  const it = table.items[k];
  const e = est[k];
  if (!it || it.derivedFrom || it.excludeFromValue || it.userValue) return;
  const fromStore = it.observed && it.observed.source === 'store';
  if (it.value != null && !fromStore) return;                                              // a value from elsewhere stands
  if (it.observed && it.observed.perUsd != null && !fromStore) return;                      // msfwar has a number now
  const next = {
    perUsd: Math.floor(e.perUsd * 10000) / 10000,   // floored, so the offer it came from reads at least 1x
    observations: e.observations,
    readAt: readAt,
    source: 'store',
    method: e.method,
    note: 'priced from the player\'s own store (' + e.method + '): ' + e.offers.map((o) => o.name + ': ' + (o.method === 'shared' ? o.qty + ' of ' + o.totalQty + ' unpriced units' : o.qty) + ' for ' + (o.currency ? o.price + ' ' + o.currency : '$' + o.priceUsd.toFixed(2)) + (o.residualUsd < o.priceUsd - 0.005 ? ' (after $' + (o.priceUsd - o.residualUsd).toFixed(2) + ' of valued items)' : '')).join('; ')
  };
  const prev = it.observed && it.observed.source === 'store' ? it.observed.perUsd : null;
  console.log((prev == null ? 'new  ' : 'update') + ' ' + k.padEnd(44) + ' ' + String(next.perUsd).padStart(12) + ' per US$ (' + e.method + ', ' + e.observations + ' offer' + (e.observations === 1 ? '' : 's') + ')' + (prev != null ? ' was ' + prev : ''));
  it.observed = next;
  it.value = Math.ceil(((Number(it.per || 1) > 0 ? Number(it.per || 1) : 1) / next.perUsd) * 1e9) / 1e9;   // rounded up, same reason
  changed += 1;
});
console.log(changed + ' item' + (changed === 1 ? '' : 's') + ' priced from the store' + (dry ? ' (dry run, nothing written)' : ''));
if (!dry && changed) {
  const head = values.src.slice(0, values.src.indexOf('window.MSF_VALUE_TABLE = '));
  fs.writeFileSync(valuesPath, head + 'window.MSF_VALUE_TABLE = ' + JSON.stringify(table, null, 2) + ';\n');
  console.log('data/values.js written');
}
