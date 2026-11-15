---
name: msf-store-pull
description: Read the live offers from the user's logged-in Marvel Strike Force web store (marvelstrikeforce.com) through their Chrome browser into data/offers.js, then rebuild the item prices in data/values.js from the player's own store reads with tools/refresh.js. Use when the user asks to value their store, read or re-pull their offers, or refresh the values. Reading the store needs a session on the user's computer with Claude in Chrome; rebuilding the prices alone only needs Node.
---

# Read the MSF store and rebuild the prices

The tool in this repo is a static page (`index.html`) over a few data files. It values store
offers against the player's own earlier store reads and against nothing else. This playbook makes
a new read through the user's Chrome, saves it and rebuilds the prices. Two rules stand above
every step:

- **Read-only on the store.** Never click Buy, Purchase, Claim or any checkout or payment
  control, and never type into a payment form.
- **Own data only.** Do not bring price data from anywhere but the player's own store reads into
  the tool, in any form, and do not add rules that discount items for the player (no plan, no
  roster rule, no discount by category). If a number looks wrong, first look at which reads and
  offers carry the item in `data/reads.json`: the reason is almost always there.

To rebuild the prices from what is on file, with no new read, go straight to section 2.

## 0. Preconditions

1. Claude in Chrome tools must exist in this session (`mcp__claude-in-chrome__*`); load the
   `chrome-browser` skill before the first browser step. The built-in browser pane is not signed
   in to the portal. With no browser tools, say so and stop: a cloud session cannot do this.
2. The user must already be signed in to marvelstrikeforce.com in Chrome. Two Chrome windows can
   be connected at once: if the store shows a sign-in page, call `list_connected_browsers` and
   `select_browser` for the other one before telling the user they are signed out. Never enter
   their credentials. The signed-in player name shows at the top right of every portal page.
3. Work in the user's clone, `C:\Users\colte\msf-value-tool`. Node 24 is installed per user at
   `%LOCALAPPDATA%\Programs\nodejs` and is on the user PATH; open a new shell if `node` is not
   found. Python 3 runs as `python`, not `python3`.

## 1. Read the store

Shortcut: if the user clicks the "MSF: grab my offers" bookmark themselves (it is built from
`pull.js` and copies the read), run `node tools/save-store.js --clipboard --if-newer` and go to
section 2. `update.cmd` runs the same commands but ends on `pause`: leave it to the user.

The store, https://marvelstrikeforce.com/en/store, is a Vue 2 app. Its state,
`document.querySelector('#app').__vue__.$store.state.offers`, holds every offer (`offers`, and
`daisychainOffers` for chains) with its full contents, the store's resource ids, the CA$ price
(`realCost`) and the Ultra Core price (`itemCost` with id `UC`). Read that, not the cards: a card
shows five items and "+N More".

1. Open the store in the signed-in Chrome window and wait about ten seconds.
2. `node -e "process.stdout.write(require('./pull.js').stateSnippet())"` prints a read-only
   snippet of about 3,800 characters. Run it with `javascript_tool`. It clicks and scrolls
   nothing: it packs the state (ids, names, counts and prices, no icons) into `window.__msfRaw` as
   JSON and returns `{ offers, chains, chars, readAt }`, or null when the state is not there.
3. Move `window.__msfRaw` out through the console, not the tool's return value (see Gotchas):
   `console.log` it in 15,000-character chunks with a marker (`MSFRAW <n> <chunk>`), then call
   `read_console_messages` with that marker. A large result lands in a file under the session's
   tool-results folder. Reassemble with Python (`re.finditer(r'^MSFRAW (\d+) (.*)$', text, re.M)`,
   sort by the number, join) into `raw.json` in the scratch folder.
4. `node tools/save-store.js raw.json` normalizes the extract and writes `data/offers.js`. It
   refuses a read older than the one on file unless `--force` is given.
5. Check the file against the page: the offer count, a few prices, and the line count of one big
   bundle (on 14 November the ISO Fest Trove had 37 lines where its card showed 5). Do not invent
   offers, prices or quantities: a line the read could not resolve stays in with a `notes` field.

Fallback, only when the snippet returns null: read the cards. A card is a skeleton with
`aria-busy="true"` until it has been scrolled into view, so scroll each busy card into view,
about 600 ms apart, in passes until none is busy. Then extract as `readCards()` and `readChains()`
in `pull.js` do (a chain's step selector previews a step, it does not buy) and normalize the same
way. Cards hide items behind "+N More", and hovering or clicking does not reveal them: those
offers carry a note, show as incomplete and are not used as price evidence.

## 2. Rebuild the prices

Run `node tools/refresh.js` (with `--dry-run` first to see the report without writing). It adds
`data/offers.js` to the archive `data/reads.json`, creates a row for every resource id it has no
row for, prices every item in CA$ and in Ultra Cores by the rules at the top of `tools/market.js`,
and rewrites `data/values.js` and `data/history.js`. It uses no network. Read its report:

- `read`: the money offers read completely, and how many are new to the archive (or that the day
  was already in the archive and is replaced). A read from the
  page data leaves out only offers that hold a pass tier, a Time Heist level or a trial unlock
  (5 of 148 on 14 November). `new row` lines name items the store sold for the first time.
- `rated read` must be the day of the read just saved, with every earlier read listed after it.
  The read before it now counts as an earlier day. A `NOTE` says so when `data/offers.js` holds
  an older read than the archive's latest, and a `WARNING` when `data/reads.json` was missing.
- A read is filed under its UTC date. A second read of the same day replaces the first; a card
  read never replaces a read from the page data.
- `priced`: the counts by basis (sold on their own, only sold in sets), the rows without a price,
  and the items first seen in the rated read, which rate about 1× until the next one (46 on
  14 November). `line names no row matches` must not appear after a page-data read.
- `usual prices that moved`: up to 15 items whose usual price changed by more than 2%. Each should
  be explained by the reads: an earlier day joined the days it is picked from, or it got an offer of its own.
- `per CA$` and `per Ultra Core`: offers rated, the grade spread and the five best. Most offers at
  D or F is normal (129 of the 143 rated per CA$ on 14 November). Many A grades at once is a sale
  or a wrong yardstick: look at the items behind them in `data/reads.json`.

Prices are never typed in: a refresh rebuilds `value`, `coreValue`, `observed` and `per`. On a
row it keeps `aliases`, `character`, `xp`, `derivedFrom`, `cores`, `excludeFromValue` and `note`
and drops fields it does not know. The grade bands (`meta.grades`) are the user's to change.

## 3. Check, report, commit

1. `npm test`: every test must pass. One test rebuilds the prices from `data/reads.json` and
   compares them with `data/values.js`, so commit those two together, with `data/offers.js` and
   `data/history.js`. The README's worked example is dated (the 14 November 2026 read) and its
   test only runs while that read is the one on file, so a new read needs no change there.
2. Check that the page renders. The Chrome tools cannot open `file://` URLs (navigate rewrites
   them to https) and the built-in browser cannot either, so run Chrome headless from the Bash
   tool, with a throwaway profile so nothing saved in the user's own browser colours the check:
   `"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu --virtual-time-budget=5000 --user-data-dir="$TEMP/msfv-headless" --dump-dom file:///C:/Users/colte/msf-value-tool/index.html`
   The dumped DOM holds the header status line and the ranked offers.
3. Update the "Status" table in `README.md` with the new dates and counts, in your own words.
4. Report: when the store was read, the best offers per CA$ and per Ultra Core, what was first
   seen, and anything that could not be read or priced, with the reason.
5. Commit the four data files and the README on the current branch (for example
   `Store read 14 November: 155 offers, prices rebuilt`) and push with
   `git push -u origin <branch>`. A push from a session needs the user's GitHub sign-in through
   Git Credential Manager; if it fails on a stale token, run the push in the user's terminal.

## Gotchas (18 and 24 October, 14 November 2026)

- `javascript_tool` results are cut at about 1,000 characters, and anything that looks like a
  query string, a cookie or base64 (`a=b&c=d`, `|`-separated fields, long ids, raw HTML) is
  replaced with `[BLOCKED ...]`. Return small plain objects and move bulk data through the
  console, where a message is cut at about 16,000 characters: hence the 15,000-character chunks.
- No other way out of the page worked: a local receiver (Chrome showed an error page for
  `http://127.0.0.1:<port>` and the store's CSP blocked `fetch` to localhost), clipboard writes
  made by a session, or network capture (the offer data did not show up as JSON requests).
- `get_page_text` returns `[UNKNOWN ALERT]` on the portal. Use `read_page` or `javascript_tool`.
- The store needs about ten seconds after navigation before its state and its cards exist.
- Never run the full bookmarklet (`extractStore`) off the store page: it calls `alert()`, which
  blocks the tab. Use `stateSnippet()`.
- A bookmark dragged before `pull.js` changed keeps running the old code: on 24 October the user's
  copy returned only the first step of each chain. Every read therefore carries a `bookmarklet`
  version stamp, now `2026-11-14`, and `tools/save-store.js` prints a note when it differs from
  `BOOKMARKLET_VERSION`. Bump both (the stamp in `normalizeExtract` and the constant next to
  `bookmarkletHref`) whenever the bookmarklet's behaviour changes, and tell the user to drag the
  link again.
