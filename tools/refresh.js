#!/usr/bin/env node
'use strict';
/*
 * Rebuild the value table from this player's own store reads. Run after every read (update.cmd
 * does it): it adds data/offers.js to the archive of reads (data/reads.json), prices every item
 * from that archive in CA$ and in Ultra Cores (tools/market.js has the rules), and writes
 * data/values.js and the per-item price history (data/history.js).
 *   node tools/refresh.js                      # add data/offers.js, rebuild
 *   node tools/refresh.js --store old.js       # add another read too (offers.js or JSON shape); repeatable
 *   node tools/refresh.js --prune              # also drop rows no read has ever mentioned
 *   node tools/refresh.js --dry-run            # report, write nothing
 * Nothing leaves this machine: no network, no other source than the reads.
 * Values typed on the Value table tab live in the browser and still win on the page.
 */
const fs = require('fs');
const path = require('path');
const E = require('../engine.js');
const M = require('./market.js');

const root = path.join(__dirname, '..');
const valuesPath = path.join(root, 'data', 'values.js');
const offersPath = path.join(root, 'data', 'offers.js');
const readsPath = path.join(root, 'data', 'reads.json');
const historyPath = path.join(root, 'data', 'history.js');

const argv = process.argv.slice(2);
const flag = (name) => argv.indexOf(name) !== -1;
const all = (name) => argv.reduce((acc, a, i) => (a === name && argv[i + 1] ? acc.concat(argv[i + 1]) : acc), []);
const dry = flag('--dry-run');

const VALUES_HEADER = '/*\n' +
  ' * Value table: what each item usually costs in this player\'s own store, in CA$ and in Ultra Cores.\n' +
  ' *\n' +
  ' * Built by `node tools/refresh.js` from data/reads.json, the archive of this store\'s own reads, and\n' +
  ' * from nothing else. tools/market.js has the rules; in short, per item:\n' +
  ' *   value       CA$ that `per` units cost at the usual price (per / observed.perCash)\n' +
  ' *   coreValue   Ultra Cores that `per` units cost at the usual price (per / observed.perCore)\n' +
  ' *   observed.basis      "own": sold on its own, priced by those offers; "set": only sold together\n' +
  ' *                       with other things that have no offer of their own, the price split evenly.\n' +
  ' *                       An item that only comes beside things sold on their own has no price.\n' +
  ' *   observed.perCash    usual units per CA$; observed.perCore: usual units per Ultra Core\n' +
  ' *   observed.days       the read days the usual price comes from: the days BEFORE the read being\n' +
  ' *                       rated (meta.baseline.ratedDay) and within six months of it. The usual price\n' +
  ' *                       is the best of those days\' prices that was matched or beaten at least two\n' +
  ' *                       thirds of the time, each read counting for the days it stands for\n' +
  ' *                       (meta.baseline.weights), so a sale never sets its own yardstick\n' +
  ' *   observed.firstSeen  no earlier read carried it: priced by the rated read itself, so it rates\n' +
  ' *                       about 1x until there is a second read\n' +
  ' *   observed.byDay      its price on each read day that has one, by the same rules: { day: { per\n' +
  ' *                       (units per CA$), offer } }. observed.coreByDay is the same per Ultra Core\n' +
  ' *   observed.best       the cheapest of those days: { per, day, offer }; observed.bestCore the\n' +
  ' *                       same per Ultra Core\n' +
  ' *   observed.family     set when the price is shared with every item of a family: the stat crystals\n' +
  ' *                       of a tier cost the same whatever their class and stat\n' +
  ' * Items with excludeFromValue are event or loyalty points, never counted. `id` (and `ids`) is the\n' +
  ' * store\'s own resource id: offer lines read from the store page resolve by it. A row with\n' +
  ' * derivedFrom is priced from another by a fixed ratio (L1 to L3 training modules from L4, by XP).\n' +
  ' *\n' +
  ' * Keys: shard:<character name lower-case> (with `character`), orb:<name>, gear:<name>,\n' +
  ' * training_module:<tier>, ability_material:<tier>, iso8:<name>, points:<event>, promotion:<...>.\n' +
  ' * Edits made on the Value table tab are stored in the browser and win over this file there.\n' +
  ' */\n';
const HISTORY_HEADER = '/*\n' +
  ' * Price history, one entry per store read day, rebuilt by tools/refresh.js from data/reads.json.\n' +
  ' * Per item (`items` in CA$, `coreItems` in Ultra Cores): n offers carried it; wb/wa = best and\n' +
  ' * average units per unit of price counting the whole offer price for the item; sb/sa = the same\n' +
  ' * counting only the item\'s share of the price by value (null when the offer holds something\n' +
  ' * with no price).\n' +
  ' */\n';

function loadGlobal(file, name) {
  const w = {};
  new Function('window', fs.readFileSync(file, 'utf8'))(w);
  return w[name];
}
function loadRead(file) {
  const src = fs.readFileSync(file, 'utf8');
  if (/^\s*[{[]/.test(src)) return JSON.parse(src);
  const w = {};
  new Function('window', src)(w);
  return w.MSF_OFFERS;
}
const fmt = (n) => (n == null || !isFinite(n) ? '-' : Math.abs(n) >= 1000 ? Math.round(n).toLocaleString('en-US') : n >= 10 ? n.toFixed(1) : Number(n).toPrecision(3));

/* What a row and the meta block may carry: what this tool writes, and what the player keeps by hand. */
const ROW_FIELDS = ['name', 'category', 'per', 'value', 'coreValue', 'aliases', 'character', 'xp', 'derivedFrom', 'excludeFromValue', 'cores', 'id', 'ids', 'observed', 'note'];
const META_FIELDS = ['source', 'updated', 'currency', 'unit', 'fxToUsd', 'grades', 'gradeNote', 'xpNote', 'valueMultipliers', 'powerCore', 'shopGroups', 'coreTiers', 'baseline'];

/** Keep the table to those fields, in the store's own currency: nothing left over from an older shape of the file. */
function tidy(table) {
  Object.keys(table.items).forEach((k) => {
    const it = table.items[k];
    Object.keys(it).forEach((f) => { if (ROW_FIELDS.indexOf(f) === -1) delete it[f]; });
  });
  const m = table.meta = table.meta || {};
  Object.keys(m).forEach((f) => { if (META_FIELDS.indexOf(f) === -1) delete m[f]; });
  m.currency = m.currency && m.currency !== 'USD' ? m.currency : 'CAD';
  m.unit = m.currency;
  m.fxToUsd = {}; m.fxToUsd[m.currency] = 1;
  m.xpNote = 'Training modules carry xp (L1 50, L2 200, L3 800, L4 1600). Levels without offers of their own are priced from L4 by XP through derivedFrom.';
}

(function main() {
  const table = loadGlobal(valuesPath, 'MSF_VALUE_TABLE');
  if (!table || !table.items) throw new Error('data/values.js did not set window.MSF_VALUE_TABLE');
  tidy(table);
  if (!fs.existsSync(readsPath) && table.meta.baseline) console.log('WARNING: data/reads.json is missing, so the archive starts again from the reads given now. Earlier reads are gone unless you pass them with --store.');
  const archive = fs.existsSync(readsPath) ? JSON.parse(fs.readFileSync(readsPath, 'utf8')) : M.emptyArchive();
  archive.names = archive.names || {}; archive.reads = archive.reads || {}; archive.offers = archive.offers || [];
  const ctx = { index: E.buildIndex(table), byId: M.idIndex(table) };
  let created = 0;
  const seen = {};

  // 1. the reads
  const files = all('--store').concat(fs.existsSync(offersPath) ? [offersPath] : []);   // the read on file goes in last, so it wins its day
  if (!files.length && !archive.offers.length) throw new Error('nothing to price: data/offers.js is missing and the archive is empty');
  let fileDay = null;
  files.forEach((file) => {
    const read = loadRead(file);
    if (!read || !Array.isArray(read.offers) || !read.offers.length) { console.log('skipped ' + path.basename(file) + ': no offers in it'); return; }
    const lines = [];
    read.offers.forEach((o) => { (o.contents || []).forEach((c) => lines.push(c)); ((o.chain && o.chain.steps) || []).forEach((st) => (st.contents || []).forEach((c) => lines.push(c))); });
    lines.forEach((c) => {
      if (!c || !c.id || E.isOpaqueId(c.id)) return;
      if (c.item && !archive.names[c.id]) archive.names[c.id] = String(c.item);
      const r = M.ensureRow(table, ctx, c.id, c.item);
      if (r.created) { created += 1; console.log('new row  ' + r.key + '  (' + c.id + ')'); }
    });
    ctx.index = E.buildIndex(table);
    const se = M.storeEntries(read, table, ctx.index);
    if (!se.day) { console.log('skipped ' + path.basename(file) + ': no read date in it'); return; }
    if (file === offersPath) fileDay = se.day;
    // one read per day: a later read of the same day replaces it, except that a card read (which
    // misses whatever the cards hide) never replaces a read from the page data
    const had = archive.reads[se.day];
    if (had && had.source === 'page data' && se.meta.source === 'cards') { console.log('read ' + se.day + ' (' + path.basename(file) + ', cards): not added, the archive already holds that day from the page data'); return; }
    const again = !!had || archive.offers.some((o) => o.days[se.day] != null);
    if (again) M.removeDay(archive, se.day);
    let added = 0;
    se.offers.forEach((o) => { if (M.addToArchive(archive, o).added) added += 1; });
    Object.assign(archive.names, se.names);
    Object.keys(se.seen).forEach((k) => { seen[k] = true; });
    archive.reads[se.day] = se.meta;
    console.log('read ' + se.day + ' (' + path.basename(file) + ', ' + se.meta.source + '): ' + se.offers.length + ' money offers read completely of ' + se.meta.offers + ' (' + se.skipped + ' left out: hidden items, unreadable counts, unnamed icons or pass tiers); ' + (again ? 'that day was already in the archive and is replaced' : added + ' new to the archive'));
  });
  delete archive._sig;

  // 2. prices, in both currencies
  const lastDay = M.latestDay(archive);
  if (!lastDay) throw new Error('the archive holds no dated offer');
  if (fileDay && fileDay < lastDay) console.log('NOTE: data/offers.js holds the read of ' + fileDay + ', older than the latest read in the archive (' + lastDay + '). It is rated against the reads before it; the later reads are left out of its yardstick.');
  const p = M.prices(archive, table, { ratedDay: fileDay || lastDay });
  const report = M.applyPrices(table, p);
  const readDays = Object.keys(archive.reads).sort();
  const unplaced = Object.keys(p.cashObs.unplaced);
  console.log('rated read: ' + p.ratedDay + ' | usual prices from the reads before it, since ' + p.from + ': ' + (Object.keys(p.weights).sort().map((d) => d + ' (stands for ' + Number(p.weights[d].toFixed(1)) + ' days)').join(', ') || 'none yet'));
  console.log('priced: ' + report.own + ' sold on their own, ' + report.set + ' only sold in sets; ' + report.firstSeen + ' of them first seen in the rated read; ' + report.unpriced + ' rows without a price' + (unplaced.length ? ' | ' + unplaced.length + ' line names no row matches: ' + unplaced.slice(0, 6).join(', ') : ''));
  console.log('Ultra Core tiers (CA$ -> cores): ' + p.tiers.map((t) => t[0] + ' -> ' + t[1]).join(', '));
  report.changes.sort((a, b) => Math.abs(Math.log(b.after / b.before)) - Math.abs(Math.log(a.after / a.before)));
  if (report.changes.length) {
    console.log('usual prices that moved (units per CA$):');
    report.changes.slice(0, 15).forEach((c) => console.log('  ' + String(c.name).slice(0, 44).padEnd(44) + ' ' + fmt(c.before).padStart(12) + ' -> ' + fmt(c.after).padStart(12)));
  }

  // 3. rows nothing has ever mentioned (only with --prune)
  if (flag('--prune')) {
    const index = E.buildIndex(table), byId = M.idIndex(table);
    const keep = {};
    Object.keys(seen).forEach((s) => { const k = s.charAt(0) === '=' ? (E.resolveItem(table, index, s.slice(1)) || {}).key : byId[s]; if (k) keep[k] = true; });
    archive.offers.forEach((o) => o.lines.forEach((l) => { const s = String(l[0]); const k = s.charAt(0) === '=' ? (E.resolveItem(table, index, s.slice(1)) || {}).key : byId[s]; if (k) keep[k] = true; }));
    Object.keys(table.items).forEach((k) => { const d = table.items[k].derivedFrom; if (d && d.key) { keep[k] = true; keep[d.key] = true; } });
    ['gold', 'power_cores', 'ultra_cores', 'strike_points'].forEach((k) => { keep[k] = true; });
    let dropped = 0;
    Object.keys(table.items).forEach((k) => { const it = table.items[k]; if (keep[k] || it.value != null || (it.cores != null && it.cores !== '')) return; delete table.items[k]; dropped += 1; });
    console.log('pruned ' + dropped + ' rows no read has ever mentioned');
  }

  // 4. meta
  const now = new Date().toISOString();
  const m = table.meta;
  m.source = 'Your own store reads (' + readDays.join(', ') + '); built ' + now.slice(0, 10);
  m.updated = now.slice(0, 10);
  m.coreTiers = p.tiers;
  // months, share and weights say how the usual price was picked: the best day price matched or beaten
  // at least `share` of the time over the last `months`, each earlier read standing for `weights` days
  m.baseline = { method: 'own-history', builtAt: now, ratedDay: p.ratedDay, readDays: readDays, archivedOffers: archive.offers.length, priced: report.own + report.set, firstSeen: report.firstSeen,
    months: p.months, share: Number(p.share.toFixed(4)), from: p.from, weights: p.weights };
  m.gradeNote = 'Value per CA$ (or per Ultra Core): the offer\'s contents at their usual prices, divided by its price. Usual prices come from your own earlier store reads (see the top of data/values.js), so 1× means the offer charges what these things usually cost you, and each item\'s own figure says what the offer is worth for that item alone.';
  archive.updated = now;

  // 5. the price history, every read day on today's prices
  const days = readDays.map((day) => {
    const offers = M.dayOffers(archive, day, p.tiers);
    const info = archive.reads[day] || {};
    const cash = E.priceSnapshot({ updated: day, offers: offers }, table, { mode: 'cash', date: day });
    const cores = E.priceSnapshot({ updated: day, offers: offers }, table, { mode: 'cores', date: day });
    return { date: day, readAt: info.readAt || day, source: info.source || null, account: info.account || null, items: cash.items, coreItems: cores.items };
  });

  // 6. how the rated read looks, as a check
  if (fs.existsSync(offersPath)) {
    const read = loadRead(offersPath);
    if (read && String(read.updated).slice(0, 10) === p.ratedDay) {
      ['cash', 'cores'].forEach((mode) => {
        const ranked = E.rankOffers(read, table, null, { personalize: false, mode: mode });
        const rated = ranked.filter((r) => r.rankRatio != null);
        const g = {}; rated.forEach((r) => { g[r.grade] = (g[r.grade] || 0) + 1; });
        console.log((mode === 'cash' ? 'per CA$' : 'per Ultra Core') + ': ' + rated.length + ' of ' + ranked.length + ' offers rated, ' + ranked.filter((r) => r.complete).length + ' complete | grades ' + JSON.stringify(g) + ' | best: ' + rated.slice(0, 5).map((r) => r.name + ' ' + r.rankRatio.toFixed(2) + 'x').join('; '));
      });
    }
  }

  if (dry) { console.log('dry run: nothing written'); return; }
  const sorted = (o) => { const out = {}; Object.keys(o).sort().forEach((k) => { out[k] = o[k]; }); return out; };
  fs.writeFileSync(valuesPath, VALUES_HEADER + 'window.MSF_VALUE_TABLE = ' + JSON.stringify(table, null, 2) + ';\n');
  fs.writeFileSync(readsPath, '{\n"note": ' + JSON.stringify(archive.note || M.emptyArchive().note) + ',\n"updated": ' + JSON.stringify(archive.updated) + ',\n"reads": ' + JSON.stringify(sorted(archive.reads)) + ',\n"names": ' + JSON.stringify(sorted(archive.names)) + ',\n"offers": [\n' +
    archive.offers.map((o) => { const e = { title: o.title, cur: o.cur, lines: o.lines, days: sorted(o.days) }; if (o.cores && Object.keys(o.cores).length) e.cores = sorted(o.cores); if (o.locked && Object.keys(o.locked).length) e.locked = sorted(o.locked); return JSON.stringify(e); }).join(',\n') + '\n]\n}\n');
  fs.writeFileSync(historyPath, HISTORY_HEADER + 'window.MSF_HISTORY = ' + JSON.stringify({ days: days }) + ';\n');
  console.log('written: data/values.js (' + Object.keys(table.items).length + ' rows, ' + created + ' new), data/reads.json (' + archive.offers.length + ' offers from ' + readDays.length + ' reads), data/history.js (' + days.length + ' days)');
})();
