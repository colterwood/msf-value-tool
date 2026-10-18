# MSF Store Value

A local tool for valuing Marvel Strike Force store offers, in the spirit of the
[msfwar Spenders Guide](https://www.msfwar.com/spenders-guide/) but run against your own store
and your own roster.

It does two things:

- **Value an offer you type in.** Enter the price and the contents; it returns an msfwar-style
  score and letter, the value per US dollar, and a per-item breakdown.
- **Rank the offers live in your store.** A desktop Claude session reads your logged-in web store
  through Chrome into `data/offers.js`; the "My store" tab ranks them best first. Your roster
  discounts shards you no longer need.

Everything runs in your browser from a folder on your machine. No server, no account, no install.

## Status

| Part | State |
| --- | --- |
| Valuation engine and tests | Done. msfwar-style scoring, currency conversion and point exclusion added 18 October 2026 |
| Local page: offer entry, store ranking, value table editor, roster | Done |
| msfwar item values in `data/values.js` | **Loaded 18 October 2026**: 181 of 311 items carry msfwar's observed average; the rest are items msfwar had no baseline for (gear catalysts, most character shards, some orbs) and show as unpriced |
| Live offers in `data/offers.js` | **Loaded 18 October 2026, 19:38 UTC**: 212 offers from every section of the web store, prices in CA$ |
| Roster in `data/roster.js` | **Loaded 18 October 2026**: all 389 characters (237 unlocked, 28 at 7 stars) from the roster stats table |
| Playbook for pulling store, roster and msfwar values through Chrome | Done and run once; `.claude/skills/msf-store-pull/SKILL.md` records what worked |

## Quick start

1. Clone or download this repository.
2. Open `index.html` in Chrome (double-click it, or `npm run serve` and open http://localhost:8765).
3. **My store** ranks the offers that were in your store at the last pull. Click a row for the
   breakdown: which items counted, which were unknown or unpriced, which were left out.
4. **Value an offer**: enter a price and the contents. Items the table does not know are flagged
   with an "add" button; items without a value yet are flagged too.
5. **Value table**: every item, its value and msfwar's observed average. Type in values as you
   learn them. Edits are kept in the browser; "Export JSON" writes the merged table so you can
   paste it into `data/values.js` as the new baseline.

## Pulling your store through Chrome

The pull needs a Claude session running on your computer with Claude in Chrome connected,
because the web store only shows offers to a logged-in browser and there is no public API.

1. Sign in to https://marvelstrikeforce.com in Chrome.
2. Open this folder in the Claude Desktop app with Claude in Chrome connected.
3. Ask it to run `/msf-store-pull`. The skill reads the store and the roster stats table,
   refreshes msfwar's observed averages, writes the three data files and opens `index.html`.
4. Reload `index.html`. The header shows how many items have values, how many offers loaded and
   how many roster characters.

The skill never clicks Buy or touches a payment form. It records what the store shows and flags
anything it could not read rather than guessing.

## How value is computed

This follows the msfwar Spender's Guide as it described itself on 17 October 2026.

- **Item values.** For each resource msfwar publishes an *observed average*: how many units one
  US dollar bought across recent paid offers, for example 884,050 gold or 128 L4 Training
  Modules per dollar. `data/values.js` stores that as `value` dollars for `per` units
  (`value = per / observed.perUsd`) and keeps the observed number, the days and the count of
  offer observations under `observed`. Fewer than seven observed days is marked `earlyEstimate`,
  as on msfwar.
- **Price in US dollars.** msfwar's averages are US prices before tax. This store shows CA$, so
  `meta.fxToUsd` converts the price first (CAD 0.7138 on 18 September 2026, Federal Reserve H.10
  via YCharts; edit it on the Value table tab when the rate moves).
- **Score per item.** Each counted item's ratio is the units per dollar this offer gives divided
  by the observed average, which is the same as the item's value divided by the whole price.
  A ratio of 1 (typical) scores 70, 1.25 scores 80 and 1.5 scores 90: `70 + (ratio - 1) * 40`,
  capped at 100 and floored at 0.
- **Score per offer.** Items average within their category and categories combine by weight:
  gold 30, training materials 30, orange (T4) ISO-8 20, character shards 15, everything else 5.
  Only the categories present share the weighting, so extra item types cannot inflate a grade.
  Letters: A at 90, B at 80, C at 70, D at 60, F below. msfwar states the A, B and C bands; D, F
  and the clamp are this tool's reading of its description and can be edited in `meta.scoring`.
- **Not counted.** Milestone points and Strike Points are listed but excluded, as on msfwar.
  Items msfwar has no baseline for are listed as unpriced and leave the offer marked incomplete.
  Offers whose card hides part of its contents behind "+N More" carry a note and rank after
  complete ones.
- **Value per dollar** is also shown: the sum of counted items' dollar values divided by the
  US-dollar price, with the plain Excellent/Good/Fair/Poor label from `meta.grades`.
- **Personalization.** With a roster loaded and "Personalize" on, shards of a character already
  at 7 stars count `meta.shardRules.maxedMultiplier` (default 0) of their value, and the
  personal score follows. The generic number stays visible beside it.

Chain offers are graded on the step shown; msfwar also counts the cost of the earlier steps,
which the web store does not display.

## Data files

| File | Contents | Written by |
| --- | --- | --- |
| `data/values.js` | Item value table, exchange rates and scoring rules | The playbook from msfwar, or you |
| `data/offers.js` | Offers in your store at the last pull | The playbook, or paste on the "My store" tab |
| `data/roster.js` | Your characters' stars, red stars, diamonds, level and power | The playbook, or paste on the "Roster" tab |

Schemas are documented at the top of each file. Files named `data/*.local.js` are ignored by git
if you want to keep personal snapshots out of commits.

## Development

- `engine.js` holds all valuation logic as pure functions, loaded by the page and by the tests.
- `app.js` is the page logic; `index.html` the markup and styles. No build step, no dependencies.
- `npm test` runs the engine tests with Node's built-in runner (Node 18 or newer).
