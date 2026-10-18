---
name: msf-store-pull
description: Pull the live offers and the roster from the user's logged-in Marvel Strike Force web portal (marvelstrikeforce.com) through their Chrome browser into data/offers.js and data/roster.js, and load the msfwar.com Spenders Guide item values into data/values.js. Use when the user asks to value their store, refresh or re-pull offers, update their roster, or load msfwar numbers. Needs a session that runs on the user's computer with browser tools (Claude in Chrome or the built-in browser).
---

# Pull the MSF store, roster and msfwar values

The valuation tool in this repo is a static page (`index.html`) that reads three data files.
This skill fills them from the user's own browser. It is read-only on every site: never click
Buy, Purchase, Claim, or any checkout or payment control, and never type into a payment form.

## 0. Preconditions

1. Browser tools must exist in this session (`mcp__claude-in-chrome__*`, `mcp__Claude_Browser__*`
   or their `mcp__remote-devices__*` forms). Load the matching skill (`chrome-browser` or
   `built-in-browser`) before the first browser step. If there are no browser tools, say so and
   stop: a cloud session cannot do this. In the CLI the user starts the session with
   `claude --chrome` and can check the connection with `/chrome`.
2. The user must already be signed in to marvelstrikeforce.com in that browser. If the portal
   shows a sign-in page, ask the user to sign in and continue afterwards; do not enter their
   credentials.
3. Work in the user's clone of this repository so the data files land next to `index.html`.

## 1. Offers → `data/offers.js`

1. Open https://marvelstrikeforce.com/ and go to the Store page of the web portal (it is in the
   portal navigation; the path has moved before, so use the link rather than a remembered URL).
2. Visit every store section or tab, and scroll each one to the bottom so lazy-loaded cards
   appear. If an offer card only shows its full contents in a details view, open that view.
3. For each offer record exactly what is shown:
   - `name`: the offer title.
   - `price` as a number and `currency` as the ISO code the symbol implies (USD for $).
   - `contents`: one row per line of the offer, `item` spelled as the store spells it, `qty` as a
     number. Expand abbreviations only when the page does ("500K" → 500000). If a quantity is
     unreadable, set `qty` to null and add `"notes": "qty unreadable"` on the offer.
   - `purchaseLimit` (null if none shown), `expires` (ISO 8601 if a date, otherwise the text shown
     such as "23h 10m"), `section` (the store section it was in).
4. Write `data/offers.js` as `window.MSF_OFFERS = {...};` with `updated` set to the current time in
   ISO 8601 and `source` set to `"web-store"`. The schema is documented at the top of the file.
   Keep the comment block.
5. Do not invent offers, prices or quantities. An offer you could not read fully goes in with a
   `notes` field explaining what is missing.

## 2. Roster → `data/roster.js`

1. Open the roster page of the web portal.
2. Capture at least every character whose shards appear in the offers just written; the whole
   roster is better if the page makes it practical. For each: the character name as shown,
   `stars` (yellow stars, 0–7), `redStars` if visible, `gearTier` if visible.
3. Write `data/roster.js` as `window.MSF_ROSTER = {...};` with `updated` set to now. Tell the
   user whether the file holds the full roster or only the characters from the offers.

## 3. Item values → `data/values.js`

1. Open https://www.msfwar.com/spenders-guide/ and find how it values items: the unit (dollars
   or Power Core equivalents), the per-item numbers, and any grading thresholds.
2. In `data/values.js` set `meta.source`, `meta.sourceUrl`, `meta.updated`, `meta.unit` and
   `meta.unitPerUsd` (1 for dollars; for cores, how many cores one dollar buys at the rate the
   guide uses). Fill `value` for each existing item and add items the guide values that are not
   in the table, keeping key conventions: `shard:<character name lower-case>` with a `character`
   field for shards, `orb:<name>`, `gear:<name>`, `training_module:<colour>`,
   `ability_material:<colour>`, `iso8:<name>`. Set `per` to the quantity a value refers to.
3. If the guide grades offers, mirror its thresholds in `meta.grades` (value-per-dollar, descending).
4. Add a short "Value methodology" section to `README.md` describing what the guide does, in
   your own words, with the date read. Do not copy the guide's prose.

## 4. Verify and report

1. Open `index.html` from the repo folder in the browser (a `file://` URL works). The header shows
   how many items have values, how many offers loaded and how many roster characters.
2. On "My store", list items flagged unknown or unpriced. Add unknown ones to `data/values.js`
   with `value: null` so they can be priced later, and tell the user which values are missing.
3. Run `node --test` in the repo folder if Node 18 or newer is installed; the engine tests must
   still pass. If Node is missing, say so and move on.
4. Report the top offers by value per dollar, which items could not be valued, and the time the
   store was read. If anything above could not be done, say exactly what and why.

## 5. Commit and push

Commit the changed files on the current branch with a message such as
`Load live store offers, roster and msfwar values` and push with
`git push -u origin <branch>`. Offers and roster are the user's own game data; if they would
rather not commit them, write them to `data/offers.local.js` and `data/roster.local.js` instead
(ignored by git), load those files in `index.html` in place of the tracked ones, and say so.
