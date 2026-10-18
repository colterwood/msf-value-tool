# MSF Store Value

A local tool for valuing Marvel Strike Force store offers, in the spirit of the
[msfwar Spenders Guide](https://www.msfwar.com/spenders-guide/) but run against your own store
and your own roster.

It does two things:

- **Value an offer you type in.** Enter the price and the contents; it returns the value, the
  value per dollar spent, and a grade, with a per-item breakdown.
- **Rank the offers live in your store.** A desktop Claude session reads your logged-in web store
  through Chrome into `data/offers.js`; the "My store" tab ranks them best value first. Your roster
  can discount shards you no longer need.

Everything runs in your browser from a folder on your machine. No server, no account, no install.

## Status

| Part | State |
| --- | --- |
| Valuation engine and tests | Done |
| Local page: offer entry, store ranking, value table editor, roster | Done |
| Playbook for pulling store, roster and msfwar values through Chrome | Done, untested against the live sites |
| msfwar item values in `data/values.js` | **Not loaded.** Every value is `null` until a desktop session runs the playbook or you fill them in |
| Live offers in `data/offers.js`, roster in `data/roster.js` | Empty until the playbook runs |

The session that built this ran in a cloud container whose network policy blocks msfwar.com and
marvelstrikeforce.com, so the value numbers and the store scraping could not be done there.

## Quick start

1. Clone or download this repository.
2. Open `index.html` in Chrome (double-click it, or `npm run serve` and open http://localhost:8765).
3. On **Value an offer**, enter a price and the contents. Items the table does not know are flagged
   with an "add" button; items without a value yet are flagged too.
4. On **Value table**, type in values as you learn them. Edits are kept in the browser; "Export
   JSON" writes the merged table so you can paste it into `data/values.js` as the new baseline.

## Pulling your store through Chrome

The pull needs a Claude session running on your computer with browser tools, because the web
store only shows offers to a logged-in browser and there is no public API for them.

1. Sign in to https://marvelstrikeforce.com in Chrome.
2. Open this folder in the Claude Desktop app (with Claude in Chrome connected) or run `claude`
   in a terminal in this folder.
3. Ask it to run `/msf-store-pull`. The skill in `.claude/skills/msf-store-pull/SKILL.md` reads
   the store and roster pages, writes `data/offers.js` and `data/roster.js`, loads the msfwar
   values into `data/values.js`, then opens `index.html` to check the result.
4. Reload `index.html`. The header shows how many offers and roster characters loaded.

The skill never clicks Buy or touches a payment form. It records what the store shows and flags
anything it could not read rather than guessing.

## How value is computed

- Each item in the value table has a `value` for `per` units, in `meta.unit` (US dollars, or Power
  Cores converted through `meta.unitPerUsd`).
- Offer value = sum over contents of quantity × unit value. Items without a value are listed and
  left out of the sum, and the offer is marked incomplete.
- Value per dollar = offer value in dollars ÷ price. The grade comes from `meta.grades`
  (default: Excellent ≥ 3×, Good ≥ 2×, Fair ≥ 1×, Poor below 1×). These thresholds are
  placeholders until the msfwar methodology is loaded.
- With a roster loaded and "Personalize" on, shards of a character already at 7 stars count
  `meta.shardRules.maxedMultiplier` (default 0) of their generic value. The generic number is
  still shown beside the personal one.

## Data files

| File | Contents | Written by |
| --- | --- | --- |
| `data/values.js` | Item value table and grading rules | You, or the playbook from msfwar |
| `data/offers.js` | Offers currently in your store | The playbook, or paste on the "My store" tab |
| `data/roster.js` | Your characters' star counts | The playbook, or paste on the "Roster" tab |

Schemas are documented at the top of each file. Files named `data/*.local.js` are ignored by git
if you want to keep personal snapshots out of commits.

## Development

- `engine.js` holds all valuation logic as pure functions, loaded by the page and by the tests.
- `app.js` is the page logic; `index.html` the markup and styles. No build step, no dependencies.
- `npm test` runs the engine tests with Node's built-in runner (Node 18 or newer).
