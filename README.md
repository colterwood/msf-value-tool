# MSF Store Value

A local tool that values the offers in one player's Marvel Strike Force web store: account
CZARFACE, Canadian store, prices in CA$. It is a static page (`index.html` and `app.js` over
`engine.js`) plus a few Node tools. Every price comes from the player's own reads of that store,
kept in `data/reads.json`. There is no outside source, and no tool touches the network.

It answers two questions: which offers are the best value, judged by what each item in them has
cost before, and what is the best way to buy a given item. For every offer it gives the value of
the offer as a whole and of each item in it, against the price in CA$ or in Ultra Cores.

## Status

| Part | State on 14 November 2026 |
| --- | --- |
| Store reads | Four: 18 October, 24 October and 6 November (read from the offer cards) and 14 November (read from the page's own data) |
| Latest read, `data/offers.js` | 14 November, 16:45 UTC: 155 offers with 688 lines, every line with the store's id. 148 offers are priced in CA$ and 7 in Strike Points |
| Archive, `data/reads.json` | 405 offers: the money offers that were read completely, which is 131 of the 212 offers of the first read, then 89 of 120, 109 of 167 and 143 of 155. An offer on sale in several reads is kept once (40 were), so the four counts add up to more |
| Value table, `data/values.js` | 406 rows. 248 have a usual price: 158 sold on their own and 90 only sold together. 247 of the 248 also have one in Ultra Cores, and 46 were first seen on 14 November. 145 rows have no price, 10 are points and 3 are training modules priced from L4 (the page counts the modules and leaves the points out: 251 of 396 items with prices) |
| Ratings of the latest read | Per CA$: 143 offers rated, 5 A, 2 B, 7 C, 73 D and 56 F. Per Ultra Core: 138 rated, 5 A, 2 B, 6 C, 75 D and 50 F |
| Price history, `data/history.js` | Four days, in both currencies |

What is thin:

- Only four reads. Three days stand behind today's usual prices, and 117 of the 202 items priced
  from those days were on sale on only one of them.
- The 46 first-seen items rate about 1×, because the read being rated also set their price. 36 of
  the 155 offers hold only such items, and 27 of those read exactly 1.00×.
- 34 of the 155 offers hold something with no price of its own (or a pass tier), so their value
  is a floor and they are marked incomplete.
- The 7 Strike Store offers have no money price. They get a value per 1,000 Strike Points instead
  of a rating, except one that holds nothing with a price.

## Using it

Open `index.html` in a browser; double-clicking it is enough. No server, no account, nothing to
install. The tools need Node.js. The page shows the latest read, and values an offer you type in
yourself the same way:

- The offers, best value first, each with its price, its value, value ÷ price and a grade.
- Inside an offer, every line: the quantity, what it is worth at its usual price, and what the
  offer is worth for that item alone.
- A switch between CA$ and Ultra Cores, which rates everything again on the other price.
- For one kind of item, every offer that carries it, best first. For every item, the offer that
  sells it cheapest today, next to its usual price and the most an earlier read gave for the
  money. Chain steps that need earlier steps first are left out there: they cannot be bought on
  their own.
- For every item, its price on each read day: the numbers its usual price is the middle of.

## Keeping it current

Nothing updates by itself: a read starts in your signed-in browser.

1. Once: drag the "MSF: grab my offers" link from the page to your bookmarks bar. Drag it again
   whenever `pull.js` changes, because an old bookmark keeps running old code.
2. Open https://marvelstrikeforce.com/en/store signed in and click the bookmark. It only reads: it
   takes the page's own offer data at once (every offer, every item, the CA$ price and the Ultra
   Core price) and copies it. If the page ever stops exposing that data, it falls back to reading
   the offer cards, which is slow and misses the items a card hides behind "+N More".
3. Double-click `update.cmd`, then reload `index.html`.

`update.cmd` runs two commands, which also work by hand:

```
node tools/save-store.js --clipboard --if-newer
node tools/refresh.js
```

The first saves the copied read to `data/offers.js`, and keeps the file when the clipboard holds
no newer read. The second adds that read to `data/reads.json`, creates rows for new resource ids,
prices everything in both currencies, and rewrites `data/values.js` and `data/history.js`.

More reads make the yardstick better: each new read becomes the one being rated, and the one
before it joins the days that usual prices come from. A Claude Code session on this computer with
Claude in Chrome can do the read for you: ask it to run `/msf-store-pull`.

## How an item is priced

The rules are in `tools/market.js`. The evidence is `data/reads.json`: every offer of every read
that was priced in CA$ and read completely.

- **Sold on its own.** An item with offers of its own is priced by those alone. A read day's price
  is the cheapest of them: the best way to buy it that day.
- **Only sold together.** An offer in which nothing has ever been sold on its own, up to that day,
  splits its price evenly, line by line: T3 Level 4 and Level 5 Ions, the pieces of a gear pack.
- **Usual price.** The middle of the day prices over the read days before the read being rated.
  Today's offers never set their own yardstick, so a sale reads as a sale.
- **First seen.** An item with no earlier day price is priced by the rated read itself, the same
  two ways, so it rates about 1× until there is a second read.
- **No price of its own.** An item that only ever comes beside things sold on their own has no
  price and is never guessed at: T1 to T3 ability materials next to T4, a promotion next to
  shards. The offer is rated on the rest and marked incomplete.
- **Priced together.** The stat crystals of a tier are one thing for pricing, whatever their
  class and stat. L1 to L3 training modules are priced from L4 by XP.
- **Not evidence.** A chain step that cannot be bought yet, and an offer holding a pass tier or a
  Time Heist level, which the store does not itemize. Event points and Strike Points are never
  counted.

Everything is kept twice: per CA$ and per Ultra Core. Every money offer but the Ultra Core packs
also has an Ultra Core price, and a read from the page data carries it. A card read does not, but
every money offer pays a web bonus of 10 Strike Points per Ultra Core of its price, so its core
price is that bonus divided by ten. Without a bonus line it gets the core price of its CA$ tier
(CA$12.99 is 100 cores) when the reads show only one for that tier: CA$49.99 is both the 350 and
the 400 core tier.

## How an offer is valued

- The value of an offer is the sum of quantity × usual price over its counted lines. Value per CA$
  is that value ÷ the CA$ price, and value per Ultra Core is the value in cores ÷ the core price.
  1× means the offer charges what its contents usually cost you.
- Each line also shows its own value ÷ the offer's price: what the offer is worth for that item
  alone. The lines add up to the offer. In the list of offers they are rounded so that they add
  up exactly as shown, which can move one of them by a cent; where offers are compared with each
  other (shop by resource, best buys) the figures are the exact ones, rounded only for display.
- Nothing is adjusted for the player: no plan, no roster rule, no discount on orbs or anything
  else (`meta.valueMultipliers` is not set).
- A chain step is rated on its own price and contents, or with the steps before it added in.

The grade comes from the number as shown, to two decimals, in either currency (`meta.grades`):

| Grade | Value ÷ price | Meaning |
| --- | --- | --- |
| A | 2.5× and up | the deals of the day |
| B | 1.75× to 2.5× | clearly better than the usual price |
| C | 1.25× to 1.75× | a bit better than usual |
| D | 1× to 1.25× | about the usual price |
| F | below 1× | worse than usual: wait |

**A worked example** from the 14 November read. Turn Up the Power (option 1) costs CA$6.99 or 50
Ultra Cores. T4 Ability Material ×210 is worth CA$5.61 at its usual price, which is 0.80× of the
price. T4 Level 1 Ions ×31,000 are worth CA$5.17, or 0.74×. The offer is worth CA$10.78, or 1.54×:
grade C (its 500 Strike Points are not counted). In Ultra Cores the lines read 0.90× and 0.72×,
and the offer 1.62×. The currencies differ because the tiers do not charge the same CA$ per core:
CA$6.99 is 50 cores, CA$12.99 is 100.

**Why a sale reads as a sale.** T3 stat crystals usually cost about 10 per CA$: 405 for CA$39.99
on each of the three earlier reads. On 14 November the ISO Fest packs (T3 L5 Ions Blaster, Brawler
and Controller Pack) sell 405 of them plus 9.3 million ions for CA$12.99. They read 5.64×, and the
ISO Fest: T3 Level 5 Ions Trove reads 11.04× (5.56× and 10.85× in Ultra Cores).

## Limits

- Items tied to one character (shards, promotions, awakened ability materials) are priced for
  that character alone, so a new character's offers are first seen.
- The even split inside sets is a convention, not knowledge.
- 145 rows have no price: no complete money offer has carried them, or they only come beside
  things sold on their own, or only in chain steps that could not be bought yet.
- A read is filed under its UTC date, and a later read of the same day replaces the earlier one.
- In-game Power Core prices (the `cores` field of a row, "Cores in game") are still empty. Power
  Cores are a different currency from Ultra Cores.
- A CA$ value typed into the page's value table stays in the browser and wins over the file there;
  the page's header names the rows. Values typed in an older version of the page were in US$ on
  another table's units: the page drops them once and says so.
- The time an offer has left is counted down from the read, so it is only as right as the store's
  own "15d 4h" was.

## Files

| File | Holds | Written by |
| --- | --- | --- |
| `data/offers.js` | The latest read: every offer with its contents, its CA$ price and its Ultra Core price | `tools/save-store.js` |
| `data/reads.json` | The archive: every complete money offer of every read, with its CA$ and Ultra Core price on each read day | `tools/refresh.js` |
| `data/values.js` | The value table. Per item: `value` (CA$ for `per` units), `coreValue` (Ultra Cores for `per` units) and `observed` (`basis`, `perCash`, `perCore`, `days`, `firstSeen`, `byDay` with its price on each read day, `best`). Also the grade bands and `meta.baseline` | `tools/refresh.js` |
| `data/history.js` | Per item and read day, in both currencies: how many offers carried it, the best and the average amount one unit of price bought, and the offer behind the best. The stat crystals of a tier are one record | `tools/refresh.js` |
| `data/roster.js` | The roster as read on 18 October 2026. Still loaded, only so that old card reads can recognise a bare character name | nothing now |
| `data/personal.js` | The old plan. The page no longer uses it | nothing now |

## Development

- `engine.js` values offers with pure functions; the page (`app.js`, `index.html`) and the tests
  both load it. `tools/market.js` holds the pricing rules, `tools/refresh.js` and
  `tools/save-store.js` are the commands `update.cmd` runs, and `pull.js` is the reader behind the
  bookmark. No build step, no dependencies. `node tools/refresh.js --dry-run` reports without
  writing.
- `npm test` runs the tests with Node's built-in runner (Node 18 or newer). One test rebuilds the
  prices from `data/reads.json` and compares them with `data/values.js`, so commit the data
  files together. The worked example above is checked too, for as long as the 14 November read
  is the one in `data/offers.js`.
