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
   in to the portal, so use Chrome. If there are no browser tools, say so and stop: a cloud
   session cannot do this. In the CLI the user starts the session with `claude --chrome` and
   can check the connection with `/chrome`.
2. The user must already be signed in to marvelstrikeforce.com in Chrome. If the portal shows a
   sign-in page, ask the user to sign in and continue afterwards; do not enter their credentials.
   The signed-in player name shows at the top right of every portal page.
3. Work in the user's clone of this repository so the data files land next to `index.html`.
4. Python 3 is on the machine. Node 24 is installed per-user at %LOCALAPPDATA%\Programs
odejs (zip build, on the user PATH since 18 October 2026); open a new shell if `node` is not found.

## 1. Offers → `data/offers.js`

Shortcut: if the user can click a bookmark themselves, the My store tab's "MSF: grab my offers"
bookmarklet (built from `pull.js`) does steps 1 to 6 below in their browser and copies the JSON;
you then only need to write it into `data/offers.js`. The steps below are for doing it through
Claude in Chrome.

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
3b. Chain cards (`.offer-card.daisy-chain`) carry a step selector (`.chain-step`, 1 2 3 4).
   Clicking a step's `.step-inner` previews that step's title, price and contents in the card
   (it is not a purchase); the step without the `deselected` class is the first unbought one.
   Read every step and restore the original selection; `pull.js` does this in `readChains()`
   and the normalizer emits one offer per step with the whole chain in `chain`. Step titles
   carry a counter at either end ("(1/6) Boot Sequence", "Kestrel Starter (1/4)"), which the
   normalizer strips; a step's hidden-item or unreadable-price note travels in `chain.steps`;
   the same chain shown in two sections is emitted once with both sections.
4. Power Core and Ultra Core packs are not `.offer-card`s. Read `.core-card` elements
   separately: `.offer-header > .item-count` is the core count, `.offer-footer p` the name,
   the nested `.item-container` the Strike Point web bonus.
5. Get the JSON out of the page through the console, not the tool's return value (see Gotchas):
   `console.log` it in 15,000-character chunks with a marker (`MSFPULL-Q <n> <chunk>`), then
   `read_console_messages` with that marker. A result over about 64 KB is saved to a file under
   the session's tool-results folder; reassemble the chunks from that file with Python.
6. Normalize with `pull.js`: `require('./pull.js').normalizeExtract(raw)` in Node takes the raw
   extract (the `offers` array plus the `cores` array, see test/fixtures/store-raw.json) and
   returns the data/offers.js object: counts with K and M suffixes parsed, `CA$` → CAD,
   purchase limits and timers, the `+N More` placeholder turned into a `notes` field, cards that
   appear in several sections deduplicated by (title, price, contents) with every section kept
   in `sections`, core packs appended. The same function powers the page's bookmarklet, so the
   two routes produce identical files.
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

## 2b. After every pull

Run `node tools/record-history.js` to add the day to `data/history.js`, and
`node tools/fill-from-store.js` to price gear and ISO-8 items msfwar has no baseline for from
the new offers (`--dry-run` first to see the changes). It prices store-sourced items again on
every run and never touches items with an msfwar number or a `derivedFrom`; values the user
typed on the Value table tab live only in their browser, win on the page, and are invisible to
the tool.

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

## 3b. Plan → `data/personal.js`

The personal score needs to know what the user builds and what they are short of. Both come from
the user's Google Sheet "MSF Sheet" (id 1U-GfhH0GYt0xIPQdf19hyDGKYOHaoznOksnv2Z9VK_k) through the
Google Sheets connector, plus the portal's Inventory page.

1. Read the tab "Characters I Will Build" (column A, one name per row). Match each name to a
   roster name from `data/roster.js`; the sheet spells a few differently (Iron Fist WWII,
   Miles Morales, Ms Marvel, Professor X, Quiksilver Symbiote, Scorpion Breaker). Record the
   sheet spelling as `sheetName` when it differs.
2. Read "Resource Budgeting" (current gold and L4 modules, totals needed), "T4 Priority" (the
   Blue / Pink / T4 totals in row 1) and "ISO Priority" (how many characters sit under GREEN,
   BLUE, PURPLE and ORANGE). Write explicit `resources` entries for gold, `training_module:l4`
   and the four ability tiers with the have/need numbers, and `resourceRules` for ISO tiers
   (surplus when a tier lists no characters), gear (Crimson short, lower tiers surplus) and L1
   to L3 training modules (surplus). Ability tiers keep the user's own weighting, not the
   sheet's: T4 short, T3 `status: "useless", multiplier: 0.1`, T2 and T1 useless (said on
   18 Oct 2026); ask before changing it.
3. Open https://marvelstrikeforce.com/en/inventory, scroll to the bottom until the count of
   "You own" stops growing, and read every `.item` card: the name element and the "You own"
   span, parsing 51.9K-style counts. The page lists gear only. Store the counts under
   `inventory` for reference.
4. Write `window.MSF_PERSONAL = {...};` with `updated`, `sources`, `characters`,
   `offListMultiplier` (0 unless the user chose otherwise), `surplusMultiplier` (0.25),
   `resources`, `resourceRules` and `inventory`. Keep the comment block.
5. In `data/values.js`, keep the hand-kept fields when regenerating: `xp` on training modules
   (L1 50, L2 200, L3 800, L4 1600) and `derivedFrom` on L1 to L3 (priced from L4 by XP), the
   `character` field on awakened ability materials and diamond or red-star promotions so the
   build-list rule covers them, and flag `observed.suspect` on
   baselines that cannot be right (shards above 1,000 per dollar, orb fragments above a million
   per dollar).

## 4. Verify and report

1. Check the page renders. The Chrome tools cannot open `file://` URLs (navigate rewrites them
   to https) and the built-in browser cannot either, so run Chrome headless from the shell:
   `"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu --virtual-time-budget=5000 --dump-dom file:///C:/Users/colte/msf-value-tool/index.html`
   (Edge's `msedge.exe` works the same). The dumped DOM holds the header status line, which
   says how many items have values, how many offers loaded and how many roster characters, and
   the ranked store table. The user can double-click `index.html` to see it themselves.
2. On "My store", list items flagged unknown or unpriced. Add unknown ones to `data/values.js`
   with `value: null` so they can be priced later, and tell the user which values are missing.
3. Run `npm test`; the engine, scoring and plan tests must pass.
4. Report the top offers by score, which items could not be valued, and the time the store was
   read. If anything above could not be done, say exactly what and why.

## 5. Commit and push

Commit the changed files on the current branch with a message such as
`Load live store offers, roster and msfwar values` and push with `git push -u origin <branch>`.
Offers and roster are the user's own game data; if they would rather not commit them, write
them to `data/offers.local.js` and `data/roster.local.js` instead (ignored by git), load those
files in `index.html` in place of the tracked ones, and say so. A push from a Claude session
needs the user's GitHub sign-in through Git Credential Manager; if it fails on a stale token,
run the push in the user's terminal so the browser sign-in can open.

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
