/* MSF Store Value: page logic. Talks to engine.js (window.MSFEngine) and the data/*.js files. */
(function () {
  'use strict';

  var E = window.MSFEngine;
  var LS = {
    offers: 'msfv.offers',
    roster: 'msfv.roster',
    overrides: 'msfv.tableOverrides',
    replacement: 'msfv.tableReplacement',
    personal: 'msfv.personalize',
    draft: 'msfv.offerDraft',
    plan: 'msfv.plan',
    planOnly: 'msfv.planOnly'
  };
  var CATEGORIES = ['currency', 'shard', 'orb', 'gear', 'training', 'ability', 'iso8', 'other'];

  // ---------- storage ----------
  function load(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  }
  function save(key, val) {
    try { if (val == null) localStorage.removeItem(key); else localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* storage unavailable */ }
  }

  // ---------- helpers ----------
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fmtMoney(n, currency) {
    if (n == null || isNaN(n)) return '–';
    try { return new Intl.NumberFormat(undefined, { style: 'currency', currency: currency || 'USD', maximumFractionDigits: 2 }).format(n); }
    catch (e) { return (currency || 'USD') + ' ' + Number(n).toFixed(2); }
  }
  function fmtNum(n, digits) {
    if (n == null || isNaN(n)) return '–';
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: digits == null ? 2 : digits }).format(n);
  }
  function fmtRatio(r) { return r == null || isNaN(r) ? '–' : fmtNum(r, 2) + '×'; }
  function fmtPerUsd(n) {
    if (n == null || isNaN(n)) return '–';
    if (n >= 1e6) return fmtNum(n / 1e6, 2) + 'M';
    if (n >= 1e4) return fmtNum(n / 1e3, 1) + 'K';
    return fmtNum(n, n >= 100 ? 0 : 2);
  }
  function gradeBadge(g) {
    if (!g) return '<span class="grade none">no grade</span>';
    var cls = /^[A-F]$/.test(g) ? 'letter-' + g : g;
    return '<span class="grade ' + esc(cls) + '">' + esc(g) + '</span>';
  }
  function gradeChart(t) {
    var grades = ((t || table()).meta.grades || E.DEFAULT_GRADES).slice().sort(function (a, b) { return b.min - a.min; });
    return '<span class="chart">' + grades.map(function (g) { return gradeBadge(g.label) + ' <span class="muted">' + (g.note ? esc(g.note) : '≥ ' + g.min + '×') + '</span>'; }).join('<br>') + '</span>';
  }
  function scoreBadge(letter, score) {
    if (score == null || isNaN(score)) return '<span class="grade none">no score</span>';
    return '<span class="grade letter-' + esc(letter || 'F') + '">' + esc(letter || '–') + ' · ' + fmtNum(score, 0) + '/100</span>';
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
    if (!Array.isArray(offers) || offers.length === 0) return null;
    return { updated: src.updated || null, source: src.source || null, account: src.account || null, priceCurrency: src.priceCurrency || null, offers: offers };
  }
  function normalizeRoster(src) {
    if (!src || typeof src !== 'object' || !src.characters || typeof src.characters !== 'object') return null;
    if (Object.keys(src.characters).length === 0) return null;
    return { updated: src.updated || null, characters: src.characters };
  }
  function normalizePlan(src) {
    if (!src || typeof src !== 'object') return null;
    var chars = src.characters && typeof src.characters === 'object' ? src.characters : {};
    return {
      updated: src.updated || null,
      sources: src.sources || [],
      characters: chars,
      offListMultiplier: src.offListMultiplier == null ? 0 : Number(src.offListMultiplier),
      surplusMultiplier: src.surplusMultiplier == null ? 0.25 : Number(src.surplusMultiplier),
      resources: src.resources || {},
      resourceRules: src.resourceRules || [],
      inventory: src.inventory || {}
    };
  }
  function pickSnapshot(fromFile, stored) {
    // Prefer the file when it is newer than what the browser remembers, or when the stored copy came from the file.
    if (!fromFile) return stored || null;
    if (!stored) return Object.assign({ origin: 'file' }, fromFile);
    if (stored.origin === 'file') return Object.assign({ origin: 'file' }, fromFile);
    if (fromFile.updated && (!stored.updated || fromFile.updated > stored.updated)) return Object.assign({ origin: 'file' }, fromFile);
    return stored;
  }

  var state = {
    base: window.MSF_VALUE_TABLE || { meta: {}, items: {} },
    replacement: load(LS.replacement, null),
    overrides: load(LS.overrides, {}),
    offers: pickSnapshot(normalizeOffers(window.MSF_OFFERS), load(LS.offers, null)),
    roster: pickSnapshot(normalizeRoster(window.MSF_ROSTER), load(LS.roster, null)),
    plan: pickSnapshot(normalizePlan(window.MSF_PERSONAL), load(LS.plan, null)),
    planOnly: load(LS.planOnly, false),
    personalize: load(LS.personal, true),
    draft: load(LS.draft, null) || { name: '', price: '', currency: 'USD', rows: [{ item: '', qty: '' }] },
    filter: '',
    expanded: {}
  };
  save(LS.offers, state.offers);
  save(LS.roster, state.roster);
  save(LS.plan, state.plan);

  function table() {
    var src = state.replacement || state.base || { meta: {}, items: {} };
    var out = { meta: Object.assign({}, src.meta || {}), items: {} };
    Object.keys(src.items || {}).forEach(function (k) { out.items[k] = Object.assign({}, src.items[k]); });
    Object.keys(state.overrides).forEach(function (k) {
      var o = state.overrides[k];
      if (k === '__meta') { Object.assign(out.meta, o); return; }
      if (o && o._deleted) { delete out.items[k]; return; }
      out.items[k] = Object.assign({}, out.items[k] || {}, o);
      if (o && o.value != null) out.items[k].userValue = true;  // typed on the Value table tab: trusted over msfwar's baseline
    });
    return out;
  }
  function rosterForUse() { return state.personalize && state.roster ? state.roster : null; }
  function planForUse() { return state.personalize && state.plan ? state.plan : null; }
  function valueOpts(extra) { return Object.assign({ plan: planForUse(), personalize: state.personalize && !!(state.roster || state.plan) }, extra || {}); }
  function tableStats(t) {
    var keys = Object.keys(t.items);
    var priced = keys.filter(function (k) { return E.unitValue(t.items[k]) != null; }).length;
    return { total: keys.length, priced: priced };
  }
  function setOverride(key, patch) {
    var cur = state.overrides[key] || {};
    state.overrides[key] = Object.assign({}, cur, patch);
    save(LS.overrides, state.overrides);
  }

  // ---------- header / shared ----------
  function renderStatus() {
    var t = table();
    var s = tableStats(t);
    var bits = [];
    bits.push(esc(t.meta.source || 'no value source'));
    bits.push(s.priced + ' of ' + s.total + ' items have values');
    if (t.meta.updated) bits.push('values updated ' + esc(t.meta.updated));
    bits.push(state.offers ? state.offers.offers.length + ' store offers loaded' + (state.offers.updated ? ' (read ' + esc(String(state.offers.updated).slice(0, 16).replace('T', ' ')) + ' UTC)' : '') : 'no store offers loaded');
    bits.push(state.roster ? Object.keys(state.roster.characters).length + ' roster characters' : 'no roster');
    bits.push(state.plan ? Object.keys(state.plan.characters).length + ' characters on your build list' : 'no build list');
    $('status').innerHTML = bits.join(' · ');
    if (s.priced === 0) $('status').innerHTML += ' · <span class="warn">value table has no numbers yet</span>';
    $('offer-personal').checked = state.personalize;
    $('store-personal').checked = state.personalize;
    $('offer-personal').disabled = !state.roster && !state.plan;
    $('store-personal').disabled = !state.roster && !state.plan;
    $('store-planonly').checked = state.planOnly;
    $('store-planonly').disabled = !state.plan || !state.personalize;
  }
  function renderDatalist() {
    var t = table();
    var names = Object.keys(t.items).map(function (k) { return t.items[k].name || k; }).sort();
    $('item-list').innerHTML = names.map(function (n) { return '<option value="' + esc(n) + '">'; }).join('');
  }
  function renderAll() {
    renderStatus();
    renderDatalist();
    renderOfferRows();
    renderOfferResult();
    renderStore();
    renderTable();
    renderRoster();
  }

  // ---------- tabs ----------
  document.querySelectorAll('nav button').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('nav button').forEach(function (x) { x.classList.toggle('active', x === b); });
      ['offer', 'store', 'table', 'roster'].forEach(function (t) { $('tab-' + t).hidden = t !== b.dataset.tab; });
    });
  });

  // ---------- Value an offer ----------
  function saveDraft() { save(LS.draft, state.draft); }
  function renderOfferRows() {
    $('offer-name').value = state.draft.name || '';
    $('offer-price').value = state.draft.price == null ? '' : state.draft.price;
    $('offer-currency').value = state.draft.currency || 'USD';
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
  ['offer-name', 'offer-price', 'offer-currency'].forEach(function (id) {
    $(id).addEventListener('input', function () {
      state.draft.name = $('offer-name').value;
      state.draft.price = $('offer-price').value;
      state.draft.currency = $('offer-currency').value || 'USD';
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
    state.draft = { name: '', price: '', currency: 'USD', rows: [{ item: '', qty: '' }] };
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
  $('offer-personal').addEventListener('change', function () {
    state.personalize = $('offer-personal').checked;
    save(LS.personal, state.personalize);
    renderStatus();
    renderOfferResult();
    renderStore();
  });
  $('store-planonly').addEventListener('change', function () {
    state.planOnly = $('store-planonly').checked;
    save(LS.planOnly, state.planOnly);
    renderStore();
  });
  $('store-personal').addEventListener('change', function () {
    state.personalize = $('store-personal').checked;
    save(LS.personal, state.personalize);
    renderStatus();
    renderOfferResult();
    renderStore();
  });

  function draftOffer() {
    return {
      name: state.draft.name,
      price: state.draft.price === '' ? null : Number(state.draft.price),
      currency: state.draft.currency || 'USD',
      contents: state.draft.rows
        .filter(function (r) { return String(r.item).trim() !== ''; })
        .map(function (r) { return { item: String(r.item).trim(), qty: r.qty === '' ? 1 : Number(r.qty) }; })
    };
  }
  function breakdownTable(r) {
    var rows = r.lines.map(function (l) {
      var cls = (l.excluded || l.thin) ? ' class="muted"' : (l.value == null ? ' class="warn"' : '');
      var personal = l.personalValue != null && l.multiplier !== 1 ? '<br><span class="muted">for you: ' + fmtMoney(l.personalValue, 'USD') + ' (' + Math.round(l.multiplier * 100) + '%)</span>' : '';
      return '<tr' + cls + '><td>' + esc(l.item) + (l.note ? '<br><span class="muted">' + esc(l.note) + '</span>' : '') + '</td>' +
        '<td class="num">' + fmtNum(l.qty, 3) + '</td>' +
        '<td class="num">' + (l.unitValue == null ? '–' : fmtNum(l.unitValue, 4)) + '</td>' +
        '<td class="num">' + (l.value == null ? '–' : fmtNum(l.value, 2)) + personal + '</td>' +
        '<td class="num">' + (l.ratio == null ? '–' : fmtRatio(l.ratio)) + '</td></tr>';
    }).join('');
    return '<table><thead><tr><th>Item</th><th class="num">Qty</th><th class="num">Unit value (' + esc(r.unit) + ')</th><th class="num">Value (' + esc(r.unit) + ')</th><th class="num">vs typical</th></tr></thead><tbody>' + rows + '</tbody></table>';
  }
  function warnings(r) {
    var out = [];
    if (r.unknown.length) {
      out.push('<p class="warn">Not in the value table: ' + r.unknown.map(function (u) {
        return esc(u) + ' <button class="ghost small" data-addunknown="' + esc(u) + '">add</button>';
      }).join(', ') + '</p>');
    }
    if (r.unpriced.length) out.push('<p class="warn">In the table but without a value yet: ' + r.unpriced.map(esc).join(', ') + ' (fill them in on the Value table tab).</p>');
    if (r.notes) out.push('<p class="warn">' + esc(r.notes) + '.</p>');
    if (r.thin && r.thin.length) out.push('<p class="muted">Shown but not scored, msfwar baseline too thin or suspect: ' + r.thin.map(esc).join(', ') + '.</p>');
    if (r.excluded && r.excluded.length) out.push('<p class="muted">Not counted, as on msfwar: ' + r.excluded.map(esc).join(', ') + '.</p>');
    if (!r.complete) out.push('<p class="muted">Totals below count only the items with values, so the real value is higher than shown.</p>');
    return out.join('');
  }
  function summaryBlock(r) {
    var ratio = r.personalized ? r.personalPerDollar : r.perDollar;
    var usd = r.personalized ? r.personalUsd : r.totalUsd;
    var html = '<div class="summary">';
    html += '<div><div class="label">Value per US$ spent</div><div class="big">' + fmtRatio(ratio) + ' ' + gradeBadge(r.grade) + '</div></div>';
    html += '<div><div class="label">' + (r.personalized ? 'Value to you' : 'Value') + '</div><div class="big">' + fmtMoney(usd, 'USD') + '</div></div>';
    if (r.price != null) html += '<div><div class="label">Price</div><div class="big">' + (r.priceVia === 'item' ? fmtNum(r.price, 0) + ' ' + esc(r.currency) : fmtMoney(r.price, r.currency)) + '</div>' + (r.priceUsd != null && r.currency !== 'USD' ? '<div class="muted">' + fmtMoney(r.priceUsd, 'USD') + (r.priceVia === 'item' ? ' at the table\'s value for ' + esc(r.currency) : (r.priceVia === 'assumed' ? ', currency unknown so taken as US$' : ' at the table\'s rate')) + '</div>' : '') + '</div>';
    if (r.personalized && Math.abs(r.personalUsd - r.totalUsd) > 1e-9) {
      html += '<div><div class="label">Generic value</div><div>' + fmtMoney(r.totalUsd, 'USD') + ' (' + fmtRatio(r.perDollar) + ')</div></div>';
    }
    html += '</div>';
    html += '<p class="muted">1× means priced like msfwar\'s average web-store offer for the same things. The "vs typical" column below shows each item on its own.</p>';
    if (r.lines.some(function (l) { return l.earlyEstimate; })) html += '<p class="muted">Early estimate: msfwar had fewer than seven observed days for some of these items.</p>';
    if (r.currency !== 'USD') html += '<p class="muted">Values are in US dollars; the price was converted with the table\'s exchange rate before any ratio.</p>';
    return html;
  }
  function renderOfferResult() {
    var offer = draftOffer();
    var box = $('offer-result');
    if (offer.contents.length === 0) {
      box.innerHTML = '<p class="muted">Add the offer\'s contents above, with the price, to see its value.</p>';
      return;
    }
    var r = E.valueOffer(offer, table(), rosterForUse(), valueOpts());
    var html = summaryBlock(r);
    if (r.price == null) html += '<p class="muted">Enter the price to get a grade.</p>';
    html += warnings(r);
    html += breakdownTable(r);
    box.innerHTML = html;
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
    if (!state.offers) {
      meta.textContent = 'No offers loaded.';
      list.innerHTML = '<p class="muted">Nothing to rank yet.</p>';
      renderBestBuys(null);
      return;
    }
    var o = state.offers;
    meta.textContent = o.offers.length + ' offers' + (o.source ? ' from ' + o.source : '') + (o.account ? ' for ' + o.account : '') + (o.updated ? ', read ' + String(o.updated).slice(0, 16).replace('T', ' ') + ' UTC' : '') + (o.origin === 'file' ? ' (data/offers.js)' : ' (pasted)');
    var ranked = E.rankOffers(o.offers, table(), rosterForUse(), valueOpts());
    {
      ranked.sort(function (a, b) {
        var av = a.personalized ? a.personalPerDollar : a.perDollar;
        var bv = b.personalized ? b.personalPerDollar : b.perDollar;
        if (a.complete !== b.complete) return a.complete ? -1 : 1;
        if (av == null && bv == null) return 0;
        if (av == null) return 1;
        if (bv == null) return -1;
        return bv - av;
      });
    }
    if (state.planOnly && state.personalize && state.plan) ranked = ranked.filter(function (r) { return r.helpsPlan !== false; });
    if (state.planOnly && state.personalize && state.plan) meta.textContent += ' · showing ' + ranked.length + ' that help your plan';
    $('store-chart').innerHTML = gradeChart();
    var rows = ranked.map(function (r, i) {
      var off = r.offer;
      var ratio = r.personalized ? r.personalPerDollar : r.perDollar;
      var usd = r.personalized ? r.personalUsd : r.totalUsd;
      var sub = [];
      if (off.section) sub.push(off.section);
      if (off.purchaseLimit != null) sub.push('limit ' + off.purchaseLimit);
      if (off.expires) sub.push('ends ' + off.expires);
      var flags = [];
      if (r.unknown.length) flags.push(r.unknown.length + ' unknown');
      if (r.thin && r.thin.length) flags.push(r.thin.length + ' thin');
      if (r.personalized && r.helpsPlan === false) flags.push('nothing for your plan');
      if (r.unpriced.length) flags.push(r.unpriced.length + ' unpriced');
      if (r.notes) flags.push('hidden items');
      var idx = o.offers.indexOf(off);
      var html = '<tr class="clickable" data-idx="' + idx + '"><td>' + esc(off.name || '(unnamed)') +
        (sub.length ? '<br><span class="muted">' + esc(sub.join(' · ')) + '</span>' : '') + '</td>' +
        '<td class="num">' + (r.priceVia === 'item' ? fmtNum(r.price, 0) + ' ' + esc(r.currency) : fmtMoney(r.price, r.currency)) + '</td>' +
        '<td class="num">' + fmtMoney(usd, 'USD') + '</td>' +
        '<td class="num">' + fmtRatio(ratio) + '</td>' +
        '<td>' + gradeBadge(r.grade) + '</td>' +
        '<td class="warn">' + esc(flags.join(', ')) + '</td></tr>';
      if (state.expanded[idx]) {
        html += '<tr class="detail"><td colspan="6">' + summaryBlock(r) + warnings(r) + breakdownTable(r) + '</td></tr>';
      }
      return html;
    }).join('');
    renderBestBuys(E.rankOffers(o.offers, table(), null, { personalize: false }));
    list.innerHTML = '<table><thead><tr><th>Offer</th><th class="num">Price</th><th class="num">' + (state.personalize && (state.roster || state.plan) ? 'Value to you' : 'Value') + '</th><th class="num">Value per US$</th><th>Grade</th><th>Flags</th></tr></thead><tbody>' + rows + '</tbody></table>';
  }
  function renderBestBuys(ranked) {
    var box = $('best-list');
    if (!box) return;
    if (!ranked || !ranked.length) { box.innerHTML = ''; return; }
    var best = E.bestPrices(ranked, table());
    if (!best.length) { box.innerHTML = '<p class="muted">Nothing in the store has a value yet.</p>'; return; }
    var cat = '';
    var rows = best.map(function (b) {
      var head = '';
      if (b.category !== cat) { cat = b.category; head = '<tr><th colspan="5">' + esc(cat) + '</th></tr>'; }
      var vs = b.typicalPerUsd && b.share ? fmtRatio(b.share.perUsd / b.typicalPerUsd) : '–';
      var cell = function (x, share) {
        if (!x) return '<td>–</td>';
        return '<td>' + esc(x.name) + '<br><span class="muted">' + (x.currency && /^[A-Z]{3}$/.test(x.currency) ? fmtMoney(x.price, x.currency) : fmtNum(x.price, 0) + ' ' + esc(x.currency || '')) + ' · ' + fmtNum(x.qty, 0) + ' for ' + fmtMoney(share ? x.sharePrice : x.priceUsd, 'USD') + '</span></td>';
      };
      var vsWhole = b.typicalPerUsd && b.whole ? fmtRatio(b.whole.perUsd / b.typicalPerUsd) : '–';
      return head + '<tr><td>' + esc(b.name) + '<br><span class="muted">' + b.offers + ' offer' + (b.offers === 1 ? '' : 's') + (b.typicalPerUsd ? ' · msfwar typical ' + fmtPerUsd(b.typicalPerUsd) + ' per US$' : '') + '</span></td>' +
        '<td class="num"><b>' + (b.whole ? fmtPerUsd(b.whole.perUsd) : '–') + '</b> per US$<br><span class="muted">' + vsWhole + ' typical</span></td>' + cell(b.whole, false) +
        '<td class="num">' + (b.share ? fmtPerUsd(b.share.perUsd) : '–') + ' per US$<br><span class="muted">' + vs + ' typical</span></td>' + cell(b.share, true) + '</tr>';
    }).join('');
    box.innerHTML = '<table><thead><tr><th>Resource</th><th class="num">Cheapest if this is all you want</th><th>in</th><th class="num">Cheapest inside a bundle</th><th>in</th></tr></thead><tbody>' + rows + '</tbody></table>';
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
    var n = normalizeOffers(p.value);
    if (!n) { alert('Expected {"offers":[...]} with at least one offer.'); return; }
    state.offers = Object.assign({ origin: 'paste' }, n);
    state.expanded = {};
    save(LS.offers, state.offers);
    $('store-paste').value = '';
    renderStatus();
    renderStore();
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
  function renderTableMeta() {
    var t = table();
    var s = tableStats(t);
    var meta = t.meta;
    $('table-meta').innerHTML =
      '<div class="muted">Source</div><div>' + esc(meta.source || '–') + (meta.sourceUrl ? ' <a href="' + esc(meta.sourceUrl) + '" target="_blank" rel="noopener" style="color:var(--accent)">link</a>' : '') + '</div>' +
      '<div class="muted">Unit</div><div><input id="meta-unit" value="' + esc(meta.unit || 'USD') + '" style="width:90px;display:inline-block"> <span class="muted">units per US dollar</span> <input id="meta-unitPerUsd" type="number" min="0" step="any" value="' + esc(meta.unitPerUsd == null ? 1 : meta.unitPerUsd) + '" style="width:90px;display:inline-block"></div>' +
      '<div class="muted">Updated</div><div>' + esc(meta.updated || 'never') + '</div>' +
      '<div class="muted">Items</div><div>' + s.priced + ' with values, ' + (s.total - s.priced) + ' without' + (Object.keys(state.overrides).length ? ', ' + Object.keys(state.overrides).length + ' local edits' : '') + (state.replacement ? ', table replaced from pasted JSON' : '') + '</div>' +
      '<div class="muted">Exchange rates</div><div>' + (meta.fxToUsd ? Object.keys(meta.fxToUsd).map(function (c) { return esc(c) + ' → US$' + meta.fxToUsd[c]; }).join(', ') : 'none (prices taken as US dollars)') + (meta.fxNote ? ' <span class="muted">' + esc(meta.fxNote) + '</span>' : '') + '</div>' +

      '<div class="muted">Grades</div><div>' + (meta.grades || E.DEFAULT_GRADES).map(function (g) { return esc(g.label) + ' ≥ ' + g.min + '×'; }).join(', ') + (meta.gradeNote ? ' <span class="muted">' + esc(meta.gradeNote) + '</span>' : '') + '</div>' +
      '<div class="muted">Maxed shards</div><div>shards of a ' + ((meta.shardRules || {}).maxStars || 7) + '-star character count ' + (((meta.shardRules || {}).maxedMultiplier || 0) * 100) + '% of their value</div>';
    $('meta-unit').addEventListener('change', function () { setOverride('__meta', { unit: $('meta-unit').value || 'USD' }); renderAll(); });
    $('meta-unitPerUsd').addEventListener('change', function () { setOverride('__meta', { unitPerUsd: Number($('meta-unitPerUsd').value) || 1 }); renderAll(); });
  }
  function renderTableRows() {
    var t = table();
    var meta = t.meta;
    var f = E.normalizeKey(state.filter);
    var keys = Object.keys(t.items).filter(function (k) {
      if (!f) return true;
      var it = t.items[k];
      return E.normalizeKey(k + ' ' + (it.name || '') + ' ' + (it.category || '') + ' ' + (it.aliases || []).join(' ')).indexOf(f) !== -1;
    }).sort(function (a, b) {
      var ca = t.items[a].category || '', cb = t.items[b].category || '';
      if (ca !== cb) return ca < cb ? -1 : 1;
      return (t.items[a].name || a) < (t.items[b].name || b) ? -1 : 1;
    });
    var rows = keys.map(function (k) {
      var it = t.items[k];
      var opts = CATEGORIES.map(function (c) { return '<option' + (it.category === c ? ' selected' : '') + '>' + c + '</option>'; }).join('');
      return '<tr data-key="' + esc(k) + '">' +
        '<td><code>' + esc(k) + '</code>' + (state.overrides[k] ? ' <span class="muted" title="edited locally">•</span>' : '') + '</td>' +
        '<td><input data-f="name" value="' + esc(it.name || '') + '"></td>' +
        '<td><select data-f="category">' + opts + '</select></td>' +
        '<td><input data-f="character" value="' + esc(it.character || '') + '" placeholder="' + (it.category === 'shard' ? 'character' : '') + '"></td>' +
        '<td><input data-f="per" type="number" min="0" step="any" value="' + esc(it.per == null ? 1 : it.per) + '" style="width:90px"></td>' +
        '<td><input data-f="value" type="number" step="any" value="' + esc(it.value == null ? '' : it.value) + '" placeholder="none" style="width:110px">' + (it.observed && it.observed.perUsd ? '<br><span class="' + (it.observed.suspect || (it.observed.observations != null && it.observed.observations < ((table().meta.scoring || {}).minObservations == null ? 5 : table().meta.scoring.minObservations)) ? 'warn' : 'muted') + '" title="' + esc(it.observed.suspect || 'msfwar observed average') + '">' + fmtNum(it.observed.perUsd, 2) + ' per $1' + (it.observed.observations != null ? ' · ' + it.observed.observations + ' obs' : '') + (it.observed.suspect ? ' · suspect' : (it.observed.earlyEstimate ? ' · early' : '')) + (it.userValue ? ' · your value' : '') + '</span>' : (it.excludeFromValue ? '<br><span class="muted">not counted</span>' : '')) + '</td>' +
        '<td><input data-f="aliases" value="' + esc((it.aliases || []).join(', ')) + '" placeholder="comma separated"></td>' +
        '<td><button class="ghost small" data-delkey="' + esc(k) + '" title="Remove">✕</button></td></tr>';
    }).join('');
    $('table-list').innerHTML = keys.length
      ? '<table><thead><tr><th>Key</th><th>Name</th><th>Category</th><th>Character</th><th>Per</th><th>Value (' + esc(meta.unit || 'USD') + ')</th><th>Aliases</th><th></th></tr></thead><tbody>' + rows + '</tbody></table>'
      : '<p class="muted">No items match.</p>';
  }
  $('table-list').addEventListener('change', function (e) {
    var el = e.target;
    var tr = el.closest('tr[data-key]');
    if (!tr || !el.dataset.f) return;
    var key = tr.dataset.key;
    var patch = {};
    var f = el.dataset.f;
    if (f === 'per') patch.per = Number(el.value) > 0 ? Number(el.value) : 1;
    else if (f === 'value') patch.value = el.value === '' ? null : Number(el.value);
    else if (f === 'aliases') patch.aliases = el.value.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    else patch[f] = el.value;
    setOverride(key, patch);
    renderStatus();
    renderDatalist();
    renderOfferResult();
    renderStore();
    renderTableMeta();
    // Re-render rows only when the sort key changed; otherwise keep the inputs so Tab moves on naturally.
    if (f === 'category' || f === 'name') renderTableRows();
    else if (!tr.querySelector('td:first-child span')) tr.querySelector('td:first-child').insertAdjacentHTML('beforeend', ' <span class="muted" title="edited locally">•</span>');
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
    if (!confirm('Replace the whole value table (and discard local edits) with the pasted JSON?')) return;
    state.replacement = { meta: v.meta || {}, items: v.items };
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

  // ---------- Plan ----------
  function renderPlan() {
    var box = $('plan-summary');
    if (!state.plan) { box.innerHTML = '<p class="muted">No build list loaded. Character-bound items count in full until one is.</p>'; syncPlanText(''); return; }
    var p = state.plan;
    var names = Object.keys(p.characters).sort();
    var res = Object.keys(p.resources || {});
    var rules = p.resourceRules || [];
    box.innerHTML = '<div class="kv">' +
      '<div class="muted">Build list</div><div>' + names.length + ' characters' + (p.origin === 'file' ? ' (data/personal.js)' : ' (edited here)') + (p.updated ? ', read ' + esc(p.updated) : '') + '</div>' +
      '<div class="muted">Off the list</div><div>shards, awakened materials and promotions for anyone else count ' + Math.round(p.offListMultiplier * 100) + '% for you</div>' +
      '<div class="muted">Surplus</div><div>resources you have enough of count ' + Math.round(p.surplusMultiplier * 100) + '%</div>' +
      '<div class="muted">Resources</div><div>' + (res.length ? res.map(function (k) { var x = p.resources[k]; return '<code>' + esc(k) + '</code> ' + esc(x.status) + (x.note ? ' <span class="muted">' + esc(x.note) + '</span>' : ''); }).join('<br>') : 'none') + '</div>' +
      '<div class="muted">Rules</div><div>' + (rules.length ? rules.map(function (r) { return esc(r.category || 'any') + (r.pattern ? ' matching <code>' + esc(r.pattern) + '</code>' : '') + ': ' + esc(r.status) + (r.note ? ' <span class="muted">' + esc(r.note) + '</span>' : ''); }).join('<br>') : 'none') + '</div>' +
      (p.sources && p.sources.length ? '<div class="muted">Sources</div><div>' + p.sources.map(esc).join('<br>') + '</div>' : '') +
      '</div>' +
      '<p class="muted" style="margin-top:10px">' + names.map(esc).join(', ') + '</p>';
    syncPlanText(names.join('\n'));
  }
  var lastPlanText = null;
  function syncPlanText(want) {
    var ta = $('plan-text');
    // Rewrite the box only when it still shows what we last put there; typed-but-unapplied edits survive re-renders.
    if (lastPlanText == null || ta.value === lastPlanText || ta.value.trim() === '') ta.value = want;
    lastPlanText = want;
  }
  $('plan-apply').addEventListener('click', function () {
    var chars = E.parseCharacterList($('plan-text').value);
    var base = state.plan || normalizePlan({});
    state.plan = Object.assign({}, base, { origin: 'edit', characters: chars, updated: new Date().toISOString() });
    save(LS.plan, state.plan);
    renderAll();
  });
  $('plan-reload').addEventListener('click', function () {
    var n = normalizePlan(window.MSF_PERSONAL);
    if (!n) { alert('data/personal.js has no plan.'); return; }
    state.plan = Object.assign({ origin: 'file' }, n);
    save(LS.plan, state.plan);
    renderAll();
  });
  $('plan-clear').addEventListener('click', function () {
    state.plan = null;
    save(LS.plan, null);
    renderAll();
  });

  // ---------- Roster ----------
  function renderRoster() {
    renderPlan();
    var box = $('roster-summary');
    if (!state.roster) { box.innerHTML = '<p class="muted">No roster loaded. Values are generic until one is.</p>'; return; }
    var chars = state.roster.characters;
    var names = Object.keys(chars);
    var maxed = names.filter(function (n) { return Number(chars[n] && chars[n].stars) >= 7; });
    box.innerHTML = '<div class="kv">' +
      '<div class="muted">Characters</div><div>' + names.length + '</div>' +
      '<div class="muted">At 7 stars</div><div>' + maxed.length + '</div>' +
      '<div class="muted">Read</div><div>' + esc(state.roster.updated || 'unknown') + (state.roster.origin === 'file' ? ' (data/roster.js)' : ' (pasted)') + '</div></div>' +
      (maxed.length ? '<p class="muted" style="margin-top:10px">Shards for: ' + maxed.map(esc).join(', ') + ' are discounted in personalized values.</p>' : '');
  }
  $('roster-import').addEventListener('click', function () {
    var p = parseJson($('roster-paste').value);
    if (!p.ok) { alert('That is not valid JSON: ' + p.error); return; }
    var n = normalizeRoster(p.value);
    if (!n) { alert('Expected {"characters":{"Name":{"stars":7}}}.'); return; }
    state.roster = Object.assign({ origin: 'paste' }, n);
    save(LS.roster, state.roster);
    $('roster-paste').value = '';
    renderAll();
  });
  $('roster-reload').addEventListener('click', function () {
    var n = normalizeRoster(window.MSF_ROSTER);
    if (!n) { alert('data/roster.js has no roster. Reload the page after it has been written.'); return; }
    state.roster = Object.assign({ origin: 'file' }, n);
    save(LS.roster, state.roster);
    renderAll();
  });
  $('roster-clear').addEventListener('click', function () {
    state.roster = null;
    save(LS.roster, null);
    renderAll();
  });

  renderAll();
})();
