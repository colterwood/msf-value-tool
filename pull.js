/*
 * Grab the live offers from the logged-in web store without a Claude session.
 *
 * extractStore(normalize) runs on https://marvelstrikeforce.com/en/store as a bookmarklet. The
 * page keeps every offer, with its complete contents and the store's resource ids, in its own
 * state (a Vuex store), so that is read first: at once, with nothing scrolled or clicked. If the
 * state is not there, it falls back to the cards: it scrolls every lazily rendered offer card
 * into view and reads each card (which shows five items and "+N More"). Either way the raw
 * result goes to `normalize`, the JSON is copied to the clipboard, and a panel on the page says
 * in words what was read (offers, items, sections) and what to do next: update.cmd, which saves
 * the read from the clipboard. The JSON itself is behind a button there; the My store tab's
 * "Import pasted offers" button takes it too.
 *
 * normalizeExtract(raw) is pure and turns either raw result (the packed state, `source: 'state'`;
 * or what the cards show: card text, "x3.6M" counts, "CA$6.99" prices) into the data/offers.js
 * shape. It is also what the playbook's Python did on the first pull, ported here so the page
 * and the bookmarklet share one definition.
 *
 * bookmarkletHref() builds the javascript: URL from the two functions above, which is why both
 * must be self-contained: they may use only their own parameters and the browser. Their comments
 * travel in that URL too, so the longer notes live up here.
 *
 * The raw state extract (what extractStore packs from the page's Vuex state `offers` module and
 * normalizeExtract reads when `source` is 'state'):
 *   { readAt, account, source: 'state', offers: [offer], chains: { <chain id>: [offer] } }
 *   offer  { id, name, description, locations: ['web_standard', ...], category: 'ID_OCAT_EVENTS',
 *            expiration: <epoch seconds>, remainingPurchases, previouslyPurchased,
 *            chain: { id, index } (chain steps only), choices: [choice] }
 *   choice { id, rewards: [line], webRewards: [line], webRealCostRewards: [line],
 *            realCost: { amount: '129.99', currency: 'CAD' } | null,
 *            itemCost: { id: 'UC' | 'BFYB-CUR' | ..., name, quantity: '1,000' } | null,
 *            unread: ['rewards.oneOf'] (only when the page gives rewards outside `allOf`) }
 *   line   { id: 'SHARD_WASPJANET', name: 'Wasp (Janet)', quantity: '7.5M' }
 * Names and quantities are the page's own strings (a name may be null); `chains` holds, per
 * chain, the steps still to buy in order, and the same steps also sit in `offers`, as on the page.
 *
 * Loaded by the page as window.MSFPull and by Node tests via module.exports.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.MSFPull = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function extractStore(normalize) {
    var here = String(location.href);
    if (here.indexOf('marvelstrikeforce.com') === -1 || here.indexOf('/store') === -1) {
      alert('Open the Store page of marvelstrikeforce.com (signed in), then click this bookmark.');
      return;
    }
    var txt = function (el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; };
    var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
    var all = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
    var busy = function () { return all('.offer-card[aria-busy="true"]'); };

    // The state route: the page's Vuex state holds every offer with all of its contents, where a
    // card shows five items and "+N More". Only read and packed here (ids, names, counts and
    // prices; no icons or art): nothing is scrolled, clicked or typed. Null when it is not there.
    function readState() {
      var app = document.querySelector('#app');
      var vm = app && app.__vue__;
      var st = vm && vm.$store && vm.$store.state && vm.$store.state.offers;
      if (!st || !Array.isArray(st.offers) || !st.offers.length) return null;
      var str = function (v) { return v == null ? null : String(v); };
      var num = function (v) { return v == null || v === '' || isNaN(Number(v)) ? null : Number(v); };
      var lines = function (group) {
        return (group && Array.isArray(group.allOf) ? group.allOf : []).filter(function (r) { return r && r.item && (r.item.id != null || r.item.name != null); }).map(function (r) {
          return { id: str(r.item.id), name: str(r.item.name), quantity: str(r.quantity) };
        });
      };
      var packChoice = function (c) {
        c = c || {};
        var out = { id: c.id == null ? null : c.id, rewards: lines(c.rewards), webRewards: lines(c.webRewards), webRealCostRewards: lines(c.webRealCostRewards), realCost: null, itemCost: null };
        if (c.realCost && c.realCost.amount != null) out.realCost = { amount: String(c.realCost.amount), currency: str(c.realCost.currency) };
        if (c.itemCost && c.itemCost.item) out.itemCost = { id: str(c.itemCost.item.id), name: str(c.itemCost.item.name), quantity: str(c.itemCost.quantity) };
        // rewards given any other way than "all of these" (a pick-one group, a bare list, an entry
        // that is itself a group) are not read: say so
        var unread = [];
        ['rewards', 'webRewards', 'webRealCostRewards'].forEach(function (k) {
          var group = c[k];
          if (Array.isArray(group)) { if (group.length) unread.push(k + ' (a list)'); return; }
          if (!group || typeof group !== 'object') return;
          Object.keys(group).forEach(function (g) { if (g !== 'allOf' && Array.isArray(group[g]) && group[g].length) unread.push(k + '.' + g); });
          (Array.isArray(group.allOf) ? group.allOf : []).forEach(function (r) { if (!r || !r.item || (r.item.id == null && r.item.name == null)) unread.push(k + ' (an entry with no item)'); });
        });
        if (unread.length) out.unread = unread;
        return out;
      };
      var packOffer = function (o) {
        o = o || {};
        var out = {
          id: str(o.id), name: str(o.name), description: typeof o.description === 'string' ? o.description : null,
          locations: Array.isArray(o.locations) ? o.locations.map(String) : [],
          category: o.heading && o.heading.category != null ? String(o.heading.category) : null,
          expiration: num(o.expiration), remainingPurchases: num(o.remainingPurchases), previouslyPurchased: !!o.previouslyPurchased,
          choices: (Array.isArray(o.choices) ? o.choices : []).map(packChoice)
        };
        if (o.chain && o.chain.id != null) out.chain = { id: String(o.chain.id), index: num(o.chain.index) };
        return out;
      };
      var chains = {};
      var daisy = st.daisychainOffers;
      if (daisy && typeof daisy === 'object') {
        Object.keys(daisy).forEach(function (id) {
          var steps = daisy[id] && Array.isArray(daisy[id].offers) ? daisy[id].offers : [];
          if (steps.length) chains[id] = steps.map(packOffer);
        });
      }
      return {
        readAt: new Date().toISOString(),
        account: txt(document.querySelector('a[href*="player/info"]')),
        source: 'state',
        offers: st.offers.map(packOffer),
        chains: chains
      };
    }
    var stateData = null;
    try {
      var packed = readState();
      if (packed) stateData = normalize(packed);
      // a state that yields no offer with anything in it is not a store read: fall back to the cards
      if (!stateData || !stateData.offers || !stateData.offers.some(function (o) { return o.contents && o.contents.length; })) stateData = null;
    } catch (e) { stateData = null; }   // anything unexpected in the state: read the cards instead

    var box = document.createElement('div');
    box.style.cssText = 'position:fixed;top:12px;right:12px;z-index:2147483647;background:#14161c;color:#fff;padding:12px 16px;font:14px/1.4 system-ui,sans-serif;border-radius:8px;max-width:420px;box-shadow:0 4px 24px rgba(0,0,0,.5)';
    var line = document.createElement('div');
    line.textContent = 'MSF Store Value: the page\'s own offer data was not found, so the offer cards are being read instead. This takes a minute or two, scrolls the page, and previews each chain step by clicking its step number. Nothing is bought.';
    box.appendChild(line);
    document.body.appendChild(box);

    // Say what was read, in words: how many offers and items, from which sections, and what to do
    // next. The JSON goes to the clipboard where the browser allows it, and stays behind a button.
    function show(data, how, instant) {
      var json = JSON.stringify(data, null, 1);
      var n = data.offers.length, items = 0, sections = {}, order = [];
      data.offers.forEach(function (o) {
        items += (o.contents || []).length;
        var s = String(o.section || 'Store').split(' / ')[0];
        if (!(s in sections)) { sections[s] = 0; order.push(s); }
        sections[s] += 1;
      });
      var say = function (text, css) { var d = document.createElement('div'); d.textContent = text; d.style.cssText = 'margin-top:6px;' + (css || ''); box.appendChild(d); return d; };
      line.style.cssText = 'font-weight:600';
      line.textContent = n ? 'MSF Store Value: your store was read. ' + n + ' offer' + (n === 1 ? '' : 's') + ' with ' + items + ' item' + (items === 1 ? '' : 's') + how + '.'
        : 'MSF Store Value: no offers were found on this page. Reload the store page, wait for the offers to show, and click the bookmark again.';
      if (n) say(order.map(function (s) { return s + ' ' + sections[s]; }).join(' \u00b7 '), 'color:#aab3c5');
      if (n && instant) say('It is instant because the store page already holds every offer as data: nothing has to scroll or load, and nothing is clicked.');
      var next = say('');
      var ta = document.createElement('textarea');
      ta.value = json;
      ta.style.cssText = 'display:none;width:100%;height:160px;margin-top:10px;font:12px monospace;color:#000;background:#fff';
      var bar = document.createElement('div');
      bar.style.cssText = 'margin-top:8px;display:flex;gap:8px;flex-wrap:wrap';
      var button = function (label, fn) { var b = document.createElement('button'); b.textContent = label; b.style.cssText = 'padding:6px 12px;font:14px system-ui'; b.onclick = fn; bar.appendChild(b); return b; };
      var then = 'double-click update.cmd in the tool folder, then reload the tool\'s page.';
      var copied = function (ok) { if (n) next.textContent = ok ? 'Copied. Next: ' + then : 'The browser did not allow the copy. Click Copy, then ' + then; };
      button('Copy', function () { ta.style.display = 'block'; ta.select(); var ok = false; try { ok = !!document.execCommand('copy'); } catch (e) { ok = false; } copied(ok); });
      button('Show what was copied', function () { ta.style.display = ta.style.display === 'block' ? 'none' : 'block'; });
      button('Close', function () { box.remove(); });
      box.appendChild(ta);
      box.appendChild(bar);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(json).then(function () { copied(true); }, function () { copied(false); });
      }
      copied(false);
    }

    if (stateData) {
      var noted = stateData.offers.filter(function (o) { return !!o.notes && !/^free claim$/.test(o.notes); }).length;
      return show(stateData, ' from the page\'s own offer data' + (noted ? '; ' + noted + ' of them could not be read completely and say so in their notes' : ', every item included'), true);
    }

    // The card route, when the state is not there.
    // The store renders a card only while it sits in the viewport, so bring each unrendered card
    // into view (instantly, not smoothly, so the pause lands with the card in place), pause, and
    // repeat the pass while the count of unrendered cards keeps falling.
    var passes = 0;
    function render() {
      var list = busy();
      if (!list.length || passes >= 10) return Promise.resolve();
      passes += 1;
      var i = 0;
      function step() {
        if (i >= list.length) {
          return sleep(1500).then(function () {
            return busy().length < list.length ? render() : Promise.resolve();
          });
        }
        if (i % 5 === 0) line.textContent = 'MSF Store Value: rendering offer cards, ' + busy().length + ' to go (pass ' + passes + '). Keep this tab in front.';
        try { list[i].scrollIntoView({ block: 'center', behavior: 'instant' }); } catch (e) { list[i].scrollIntoView(); }
        i += 1;
        return sleep(650).then(step);
      }
      return step();
    }

    var parseItems = function (wrap) {
        return all('.item-container', wrap).map(function (ic) {
          var count = txt(ic.querySelector('.item-count'));
          var kids = all(':scope > div', ic).filter(function (ch) { return !ch.classList.contains('item-count') && txt(ch); });
          var nameEl = kids[kids.length - 1];
          var raw = txt(nameEl);
          var webBonus = !!ic.querySelector('.deco-web-bonus, .web-bonus-icon') || /Web Bonus/i.test(raw);
          return { name: raw.replace(/\s*Web Bonus\s*$/i, '').trim(), count: count, webBonus: webBonus };
        });
      };
    var priceOf = function (el) {
      var btn = el.querySelector('.purchase-btn button, button.real-cost-button, button.item-cost-button') || el.querySelector('button');
      if (!btn) return null;
      var cost = btn.querySelector('.purchase-button-cost') || btn;
      var img = cost.querySelector('img');
      return { text: txt(cost), costCurrency: img ? (img.getAttribute('alt') || 'icon') : 'fiat' };
    };

    // Chain cards carry a step selector (1 2 3 4). Selecting a step previews that step's title,
    // price and contents in the card, so every level can be read. Only the step numbers are
    // clicked, never the purchase button; the originally selected step is restored afterwards.
    function readChains() {
      var cards = all('.offer-card.daisy-chain').filter(function (c) { return c.querySelectorAll('.chain-step').length > 1; });
      var ci = 0;
      function nextCard() {
        if (ci >= cards.length) return Promise.resolve();
        var card = cards[ci++];
        var steps = all('.chain-step', card);
        var originally = steps.findIndex(function (st) { var inner = st.querySelector('.step'); return inner && !/\bdeselected\b/.test(inner.className); });
        if (originally < 0) originally = 0;
        var read = [];
        var si = 0;
        function select(i) {
          var target = steps[i].querySelector('.step-inner') || steps[i].querySelector('.step') || steps[i];
          target.click();
          return sleep(600);
        }
        function nextStep() {
          if (si >= steps.length) {
            return select(originally).then(function () { card.__msfChain = { current: originally + 1, steps: read }; return nextCard(); });
          }
          var i = si++;
          return select(i).then(function () {
            read.push({ step: i + 1, title: txt(card.querySelector('p.title, .offer-info p, h1.title')) || txt(card.querySelector('p')), price: priceOf(card), items: parseItems(card), limit: txt(card.querySelector('.purchase-limit')) });
            return nextStep();
          });
        }
        line.textContent = 'MSF Store Value: reading chain offer ' + ci + ' of ' + cards.length + ' (' + steps.length + ' steps).';
        return nextStep();
      }
      return nextCard();
    }

    function readCards() {
      var h2 = '', h3 = '';
      var offers = [];
      all('h2, h3, .offer-card').forEach(function (el) {
        if (el.tagName === 'H2') { h2 = txt(el); h3 = ''; return; }
        if (el.tagName === 'H3') { h3 = txt(el); return; }
        if (el.classList.contains('items-wrapper')) return;
        var variantEls = all('.variant-wrapper > div', el);
        var variants = variantEls.length
          ? variantEls.map(function (v) { return { price: priceOf(v), items: parseItems(v) }; })
          : [{ price: priceOf(el), items: parseItems(el) }];
        var labels = all('.labels-wrapper > *, .offer-tag, .pass-label-wrapper', el).filter(function (e) { return !e.classList.contains('timer'); }).map(txt).filter(Boolean);
        offers.push({
          section: h2, sub: h3,
          chainSteps: el.__msfChain ? el.__msfChain.steps : undefined,
          chainCurrent: el.__msfChain ? el.__msfChain.current : undefined,
          title: txt(el.querySelector('p.title, .offer-info p, h1.title')) || txt(el.querySelector('p')),
          description: txt(el.querySelector('.description')),
          timer: txt(el.querySelector('.timer .time')),
          labels: labels,
          limit: txt(el.querySelector('.purchase-limit')),
          flags: String(el.className).split(' ').filter(function (c) { return c && !/^tentpole|^is-unselectable$|^offer-card$|^animations-paused$|^defer-offscreen-rendering$/.test(c); }),
          variants: variants
        });
      });
      var cores = all('.core-card').map(function (c) {
        var sec = c.closest('.power-core-offers') ? 'Power Cores' : 'Ultra Cores';
        return {
          section: sec,
          name: txt(c.querySelector('.offer-footer p')),
          count: txt(c.querySelector('.offer-header > .item-count')),
          price: txt(c.querySelector('.purchase-button-cost')),
          bonus: all('.item-container', c).map(function (ic) { return { name: 'Strike Points', count: txt(ic.querySelector('.item-count')) }; })
        };
      });
      return {
        readAt: new Date().toISOString(),
        account: txt(document.querySelector('a[href*="player/info"]')),
        currencyToggle: txt(document.querySelector('.currency-toggle .is-active')),
        offers: offers,
        cores: cores
      };
    }

    return render().then(readChains).then(function () {
      var data = normalize(readCards());
      return show(data, ' from the offer cards, which hide what is behind "+N More"' + (busy().length ? ' (' + busy().length + ' cards never rendered)' : ''));
    });
  }

  function normalizeExtract(raw) {
    var parseCount = function (s) {
      var m = String(s || '').trim().match(/^x?\s*([\d,\.]+)\s*([KkMm]?)$/);
      if (!m) return null;
      var n = parseFloat(m[1].replace(/,/g, ''));
      var mult = { '': 1, k: 1000, m: 1000000 }[m[2].toLowerCase()];
      var v = n * mult;
      return Math.abs(v - Math.round(v)) < 1e-6 ? Math.round(v) : v;
    };
    var parsePrice = function (p) {
      if (!p || !p.text) return { price: null, currency: null, note: null };
      if (p.costCurrency === 'fiat') {
        var m = p.text.match(/^(CA\$|US\$|AU\$|NZ\$|\$|€|£)\s*([\d,\.]+)$/);
        if (!m) return { price: null, currency: null, note: 'price unreadable: ' + p.text };
        var cur = { 'CA$': 'CAD', 'US$': 'USD', 'AU$': 'AUD', 'NZ$': 'NZD', '$': 'USD', '€': 'EUR', '£': 'GBP' }[m[1]];
        return { price: parseFloat(m[2].replace(/,/g, '')), currency: cur, note: null };
      }
      return { price: parseCount(p.text), currency: p.costCurrency, note: null };
    };
    var parseLimit = function (s) {
      var m = String(s || '').match(/(\d+)\s*purchases? left/);
      return m ? parseInt(m[1], 10) : null;
    };
    var offers = [];
    var seen = {};
    var seenChains = {};
    var stripCounter = function (t) { return String(t || '').replace(/^\s*\(\d+\s*\/\s*\d+\)\s*/, '').replace(/\s*\(\d+\s*\/\s*\d+\)\s*$/, '').trim(); };
    var parseContents = function (items, notes) {
      var contents = [];
      (items || []).forEach(function (it) {
        var nm = String(it.name || '').trim();
        var more = nm.match(/^\+\s*(\d+)\s*More/i);
        if (more || nm.charAt(0) === '+') {
          notes.push(more ? more[1] + ' more item(s) not shown on the card' : 'more items not shown on the card');
          return;
        }
        if (!nm) {
          if (it.count) notes.push('item with no name (qty ' + it.count + ')');
          return;
        }
        var qty = parseCount(it.count);
        var row = { item: nm, qty: qty };
        if (it.webBonus) row.webBonus = true;
        if (qty == null) notes.push('qty unreadable for ' + nm);
        contents.push(row);
      });
      return contents;
    };

    // The state route: raw.offers and raw.chains were packed by extractStore from the page's own
    // offer data (the shape is at the top of pull.js), so every line of every offer is there.
    var fromState = !!raw && raw.source === 'state';
    var stateOffers = function () {
      var clean = function (s) { return s == null ? '' : String(s).replace(/\s+/g, ' ').trim(); };   // \s takes non-breaking spaces too
      var parseQty = function (s) {
        var m = String(s == null ? '' : s).replace(/\s+/g, '').match(/^x?(\d[\d,]*\.?\d*|\.\d+)([KMB]?)$/i);
        if (!m) return null;
        var v = parseFloat(m[1].replace(/,/g, '')) * { '': 1, K: 1e3, M: 1e6, B: 1e9 }[m[2].toUpperCase()];
        return Math.abs(v - Math.round(v)) < 1e-6 ? Math.round(v) : v;
      };
      // "15d 4h", "4h 12m", "12m 30s", as the cards show it: the time from the read to the expiry.
      var readAt = Date.parse(raw.readAt);
      var timeLeft = function (expiration) {
        var end = Number(expiration);
        if (expiration == null || !(end > 0) || isNaN(readAt)) return null;
        if (end > 1e11) end = end / 1000;                       // milliseconds rather than seconds
        var s = Math.floor(end - readAt / 1000);
        if (s <= 0) return null;
        var d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60);
        return d ? d + 'd ' + h + 'h' : h ? h + 'h ' + m + 'm' : m + 'm ' + (s % 60) + 's';
      };
      // The store names a shard or a promotion line with the character alone; the id says which.
      var lineName = function (r) {
        var id = r.id == null ? '' : String(r.id);
        var nm = clean(r.name);
        var m;
        if (!nm) return id;
        if (/^SHARD_/.test(id)) return /\bshards?$/i.test(nm) ? nm : nm + ' shards';
        if ((m = id.match(/^RS_.+_(\d+)$/))) return nm + ' \u2014 ' + m[1] + ' red star promotion';
        if ((m = id.match(/^PD_.+_(\d+)$/))) return nm + ' \u2014 ' + m[1] + ' diamond promotion';
        return nm;
      };
      var readLines = function (list, webBonus, contents, notes) {
        (list || []).forEach(function (r) {
          r = r || {};
          var item = lineName(r);
          if (!item) {
            if (r.quantity != null) notes.push('item with no name (qty ' + r.quantity + ')');
            return;
          }
          var qty = parseQty(r.quantity);
          var row = { item: item, id: r.id == null ? null : String(r.id), qty: qty };
          if (webBonus) row.webBonus = true;
          if (qty == null) notes.push('qty unreadable for ' + item);
          contents.push(row);
        });
      };
      // One choice of an offer: everything it gives and what it costs. Money first; an offer sold
      // only for an item (Strike Points in the Strike Store) is priced in that item; the Ultra
      // Core price beside a money price is only recorded.
      var readChoice = function (c) {
        c = c || {};
        var notes = [];
        var contents = [];
        readLines(c.rewards, false, contents, notes);
        readLines(c.webRewards, true, contents, notes);
        readLines(c.webRealCostRewards, true, contents, notes);
        if (c.unread && c.unread.length) notes.push('rewards not read: ' + c.unread.join(', '));
        var out = { price: null, currency: null, paidWith: null, ultraCores: null, contents: contents, notes: notes, empty: false };
        var amount = c.realCost && c.realCost.amount != null ? String(c.realCost.amount).replace(/,/g, '').trim() : '';
        var money = amount === '' ? null : Number(amount);
        var cost = c.itemCost && (c.itemCost.id != null || c.itemCost.name != null) ? c.itemCost : null;
        var costQty = cost ? parseQty(cost.quantity) : null;
        if (cost && cost.id === 'UC' && costQty > 0) out.ultraCores = costQty;
        if (money != null && isNaN(money)) notes.push('price unreadable: ' + c.realCost.amount);
        else if (money > 0) { out.price = money; out.currency = c.realCost.currency || null; }
        else if (cost && costQty !== 0) {
          out.price = costQty;
          out.currency = out.paidWith = cost.id === 'BFYB-CUR' ? 'Strike Points' : cost.id === 'UC' ? 'Ultra Cores' : clean(cost.name) || String(cost.id);
          if (costQty == null) notes.push('price unreadable: ' + cost.quantity);
        } else {
          out.empty = !contents.length && !notes.length;   // no price and nothing in it: not an offer
          notes.push('free claim');
        }
        return out;
      };
      var sectionOf = function (o) {
        var locations = (o.locations || []).map(String);
        var at = function (prefix) { return locations.some(function (l) { return l.indexOf(prefix) === 0; }); };
        if (at('power_cores')) return 'Power Cores';
        if (at('ultra_cores')) return 'Ultra Cores';
        if (at('bfyb')) return 'STRIKE STORE';
        if (at('web_battlepass')) return 'battle pass and s.t.r.i.k.e pass offers';
        if (at('web_timeheist')) return 'Time Heist';
        var category = String(o.category || '').replace(/^ID_OCAT_/, '').replace(/_/g, ' ').trim();
        if (category === 'CHARACTER UNLOCK') category = 'UNLOCKED OFFERS';   // the heading the page shows
        return category ? 'Offers / ' + category : 'Offers';
      };
      var entryOf = function (o, name, section, ch, chain) {
        var left = o.remainingPurchases == null || o.remainingPurchases === '' ? NaN : Number(o.remainingPurchases);
        var entry = {
          name: name, price: ch.price, currency: ch.currency,
          purchaseLimit: isNaN(left) ? null : left, expires: timeLeft(o.expiration),
          section: section, sections: [section], contents: ch.contents
        };
        if (o.previouslyPurchased) entry.boughtBefore = true;
        if (chain) entry.chain = chain;
        if (ch.paidWith) entry.paidWith = ch.paidWith;
        if (ch.ultraCores != null) entry.ultraCores = ch.ultraCores;
        if (clean(o.description)) entry.description = clean(o.description);
        if (ch.notes.length) entry.notes = ch.notes.join('; ');
        return entry;
      };
      var plain = function (o) {
        var choices = o.choices || [];
        var title = clean(o.name);
        var section = choices.length > 1 ? 'dual offers' : sectionOf(o);
        if (!choices.length) {
          var bare = entryOf(o, title || '(untitled)', section, { price: null, currency: null, contents: [], notes: ['no purchase option could be read for this offer'] });
          offers.push(bare);
          return;
        }
        choices.forEach(function (c, ci) {
          var ch = readChoice(c);
          if (ch.empty) return;
          var sig = [title, ch.price, ch.currency, JSON.stringify(ch.contents.map(function (x) { return [x.id, x.item, x.qty]; }))].join('|');
          var entry = entryOf(o, (title || '(untitled)') + (choices.length > 1 ? ' (option ' + (ci + 1) + ')' : ''), section, ch);
          if (seen[sig]) { seen[sig].sections = seen[sig].sections.concat(entry.sections); if (entry.boughtBefore) seen[sig].boughtBefore = true; return; }
          seen[sig] = entry;
          offers.push(entry);
        });
      };

      // Chains. raw.chains lists the steps of each chain that are still to buy, in order; the same
      // steps sit in raw.offers too, where they are skipped. A step's number and the chain's
      // length come from the counter in its name: "(1/7) Savage Leader", "Cores Pack (2/5)".
      var counter = function (name) {
        var m = String(name || '').match(/^\s*\((\d+)\s*\/\s*(\d+)\)/) || String(name || '').match(/\((\d+)\s*\/\s*(\d+)\)\s*$/);
        return m ? { step: parseInt(m[1], 10), of: parseInt(m[2], 10) } : null;
      };
      var groups = {};    // '#' + chain id -> { steps: [{ offer, listed }], has: {}, done }
      var owner = {};     // '#' + offer id -> chain id, for the steps raw.chains lists
      var join = function (chainId, o, listed) {
        var g = groups['#' + chainId] || (groups['#' + chainId] = { steps: [], has: {}, done: false });
        var key = o.id != null ? 'id:' + o.id : 'name:' + o.name;
        if (g.has[key]) return;
        g.has[key] = true;
        g.steps.push({ offer: o, listed: listed });
        if (listed && o.id != null) owner['#' + o.id] = chainId;
      };
      var chainOf = function (o) {
        if (o.id != null && owner['#' + o.id] != null) return owner['#' + o.id];
        return o.chain && o.chain.id != null ? String(o.chain.id) : null;
      };
      var emitChain = function (chainId) {
        var g = groups['#' + chainId];
        if (!g || g.done) return;
        g.done = true;
        var used = {};
        var last = 0;
        var total = 0;
        var steps = g.steps.map(function (s) {
          var o = s.offer;
          var c = counter(o.name);
          var index = o.chain ? Number(o.chain.index) : NaN;
          var n = c ? c.step : (index >= 1 && !used[index] ? index : last + 1);
          used[n] = true;
          last = n;
          total = Math.max(total, n, c ? c.of : 0);
          var ch = readChoice((o.choices || [])[0]);
          if ((o.choices || []).length > 1) ch.notes.push((o.choices.length - 1) + ' more option(s) on this step not read');
          return { offer: o, listed: s.listed, step: n, title: stripCounter(clean(o.name)), choice: ch };
        });
        steps.sort(function (a, b) { return a.step - b.step; });
        // the first step the store still lists is the current one: the first not bought yet
        var lead = steps.filter(function (s) { return s.listed; })[0] || steps[0];
        var leadIndex = lead.offer.chain ? Number(lead.offer.chain.index) : NaN;
        var current = leadIndex >= 1 ? leadIndex : lead.step;
        var baseName = lead.title || 'Chain';
        steps.forEach(function (s) { s.name = s.title || (baseName + ' step ' + s.step); });
        var packed = steps.map(function (s) {
          var y = { step: s.step, name: s.name, price: s.choice.price, currency: s.choice.currency, contents: s.choice.contents };
          if (s.choice.ultraCores != null) y.ultraCores = s.choice.ultraCores;   // the same step paid in Ultra Cores
          if (s.choice.notes.length) y.notes = s.choice.notes.join('; ');
          return y;
        });
        steps.forEach(function (s) {
          offers.push(entryOf(s.offer, s.name + ' (step ' + s.step + ' of ' + total + ')', 'Chain Offers', s.choice, { name: baseName, step: s.step, of: total, current: current, steps: packed }));
        });
      };
      var chains = raw.chains || {};
      Object.keys(chains).forEach(function (chainId) {
        (Array.isArray(chains[chainId]) ? chains[chainId] : []).forEach(function (o) { if (o) join(chainId, o, true); });
      });
      var list = (raw.offers || []).filter(Boolean);
      list.forEach(function (o) { var chainId = chainOf(o); if (chainId != null) join(chainId, o, false); });
      list.forEach(function (o) {
        var chainId = chainOf(o);
        if (chainId != null) emitChain(chainId);
        else plain(o);
      });
      Object.keys(chains).forEach(emitChain);   // a chain the offer list does not repeat
    };
    if (fromState) stateOffers();

    // The card route (skipped for a state read).
    (fromState ? [] : raw.offers || []).forEach(function (o) {
      if (o.section === 'Power Cores' || o.section === 'Ultra Cores') return;
      var section = o.section + (o.sub ? ' / ' + o.sub : '');
      if (o.chainSteps && o.chainSteps.length > 1) {
        var baseName = stripCounter(o.title) || 'Chain';
        var steps = o.chainSteps.map(function (st) {
          var pp = parsePrice(st.price);
          var notes = [];
          var contents = parseContents(st.items, notes);
          if (pp.note) notes.push(pp.note);
          else if (pp.price == null) notes.push('price unreadable');
          return { step: st.step, name: stripCounter(st.title) || (baseName + ' step ' + st.step), price: pp.price, currency: pp.currency, contents: contents, notes: notes.length ? notes.join('; ') : undefined, limit: st.limit };
        });
        var current = Number(o.chainCurrent) || 1;
        var chainSig = 'chain|' + baseName + '|' + JSON.stringify(steps.map(function (x) { return [x.price, x.currency, x.contents.map(function (c) { return [c.item, c.qty]; })]; }));
        if (seenChains[chainSig]) {
          seenChains[chainSig].forEach(function (e) { e.sections.push(section); });
          return;
        }
        var emitted = [];
        var packed = steps.map(function (x) { var y = { step: x.step, name: x.name, price: x.price, currency: x.currency, contents: x.contents }; if (x.notes) y.notes = x.notes; return y; });
        steps.forEach(function (st) {
          var entry = {
            name: st.name + ' (step ' + st.step + ' of ' + steps.length + ')',
            price: st.price, currency: st.currency,
            purchaseLimit: parseLimit(st.limit), expires: o.timer || null,
            section: section, sections: [section], contents: st.contents,
            chain: { name: baseName, step: st.step, of: steps.length, current: current, steps: packed }
          };
          if (st.notes) entry.notes = st.notes;
          if (o.description && st.step === current) entry.description = o.description;
          offers.push(entry);
          emitted.push(entry);
        });
        seenChains[chainSig] = emitted;
        return;
      }
      (o.variants || []).forEach(function (v, vi) {
        if (!v.price && !(v.items && v.items.length)) return;
        var pp = parsePrice(v.price);
        var notes = [];
        var contents = parseContents(v.items, notes);
        if (pp.note) notes.push(pp.note);
        var name = o.title || '(untitled)';
        if ((o.variants || []).length > 1) name += ' (option ' + (vi + 1) + ')';
        var sig = [o.title, pp.price, pp.currency, JSON.stringify(contents.map(function (c) { return [c.item, c.qty]; }))].join('|');
        if (seen[sig]) { seen[sig].sections.push(section); return; }
        var entry = {
          name: name, price: pp.price, currency: pp.currency,
          purchaseLimit: parseLimit(o.limit), expires: o.timer || null,
          section: section, sections: [section], contents: contents
        };
        if (pp.currency && ['CAD', 'USD', 'AUD', 'NZD', 'EUR', 'GBP'].indexOf(pp.currency) === -1) entry.paidWith = pp.currency;
        if (o.description) entry.description = o.description;
        if ((o.flags || []).indexOf('daisy-chain') !== -1) entry.chain = true;
        if (notes.length) entry.notes = notes.join('; ');
        seen[sig] = entry;
        offers.push(entry);
      });
    });
    (fromState ? [] : raw.cores || []).forEach(function (c) {
      var pp = parsePrice({ text: c.price, costCurrency: 'fiat' });
      var item = c.name.indexOf(' of ') !== -1 ? c.name.split(' of ').pop() : c.name;
      var contents = [{ item: item, qty: parseCount(c.count) }];
      (c.bonus || []).forEach(function (b) { contents.push({ item: 'Strike Points', qty: parseCount(b.count), webBonus: true }); });
      offers.push({ name: c.name, price: pp.price, currency: pp.currency, purchaseLimit: null, expires: null, section: c.section, sections: [c.section], contents: contents });
    });
    offers.forEach(function (e) {
      var uniq = {};
      e.sections.forEach(function (s) { uniq[s] = true; });
      e.sections = Object.keys(uniq).sort();
    });
    var currencies = {};
    offers.forEach(function (e) { if (e.currency && !e.paidWith) currencies[e.currency] = (currencies[e.currency] || 0) + 1; });
    var priceCurrency = Object.keys(currencies).sort(function (a, b) { return currencies[b] - currencies[a]; })[0] || null;
    return {
      updated: raw.readAt || new Date().toISOString(),
      source: 'web-store',
      bookmarklet: '2026-11-15',   // the version of this code; the page compares it with BOOKMARKLET_VERSION on import
      account: raw.account || null,
      priceCurrency: priceCurrency,
      note: fromState
        ? 'Read from the logged-in web store with the MSF Store Value bookmarklet, from the page\'s own offer data: every offer lists all of its contents (nothing is hidden behind "+N More"), and each line carries the store\'s resource id.'
        : 'Read from the logged-in web store with the MSF Store Value bookmarklet. Cards that show "+N More" hide part of their contents; those offers carry a notes field and grade as incomplete.',
      offers: offers
    };
  }

  /** Bump together with the `bookmarklet` stamp in normalizeExtract whenever the bookmarklet's behaviour changes. */
  var BOOKMARKLET_VERSION = '2026-11-15';

  function bookmarkletHref() {
    var src = '(' + extractStore.toString() + ')(' + normalizeExtract.toString() + ')';
    return 'javascript:' + encodeURIComponent(src);
  }

  /**
   * For a Claude session driving Chrome: the state-reading part of extractStore on its own, as a
   * short snippet to run on the store page. It only reads: the packed raw extract is left on
   * window.__msfRaw as JSON (move it out through the console in chunks, then give it to
   * normalizeExtract or tools/save-store.js) and a small summary is returned, null when the page
   * state is not there. Cut from extractStore's own source so the two cannot drift apart.
   */
  function stateSnippet() {
    var src = extractStore.toString();
    var a = src.indexOf('function readState()');
    var b = src.indexOf('var stateData = null;');
    if (a === -1 || b === -1 || b < a) throw new Error('readState was not found in extractStore');
    return '(function () { var txt = function (el) { return el ? el.textContent.replace(/\\s+/g, " ").trim() : ""; }; ' + src.slice(a, b) +
      ' var raw = readState(); window.__msfRaw = raw ? JSON.stringify(raw) : null;' +
      ' return raw ? { offers: raw.offers.length, chains: Object.keys(raw.chains).length, chars: window.__msfRaw.length, readAt: raw.readAt } : null; })()';
  }

  return {
    extractStore: extractStore,
    normalizeExtract: normalizeExtract,
    stateSnippet: stateSnippet,
    bookmarkletHref: bookmarkletHref, BOOKMARKLET_VERSION: BOOKMARKLET_VERSION
  };
});
