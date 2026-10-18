---
name: msf-store-pull
description: Pull the live offers and the roster from the user's logged-in Marvel Strike Force web portal (marvelstrikeforce.com) through their Chrome browser into data/offers.js and data/roster.js, and refresh the msfwar.com Spenders Guide observed averages in data/values.js. Use when the user asks to value their store, refresh or re-pull offers, update their roster, or reload msfwar numbers. Needs a session that runs on the user's computer with Claude in Chrome.
---

# Pull the MSF store, roster and msfwar values

The valuation tool in this repo is a static page (`index.html`) that reads three data files.
This skill fills them from the user's own browser. It is read-only on every site: never click
Buy, Purchase, Claim, or any checkout or payment control, and never type into a payment form.

This playbook was run successfully on 18 October 2026. Sections 1 to 3 describe what worked;
"Gotchas" at the end lists what did not, so the next run does not rediscover it.

## 0. Preconditions

1. Claude in Chrome tools must exist in this session (`mcp__claude-in-chrome__*`). Load the
   `chrome-browser` skill before the first browser step. The built-in browser pane is not signed
   in to the portal, so use Chrome. If there are no browser tools, say so and stop.
2. The user must already be signed in to marvelstrikeforce.com in Chrome. If the portal shows a
   sign-in page, ask the user to sign in and continue afterwards; do not enter their credentials.
   The signed-in player name shows at the top right of every portal page.
3. Work in the user's clone of this repository so the data files land next to `index.html`.
4. Python 3 is on the machine; Node may not be (it was not on 18 October 2026).

## 1. Offers → `data/offers.js`

The store is https://marvelstrikeforce.com/en/store, a Vue app. Every section (Buy Again,
pass offers, Chain Offers, Dual Offers, Offers with its sub-sections, Power Cores, Ultra Cores,
Strike Store) is on the one page, but offer cards render lazily: a card is a skeleton with
`aria-busy="true"` and class `defer-offscreen-rendering` until it has been scrolled into view.

1. Open the store page. Confirm the currency toggle shows fiat (the `$` side active), not Ultra
   Cores; prices then read like `CA$6.99`.
2. Force every card to render with `javascript_tool`, in passes of about 45 cards so each call
   stays under the tool's timeout:
   `for (const c of document.querySelectorAll('.offer-card[aria-busy="true"]')) { c.scrollIntoView({block:'center'}); await new Promise(r => setTimeout(r, 600)); }`
   Repeat until `document.querySelectorAll('.offer-card[aria-busy="true"]').length` is 0
   (220 cards took four passes).
3. Extract with one `javascript_tool` call that walks `h2, h3, .offer-card` in document order
   and stores the result on `window.msfPull`. Per card: `p.title` (or the first `p` for dual
   offers), `.description`, `.timer .time`, `.purchase-limit`, `.labels-wrapper` labels,
   class flags (`daisy-chain`, `pass-prepurchase-offer`), and for each variant
   (`.variant-wrapper > div`, else the card itself) the price from `.purchase-button-cost`
   (an `img[alt]` inside it means an item cost such as Strike Points) and the items from
   `.item-container`: `.item-count` text (x200, x3.6M, x40K), the last text-bearing child div
   as the name, and `.deco-web-bonus` / "Web Bonus" as the web-bonus flag.
4. Power Core and Ultra Core packs are not `.offer-card`s. Read `.core-card` elements
   separately: `.offer-header > .item-count` is the core count, `.offer-footer p` the name,
   the nested `.item-container` the Strike Point web bonus.
5. Get the JSON out of the page through the console, not the tool's return value (see Gotchas):
   `console.log` it in 15,000-character chunks with a marker (`MSFPULL-Q <n> <chunk>`), then
   `read_console_messages` with that marker. A result over about 64 KB is saved to a file under
   the session's tool-results folder; reassemble the chunks from that file with Python.
6. Normalize with Python: parse counts (K and M suffixes, commas), prices (`CA$` → CAD),
   purchase limits, timers; drop the `+N More` placeholder into a `notes` field ("N more item(s)
   not shown on the card"); dedupe cards that appear in several sections by (title, price,
   contents) and keep every section name in `sections`; append the core packs.
7. Write `data/offers.js` as `window.MSF_OFFERS = {...};` with `updated` set to the time the
   store was read (ISO 8601), `source: "web-store"`, `priceCurrency` and the signed-in account.
   Keep the comment block at the top of the file.
8. Do not invent offers, prices or quantities. An offer you could not read fully goes in with a
   `notes` field explaining what is missing.

## 2. Roster → `data/roster.js`

The card view at /en/player/characters draws stars with CSS, so read the stats table instead:
https://marvelstrikeforce.com/en/player/stats renders the whole roster (389 rows) in one
`<table>` with columns character, power, level, stars, red stars, diamonds. Stars are
`i.fa-star` icons: `fas` is filled, `far` is empty; diamonds are `.equipped-diamond.diamond-filled`.

1. Extract every row with `javascript_tool` and send it through the console as in step 1.5.
2. Write `data/roster.js` as `window.MSF_ROSTER = {...};` with `updated`, `source`, the account
   name and `characters: { "Name": { stars, redStars, diamonds, level, power, unlocked } }`
   (`unlocked: false` when level, stars and power are all 0). Tell the user it is the full roster.

## 3. Item values → `data/values.js`

msfwar does not publish a fixed price list. For each resource it shows an *observed average*,
the units one US dollar bought across recent paid offers, and grades offers against it (see the
README, "How value is computed"). The averages are read from the "Compare offers" region of
https://www.msfwar.com/spenders-guide/:

1. Open the guide in a new tab. Set the "Compare using" select to "One resource or gear tier"
   (set `.value` through the native setter and dispatch `input` and `change`).
2. For each button in the "Resource categories" group (Gold, Training materials, Character
   shards, Gear, ISO-8, Ability materials, Power Cores, Other resources): click it, wait about a
   second, then iterate the options of the select labelled "Resource or character" (for Gear it
   is labelled "Gear tier" and has no baseline). After each option, wait about 450 ms and read
   the text of the element with `aria-label="Value comparison"`; it contains
   `Observed average · provisional<number><unit> per $1 · <d> days · <n> offer observations`.
   Keep each call to about 45 options so it finishes inside the tool timeout; collect on
   `window.msfwarAvg` and send through the console as in step 1.5. 195 resources took five calls.
3. Build `data/values.js` with Python: `value = per / perUsd` in USD, `observed` carrying
   perUsd, days, observations and `earlyEstimate` when days < 7; `excludeFromValue: true` on
   milestone points and Strike Points; add every item name the store sells that msfwar has no
   row for with `value: null`. Key conventions: `shard:<character lower-case>` with
   `character`, `orb:<name>`, `gear:<name>`, `training_module:<tier>`,
   `ability_material:<tier>`, `iso8:<name>`, `points:<event>`, `promotion:<...>`.
4. Set `meta.source`, `meta.sourceUrl`, `meta.updated`, `meta.fxToUsd` (look up the current
   USD/CAD rate; msfwar prices are US dollars before tax) and keep `meta.scoring` in step with
   the methodology text on the guide ("Typical historical value earns C · 70/100 ...").
5. Update the "Status" table and, if the methodology changed, "How value is computed" in
   `README.md`, in your own words, with the date read.

## 4. Verify and report

1. Check the page renders. The Chrome tools cannot open `file://` URLs (navigate rewrites them
   to https) and the built-in browser cannot either, so run Chrome headless from the shell:
   `"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu --virtual-time-budget=5000 --dump-dom file:///C:/Users/colte/msf-value-tool/index.html`
   (Edge's `msedge.exe` works the same). The dumped DOM holds the header status line, which
   says how many items have values, how many offers loaded and how many roster characters, and
   the ranked store table. The user can double-click `index.html` to see it themselves.
2. On "My store", list items flagged unknown or unpriced. Add unknown ones to `data/values.js`
   with `value: null` so they can be priced later, and tell the user which values are missing.
3. Run `npm test` if Node is installed.
4. Report the top offers by score, which items could not be valued, and the time the store was
   read. If anything above could not be done, say exactly what and why.

## Gotchas (18 October 2026)

- `javascript_tool` results are cut at about 1,000 characters and anything that looks like a
  query string, cookie or base64 (`a=b&c=d`, `|`-separated fields, long ids, raw HTML) is
  replaced with `[BLOCKED ...]`. Return small plain objects, and move bulk data through
  `console.log` + `read_console_messages` (each console message is cut at about 16,000
  characters, so chunk at 15,000).
- Chrome in this setup showed an error page for `http://127.0.0.1:<port>` and the store page's
  CSP blocked `fetch` to localhost, so a local receiver does not work. Clipboard writes from the
  page (`navigator.clipboard`, `execCommand('copy')`, Ctrl+C) did not reach the system clipboard.
- `get_page_text` returns `[UNKNOWN ALERT]` on the portal; use `read_page` or `javascript_tool`.
- Network capture only starts after the first `read_network_requests` call, and the store's
  offer data did not show up as JSON requests anyway; read the DOM.
- Cards that show `+N More` hide the rest of their contents behind the Buy flow; hovering and
  clicking the card do not reveal them. Record the note and move on.
- Some character bundles (team "Boost Up" offers) show character icons with no quantity; record
  the names with `qty: null` and a note.
- `read_page` on the msfwar guide truncates at `max_chars`; the page is about 470 KB, and all
  three tabs' content is in the DOM at once.
