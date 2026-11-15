'use strict';
/*
 * Prices every item from this player's own store reads, and nothing else. tools/refresh.js is the
 * command around it; nothing here touches the network or the disk.
 *
 * The archive (data/reads.json) keeps every offer of every read that was read completely and
 * priced in money, with its price in CA$ and in Ultra Cores. From it, for each currency, read
 * day by read day in order:
 *
 *   1. An item sold on its own that day (an offer with one counted line) has a price that day:
 *      the cheapest of its own offers, the best way to buy it then.
 *   2. An offer in which nothing has ever been sold on its own, up to that day, is a set: its
 *      price is split evenly, line by line, and each line has that price that day (T3 Level 4
 *      and Level 5 Ions, the pieces of a gear pack). The cheapest such split is the day's price.
 *   3. The USUAL price of an item is the best of its day prices that was matched or beaten at
 *      least two thirds of the time, over the reads of the last six months BEFORE the read being
 *      rated. Each read counts for the days it stands for: half the gap to the read before it and
 *      half the gap to the read after it, at most a week each way. So today's offers never set
 *      their own yardstick, reading the store every day of a sale adds days and not votes, and a
 *      sale price only becomes the usual one once it has stood for two thirds of the record.
 *   4. An item with no earlier day price is priced by the rated read itself, the same two ways,
 *      and marked firstSeen: it rates about 1x by construction until a second read exists.
 *
 * Anything else has no price: an item that only ever comes beside things sold on their own
 * (T1 to T3 ability materials next to T4, a promotion next to shards) is never guessed at. An
 * offer that holds one is rated on the rest and marked incomplete: its value is a floor.
 *
 * The stat crystals of a tier are one thing for pricing whatever their class and stat (a "family"):
 * the store sells a trait of T3 crystals at the same price for every class. Everything tied to one
 * character (shards, promotions, awakened materials) is priced for that character alone.
 *
 * Not evidence: a chain step that cannot be bought yet or was already bought (only what could be
 * bought that day on its own counts), and an offer holding a pass tier or a Time Heist level,
 * which the store does not itemize. Event points and Strike Points are never counted.
 *
 * Ultra Core prices: a read from the page's own data carries each offer's core price. A card read
 * does not, but every money offer pays a web bonus of 10 Strike Points per Ultra Core of its
 * price, so its core price is that bonus divided by ten; without a bonus line, the core price of
 * its CA$ price tier when the reads show only one for that tier.
 */
const E = require('../engine.js');

/* ---------- rows for store resource ids ---------- */

/** The value-table category a store resource id belongs to. */
function categoryForId(id) {
  const s = String(id);
  if (/^SHARD_/.test(s)) return 'shard';
  if (/^(RS|PD)_.+_\d+$/.test(s)) return 'promotion';
  if (E.isPointsId(s)) return 'points';
  if (/^GACHA/.test(s)) return 'orb';
  if (/^ISOITEM_|^ISO8[-_]/.test(s)) return 'iso8';
  if (/^GEAR_/.test(s)) return 'gear';
  if (/^ABILITY_MATERIAL/.test(s)) return 'ability';
  if (/^CONSUMABLE_XP/.test(s)) return 'training';
  return 'other';
}

function slug(name) { return String(name).trim().toLowerCase().replace(/\s+/g, '_'); }

const idsOf = E.itemIds;
function idIndex(table) {
  const out = {};
  Object.keys(table.items).forEach((k) => { idsOf(table.items[k]).forEach((id) => { if (!(id in out)) out[id] = k; }); });
  return out;
}
function addId(item, id) {
  if (idsOf(item).indexOf(String(id)) !== -1) return;
  if (!item.id) item.id = String(id);
  else (item.ids = item.ids || []).push(String(id));
}
/** An id without the hash the store appends to some of them (GACHA_CRATE_X_TOKEN_1a2b3c4d). */
function idStem(id) { return String(id).replace(/_[0-9a-f]{8}$/i, ''); }
/** An id that is nothing but a hash (GACHA_0bb6fd31...): it names no product, so only the label can. */
function isHashId(id) { return /^[A-Z]+_[0-9a-f]{24,}$/i.test(String(id)); }

const AWAKENED = /^(.*?)['’]s\s+(Basic|Special|Ultimate|Passive)\s+Awakened Ability Material$/i;

/**
 * The row for a store resource id, created when the table has none. A row with the same name
 * takes the id when it is the same kind of thing and either has no id yet, is an event-points row
 * (every month brings a new id for the same name), already answers to the same id with another
 * hash, or both ids are bare hashes. Otherwise the id is a different product that happens to
 * share a label, and gets a row of its own. Returns { key, created }.
 */
function ensureRow(table, ctx, id, label) {
  id = String(id);
  if (ctx.byId[id]) return { key: ctx.byId[id], created: false };
  const category = categoryForId(id);
  const name = String(label == null || label === '' ? id : label).replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
  const wanted = E.normalizeKey(category === 'shard' ? name.replace(/\s+shards?$/i, '') + ' shards' : name);
  const found = E.resolveItem(table, ctx.index, name);
  const candidates = [];
  if (found && Object.prototype.hasOwnProperty.call(table.items, found.key)) candidates.push(found.key);
  Object.keys(table.items).forEach((k) => { if (candidates.indexOf(k) === -1 && E.normalizeKey(table.items[k].name) === wanted) candidates.push(k); });
  for (let i = 0; i < candidates.length; i++) {
    const row = table.items[candidates[i]];
    const sameKind = (row.category === 'shard') === (category === 'shard') && (row.category === 'promotion') === (category === 'promotion') && !!row.excludeFromValue === (category === 'points');
    const has = idsOf(row);
    const sameProduct = !has.length || category === 'points' || has.some((x) => idStem(x) === idStem(id)) || (isHashId(id) && has.every(isHashId));
    if (sameKind && sameProduct) { addId(row, id); ctx.byId[id] = candidates[i]; ctx.index['#' + id] = candidates[i]; return { key: candidates[i], created: false }; }
  }
  let key;
  const row = { name: name, category: category, per: 1, value: null, aliases: [], id: id };
  if (category === 'shard') {
    const character = name.replace(/\s+shards?$/i, '');
    row.name = character + ' shards'; row.character = character;
    key = 'shard:' + character.toLowerCase();
  } else if (category === 'promotion') {
    const m = /^(.*?)\s+[—-]\s+\d+\s+(red star|diamond) promotion$/i.exec(name);
    if (m) row.character = m[1];
    key = 'promotion:' + slug(name);
  } else if (category === 'points') {
    row.excludeFromValue = true;
    row.note = 'event or loyalty points: not counted';
    key = 'points:' + slug(name.replace(/\s+milestone points$/i, ''));
  } else if (category === 'orb') key = 'orb:' + slug(name.replace(/\s+orb fragments?$/i, ''));
  else if (category === 'iso8') key = 'iso8:' + slug(name);
  else if (category === 'gear') key = 'gear:' + slug(name);
  else if (category === 'ability') {
    const a = AWAKENED.exec(name);
    if (a) row.character = a[1];            // a character's own material: listed under that character
    key = 'ability_material:' + slug(name.replace(/\s+ability material$/i, ''));
  } else if (category === 'training') key = 'training_module:' + slug(name);
  else key = 'other:' + slug(name);
  let n = 2; const base = key;
  while (Object.prototype.hasOwnProperty.call(table.items, key)) key = base + '_' + (n++);
  table.items[key] = row;
  ctx.byId[id] = key;
  ctx.index['#' + id] = key;
  [key, row.name].concat(row.character && category === 'shard' ? [row.character + ' shards', row.character + ' shard', row.character] : []).forEach((a) => { const k = E.normalizeKey(a); if (k && !(k in ctx.index)) ctx.index[k] = key; });
  return { key: key, created: true };
}

/**
 * What an item is priced as. Most items are themselves; the stat crystals of a tier share one
 * price whatever their class and stat.
 */
function familyOf(key, item) {
  const name = String((item && item.name) || '');
  const m = /^(T\d) \w+ (Armor|Damage|Focus|Health|Resist) Level 1 Iso-8$/i.exec(name);
  return m ? 'family:' + m[1].toLowerCase() + '_crystals' : key;
}
function familyLabel(fam) {
  const m = /^family:(t\d)_crystals$/.exec(fam);
  return m ? m[1].toUpperCase() + ' stat crystals (any class and stat)' : fam;
}

/* ---------- the archive of reads ---------- */

function emptyArchive() {
  return { note: 'Every offer of every store read that was read completely and priced in money: the evidence tools/refresh.js prices the value table from. Lines are [store resource id, quantity] for reads from the page data and ["=Name", quantity] for card reads, which show no id. days: the CA$ price on each read day; cores: the Ultra Core price where the read gave one; locked: days on which the offer was a chain step that could not be bought on its own. Written by tools/refresh.js.', updated: null, names: {}, reads: {}, offers: [] };
}
function lineSig(lines) { return lines.map((l) => l[0] + ':' + l[1]).sort().join(','); }
function offerSig(o) { return o.title + '|' + o.cur + '|' + lineSig(o.lines); }

/** The same id listed twice in an offer (web bonus lines, split stacks) is one line. */
function mergeLines(pairs) {
  const acc = {}, order = [];
  pairs.forEach((p) => { if (!(p[0] in acc)) { acc[p[0]] = 0; order.push(p[0]); } acc[p[0]] += Number(p[1]); });
  return order.map((id) => [id, Math.round(acc[id] * 1000) / 1000]);
}

/** Add an offer's days to the archive. Returns { added } (a new offer) and the days that changed. */
function addToArchive(archive, entry) {
  const idx = archive._sig || (archive._sig = (function () { const m = {}; archive.offers.forEach((o) => { m[offerSig(o)] = o; }); return m; })());
  const s = offerSig(entry);
  const have = idx[s];
  if (!have) { idx[s] = entry; archive.offers.push(entry); return { added: true, days: Object.keys(entry.days).length }; }
  let days = 0;
  Object.keys(entry.days).forEach((d) => { if (have.days[d] !== entry.days[d]) { have.days[d] = entry.days[d]; days += 1; } });
  Object.keys(entry.cores || {}).forEach((d) => { have.cores = have.cores || {}; have.cores[d] = entry.cores[d]; });
  Object.keys(entry.locked || {}).forEach((d) => { have.locked = have.locked || {}; have.locked[d] = true; });
  return { added: false, days: days };
}

/**
 * Take one read day out of the archive, so that a later read of the same day replaces it
 * instead of blending with it. Offers left with no day are dropped. Returns how many offers
 * carried that day.
 */
function removeDay(archive, day) {
  let n = 0;
  archive.offers.forEach((o) => {
    if (o.days[day] == null) return;
    n += 1;
    delete o.days[day];
    if (o.cores) delete o.cores[day];
    if (o.locked) delete o.locked[day];
  });
  archive.offers = archive.offers.filter((o) => Object.keys(o.days).length > 0);
  if (archive.reads) delete archive.reads[day];
  delete archive._sig;
  return n;
}

/**
 * One store read (the data/offers.js shape) as archive entries. Only offers priced in the
 * table's currency whose contents were read completely are evidence: hidden items ("+N More"),
 * an unreadable count or price, an icon the card did not name, a line the table cannot place or
 * a pass tier the store does not itemize would all misstate what the price buys. Lines keep the
 * store's resource id when the read has it; a card read has none, so its lines keep their name
 * ("=Name"), which is all that read knew.
 * Returns { offers, names, day, skipped, seen (every id and "=name" the read mentions), meta }.
 */
function storeEntries(read, table, index) {
  const day = String((read && read.updated) || '').slice(0, 10);
  const out = [], names = {}, seen = {};
  let skipped = 0, total = 0;
  if (!E.isDay(day)) return { offers: out, names: names, day: null, skipped: 0, seen: seen, meta: null };
  const base = String((table.meta && table.meta.currency) || 'CAD').toUpperCase();
  let withIds = 0;
  ((read && read.offers) || []).forEach((o) => {
    total += 1;
    (o.contents || []).forEach((c) => { if (c && c.id) { seen[String(c.id)] = true; withIds += 1; } else if (c && c.item) seen['=' + String(c.item)] = true; });
    ((o.chain && o.chain.steps) || []).forEach((st) => (st.contents || []).forEach((c) => { if (c && c.id) seen[String(c.id)] = true; else if (c && c.item) seen['=' + String(c.item)] = true; }));
    const cur = String(o.currency || read.priceCurrency || '').toUpperCase();
    if (cur !== base || !(Number(o.price) > 0)) return;                 // free claims, Strike Store and core-priced offers are not money evidence
    const r = E.valueOffer(o, table, null, { personalize: false, index: index });
    if (r.hidden || r.priceUnreadable || r.unreadable.length || r.promotions.length || r.unknown.length || r.opaque.length) { skipped += 1; return; }
    const pairs = [];
    let ok = true;
    (o.contents || []).forEach((c, i) => {
      const l = r.lines[i];
      const qty = Number(c.qty);
      const counted = !(l && l.excluded);
      if (!(qty > 0) || !isFinite(qty)) { if (counted) ok = false; return; }      // points with no readable count do not spoil the offer
      if (c.id) { pairs.push([String(c.id), qty]); if (c.item) names[String(c.id)] = String(c.item); return; }
      const row = l && l.key && Object.prototype.hasOwnProperty.call(table.items, l.key) ? table.items[l.key] : null;
      pairs.push(['=' + (row ? row.name : (l && l.generic ? l.generic.name : String(c.item || ''))), qty]);
    });
    const lines = mergeLines(pairs);
    if (!ok || !lines.length || lines.some((l) => !(l[1] > 0))) { skipped += 1; return; }
    const days = {}; days[day] = Number(o.price);
    const entry = { title: String(o.name || ''), cur: cur, lines: lines, days: days };
    if (Number(o.ultraCores) > 0) { entry.cores = {}; entry.cores[day] = Number(o.ultraCores); }
    // a chain step other than the first one still to buy could not be bought on its own that day
    const step = o.chain ? Number(o.chain.step) : NaN;
    if (step > 0 && step !== Number(o.chain.current || 1)) { entry.locked = {}; entry.locked[day] = true; }
    out.push(entry);
  });
  return { offers: out, names: names, day: day, skipped: skipped, seen: seen, meta: { readAt: read.updated, account: read.account || null, source: withIds ? 'page data' : 'cards', bookmarklet: read.bookmarklet || null, offers: total, used: out.length } };
}

/**
 * The store charges fixed price tiers, and a tier usually has one Ultra Core price: CA$12.99 is
 * 100 cores, CA$24.99 is 200. Learned from the offers that carry both, for offers that say
 * nothing else about their core price. A CA$ price seen with two different core prices is left
 * out: CA$49.99 is both the 350-core and the 400-core tier.  Returns [[price, cores], ...] rising.
 */
function coreTiers(archive) {
  const seen = {};
  archive.offers.forEach((o) => { Object.keys(o.cores || {}).forEach((d) => { if (o.days[d] == null) return; const k = Number(o.days[d]).toFixed(2); (seen[k] = seen[k] || {})[o.cores[d]] = true; }); });
  return Object.keys(seen).filter((k) => Object.keys(seen[k]).length === 1).map((k) => [Number(k), Number(Object.keys(seen[k])[0])]).sort((a, b) => a[0] - b[0]);
}
function tierCores(price, tiers) {
  for (let i = 0; i < (tiers || []).length; i++) if (Math.abs(tiers[i][0] - Number(price)) < 0.005) return tiers[i][1];
  return null;
}
/** The Ultra Core price a money offer's web bonus implies: it pays 10 Strike Points per core. null without a bonus line. */
function bonusCores(lines) {
  let points = 0;
  (lines || []).forEach((l) => { if (l[0] === 'BFYB-CUR' || /^=strike points$/i.test(String(l[0]))) points += Number(l[1]) || 0; });
  return points > 0 ? Math.round(points) / 10 : null;
}
/**
 * What an archived offer cost in Ultra Cores on a read day, or null. The read's own figure when
 * it gave one. A read from the page data gives it wherever there is one, so an offer without it
 * that day has none. A card read: its Strike Points bonus divided by ten, else its price tier's.
 * Ultra Cores themselves are never sold for cores.
 */
function corePrice(archive, o, day, tiers) {
  if (o.cores && o.cores[day] > 0) return Number(o.cores[day]);
  const read = (archive.reads || {})[day];
  if (read && read.source === 'page data') return null;
  if (o.lines.some((l) => l[0] === 'UC' || /^=ultra cores$/i.test(String(l[0])))) return null;
  return bonusCores(o.lines) || tierCores(o.days[day], tiers);
}

/* ---------- observations and prices ---------- */

/**
 * The archive as priced observations for one currency: [{ day, title, price, lines: [[what, qty]] }]
 * where `what` is the family (or table key) the line is priced as. mode 'cash' takes the CA$ price,
 * 'cores' the Ultra Core price (see corePrice). Points are dropped from an offer; an offer with a
 * line the table cannot place, or with nothing left, is skipped, and so is a chain step on a day
 * it could not be bought. A level priced from another by derivedFrom counts as that many of the
 * base item.
 */
function observations(archive, table, opts) {
  opts = opts || {};
  const mode = opts.mode === 'cores' ? 'cores' : 'cash';
  const index = E.buildIndex(table), byId = idIndex(table);
  const tiers = opts.tiers || coreTiers(archive);
  const obs = [], unplaced = {};
  let skipped = 0;
  archive.offers.forEach((o) => {
    const acc = {}, order = [];
    let ok = true;
    o.lines.forEach((l) => {
      const id = String(l[0]);
      if (!ok || E.isPointsId(id)) return;
      if (E.isOpaqueId(id)) { ok = false; return; }
      let key = null;
      if (id.charAt(0) === '=') {
        const r = E.resolveItem(table, index, id.slice(1));
        if (r && r.item && r.item.excludeFromValue) return;          // event points by name, with or without a row
        if (r && Object.prototype.hasOwnProperty.call(table.items, r.key)) key = r.key;
      } else key = byId[id] || null;
      if (!key) { ok = false; unplaced[id] = (unplaced[id] || 0) + 1; return; }
      let row = table.items[key], qty = Number(l[1]);
      if (row.excludeFromValue) return;
      if (!(qty > 0) || !isFinite(qty)) { ok = false; return; }
      if (row.derivedFrom && row.derivedFrom.key && table.items[row.derivedFrom.key] && Number(row.derivedFrom.ratio) > 0) { qty = qty * Number(row.derivedFrom.ratio); key = row.derivedFrom.key; row = table.items[key]; }
      const what = familyOf(key, row);
      if (!(what in acc)) { acc[what] = 0; order.push(what); }
      acc[what] += qty;
    });
    if (!ok || !order.length) { skipped += 1; return; }
    const lines = order.map((k) => [k, acc[k]]);
    Object.keys(o.days).forEach((day) => {
      if (o.locked && o.locked[day]) return;                              // not for sale on its own that day
      const price = mode === 'cores' ? corePrice(archive, o, day, tiers) : Number(o.days[day]);
      if (!(price > 0) || !isFinite(price)) return;
      obs.push({ day: day, title: o.title, price: Number(price), lines: lines });
    });
  });
  return { obs: obs, skipped: skipped, unplaced: unplaced };
}

/** The middle of a list; of an even count, the geometric middle of the two central values. */
function median(a) {
  const s = a.filter((x) => x > 0 && isFinite(x)).sort((x, y) => x - y);
  const n = s.length;
  return n ? (n % 2 ? s[(n - 1) / 2] : Math.sqrt(s[n / 2 - 1] * s[n / 2])) : NaN;
}

/* ---------- the usual price ---------- */

const USUAL_MONTHS = 6;        // only the reads of the last six months count
const USUAL_SHARE = 2 / 3;     // the usual price was matched or beaten at least this share of that time
const STANDS_FOR_CAP = 7;      // a read stands for at most a week before it and a week after it

const dayNumber = (d) => Date.parse(d + 'T00:00:00Z') / 86400000;

/** The first day that still counts when `ratedDay` is rated: the same day of the month, six months back. */
function windowStart(ratedDay, months) {
  const d = new Date(ratedDay + 'T00:00:00Z');
  if (isNaN(d)) return '';
  const day = d.getUTCDate();
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() - (months == null ? USUAL_MONTHS : months));
  const last = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
  d.setUTCDate(Math.min(day, last));
  return d.toISOString().slice(0, 10);
}

/**
 * How many days each read before the rated one stands for: half the gap to the read before it
 * and half the gap to the read after it (for the last one, the rated read), each at most a week.
 * The first read has nothing before it and gets the week. Returns { day: days }.
 */
function readWeights(readDays, ratedDay) {
  const seen = {};
  const ds = readDays.concat([ratedDay]).filter((d) => d <= ratedDay && !seen[d] && (seen[d] = true)).sort();
  const w = {};
  ds.forEach((d, i) => {
    if (d === ratedDay) return;
    const before = i > 0 ? Math.min((dayNumber(d) - dayNumber(ds[i - 1])) / 2, STANDS_FOR_CAP) : STANDS_FOR_CAP;
    const after = Math.min((dayNumber(ds[i + 1]) - dayNumber(d)) / 2, STANDS_FOR_CAP);
    w[d] = before + after;
  });
  return w;
}

/**
 * The best price that was matched or beaten for at least `share` of the time. pairs are
 * [price of one unit, days it stood]: the cheapest prices are counted first, and the answer is
 * the price at which the days counted reach the share.
 */
function availablePrice(pairs, share) {
  const s = pairs.filter((p) => p[0] > 0 && isFinite(p[0]) && p[1] > 0).sort((a, b) => a[0] - b[0]);
  const total = s.reduce((a, p) => a + p[1], 0);
  let run = 0;
  for (let i = 0; i < s.length; i++) {
    run += s[i][1];
    if (run >= share * total - 1e-9) return s[i][0];
  }
  return NaN;
}

/**
 * Price everything the observations carry, as of the read being rated (see the header for the
 * rules). Observations after the rated day, or more than six months before it, are ignored.
 * opts.readDays: every day the store was read, whether or not an item was on sale then (default:
 * the days the observations carry); the gaps between them say how long each read stands for.
 * Returns { what: { basis: 'own' | 'set', usual (price of one unit), firstSeen, days (the read
 * days the usual price comes from), offers (observations behind its day prices), byDay:
 * { day: { price (the cheapest that day), offer, offers, basis } }, best: { cost, day, offer } } }.
 */
function priceItems(obs, ratedDay, opts) {
  opts = opts || {};
  const from = ratedDay ? windowStart(ratedDay) : '';
  const inWindow = (d) => !ratedDay || (d <= ratedDay && d >= from);
  const byDay = {};
  obs.forEach((o) => { if (!inWindow(o.day)) return; (byDay[o.day] = byDay[o.day] || []).push(o); });
  const info = {}, soldAlone = {};
  const note = (what, basis, o, cost) => {
    if (!(cost > 0) || !isFinite(cost)) return;
    const e = info[what] || (info[what] = { byDay: {} });
    const d = e.byDay[o.day];
    if (!d) e.byDay[o.day] = { price: cost, offer: o.title, offers: 1, basis: basis };
    else { d.offers += 1; if (cost < d.price) { d.price = cost; d.offer = o.title; } }
  };
  Object.keys(byDay).sort().forEach((day) => {
    const list = byDay[day];
    list.forEach((o) => { if (o.lines.length === 1) soldAlone[o.lines[0][0]] = true; });     // known from this day on
    list.forEach((o) => {
      if (o.lines.length === 1) note(o.lines[0][0], 'own', o, o.price / o.lines[0][1]);
      else if (o.lines.every((l) => !soldAlone[l[0]])) o.lines.forEach((l) => note(l[0], 'set', o, o.price / o.lines.length / l[1]));
    });
  });
  const weight = ratedDay ? readWeights((opts.readDays || Object.keys(byDay)).filter(inWindow), ratedDay) : {};
  Object.keys(info).forEach((k) => {
    const e = info[k];
    const all = Object.keys(e.byDay).sort();
    const earlier = ratedDay ? all.filter((d) => d < ratedDay) : all;
    e.days = earlier.length ? earlier : all;
    e.firstSeen = !earlier.length;
    e.usual = availablePrice(e.days.map((d) => [e.byDay[d].price, weight[d] || 1]), USUAL_SHARE);
    e.basis = e.days.some((d) => e.byDay[d].basis === 'own') ? 'own' : 'set';
    e.offers = all.reduce((a, d) => a + e.byDay[d].offers, 0);
    e.best = null;
    all.forEach((d) => { if (!e.best || e.byDay[d].price < e.best.cost) e.best = { cost: e.byDay[d].price, day: d, offer: e.byDay[d].offer }; });
  });
  return info;
}

/** The latest read day in the archive. */
function latestDay(archive) {
  let last = '';
  archive.offers.forEach((o) => { Object.keys(o.days).forEach((d) => { if (d > last) last = d; }); });
  return last;
}

/** Prices in both currencies for the archive as it stands, as of opts.ratedDay (default: its latest read). */
function prices(archive, table, opts) {
  opts = opts || {};
  const ratedDay = opts.ratedDay || latestDay(archive);
  const tiers = coreTiers(archive);
  const cashObs = observations(archive, table, { mode: 'cash', tiers: tiers });
  const coreObs = observations(archive, table, { mode: 'cores', tiers: tiers });
  // every day the store was read counts as a read, whether or not a given item was on sale then
  const from = windowStart(ratedDay);
  const readDays = Object.keys(archive.reads || {}).filter((d) => d <= ratedDay && d >= from);
  const how = { readDays: readDays };
  return { ratedDay: ratedDay, tiers: tiers, from: from, months: USUAL_MONTHS, share: USUAL_SHARE, weights: readWeights(readDays, ratedDay),
    cash: priceItems(cashObs.obs, ratedDay, how), cores: priceItems(coreObs.obs, ratedDay, how), cashObs: cashObs, coreObs: coreObs };
}

function sig6(n) { return n == null || !isFinite(n) ? null : Number(Number(n).toPrecision(6)); }
/** A display scale for a row: the unit count whose usual price is about a cent or more. */
function perFor(perCash) { return perCash >= 1e5 ? 1000000 : perCash >= 1000 ? 1000 : perCash >= 100 ? 100 : 1; }

/** An item's price on each read day that has one, as the table keeps it: { day: { per (units per unit of price), offer } }. */
function dayPrices(info) {
  const out = {};
  Object.keys(info.byDay).sort().forEach((d) => { out[d] = { per: sig6(1 / info.byDay[d].price), offer: info.byDay[d].offer }; });
  return out;
}

/**
 * Write the prices into the table rows: value (CA$ for `per` units), coreValue (Ultra Cores for
 * `per` units) and observed (where the number comes from). A row with no price in the reads has
 * neither. Points rows and rows priced from another by derivedFrom are left alone.
 * Returns counts for the report.
 */
function applyPrices(table, p) {
  const report = { own: 0, set: 0, firstSeen: 0, unpriced: 0, changes: [] };
  Object.keys(table.items).forEach((k) => {
    const it = table.items[k];
    if (it.excludeFromValue) { it.value = null; delete it.coreValue; delete it.observed; return; }
    if (it.derivedFrom) { it.value = null; delete it.coreValue; it.observed = { note: 'priced from ' + it.derivedFrom.key + (it.derivedFrom.basis ? ' by ' + it.derivedFrom.basis : '') }; return; }
    const what = familyOf(k, it);
    const c = p.cash[what], u = p.cores[what];
    const before = it.observed && it.observed.perCash != null ? Number(it.observed.perCash) : null;
    if (!c || !(c.usual > 0) || !isFinite(c.usual)) {
      it.value = null; it.coreValue = null; it.observed = { perCash: null };
      report.unpriced += 1;
      return;
    }
    const perCash = 1 / c.usual;
    if (it.cores == null || it.cores === '') it.per = perFor(perCash);          // an in-game core price typed for `per` units pins the scale
    const per = Number(it.per || 1) > 0 ? Number(it.per || 1) : 1;
    it.observed = { basis: c.basis, perCash: sig6(perCash), perCore: u && u.usual > 0 ? sig6(1 / u.usual) : null, days: c.days.slice(), offers: c.offers, firstSeen: c.firstSeen, best: { per: sig6(1 / c.best.cost), day: c.best.day, offer: c.best.offer }, byDay: dayPrices(c) };
    if (u && u.best) { it.observed.bestCore = { per: sig6(1 / u.best.cost), day: u.best.day, offer: u.best.offer }; it.observed.coreByDay = dayPrices(u); }
    if (what !== k) it.observed.family = what;
    it.value = sig6(per / it.observed.perCash);
    it.coreValue = it.observed.perCore ? sig6(per / it.observed.perCore) : null;
    report[c.basis] += 1;
    if (c.firstSeen) report.firstSeen += 1;
    if (before != null && Math.abs(Math.log(it.observed.perCash / before)) > Math.log(1.02)) report.changes.push({ key: k, name: it.name, before: before, after: it.observed.perCash });
  });
  return report;
}

/**
 * One read day's offers out of the archive, in the shape the engine values (for the price
 * history): what could be bought that day on its own, so not the chain steps still locked.
 */
function dayOffers(archive, day, tiers) {
  const out = [];
  archive.offers.forEach((o) => {
    if (o.days[day] == null || (o.locked && o.locked[day])) return;
    const cores = corePrice(archive, o, day, tiers);
    out.push({ name: o.title, price: Number(o.days[day]), currency: o.cur, ultraCores: cores || null, contents: o.lines.map((l) => (String(l[0]).charAt(0) === '=' ? { item: String(l[0]).slice(1), qty: l[1] } : { id: l[0], item: archive.names[l[0]] || l[0], qty: l[1] })) });
  });
  return out;
}

module.exports = {
  categoryForId: categoryForId, idsOf: idsOf, idIndex: idIndex, idStem: idStem, isHashId: isHashId, ensureRow: ensureRow,
  familyOf: familyOf, familyLabel: familyLabel,
  emptyArchive: emptyArchive, addToArchive: addToArchive, removeDay: removeDay, offerSig: offerSig, mergeLines: mergeLines, storeEntries: storeEntries,
  coreTiers: coreTiers, tierCores: tierCores, bonusCores: bonusCores, corePrice: corePrice, observations: observations, median: median, priceItems: priceItems,
  USUAL_MONTHS: USUAL_MONTHS, USUAL_SHARE: USUAL_SHARE, windowStart: windowStart, readWeights: readWeights, availablePrice: availablePrice,
  latestDay: latestDay, prices: prices, applyPrices: applyPrices, dayOffers: dayOffers
};
