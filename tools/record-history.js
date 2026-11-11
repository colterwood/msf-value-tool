#!/usr/bin/env node
'use strict';
/*
 * Record today's store prices for the trend view: one line per item in data/history.js with the
 * units one US dollar buys, best and average over the offers that contain it, counting the whole
 * price (wb, wa) and the item's share of a bundle's price by value (sb, sa), plus the offer count n.
 * Run after every pull (the page does the same for pasted offers, in the browser's storage):
 *   node tools/record-history.js
 * A day already recorded is replaced.
 */
const fs = require('fs');
const path = require('path');
const E = require('../engine.js');

const root = path.join(__dirname, '..');
const valuesPath = path.join(root, 'data', 'values.js');
const offersPath = path.join(root, 'data', 'offers.js');
const historyPath = path.join(root, 'data', 'history.js');

function loadGlobal(file, name) {
  const w = {};
  if (!fs.existsSync(file)) return undefined;
  new Function('window', fs.readFileSync(file, 'utf8'))(w);
  return w[name];
}

const table = loadGlobal(valuesPath, 'MSF_VALUE_TABLE');
const offers = loadGlobal(offersPath, 'MSF_OFFERS');
const history = loadGlobal(historyPath, 'MSF_HISTORY') || { days: [] };
if (!table || !table.items) throw new Error('data/values.js did not set window.MSF_VALUE_TABLE');
if (!offers || !offers.offers) throw new Error('data/offers.js did not set window.MSF_OFFERS');

const snap = E.priceSnapshot(offers, table);
if (!snap.date) throw new Error('data/offers.js has no updated date to record under');
const merged = E.mergeHistory(history, snap);
const header = '/*\n' +
  ' * Price history for the trend view, one entry per day the store was read. For each item: n offers\n' +
  ' * contained it; wb/wa = best and average units per US$ counting the whole offer price; sb/sa =\n' +
  ' * the same counting only the item\'s share of a bundle\'s price by value (null when a bundle\n' +
  ' * holds something the table cannot value). Written by tools/record-history.js; the page merges\n' +
  ' * days it recorded itself from pasted offers.\n' +
  ' */\n';
fs.writeFileSync(historyPath, header + 'window.MSF_HISTORY = ' + JSON.stringify(merged) + ';\n');
console.log('recorded ' + snap.date + ': ' + Object.keys(snap.items).length + ' items from ' + offers.offers.length + ' offers; history now holds ' + merged.days.length + ' day' + (merged.days.length === 1 ? '' : 's'));
