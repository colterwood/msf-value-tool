/*
 * Grab the live offers from the logged-in web store without a Claude session.
 *
 * extractStore(normalize) runs on https://marvelstrikeforce.com/en/store as a bookmarklet: it
 * scrolls every lazily rendered offer card into view, reads each card, hands the raw result to
 * `normalize`, copies the JSON to the clipboard and shows it in a box on the page. The My store
 * tab's "Import pasted offers" button takes that JSON.
 *
 * normalizeExtract(raw) is pure and turns what the store page shows (card text, "x3.6M" counts,
 * "CA$6.99" prices) into the data/offers.js shape. It is also what the playbook's Python did
 * on the first pull, ported here so the page and the bookmarklet share one definition.
 *
 * bookmarkletHref() builds the javascript: URL from the two functions above, which is why both
 * must be self-contained: they may use only their own parameters and the browser.
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

    var box = document.createElement('div');
    box.style.cssText = 'position:fixed;top:12px;right:12px;z-index:2147483647;background:#14161c;color:#fff;padding:12px 16px;font:14px/1.4 system-ui,sans-serif;border-radius:8px;max-width:420px;box-shadow:0 4px 24px rgba(0,0,0,.5)';
    var line = document.createElement('div');
    line.textContent = 'MSF Store Value: rendering offer cards, this takes a minute or two.';
    box.appendChild(line);
    document.body.appendChild(box);

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
      var raw = readCards();
      var data = normalize(raw);
      var json = JSON.stringify(data, null, 1);
      line.textContent = 'MSF Store Value: ' + data.offers.length + ' offers read' + (busy().length ? ' (' + busy().length + ' cards never rendered)' : '') + '. Copy the box below, then paste it on the My store tab and click Import.';
      var ta = document.createElement('textarea');
      ta.value = json;
      ta.style.cssText = 'display:block;width:100%;height:160px;margin-top:10px;font:12px monospace;color:#000;background:#fff';
      var bar = document.createElement('div');
      bar.style.cssText = 'margin-top:8px;display:flex;gap:8px';
      var copy = document.createElement('button');
      copy.textContent = 'Copy';
      copy.style.cssText = 'padding:6px 12px;font:14px system-ui';
      copy.onclick = function () { ta.select(); try { document.execCommand('copy'); } catch (e) { /* nothing */ } copy.textContent = 'Copied'; };
      var close = document.createElement('button');
      close.textContent = 'Close';
      close.style.cssText = 'padding:6px 12px;font:14px system-ui';
      close.onclick = function () { box.remove(); };
      bar.appendChild(copy);
      bar.appendChild(close);
      box.appendChild(ta);
      box.appendChild(bar);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(json).then(function () { copy.textContent = 'Copied'; }, function () { /* the box is still there */ });
      }
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
    (raw.offers || []).forEach(function (o) {
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
    (raw.cores || []).forEach(function (c) {
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
      account: raw.account || null,
      priceCurrency: priceCurrency,
      note: 'Read from the logged-in web store with the MSF Store Value bookmarklet. Cards that show "+N More" hide part of their contents; those offers carry a notes field and grade as incomplete.',
      offers: offers
    };
  }

  function bookmarkletHref() {
    var src = '(' + extractStore.toString() + ')(' + normalizeExtract.toString() + ')';
    return 'javascript:' + encodeURIComponent(src);
  }

  return {
    extractStore: extractStore,
    normalizeExtract: normalizeExtract,
    bookmarkletHref: bookmarkletHref
  };
});
