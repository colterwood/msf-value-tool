# MSF Store Value

A local tool for valuing Marvel Strike Force store offers, in the spirit of the
[msfwar Spenders Guide](https://www.msfwar.com/spenders-guide/) but run against your own store
and your own roster.

It does two things:

- **Value an offer you type in.** Enter the price and the contents; it returns the value per US
  dollar with a grade, an msfwar-style letter, and a per-item breakdown.
- **Rank the offers live in your store.** Your logged-in web store is read into
  `data/offers.js` (bookmarklet or a desktop Claude session); the "My store" tab ranks the
  offers best first and, with "Personalize" on, by what each is worth to *your* plan: the
  characters you build and the resources you are short of.
- **Shop by resource.** Pick All for every offer, or gold, training materials, character upgrades, ability materials,
  event points, ISO-8, gear, orbs or everything else, and see every offer that contains it with
  two numbers: what that resource alone is worth against the whole price, and what the whole
  offer is worth. Each row also says how it compares with the best offer for that resource in
  your store today (best 100, half the value per US$ 50), the way msfwar's resource view does,
  while the grade still compares it with msfwar's historical average.

Everything runs in your browser from a folder on your machine. No server, no account, no install.

## Status

| Part | State |
| --- | --- |
| Valuation engine and tests | Done. msfwar-style scoring, currency conversion and point exclusion added 18 October 2026 |
| Local page: offer entry, store ranking, value table editor, roster | Done |
| msfwar item values in `data/values.js` | **Loaded 18 October 2026**: 181 of 313 items carry msfwar's observed average; L1 to L3 training modules are priced from L4 by XP; the rest are items msfwar had no baseline for (gear catalysts, most character shards, some orbs) and show as unpriced |
| Live offers in `data/offers.js` | **Loaded 18 October 2026, 19:38 UTC**: 212 offers from every section of the web store, prices in CA$ |
| Roster in `data/roster.js` | **Loaded 18 October 2026**: all 389 characters (237 unlocked, 28 at 7 stars) from the roster stats table |
| Plan in `data/personal.js` | **Loaded 18 October 2026**: the 50 characters on the MSF Sheet's "Characters I Will Build" tab, gold and L4 budgets from "Resource Budgeting", ability totals from "T4 Priority", ISO tiers from "ISO Priority", and 351 gear counts from the portal's Inventory page |
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

## Refreshing your store yourself

The page cannot read the store on its own: offers exist only in your signed-in browser. The My
store tab has a three-click refresh that needs no Claude session:

1. Once, drag the "MSF: grab my offers" link from the My store tab to your bookmarks bar. It is a
   bookmarklet built from `pull.js`.
2. Open https://marvelstrikeforce.com/en/store signed in and click the bookmark. It scrolls every
   offer card into view (the store renders them lazily, so this takes about two minutes for 150
   cards; keep the tab in front, cards only render while visible), reads them, and copies the
   offers as JSON, also showing them in a box on the page with a Copy button.
3. Back on the My store tab, paste into the box and click "Import pasted offers". The ranking
   updates at once and the browser remembers it. To keep it in the repo, paste the same JSON into
   `data/offers.js`, or let a Claude session run `/msf-store-pull`.

The bookmarklet only reads the page. It never clicks Buy or touches a payment form.

## Pulling your store through Chrome

The pull needs a Claude Code session running on your computer with the Chrome integration,
because the web store only shows offers to a logged-in browser and there is no public API.
Claude opens its own tabs in your Chrome and shares your login state, so it sees what you see.
Steps from the Claude Code docs (https://code.claude.com/docs/en/chrome):

1. Install the Claude in Chrome extension from the Chrome Web Store and sign it in to the same
   claude.ai account as Claude Code. Needs a Pro, Max, Team or Enterprise plan. Not supported
   inside WSL.
2. Sign in to https://marvelstrikeforce.com in Chrome.
3. Open this folder in the Claude Desktop app with Claude in Chrome connected, or in a terminal
   in this folder run `claude --chrome` and confirm with `/chrome` that the extension is
   detected (restart Chrome and run `/chrome` again if it is not).
4. Ask it to run `/msf-store-pull`. The skill reads the store and the roster stats table,
   refreshes msfwar's observed averages, writes the three data files, checks `index.html`,
   runs the tests and commits. Approve the "Claude in Chrome wants to" prompts; allowing the
   site for the session saves clicks.
5. Reload `index.html`. The header shows how many items have values, how many offers loaded and
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
- **Price in in-game currency.** Strike Store offers are priced in Strike Points; such a price
  converts through the value table's own entry for that currency (Strike Points at msfwar's
  average, 100 per dollar) rather than being mistaken for dollars.
- **Value per dollar is the score.** Offer value is the sum of counted items' dollar values at
  the observed averages; divided by the US-dollar price it gives the value per dollar. 1× means
  the offer is priced like msfwar's average web-store offer for the same things. With
  Personalize on, items are first multiplied by what they are worth to your plan. This is what
  the My store tab sorts by, and what "Best buys" is built on.

  Scoring chart (`meta.grades`, editable on the Value table tab):

  | Grade | Value per US$ | Meaning |
  | --- | --- | --- |
  | A | 2.5× and up | the deals of the day |
  | B | 1.75× to 2.5× | clearly better than the usual price |
  | C | 1.25× to 1.75× | a bit better than usual |
  | D | 1× to 1.25× | about the usual price |
  | F | below 1× | worse than usual; wait |

  The bands were set on 18 October 2026 so that the day's 50 fully valued offers spread
  2 / 7 / 11 / 13 / 17 across A to F.
- **Orbs are lottery tickets.** Orb and orb-fragment items count 20% of their face value at
  msfwar's averages (`meta.valueMultipliers`, editable), so a bundle cannot look good on the
  strength of a gamble.
- **Chain offers.** A chain's later steps cannot be bought before the earlier ones. The
  bookmarklet reads every step of each chain (the card's step selector previews them), and each
  step becomes its own offer with the chain attached. By default every step is ranked, graded
  and shopped on its own price and contents ("Chain steps: each step on its own" above the
  list), and a step that needs earlier steps shows the whole path beside it: steps and prices
  added together. Switch to "with the steps before it added in" to rank, grade and shop later
  steps on that path instead; the breakdown always shows both readings. Steps already bought
  are shown but not ranked, and a path with an unreadable price on any step is left unvalued.
- **Training modules by XP.** L1, L2, L3 and L4 modules are worth 50, 200, 800 and 1,600 XP.
  msfwar only lists L4, so the other levels are priced from it by XP (`derivedFrom` in
  `data/values.js`, which also carries `xp`), inherit its baseline, and the breakdown says so.
  Shop by resource shows training offers in XP per US$ so levels compare directly.
- **Per item, "vs typical".** The breakdown also shows each item's own ratio: the units per
  dollar this offer gives divided by that item's msfwar average, counting the whole price. It
  tells you which part of a bundle is the bargain. msfwar's combined category score built from
  those ratios (typical 70, capped at 100) is no longer shown: it judged every item as if it
  were the whole offer, so a five-item bundle worth 1.8× its price scored an F while a plain
  gold pack scored an A. The engine still computes it for anyone who wants it.
- **Score per offer.** Items average within their category and categories combine by weight:
  gold 30, training materials 30, orange (T4) ISO-8 20, character shards 15, everything else 5.
  Only the categories present share the weighting, so extra item types cannot inflate a grade.
  Letters: A at 90, B at 80, C at 70, D at 60, F below. msfwar states the A, B and C bands; D, F
  and the clamp are this tool's reading of its description and can be edited in `meta.scoring`.
- **Not counted.** Milestone points and Strike Points are listed but excluded, as on msfwar.
  Items msfwar has no baseline for are listed as unpriced and leave the offer marked incomplete.
  Offers whose card hides part of its contents behind "+N More" carry a note and rank after
  complete ones.
- **Best buys by resource.** Under the store list, every resource the store sells with the
  offer that sells it cheapest, two ways: "price share" charges each item in a bundle its share
  of the price in proportion to its value, so bundles compare fairly; "whole price" counts the
  full price against that one resource. Both are shown as units per US dollar next to msfwar's
  typical figure, in generic terms (your plan does not change what gold costs).
- **Thin baselines.** An item whose msfwar average rests on fewer than
  `meta.scoring.minObservations` offer observations (5), or that the table flags as suspect
  (for example shards at thousands per dollar, which means msfwar counted a free claim), is
  shown but left out of the score, the way msfwar leaves ungraded resources out, and the offer is
  marked incomplete. A value you type on the Value table tab overrides that guard.
- **Personalization.** With "Personalize" on, the personal score replaces each item's value with
  what it is worth to you, and the generic msfwar number stays visible beside it:
  - shards of a character already at 7 stars on your roster count
    `meta.shardRules.maxedMultiplier` (default 0);
  - shards, awakened ability materials and diamond or red-star promotions for a character who is
    not on your build list (`data/personal.js`, from the MSF Sheet) count `offListMultiplier`
    (default 0);
  - resources your plan marks surplus count `surplusMultiplier` (default 25%): L1 to L3 training
    modules, orange (T4) ISO-8 while no character on the ISO list needs it, and gear below the
    Crimson tier, of which the inventory holds hundreds to tens of thousands. Resources marked
    useless count `uselessMultiplier` (default 0), and an entry or rule may carry its own
    `multiplier` instead. Ability materials follow what you said on 18 October 2026: T4 is by
    far the most valuable and counts in full, T3 counts 10%, T2 and T1 count nothing (the MSF
    Sheet's T4 Priority tab lists all four as needed, so the sheet does not decide this). Gold,
    L4 modules, T1 to T3 ISO-8 and Crimson gear are marked short and count in full. Everything
    without a rule counts in full.
  - "Only offers that help my plan" hides offers in which every item the table recognises was
    zeroed by those rules. An offer the table cannot value at all is neither hidden nor flagged.
  The Roster & plan tab shows every rule and lets you replace the character list.

## Data files

| File | Contents | Written by |
| --- | --- | --- |
| `data/values.js` | Item value table, exchange rates and scoring rules | The playbook from msfwar, or you |
| `data/offers.js` | Offers in your store at the last pull | The playbook, or paste on the "My store" tab |
| `data/roster.js` | Your characters' stars, red stars, diamonds, level and power | The playbook, or paste on the "Roster" tab |
| `data/personal.js` | Your build list, resource shortages, surplus rules and gear inventory | The playbook from the MSF Sheet and the Inventory page, or edit on the "Roster & plan" tab |

Schemas are documented at the top of each file. Files named `data/*.local.js` are ignored by git
if you want to keep personal snapshots out of commits.

## Development

- `engine.js` holds all valuation logic as pure functions, loaded by the page and by the tests.
- `app.js` is the page logic; `index.html` the markup and styles. No build step, no dependencies.
- `npm test` runs the engine tests with Node's built-in runner (Node 18 or newer).
