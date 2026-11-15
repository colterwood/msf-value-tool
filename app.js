/* MSF Store Value: page logic. Talks to engine.js (window.MSFEngine) and the data/*.js files. */
(function () {
  'use strict';

  var E = window.MSFEngine;
  var LS = {
    offers: 'msfv.offers',
    overrides: 'msfv.tableOverrides',
    replacement: 'msfv.tableReplacement',
    draft: 'msfv.offerDraft',
    bucket: 'msfv.bucket',
    chain: 'msfv.chainMode',
    history: 'msfv.history',
    mode: 'msfv.mode',
    schema: 'msfv.schema',
    notice: 'msfv.notice'
  };
  var CATEGORIES = ['currency', 'shard', 'orb', 'gear', 'training', 'ability', 'iso8', 'other'];
  /** How an item's usual price was found (observed.basis in data/values.js), in words. */
  var BASIS = {
    own: 'sold on its own',
    set: 'only sold in sets, price split evenly'
  };
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var LOCALE = 'en-US';   // one number style on the whole page, whatever the browser's own
  var SYMBOLS = { CAD: 'CA$', AUD: 'A$', NZD: 'NZ$', EUR: '€', GBP: '£' };   // any other currency keeps its code in front of the amount

  // ---------- storage ----------
  function load(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  }
  function save(key, val) {
    try { if (val == null) localStorage.removeItem(key); else localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* storage unavailable */ }
  }
  // what the roster and plan views kept in the browser: this page no longer has them
  ['msfv.roster', 'msfv.plan', 'msfv.personalize', 'msfv.planOnly'].forEach(function (k) { save(k, null); });
  // What an older version of this page kept in the browser was in US$ and on another table's units.
  // Applied to today's rows it would misprice them, so it is dropped once and the page says so.
  var SCHEMA = 2;
  (function () {
    if (load(LS.schema, null) === SCHEMA) return;
    var dropped = [];
    var ov = load(LS.overrides, null);
    var fileItems = (window.MSF_VALUE_TABLE && window.MSF_VALUE_TABLE.items) || {};
    if (ov && typeof ov === 'object') {
      var keys = Object.keys(ov).filter(function (k) { return k !== '__meta' && ov[k]; });
      if (keys.length) {
        dropped.push(keys.length + ' edit' + (keys.length === 1 ? '' : 's') + ' made on the Value table tab (' +
          someText(keys.map(function (k) { return String((ov[k] && ov[k].name) || (fileItems[k] && fileItems[k].name) || k); }), 6) + ')');
      }
    }
    if (load(LS.replacement, null)) dropped.push('a value table pasted into the page');
    save(LS.overrides, null);
    save(LS.replacement, null);
    save(LS.history, null);
    save(LS.schema, SCHEMA);
    if (dropped.length) {
      save(LS.notice, 'Left over from an older version of this page and no longer used: ' + dropped.join(', and ') +
        '. That version kept values in US$ on another table\'s units, which would misprice today\'s rows.' + (ov && typeof ov === 'object' && Object.keys(ov).length ? ' Type a value again on the Value table tab if you still want it.' : ''));
    }
  })();

  // ---------- helpers ----------
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function roundTo(n, digits) {
    var f = Math.pow(10, digits);
    return Math.round(Number(n) * f) / f;
  }
  function fmtNum(n, digits) {
    if (n == null || n === '' || isNaN(n)) return '';
    return new Intl.NumberFormat(LOCALE, { maximumFractionDigits: digits == null ? 2 : digits }).format(n);
  }
  /** A number with exactly `digits` decimals: every amount and ratio on the page is rounded the same way. */
  function fmtFixed(n, digits) {
    return new Intl.NumberFormat(LOCALE, { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(roundTo(n, digits));
  }
  function fmtRatio(r) { return r == null || isNaN(r) ? '' : fmtFixed(r, 2) + '×'; }
  /** Units per unit of price: "1.2M", "160.7K", "37.42". */
  function fmtPer(n) {
    if (n == null || isNaN(n)) return '';
    if (n >= 1e6) return fmtNum(n / 1e6, 2) + 'M';
    if (n >= 1e4) return fmtNum(n / 1e3, 1) + 'K';
    if (n >= 100) return fmtNum(n, 0);
    if (n >= 1) return fmtNum(n, 2);
    return String(Number(Number(n).toPrecision(3)));
  }
  /** Money as plain text: "CA$5.61". A currency with no symbol here keeps its own name in front. Escape before it reaches innerHTML. */
  function moneyText(n, currency) {
    if (n == null || isNaN(n)) return 'unknown';
    var code = String(currency == null ? '' : currency);
    var sym = SYMBOLS[code.toUpperCase()];
    return sym ? sym + fmtFixed(n, 2) : (code ? code + ' ' : '') + fmtFixed(n, 2);
  }
  function fmtMoney(n, currency) { return esc(moneyText(n, currency)); }
  function coresText(n) { return fmtNum(n, 1) + ' Ultra Core' + (Number(n) === 1 ? '' : 's'); }
  /** "2026-11-14" (or an ISO time) as "14 Nov 2026"; anything else comes back as it is. Plain text. */
  function dayText(d, noYear) {
    var s = String(d == null ? '' : d);
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
    if (!m || !MONTHS[Number(m[2]) - 1]) return s;
    return Number(m[3]) + ' ' + MONTHS[Number(m[2]) - 1] + (noYear ? '' : ' ' + m[1]);
  }
  /** Days in words: "18 Oct, 24 Oct and 6 Nov 2026". */
  function daysText(days) {
    var list = (Array.isArray(days) ? days : []).map(String);
    if (!list.length) return '';
    var sameYear = list.every(function (d) { return d.slice(0, 4) === list[0].slice(0, 4); });
    return listText(list.map(function (d, i) { return dayText(d, sameYear && i < list.length - 1); }));
  }
  function timeText(iso) {
    var s = String(iso == null ? '' : iso);
    var m = /^\d{4}-\d{2}-\d{2}T(\d{2}:\d{2})/.exec(s);
    return dayText(s) + (m ? ', ' + m[1] + ' UTC' : '');
  }
  function listText(names) {
    return names.length < 2 ? names.join('') : names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1];
  }
  /** A list of names, each once, the first `max` of them. */
  function someText(names, max) {
    var u = names.filter(function (n, i) { return names.indexOf(n) === i; });
    return u.length > max ? u.slice(0, max).join(', ') + ' and ' + (u.length - max) + ' more' : listText(u);
  }
  function stepsText(a, b) {
    a = Number(a); b = Number(b);
    return a === b ? 'step ' + a : (b === a + 1 ? 'steps ' + a + ' and ' + b : 'steps ' + a + ' to ' + b);
  }
  function capital(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function gradeBadge(g) {
    if (!g) return '';
    var cls = /^[A-F]$/.test(g) ? 'letter-' + g : g;
    return '<span class="grade ' + esc(cls) + '">' + esc(g) + '</span>';
  }
  function gradeChart(t) {
    var grades = (Array.isArray(t.meta.grades) && t.meta.grades.length ? t.meta.grades : E.DEFAULT_GRADES).slice().sort(function (a, b) { return b.min - a.min; });
    return '<span class="chart">' + grades.map(function (g) { return gradeBadge(g.label) + ' <span class="muted">' + (g.note ? esc(g.note) : '≥ ' + esc(g.min) + '×') + '</span>'; }).join('<br>') + '</span>';
  }
  function slugKey(name, category) {
    var base = E.normalizeKey(name).replace(/\bshards?\b/g, '').trim();
    if (category === 'shard') return 'shard:' + base;
    return (category || 'other') + ':' + base.replace(/\s+/g, '_');
  }
  function download(filename, text) {
    var blob = new Blob([text], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  }
  function parseJson(text) {
    try { return { ok: true, value: JSON.parse(text) }; } catch (e) { return { ok: false, error: e.message }; }
  }

  // ---------- state ----------
  function normalizeOffers(src) {
    if (!src) return null;
    var offers = Array.isArray(src) ? src : src.offers;
    if (!Array.isArray(offers)) return null;
    var isObj = function (x) { return !!x && typeof x === 'object' && !Array.isArray(x); };
    var listOf = function (x) { return Array.isArray(x) ? x.filter(isObj) : []; };
    // whatever was pasted or kept in the browser: every offer has a list of contents, and a chain a list of steps
    offers = offers.filter(isObj).map(function (o) {
      var out = Object.assign({}, o, { contents: listOf(o.contents) });
      if (isObj(o.chain)) out.chain = Object.assign({}, o.chain, { steps: listOf(o.chain.steps).map(function (st) { return Object.assign({}, st, { contents: listOf(st.contents) }); }) });
      else delete out.chain;
      return out;
    });
    if (offers.length === 0) return null;
    return { updated: src.updated || null, source: src.source || null, bookmarklet: src.bookmarklet || null, account: src.account || null, priceCurrency: src.priceCurrency || null, offers: offers };
  }
  /**
   * What is wrong with the shape of a pasted read, in words, or null. Stray entries that are not
   * offers, steps or lines are simply left out (normalizeOffers); contents that are not a list at
   * all would be lost, so such a read is refused.
   */
  function readProblem(src) {
    var offers = src ? (Array.isArray(src) ? src : src.offers) : null;
    if (!Array.isArray(offers)) return null;   // no offers at all: said elsewhere
    var isObj = function (x) { return !!x && typeof x === 'object' && !Array.isArray(x); };
    var notList = function (x) { return x != null && !Array.isArray(x); };
    for (var i = 0; i < offers.length; i++) {
      var o = offers[i];
      if (!isObj(o)) continue;
      var what = 'offer ' + (i + 1) + (o.name ? ' (' + String(o.name).slice(0, 60) + ')' : '');
      if (notList(o.contents)) return what + ' has contents that are not a list';
      if (isObj(o.chain)) {
        if (notList(o.chain.steps)) return what + ' has chain steps that are not a list';
        if ((o.chain.steps || []).some(function (st) { return isObj(st) && notList(st.contents); })) return what + ' has a chain step whose contents are not a list';
      }
    }
    return null;
  }
  /** The read this browser kept, in the same safe shape as a fresh one. */
  function storedRead() {
    var kept = load(LS.offers, null);
    var n = normalizeOffers(kept);
    return n ? Object.assign({ origin: kept.origin === 'file' ? 'file' : 'paste' }, n) : null;
  }
  function normalizeRoster(src) {
    if (!src || typeof src !== 'object' || !src.characters || typeof src.characters !== 'object') return null;
    if (Object.keys(src.characters).length === 0) return null;
    return { updated: src.updated || null, characters: src.characters };
  }
  function pickSnapshot(fromFile, stored) {
    // The file wins unless the browser holds a read pasted after the file's, one update.cmd has not saved yet.
    if (!stored || !Array.isArray(stored.offers) || !stored.offers.length) stored = null;
    if (!fromFile) return stored;
    if (!stored || stored.origin === 'file') return Object.assign({ origin: 'file' }, fromFile);
    var f = Date.parse(fromFile.updated), s = Date.parse(stored.updated);
    if (!isNaN(f) && (isNaN(s) || f >= s)) return Object.assign({ origin: 'file' }, fromFile);
    return stored;
  }

  var state = {
    base: window.MSF_VALUE_TABLE || { meta: {}, items: {} },
    replacement: load(LS.replacement, null),
    overrides: load(LS.overrides, {}) || {},
    offers: pickSnapshot(normalizeOffers(window.MSF_OFFERS), storedRead()),
    roster: normalizeRoster(window.MSF_ROSTER),   // only so that an old card read's bare character name is read as shards
    bucket: load(LS.bucket, 'all'),
    chainMode: load(LS.chain, 'step') === 'path' ? 'path' : 'step',
    mode: load(LS.mode, 'cash') === 'cores' ? 'cores' : 'cash',   // what every offer is rated against: its money price or its Ultra Core price
    // days this browser recorded from pasted offers; a day recorded before the page kept Ultra Core prices was in another currency
    historyLocal: E.mergeHistory({ days: ((load(LS.history, null) || {}).days || []).filter(function (d) { return d && d.coreItems; }) }, null),
    historyKey: null,
    draft: null,
    filter: '',
    expanded: {}
  };
  save(LS.offers, state.offers);
  save(LS.history, state.historyLocal.days.length ? state.historyLocal : null);

  function table() {
    var src = state.replacement || state.base || { meta: {}, items: {} };
    var out = { meta: Object.assign({}, src.meta || {}), items: {} };
    Object.keys(src.items || {}).forEach(function (k) { out.items[k] = Object.assign({}, src.items[k]); });
    Object.keys(state.overrides).forEach(function (k) {
      var o = state.overrides[k];
      if (!o) return;
      if (k === '__meta') { if (o.powerCore) out.meta.powerCore = o.powerCore; return; }   // the one table setting this page edits
      if (o._deleted) { delete out.items[k]; return; }
      var file = out.items[k] || null;
      var row = Object.assign({}, file || {}, o);
      if (o.value != null && o.value !== '' && !isNaN(Number(o.value))) {
        // typed on the Value table tab: used in place of the rebuilt CA$ value. The Ultra Core price stays the rebuilt one.
        var per = Number(row.per) > 0 ? Number(row.per) : 1;
        var filePer = file && Number(file.per) > 0 ? Number(file.per) : 1;
        row.userValue = true;
        if (file && file.coreValue != null && per !== filePer) row.coreValue = Number(file.coreValue) * per / filePer;
        if (file && file.derivedFrom && file.coreValue == null) {
          // a level priced from another row keeps the Ultra Core price it gets from that row
          var dv = E.deriveItem(src, k);
          var dper = dv && Number(dv.per) > 0 ? Number(dv.per) : 1;
          if (dv && dv.coreValue != null) row.coreValue = Number(dv.coreValue) * per / dper;
        }
        row.observed = Object.assign({}, row.observed || {}, { perCash: Number(o.value) > 0 ? per / Number(o.value) : null });
      } else if (file) {
        // nothing typed (the "add" button stores value: null, per: 1): the file's price stands, on the file's own scale
        row.value = file.value;
        row.per = file.per;
        row.coreValue = file.coreValue;
        row.observed = file.observed;
      }
      // an in-game Power Core price was typed for the count its row showed then: bring it to the row's scale
      if (o.cores != null && o.cores !== '' && Number(o.coresPer) > 0) row.cores = Number(o.cores) * (Number(row.per) > 0 ? Number(row.per) : 1) / Number(o.coresPer);
      delete row.coresPer;
      out.items[k] = row;
    });
    return out;
  }
  function fileRow(k) {
    var src = state.replacement || state.base || {};
    return (src.items && src.items[k]) || null;
  }
  /** The money every value of the table is in: meta.currency (meta.unit in tables from older versions). */
  function currencyOf(t) { return String((t.meta && (t.meta.currency || t.meta.unit)) || 'CAD').toUpperCase(); }
  /** The words and the precision of a pricing mode: money with cents, or Ultra Cores with one decimal. */
  function unitOf(mode, t) {
    var cur = currencyOf(t);
    var sym = SYMBOLS[cur] || cur;
    return mode === 'cores'
      ? { mode: 'cores', digits: 1, label: 'Ultra Cores', per: 'per Ultra Core', currency: cur, money: sym }
      : { mode: 'cash', digits: 2, label: sym, per: 'per ' + sym, currency: cur, money: sym };
  }
  /** A value in the mode's currency: "CA$5.61" or "44.9 Ultra Cores". Plain text. */
  function valText(n, u) { return u.mode === 'cores' ? fmtFixed(n, 1) + ' Ultra Cores' : moneyText(n, u.currency); }
  /** A price in the mode's currency. Plain text. */
  function priceText(n, u) { return u.mode === 'cores' ? coresText(n) : moneyText(n, u.currency); }
  function valueOpts() { return { personalize: false, mode: state.mode, chainMode: state.chainMode }; }
  function blankDraft() { return { name: '', price: '', currency: currencyOf(table()), ultraCores: '', rows: [{ item: '', qty: '' }] }; }
  state.draft = (function () {
    var d = load(LS.draft, null);
    var used = d && Array.isArray(d.rows) && ((d.price != null && d.price !== '') || d.rows.some(function (r) { return r && String(r.item || '').trim() !== ''; }));
    if (!used) return blankDraft();   // nothing typed yet: a new draft, in the table's currency
    d.rows = d.rows.filter(function (r) { return r && typeof r === 'object'; });
    if (!d.rows.length) d.rows.push({ item: '', qty: '' });
    if (d.ultraCores == null) d.ultraCores = '';
    return d;
  })();
  function tableStats(t) {
    var items = E.itemsOf(t);   // a level priced from another row counts as priced
    var keys = Object.keys(items);
    var counted = keys.filter(function (k) { return !items[k].excludeFromValue; });
    return { total: counted.length, priced: counted.filter(function (k) { return E.unitValue(items[k]) != null; }).length, points: keys.length - counted.length };
  }
  function setOverride(key, patch) {
    var cur = state.overrides[key] || {};
    state.overrides[key] = Object.assign({}, cur, patch);
    save(LS.overrides, state.overrides);
  }

  // ---------- header / shared ----------
  function daysSince(when) {
    var ms = Date.parse(when);
    return isNaN(ms) ? null : Math.floor((Date.now() - ms) / 86400000);
  }
  function ownBaseline(t) {
    var b = t && t.meta && t.meta.baseline;
    return b && b.method === 'own-history' ? b : null;
  }
  /** How a usual price is picked, in words, from what tools/refresh.js recorded in meta.baseline. */
  function usualRule(t) {
    var b = ownBaseline(t);
    if (!b || !(Number(b.share) > 0)) return 'the middle of its prices on your earlier reads';   // a table built before the rule changed
    var share = Math.abs(Number(b.share) - 2 / 3) < 0.001 ? 'two thirds' : Math.round(Number(b.share) * 100) + '%';
    var months = Number(b.months) > 0 ? Number(b.months) : 6;
    return 'the best price it could be had for at least ' + share + ' of the time over the last ' + (months === 6 ? 'six' : fmtNum(months, 0)) + ' months';
  }
  /** What on the page does not belong together or is older than it should be, one sentence each. Nothing here refreshes itself. */
  function freshness(t) {
    var out = [];
    var notice = load(LS.notice, null);
    if (notice) out.push(esc(notice) + ' <button type="button" class="ghost small" id="notice-ok">OK</button>');
    var b = ownBaseline(t);
    var fileBuilt = String((ownBaseline(window.MSF_VALUE_TABLE) || {}).builtAt || '');
    var usedBuilt = state.replacement ? String((ownBaseline(state.replacement) || {}).builtAt || '') : fileBuilt;
    if (state.replacement && fileBuilt && fileBuilt > usedBuilt) out.push('The page is using a value table pasted into it earlier, older than data/values.js: "Reset my edits" on the Value table tab switches to the rebuilt one.');
    else if (!b) out.push('This value table is from an older version of the tool: run <code>node tools/refresh.js</code> in the tool folder to rebuild it from your own store reads.');
    var read = state.offers && state.offers.updated ? String(state.offers.updated) : null;
    if (b && state.offers) {
      var saved = window.MSF_OFFERS && window.MSF_OFFERS.updated ? String(window.MSF_OFFERS.updated) : null;   // the read data/offers.js holds
      var pasted = state.offers.origin !== 'file' && !(saved && read && saved === read);   // the very read the file holds is no other read
      if (pasted) {
        // A read pasted into the page lives in this browser only. Say which read the files hold, what
        // that means for the figures shown, and how to save the pasted one.
        var shown = 'This page shows a read you pasted in' + (read ? ', taken ' + esc(timeText(read)) : '') + '. It is not saved: the tool\'s files hold the read of ' +
          esc(saved ? timeText(saved) : dayText(b.ratedDay)) + ', and the values were built for that one. ';
        var older = !!read && !!saved && Date.parse(read) < Date.parse(saved);
        if (older) {
          out.push(shown + 'The pasted read is the older of the two, so these values were built for a later read than it. Reload the page to go back to the saved read.');
        } else {
          var unknown = [];
          E.rankOffers(state.offers.offers, t, state.roster || null, { personalize: false, mode: 'cash', chainMode: 'step' }).forEach(function (r) { (r.unknown || []).forEach(function (n) { if (unknown.indexOf(n) === -1) unknown.push(n); }); });
          var sameDay = !!read && read.slice(0, 10) === String(b.ratedDay);
          var effect = unknown.length
            ? unknown.length + ' item' + (unknown.length === 1 ? '' : 's') + ' in it ' + (unknown.length === 1 ? 'is' : 'are') + ' not in the value table yet and count' + (unknown.length === 1 ? 's' : '') + ' as nothing (' + esc(someText(unknown, 4)) + ')'
            : 'Everything in it is in the value table';
          effect += sameDay ? (unknown.length ? '; the usual prices are the same for both reads' : ' and the usual prices are the same for both reads, so the figures here are right')
            : '. The values were built before it, so the read of ' + esc(dayText(b.ratedDay)) + ' does not count as an earlier day yet';
          out.push(shown + effect + '. To save it, it has to be on the clipboard when <code>update.cmd</code> runs: <button type="button" class="ghost small" id="copy-read">Copy this read</button> ' +
            '(or click the bookmark on the store page again), double-click <code>update.cmd</code> in the tool folder, then reload this page.');
        }
      } else if (!read || read.slice(0, 10) !== String(b.ratedDay)) {
        out.push('data/offers.js holds the store read of ' + (read ? esc(dayText(read)) : 'an unknown day') + ', but the values were built for the read of ' + esc(dayText(b.ratedDay)) +
          ', so items new to the store have no price yet: double-click <code>update.cmd</code> in the tool folder, or run <code>node tools/refresh.js</code> there, and reload this page.');
      }
    }
    var readAge = read ? daysSince(read) : null;
    if (readAge != null && readAge > 2) out.push('The store was read ' + readAge + ' days ago and offers change daily: read it again with the bookmark.');
    var ov = state.overrides, rowsOf = (state.replacement || state.base || {}).items || {};
    var label = function (k) { return String((ov[k] && ov[k].name) || (rowsOf[k] && rowsOf[k].name) || k); };
    var edited = Object.keys(ov).filter(function (k) { return k !== '__meta' && ov[k]; });
    var typed = edited.filter(function (k) { var o = ov[k]; return !o._deleted && o.value != null && o.value !== '' && !isNaN(Number(o.value)); });
    var removed = edited.filter(function (k) { return ov[k]._deleted && rowsOf[k]; });
    var said = [];
    if (typed.length) said.push(typed.length + ' value' + (typed.length === 1 ? '' : 's') + ' typed on the Value table tab override' + (typed.length === 1 ? 's' : '') + ' the rebuilt one' + (typed.length === 1 ? '' : 's') + ' (' + esc(someText(typed.map(label), 4)) + ')');
    if (removed.length) said.push(removed.length + ' row' + (removed.length === 1 ? '' : 's') + ' removed on that tab ' + (removed.length === 1 ? 'is' : 'are') + ' missing from every offer (' + esc(someText(removed.map(label), 4)) + ')');
    if (said.length) out.push(said.join(', and ') + ': "Reset my edits" on the Value table tab undoes ' + (typed.length + removed.length === 1 ? 'it' : 'them') + '.');
    return out;
  }
  function renderStatus() {
    var t = table();
    var s = tableStats(t);
    var b = ownBaseline(t);
    var bits = [];
    if (b) {
      var earlier = (Array.isArray(b.readDays) ? b.readDays : []).filter(function (d) { return String(d) < String(b.ratedDay); });
      bits.push('Values built ' + esc(dayText(b.builtAt)) + ' for the store read of ' + esc(dayText(b.ratedDay)) +
        (earlier.length ? ', with usual prices from your earlier read' + (earlier.length === 1 ? '' : 's') + ' of ' + esc(daysText(earlier)) : ', your first read, so nothing has an earlier price yet'));
    } else bits.push('Value table from an older version of the tool');
    bits.push(s.priced === 0 ? '<span class="warn">no item has a price yet</span>' : s.priced + ' of ' + s.total + ' items have prices');
    bits.push(state.offers ? state.offers.offers.length + ' offer' + (state.offers.offers.length === 1 ? '' : 's') + ' loaded' + (state.offers.updated ? ', store read ' + esc(timeText(state.offers.updated)) : '') : 'no store offers loaded');
    $('status').innerHTML = bits.join(' · ') + freshness(t).map(function (w) { return '<br><span class="warn">' + w + '</span>'; }).join('');
    if ($('store-chain')) $('store-chain').value = state.chainMode;
  }
  function modeSwitch(t) {
    return '<button type="button" class="chip" data-mode="cash" aria-pressed="' + (state.mode !== 'cores') + '">' + esc(unitOf('cash', t).label) + '</button>' +
      '<button type="button" class="chip" data-mode="cores" aria-pressed="' + (state.mode === 'cores') + '">Ultra Cores</button>';
  }
  function renderModeSwitch() {
    var html = modeSwitch(table());
    document.querySelectorAll('.mode-switch').forEach(function (el) { el.innerHTML = html; });
  }
  document.addEventListener('click', function (e) {
    if (!e.target.closest('#notice-ok')) return;
    save(LS.notice, null);
    renderStatus();
  });
  // Put the read the page is showing back on the clipboard, as the bookmark left it, for update.cmd to save.
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('#copy-read');
    if (!btn || !state.offers) return;
    var read = {};
    Object.keys(state.offers).forEach(function (k) { if (k !== 'origin') read[k] = state.offers[k]; });
    var json = JSON.stringify(read, null, 1);
    var done = function (ok) { btn.textContent = ok ? 'Copied: now double-click update.cmd' : 'Could not copy: click the bookmark on the store page again'; };
    var byHand = function () {
      var ta = document.createElement('textarea');
      ta.value = json;
      ta.style.cssText = 'position:fixed;left:-9999px;top:0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = !!document.execCommand('copy'); } catch (err) { ok = false; }
      ta.remove();
      done(ok);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(json).then(function () { done(true); }, byHand);
    else byHand();
  });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.mode-switch button[data-mode]');
    if (!b) return;
    state.mode = b.dataset.mode === 'cores' ? 'cores' : 'cash';
    save(LS.mode, state.mode);
    renderModeSwitch();
    renderOfferResult();
    renderStore();
    renderHistory();
  });
  function renderDatalist() {
    var t = table();
    var names = Object.keys(t.items).map(function (k) { return t.items[k].name || k; }).sort();
    $('item-list').innerHTML = names.map(function (n) { return '<option value="' + esc(n) + '">'; }).join('');
  }
  function renderAll() {
    renderStatus();
    renderModeSwitch();
    renderDatalist();
    renderOfferRows();
    renderOfferResult();
    renderStore();
    renderTable();
    renderHistory();
  }

  // ---------- tabs ----------
  document.querySelectorAll('nav button').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('nav button').forEach(function (x) { x.classList.toggle('active', x === b); });
      ['offer', 'store', 'table'].forEach(function (t) { $('tab-' + t).hidden = t !== b.dataset.tab; });
    });
  });

  // ---------- what an offer is worth, item by item ----------
  /**
   * Round a list so that the rounded parts add up to `total` as it is shown: the items of an offer
   * must add up to the full offer on screen, to the last cent. Each part is rounded down and the
   * units still missing go to the largest remainders, with two cares for what the eye checks.
   * Parts that read as equal (the same figure in `ties`, or else the same value) take a unit
   * together or not at all, and a larger part never ends up below a smaller one. Where the units
   * cannot be shared out like that (four equal parts and one unit), equal parts are told apart.
   */
  function roundParts(values, digits, total, ties) {
    var f = Math.pow(10, digits);
    var parts = values.map(function (v, i) {
      var x = v * f, units = Math.floor(x + 1e-9);
      return { i: i, v: v, tie: ties ? ties[i] : Number(Number(v).toPrecision(12)), units: units, rem: x - units };
    });
    var left = Math.round(total * f) - parts.reduce(function (a, p) { return a + p.units; }, 0);
    var step = left < 0 ? -1 : 1;   // units are taken back only when the total was itself put together from rounded figures
    var inOrder = function (a, b) { return step * (b.tie - a.tie) || step * (b.v - a.v) || (a.i - b.i); };
    var byHead = function (a, b) { return step * (b[0][0].rem - a[0][0].rem) || (a[0][0].i - b[0][0].i); };
    for (var round = 0, before = null; left !== 0 && left !== before && round < 100; round++) {
      before = left;
      // parts on the same rounded-down figure form a class: within it the units go to the larger parts first, group by group
      var classes = {};
      parts.forEach(function (p) { if (step > 0 || p.units > 0) (classes[p.units] = classes[p.units] || []).push(p); });
      var open = Object.keys(classes).map(function (k) {
        var groups = [];
        classes[k].sort(inOrder).forEach(function (p) { var g = groups[groups.length - 1]; if (g && g[0].tie === p.tie) g.push(p); else groups.push([p]); });
        return groups;
      });
      var stuck = null;
      while (left !== 0 && open.length) {
        open.sort(byHead);   // the class whose next group has the largest remainder
        var group = open[0][0];
        if (group.length <= Math.abs(left)) {
          group.forEach(function (p) { p.units += step; });
          left -= step * group.length;
          open[0].shift();
          if (!open[0].length) open.shift();
        } else {
          if (!stuck) stuck = group;   // too large for what is left; the rest of its class waits too, so that no smaller part passes it
          open.shift();
        }
      }
      // no whole group could take the last units: these equal parts are told apart
      for (var n = 0; stuck && left !== 0 && n < stuck.length; n++) { stuck[n].units += step; left -= step; }
    }
    return parts.map(function (p) { return p.units / f; });
  }
  /** The stat crystals of a tier share one price whatever their class and stat (observed.family in data/values.js). */
  function familyLabel(fam) { return E.familyLabel(fam); }
  /** A line's name. A pass tier, level or unlock comes with the store's own id only: say what it is. */
  function lineName(l) {
    var s = String(l.item == null ? '' : l.item);
    if (!l.opaque || /\s/.test(s)) return s;   // the store's ids have no spaces
    if (/^BPE?TIER/.test(s)) return 'Pass tier';
    if (/^BPE?PASS/.test(s)) return 'Pass upgrade';
    if (/^TIMEHEIST_LEVEL/.test(s)) return 'Time Heist level';
    if (/^UT_/.test(s)) return 'Trial unlock';
    return 'Pass tier, level or unlock';
  }
  /** Why a line has no value here, in a few words. */
  function blankWhy(l, u) {
    if (l.opaque) return 'not itemized by the store';
    if (l.promotion) return 'a promotion the card does not name';
    if (!l.key) return 'not in the value table';
    if (l.qty == null) return 'count unreadable';
    if (l.thin) return 'seen too rarely to price';
    if (u.mode === 'cores') return l.key === 'ultra_cores' ? 'not sold for Ultra Cores' : 'no Ultra Core price yet';
    return 'no price yet';
  }
  function nothingPriced(u) { return u.mode === 'cores' ? 'nothing with an Ultra Core price' : 'nothing with a price'; }
  function qtyText(q) { return q == null ? '' : ' ×' + fmtNum(q, 3); }
  /** A chain step together with the steps that must be bought before it: price, value and ratio as the page shows them. */
  function pathFigures(r, u) {
    var c = r.chain;
    var total = roundTo(r.totalUsd, u.digits);
    c.requires.forEach(function (p) { total += roundTo(p.totalUsd, u.digits); });   // the steps' own figures add up to the path's
    return {
      first: c.requires[0].step, last: c.step,
      price: c.priceUnknown ? null : c.cumulativePriceUsd,
      total: roundTo(total, u.digits),
      ratio: c.cumulativePerDollar == null ? null : roundTo(c.cumulativePerDollar, 2)
    };
  }
  /**
   * What the page shows for one valued offer: the price it is rated on (its own, or the whole path
   * of a chain step when the list ranks by path), its valued lines merged into items (the same
   * item listed twice; the stat crystals of a tier) and rounded so that the items add up to the
   * full offer exactly as shown. Lines without a value and lines that are never counted are kept apart.
   */
  function offerView(r, t) {
    if (r._view) return r._view;
    var u = unitOf(r.mode, t);
    var scale = Number(t.meta.unitPerUsd) > 0 ? Number(t.meta.unitPerUsd) : 1;   // only tables from older versions carry one
    var path = E.pathLines(r);   // null when there is no price to rate on, or the step is already bought
    var onPath = !!(path && path.steps);
    var lines = path ? path.lines : r.lines;
    var price = path ? path.priceUsd : null;
    var ratio = price > 0 && r.rankRatio != null && !isNaN(r.rankRatio) ? roundTo(r.rankRatio, 2) : null;
    var total = onPath ? pathFigures(r, u).total : roundTo(r.totalUsd, u.digits);
    var entries = [], byGroup = {}, byKey = {}, blanks = [], uncounted = [];
    lines.forEach(function (l) {
      if (l.excluded) { uncounted.push(l); return; }
      if (l.value == null) { blanks.push(l); return; }
      var row = t.items[l.key];
      var family = row && row.observed && row.observed.family ? String(row.observed.family) : null;
      var g = family || 'key:' + l.key;
      var e = byGroup[g];
      if (!e) {
        e = byGroup[g] = { family: family, label: l.item, qty: 0, value: 0, keys: [], lines: [], usualPer: l.usualPer, basis: l.basis || null, firstSeen: false, notes: [], order: entries.length };
        entries.push(e);
      }
      e.qty += l.qty;
      e.value += l.value / scale;
      e.lines.push(l);
      if (e.keys.indexOf(l.key) === -1) e.keys.push(l.key);
      if (l.usualPer !== e.usualPer) e.usualPer = null;   // a family whose rows no longer share one price
      if (l.firstSeen) e.firstSeen = true;
      if (l.note && e.notes.indexOf(l.note) === -1) e.notes.push(l.note);
      byKey[l.key] = e;
    });
    entries.forEach(function (e) { if (e.family && e.keys.length > 1) e.label = familyLabel(e.family); });
    entries.sort(function (a, b) { return (b.value - a.value) || (a.order - b.order); });
    var shown = roundParts(entries.map(function (e) { return e.value; }), u.digits, total);
    var ratios = ratio == null ? null : roundParts(entries.map(function (e) { return e.value / price; }), 2, ratio, shown);   // items that show the same value show the same ratio
    entries.forEach(function (e, i) { e.shown = shown[i]; e.ratio = ratios ? ratios[i] : null; });
    r._view = { u: u, onPath: onPath, steps: onPath ? [path.steps[0], path.steps[path.steps.length - 1]] : null, price: price, total: total, ratio: ratio, entries: entries, byKey: byKey, blanks: blanks, uncounted: uncounted };
    return r._view;
  }
  /**
   * The price as the store states it: money, or an in-game currency such as Strike Points.
   * via is the engine's word: 'fx' money, 'assumed' a currency the table has no rate for (taken as
   * its own), 'item' an in-game currency the table has a price for, 'unpriced' one it has none for.
   */
  function ownPrice(off, t, index) {
    var p = off && off.price != null && off.price !== '' ? Number(off.price) : NaN;
    if (!(p > 0)) return { amount: null, currency: null, via: null, money: null };
    var cur = String(off.currency || t.meta.currency || 'USD');
    var d = E.priceToUsdDetail(p, cur, t, index);
    return { amount: p, currency: cur, via: d.via, money: d.usd };
  }
  /** How an Ultra Core price the read did not state was found (the engine's coresVia). */
  function coresHow(r) { return r.coresVia === 'bonus' ? 'from its Strike Points bonus' : 'by price tier'; }
  /** The time an offer had left when the store was read ("15d 4h"), counted down to now. */
  function leftText(expires, readAt) {
    var text = String(expires), ms = 0, any = false;
    text.replace(/(\d+)\s*([dhms])/gi, function (all, n, unit) { any = true; ms += Number(n) * { d: 86400000, h: 3600000, m: 60000, s: 1000 }[unit.toLowerCase()]; return all; });
    var read = Date.parse(readAt);
    if (!any || isNaN(read)) return text + ' left when read';
    var rem = read + ms - Date.now();
    if (rem <= 0) return 'ended since the read';
    var d = Math.floor(rem / 86400000), h = Math.floor(rem % 86400000 / 3600000), m = Math.floor(rem % 3600000 / 60000);
    return (d ? d + 'd ' + h + 'h' : (h ? h + 'h ' + m + 'm' : Math.max(m, 1) + 'm')) + ' left';
  }
  /** The price cell of an offer: the price in the mode's currency, and under it the other currency's price. Plain text. */
  function priceLines(r, own, u) {
    var inGame = own.via === 'item' || own.via === 'unpriced';
    var ultra = /^ultra cores?$/i.test(String(own.currency || ''));   // sold for Ultra Cores only
    var ownText = own.amount == null ? null : (ultra ? coresText(own.amount) : inGame ? fmtNum(own.amount, 2) + ' ' + own.currency : moneyText(own.amount, own.currency));
    var free = /(^|;\s*)free claim/i.test(String(r.notes || ''));
    var main, sub = [];
    if (u.mode === 'cores') {
      if (r.price != null) {
        main = coresText(r.price);
        if (r.coresInferred) sub.push(coresHow(r));
        if (ownText && !ultra) sub.push('or ' + ownText);
      } else if (inGame && !ultra) { main = ownText; sub.push('no Ultra Core price'); }
      else {
        main = free ? 'free' : 'no Ultra Core price';
        if (ownText && !ultra) sub.push(ownText);
      }
    } else {
      main = ownText || (free ? 'free' : (r.priceUnreadable ? 'price unreadable' : 'no price'));
      if (own.via === 'fx' && String(own.currency).toUpperCase() !== u.currency) sub.push(moneyText(own.money, u.currency) + ' at the table\'s rate');
      if (own.via === 'item') sub.push(moneyText(own.money, u.currency) + ' at your usual price for ' + own.currency);
      if (own.via === 'assumed') sub.push('taken as ' + u.label + ': the table has no rate for ' + own.currency);
      if (r.ultraCores != null && !ultra) sub.push('or ' + coresText(r.ultraCores) + (r.coresInferred ? ' (' + coresHow(r) + ')' : ''));
    }
    return { main: main, sub: sub };
  }
  /** For a price the table cannot turn into money (Strike Points): the value one unit of that price buys. */
  function perPriceUnit(r, v, own) {
    if (r.perPriceUnit != null) return r.perPriceUnit;
    return r.mode === 'cores' && own.via === 'unpriced' && own.amount > 0 && v.entries.length ? r.totalUsd / own.amount : null;
  }
  function gridRow(cls, name, value, ratio, grade) {
    return '<div class="' + cls + '"><span class="vn">' + name + '</span><span class="vv">' + value + '</span><span class="vr">' + ratio + '</span><span class="vg">' + grade + '</span></div>';
  }
  /**
   * The items of an offer and the full offer, one line each: name and count, value at the usual
   * price, and what the offer is worth for that item alone. With `limit`, the smallest items
   * beyond it are added up into one "+N more" line.
   */
  function valuesGrid(r, t, limit) {
    var v = offerView(r, t), u = v.u;
    var list = v.entries, rest = [];
    if (limit && list.length > limit + 1) { rest = list.slice(limit); list = list.slice(0, limit); }
    var html = list.map(function (e) { return gridRow('it', esc(e.label) + qtyText(e.qty), esc(valText(e.shown, u)), fmtRatio(e.ratio), ''); }).join('');
    if (rest.length) {
      var sum = 0, rsum = 0;
      rest.forEach(function (e) { sum += e.shown; rsum += e.ratio || 0; });
      html += gridRow('more', '+' + rest.length + ' more', esc(valText(sum, u)), v.ratio == null ? '' : fmtRatio(rsum), '');
    }
    var blanks = v.blanks, hidden = 0;
    if (limit && blanks.length > 3) { hidden = blanks.length - 2; blanks = blanks.slice(0, 2); }
    html += blanks.map(function (l) { return '<div class="blank"><span class="vn">' + esc(lineName(l)) + qtyText(l.qty) + '</span><span class="vx">' + esc(blankWhy(l, u)) + '</span></div>'; }).join('');
    if (hidden) html += '<div class="blank"><span class="vn">+' + hidden + ' more</span><span class="vx">not valued</span></div>';
    html += gridRow('full', v.onPath ? esc(capital(stepsText(v.steps[0], v.steps[1]))) + ' together' : 'Full offer',
      v.entries.length ? esc(valText(v.total, u)) : '<span class="muted">' + nothingPriced(u) + '</span>', fmtRatio(v.ratio), v.ratio == null ? '' : gradeBadge(r.grade));
    return '<div class="vals">' + html + '</div>';
  }
  /** What stands under the items of an offer: the value per unit of a price that is not money, and for a chain step the other way to count it. Plain text. */
  function offerNotes(r, t, own) {
    var v = offerView(r, t), u = v.u, c = r.chain;
    var out = [];
    var per = perPriceUnit(r, v, own);
    if (per != null) out.push(valText(per * 1000, u) + ' of value per 1,000 ' + own.currency);
    else if (u.mode === 'cores' && r.price == null && v.entries.length) out.push('No Ultra Core price, so no ratio');
    if (c && c.requires.length && !c.bought) {
      var pf = pathFigures(r, u);
      var range = capital(stepsText(pf.first, pf.last));
      if (v.onPath) out.push('This step alone: ' + valText(r.totalUsd, u) + (r.priceUsd > 0 ? ' for ' + priceText(r.priceUsd, u) : '') + (r.perDollar != null ? ', ' + fmtRatio(r.perDollar) : ''));
      else out.push(pf.price == null ? range + ' together: an earlier step has no ' + (u.mode === 'cores' ? 'Ultra Core price' : 'readable price') : range + ' together: ' + valText(pf.total, u) + ' for ' + priceText(pf.price, u) + (pf.ratio != null ? ', ' + fmtRatio(pf.ratio) : ''));
    }
    return out;
  }
  function flagsOf(r) {
    var flags = [];
    var n = function (list) { return list && list.length ? list.length : 0; };
    if (n(r.unknown)) flags.push(n(r.unknown) + ' not in the value table');
    if (n(r.opaque)) flags.push(n(r.opaque) + ' not itemized by the store');
    if (n(r.promotions)) flags.push(n(r.promotions) + ' unnamed promotion' + (n(r.promotions) === 1 ? '' : 's'));
    if (n(r.thin)) flags.push(n(r.thin) + ' seen too rarely to price');
    if (n(r.unpriced)) flags.push(n(r.unpriced) + (r.mode === 'cores' ? ' without an Ultra Core price' : ' without a price'));
    if (n(r.unreadable)) flags.push(n(r.unreadable) + ' count' + (n(r.unreadable) === 1 ? '' : 's') + ' unreadable');
    if (r.hidden) flags.push('hidden items');
    if (r.priceUnreadable) flags.push('price unreadable');
    if (r.complete && !r.valuedLines && n(r.excluded)) flags.push('points only, not counted');
    if (r.chain && r.chain.bought) flags.push('already bought');
    if (r.freshShare > 0.5) flags.push('new: no earlier price');
    return flags;
  }

  // ---------- the breakdown of one offer ----------
  function chainLabel(r) {
    var c = r.chain;
    if (!c) return '';
    var t = 'step ' + c.step + ' of ' + c.of + (c.name ? ' of ' + c.name : '');
    if (c.bought) return t + ', already bought';
    if (c.requires.length) return t + ', needs ' + stepsText(c.requires[0].step, c.requires[c.requires.length - 1].step) + ' first';
    return t + ', buyable now';
  }
  function chainBlock(r, t) {
    var c = r.chain;
    if (!c) return '';
    var u = unitOf(r.mode, t);
    var html = '<p class="muted">' + esc(capital(chainLabel(r))) + '.';
    if (c.bought) html += ' Not rated: this step is behind you.';
    if (c.requires.length && !c.bought) {
      var pf = pathFigures(r, u);
      var range = stepsText(pf.first, pf.last);
      if (pf.price == null) html += ' You cannot buy this step alone, and an earlier step has no ' + (u.mode === 'cores' ? 'Ultra Core price' : 'readable price') + ', so the whole path cannot be rated.';
      else if (c.mode === 'path') {
        html += ' You cannot buy this step alone, so the figures here cover ' + range + ' together. This step on its own is worth ' + esc(valText(r.totalUsd, u)) +
          (r.priceUsd > 0 ? ' for ' + esc(priceText(r.priceUsd, u)) : '') + (r.perDollar != null ? ' (' + fmtRatio(r.perDollar) + ')' : '') + '.';
      } else {
        html += ' The figures here rate this step on its own, but you cannot buy it alone: ' + range + ' together cost ' + esc(priceText(pf.price, u)) + ' and are worth ' + esc(valText(pf.total, u)) +
          (pf.ratio != null ? ' (' + fmtRatio(pf.ratio) + ')' : '') + '. The "Chain steps" choice on the My store tab can rank by the whole path instead.';
      }
      if (c.assumedCurrency) html += ' A step is priced in a currency the table has no rate for, taken as ' + esc(u.money) + '.';
      html += '<br>' + c.requires.map(function (p) {
        return 'Step ' + esc(p.step) + ', ' + esc(p.name) + ': ' + (p.priceUsd > 0 ? esc(priceText(p.priceUsd, u)) : (u.mode === 'cores' ? 'no Ultra Core price' : 'no readable price')) +
          (p.perDollar != null ? ', ' + fmtRatio(p.perDollar) : '') + (p.complete ? '' : ' (incomplete' + (p.notes ? ': ' + esc(p.notes) : '') + ')');
      }).join('<br>');
    }
    return html + '</p>';
  }
  /**
   * The in-game route: what the same contents cost in Power Cores at the prices typed in the
   * "Power Cores in game" column of the Value table tab. Only said for an offer that holds such
   * an item (Power Cores inside an offer cost themselves, which compares nothing), and never
   * when offers are rated against Ultra Cores.
   */
  function coreLine(r, t) {
    if (r.mode === 'cores' || r.coreCost == null) return '';
    var typed = function (l) { var it = l.key ? t.items[l.key] : null; return !!it && it.cores != null && it.cores !== ''; };
    var c = r.chain;
    var onPath = !!(c && c.mode === 'path' && c.requires.length && !c.bought);
    var lines = r.lines;
    if (onPath) c.requires.forEach(function (p) { lines = lines.concat(p.lines || []); });
    if (!lines.some(typed)) return '';
    var cost = onPath ? c.cumulativeCoreCost : r.coreCost;
    if (cost == null) return '';
    var complete = onPath ? c.cumulativeCoreComplete : r.coreComplete;
    var missing = (onPath ? c.cumulativeCoreMissing : r.coreMissing) || [];
    var unreadable = (onPath ? c.cumulativeCoreUnreadable : r.coreUnreadable) || [];
    var hidden = !!r.hidden || (onPath && c.requires.some(function (p) { return !!p.hidden; }));
    var price = onPath ? c.cumulativePriceUsd : r.priceUsd;
    var why = [];
    if (missing.length) why.push('no in-game price typed yet for ' + esc(someText(missing, 6)));
    if (unreadable.length) why.push('the card shows no count for ' + esc(someText(unreadable, 6)));
    if (hidden) why.push('part of the contents is hidden');
    var pc = Object.assign({}, E.DEFAULT_POWER_CORE, t.meta.powerCore || {});
    var worth = r.coreRateUsd ? cost * r.coreRateUsd : null;
    var vs = worth != null && price > 0 ? worth / price : null;
    var html = '<p class="muted">Bought in the in-game store instead' + (onPath ? ', the whole path' : '') + ': ' + fmtNum(cost, 0) + ' Power Cores' +
      (complete ? '' : ' for the items with an in-game price and a count (' + why.join('; ') + ')');
    if (worth != null) {
      html += ', worth ' + fmtMoney(worth, currencyOf(t)) + ' at ' + fmtMoney(Number(pc.price), pc.currency) + ' per Power Core';
      if (vs != null) html += ', ' + (complete ? '' : 'at least ') + fmtRatio(vs) + ' what this offer costs' + (vs > 1 ? ': the offer is the cheaper way' : (complete ? ': the in-game store is cheaper' : ''));
    }
    return html + '.</p>';
  }
  function freshLine(v) {
    var names = [];
    v.entries.forEach(function (e) { e.lines.forEach(function (l) { if (l.firstSeen) names.push(l.item); }); });
    if (!names.length) return '';
    var one = names.filter(function (n, i) { return names.indexOf(n) === i; }).length === 1;
    return '<p class="muted">Priced by this read itself, because no earlier read carried ' + (one ? 'it' : 'them') + ': today\'s price is the only yardstick, so the rating says little until there is a second read: ' + esc(someText(names, 8)) + '.</p>';
  }
  function warnings(r) {
    var out = [];
    var once = function (list) { return list.filter(function (n, i) { return list.indexOf(n) === i; }); };
    var addable = function (u) { return esc(u) + ' <button class="ghost small" data-addunknown="' + esc(u) + '">add</button>'; };
    if (r.unknown.length) out.push('<p class="warn">Not in the value table: ' + once(r.unknown).map(addable).join(', ') + '</p>');
    // shards read from a character icon with no row in the table can be added like unknown items; rows wait for a price
    var generic = r.lines.filter(function (l) { return l.generic && l.key && !l.excluded && l.qty != null && l.value == null && !l.thin; }).map(function (l) { return l.item; });
    var inTable = r.unpriced.filter(function (n) { return generic.indexOf(n) === -1; });
    if (inTable.length) {
      // Ultra Cores themselves are never sold for Ultra Cores: that is not a price still to come
      var selfCores = r.mode === 'cores' ? r.lines.filter(function (l) { return l.key === 'ultra_cores'; }).map(function (l) { return l.item; }) : [];
      var waiting = once(inTable).filter(function (n) { return selfCores.indexOf(n) === -1; });
      var single = waiting.length === 1;
      if (waiting.length) {
        out.push('<p class="warn">' + (r.mode === 'cores' ? 'No Ultra Core price yet: ' : 'No price yet: ') + waiting.map(esc).join(', ') +
          '. Your reads have not shown ' + (single ? 'it' : 'them') + ' sold on ' + (single ? 'its' : 'their') + ' own' + (r.mode === 'cores' ? ' for Ultra Cores' : '') +
          ', or in a set of things never sold on their own, so ' + (single ? 'it counts' : 'they count') + ' as nothing here' + (r.mode === 'cores' ? '.' : '; a value typed on the Value table tab would count.') + '</p>');
      }
      if (selfCores.length) out.push('<p class="muted">Ultra Cores are not sold for Ultra Cores, so they have no Ultra Core price.</p>');
    }
    if (generic.length) out.push('<p class="warn">Read as shards from the character icon, no row in the table yet: ' + once(generic).map(addable).join(', ') + '</p>');
    if (r.promotions && r.promotions.length) out.push('<p class="warn">A character icon without a shard count, a diamond or red star promotion the card does not name: ' + r.promotions.map(esc).join(', ') + ' (not priced).</p>');
    if (r.unreadable && r.unreadable.length) out.push('<p class="warn">The card shows no count for: ' + r.unreadable.map(esc).join(', ') + ' (counted as nothing).</p>');
    if (r.priceUnreadable) out.push('<p class="warn">The price could not be read from the card.</p>');
    if (r.notes) out.push('<p class="' + (r.hidden ? 'warn' : 'muted') + '">' + esc(r.notes) + '.</p>');
    if (r.opaque && r.opaque.length) out.push('<p class="warn">The store does not say what a pass tier, level or unlock holds, so ' + (r.opaque.length === 1 ? 'it is' : 'they are') + ' not priced.</p>');
    if (r.thin && r.thin.length) out.push('<p class="muted">Shown but not counted, seen in too few offers to price: ' + once(r.thin).map(esc).join(', ') + '.</p>');
    if (!r.complete && r.valuedLines) out.push('<p class="muted">The figures count only the items with a price, so the offer is worth more than shown.</p>');
    return out.join('');
  }
  /** Every line of an offer: the valued items with the figures the list shows, the lines merged into each, then the lines without a value and the ones never counted. */
  function breakdownTable(r, t) {
    var v = offerView(r, t), u = v.u;
    var rows = v.entries.map(function (e) {
      var notes = [];
      if (e.basis && BASIS[e.basis]) notes.push(BASIS[e.basis]);
      if (e.firstSeen) notes.push('first seen in this read');
      notes = notes.concat(e.notes);
      var merged = e.lines.length > 1;
      return '<tr class="entry' + (merged ? '' : ' line') + '"><td>' + esc(e.label) + (notes.length ? '<br><span class="muted">' + esc(notes.join(' · ')) + '</span>' : '') + '</td>' +
        '<td class="num">' + fmtNum(e.qty, 3) + '</td>' +
        '<td class="num">' + (e.usualPer ? fmtPer(e.usualPer) + ' ' + esc(u.per) : '') + '</td>' +
        '<td class="num">' + esc(valText(e.shown, u)) + '</td>' +
        '<td class="num">' + fmtRatio(e.ratio) + '</td></tr>' +
        (merged ? e.lines.map(function (l) { return '<tr class="line sub muted"><td>' + esc(l.item) + '</td><td class="num">' + fmtNum(l.qty, 3) + '</td><td colspan="3"></td></tr>'; }).join('') : '');
    }).join('');
    rows += v.blanks.map(function (l) {
      var name = lineName(l);
      return '<tr class="line warn"><td>' + esc(name) + (name !== String(l.item) ? '<br><span class="muted">the store names it ' + esc(l.item) + '</span>' : '') + '</td>' +
        '<td class="num">' + fmtNum(l.qty, 3) + '</td><td colspan="3">' + esc(blankWhy(l, u)) + '</td></tr>';
    }).join('');
    rows += '<tr class="full"><td>' + (v.onPath ? esc(capital(stepsText(v.steps[0], v.steps[1]))) + ' together' : 'Full offer') + '</td><td></td><td></td>' +
      '<td class="num">' + (v.entries.length ? esc(valText(v.total, u)) : '') + '</td><td class="num">' + fmtRatio(v.ratio) + (v.ratio == null ? '' : ' ' + gradeBadge(r.grade)) + '</td></tr>';
    rows += v.uncounted.map(function (l) {
      return '<tr class="line muted"><td>' + esc(l.item) + '</td><td class="num">' + fmtNum(l.qty, 3) + '</td><td colspan="3">' + esc(l.note || 'not counted') + '</td></tr>';
    }).join('');
    return '<table class="breakdown"><thead><tr><th>Item</th><th class="num">Quantity</th><th class="num">Usual price</th><th class="num">Value at the usual price</th>' +
      '<th class="num" title="The item\'s value divided by the offer\'s price">Worth for this item alone</th></tr></thead><tbody>' + rows + '</tbody></table>' +
      '<p class="muted" style="margin-top:8px">Each item\'s × is what the offer is worth for that item alone: its value at your usual price, divided by the offer\'s price. The items add up to the full offer, and 1× means the offer charges what its contents usually cost you. The figures are rounded so that they add up exactly, which can make two equal items differ in the last digit.</p>';
  }
  function detailBlock(r, t) {
    return chainBlock(r, t) + coreLine(r, t) + freshLine(offerView(r, t)) + warnings(r) + breakdownTable(r, t);
  }

  // ---------- Value an offer ----------
  function saveDraft() { save(LS.draft, state.draft); }
  function renderOfferRows() {
    $('offer-name').value = state.draft.name || '';
    $('offer-price').value = state.draft.price == null ? '' : state.draft.price;
    $('offer-currency').value = state.draft.currency || currencyOf(table());
    $('offer-cores').value = state.draft.ultraCores == null ? '' : state.draft.ultraCores;
    var html = state.draft.rows.map(function (r, i) {
      return '<div class="row">' +
        '<input list="item-list" data-i="' + i + '" data-f="item" placeholder="Item as shown in the store" value="' + esc(r.item) + '">' +
        '<input type="number" min="0" step="any" data-i="' + i + '" data-f="qty" placeholder="Qty" value="' + esc(r.qty) + '">' +
        '<button class="ghost small" data-del="' + i + '" title="Remove">✕</button>' +
        '</div>';
    }).join('');
    $('offer-rows').innerHTML = html;
  }
  $('offer-rows').addEventListener('input', function (e) {
    var t = e.target;
    if (t.dataset.i == null) return;
    state.draft.rows[Number(t.dataset.i)][t.dataset.f] = t.value;
    saveDraft();
    renderOfferResult();
  });
  $('offer-rows').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-del]');
    if (!b) return;
    state.draft.rows.splice(Number(b.dataset.del), 1);
    if (state.draft.rows.length === 0) state.draft.rows.push({ item: '', qty: '' });
    saveDraft();
    renderOfferRows();
    renderOfferResult();
  });
  ['offer-name', 'offer-price', 'offer-currency', 'offer-cores'].forEach(function (id) {
    $(id).addEventListener('input', function () {
      state.draft.name = $('offer-name').value;
      state.draft.price = $('offer-price').value;
      state.draft.currency = $('offer-currency').value || currencyOf(table());
      state.draft.ultraCores = $('offer-cores').value;
      saveDraft();
      renderOfferResult();
    });
  });
  $('add-row').addEventListener('click', function () {
    state.draft.rows.push({ item: '', qty: '' });
    saveDraft();
    renderOfferRows();
    var inputs = $('offer-rows').querySelectorAll('input[data-f="item"]');
    inputs[inputs.length - 1].focus();
  });
  $('offer-clear').addEventListener('click', function () {
    state.draft = blankDraft();
    saveDraft();
    renderOfferRows();
    renderOfferResult();
  });
  $('paste-toggle').addEventListener('click', function () { $('paste-box').hidden = !$('paste-box').hidden; });
  $('paste-apply').addEventListener('click', function () {
    var rows = E.parseContentsText($('paste-text').value);
    if (rows.length === 0) return;
    state.draft.rows = rows.map(function (r) { return { item: r.item, qty: r.qty }; });
    saveDraft();
    $('paste-box').hidden = true;
    renderOfferRows();
    renderOfferResult();
  });
  if ($('store-chain')) $('store-chain').addEventListener('change', function () {
    state.chainMode = $('store-chain').value === 'path' ? 'path' : 'step';
    save(LS.chain, state.chainMode);
    renderStore();
  });

  function draftOffer() {
    var d = state.draft;
    var offer = {
      name: d.name,
      price: d.price === '' || d.price == null ? null : Number(d.price),
      currency: d.currency || currencyOf(table()),
      contents: d.rows
        .filter(function (r) { return String(r.item == null ? '' : r.item).trim() !== ''; })
        .map(function (r) { return { item: String(r.item).trim(), qty: r.qty === '' || r.qty == null ? 1 : Number(r.qty) }; })
    };
    if (Number(d.ultraCores) > 0) offer.ultraCores = Number(d.ultraCores);
    else if (/^ultra cores?$/i.test(String(offer.currency).trim()) && offer.price > 0) offer.ultraCores = offer.price;   // priced in Ultra Cores: that is its Ultra Core price
    return offer;
  }
  /** The headline of one offer: its price both ways, the full offer's value and what it is worth per unit of price. */
  function summaryBlock(r, t) {
    var v = offerView(r, t), u = v.u;
    var own = ownPrice(r.offer, t);
    var p = priceLines(r, own, u);
    var range = v.onPath ? ' for ' + stepsText(v.steps[0], v.steps[1]) : '';
    var notes = offerNotes(r, t, own);
    return '<div class="summary">' +
      '<div><div class="label">Price</div><div class="big">' + esc(p.main) + '</div>' + (p.sub.length ? '<div class="muted">' + esc(p.sub.join(' · ')) + '</div>' : '') + '</div>' +
      '<div><div class="label">Full offer' + esc(range) + '</div><div class="big">' + (v.entries.length ? esc(valText(v.total, u)) : '<span class="muted">' + nothingPriced(u) + '</span>') + '</div></div>' +
      (v.ratio != null ? '<div><div class="label">Value ' + esc(u.per) + ' spent' + esc(range) + '</div><div class="big">' + fmtRatio(v.ratio) + ' ' + gradeBadge(r.grade) + '</div></div>' : '') +
      '</div>' + notes.map(function (n) { return '<p class="muted">' + esc(n) + '.</p>'; }).join('');
  }
  function renderOfferResult() {
    var offer = draftOffer();
    var box = $('offer-result');
    if (offer.contents.length === 0) {
      box.innerHTML = '<p class="muted">Add the offer\'s contents above, with its price, to see what each item and the full offer are worth.</p>';
      return;
    }
    var t = table();
    var u = unitOf(state.mode, t);
    var r = E.valueOffer(offer, t, state.roster || null, valueOpts());
    r.offer = offer;
    var html = summaryBlock(r, t);
    if (r.price == null && ownPrice(offer, t).via !== 'unpriced') {
      html += '<p class="muted">' + (u.mode === 'cores'
        ? 'Enter the Ultra Core price to see what the offer is worth per Ultra Core. Without one, a Strike Points line gives it (the store pays 10 Strike Points per Ultra Core of the price), or else a price in ' + esc(u.money) + ' that sits on one of the store\'s price tiers.'
        : 'Enter the price to see what the offer is worth per ' + esc(u.money) + '.') + '</p>';
    }
    box.innerHTML = html + detailBlock(r, t);
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-addunknown]');
    if (!b) return;
    addUnknownItem(b.dataset.addunknown);
  });
  function addUnknownItem(name) {
    var isShard = /\bshards?\b/i.test(name);
    var category = isShard ? 'shard' : 'other';
    var key = slugKey(name, category);
    var item = { name: name, category: category, per: 1, value: null, aliases: [] };
    if (isShard) item.character = name.replace(/\b(character\s+)?shards?\b/i, '').trim();
    setOverride(key, item);
    renderAll();
  }

  // ---------- My store ----------
  function renderStore() {
    var meta = $('store-meta');
    var list = $('store-list');
    var t = table();
    var u = unitOf(state.mode, t);
    $('store-chart').innerHTML = gradeChart(t);
    if (!state.offers) {
      meta.textContent = 'No offers loaded.';
      list.innerHTML = '<p class="muted">Nothing to rank yet.</p>';
      renderBestBuys(null, t);
      renderShop(null, t);
      return;
    }
    var o = state.offers;
    meta.textContent = o.offers.length + ' offer' + (o.offers.length === 1 ? '' : 's') + (o.source ? ' from ' + o.source : '') + (o.account ? ' for ' + o.account : '') + (o.updated ? ', read ' + timeText(o.updated) : '') + (o.origin === 'file' ? ' (data/offers.js)' : ' (pasted)');
    var ranked = E.rankOffers(o.offers, t, state.roster || null, valueOpts());   // sorted by the chain-aware ratio, complete offers first
    var index = E.buildIndex(t);
    var rows = ranked.map(function (r, at) {
      var off = r.offer;
      var c = r.chain;
      var own = ownPrice(off, t, index);
      // the list runs in three stretches: rated on everything in them, rated on only part, not rated
      var prev = at > 0 ? ranked[at - 1] : null;
      var divider = '';
      if (prev && r.rankRatio == null && prev.rankRatio != null) divider = 'The offers below cannot be rated: there is no price to rate them against, or nothing in them has a price.';
      else if (prev && r.rankRatio != null && !r.complete && prev.complete) divider = 'The offers below hold something without a price, so what is shown is the least they are worth.';
      var p = priceLines(r, own, u);
      var sub = [];
      if (c) sub.push(chainLabel(r));
      if (off.section) sub.push(off.section);
      if (off.purchaseLimit != null) sub.push('limit ' + off.purchaseLimit);
      if (off.expires) sub.push(leftText(off.expires, o.updated));
      if (off.boughtBefore === true) sub.push('bought before');
      if (c && c.mode === 'path' && c.requires.length && !c.bought) {
        var pf = pathFigures(r, u);
        p.sub.push(pf.price == null ? 'path price unknown' : priceText(pf.price, u) + ' for ' + stepsText(pf.first, pf.last) + ' together');
      }
      var idx = o.offers.indexOf(off);
      var html = (divider ? '<tr class="divider"><td colspan="4" class="muted">' + esc(divider) + '</td></tr>' : '') +
        '<tr class="clickable" data-idx="' + idx + '"><td>' + esc(off.name || '(unnamed)') +
        (sub.length ? '<br><span class="muted">' + esc(sub.join(' · ')) + '</span>' : '') + '</td>' +
        '<td class="num">' + esc(p.main) + p.sub.map(function (s) { return '<br><span class="muted">' + esc(s) + '</span>'; }).join('') + '</td>' +
        '<td>' + valuesGrid(r, t, 6) + offerNotes(r, t, own).map(function (n) { return '<div class="muted vnote">' + esc(n) + '</div>'; }).join('') + '</td>' +
        '<td class="warn">' + esc(flagsOf(r).join(', ')) + '</td></tr>';
      if (state.expanded[idx]) html += '<tr class="detail"><td colspan="4">' + detailBlock(r, t) + '</td></tr>';
      return html;
    }).join('');
    renderShop(ranked, t);
    // a way to buy a resource is an offer that can be bought on its own: not a chain step that needs earlier steps first
    renderBestBuys(ranked.filter(function (r) { return !(r.chain && r.chain.requires.length && !r.chain.bought); }), t);
    list.innerHTML = '<div class="modebar"><h3>Your offers, best first</h3><span class="muted">rated against the price in</span><span class="mode-switch">' + modeSwitch(t) + '</span>' +
      '<span class="muted">Click an offer to see every line of it.</span></div>' +
      '<table class="store"><thead><tr><th>Offer</th><th class="num">Price</th>' +
      '<th title="Each item at your usual price, and that value divided by the offer\'s price: what the offer is worth for that item alone. The items add up to the full offer.">Each item and the full offer: value in ' + esc(u.label) + ', and value over price</th>' +
      '<th>Flags</th></tr></thead><tbody>' + rows + '</tbody></table>';
  }
  function renderShop(ranked, t) {
    var bar = $('shop-buckets');
    var box = $('shop-list');
    if (!bar || !box) return;
    var u = unitOf(state.mode, t);
    var mainKey = String(state.bucket || 'all').split('/')[0];
    var groupKey = String(state.bucket || '').split('/')[1] || null;
    var mainDef = E.SHOP_BUCKETS.find(function (b) { return b.key === mainKey; }) || E.SHOP_BUCKETS[0];
    var groups = E.bucketGroups(mainDef.key, t);
    var group = groupKey ? groups.find(function (g) { return g.key === groupKey; }) || null : null;
    bar.innerHTML = E.SHOP_BUCKETS.map(function (b) { return '<button type="button" class="chip" data-bucket="' + esc(b.key) + '" aria-pressed="' + (mainDef.key === b.key) + '">' + esc(b.label) + '</button>'; }).join('') +
      (groups.length ? '<div style="flex-basis:100%;display:flex;flex-wrap:wrap;gap:6px;margin-top:2px">' +
        '<button type="button" class="chip" data-bucket="' + esc(mainDef.key) + '" aria-pressed="' + (!group) + '">All ' + esc(mainDef.label.toLowerCase()) + '</button>' +
        groups.filter(function (g) { return !g.empty || (group && group.key === g.key); }).map(function (g) { return '<button type="button" class="chip" data-bucket="' + esc(mainDef.key + '/' + g.key) + '" aria-pressed="' + !!(group && group.key === g.key) + '"' + (g.empty ? ' title="no value-table item maps to this group yet: add keys under meta.shopGroups in data/values.js"' : ' title="' + esc(g.count) + ' item' + (g.count === 1 ? '' : 's') + '"') + (g.empty ? ' style="opacity:.55"' : '') + '>' + esc(g.label) + '</button>'; }).join('') + '</div>' : '');
    if (!ranked || !ranked.length) { box.innerHTML = '<p class="muted">Load your store first.</p>'; return; }
    var bucket = mainDef;
    var label = String(group ? group.label : bucket.label);
    var rows = E.shopBy(ranked, t, group ? bucket.key + '/' + group.key : bucket.key);
    var all = bucket.key === 'all';
    if (!rows.length) { box.innerHTML = '<p class="muted">' + (all ? 'No offer in your store can be rated ' + (u.mode === 'cores' ? 'against an Ultra Core price' : 'against a price') + ' right now.' : 'No offer ' + (u.mode === 'cores' ? 'with an Ultra Core price' : 'with a readable price') + ' holds ' + esc(label.toLowerCase()) + ' right now.') + '</p>'; return; }
    var index = E.buildIndex(t);
    // every figure here is the store list's own: the resource's part of an offer is the sum of its items there
    var views = rows.map(function (row) {
      var v = offerView(row.result, t);
      var inBucket = {};
      row.items.forEach(function (it) { inBucket[it.key] = it; });
      var entries = v.entries.filter(function (e) { return e.keys.some(function (k) { return inBucket[k]; }); });
      // offers are compared here, so the resource's figures are the engine's exact ones, rounded only to be shown
      var rated = !!entries.length && v.ratio != null && (all || row.bucketRatio != null);
      var ch = row.result.chain;
      var locked = !!(ch && ch.mode !== 'path' && ch.requires.length && !ch.bought);   // rated on its own, but not for sale on its own
      return { v: v, inBucket: inBucket, entries: entries, sumValue: all ? v.total : row.bucketValueUsd, rated: rated, locked: locked,
        exact: !rated ? null : (all ? row.wholeRatio : row.bucketRatio), ratio: !rated ? null : (all ? v.ratio : roundTo(row.bucketRatio, 2)) };
    });
    var bestExact = 0;
    views.forEach(function (x) { if (!x.locked && x.exact > bestExact) bestExact = x.exact; });
    var html = rows.map(function (row, at) {
      var r = row.result;
      var part = views[at], v = part.v, inBucket = part.inBucket, entries = part.entries;
      var shownEntries = all && entries.length > 7 ? entries.slice(0, 6) : entries;
      var lines = shownEntries.map(function (e) {
        var parts = [esc(e.label) + qtyText(e.qty)];
        var units = 0;
        e.keys.forEach(function (k) { if (inBucket[k] && inBucket[k].unitQty > 0) units += inBucket[k].unitQty; });
        if (v.price > 0 && e.qty > 0) parts.push(fmtPer(e.qty / v.price) + ' ' + esc(u.per));
        if (units && v.price > 0 && row.items.length > 1) parts.push(fmtNum(units / v.price, 0) + ' ' + esc(row.unitLabel) + ' ' + esc(u.per));
        if (v.price > 0 && v.ratio != null) parts.push(fmtRatio(e.value / v.price) + (e.usualPer ? ' the usual ' + fmtPer(e.usualPer) : ' the usual amount'));
        return parts.join(' · ');
      });
      if (shownEntries.length < entries.length) lines.push('+' + (entries.length - shownEntries.length) + ' more');
      row.items.forEach(function (it) {
        if (it.valueUsd != null) return;   // valued items are the entries above
        var parts = [esc(it.item) + ' ×' + (it.unreadable && !(it.qty > 0) ? 'unknown' : fmtNum(it.qty, 0))];
        if (it.unreadable) parts.push('count unreadable on the card');
        if (it.perUsd != null) parts.push(fmtPer(it.perUsd) + ' ' + esc(u.per));
        parts.push(it.excluded ? 'not counted in value' : (it.thin ? 'seen too rarely to price' : (u.mode === 'cores' ? 'no Ultra Core price yet' : 'no price yet')));
        lines.push(parts.join(' · '));
      });
      var sub = [];
      if (r.chain) sub.push(chainLabel(r));
      if (r.offer.purchaseLimit != null) sub.push('limit ' + r.offer.purchaseLimit);
      if (r.offer.expires) sub.push(leftText(r.offer.expires, state.offers && state.offers.updated));
      var flags = [];
      if (!r.complete) flags.push('incomplete');
      if (r.unreadable && r.unreadable.length) flags.push(r.unreadable.length + ' count' + (r.unreadable.length === 1 ? '' : 's') + ' unreadable');
      var p = priceLines(r, ownPrice(r.offer, t, index), u);
      var pathNote = v.onPath ? '<br><span class="muted">' + esc(priceText(v.price, u)) + ' for ' + esc(stepsText(v.steps[0], v.steps[1])) + '</span>' : '';
      // against the best offer in the store today for this resource that can be bought on its own
      var below = part.exact == null || !(bestExact > 0) ? null : 1 - part.exact / bestExact;
      var bestLine = below == null ? '' : '<br><span class="muted">' + (part.locked ? 'not for sale on its own: it needs the steps before it'
        : (below <= 0.0005 ? 'best in your store today' : (Math.round(below * 100) < 1 ? 'less than 1' : Math.round(below * 100)) + '% less ' + esc(u.per) + ' than the best in your store today')) + '</span>';
      var alone = part.rated
        ? '<b>' + fmtRatio(part.ratio) + '</b> <span class="muted">' + esc(valText(part.sumValue, u)) + '</span>'
        : '<span class="muted">' + (row.items.every(function (it) { return it.excluded; }) ? 'never counted' : 'not valued') + '</span>';
      return '<tr><td>' + esc(r.name) + (sub.length ? '<br><span class="muted">' + esc(sub.join(' · ')) + '</span>' : '') + '</td>' +
        '<td class="num">' + esc(p.main) + pathNote + '</td>' +
        (all ? '<td><span class="muted">' + lines.join('<br>') + '</span></td>' : '<td>' + alone +
          (row.unitsPerUsd != null ? ' <span class="muted">· ' + fmtNum(row.unitsPerUsd, 0) + ' ' + esc(row.unitLabel) + ' ' + esc(u.per) + '</span>' : '') +
          (row.setCostUsd != null ? ' <span class="muted">· ' + esc(valText(row.setCostUsd, u)) + ' for ' + esc(row.setLabel) + ' at this rate</span>' : '') +
          bestLine + '<br><span class="muted">' + lines.join('<br>') + '</span></td>') +
        '<td class="num">' + fmtRatio(v.ratio) + ' ' + gradeBadge(row.grade) + (all ? bestLine : '') + '</td>' +
        '<td class="warn">' + esc(flags.join(', ')) + '</td></tr>';
    }).join('');
    var valuedRows = views.filter(function (x) { return x.rated; }).length;
    var hasBest = bestExact > 0;
    var priced = u.mode === 'cores' ? 'an Ultra Core price' : 'a readable price';
    box.innerHTML = '<p class="muted">' + (all
      ? rows.length + ' offer' + (rows.length === 1 ? '' : 's') + ' with ' + priced + ', ' + valuedRows + ' of them valued, best first with what each holds. Pick a resource above to see what that part alone is worth. '
      : rows.length + ' offer' + (rows.length === 1 ? '' : 's') + ' with ' + priced + ' hold' + (rows.length === 1 ? 's' : '') + ' ' + esc(label.toLowerCase()) + ', best first. "' + esc(label) + ' alone" is what the offer is worth for that part alone: its value at your usual prices divided by the whole price. "Full offer" counts everything in it. ') +
      (hasBest ? 'The percentage compares each offer with the best one in your store today. ' : '') +
      (state.chainMode === 'path' ? 'A chain step that needs earlier steps is priced and counted over the whole path to it' : 'Each chain step counts its own price and contents') + ', and steps already bought are left out.' +
      (bucket.unit ? ' Levels are compared in ' + esc(bucket.unit.label) + ' ' + esc(u.per) + (bucket.key === 'training' ? ' (L1 50, L2 200, L3 800, L4 1,600 XP); a level with no offers of its own is priced from L4 by XP' : '') + '.' : '') + '</p>' +
      '<table><thead><tr><th>Offer</th><th class="num">Price</th><th>' + (all ? 'Contents' : esc(label) + ' alone') + '</th><th class="num">Full offer</th><th>Flags</th></tr></thead><tbody>' + html + '</tbody></table>';
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('#shop-buckets button[data-bucket]');
    if (!b) return;
    state.bucket = b.dataset.bucket;
    save(LS.bucket, state.bucket);
    renderStore();
  });
  /**
   * The most one unit of price bought of a resource in an earlier read, counting an offer's whole
   * price: { per, day, offer } out of the price history, or null. `before` is the day of the read
   * on the page, so that read never counts as its own past.
   */
  function bestEarlier(h, key, mode, before) {
    var field = mode === 'cores' ? 'coreItems' : 'items';
    var top = null;
    ((h && h.days) || []).forEach(function (d) {
      if (before && !(String(d.date) < before)) return;
      var x = d[field] && d[field][key];
      if (x && x.wb > 0 && (!top || x.wb > top.per)) top = { per: x.wb, day: d.date, offer: x.wo || null };
    });
    return top;
  }
  function renderBestBuys(ranked, t) {
    var box = $('best-list');
    if (!box) return;
    if (!ranked || !ranked.length) { box.innerHTML = ''; return; }
    var u = unitOf(state.mode, t);
    var best = E.bestPrices(ranked, t);
    if (!best.length) { box.innerHTML = '<p class="muted">Nothing in the store can be priced ' + (u.mode === 'cores' ? 'in Ultra Cores' : '') + ' yet.</p>'; return; }
    var h = historyAll();
    var readDay = state.offers ? String(state.offers.updated || '').slice(0, 10) : '';
    if (!E.isDay(readDay)) readDay = null;
    // the offer behind each "cheapest today" entry, so its ratios are the ones the store list shows
    var viewOf = function (x) { return x && x.result ? offerView(x.result, t) : null; };
    // the same resource in that offer's view: the family's entry, or the item's own
    var entryOf = function (view, b) {
      if (!view) return null;
      if (b.family) { for (var i = 0; i < view.entries.length; i++) { if (view.entries[i].family === b.family) return view.entries[i]; } return null; }
      var e = view.byKey[b.key];
      return e && e.keys.length === 1 ? e : null;
    };
    var cat = '';
    var rows = best.map(function (b) {
      var head = '';
      if (b.category !== cat) { cat = b.category; head = '<tr><th colspan="5">' + esc(cat) + '</th></tr>'; }
      var how = [b.offers + ' offer' + (b.offers === 1 ? '' : 's') + ' today'];
      if (b.typicalSource === 'user') how.push('your typed value');
      else if (b.typicalSource === 'derived') how.push('priced from another level');
      else if (b.basis && BASIS[b.basis]) how.push(BASIS[b.basis]);
      if (b.family) how.push('any class and stat');
      if (b.firstSeen) how.push('first seen in this read');
      var seen = bestEarlier(h, b.key, u.mode, readDay);
      var vw = viewOf(b.whole), vs = viewOf(b.share);
      var entry = entryOf(vw, b);
      var wholeRatio = entry && entry.ratio != null ? entry.ratio : (b.typicalPerUsd && b.whole ? b.whole.perUsd / b.typicalPerUsd : null);
      var compare = [];
      if (wholeRatio != null) compare.push(fmtRatio(wholeRatio) + ' the usual amount');
      if (seen && b.whole && b.whole.perUsd > seen.per * 1.0005) compare.push('more than any earlier read');
      // one way to buy it today: units per unit of price, how that compares, and the offer with what it gives for what
      var way = function (x, share, bold, compare) {
        if (!x) return '<td></td>';
        var part = share && roundTo(x.sharePrice, u.digits) < roundTo(x.priceUsd, u.digits);   // an offer that holds nothing else gives the item its whole price
        return '<td>' + (bold ? '<b>' + fmtPer(x.perUsd) + '</b>' : fmtPer(x.perUsd)) + ' ' + esc(u.per) + (compare ? ' <span class="muted">· ' + compare + '</span>' : '') +
          '<br><span class="muted">' + esc(x.name) + ': ' + fmtNum(x.qty, 0) + ' for ' + esc(part ? valText(x.sharePrice, u) + ' of its ' + priceText(x.priceUsd, u) : priceText(x.priceUsd, u)) +
          (x.steps ? ' over ' + esc(stepsText(x.steps[0], x.steps[x.steps.length - 1])) : '') + '</span></td>';
      };
      return head + '<tr><td>' + esc(b.name) + '<br><span class="muted">' + esc(how.join(' · ')) + '</span></td>' +
        '<td class="num">' + (b.typicalPerUsd ? fmtPer(b.typicalPerUsd) + ' ' + esc(u.per) : '<span class="muted">none</span>') + '</td>' +
        '<td>' + (seen ? fmtPer(seen.per) + ' ' + esc(u.per) + '<br><span class="muted">' + esc(dayText(seen.day)) + (seen.offer ? ', ' + esc(seen.offer) : '') + '</span>' : '<span class="muted">not in an earlier read</span>') + '</td>' +
        way(b.whole, false, true, compare.join(' · ')) +
        way(b.share, true, false, vs && vs.ratio != null ? 'the full offer is ' + fmtRatio(vs.ratio) : '') + '</tr>';
    }).join('');
    box.innerHTML = '<table class="best"><thead><tr><th>Resource</th><th class="num">Usual price</th><th>Most in an earlier read, if this is all you want</th><th>Cheapest today if this is all you want</th><th>Cheapest today inside a bundle</th></tr></thead><tbody>' + rows + '</tbody></table>';
  }
  $('store-list').addEventListener('click', function (e) {
    if (e.target.closest('button')) return;
    var tr = e.target.closest('tr.clickable');
    if (!tr) return;
    var i = Number(tr.dataset.idx);
    state.expanded[i] = !state.expanded[i];
    renderStore();
  });
  $('store-import').addEventListener('click', function () {
    var p = parseJson($('store-paste').value);
    if (!p.ok) { alert('That is not valid JSON: ' + p.error); return; }
    var v = p.value;
    // the raw page-state extract (what a Claude session reads from the store page) is normalized like the bookmark does it
    if (v && v.source === 'state' && window.MSFPull) {
      try { v = window.MSFPull.normalizeExtract(v); } catch (e) { alert('That page-state extract could not be read: ' + e.message); return; }
    }
    var wrong = readProblem(v);
    if (wrong) { alert('That is not a store read the page can use, so it keeps the one it has: ' + wrong + '.'); return; }
    var n = normalizeOffers(v);
    if (!n) { alert('Expected {"offers":[...]} with at least one offer.'); return; }
    // value it once before keeping it: a read the page cannot value must not replace the one it has
    try {
      var tt = table();
      E.rankOffers(n.offers, tt, state.roster || null, { personalize: false, mode: 'cash', chainMode: 'path' });
      E.rankOffers(n.offers, tt, state.roster || null, { personalize: false, mode: 'cores', chainMode: 'step' });
    } catch (err) { alert('That read could not be valued, so the page keeps the one it had: ' + err.message); return; }
    state.offers = Object.assign({ origin: 'paste' }, n);
    state.expanded = {};
    save(LS.offers, state.offers);
    $('store-paste').value = '';
    recordHistoryDay(state.offers);
    renderStatus();
    renderStore();
    renderHistory();
    var want = window.MSFPull && window.MSFPull.BOOKMARKLET_VERSION;
    if (want && v.source === 'web-store' && v.bookmarklet !== want) {
      alert('This read came from an older copy of the bookmark (' + (v.bookmarklet || 'no version') + '; current ' + want + '). It is used as it is. Drag the "MSF: grab my offers" link to your bookmarks bar again to replace the old copy.');
    }
  });
  $('store-reload').addEventListener('click', function () {
    var n = normalizeOffers(window.MSF_OFFERS);
    if (!n) { alert('data/offers.js has no offers. Reload the page after it has been written.'); return; }
    state.offers = Object.assign({ origin: 'file' }, n);
    state.expanded = {};
    save(LS.offers, state.offers);
    renderStatus();
    renderStore();
  });
  $('store-clear').addEventListener('click', function () {
    state.offers = null;
    state.expanded = {};
    save(LS.offers, null);
    renderStatus();
    renderStore();
  });

  // ---------- Refresh from the store (bookmarklet) ----------
  (function () {
    var a = $('grab-bookmarklet');
    if (!a || !window.MSFPull) return;
    a.href = window.MSFPull.bookmarkletHref();
    a.addEventListener('click', function (e) {
      e.preventDefault();
      alert('Drag this link to your bookmarks bar instead of clicking it here. Then open your store on marvelstrikeforce.com and click the bookmark there.');
    });
  })();

  // ---------- Value table ----------
  function renderTable() {
    renderTableMeta();
    renderTableRows();
  }
  function coreRateProblem(meta) {
    var pc = Object.assign({}, E.DEFAULT_POWER_CORE, meta.powerCore || {});
    if (!(Number(pc.price) > 0)) return 'no Power Core price set';
    var cur = String(pc.currency || '').toUpperCase();
    if (cur !== currencyOf({ meta: meta }) && !(meta.fxToUsd && Number(meta.fxToUsd[cur]) > 0)) return 'the table has no rate for ' + cur;
    return null;
  }
  function renderTableMeta() {
    var t = table();
    var s = tableStats(t);
    var meta = t.meta;
    var b = ownBaseline(t);
    var cash = unitOf('cash', t);
    var pc = Object.assign({}, E.DEFAULT_POWER_CORE, meta.powerCore || {});
    var edits = Object.keys(state.overrides).length;
    var tiers = Array.isArray(meta.coreTiers) ? meta.coreTiers.filter(function (x) { return Array.isArray(x) && Number(x[0]) > 0 && Number(x[1]) > 0; }) : [];
    var mult = meta.valueMultipliers && typeof meta.valueMultipliers === 'object' ? meta.valueMultipliers : {};
    var usualCore = E.unitValue(E.deriveItem(t, 'power_cores'));
    var rows = [];
    rows.push(['Source', esc(meta.source || 'not stated')]);
    if (b) rows.push(['Built', esc(dayText(b.builtAt)) + ' for the store read of ' + esc(dayText(b.ratedDay)) + ', from the ' + fmtNum(b.archivedOffers, 0) + ' offers kept from your reads of ' + esc(daysText(b.readDays))]);
    if (b) {
      var stands = b.weights && typeof b.weights === 'object' ? Object.keys(b.weights).sort() : [];
      rows.push(['Usual price', esc(capital(usualRule(t))) + ', counting only the reads before the one being rated.' +
        (stands.length ? ' <span class="muted">Each read counts for the days it stands for, half the gap to the reads on either side and at most a week each way: ' +
          esc(stands.map(function (d) { return dayText(d, true) + ' ' + fmtNum(b.weights[d], 1); }).join(', ')) + ' days. Reading the store every day of a sale adds days, not votes.</span>' : '')]);
    }
    rows.push(['Items', s.priced + ' with a price, ' + (s.total - s.priced) + ' without' + (s.points ? ', ' + s.points + ' never counted (event and loyalty points)' : '') + (edits ? ', ' + edits + ' local edit' + (edits === 1 ? '' : 's') : '') + (state.replacement ? ', table replaced from pasted JSON' : '')]);
    if (b) rows.push(['Currency', 'every value is in ' + esc(cash.label) + ', the store\'s own currency, and in Ultra Cores; nothing is converted']);
    if (tiers.length) rows.push(['Ultra Core price tiers', tiers.map(function (x) { return fmtMoney(Number(x[0]), cash.currency) + ' is ' + fmtNum(Number(x[1]), 0); }).join(', ') + ' Ultra Cores <span class="muted">(an offer typed in or read from the cards shows no Ultra Core price: it is the offer\'s Strike Points bonus divided by ten, or else the one of its price tier)</span>']);
    rows.push(['Grades', (Array.isArray(meta.grades) && meta.grades.length ? meta.grades : E.DEFAULT_GRADES).map(function (g) { return esc(g.label) + ' ≥ ' + esc(g.min) + '×'; }).join(', ') + (meta.gradeNote ? ' <span class="muted">' + esc(meta.gradeNote) + '</span>' : '')]);
    rows.push(['Power Core', '<input id="meta-coreprice" type="number" min="0" step="any" value="' + esc(pc.price) + '" style="width:90px;display:inline-block"> <input id="meta-corecur" value="' + esc(pc.currency) + '" style="width:70px;display:inline-block"> per Power Core <span class="muted">(' +
      esc(coreRateProblem(meta) || 'what one Power Core is worth to you: it prices the "Power Cores in game" figures typed per item below') +
      (usualCore > 0 ? '; the Power Cores inside an offer count at your usual store price, ' + fmtPer(1 / usualCore) + ' ' + esc(cash.per) : '') + ')</span>']);
    if (Object.keys(mult).length) rows.push(['Discounts', Object.keys(mult).map(function (k) { return esc(k) + ' items count ' + Math.round(Number(mult[k]) * 100) + '% of their value'; }).join(', ') + ' <span class="muted">(meta.valueMultipliers in data/values.js)</span>']);
    $('table-meta').innerHTML = rows.map(function (r) { return '<div class="muted">' + r[0] + '</div><div>' + r[1] + '</div>'; }).join('');
    var coreChange = function () { setOverride('__meta', { powerCore: { price: Number($('meta-coreprice').value) || 0, currency: ($('meta-corecur').value || currencyOf(table())).toUpperCase() } }); renderAll(); };
    $('meta-coreprice').addEventListener('change', coreChange);
    $('meta-corecur').addEventListener('change', coreChange);
  }
  /** The lines under a value on the Value table tab: where the number comes from, in words. */
  function priceNote(t, k) {
    var d = E.deriveItem(t, k);
    if (!d) return '';
    if (d.excludeFromValue) return '<span class="muted">never counted: event or loyalty points</span>';
    var o = d.observed || {};
    var cashName = unitOf('cash', t).per;
    var perCash = E.usualPer(d, 'cash'), perCore = E.usualPer(d, 'cores');
    if (perCash == null && perCore == null) return '<span class="muted">no price yet: your reads have not shown it sold on its own, or in a set of things never sold on their own</span>';
    var lines = [];
    var usual = [];
    if (d.userValue) {
      var file = fileRow(k);
      var rebuilt = file ? E.usualPer(file, 'cash') : null;
      usual.push('your typed value: ' + (perCash != null ? fmtPer(perCash) + ' ' + cashName : 'nothing') + (rebuilt != null ? ' (rebuilt from your reads: ' + fmtPer(rebuilt) + ')' : ''));
    } else usual.push(perCash != null ? fmtPer(perCash) + ' ' + cashName : 'no ' + unitOf('cash', t).label + ' price yet');
    usual.push(perCore != null ? fmtPer(perCore) + ' per Ultra Core' : 'no Ultra Core price yet');
    lines.push(usual.join(' · '));
    if (d.derived) {
      lines.push(d.derived.note);
      if (o.firstSeen) lines.push(d.derived.fromName + ' was first seen in the rated read: no earlier price');
      return '<span class="muted">' + lines.map(esc).join('<br>') + '</span>';
    }
    var how = BASIS[o.basis] || null;
    if (o.family) how = (how ? how + ', ' : '') + 'one price for all ' + familyLabel(o.family) + (/_crystals$/.test(String(o.family)) ? ', whatever the class and stat' : '');
    if (how) lines.push(how);
    var days = Array.isArray(o.days) ? o.days : [];
    if (o.firstSeen) lines.push('first seen ' + dayText(days[0] || (ownBaseline(t) || {}).ratedDay || 'in the rated read') + ': no earlier price');
    else if (days.length) lines.push('from your read' + (days.length === 1 ? '' : 's') + ' of ' + daysText(days) + (o.offers != null ? ', ' + fmtNum(o.offers, 0) + ' offer' + (Number(o.offers) === 1 ? '' : 's') : ''));
    // its price on each read day that has one: what the usual price is picked from (the last six reads)
    var series = function (map) {
      var ds = Object.keys(map || {}).sort().slice(-6);
      return ds.filter(function (x) { return map[x] && map[x].per > 0; }).map(function (x) { return dayText(x, true) + ' ' + fmtPer(map[x].per); }).join(' · ');
    };
    var cashSeries = series(o.byDay), coreSeries = series(o.coreByDay);
    if (cashSeries) lines.push('by read, ' + cashName + ': ' + cashSeries);
    if (coreSeries) lines.push('by read, per Ultra Core: ' + coreSeries);
    return '<span class="muted">' + lines.map(esc).join('<br>') + '</span>';
  }
  function renderTableRows() {
    var t = table();
    var cash = unitOf('cash', t);
    var f = E.normalizeKey(state.filter);
    var keys = Object.keys(t.items).filter(function (k) {
      if (!f) return true;
      var it = t.items[k];
      return E.normalizeKey(k + ' ' + (it.name || '') + ' ' + (it.category || '') + ' ' + [].concat(it.aliases || []).join(' ')).indexOf(f) !== -1;
    }).sort(function (a, b) {
      var ca = t.items[a].category || '', cb = t.items[b].category || '';
      if (ca !== cb) return ca < cb ? -1 : 1;
      return (t.items[a].name || a) < (t.items[b].name || b) ? -1 : 1;
    });
    var valueTitle = cash.label + ' that "Per" units cost at the usual price. A value typed here overrides the ' + cash.label + ' value only: the Ultra Core price still comes from your reads. Clear the box to go back to the rebuilt value.';
    var coresTitle = 'Power Cores that "Per" units cost in the in-game store. Power Cores are not Ultra Cores: this column plays no part in rating offers against their Ultra Core price.';
    var rows = keys.map(function (k) {
      var it = t.items[k];
      var cats = CATEGORIES.indexOf(it.category) === -1 && it.category ? CATEGORIES.concat([String(it.category)]) : CATEGORIES;
      var opts = cats.map(function (c) { return '<option' + (it.category === c ? ' selected' : '') + '>' + esc(c) + '</option>'; }).join('');
      var derived = it.value == null ? E.unitValue(E.deriveItem(t, k)) : null;   // a level priced from another row: its value shows as the hint
      var per = Number(it.per) > 0 ? Number(it.per) : 1;
      return '<tr data-key="' + esc(k) + '">' +
        '<td><code>' + esc(k) + '</code>' + (state.overrides[k] ? ' <span class="muted" title="edited locally">•</span>' : '') + '</td>' +
        '<td><input data-f="name" value="' + esc(it.name || '') + '"></td>' +
        '<td><select data-f="category">' + opts + '</select></td>' +
        '<td><input data-f="character" value="' + esc(it.character || '') + '" placeholder="' + (it.category === 'shard' ? 'character' : '') + '"></td>' +
        '<td><input data-f="per" type="number" min="0" step="any" value="' + esc(it.per == null ? 1 : it.per) + '" style="width:90px" title="How many units the value is for. A change here counts once a value is typed too."></td>' +
        '<td><input data-f="value" type="number" step="any" value="' + esc(it.value == null ? '' : it.value) + '" placeholder="' + (derived != null ? esc(Number((derived * per).toPrecision(4))) : 'none') + '" style="width:110px" title="' + esc(valueTitle) + '">' +
        '<div class="note" data-note>' + priceNote(t, k) + '</div></td>' +
        '<td><input data-f="cores" type="number" min="0" step="any" value="' + esc(it.cores == null ? '' : it.cores) + '" placeholder="none" style="width:90px" title="' + esc(coresTitle) + '"></td>' +
        '<td><input data-f="aliases" value="' + esc([].concat(it.aliases || []).join(', ')) + '" placeholder="comma separated"></td>' +
        '<td><button class="ghost small" data-delkey="' + esc(k) + '" title="Remove">✕</button></td></tr>';
    }).join('');
    $('table-list').innerHTML = keys.length
      ? '<table><thead><tr><th>Key</th><th>Name</th><th>Category</th><th>Character</th><th>Per</th><th title="' + esc(valueTitle) + '">Value (' + esc(cash.label) + ') and where it comes from</th><th title="' + esc(coresTitle) + '">Power Cores in game</th><th>Aliases</th><th></th></tr></thead><tbody>' + rows + '</tbody></table>'
      : '<p class="muted">No items match.</p>';
  }
  $('table-list').addEventListener('change', function (e) {
    var el = e.target;
    var tr = el.closest('tr[data-key]');
    if (!tr || !el.dataset.f) return;
    var key = tr.dataset.key;
    var patch = {};
    var f = el.dataset.f;
    var perBox = tr.querySelector('[data-f="per"]');
    var shownPer = perBox && Number(perBox.value) > 0 ? Number(perBox.value) : 1;   // a typed figure goes with the count its row shows
    if (f === 'per') patch.per = Number(el.value) > 0 ? Number(el.value) : 1;
    else if (f === 'value') {
      patch.value = el.value === '' ? null : Number(el.value);
      if (patch.value != null && !(patch.value >= 0)) { patch.value = null; el.value = ''; }   // a value cannot be negative: taken as cleared
      if (patch.value != null) patch.per = shownPer;
    }
    else if (f === 'cores') { patch.cores = el.value === '' ? null : Number(el.value); patch.coresPer = shownPer; }
    else if (f === 'aliases') patch.aliases = el.value.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    else patch[f] = el.value;
    setOverride(key, patch);
    if (f === 'value' && patch.value == null && fileRow(key)) {
      // the typed value is gone: the rebuilt price stands again, on the file's own scale
      delete state.overrides[key].per;
      save(LS.overrides, state.overrides);
      if (perBox) perBox.value = fileRow(key).per == null ? 1 : fileRow(key).per;
    }
    renderStatus();
    renderDatalist();
    renderOfferResult();
    renderStore();
    renderTableMeta();
    renderHistory();
    // Re-render rows only when the sort key changed; otherwise keep the inputs so Tab moves on naturally.
    if (f === 'category' || f === 'name') renderTableRows();
    else {
      if (!tr.querySelector('td:first-child span')) tr.querySelector('td:first-child').insertAdjacentHTML('beforeend', ' <span class="muted" title="edited locally">•</span>');
      if (tr.querySelector('[data-note]')) tr.querySelector('[data-note]').innerHTML = priceNote(table(), key);
    }
  });
  $('table-list').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-delkey]');
    if (!b) return;
    if (!confirm('Remove "' + b.dataset.delkey + '" from the value table?')) return;
    state.overrides[b.dataset.delkey] = { _deleted: true };
    save(LS.overrides, state.overrides);
    renderAll();
  });
  $('table-filter').addEventListener('input', function () { state.filter = $('table-filter').value; renderTableRows(); });
  $('table-add').addEventListener('click', function () { $('table-add-box').hidden = !$('table-add-box').hidden; $('table-import-box').hidden = true; });
  $('new-category').innerHTML = CATEGORIES.map(function (c) { return '<option>' + c + '</option>'; }).join('');
  $('table-add-apply').addEventListener('click', function () {
    var name = $('new-name').value.trim();
    if (!name) return;
    var category = $('new-category').value;
    var per = Number($('new-per').value) > 0 ? Number($('new-per').value) : 1;
    var key = slugKey(name, category);
    if (table().items[key]) { alert('An item with key "' + key + '" already exists.'); return; }
    var item = { name: name, category: category, per: per, value: null, aliases: [] };
    if (category === 'shard') item.character = name.replace(/\b(character\s+)?shards?\b/i, '').trim();
    setOverride(key, item);
    $('new-name').value = '';
    $('table-add-box').hidden = true;
    renderAll();
  });
  $('table-export').addEventListener('click', function () {
    var t = table();
    download('msf-values.json', JSON.stringify(t, null, 2));
  });
  $('table-import-toggle').addEventListener('click', function () { $('table-import-box').hidden = !$('table-import-box').hidden; $('table-add-box').hidden = true; });
  $('table-import').addEventListener('click', function () {
    var p = parseJson($('table-import-text').value);
    if (!p.ok) { alert('That is not valid JSON: ' + p.error); return; }
    var v = p.value;
    if (!v || typeof v !== 'object' || !v.items || typeof v.items !== 'object') { alert('Expected {"meta":{...},"items":{...}}.'); return; }
    if (!ownBaseline(v)) { alert('That table was not built by this version of the tool from your own store reads (it has no meta.baseline), so the page keeps the one it has. Paste a table exported from this page, or rebuild data/values.js with node tools/refresh.js.'); return; }
    if (v.meta.grades != null && !Array.isArray(v.meta.grades)) { alert('meta.grades must be a list, so the page keeps the table it has.'); return; }
    if (!confirm('Replace the whole value table (and discard local edits) with the pasted JSON?')) return;
    state.replacement = { meta: v.meta && typeof v.meta === 'object' ? v.meta : {}, items: v.items };
    state.overrides = {};
    save(LS.replacement, state.replacement);
    save(LS.overrides, state.overrides);
    $('table-import-text').value = '';
    $('table-import-box').hidden = true;
    renderAll();
  });
  $('table-reset').addEventListener('click', function () {
    if (!confirm('Discard all local edits and go back to data/values.js?')) return;
    state.overrides = {};
    state.replacement = null;
    save(LS.overrides, null);
    save(LS.replacement, null);
    renderAll();
  });

  // ---------- Price history ----------
  function historyAll() {
    // the file's days are rebuilt from the saved reads on today's prices, so they win over a day this browser recorded
    var h = E.mergeHistory(state.historyLocal, null);
    ((window.MSF_HISTORY && window.MSF_HISTORY.days) || []).forEach(function (d) { h = E.mergeHistory(h, d); });
    return h;
  }
  /** Record a pasted read as a day of the browser's own history, in money and in Ultra Cores. */
  function recordHistoryDay(offers) {
    if (!offers || !offers.offers || !offers.offers.length) return;
    var day = String(offers.updated || '').slice(0, 10);
    if (!E.isDay(day)) day = new Date().toISOString().slice(0, 10);
    var t = table();
    // like the days update.cmd rebuilds: only what could be bought that day on its own, so no chain step still locked or already bought
    var forSale = Object.assign({}, offers, { offers: offers.offers.filter(function (o) { var c = o.chain; return !(c && Number(c.step) > 0 && Number(c.step) !== Number(c.current || 1)); }) });
    var cash = E.priceSnapshot(forSale, t, { date: day, mode: 'cash' });
    var cores = E.priceSnapshot(forSale, t, { date: day, mode: 'cores' });
    if (!cash.date) return;
    state.historyLocal = E.mergeHistory(state.historyLocal, { date: cash.date, readAt: cash.readAt, source: cash.source, account: cash.account, items: cash.items, coreItems: cores.items });
    save(LS.history, state.historyLocal);
  }
  function renderHistory() {
    var sel = $('history-item'), box = $('history-list');
    if (!sel || !box) return;
    var t = table();
    var u = unitOf(state.mode, t);
    var field = u.mode === 'cores' ? 'coreItems' : 'items';
    var one = u.mode === 'cores' ? 'Ultra Core' : u.money;
    if ($('history-note')) {
      $('history-note').innerHTML = 'How many of a resource one ' + esc(one) + ' bought on each day the store was read. "Its own price" is the price the rules give it that day: its cheapest offer of its own, or its even split of a set. The usual price is ' + esc(usualRule(t)) + ', counting the reads before the one being rated, each for the days it stands for. ' +
        'The other columns count every offer that held it: the whole offer price against that one resource, and only the item\'s share of the price. ' +
        '<code>update.cmd</code> rebuilds these days from your saved reads; importing pasted offers records the day in this browser only.';
    }
    var h = historyAll();
    var items = E.itemsOf(t);
    // a family (the stat crystals of a tier) is one resource in the history: any row of it carries its prices
    var member = {};
    Object.keys(items).forEach(function (k) { var f = items[k] && items[k].observed && items[k].observed.family; if (f && !member[f]) member[f] = items[k]; });
    var isFamily = function (k) { return /^family:/.test(String(k)); };
    var rowOf = function (k) { return isFamily(k) ? (member[k] || null) : (items[k] || null); };
    var nameOf = function (k) { return isFamily(k) ? familyLabel(k) : ((items[k] && items[k].name) || k); };
    var keys = {};
    h.days.forEach(function (d) { Object.keys(d[field] || {}).forEach(function (k) { keys[k] = true; }); });
    var list = Object.keys(keys).sort(function (a, b) { var na = nameOf(a), nb = nameOf(b); return na < nb ? -1 : (na > nb ? 1 : 0); });
    if (!list.length) { sel.innerHTML = ''; box.innerHTML = '<p class="muted">No days recorded yet.</p>'; return; }
    if (!state.historyKey || !keys[state.historyKey]) state.historyKey = keys['gold'] ? 'gold' : list[0];
    sel.innerHTML = list.map(function (k) { return '<option value="' + esc(k) + '"' + (k === state.historyKey ? ' selected' : '') + '>' + esc(nameOf(k)) + '</option>'; }).join('');
    var rows = E.historyFor(h, state.historyKey, u.mode);
    var it = rowOf(state.historyKey);
    var usual = it ? E.usualPer(it, u.mode) : null;
    var o = (it && it.observed) || {};
    var own = (u.mode === 'cores' ? o.coreByDay : o.byDay) || {};
    var b = ownBaseline(t);
    var rated = b ? String(b.ratedDay) : null;
    var ownDays = Object.keys(own).sort();
    var used = rated ? ownDays.filter(function (d) { return d < rated; }) : ownDays;
    var how = '';
    if (it && it.userValue) how = ', your typed value';
    else if (it && it.derivedFrom) how = ', priced from another level';
    else if (used.length) how = ', picked from its own price on ' + daysText(used);
    else if (ownDays.length) how = ', first seen in the read being rated';
    var num = function (x) { return x != null ? fmtPer(x) : '<span class="muted">not known</span>'; };
    var cell = function (x) { return '<td class="num">' + num(x) + '</td>'; };
    var withOffer = function (x, offer, none) {
      return '<td class="num">' + (x != null ? fmtPer(x) + (offer ? '<br><span class="muted">' + esc(offer) + '</span>' : '') : '<span class="muted">' + none + '</span>') + '</td>';
    };
    box.innerHTML = '<p class="muted">' + h.days.length + ' day' + (h.days.length === 1 ? '' : 's') + ' recorded, ' + rows.length + ' with this item' + (usual != null ? ' · usual price ' + fmtPer(usual) + ' ' + esc(u.per) + esc(how) : '') + '</p>' +
      '<table><thead><tr><th>Day</th><th class="num">Offers</th><th class="num">Its own price</th><th class="num">Best, whole price</th><th class="num">Average, whole price</th><th class="num">Best, price share</th><th class="num">Average, price share</th></tr></thead><tbody>' +
      rows.slice().reverse().map(function (d) {
        var p = own[d.date] && own[d.date].per > 0 ? own[d.date] : null;
        var stood = b && b.weights && b.weights[d.date] != null ? Number(b.weights[d.date]) : null;
        return '<tr><td>' + esc(dayText(d.date)) + (rated && d.date === rated ? '<br><span class="muted">the read being rated</span>' : (stood != null && p ? '<br><span class="muted">counts for ' + fmtNum(stood, 1) + ' day' + (stood === 1 ? '' : 's') + '</span>' : '')) + '</td><td class="num">' + fmtNum(d.n, 0) + '</td>' +
          withOffer(p ? p.per : null, p ? p.offer : null, 'none of its own') + withOffer(d.wb, d.wo, 'not known') + cell(d.wa) + cell(d.sb) + cell(d.sa) + '</tr>';
      }).join('') + '</tbody></table>';
  }
  if ($('history-item')) $('history-item').addEventListener('change', function () { state.historyKey = $('history-item').value; renderHistory(); });

  renderAll();
})();
