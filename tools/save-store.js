#!/usr/bin/env node
'use strict';
/*
 * Save a store read into data/offers.js, so tools/refresh.js and the page both see it. Run
 * node tools/refresh.js afterwards: it adds the read to the archive and rebuilds the prices.
 *   node tools/save-store.js read.json        # the JSON the bookmark copied, or a raw page-state extract
 *   node tools/save-store.js --clipboard      # the same, straight from the clipboard
 *   node tools/save-store.js --clipboard --if-newer   # quietly keep the file when the clipboard holds no newer read
 * A raw extract ({ source: "state", ... }, see pull.js) is normalized first. A read older than the
 * one on file is refused unless --force is given. Nothing leaves this machine.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const P = require('../pull.js');

const argv = process.argv.slice(2);
const flag = (n) => argv.indexOf(n) !== -1;
const outAt = argv.indexOf('--out');   // another file to write instead of data/offers.js (the tests use it)
if (outAt !== -1 && (!argv[outAt + 1] || argv[outAt + 1].indexOf('--') === 0)) { console.error('--out needs a file name after it'); process.exit(1); }
const offersPath = outAt !== -1 ? path.resolve(argv[outAt + 1]) : path.join(__dirname, '..', 'data', 'offers.js');
const file = argv.filter((a, i) => a.indexOf('--') !== 0 && !(outAt !== -1 && i === outAt + 1))[0] || null;
const soft = flag('--if-newer');

const HEADER = '/*\n' +
  ' * Offers currently live in the player\'s store.\n' +
  ' *\n' +
  ' * Written by tools/save-store.js from a read of the logged-in web store: the bookmark from the\n' +
  ' * "My store" tab, or a desktop Claude session through Chrome (.claude/skills/msf-store-pull).\n' +
  ' * The page loads this file on open; the "My store" tab can also take the same JSON pasted in.\n' +
  ' * After a new read: node tools/refresh.js (update.cmd saves the read and runs it).\n' +
  ' *\n' +
  ' * Schema:\n' +
  ' *   {\n' +
  ' *     updated: "2026-11-14T16:45:48Z",  // when the store was read\n' +
  ' *     source: "web-store" | "in-game",\n' +
  ' *     bookmarklet: "2026-11-15",        // version of the reader that wrote it\n' +
  ' *     offers: [\n' +
  ' *       {\n' +
  ' *         name: "Offer title as shown",\n' +
  ' *         price: 9.99,\n' +
  ' *         currency: "CAD",              // or "Strike Points" for the Strike Store\n' +
  ' *         purchaseLimit: 1,              // null when unlimited\n' +
  ' *         expires: "15d 4h",             // time left when read; null when not shown\n' +
  ' *         section: "Offers / EVENTS",    // where the store lists it; sections: every place\n' +
  ' *         contents: [\n' +
  ' *           { item: "Gold", id: "SC", qty: 500000 },   // id: the store\'s own resource id (page-data reads)\n' +
  ' *           { item: "Iron Man shards", qty: 50 },      // a card read has names only\n' +
  ' *           { key: "orb:premium", qty: 3 }             // key targets a value-table key directly\n' +
  ' *         ],\n' +
  ' *         chain: { name, step, of, current, steps: [...] },   // on a chain step\n' +
  ' *         notes: "+3 more items not shown"                    // only when the read was incomplete\n' +
  ' *       }\n' +
  ' *     ]\n' +
  ' *   }\n' +
  ' */\n';

function clipboard() {
  const tries = process.platform === 'win32'
    ? [['powershell.exe', ['-NoProfile', '-Command', '[Console]::OutputEncoding = [Text.Encoding]::UTF8; Get-Clipboard -Raw']]]
    : process.platform === 'darwin' ? [['pbpaste', []]] : [['wl-paste', []], ['xclip', ['-selection', 'clipboard', '-o']]];
  for (let i = 0; i < tries.length; i++) {
    try { return execFileSync(tries[i][0], tries[i][1], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }); } catch (e) { /* try the next one */ }
  }
  throw new Error('could not read the clipboard on this system: save the JSON to a file and pass its path');
}
function stop(msg) {
  if (soft) { console.log(msg + ': data/offers.js kept as it is'); process.exit(0); }
  console.error(msg); process.exit(1);
}

let text;
try { text = flag('--clipboard') ? clipboard() : file ? fs.readFileSync(file, 'utf8') : null; } catch (e) { stop(e.message); }
if (text == null) { console.error('usage: node tools/save-store.js <read.json> | --clipboard [--if-newer] [--force]'); process.exit(1); }
text = String(text).replace(/^﻿/, '').trim();
let data;
// what is on a clipboard is nobody's business: say that it is not a read, never what it is
try { data = JSON.parse(text); } catch (e) { stop(flag('--clipboard') ? 'the clipboard does not hold a store read (click the bookmark on the store page first)' : file + ' is not JSON'); }
if (data && data.source === 'state') data = P.normalizeExtract(data);
if (!data || !Array.isArray(data.offers) || !data.offers.length || !data.updated) stop('no store read in that JSON (it needs "updated" and a non-empty "offers")');
if (isNaN(Date.parse(data.updated))) stop('the read has no usable date ("updated": ' + JSON.stringify(data.updated) + ')');

let current = null;
if (fs.existsSync(offersPath)) { const w = {}; try { new Function('window', fs.readFileSync(offersPath, 'utf8'))(w); current = w.MSF_OFFERS || null; } catch (e) { current = null; } }
if (current && current.updated && !flag('--force')) {
  if (String(data.updated) === String(current.updated)) { console.log('data/offers.js already holds this read (' + data.updated + ')'); process.exit(0); }
  if (Date.parse(data.updated) < Date.parse(current.updated)) stop('that read (' + data.updated + ') is older than the one on file (' + current.updated + '); pass --force to save it anyway');
}
if (data.bookmarklet && data.bookmarklet !== P.BOOKMARKLET_VERSION) console.log('note: this read came from an older copy of the bookmark (' + data.bookmarklet + '; current ' + P.BOOKMARKLET_VERSION + '): drag the link from the My store tab to the bookmarks bar again');
const hidden = data.offers.filter((o) => /not shown|\+\d+ more/i.test(String(o.notes || ''))).length;
fs.writeFileSync(offersPath, HEADER + 'window.MSF_OFFERS = ' + JSON.stringify(data, null, 2) + ';\n');
console.log(path.basename(offersPath) + ' written: ' + data.offers.length + ' offers read ' + data.updated + (data.account ? ' for ' + data.account : '') + (hidden ? ' (' + hidden + ' cards hid part of their contents: the page data was not available, so the cards were read)' : ''));
