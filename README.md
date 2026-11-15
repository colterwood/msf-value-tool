# MSF Store Value

A local tool that values the offers in one player's Marvel Strike Force web store: account
CZARFACE, Canadian store, prices in CA$. It is a static page (`index.html` and `app.js` over
`engine.js`) plus a few Node tools. Every price comes from the player's own reads of that store,
kept in `data/reads.json`. There is no outside source, and no tool touches the network.

It answers two questions: which offers are the best value, judged by what each item in them has
cost before, and what is the best way to buy a given item. For every offer it gives the value of
the offer as a whole and of each item in it, against the price in CA$ or in Ultra Cores.

## Status

The numbers here describe the read of 15 November 2026, the one this version was built and checked
on. Every later read changes them: the page's header and `node tools/refresh.js --dry-run` give the
current ones.

| Part | State on 15 November 2026 |
| --- | --- |
| Store reads | Five: 18 October, 24 October and 6 November (read from the offer cards), 14 and 15 November (read from the page's own data) |
| That read, `data/offers.js` | 15 November, 20:13 UTC: 154 offers with 687 lines, every line with the store's id. 147 offers are priced in CA$ and 7 in Strike Points |
| Archive, `data/reads.json` | 414 offers: the money offers that were read completely, which is 131 of the 212 offers of the first read, then 89 of 120, 109 of 167, 143 of 155 and 144 of 154. An offer on sale in several reads is kept once (175 were), so the five counts add up to more |
| Value table, `data/values.js` | 409 rows. 251 have a usual price: 158 sold on their own and 93 only sold together. 250 of the 251 also have one in Ultra Cores, and 3 were first seen on 15 November. 145 rows have no price, 10 are points and 3 are training modules priced from L4 (the page counts the modules and leaves the points out: 254 of 399 items with prices) |
| Ratings of that read | Per CA$: 142 offers rated, 8 A, 2 B, 9 C, 73 D and 50 F. Per Ultra Core: 137 rated, 8 A, 2 B, 11 C, 72 D and 44 F |
| Price history, `data/history.js` | Five days, in both currencies |

What was thin on that day:

- Five reads in four weeks. Of the 248 rows priced from earlier days, 140 rest on a single day, 34
  on two, 33 on three and 41 on four. Where there is one day, that day's price is the usual price.
- Gold's usual price is 700K per CA$. It sold alone on three reads, and the better offers (about
  1.2M per CA$) were there for 65% of that time, just short of the two thirds the rule asks for.
  More reads will settle it.
- 33 of the 154 offers hold something with no price of its own (or a pass tier), so their value
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
- For every item, its price on each read day: the numbers its usual price is picked from.

## Keeping it current

Nothing updates by itself: a read starts in your signed-in browser.

1. Once: drag the "MSF: grab my offers" link from the page to your bookmarks bar. Drag it again
   whenever `pull.js` changes, because an old bookmark keeps running old code.
2. Open https://marvelstrikeforce.com/en/store signed in and click the bookmark. It only reads: it
   takes the page's own offer data at once (every offer, every item, the CA$ price and the Ultra
   Core price) and copies it. Nothing scrolls, so it is done at once: a panel at the top right
   says how many offers and items it read. If the page ever stops exposing that data, it falls
   back to reading the offer cards, which is slow and misses the items a card hides behind
   "+N More".
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
- **Usual price.** The best of the day prices that was matched or beaten at least two thirds of
  the time, over the reads of the last six months before the read being rated. Each read counts
  for the days it stands for: half the gap to the read before it and half the gap to the read
  after it, at most a week each way. So today's offers never set their own yardstick, reading the
  store every day of a sale adds days rather than votes, and a sale price only becomes the usual
  price once it has stood for two thirds of the record.
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

**A worked example** from the 15 November read. T3 L5 Ions Brawler Pack costs CA$12.99 or 100
Ultra Cores (its Strike Points and event points are not counted):

| | Value | Per CA$ | Per Ultra Core |
| --- | --- | --- | --- |
| T3 stat crystals ×405 | CA$39.99 | 3.08× | 3.00× |
| T3 Level 1 Ions ×3,000,000 | CA$14.43 | 1.11× | 1.11× |
| T3 Level 4 Ions ×3,000,000 | CA$11.11 | 0.85× | 0.83× |
| T3 Level 5 Ions ×3,300,000 | CA$9.84 | 0.76× | 0.76× |
| Full offer | CA$75.37 | 5.80×, grade A | 5.70×, grade A |

The currencies differ because the price tiers do not all charge the same CA$ per Ultra Core:
CA$12.99 is 100 cores, and the CA$39.99 the crystals usually cost is 300.

**Why a sale reads as a sale.** T3 stat crystals cost about 10 per CA$: 405 for CA$39.99 on each
of the three reads that sold them alone. The ISO Fest packs (T3 L5 Ions Blaster, Brawler and
Controller Pack) sell 405 of them plus 9.3 million ions for CA$12.99, so they read 5.80×, and the
ISO Fest: T3 Level 5 Ions Trove reads 11.26× (5.70× and 11.04× in Ultra Cores).

**Why it stays a sale.** T3 Level 5 Ions were at the fest price on three of the five reads
(858K per CA$ against 335K and 270K). Counted per read, two more daily reads would make the fest
price the usual one. Counted by time, the earlier fest reads stand for 14.5 of the 34.5 days on
record and each further daily read adds one day, so the usual price stays 335K and the fest's
ions-only offer reads 1.78× to the end of the fest.

## Limits

- Items tied to one character (shards, promotions, awakened ability materials) are priced for
  that character alone, so a new character's offers are first seen.
- The even split inside sets is a convention, not knowledge.
- The two thirds is a choice. At one half, a two-week sale read daily would become the usual price
  after about a week on a one-month record. At two thirds, a better price that was there for less
  than two thirds of the time is not the usual one, which is what happens to gold above.
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
  files together. The worked example above is checked too, for as long as the 15 November read
  is the one in `data/offers.js`.
