/*
 * Offers currently live in the player's store.
 *
 * Written by tools/save-store.js from a read of the logged-in web store: the bookmark from the
 * "My store" tab, or a desktop Claude session through Chrome (.claude/skills/msf-store-pull).
 * The page loads this file on open; the "My store" tab can also take the same JSON pasted in.
 * After a new read: node tools/refresh.js (update.cmd saves the read and runs it).
 *
 * Schema:
 *   {
 *     updated: "2026-11-14T16:45:48Z",  // when the store was read
 *     source: "web-store" | "in-game",
 *     bookmarklet: "2026-11-14",        // version of the reader that wrote it
 *     offers: [
 *       {
 *         name: "Offer title as shown",
 *         price: 9.99,
 *         currency: "CAD",              // or "Strike Points" for the Strike Store
 *         purchaseLimit: 1,              // null when unlimited
 *         expires: "15d 4h",             // time left when read; null when not shown
 *         section: "Offers / EVENTS",    // where the store lists it; sections: every place
 *         contents: [
 *           { item: "Gold", id: "SC", qty: 500000 },   // id: the store's own resource id (page-data reads)
 *           { item: "Iron Man shards", qty: 50 },      // a card read has names only
 *           { key: "orb:premium", qty: 3 }             // key targets a value-table key directly
 *         ],
 *         chain: { name, step, of, current, steps: [...] },   // on a chain step
 *         notes: "+3 more items not shown"                    // only when the read was incomplete
 *       }
 *     ]
 *   }
 */
window.MSF_OFFERS = {
  "updated": "2026-11-14T16:45:48.102Z",
  "source": "web-store",
  "bookmarklet": "2026-11-14",
  "account": "CZARFACE level 109",
  "priceCurrency": "CAD",
  "note": "Read from the logged-in web store with the MSF Store Value bookmarklet, from the page's own offer data: every offer lists all of its contents (nothing is hidden behind \"+N More\"), and each line carries the store's resource id.",
  "offers": [
    {
      "name": "Catch up on Wasp (Janet)'s Milestones",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 2,
      "expires": "9d 4h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Designed to Sting Milestone Points",
          "id": "EVTA_META_SEP_O",
          "qty": 1
        },
        {
          "item": "Founding Force Milestone Points",
          "id": "EVTA_META_SEP_N",
          "qty": 2
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "boughtBefore": true,
      "ultraCores": 100,
      "description": "Behind on the two milestones? Here is an special catch-up offer for those still hoping to finish up the milestones."
    },
    {
      "name": "Short on Wasp (Janet) Shards?",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 8,
      "expires": "9d 4h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Wasp (Janet) shards",
          "id": "SHARD_WASPJANET",
          "qty": 100
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "ultraCores": 200,
      "description": "Didn't finish the Chapter Battle Pass? Grab your missing shards before this offer ends!"
    },
    {
      "name": "Battle Pass Catch-Up!",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "2d 4h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "BPETIER_NOV26_1_BATTLEPASS_HUB_WRAPPER_1c9e9c86",
          "id": "BPETIER_NOV26_1_BATTLEPASS_HUB_WRAPPER_1c9e9c86",
          "qty": 15
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "ultraCores": 100,
      "description": "Get 15 Level Tokens to catch up on Battle Pass progress!"
    },
    {
      "name": "Short on West Coast Avenger Shards?",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": 8,
      "expires": "9d 4h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "War Machine shards",
          "id": "SHARD_WARMACHINE",
          "qty": 100
        },
        {
          "item": "Tigra shards",
          "id": "SHARD_TIGRA",
          "qty": 100
        },
        {
          "item": "Mockingbird shards",
          "id": "SHARD_MOCKINGBIRD",
          "qty": 100
        },
        {
          "item": "Hawkeye shards",
          "id": "SHARD_HAWKEYE",
          "qty": 100
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1500,
          "webBonus": true
        }
      ],
      "ultraCores": 150,
      "description": "Grab your missing West Coast Avenger shards before this offer ends!"
    },
    {
      "name": "Savage Leader (step 1 of 7)",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "8d 4h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Cyclops (Mighty) shards",
          "id": "SHARD_CYCLOPSMIGHTY",
          "qty": 45
        },
        {
          "item": "Cyclops (Mighty) — 4 red star promotion",
          "id": "RS_CYCLOPSMIGHTY_4",
          "qty": 1
        },
        {
          "item": "T4 Level 1 Ions",
          "id": "ISO8-TIER-3-A-CURRENCY",
          "qty": 20000
        },
        {
          "item": "Basic T4 Iso-8 Orb Fragments",
          "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
          "qty": 10000
        },
        {
          "item": "Gold",
          "id": "SC",
          "qty": 5000000
        },
        {
          "item": "L4 Training Module",
          "id": "CONSUMABLE_XPLVL80",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Savage Leader",
        "step": 1,
        "of": 7,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Savage Leader",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 45
              },
              {
                "item": "Cyclops (Mighty) — 4 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_4",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 20000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 10000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 3000,
                "webBonus": true
              }
            ],
            "ultraCores": 300
          },
          {
            "step": 2,
            "name": "Savage Leader",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 55
              },
              {
                "item": "Cyclops (Mighty) — 5 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_5",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 30000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 10000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 3000,
                "webBonus": true
              }
            ],
            "ultraCores": 300
          },
          {
            "step": 3,
            "name": "Savage Leader",
            "price": 49.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 80
              },
              {
                "item": "Cyclops (Mighty) — 6 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_6",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 40000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 12000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 4000,
                "webBonus": true
              }
            ],
            "ultraCores": 400
          },
          {
            "step": 4,
            "name": "Savage Leader",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 130
              },
              {
                "item": "Cyclops (Mighty) — 7 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_7",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 50000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 14000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 5000,
                "webBonus": true
              }
            ],
            "ultraCores": 500
          },
          {
            "step": 5,
            "name": "Savage Leader",
            "price": 79.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 200
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 60000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 16000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 10000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 800
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 6000,
                "webBonus": true
              }
            ],
            "ultraCores": 600
          },
          {
            "step": 6,
            "name": "Savage Leader",
            "price": 129.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 300
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 80000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 18000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 15000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 1000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 10000,
                "webBonus": true
              }
            ],
            "ultraCores": 1000
          },
          {
            "step": 7,
            "name": "Savage Leader",
            "price": 129.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) — 1 diamond promotion",
                "id": "PD_CYCLOPSMIGHTY_1",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 100000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 20000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 20000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 1500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 10000,
                "webBonus": true
              }
            ],
            "ultraCores": 1000
          }
        ]
      },
      "ultraCores": 300
    },
    {
      "name": "Savage Leader (step 2 of 7)",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "8d 4h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Cyclops (Mighty) shards",
          "id": "SHARD_CYCLOPSMIGHTY",
          "qty": 55
        },
        {
          "item": "Cyclops (Mighty) — 5 red star promotion",
          "id": "RS_CYCLOPSMIGHTY_5",
          "qty": 1
        },
        {
          "item": "T4 Level 1 Ions",
          "id": "ISO8-TIER-3-A-CURRENCY",
          "qty": 30000
        },
        {
          "item": "Basic T4 Iso-8 Orb Fragments",
          "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
          "qty": 10000
        },
        {
          "item": "Gold",
          "id": "SC",
          "qty": 5000000
        },
        {
          "item": "L4 Training Module",
          "id": "CONSUMABLE_XPLVL80",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Savage Leader",
        "step": 2,
        "of": 7,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Savage Leader",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 45
              },
              {
                "item": "Cyclops (Mighty) — 4 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_4",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 20000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 10000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 3000,
                "webBonus": true
              }
            ],
            "ultraCores": 300
          },
          {
            "step": 2,
            "name": "Savage Leader",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 55
              },
              {
                "item": "Cyclops (Mighty) — 5 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_5",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 30000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 10000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 3000,
                "webBonus": true
              }
            ],
            "ultraCores": 300
          },
          {
            "step": 3,
            "name": "Savage Leader",
            "price": 49.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 80
              },
              {
                "item": "Cyclops (Mighty) — 6 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_6",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 40000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 12000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 4000,
                "webBonus": true
              }
            ],
            "ultraCores": 400
          },
          {
            "step": 4,
            "name": "Savage Leader",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 130
              },
              {
                "item": "Cyclops (Mighty) — 7 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_7",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 50000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 14000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 5000,
                "webBonus": true
              }
            ],
            "ultraCores": 500
          },
          {
            "step": 5,
            "name": "Savage Leader",
            "price": 79.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 200
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 60000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 16000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 10000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 800
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 6000,
                "webBonus": true
              }
            ],
            "ultraCores": 600
          },
          {
            "step": 6,
            "name": "Savage Leader",
            "price": 129.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 300
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 80000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 18000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 15000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 1000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 10000,
                "webBonus": true
              }
            ],
            "ultraCores": 1000
          },
          {
            "step": 7,
            "name": "Savage Leader",
            "price": 129.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) — 1 diamond promotion",
                "id": "PD_CYCLOPSMIGHTY_1",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 100000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 20000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 20000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 1500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 10000,
                "webBonus": true
              }
            ],
            "ultraCores": 1000
          }
        ]
      },
      "ultraCores": 300
    },
    {
      "name": "Savage Leader (step 3 of 7)",
      "price": 49.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "8d 4h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Cyclops (Mighty) shards",
          "id": "SHARD_CYCLOPSMIGHTY",
          "qty": 80
        },
        {
          "item": "Cyclops (Mighty) — 6 red star promotion",
          "id": "RS_CYCLOPSMIGHTY_6",
          "qty": 1
        },
        {
          "item": "T4 Level 1 Ions",
          "id": "ISO8-TIER-3-A-CURRENCY",
          "qty": 40000
        },
        {
          "item": "Basic T4 Iso-8 Orb Fragments",
          "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
          "qty": 12000
        },
        {
          "item": "Gold",
          "id": "SC",
          "qty": 5000000
        },
        {
          "item": "L4 Training Module",
          "id": "CONSUMABLE_XPLVL80",
          "qty": 400
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 4000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Savage Leader",
        "step": 3,
        "of": 7,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Savage Leader",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 45
              },
              {
                "item": "Cyclops (Mighty) — 4 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_4",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 20000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 10000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 3000,
                "webBonus": true
              }
            ],
            "ultraCores": 300
          },
          {
            "step": 2,
            "name": "Savage Leader",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 55
              },
              {
                "item": "Cyclops (Mighty) — 5 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_5",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 30000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 10000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 3000,
                "webBonus": true
              }
            ],
            "ultraCores": 300
          },
          {
            "step": 3,
            "name": "Savage Leader",
            "price": 49.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 80
              },
              {
                "item": "Cyclops (Mighty) — 6 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_6",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 40000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 12000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 4000,
                "webBonus": true
              }
            ],
            "ultraCores": 400
          },
          {
            "step": 4,
            "name": "Savage Leader",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 130
              },
              {
                "item": "Cyclops (Mighty) — 7 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_7",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 50000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 14000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 5000,
                "webBonus": true
              }
            ],
            "ultraCores": 500
          },
          {
            "step": 5,
            "name": "Savage Leader",
            "price": 79.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 200
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 60000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 16000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 10000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 800
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 6000,
                "webBonus": true
              }
            ],
            "ultraCores": 600
          },
          {
            "step": 6,
            "name": "Savage Leader",
            "price": 129.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 300
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 80000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 18000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 15000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 1000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 10000,
                "webBonus": true
              }
            ],
            "ultraCores": 1000
          },
          {
            "step": 7,
            "name": "Savage Leader",
            "price": 129.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) — 1 diamond promotion",
                "id": "PD_CYCLOPSMIGHTY_1",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 100000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 20000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 20000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 1500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 10000,
                "webBonus": true
              }
            ],
            "ultraCores": 1000
          }
        ]
      },
      "ultraCores": 400
    },
    {
      "name": "Savage Leader (step 4 of 7)",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "8d 4h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Cyclops (Mighty) shards",
          "id": "SHARD_CYCLOPSMIGHTY",
          "qty": 130
        },
        {
          "item": "Cyclops (Mighty) — 7 red star promotion",
          "id": "RS_CYCLOPSMIGHTY_7",
          "qty": 1
        },
        {
          "item": "T4 Level 1 Ions",
          "id": "ISO8-TIER-3-A-CURRENCY",
          "qty": 50000
        },
        {
          "item": "Basic T4 Iso-8 Orb Fragments",
          "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
          "qty": 14000
        },
        {
          "item": "Gold",
          "id": "SC",
          "qty": 5000000
        },
        {
          "item": "L4 Training Module",
          "id": "CONSUMABLE_XPLVL80",
          "qty": 500
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Savage Leader",
        "step": 4,
        "of": 7,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Savage Leader",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 45
              },
              {
                "item": "Cyclops (Mighty) — 4 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_4",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 20000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 10000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 3000,
                "webBonus": true
              }
            ],
            "ultraCores": 300
          },
          {
            "step": 2,
            "name": "Savage Leader",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 55
              },
              {
                "item": "Cyclops (Mighty) — 5 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_5",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 30000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 10000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 3000,
                "webBonus": true
              }
            ],
            "ultraCores": 300
          },
          {
            "step": 3,
            "name": "Savage Leader",
            "price": 49.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 80
              },
              {
                "item": "Cyclops (Mighty) — 6 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_6",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 40000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 12000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 4000,
                "webBonus": true
              }
            ],
            "ultraCores": 400
          },
          {
            "step": 4,
            "name": "Savage Leader",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 130
              },
              {
                "item": "Cyclops (Mighty) — 7 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_7",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 50000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 14000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 5000,
                "webBonus": true
              }
            ],
            "ultraCores": 500
          },
          {
            "step": 5,
            "name": "Savage Leader",
            "price": 79.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 200
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 60000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 16000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 10000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 800
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 6000,
                "webBonus": true
              }
            ],
            "ultraCores": 600
          },
          {
            "step": 6,
            "name": "Savage Leader",
            "price": 129.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 300
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 80000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 18000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 15000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 1000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 10000,
                "webBonus": true
              }
            ],
            "ultraCores": 1000
          },
          {
            "step": 7,
            "name": "Savage Leader",
            "price": 129.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) — 1 diamond promotion",
                "id": "PD_CYCLOPSMIGHTY_1",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 100000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 20000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 20000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 1500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 10000,
                "webBonus": true
              }
            ],
            "ultraCores": 1000
          }
        ]
      },
      "ultraCores": 500
    },
    {
      "name": "Savage Leader (step 5 of 7)",
      "price": 79.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "8d 4h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Cyclops (Mighty) shards",
          "id": "SHARD_CYCLOPSMIGHTY",
          "qty": 200
        },
        {
          "item": "T4 Level 1 Ions",
          "id": "ISO8-TIER-3-A-CURRENCY",
          "qty": 60000
        },
        {
          "item": "Basic T4 Iso-8 Orb Fragments",
          "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
          "qty": 16000
        },
        {
          "item": "Gold",
          "id": "SC",
          "qty": 10000000
        },
        {
          "item": "L4 Training Module",
          "id": "CONSUMABLE_XPLVL80",
          "qty": 800
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 6000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Savage Leader",
        "step": 5,
        "of": 7,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Savage Leader",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 45
              },
              {
                "item": "Cyclops (Mighty) — 4 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_4",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 20000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 10000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 3000,
                "webBonus": true
              }
            ],
            "ultraCores": 300
          },
          {
            "step": 2,
            "name": "Savage Leader",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 55
              },
              {
                "item": "Cyclops (Mighty) — 5 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_5",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 30000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 10000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 3000,
                "webBonus": true
              }
            ],
            "ultraCores": 300
          },
          {
            "step": 3,
            "name": "Savage Leader",
            "price": 49.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 80
              },
              {
                "item": "Cyclops (Mighty) — 6 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_6",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 40000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 12000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 4000,
                "webBonus": true
              }
            ],
            "ultraCores": 400
          },
          {
            "step": 4,
            "name": "Savage Leader",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 130
              },
              {
                "item": "Cyclops (Mighty) — 7 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_7",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 50000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 14000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 5000,
                "webBonus": true
              }
            ],
            "ultraCores": 500
          },
          {
            "step": 5,
            "name": "Savage Leader",
            "price": 79.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 200
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 60000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 16000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 10000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 800
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 6000,
                "webBonus": true
              }
            ],
            "ultraCores": 600
          },
          {
            "step": 6,
            "name": "Savage Leader",
            "price": 129.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 300
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 80000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 18000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 15000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 1000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 10000,
                "webBonus": true
              }
            ],
            "ultraCores": 1000
          },
          {
            "step": 7,
            "name": "Savage Leader",
            "price": 129.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) — 1 diamond promotion",
                "id": "PD_CYCLOPSMIGHTY_1",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 100000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 20000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 20000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 1500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 10000,
                "webBonus": true
              }
            ],
            "ultraCores": 1000
          }
        ]
      },
      "ultraCores": 600
    },
    {
      "name": "Savage Leader (step 6 of 7)",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "8d 4h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Cyclops (Mighty) shards",
          "id": "SHARD_CYCLOPSMIGHTY",
          "qty": 300
        },
        {
          "item": "T4 Level 1 Ions",
          "id": "ISO8-TIER-3-A-CURRENCY",
          "qty": 80000
        },
        {
          "item": "Basic T4 Iso-8 Orb Fragments",
          "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
          "qty": 18000
        },
        {
          "item": "Gold",
          "id": "SC",
          "qty": 15000000
        },
        {
          "item": "L4 Training Module",
          "id": "CONSUMABLE_XPLVL80",
          "qty": 1000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Savage Leader",
        "step": 6,
        "of": 7,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Savage Leader",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 45
              },
              {
                "item": "Cyclops (Mighty) — 4 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_4",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 20000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 10000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 3000,
                "webBonus": true
              }
            ],
            "ultraCores": 300
          },
          {
            "step": 2,
            "name": "Savage Leader",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 55
              },
              {
                "item": "Cyclops (Mighty) — 5 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_5",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 30000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 10000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 3000,
                "webBonus": true
              }
            ],
            "ultraCores": 300
          },
          {
            "step": 3,
            "name": "Savage Leader",
            "price": 49.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 80
              },
              {
                "item": "Cyclops (Mighty) — 6 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_6",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 40000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 12000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 4000,
                "webBonus": true
              }
            ],
            "ultraCores": 400
          },
          {
            "step": 4,
            "name": "Savage Leader",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 130
              },
              {
                "item": "Cyclops (Mighty) — 7 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_7",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 50000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 14000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 5000,
                "webBonus": true
              }
            ],
            "ultraCores": 500
          },
          {
            "step": 5,
            "name": "Savage Leader",
            "price": 79.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 200
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 60000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 16000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 10000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 800
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 6000,
                "webBonus": true
              }
            ],
            "ultraCores": 600
          },
          {
            "step": 6,
            "name": "Savage Leader",
            "price": 129.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 300
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 80000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 18000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 15000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 1000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 10000,
                "webBonus": true
              }
            ],
            "ultraCores": 1000
          },
          {
            "step": 7,
            "name": "Savage Leader",
            "price": 129.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) — 1 diamond promotion",
                "id": "PD_CYCLOPSMIGHTY_1",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 100000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 20000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 20000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 1500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 10000,
                "webBonus": true
              }
            ],
            "ultraCores": 1000
          }
        ]
      },
      "ultraCores": 1000
    },
    {
      "name": "Savage Leader (step 7 of 7)",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "8d 4h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Cyclops (Mighty) — 1 diamond promotion",
          "id": "PD_CYCLOPSMIGHTY_1",
          "qty": 1
        },
        {
          "item": "T4 Level 1 Ions",
          "id": "ISO8-TIER-3-A-CURRENCY",
          "qty": 100000
        },
        {
          "item": "Basic T4 Iso-8 Orb Fragments",
          "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
          "qty": 20000
        },
        {
          "item": "Gold",
          "id": "SC",
          "qty": 20000000
        },
        {
          "item": "L4 Training Module",
          "id": "CONSUMABLE_XPLVL80",
          "qty": 1500
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Savage Leader",
        "step": 7,
        "of": 7,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Savage Leader",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 45
              },
              {
                "item": "Cyclops (Mighty) — 4 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_4",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 20000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 10000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 3000,
                "webBonus": true
              }
            ],
            "ultraCores": 300
          },
          {
            "step": 2,
            "name": "Savage Leader",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 55
              },
              {
                "item": "Cyclops (Mighty) — 5 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_5",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 30000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 10000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 3000,
                "webBonus": true
              }
            ],
            "ultraCores": 300
          },
          {
            "step": 3,
            "name": "Savage Leader",
            "price": 49.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 80
              },
              {
                "item": "Cyclops (Mighty) — 6 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_6",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 40000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 12000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 4000,
                "webBonus": true
              }
            ],
            "ultraCores": 400
          },
          {
            "step": 4,
            "name": "Savage Leader",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 130
              },
              {
                "item": "Cyclops (Mighty) — 7 red star promotion",
                "id": "RS_CYCLOPSMIGHTY_7",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 50000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 14000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 5000,
                "webBonus": true
              }
            ],
            "ultraCores": 500
          },
          {
            "step": 5,
            "name": "Savage Leader",
            "price": 79.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 200
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 60000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 16000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 10000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 800
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 6000,
                "webBonus": true
              }
            ],
            "ultraCores": 600
          },
          {
            "step": 6,
            "name": "Savage Leader",
            "price": 129.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) shards",
                "id": "SHARD_CYCLOPSMIGHTY",
                "qty": 300
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 80000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 18000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 15000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 1000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 10000,
                "webBonus": true
              }
            ],
            "ultraCores": 1000
          },
          {
            "step": 7,
            "name": "Savage Leader",
            "price": 129.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyclops (Mighty) — 1 diamond promotion",
                "id": "PD_CYCLOPSMIGHTY_1",
                "qty": 1
              },
              {
                "item": "T4 Level 1 Ions",
                "id": "ISO8-TIER-3-A-CURRENCY",
                "qty": 100000
              },
              {
                "item": "Basic T4 Iso-8 Orb Fragments",
                "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
                "qty": 20000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 20000000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 1500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 10000,
                "webBonus": true
              }
            ],
            "ultraCores": 1000
          }
        ]
      },
      "ultraCores": 1000
    },
    {
      "name": "Full Aperture",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "8d 4h",
      "section": "Offers / NEW CHARACTERS",
      "sections": [
        "Offers / NEW CHARACTERS"
      ],
      "contents": [
        {
          "item": "Full Aperture Orb Fragments",
          "id": "GACHA_CRATE_CYCLOPSMIGHTY_MEGA_TOKEN_aecdb726",
          "qty": 2000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "ultraCores": 1000,
      "description": "Open Full Aperture Orb for a guaranteed 4-Yellow-Star Cyclops (Mighty), with a chance up to 7 Yellow Stars!"
    },
    {
      "name": "Visor Unleashed",
      "price": 49.99,
      "currency": "CAD",
      "purchaseLimit": 8,
      "expires": "8d 4h",
      "section": "Offers / NEW CHARACTERS",
      "sections": [
        "Offers / NEW CHARACTERS"
      ],
      "contents": [
        {
          "item": "Visor Unleashed Orb Fragments",
          "id": "GACHA_CRATE_FCO_CYCLOPSMIGHTY_30_TOKEN_985ee30d",
          "qty": 2000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 4000,
          "webBonus": true
        }
      ],
      "ultraCores": 400,
      "description": "Each Visor Unleashed Orb contains up to 410 Cyclops (Mighty) shards with 50 shards guaranteed! He spreads and prolongs negative effects, applies Bleed & Silence, and boosts Speed Bar in War!"
    },
    {
      "name": "Son of the Tiger (step 1 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar shards",
          "id": "SHARD_KAZAR",
          "qty": 60
        },
        {
          "item": "Shop Credits",
          "id": "LC",
          "qty": 50000
        },
        {
          "item": "Gold",
          "id": "SC",
          "qty": 1500000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Son of the Tiger",
        "step": 1,
        "of": 14,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 50000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 40000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 4 red star promotion",
                "id": "RS_KAZAR_4",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 5 red star promotion",
                "id": "RS_KAZAR_5",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 300
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 6 red star promotion",
                "id": "RS_KAZAR_6",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 350
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar — 7 red star promotion",
                "id": "RS_KAZAR_7",
                "qty": 1
              },
              {
                "item": "Ka-Zar — 1 diamond promotion",
                "id": "PD_KAZAR_1",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 9000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          }
        ]
      },
      "ultraCores": 200
    },
    {
      "name": "Son of the Tiger (step 2 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar shards",
          "id": "SHARD_KAZAR",
          "qty": 60
        },
        {
          "item": "Shop Credits",
          "id": "LC",
          "qty": 40000
        },
        {
          "item": "Gold",
          "id": "SC",
          "qty": 2000000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Son of the Tiger",
        "step": 2,
        "of": 14,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 50000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 40000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 4 red star promotion",
                "id": "RS_KAZAR_4",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 5 red star promotion",
                "id": "RS_KAZAR_5",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 300
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 6 red star promotion",
                "id": "RS_KAZAR_6",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 350
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar — 7 red star promotion",
                "id": "RS_KAZAR_7",
                "qty": 1
              },
              {
                "item": "Ka-Zar — 1 diamond promotion",
                "id": "PD_KAZAR_1",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 9000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          }
        ]
      },
      "ultraCores": 200
    },
    {
      "name": "Son of the Tiger (step 3 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar shards",
          "id": "SHARD_KAZAR",
          "qty": 60
        },
        {
          "item": "Shop Credits",
          "id": "LC",
          "qty": 30000
        },
        {
          "item": "Gold",
          "id": "SC",
          "qty": 3000000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Son of the Tiger",
        "step": 3,
        "of": 14,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 50000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 40000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 4 red star promotion",
                "id": "RS_KAZAR_4",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 5 red star promotion",
                "id": "RS_KAZAR_5",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 300
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 6 red star promotion",
                "id": "RS_KAZAR_6",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 350
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar — 7 red star promotion",
                "id": "RS_KAZAR_7",
                "qty": 1
              },
              {
                "item": "Ka-Zar — 1 diamond promotion",
                "id": "PD_KAZAR_1",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 9000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          }
        ]
      },
      "ultraCores": 200
    },
    {
      "name": "Son of the Tiger (step 4 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar shards",
          "id": "SHARD_KAZAR",
          "qty": 60
        },
        {
          "item": "Ka-Zar — 4 red star promotion",
          "id": "RS_KAZAR_4",
          "qty": 1
        },
        {
          "item": "Shop Credits",
          "id": "LC",
          "qty": 30000
        },
        {
          "item": "L4 Training Module",
          "id": "CONSUMABLE_XPLVL80",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Son of the Tiger",
        "step": 4,
        "of": 14,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 50000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 40000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 4 red star promotion",
                "id": "RS_KAZAR_4",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 5 red star promotion",
                "id": "RS_KAZAR_5",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 300
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 6 red star promotion",
                "id": "RS_KAZAR_6",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 350
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar — 7 red star promotion",
                "id": "RS_KAZAR_7",
                "qty": 1
              },
              {
                "item": "Ka-Zar — 1 diamond promotion",
                "id": "PD_KAZAR_1",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 9000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          }
        ]
      },
      "ultraCores": 200
    },
    {
      "name": "Son of the Tiger (step 5 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar shards",
          "id": "SHARD_KAZAR",
          "qty": 70
        },
        {
          "item": "Shop Credits",
          "id": "LC",
          "qty": 30000
        },
        {
          "item": "L4 Training Module",
          "id": "CONSUMABLE_XPLVL80",
          "qty": 250
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Son of the Tiger",
        "step": 5,
        "of": 14,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 50000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 40000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 4 red star promotion",
                "id": "RS_KAZAR_4",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 5 red star promotion",
                "id": "RS_KAZAR_5",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 300
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 6 red star promotion",
                "id": "RS_KAZAR_6",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 350
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar — 7 red star promotion",
                "id": "RS_KAZAR_7",
                "qty": 1
              },
              {
                "item": "Ka-Zar — 1 diamond promotion",
                "id": "PD_KAZAR_1",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 9000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          }
        ]
      },
      "ultraCores": 200
    },
    {
      "name": "Son of the Tiger (step 6 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar shards",
          "id": "SHARD_KAZAR",
          "qty": 60
        },
        {
          "item": "Ka-Zar — 5 red star promotion",
          "id": "RS_KAZAR_5",
          "qty": 1
        },
        {
          "item": "Shop Credits",
          "id": "LC",
          "qty": 30000
        },
        {
          "item": "L4 Training Module",
          "id": "CONSUMABLE_XPLVL80",
          "qty": 300
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Son of the Tiger",
        "step": 6,
        "of": 14,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 50000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 40000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 4 red star promotion",
                "id": "RS_KAZAR_4",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 5 red star promotion",
                "id": "RS_KAZAR_5",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 300
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 6 red star promotion",
                "id": "RS_KAZAR_6",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 350
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar — 7 red star promotion",
                "id": "RS_KAZAR_7",
                "qty": 1
              },
              {
                "item": "Ka-Zar — 1 diamond promotion",
                "id": "PD_KAZAR_1",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 9000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          }
        ]
      },
      "ultraCores": 200
    },
    {
      "name": "Son of the Tiger (step 7 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar shards",
          "id": "SHARD_KAZAR",
          "qty": 60
        },
        {
          "item": "Shop Credits",
          "id": "LC",
          "qty": 30000
        },
        {
          "item": "Gold",
          "id": "SC",
          "qty": 4000000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Son of the Tiger",
        "step": 7,
        "of": 14,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 50000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 40000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 4 red star promotion",
                "id": "RS_KAZAR_4",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 5 red star promotion",
                "id": "RS_KAZAR_5",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 300
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 6 red star promotion",
                "id": "RS_KAZAR_6",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 350
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar — 7 red star promotion",
                "id": "RS_KAZAR_7",
                "qty": 1
              },
              {
                "item": "Ka-Zar — 1 diamond promotion",
                "id": "PD_KAZAR_1",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 9000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          }
        ]
      },
      "ultraCores": 200
    },
    {
      "name": "Son of the Tiger (step 8 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar shards",
          "id": "SHARD_KAZAR",
          "qty": 60
        },
        {
          "item": "Shop Credits",
          "id": "LC",
          "qty": 30000
        },
        {
          "item": "Gold",
          "id": "SC",
          "qty": 5000000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Son of the Tiger",
        "step": 8,
        "of": 14,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 50000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 40000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 4 red star promotion",
                "id": "RS_KAZAR_4",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 5 red star promotion",
                "id": "RS_KAZAR_5",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 300
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 6 red star promotion",
                "id": "RS_KAZAR_6",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 350
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar — 7 red star promotion",
                "id": "RS_KAZAR_7",
                "qty": 1
              },
              {
                "item": "Ka-Zar — 1 diamond promotion",
                "id": "PD_KAZAR_1",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 9000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          }
        ]
      },
      "ultraCores": 200
    },
    {
      "name": "Son of the Tiger (step 9 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar shards",
          "id": "SHARD_KAZAR",
          "qty": 60
        },
        {
          "item": "Shop Credits",
          "id": "LC",
          "qty": 30000
        },
        {
          "item": "Gold",
          "id": "SC",
          "qty": 6000000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Son of the Tiger",
        "step": 9,
        "of": 14,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 50000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 40000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 4 red star promotion",
                "id": "RS_KAZAR_4",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 5 red star promotion",
                "id": "RS_KAZAR_5",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 300
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 6 red star promotion",
                "id": "RS_KAZAR_6",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 350
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar — 7 red star promotion",
                "id": "RS_KAZAR_7",
                "qty": 1
              },
              {
                "item": "Ka-Zar — 1 diamond promotion",
                "id": "PD_KAZAR_1",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 9000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          }
        ]
      },
      "ultraCores": 200
    },
    {
      "name": "Son of the Tiger (step 10 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar shards",
          "id": "SHARD_KAZAR",
          "qty": 60
        },
        {
          "item": "Ka-Zar — 6 red star promotion",
          "id": "RS_KAZAR_6",
          "qty": 1
        },
        {
          "item": "Shop Credits",
          "id": "LC",
          "qty": 30000
        },
        {
          "item": "L4 Training Module",
          "id": "CONSUMABLE_XPLVL80",
          "qty": 350
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Son of the Tiger",
        "step": 10,
        "of": 14,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 50000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 40000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 4 red star promotion",
                "id": "RS_KAZAR_4",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 5 red star promotion",
                "id": "RS_KAZAR_5",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 300
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 6 red star promotion",
                "id": "RS_KAZAR_6",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 350
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar — 7 red star promotion",
                "id": "RS_KAZAR_7",
                "qty": 1
              },
              {
                "item": "Ka-Zar — 1 diamond promotion",
                "id": "PD_KAZAR_1",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 9000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          }
        ]
      },
      "ultraCores": 200
    },
    {
      "name": "Son of the Tiger (step 11 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar shards",
          "id": "SHARD_KAZAR",
          "qty": 60
        },
        {
          "item": "Shop Credits",
          "id": "LC",
          "qty": 30000
        },
        {
          "item": "L4 Training Module",
          "id": "CONSUMABLE_XPLVL80",
          "qty": 400
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Son of the Tiger",
        "step": 11,
        "of": 14,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 50000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 40000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 4 red star promotion",
                "id": "RS_KAZAR_4",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 5 red star promotion",
                "id": "RS_KAZAR_5",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 300
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 6 red star promotion",
                "id": "RS_KAZAR_6",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 350
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar — 7 red star promotion",
                "id": "RS_KAZAR_7",
                "qty": 1
              },
              {
                "item": "Ka-Zar — 1 diamond promotion",
                "id": "PD_KAZAR_1",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 9000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          }
        ]
      },
      "ultraCores": 200
    },
    {
      "name": "Son of the Tiger (step 12 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar shards",
          "id": "SHARD_KAZAR",
          "qty": 60
        },
        {
          "item": "Shop Credits",
          "id": "LC",
          "qty": 30000
        },
        {
          "item": "L4 Training Module",
          "id": "CONSUMABLE_XPLVL80",
          "qty": 450
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Son of the Tiger",
        "step": 12,
        "of": 14,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 50000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 40000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 4 red star promotion",
                "id": "RS_KAZAR_4",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 5 red star promotion",
                "id": "RS_KAZAR_5",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 300
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 6 red star promotion",
                "id": "RS_KAZAR_6",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 350
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar — 7 red star promotion",
                "id": "RS_KAZAR_7",
                "qty": 1
              },
              {
                "item": "Ka-Zar — 1 diamond promotion",
                "id": "PD_KAZAR_1",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 9000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          }
        ]
      },
      "ultraCores": 200
    },
    {
      "name": "Son of the Tiger (step 13 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar shards",
          "id": "SHARD_KAZAR",
          "qty": 80
        },
        {
          "item": "Shop Credits",
          "id": "LC",
          "qty": 30000
        },
        {
          "item": "L4 Training Module",
          "id": "CONSUMABLE_XPLVL80",
          "qty": 500
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Son of the Tiger",
        "step": 13,
        "of": 14,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 50000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 40000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 4 red star promotion",
                "id": "RS_KAZAR_4",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 5 red star promotion",
                "id": "RS_KAZAR_5",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 300
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 6 red star promotion",
                "id": "RS_KAZAR_6",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 350
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar — 7 red star promotion",
                "id": "RS_KAZAR_7",
                "qty": 1
              },
              {
                "item": "Ka-Zar — 1 diamond promotion",
                "id": "PD_KAZAR_1",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 9000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          }
        ]
      },
      "ultraCores": 200
    },
    {
      "name": "Son of the Tiger (step 14 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar — 7 red star promotion",
          "id": "RS_KAZAR_7",
          "qty": 1
        },
        {
          "item": "Ka-Zar — 1 diamond promotion",
          "id": "PD_KAZAR_1",
          "qty": 1
        },
        {
          "item": "Shop Credits",
          "id": "LC",
          "qty": 30000
        },
        {
          "item": "Gold",
          "id": "SC",
          "qty": 9000000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Son of the Tiger",
        "step": 14,
        "of": 14,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 50000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 40000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 4 red star promotion",
                "id": "RS_KAZAR_4",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 5 red star promotion",
                "id": "RS_KAZAR_5",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 300
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Ka-Zar — 6 red star promotion",
                "id": "RS_KAZAR_6",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 350
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar shards",
                "id": "SHARD_KAZAR",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "id": "CONSUMABLE_XPLVL80",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar — 7 red star promotion",
                "id": "RS_KAZAR_7",
                "qty": 1
              },
              {
                "item": "Ka-Zar — 1 diamond promotion",
                "id": "PD_KAZAR_1",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "id": "LC",
                "qty": 30000
              },
              {
                "item": "Gold",
                "id": "SC",
                "qty": 9000000
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          }
        ]
      },
      "ultraCores": 200
    },
    {
      "name": "Hidden Jungle Orb",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 8,
      "expires": "3d 4h",
      "section": "Offers / NEW CHARACTERS",
      "sections": [
        "Offers / NEW CHARACTERS"
      ],
      "contents": [
        {
          "item": "Hidden Jungle Orb Fragments",
          "id": "GACHA_CRATE_FCO_KAZAR_20_TOKEN_9693b14a",
          "qty": 2000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "ultraCores": 200,
      "description": "Each Hidden Jungle Orb contains up to 250 Ka-Zar shards with 55 shards guaranteed! He flips negatives, grants Safeguard and Defense Up, heals allies, calls ally attacks!"
    },
    {
      "name": "Black Friday Sneak Peak",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "5d 4h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Black Friday Sneak Peaks Orb Fragments",
          "id": "GACHA_CRATE_BLACKFRIDAY26_DIAMOND_TOKEN_4a5aa8fa",
          "qty": 2000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "boughtBefore": true,
      "ultraCores": 200,
      "description": "Get a sneak peek at Black Friday! Open the special Orb for a chance to earn up to 5-Diamond promotions for select powerhouse characters!"
    },
    {
      "name": "Jeff the Land Shark Full Awakening",
      "price": 79.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Jeff the Land Shark's Basic Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_JEFFTHELANDSHARK_BASIC",
          "qty": 200
        },
        {
          "item": "Jeff the Land Shark's Special Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_JEFFTHELANDSHARK_SPECIAL",
          "qty": 200
        },
        {
          "item": "Jeff the Land Shark's Ultimate Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_JEFFTHELANDSHARK_ULTIMATE",
          "qty": 200
        },
        {
          "item": "Jeff the Land Shark's Passive Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_JEFFTHELANDSHARK_PASSIVE",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 6000,
          "webBonus": true
        }
      ],
      "ultraCores": 600,
      "description": "Great. Ability. Savings. Fully awaken Jeff the Land Shark's abilities with this limited-time bundle!"
    },
    {
      "name": "Phantom Rider Full Awakening",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Phantom Rider's Basic Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_PHANTOMRIDER_BASIC",
          "qty": 200
        },
        {
          "item": "Phantom Rider's Special Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_PHANTOMRIDER_SPECIAL",
          "qty": 200
        },
        {
          "item": "Phantom Rider's Ultimate Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_PHANTOMRIDER_ULTIMATE",
          "qty": 200
        },
        {
          "item": "Phantom Rider's Passive Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_PHANTOMRIDER_PASSIVE",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "ultraCores": 300,
      "description": "Great. Ability. Savings. Fully awaken Phantom Rider's abilities with this limited-time bundle!"
    },
    {
      "name": "Quasar Full Awakening",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Quasar's Basic Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_QUASAR_BASIC",
          "qty": 200
        },
        {
          "item": "Quasar's Ultimate Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_QUASAR_ULTIMATE",
          "qty": 200
        },
        {
          "item": "Quasar's Passive Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_QUASAR_PASSIVE",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "ultraCores": 250,
      "description": "Great. Ability. Savings. Fully awaken Quasar's abilities with this limited-time bundle!"
    },
    {
      "name": "Blastaar Full Awakening",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Blastaar's Basic Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_BLASTAAR_BASIC",
          "qty": 200
        },
        {
          "item": "Blastaar's Ultimate Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_BLASTAAR_ULTIMATE",
          "qty": 200
        },
        {
          "item": "Blastaar's Passive Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_BLASTAAR_PASSIVE",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "ultraCores": 250,
      "description": "Great. Ability. Savings. Fully awaken Blastaar's abilities with this limited-time bundle!"
    },
    {
      "name": "Thunderstrike Full Awakening",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Thunderstrike's Basic Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_THUNDERSTRIKE_BASIC",
          "qty": 200
        },
        {
          "item": "Thunderstrike's Ultimate Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_THUNDERSTRIKE_ULTIMATE",
          "qty": 200
        },
        {
          "item": "Thunderstrike's Passive Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_THUNDERSTRIKE_PASSIVE",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "ultraCores": 250,
      "description": "Great. Ability. Savings. Fully awaken Thunderstrike's abilities with this limited-time bundle!"
    },
    {
      "name": "Awakened Sharknado",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Jeff the Land Shark's Special Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_JEFFTHELANDSHARK_SPECIAL",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "ultraCores": 200,
      "description": "Hurry! Unlock the Special Awakened Ability for Jeff the Land Shark before this offer disappears!"
    },
    {
      "name": "Awakened Cute Carcharodon",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Jeff the Land Shark's Passive Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_JEFFTHELANDSHARK_PASSIVE",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "ultraCores": 200,
      "description": "Hurry! Unlock the Passive Awakened Ability for Jeff the Land Shark before this offer disappears!"
    },
    {
      "name": "Awakened Just A Taste",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Jeff the Land Shark's Basic Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_JEFFTHELANDSHARK_BASIC",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "ultraCores": 200,
      "description": "Hurry! Unlock the Basic Awakened Ability for Jeff the Land Shark before this offer disappears!"
    },
    {
      "name": "Awakened Deep Dive",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Jeff the Land Shark's Ultimate Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_JEFFTHELANDSHARK_ULTIMATE",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "ultraCores": 200,
      "description": "Hurry! Unlock the Ultimate Awakened Ability for Jeff the Land Shark before this offer disappears!"
    },
    {
      "name": "Awakened Quickdraw",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Phantom Rider's Basic Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_PHANTOMRIDER_BASIC",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "ultraCores": 100,
      "description": "Hurry! Unlock the Basic Awakened Ability for Phantom Rider before this offer disappears!"
    },
    {
      "name": "Awakened Ghost Ride",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Phantom Rider's Special Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_PHANTOMRIDER_SPECIAL",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "ultraCores": 100,
      "description": "Hurry! Unlock the Special Awakened Ability for Phantom Rider before this offer disappears!"
    },
    {
      "name": "Awakened Bucking Banshee",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Phantom Rider's Ultimate Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_PHANTOMRIDER_ULTIMATE",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "ultraCores": 100,
      "description": "Hurry! Unlock the Ultimate Awakened Ability for Phantom Rider before this offer disappears!"
    },
    {
      "name": "Awakened Ghostly Gunslinger",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Phantom Rider's Passive Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_PHANTOMRIDER_PASSIVE",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "ultraCores": 100,
      "description": "Hurry! Unlock the Passive Awakened Ability for Phantom Rider before this offer disappears!"
    },
    {
      "name": "Awakened Quantum Blast",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Quasar's Basic Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_QUASAR_BASIC",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "ultraCores": 100,
      "description": "Hurry! Unlock the Basic Awakened Ability for Quasar before this offer disappears!"
    },
    {
      "name": "Awakened Meteor Smackdown",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Quasar's Ultimate Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_QUASAR_ULTIMATE",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "ultraCores": 100,
      "description": "Hurry! Unlock the Ultimate Awakened Ability for Quasar before this offer disappears!"
    },
    {
      "name": "Awakened Violent Subjugation",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Blastaar's Basic Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_BLASTAAR_BASIC",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "ultraCores": 100,
      "description": "Hurry! Unlock the Basic Awakened Ability for Blastaar before this offer disappears!"
    },
    {
      "name": "Awakened Sweeping Destruction",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Blastaar's Ultimate Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_BLASTAAR_ULTIMATE",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "ultraCores": 100,
      "description": "Hurry! Unlock the Ultimate Awakened Ability for Blastaar before this offer disappears!"
    },
    {
      "name": "Awakened The Living Bomb-Burst",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Blastaar's Passive Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_BLASTAAR_PASSIVE",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "ultraCores": 100,
      "description": "Hurry! Unlock the Passive Awakened Ability for Blastaar before this offer disappears!"
    },
    {
      "name": "Awakened Thunder Burst",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Thunderstrike's Basic Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_THUNDERSTRIKE_BASIC",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "ultraCores": 100,
      "description": "Hurry! Unlock the Basic Awakened Ability for Thunderstrike before this offer disappears!"
    },
    {
      "name": "Awakened Rolling Thunder",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Thunderstrike's Ultimate Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_THUNDERSTRIKE_ULTIMATE",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "ultraCores": 100,
      "description": "Hurry! Unlock the Ultimate Awakened Ability for Thunderstrike before this offer disappears!"
    },
    {
      "name": "Awakened Architect of Thunder",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Thunderstrike's Passive Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_THUNDERSTRIKE_PASSIVE",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "ultraCores": 100,
      "description": "Hurry! Unlock the Passive Awakened Ability for Thunderstrike before this offer disappears!"
    },
    {
      "name": "Ability Essentials Vault",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "4h 14m",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "T2 Ability Material",
          "id": "ABILITY_MATERIAL_BLUE_ABILITY_MAT",
          "qty": 600
        },
        {
          "item": "T1 Ability Material",
          "id": "ABILITY_MATERIAL_GREEN_ABILITY_MAT",
          "qty": 1000
        },
        {
          "item": "T4 Ability Material",
          "id": "ABILITY_MATERIAL_ORANGE_ABILITY_MAT",
          "qty": 135
        },
        {
          "item": "T3 Ability Material",
          "id": "ABILITY_MATERIAL_PURPLE_ABILITY_MAT",
          "qty": 300
        },
        {
          "item": "T2 Ability Material",
          "id": "ABILITY_MATERIAL_BLUE_ABILITY_MAT",
          "qty": 60,
          "webBonus": true
        },
        {
          "item": "T1 Ability Material",
          "id": "ABILITY_MATERIAL_GREEN_ABILITY_MAT",
          "qty": 100,
          "webBonus": true
        },
        {
          "item": "T4 Ability Material",
          "id": "ABILITY_MATERIAL_ORANGE_ABILITY_MAT",
          "qty": 15,
          "webBonus": true
        },
        {
          "item": "T3 Ability Material",
          "id": "ABILITY_MATERIAL_PURPLE_ABILITY_MAT",
          "qty": 30,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 500,
          "webBonus": true
        }
      ],
      "ultraCores": 50,
      "description": "Take your roster to new heights of power by unlocking their potential with this pack of Ability Materials!"
    },
    {
      "name": "Ability Value Vault",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "4h 14m",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "T4 Ability Material",
          "id": "ABILITY_MATERIAL_ORANGE_ABILITY_MAT",
          "qty": 385
        },
        {
          "item": "T4 Ability Material",
          "id": "ABILITY_MATERIAL_ORANGE_ABILITY_MAT",
          "qty": 40,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "ultraCores": 100,
      "description": "Train hard, fight harder. Boost your team now!"
    },
    {
      "name": "Ability Ultimate Vault",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "4h 14m",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "T2 Ability Material",
          "id": "ABILITY_MATERIAL_BLUE_ABILITY_MAT",
          "qty": 400
        },
        {
          "item": "T1 Ability Material",
          "id": "ABILITY_MATERIAL_GREEN_ABILITY_MAT",
          "qty": 400
        },
        {
          "item": "T4 Ability Material",
          "id": "ABILITY_MATERIAL_ORANGE_ABILITY_MAT",
          "qty": 840
        },
        {
          "item": "T3 Ability Material",
          "id": "ABILITY_MATERIAL_PURPLE_ABILITY_MAT",
          "qty": 480
        },
        {
          "item": "T2 Ability Material",
          "id": "ABILITY_MATERIAL_BLUE_ABILITY_MAT",
          "qty": 40,
          "webBonus": true
        },
        {
          "item": "T1 Ability Material",
          "id": "ABILITY_MATERIAL_GREEN_ABILITY_MAT",
          "qty": 40,
          "webBonus": true
        },
        {
          "item": "T4 Ability Material",
          "id": "ABILITY_MATERIAL_ORANGE_ABILITY_MAT",
          "qty": 85,
          "webBonus": true
        },
        {
          "item": "T3 Ability Material",
          "id": "ABILITY_MATERIAL_PURPLE_ABILITY_MAT",
          "qty": 50,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "ultraCores": 200,
      "description": "Sharpen your roster with this ability pack."
    },
    {
      "name": "Cyber Breach: Ultron",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 50000
        },
        {
          "item": "Ultron shards",
          "id": "SHARD_ULTRON",
          "qty": 810
        },
        {
          "item": "Ultron — 1 diamond promotion",
          "id": "PD_ULTRON_1",
          "qty": 1
        },
        {
          "item": "Ultron — 7 red star promotion",
          "id": "RS_ULTRON_7",
          "qty": 1
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 2500,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "ultraCores": 100,
      "description": "Instantly power up Ultron to 1-Diamond and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Vision",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 50000
        },
        {
          "item": "Vision shards",
          "id": "SHARD_VISION",
          "qty": 810
        },
        {
          "item": "Vision — 1 diamond promotion",
          "id": "PD_VISION_1",
          "qty": 1
        },
        {
          "item": "Vision — 7 red star promotion",
          "id": "RS_VISION_7",
          "qty": 1
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 2500,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "ultraCores": 100,
      "description": "Instantly power up Vision to 1-Diamond and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Sentient Squad",
      "price": 49.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 500000
        },
        {
          "item": "Ultron shards",
          "id": "SHARD_ULTRON",
          "qty": 810
        },
        {
          "item": "Vision shards",
          "id": "SHARD_VISION",
          "qty": 810
        },
        {
          "item": "Yellowjacket shards",
          "id": "SHARD_YELLOWJACKET",
          "qty": 810
        },
        {
          "item": "Crossbones shards",
          "id": "SHARD_CROSSBONES",
          "qty": 810
        },
        {
          "item": "Ultron — 2 diamond promotion",
          "id": "PD_ULTRON_2",
          "qty": 1
        },
        {
          "item": "Vision — 2 diamond promotion",
          "id": "PD_VISION_2",
          "qty": 1
        },
        {
          "item": "Yellowjacket — 2 diamond promotion",
          "id": "PD_YELLOWJACKET_2",
          "qty": 1
        },
        {
          "item": "Crossbones — 2 diamond promotion",
          "id": "PD_CROSSBONES_2",
          "qty": 1
        },
        {
          "item": "Ultron — 7 red star promotion",
          "id": "RS_ULTRON_7",
          "qty": 1
        },
        {
          "item": "Vision — 7 red star promotion",
          "id": "RS_VISION_7",
          "qty": 1
        },
        {
          "item": "Yellowjacket — 7 red star promotion",
          "id": "RS_YELLOWJACKET_7",
          "qty": 1
        },
        {
          "item": "Crossbones — 7 red star promotion",
          "id": "RS_CROSSBONES_7",
          "qty": 1
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 25000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 4000,
          "webBonus": true
        }
      ],
      "ultraCores": 400,
      "description": "Instantly power up Ultron, Vision, Yellowjacket, and Crossbones to 2-Diamond and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Crimson Elite Orb",
      "price": 3.99,
      "currency": "CAD",
      "purchaseLimit": 94,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 10000
        },
        {
          "item": "Crimson Elite Orb Fragments",
          "id": "GACHA_CRATE_GT19_20_TOKEN_4c7f2032",
          "qty": 2000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 300,
          "webBonus": true
        }
      ],
      "boughtBefore": true,
      "ultraCores": 30,
      "description": "Earn Gear Tier 19 and 20 Mini-Unique, and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Orange Mega Orb",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 800000
        },
        {
          "item": "Orange Mega Orb",
          "id": "GACHA_75701dd14119cc312211b430d144aafb9b926e8172872eb620d634b4a18a920f",
          "qty": 1
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 40000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "ultraCores": 1000,
      "description": "Open this Orb to stock up on T4 Level 1 Ions and T4 Iso-8 Credits, also gain progress in the Cyber Breach Milestone! This special Orb will automatically open upon purchase."
    },
    {
      "name": "Cyber Breach: Basic Pack",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 500000
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 25000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "ultraCores": 500,
      "description": "Get ahead in the Cyber Breach Leaderboard to secure 3-Diamond for Whiplash, Ulysses Klaue, Iron Monger!"
    },
    {
      "name": "Cyber Breach: Ultimate Pack",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 50,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 1500000
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 75000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "ultraCores": 1000,
      "description": "Get ahead in the Cyber Breach Leaderboard to secure 3-Diamond for Whiplash, Ulysses Klaue, Iron Monger!"
    },
    {
      "name": "Cyber Breach: GT21 Mutant",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 800000
        },
        {
          "item": "Crimson Nucleic Infusion",
          "id": "GEAR_RED_MUTANT_MAT_C4",
          "qty": 105
        },
        {
          "item": "Crimson Biopolymers",
          "id": "GEAR_RED_MUTANT_MAT_C6",
          "qty": 105
        },
        {
          "item": "Crimson Spliced X-Gene",
          "id": "GEAR_RED_MUTANT_MAT_BIT",
          "qty": 1650
        },
        {
          "item": "Crimson Cytoplasm",
          "id": "GEAR_RED_MUTANT_MAT_C2",
          "qty": 1375
        },
        {
          "item": "Crimson Metabolic Enhancers",
          "id": "GEAR_RED_MUTANT_MAT_C3",
          "qty": 1100
        },
        {
          "item": "Crimson Basic Catalyst Part",
          "id": "GEAR_RED_BASIC_CAT_BIT",
          "qty": 3500
        },
        {
          "item": "Gold",
          "id": "SC",
          "qty": 10000000
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 40000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "ultraCores": 1000,
      "description": "Earn Gear Tier 21 Mutant Mini-Unique, and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: GT21 Tech",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 800000
        },
        {
          "item": "Crimson Liquid Hydrazine",
          "id": "GEAR_RED_TECH_MAT_C4",
          "qty": 105
        },
        {
          "item": "Crimson Dargonite",
          "id": "GEAR_RED_TECH_MAT_C6",
          "qty": 105
        },
        {
          "item": "Crimson Unstable Molecules",
          "id": "GEAR_RED_TECH_MAT_BIT",
          "qty": 1650
        },
        {
          "item": "Crimson Laser Torch",
          "id": "GEAR_RED_TECH_MAT_C2",
          "qty": 1375
        },
        {
          "item": "Crimson Charged Particles",
          "id": "GEAR_RED_TECH_MAT_C3",
          "qty": 1100
        },
        {
          "item": "Crimson Basic Catalyst Part",
          "id": "GEAR_RED_BASIC_CAT_BIT",
          "qty": 3500
        },
        {
          "item": "Gold",
          "id": "SC",
          "qty": 10000000
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 40000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "ultraCores": 1000,
      "description": "Earn Gear Tier 21 Tech Mini-Unique, and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: GT21 Bio",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 800000
        },
        {
          "item": "Crimson Nebulizer",
          "id": "GEAR_RED_BIO_MAT_C4",
          "qty": 105
        },
        {
          "item": "Crimson Hyperphage",
          "id": "GEAR_RED_BIO_MAT_C6",
          "qty": 105
        },
        {
          "item": "Crimson Isomer",
          "id": "GEAR_RED_BIO_MAT_BIT",
          "qty": 1650
        },
        {
          "item": "Crimson Phosphates",
          "id": "GEAR_RED_BIO_MAT_C2",
          "qty": 1375
        },
        {
          "item": "Crimson MRI",
          "id": "GEAR_RED_BIO_MAT_C3",
          "qty": 1100
        },
        {
          "item": "Crimson Basic Catalyst Part",
          "id": "GEAR_RED_BASIC_CAT_BIT",
          "qty": 3500
        },
        {
          "item": "Gold",
          "id": "SC",
          "qty": 10000000
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 40000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "ultraCores": 1000,
      "description": "Earn Gear Tier 21 Bio Mini-Unique, and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: GT21 Skill",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 800000
        },
        {
          "item": "Crimson Security Bypass",
          "id": "GEAR_RED_SKILL_MAT_C4",
          "qty": 105
        },
        {
          "item": "Crimson Remote Access Codes",
          "id": "GEAR_RED_SKILL_MAT_C6",
          "qty": 105
        },
        {
          "item": "Crimson Secret Intel",
          "id": "GEAR_RED_SKILL_MAT_BIT",
          "qty": 1650
        },
        {
          "item": "Crimson Locked Case",
          "id": "GEAR_RED_SKILL_MAT_C2",
          "qty": 1375
        },
        {
          "item": "Crimson Confidential Dossiers",
          "id": "GEAR_RED_SKILL_MAT_C3",
          "qty": 1100
        },
        {
          "item": "Crimson Basic Catalyst Part",
          "id": "GEAR_RED_BASIC_CAT_BIT",
          "qty": 3500
        },
        {
          "item": "Gold",
          "id": "SC",
          "qty": 10000000
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 40000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "ultraCores": 1000,
      "description": "Earn Gear Tier 21 Skill Mini-Unique, and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: GT21 Mystic",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 800000
        },
        {
          "item": "Crimson Ritual Salts",
          "id": "GEAR_RED_MYSTIC_MAT_C4",
          "qty": 105
        },
        {
          "item": "Crimson Psionic Essence",
          "id": "GEAR_RED_MYSTIC_MAT_C6",
          "qty": 105
        },
        {
          "item": "Crimson Arcane Powder",
          "id": "GEAR_RED_MYSTIC_MAT_BIT",
          "qty": 1650
        },
        {
          "item": "Crimson Esoteric Glyphs",
          "id": "GEAR_RED_MYSTIC_MAT_C2",
          "qty": 1375
        },
        {
          "item": "Crimson Vial",
          "id": "GEAR_RED_MYSTIC_MAT_C3",
          "qty": 1100
        },
        {
          "item": "Crimson Basic Catalyst Part",
          "id": "GEAR_RED_BASIC_CAT_BIT",
          "qty": 3500
        },
        {
          "item": "Gold",
          "id": "SC",
          "qty": 10000000
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 40000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "ultraCores": 1000,
      "description": "Earn Gear Tier 21 Mystic Mini-Unique, and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Ions Special",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 50000
        },
        {
          "item": "T3 Level 4 Ions",
          "id": "ISO8-TIER-2-B-CURRENCY",
          "qty": 2700000
        },
        {
          "item": "T3 Level 5 Ions",
          "id": "ISO8-TIER-2-C-CURRENCY",
          "qty": 2700000
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 2500,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1500,
          "webBonus": true
        }
      ],
      "ultraCores": 150,
      "description": "Earn T3 Level 4 and Level 5 Ions, and also gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Ability Power Up",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 75000
        },
        {
          "item": "T4 Ability Material",
          "id": "ABILITY_MATERIAL_ORANGE_ABILITY_MAT",
          "qty": 840
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 3750,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "ultraCores": 200,
      "description": "Strengthen your roster with T4 Ability Materials and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Terrific Training",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 75000
        },
        {
          "item": "L4 Training Module",
          "id": "CONSUMABLE_XPLVL80",
          "qty": 4620
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 3750,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "ultraCores": 200,
      "description": "Pick up a great L4 Training Module bundle to level up characters and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Whiplash",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 9,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 125000
        },
        {
          "item": "Whiplash shards",
          "id": "SHARD_WHIPLASH",
          "qty": 100
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 6250,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "ultraCores": 250,
      "description": "Strengthen your roster with Whiplash shards and earn points toward the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Ulysses Klaue",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 9,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 125000
        },
        {
          "item": "Ulysses Klaue shards",
          "id": "SHARD_ULYSSESKLAUE",
          "qty": 100
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 6250,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "ultraCores": 250,
      "description": "Power up your roster with Ulysses Klaue shards and make progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Iron Monger",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 9,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 125000
        },
        {
          "item": "Iron Monger shards",
          "id": "SHARD_IRONMONGER",
          "qty": 100
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 6250,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "ultraCores": 250,
      "description": "Boost your roster with Iron Monger shards and claim progress toward the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Jocasta",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 9,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 300000
        },
        {
          "item": "Jocasta shards",
          "id": "SHARD_JOCASTA",
          "qty": 100
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 15000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "ultraCores": 500,
      "description": "Grab Jocasta shards and score points to push further in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Hawkeye (Robot)",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 9,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 300000
        },
        {
          "item": "Hawkeye (Robot) shards",
          "id": "SHARD_HAWKEYEROBOT",
          "qty": 100
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 15000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "ultraCores": 500,
      "description": "Gear up with Hawkeye (Robot) shards and rack up points in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Human Torch (Jim)",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 9,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 300000
        },
        {
          "item": "Human Torch (Jim) shards",
          "id": "SHARD_HUMANTORCHJIM",
          "qty": 100
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 15000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "ultraCores": 500,
      "description": "Gather Human Torch (Jim) shards and unlock more rewards as you advance in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Jocasta 2-Diamond",
      "price": 549.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 4000000
        },
        {
          "item": "Jocasta shards",
          "id": "SHARD_JOCASTA",
          "qty": 810
        },
        {
          "item": "Jocasta — 2 diamond promotion",
          "id": "PD_JOCASTA_2",
          "qty": 1
        },
        {
          "item": "Jocasta — 7 red star promotion",
          "id": "RS_JOCASTA_7",
          "qty": 1
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 200000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 40000,
          "webBonus": true
        }
      ],
      "ultraCores": 4000,
      "description": "Instantly power up Jocasta to 2-Diamond and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Hawkeye (Robot) 2-Diamond",
      "price": 549.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 4000000
        },
        {
          "item": "Hawkeye (Robot) shards",
          "id": "SHARD_HAWKEYEROBOT",
          "qty": 810
        },
        {
          "item": "Hawkeye (Robot) — 2 diamond promotion",
          "id": "PD_HAWKEYEROBOT_2",
          "qty": 1
        },
        {
          "item": "Hawkeye (Robot) — 7 red star promotion",
          "id": "RS_HAWKEYEROBOT_7",
          "qty": 1
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 200000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 40000,
          "webBonus": true
        }
      ],
      "ultraCores": 4000,
      "description": "Instantly power up Hawkeye (Robot) to 2-Diamond and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Human Torch (Jim) 2-Diamond",
      "price": 549.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 4000000
        },
        {
          "item": "Human Torch (Jim) shards",
          "id": "SHARD_HUMANTORCHJIM",
          "qty": 810
        },
        {
          "item": "Human Torch (Jim) — 2 diamond promotion",
          "id": "PD_HUMANTORCHJIM_2",
          "qty": 1
        },
        {
          "item": "Human Torch (Jim) — 7 red star promotion",
          "id": "RS_HUMANTORCHJIM_7",
          "qty": 1
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 200000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 40000,
          "webBonus": true
        }
      ],
      "ultraCores": 4000,
      "description": "Instantly power up Human Torch (Jim) to 2-Diamond and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Whiplash 2-Diamond",
      "price": 549.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 4000000
        },
        {
          "item": "Whiplash shards",
          "id": "SHARD_WHIPLASH",
          "qty": 810
        },
        {
          "item": "Whiplash — 2 diamond promotion",
          "id": "PD_WHIPLASH_2",
          "qty": 1
        },
        {
          "item": "Whiplash — 7 red star promotion",
          "id": "RS_WHIPLASH_7",
          "qty": 1
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 200000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 40000,
          "webBonus": true
        }
      ],
      "ultraCores": 4000,
      "description": "Instantly power up Whiplash to 2-Diamond and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Ulysses Klaue 2-Diamond",
      "price": 549.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 4000000
        },
        {
          "item": "Ulysses Klaue shards",
          "id": "SHARD_ULYSSESKLAUE",
          "qty": 810
        },
        {
          "item": "Ulysses Klaue — 2 diamond promotion",
          "id": "PD_ULYSSESKLAUE_2",
          "qty": 1
        },
        {
          "item": "Ulysses Klaue — 7 red star promotion",
          "id": "RS_ULYSSESKLAUE_7",
          "qty": 1
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 200000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 40000,
          "webBonus": true
        }
      ],
      "ultraCores": 4000,
      "description": "Instantly power up Ulysses Klaue to 2-Diamond and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Iron Monger 2-Diamond",
      "price": 549.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 4000000
        },
        {
          "item": "Iron Monger shards",
          "id": "SHARD_IRONMONGER",
          "qty": 810
        },
        {
          "item": "Iron Monger — 2 diamond promotion",
          "id": "PD_IRONMONGER_2",
          "qty": 1
        },
        {
          "item": "Iron Monger — 7 red star promotion",
          "id": "RS_IRONMONGER_7",
          "qty": 1
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 200000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 40000,
          "webBonus": true
        }
      ],
      "ultraCores": 4000,
      "description": "Instantly power up Iron Monger to 2-Diamond and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Jocasta 3-Diamond",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 800000
        },
        {
          "item": "Jocasta — 3 diamond promotion",
          "id": "PD_JOCASTA_3",
          "qty": 1
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 40000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "ultraCores": 1000,
      "description": "Upgrade Jocasta to 3-Diamond and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Hawkeye (Robot) 3-Diamond",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 800000
        },
        {
          "item": "Hawkeye (Robot) — 3 diamond promotion",
          "id": "PD_HAWKEYEROBOT_3",
          "qty": 1
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 40000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "ultraCores": 1000,
      "description": "Empower Hawkeye (Robot) with a 3-Diamond upgrade and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Human Torch (Jim) 3-Diamond",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 800000
        },
        {
          "item": "Human Torch (Jim) — 3 diamond promotion",
          "id": "PD_HUMANTORCHJIM_3",
          "qty": 1
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 40000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "ultraCores": 1000,
      "description": "Boost Human Torch (Jim) to 3-Diamond and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: A.I. Avengers Mega Orb",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 800000
        },
        {
          "item": "A.I. Avengers Mega Orb Fragment",
          "id": "GACHA_CRATE_AIAVENGERSMEGA_NOV26_TOKEN_c1bb1633",
          "qty": 2000
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 40000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "ultraCores": 1000,
      "description": "Open this Orb for a chance to get 400 Shards for A.I. Avengers, plus a bunch of points toward the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Iron Raiders Mega Orb",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 800000
        },
        {
          "item": "Iron Raiders Mega Orb Fragment",
          "id": "GACHA_CRATE_IRONRAIDERSMEGA_NOV26_TOKEN_d9bf3541",
          "qty": 2000
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 40000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "ultraCores": 1000,
      "description": "Open this Orb for a chance to get 500 Shards for Iron Raiders, plus a bunch of points toward the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Cores Pack (step 2 of 5)",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 4h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 30000
        },
        {
          "item": "Power Cores",
          "id": "HC",
          "qty": 1000
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 1500,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Cyber Breach: Cores Pack",
        "step": 2,
        "of": 5,
        "current": 2,
        "steps": [
          {
            "step": 2,
            "name": "Cyber Breach: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 30000
              },
              {
                "item": "Power Cores",
                "id": "HC",
                "qty": 1000
              },
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 1500,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 1000,
                "webBonus": true
              }
            ],
            "ultraCores": 100
          },
          {
            "step": 3,
            "name": "Cyber Breach: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 30000
              },
              {
                "item": "Power Cores",
                "id": "HC",
                "qty": 1100
              },
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 1500,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 1000,
                "webBonus": true
              }
            ],
            "ultraCores": 100
          },
          {
            "step": 4,
            "name": "Cyber Breach: Cores Pack",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 75000
              },
              {
                "item": "Power Cores",
                "id": "HC",
                "qty": 2300
              },
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 3750,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 5,
            "name": "Cyber Breach: Cores Pack",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 200000
              },
              {
                "item": "Power Cores",
                "id": "HC",
                "qty": 6000
              },
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 10000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 5000,
                "webBonus": true
              }
            ],
            "ultraCores": 500
          }
        ]
      },
      "ultraCores": 100
    },
    {
      "name": "Cyber Breach: Cores Pack (step 3 of 5)",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 4h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 30000
        },
        {
          "item": "Power Cores",
          "id": "HC",
          "qty": 1100
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 1500,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Cyber Breach: Cores Pack",
        "step": 3,
        "of": 5,
        "current": 2,
        "steps": [
          {
            "step": 2,
            "name": "Cyber Breach: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 30000
              },
              {
                "item": "Power Cores",
                "id": "HC",
                "qty": 1000
              },
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 1500,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 1000,
                "webBonus": true
              }
            ],
            "ultraCores": 100
          },
          {
            "step": 3,
            "name": "Cyber Breach: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 30000
              },
              {
                "item": "Power Cores",
                "id": "HC",
                "qty": 1100
              },
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 1500,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 1000,
                "webBonus": true
              }
            ],
            "ultraCores": 100
          },
          {
            "step": 4,
            "name": "Cyber Breach: Cores Pack",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 75000
              },
              {
                "item": "Power Cores",
                "id": "HC",
                "qty": 2300
              },
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 3750,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 5,
            "name": "Cyber Breach: Cores Pack",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 200000
              },
              {
                "item": "Power Cores",
                "id": "HC",
                "qty": 6000
              },
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 10000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 5000,
                "webBonus": true
              }
            ],
            "ultraCores": 500
          }
        ]
      },
      "ultraCores": 100
    },
    {
      "name": "Cyber Breach: Cores Pack (step 4 of 5)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 4h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 75000
        },
        {
          "item": "Power Cores",
          "id": "HC",
          "qty": 2300
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 3750,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Cyber Breach: Cores Pack",
        "step": 4,
        "of": 5,
        "current": 2,
        "steps": [
          {
            "step": 2,
            "name": "Cyber Breach: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 30000
              },
              {
                "item": "Power Cores",
                "id": "HC",
                "qty": 1000
              },
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 1500,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 1000,
                "webBonus": true
              }
            ],
            "ultraCores": 100
          },
          {
            "step": 3,
            "name": "Cyber Breach: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 30000
              },
              {
                "item": "Power Cores",
                "id": "HC",
                "qty": 1100
              },
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 1500,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 1000,
                "webBonus": true
              }
            ],
            "ultraCores": 100
          },
          {
            "step": 4,
            "name": "Cyber Breach: Cores Pack",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 75000
              },
              {
                "item": "Power Cores",
                "id": "HC",
                "qty": 2300
              },
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 3750,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 5,
            "name": "Cyber Breach: Cores Pack",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 200000
              },
              {
                "item": "Power Cores",
                "id": "HC",
                "qty": 6000
              },
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 10000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 5000,
                "webBonus": true
              }
            ],
            "ultraCores": 500
          }
        ]
      },
      "ultraCores": 200
    },
    {
      "name": "Cyber Breach: Cores Pack (step 5 of 5)",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 4h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 200000
        },
        {
          "item": "Power Cores",
          "id": "HC",
          "qty": 6000
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 10000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Cyber Breach: Cores Pack",
        "step": 5,
        "of": 5,
        "current": 2,
        "steps": [
          {
            "step": 2,
            "name": "Cyber Breach: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 30000
              },
              {
                "item": "Power Cores",
                "id": "HC",
                "qty": 1000
              },
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 1500,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 1000,
                "webBonus": true
              }
            ],
            "ultraCores": 100
          },
          {
            "step": 3,
            "name": "Cyber Breach: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 30000
              },
              {
                "item": "Power Cores",
                "id": "HC",
                "qty": 1100
              },
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 1500,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 1000,
                "webBonus": true
              }
            ],
            "ultraCores": 100
          },
          {
            "step": 4,
            "name": "Cyber Breach: Cores Pack",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 75000
              },
              {
                "item": "Power Cores",
                "id": "HC",
                "qty": 2300
              },
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 3750,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 2000,
                "webBonus": true
              }
            ],
            "ultraCores": 200
          },
          {
            "step": 5,
            "name": "Cyber Breach: Cores Pack",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 200000
              },
              {
                "item": "Power Cores",
                "id": "HC",
                "qty": 6000
              },
              {
                "item": "Cyber Breach Milestone Points",
                "id": "EVTA_META_NOV_D",
                "qty": 10000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "id": "BFYB-CUR",
                "qty": 5000,
                "webBonus": true
              }
            ],
            "ultraCores": 500
          }
        ]
      },
      "ultraCores": 500
    },
    {
      "name": "Cyber Breach: Ka-Zar Premium Pack",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 100000
        },
        {
          "item": "Ka-Zar shards",
          "id": "SHARD_KAZAR",
          "qty": 48
        },
        {
          "item": "Gold",
          "id": "SC",
          "qty": 1300000
        },
        {
          "item": "T3 Level 1 Ions",
          "id": "ISO8-TIER-2-A-CURRENCY",
          "qty": 770000
        },
        {
          "item": "Cyber Breach Milestone Points",
          "id": "EVTA_META_NOV_D",
          "qty": 5000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "ultraCores": 200,
      "description": "Strengthen your roster with Ka-Zar Shards, Gold, and T3 Level 1 Ions and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Raid Warzone: Daily Allied Supply",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "4h 14m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Raid Warzone Milestone Points",
          "id": "EVTA_META_NOV_C",
          "qty": 3500
        },
        {
          "item": "Allied Supply XIII Orb Fragments",
          "id": "GACHA_CRATE_ALLIEDSUPPLY13_TOKEN_23246982",
          "qty": 4000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "ultraCores": 100,
      "description": "Get Allied Supply XIII Orbs for Raid Warzone progress!"
    },
    {
      "name": "Raid Warzone: Mega Pack",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "4h 14m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Raid Warzone Milestone Points",
          "id": "EVTA_META_NOV_C",
          "qty": 120000
        },
        {
          "item": "Gold Orb Fragments",
          "id": "GACHA_CRATE_GOLD_TOKEN_b39f19f5",
          "qty": 20000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "ultraCores": 1000,
      "description": "Get ahead in Raid Warzone Milestone and propel your Alliance to Gold Orb Fragments!"
    },
    {
      "name": "Raid Warzone: Special Bundle",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 4,
      "expires": "4h 14m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Raid Warzone Milestone Points",
          "id": "EVTA_META_NOV_C",
          "qty": 20000
        },
        {
          "item": "L4 Training Module",
          "id": "CONSUMABLE_XPLVL80",
          "qty": 500
        },
        {
          "item": "T3 Iso-8 Credits",
          "id": "ISO8-TIER-2-ITEM-CREDITS-CURRENCY",
          "qty": 10000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "ultraCores": 300,
      "description": "Claim this special deal to boost your progress in the Raid Warzone Milestone!"
    },
    {
      "name": "Raid Warzone: Raid Boost",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "4h 14m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Raid Warzone Milestone Points",
          "id": "EVTA_META_NOV_C",
          "qty": 2000
        },
        {
          "item": "Raid Health Pack",
          "id": "HEAL-RAID-CUR",
          "qty": 300
        },
        {
          "item": "Raid Energy Refill",
          "id": "ENERGY-RAID-CUR",
          "qty": 400
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 500,
          "webBonus": true
        }
      ],
      "ultraCores": 50,
      "description": "Stock up on Raid Supplies and get ahead in the Raid Warzone Milestone!"
    },
    {
      "name": "Raid Warzone: Daily Allied Supply",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "4h 14m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Raid Warzone Milestone Points",
          "id": "EVTA_META_NOV_C",
          "qty": 7000
        },
        {
          "item": "Allied Supply XIII Orb Fragments",
          "id": "GACHA_CRATE_ALLIEDSUPPLY13_TOKEN_23246982",
          "qty": 8000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "ultraCores": 200,
      "description": "Get Allied Supply XIII Orbs for Raid Warzone progress!"
    },
    {
      "name": "Shadow Diamond Orbs: Premium",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "3d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Shadow Diamond Orb Fragments",
          "id": "GACHA_CRATE_SHADOW_DIAMOND_TOKEN_bd83d98b",
          "qty": 30000
        },
        {
          "item": "Tip: Shadow Radiance",
          "id": "EVTA_META_NOV_G",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "ultraCores": 1000,
      "description": "Open these Orbs to earn Diamonds for Shadow Conclaves and gain progress in the Shadow Radiance Milestone to get 5-Diamond Shadow Conclave characters."
    },
    {
      "name": "Shadow Diamond Orbs: Standard",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 8,
      "expires": "3d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Shadow Diamond Orb Fragments",
          "id": "GACHA_CRATE_SHADOW_DIAMOND_TOKEN_bd83d98b",
          "qty": 12000
        },
        {
          "item": "Tip: Shadow Radiance",
          "id": "EVTA_META_NOV_G",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "ultraCores": 500,
      "description": "Open these Orbs to earn Diamonds for Shadow Conclaves and gain progress in the Shadow Radiance Milestone to get 5-Diamond Shadow Conclave characters."
    },
    {
      "name": "Shadow Diamond Orbs: Starter",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 20,
      "expires": "3d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Shadow Diamond Orb Fragments",
          "id": "GACHA_CRATE_SHADOW_DIAMOND_TOKEN_bd83d98b",
          "qty": 4000
        },
        {
          "item": "Tip: Shadow Radiance",
          "id": "EVTA_META_NOV_G",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "ultraCores": 200,
      "description": "Open these Orbs to earn Diamonds for Shadow Conclaves and gain progress in the Shadow Radiance Milestone to get 5-Diamond Shadow Conclave characters."
    },
    {
      "name": "Shadow Rising: Web Special",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Shadow Rising Orb Fragments",
          "id": "GACHA_CRATE_SHADOWRISING_TOKEN_0e6b0ac7",
          "qty": 10000
        },
        {
          "item": "Tip: Shadow Rising",
          "id": "EVTA_META_NOV_F",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "ultraCores": 200,
      "description": "Don't miss this special offer with the Shadow Rising Orbs! Get up to 200 Shadow Conclave Shards from each and keep climbing the Milestone for more rewards!"
    },
    {
      "name": "Shadow Rising Orb",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "3d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Shadow Rising Orb Fragments",
          "id": "GACHA_CRATE_SHADOWRISING_TOKEN_0e6b0ac7",
          "qty": 2000
        },
        {
          "item": "Tip: Shadow Rising",
          "id": "EVTA_META_NOV_F",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 500,
          "webBonus": true
        }
      ],
      "ultraCores": 50,
      "description": "Crack open this orb to collect 90 to 200 Shadow Conclave shards and boost your Shadow Rising Milestone progress toward additional rewards!"
    },
    {
      "name": "Turn Up the Power (option 1)",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "4h 14m",
      "section": "dual offers",
      "sections": [
        "dual offers"
      ],
      "contents": [
        {
          "item": "T4 Ability Material",
          "id": "ABILITY_MATERIAL_ORANGE_ABILITY_MAT",
          "qty": 210
        },
        {
          "item": "T4 Level 1 Ions",
          "id": "ISO8-TIER-3-A-CURRENCY",
          "qty": 31000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 500,
          "webBonus": true
        }
      ],
      "ultraCores": 50
    },
    {
      "name": "Turn Up the Power (option 2)",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "4h 14m",
      "section": "dual offers",
      "sections": [
        "dual offers"
      ],
      "contents": [
        {
          "item": "T4 Ability Material",
          "id": "ABILITY_MATERIAL_ORANGE_ABILITY_MAT",
          "qty": 460
        },
        {
          "item": "T4 Level 1 Ions",
          "id": "ISO8-TIER-3-A-CURRENCY",
          "qty": 69300
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "ultraCores": 100
    },
    {
      "name": "ISO Fest: ISO Fest Diamond Orb",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "15d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "id": "EVTA_META_NOV_H",
          "qty": 225000000
        },
        {
          "item": "ISO-Fest Diamond Orb Fragments",
          "id": "GACHA_CRATE_ISOFEST_DIAMOND_TOKEN_346424e5",
          "qty": 26000
        },
        {
          "item": "ISO Fest Milestone Points",
          "id": "EVTA_META_NOV_H",
          "qty": 10000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "ultraCores": 1000,
      "description": "Open this Orb to earn up to 4 Diamonds for select characters, also gain progress in the ISO Fest Milestone!"
    },
    {
      "name": "ISO Fest: ISO Fest Yellow Orb",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "15d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "id": "EVTA_META_NOV_H",
          "qty": 225000000
        },
        {
          "item": "ISO-Fest Yellow Orb Fragments",
          "id": "GACHA_CRATE_ISOFEST_YELLOW_TOKEN_c0eea83a",
          "qty": 50000
        },
        {
          "item": "ISO Fest Milestone Points",
          "id": "EVTA_META_NOV_H",
          "qty": 10000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "ultraCores": 1000,
      "description": "Open this Orb to earn up to 810 Shards for select characters, also gain progress in the ISO Fest Milestone!"
    },
    {
      "name": "ISO Fest: ISO Fest Diamond Orb",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "15d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "id": "EVTA_META_NOV_H",
          "qty": 110000000
        },
        {
          "item": "ISO-Fest Diamond Orb Fragments",
          "id": "GACHA_CRATE_ISOFEST_DIAMOND_TOKEN_346424e5",
          "qty": 12000
        },
        {
          "item": "ISO Fest Milestone Points",
          "id": "EVTA_META_NOV_H",
          "qty": 5000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "ultraCores": 500,
      "description": "Open this Orb to earn up to 4 Diamonds for select characters, also gain progress in the ISO Fest Milestone!"
    },
    {
      "name": "ISO Fest: ISO Fest Yellow Orb",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "15d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "id": "EVTA_META_NOV_H",
          "qty": 52500000
        },
        {
          "item": "ISO-Fest Yellow Orb Fragments",
          "id": "GACHA_CRATE_ISOFEST_YELLOW_TOKEN_c0eea83a",
          "qty": 12000
        },
        {
          "item": "ISO Fest Milestone Points",
          "id": "EVTA_META_NOV_H",
          "qty": 2500000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "ultraCores": 250,
      "description": "Open this Orb to earn up to 810 Shards for select characters, also gain progress in the ISO Fest Milestone!"
    },
    {
      "name": "ISO Fest: Orange Mega Orb",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "15d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "id": "EVTA_META_NOV_H",
          "qty": 225000000
        },
        {
          "item": "Orange Mega Orb",
          "id": "GACHA_75701dd14119cc312211b430d144aafb9b926e8172872eb620d634b4a18a920f",
          "qty": 1
        },
        {
          "item": "ISO Fest Milestone Points",
          "id": "EVTA_META_NOV_H",
          "qty": 10000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "ultraCores": 1000,
      "description": "Open this Orb to stock up on T4 Level 1 Ions and T4 Iso-8 Credits, also gain progress in the ISO Fest Milestone! This special Orb will automatically open upon purchase."
    },
    {
      "name": "T3 L5 Ions Blaster Pack",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 10,
      "expires": "15d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "id": "EVTA_META_NOV_H",
          "qty": 20000000
        },
        {
          "item": "T3 Blaster Damage Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_BLASTER_DAMAGE_11",
          "qty": 81
        },
        {
          "item": "T3 Blaster Armor Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_BLASTER_ARMOR_11",
          "qty": 81
        },
        {
          "item": "T3 Level 1 Ions",
          "id": "ISO8-TIER-2-A-CURRENCY",
          "qty": 3000000
        },
        {
          "item": "T3 Blaster Focus Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_BLASTER_FOCUS_11",
          "qty": 81
        },
        {
          "item": "T3 Level 5 Ions",
          "id": "ISO8-TIER-2-C-CURRENCY",
          "qty": 3000000
        },
        {
          "item": "T3 Blaster Health Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_BLASTER_HEALTH_11",
          "qty": 81
        },
        {
          "item": "T3 Blaster Resist Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_BLASTER_RESIST_11",
          "qty": 81
        },
        {
          "item": "T3 Level 4 Ions",
          "id": "ISO8-TIER-2-B-CURRENCY",
          "qty": 3000000
        },
        {
          "item": "ISO Fest Milestone Points",
          "id": "EVTA_META_NOV_H",
          "qty": 1000000,
          "webBonus": true
        },
        {
          "item": "T3 Level 5 Ions",
          "id": "ISO8-TIER-2-C-CURRENCY",
          "qty": 300000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "ultraCores": 100,
      "description": "ISO Fest: Earn a supply of T3 Level 5 Ions and T3 Blaster Level 1 Iso-8 Crystals, also gain progress in this Milestone event!"
    },
    {
      "name": "T3 L5 Ions Brawler Pack",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 9,
      "expires": "15d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "id": "EVTA_META_NOV_H",
          "qty": 20000000
        },
        {
          "item": "T3 Brawler Focus Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_BRAWLER_FOCUS_11",
          "qty": 81
        },
        {
          "item": "T3 Brawler Armor Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_BRAWLER_ARMOR_11",
          "qty": 81
        },
        {
          "item": "T3 Brawler Health Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_BRAWLER_HEALTH_11",
          "qty": 81
        },
        {
          "item": "T3 Level 4 Ions",
          "id": "ISO8-TIER-2-B-CURRENCY",
          "qty": 3000000
        },
        {
          "item": "T3 Brawler Resist Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_BRAWLER_RESIST_11",
          "qty": 81
        },
        {
          "item": "T3 Brawler Damage Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_BRAWLER_DAMAGE_11",
          "qty": 81
        },
        {
          "item": "T3 Level 5 Ions",
          "id": "ISO8-TIER-2-C-CURRENCY",
          "qty": 3000000
        },
        {
          "item": "T3 Level 1 Ions",
          "id": "ISO8-TIER-2-A-CURRENCY",
          "qty": 3000000
        },
        {
          "item": "ISO Fest Milestone Points",
          "id": "EVTA_META_NOV_H",
          "qty": 1000000,
          "webBonus": true
        },
        {
          "item": "T3 Level 5 Ions",
          "id": "ISO8-TIER-2-C-CURRENCY",
          "qty": 300000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "boughtBefore": true,
      "ultraCores": 100,
      "description": "ISO Fest: Earn a supply of T3 Level 5 Ions and T3 Brawler Level 1 Iso-8 Crystals, also gain progress in this Milestone event!"
    },
    {
      "name": "T3 L5 Ions Controller Pack",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 9,
      "expires": "15d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "id": "EVTA_META_NOV_H",
          "qty": 20000000
        },
        {
          "item": "T3 Controller Resist Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_CONTROLLER_RESIST_11",
          "qty": 81
        },
        {
          "item": "T3 Controller Focus Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_CONTROLLER_FOCUS_11",
          "qty": 81
        },
        {
          "item": "T3 Level 1 Ions",
          "id": "ISO8-TIER-2-A-CURRENCY",
          "qty": 3000000
        },
        {
          "item": "T3 Level 4 Ions",
          "id": "ISO8-TIER-2-B-CURRENCY",
          "qty": 3000000
        },
        {
          "item": "T3 Controller Health Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_CONTROLLER_HEALTH_11",
          "qty": 81
        },
        {
          "item": "T3 Controller Damage Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_CONTROLLER_DAMAGE_11",
          "qty": 81
        },
        {
          "item": "T3 Level 5 Ions",
          "id": "ISO8-TIER-2-C-CURRENCY",
          "qty": 3000000
        },
        {
          "item": "T3 Controller Armor Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_CONTROLLER_ARMOR_11",
          "qty": 81
        },
        {
          "item": "ISO Fest Milestone Points",
          "id": "EVTA_META_NOV_H",
          "qty": 1000000,
          "webBonus": true
        },
        {
          "item": "T3 Level 5 Ions",
          "id": "ISO8-TIER-2-C-CURRENCY",
          "qty": 300000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "boughtBefore": true,
      "ultraCores": 100,
      "description": "ISO Fest: Earn a supply of T3 Level 5 Ions and T3 Controller Level 1 Iso-8 Crystals, also gain progress in this Milestone event!"
    },
    {
      "name": "ISO Fest: T3 Level 5 Ions Trove",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "15d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "id": "EVTA_META_NOV_H",
          "qty": 225000000
        },
        {
          "item": "T3 Level 5 Ions",
          "id": "ISO8-TIER-2-C-CURRENCY",
          "qty": 40000000
        },
        {
          "item": "T3 Level 4 Ions",
          "id": "ISO8-TIER-2-B-CURRENCY",
          "qty": 40000000
        },
        {
          "item": "T3 Level 1 Ions",
          "id": "ISO8-TIER-2-A-CURRENCY",
          "qty": 7500000
        },
        {
          "item": "T3 Level 1 Ions",
          "id": "ISO8-TIER-2-A-CURRENCY",
          "qty": 7500000
        },
        {
          "item": "T3 Level 1 Ions",
          "id": "ISO8-TIER-2-A-CURRENCY",
          "qty": 7500000
        },
        {
          "item": "T3 Level 1 Ions",
          "id": "ISO8-TIER-2-A-CURRENCY",
          "qty": 7500000
        },
        {
          "item": "T3 Level 1 Ions",
          "id": "ISO8-TIER-2-A-CURRENCY",
          "qty": 7500000
        },
        {
          "item": "T3 Level 1 Ions",
          "id": "ISO8-TIER-2-A-CURRENCY",
          "qty": 2500000
        },
        {
          "item": "T3 Brawler Armor Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_BRAWLER_ARMOR_11",
          "qty": 405
        },
        {
          "item": "T3 Brawler Resist Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_BRAWLER_RESIST_11",
          "qty": 405
        },
        {
          "item": "T3 Brawler Health Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_BRAWLER_HEALTH_11",
          "qty": 405
        },
        {
          "item": "T3 Brawler Focus Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_BRAWLER_FOCUS_11",
          "qty": 405
        },
        {
          "item": "T3 Brawler Damage Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_BRAWLER_DAMAGE_11",
          "qty": 405
        },
        {
          "item": "T3 Blaster Armor Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_BLASTER_ARMOR_11",
          "qty": 405
        },
        {
          "item": "T3 Blaster Resist Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_BLASTER_RESIST_11",
          "qty": 405
        },
        {
          "item": "T3 Blaster Health Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_BLASTER_HEALTH_11",
          "qty": 405
        },
        {
          "item": "T3 Blaster Focus Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_BLASTER_FOCUS_11",
          "qty": 405
        },
        {
          "item": "T3 Blaster Damage Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_BLASTER_DAMAGE_11",
          "qty": 405
        },
        {
          "item": "T3 Controller Armor Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_CONTROLLER_ARMOR_11",
          "qty": 405
        },
        {
          "item": "T3 Controller Resist Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_CONTROLLER_RESIST_11",
          "qty": 405
        },
        {
          "item": "T3 Controller Health Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_CONTROLLER_HEALTH_11",
          "qty": 405
        },
        {
          "item": "T3 Controller Focus Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_CONTROLLER_FOCUS_11",
          "qty": 405
        },
        {
          "item": "T3 Controller Damage Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_CONTROLLER_DAMAGE_11",
          "qty": 405
        },
        {
          "item": "T3 Protector Armor Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_PROTECTOR_ARMOR_11",
          "qty": 405
        },
        {
          "item": "T3 Protector Resist Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_PROTECTOR_RESIST_11",
          "qty": 405
        },
        {
          "item": "T3 Protector Health Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_PROTECTOR_HEALTH_11",
          "qty": 405
        },
        {
          "item": "T3 Protector Focus Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_PROTECTOR_FOCUS_11",
          "qty": 405
        },
        {
          "item": "T3 Protector Damage Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_PROTECTOR_DAMAGE_11",
          "qty": 405
        },
        {
          "item": "T3 Support Armor Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_SUPPORT_ARMOR_11",
          "qty": 405
        },
        {
          "item": "T3 Support Resist Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_SUPPORT_RESIST_11",
          "qty": 405
        },
        {
          "item": "T3 Support Health Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_SUPPORT_HEALTH_11",
          "qty": 405
        },
        {
          "item": "T3 Support Focus Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_SUPPORT_FOCUS_11",
          "qty": 405
        },
        {
          "item": "T3 Support Damage Level 1 Iso-8",
          "id": "ISOITEM_PURPLE_SUPPORT_DAMAGE_11",
          "qty": 405
        },
        {
          "item": "ISO Fest Milestone Points",
          "id": "EVTA_META_NOV_H",
          "qty": 10000000,
          "webBonus": true
        },
        {
          "item": "T3 Level 5 Ions",
          "id": "ISO8-TIER-2-C-CURRENCY",
          "qty": 1500000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "ultraCores": 1000,
      "description": "Seize the T3 Level 5 Ions and boost 5 characters of each role trait to T3 Level 5 Iso-8, also grab a bunch of points to gain progress in this Milestone event!"
    },
    {
      "name": "ISO Fest: T3 Level 5 Ions",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 98,
      "expires": "15d 4h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "id": "EVTA_META_NOV_H",
          "qty": 10000000
        },
        {
          "item": "T3 Level 5 Ions",
          "id": "ISO8-TIER-2-C-CURRENCY",
          "qty": 3000000
        },
        {
          "item": "ISO Fest Milestone Points",
          "id": "EVTA_META_NOV_H",
          "qty": 500000,
          "webBonus": true
        },
        {
          "item": "Basic T3 Iso-8 Orb Fragments",
          "id": "GACHA_CRATE_ISO8_T3_BASIC_TOKEN_6812fd67",
          "qty": 50000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 500,
          "webBonus": true
        }
      ],
      "boughtBefore": true,
      "ultraCores": 50,
      "description": "Secure a trove of T3 Level 5 Ions, also gain progress in the ISO Fest Milestone!"
    },
    {
      "name": "ISO Fest: Orange Mega Orb",
      "price": 119.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "15d 4h",
      "section": "Offers / WEB EXCLUSIVE",
      "sections": [
        "Offers / WEB EXCLUSIVE"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "id": "EVTA_META_NOV_H",
          "qty": 225000000
        },
        {
          "item": "Orange Mega Orb",
          "id": "GACHA_75701dd14119cc312211b430d144aafb9b926e8172872eb620d634b4a18a920f",
          "qty": 1
        },
        {
          "item": "ISO Fest Milestone Points",
          "id": "EVTA_META_NOV_H",
          "qty": 9000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 9000,
          "webBonus": true
        }
      ],
      "ultraCores": 900,
      "description": "Open this Orb to stock up on T4 Level 1 Ions and T4 Iso-8 Credits, also gain progress in the ISO Fest Milestone! This special Orb will automatically open upon purchase."
    },
    {
      "name": "Nightstalker Power Up",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 4h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Agatha Harkness shards",
          "id": "SHARD_AGATHAHARKNESS",
          "qty": 270
        },
        {
          "item": "Blade shards",
          "id": "SHARD_BLADE",
          "qty": 270
        },
        {
          "item": "Man-Thing shards",
          "id": "SHARD_MANTHING",
          "qty": 270
        },
        {
          "item": "Oath shards",
          "id": "SHARD_OATH",
          "qty": 270
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1500,
          "webBonus": true
        }
      ],
      "ultraCores": 150,
      "description": "Reinforce your Nightstalkers team and rise victorious in battle!"
    },
    {
      "name": "Morbius Power Pack",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 4h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Crimson Basic Catalyst Part",
          "id": "GEAR_RED_BASIC_CAT_BIT",
          "qty": 1250
        },
        {
          "item": "Crimson Sigil",
          "id": "GEAR_RED_MYSTIC_MAT_C1",
          "qty": 50
        },
        {
          "item": "Crimson Mythic Geode",
          "id": "GEAR_RED_MYSTIC_MAT_C8",
          "qty": 50
        },
        {
          "item": "Crimson Uru",
          "id": "GEAR_RED_MAGIC3",
          "qty": 25
        },
        {
          "item": "Crimson Health Catalyst Part",
          "id": "GEAR_RED_HEALTH_MAT_BIT",
          "qty": 450
        },
        {
          "item": "Crimson Shoggoth Ichor",
          "id": "GEAR_RED_MYSTIC_MAT_C5",
          "qty": 18
        },
        {
          "item": "Crimson Celestial Lattice",
          "id": "GEAR_RED_MYSTIC_MAT_C9",
          "qty": 18
        },
        {
          "item": "Crimson Arcane Powder",
          "id": "GEAR_RED_MYSTIC_MAT_BIT",
          "qty": 312
        },
        {
          "item": "Crimson Esoteric Glyphs",
          "id": "GEAR_RED_MYSTIC_MAT_C2",
          "qty": 260
        },
        {
          "item": "Crimson Focus Catalyst Part",
          "id": "GEAR_RED_FOCUS_MAT_BIT",
          "qty": 250
        },
        {
          "item": "Crimson Vial",
          "id": "GEAR_RED_MYSTIC_MAT_C3",
          "qty": 208
        },
        {
          "item": "Crimson Resistance Catalyst Part",
          "id": "GEAR_RED_RESIST_MAT_BIT",
          "qty": 100
        },
        {
          "item": "Augmented Ritual Salts",
          "id": "GEAR_TEAL_MYSTIC_MAT_C4",
          "qty": 22
        },
        {
          "item": "Augmented Psionic Essence",
          "id": "GEAR_TEAL_MYSTIC_MAT_C6",
          "qty": 22
        },
        {
          "item": "Augmented Damage Catalyst Part",
          "id": "GEAR_TEAL_DAMAGE_MAT_BIT",
          "qty": 250
        },
        {
          "item": "Augmented Arcane Powder",
          "id": "GEAR_TEAL_MYSTIC_MAT_BIT",
          "qty": 198
        },
        {
          "item": "Augmented Esoteric Glyphs",
          "id": "GEAR_TEAL_MYSTIC_MAT_C2",
          "qty": 165
        },
        {
          "item": "Augmented Armor Catalyst Part",
          "id": "GEAR_TEAL_ARMOR_MAT_BIT",
          "qty": 150
        },
        {
          "item": "Augmented Vial",
          "id": "GEAR_TEAL_MYSTIC_MAT_C3",
          "qty": 132
        },
        {
          "item": "Augmented Sigil",
          "id": "GEAR_TEAL_MYSTIC_MAT_C1",
          "qty": 20
        },
        {
          "item": "Augmented Mythic Geode",
          "id": "GEAR_TEAL_MYSTIC_MAT_C8",
          "qty": 20
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "ultraCores": 1000,
      "description": "Prepare Morbius for battle with this special upgrade and crush the competition!"
    },
    {
      "name": "Iso Boost: Controller",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 4h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "T4 Level 1 Ions",
          "id": "ISO8-TIER-3-A-CURRENCY",
          "qty": 300000
        },
        {
          "item": "T4 Controller Armor Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_CONTROLLER_ARMOR_16",
          "qty": 5
        },
        {
          "item": "T4 Controller Damage Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_CONTROLLER_DAMAGE_16",
          "qty": 5
        },
        {
          "item": "T4 Controller Focus Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_CONTROLLER_FOCUS_16",
          "qty": 5
        },
        {
          "item": "T4 Controller Health Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_CONTROLLER_HEALTH_16",
          "qty": 5
        },
        {
          "item": "T4 Controller Resist Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_CONTROLLER_RESIST_16",
          "qty": 5
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "ultraCores": 500,
      "description": "Build a stronger roster faster with valuable Iso-8 resources. Grab this special offer before it's gone!"
    },
    {
      "name": "Whiplash Power Pack",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "4h 14m",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Whiplash shards",
          "id": "SHARD_WHIPLASH",
          "qty": 20
        },
        {
          "item": "Gold",
          "id": "SC",
          "qty": 340000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "ultraCores": 100,
      "description": "Upgrade Whiplash to push through Mission 2 of the Breaker Event: Sabretooth!"
    },
    {
      "name": "Morbius Power Pack",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "4h 14m",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "UT_MORBIUS_UT7YSTRIALS",
          "id": "UT_MORBIUS_UT7YSTRIALS",
          "qty": 1
        },
        {
          "item": "Gold",
          "id": "SC",
          "qty": 520000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1500,
          "webBonus": true
        }
      ],
      "ultraCores": 150,
      "description": "Upgrade Morbius to push through Mission 5 of the Breaker Event: Sabretooth!"
    },
    {
      "name": "Oath Power Pack",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "4h 14m",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "UT_OATH_UT7YSTRIALS",
          "id": "UT_OATH_UT7YSTRIALS",
          "qty": 1
        },
        {
          "item": "Gold",
          "id": "SC",
          "qty": 520000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1500,
          "webBonus": true
        }
      ],
      "ultraCores": 150,
      "description": "Upgrade Oath to push through Mission 5 of the Breaker Event: Sabretooth!"
    },
    {
      "name": "Iron Raiders Upgrade Combo",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "4h 14m",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Iron Monger shards",
          "id": "SHARD_IRONMONGER",
          "qty": 45
        },
        {
          "item": "Ulysses Klaue shards",
          "id": "SHARD_ULYSSESKLAUE",
          "qty": 45
        },
        {
          "item": "Yellowjacket shards",
          "id": "SHARD_YELLOWJACKET",
          "qty": 225
        },
        {
          "item": "Crossbones shards",
          "id": "SHARD_CROSSBONES",
          "qty": 225
        },
        {
          "item": "Gold",
          "id": "SC",
          "qty": 860000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "ultraCores": 250,
      "description": "Upgrade Iron Raiders to push through Missions 2 and 10 of the Breaker Event: Sabretooth!"
    },
    {
      "name": "S.T.R.I.K.E Pass Catch-Up!",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "9d 4h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "BPTIER_STORMMIGHTY_S123_ADVANCED_813554b0",
          "id": "BPTIER_STORMMIGHTY_S123_ADVANCED_813554b0",
          "qty": 20
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "ultraCores": 200,
      "description": "Get 20 S.T.R.I.K.E. Levels to catch up on S.T.R.I.K.E pass progress!"
    },
    {
      "name": "T4 Ions",
      "price": 99.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "5d 4h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "T4 Level 1 Ions",
          "id": "ISO8-TIER-3-A-CURRENCY",
          "qty": 600000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 7000,
          "webBonus": true
        }
      ],
      "ultraCores": 700,
      "description": "All the Ions you need to upgrade from T4 Level 1 to T4 Level 3!"
    },
    {
      "name": "T4 Iso Boost: Blaster",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "5d 4h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "T4 Blaster Armor Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_BLASTER_ARMOR_16",
          "qty": 9
        },
        {
          "item": "T4 Blaster Damage Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_BLASTER_DAMAGE_16",
          "qty": 9
        },
        {
          "item": "T4 Blaster Focus Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_BLASTER_FOCUS_16",
          "qty": 9
        },
        {
          "item": "T4 Blaster Health Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_BLASTER_HEALTH_16",
          "qty": 9
        },
        {
          "item": "T4 Blaster Resist Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_BLASTER_RESIST_16",
          "qty": 9
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "ultraCores": 300,
      "description": "All the Crystals you need to go from T4 Level 1 to T4 Level 3"
    },
    {
      "name": "T4 Iso Boost: Brawler",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "5d 4h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "T4 Brawler Armor Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_BRAWLER_ARMOR_16",
          "qty": 9
        },
        {
          "item": "T4 Brawler Damage Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_BRAWLER_DAMAGE_16",
          "qty": 9
        },
        {
          "item": "T4 Brawler Focus Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_BRAWLER_FOCUS_16",
          "qty": 9
        },
        {
          "item": "T4 Brawler Health Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_BRAWLER_HEALTH_16",
          "qty": 9
        },
        {
          "item": "T4 Brawler Resist Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_BRAWLER_RESIST_16",
          "qty": 9
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "ultraCores": 300,
      "description": "All the Crystals you need to go from T4 Level 1 to T4 Level 3"
    },
    {
      "name": "T4 Iso Boost: Controller",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "5d 4h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "T4 Controller Armor Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_CONTROLLER_ARMOR_16",
          "qty": 9
        },
        {
          "item": "T4 Controller Damage Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_CONTROLLER_DAMAGE_16",
          "qty": 9
        },
        {
          "item": "T4 Controller Focus Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_CONTROLLER_FOCUS_16",
          "qty": 9
        },
        {
          "item": "T4 Controller Health Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_CONTROLLER_HEALTH_16",
          "qty": 9
        },
        {
          "item": "T4 Controller Resist Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_CONTROLLER_RESIST_16",
          "qty": 9
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "ultraCores": 300,
      "description": "All the Crystals you need to go from T4 Level 1 to T4 Level 3"
    },
    {
      "name": "T4 Iso Boost: Protector",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "5d 4h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "T4 Protector Armor Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_PROTECTOR_ARMOR_16",
          "qty": 9
        },
        {
          "item": "T4 Protector Damage Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_PROTECTOR_DAMAGE_16",
          "qty": 9
        },
        {
          "item": "T4 Protector Focus Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_PROTECTOR_FOCUS_16",
          "qty": 9
        },
        {
          "item": "T4 Protector Health Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_PROTECTOR_HEALTH_16",
          "qty": 9
        },
        {
          "item": "T4 Protector Resist Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_PROTECTOR_RESIST_16",
          "qty": 9
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "ultraCores": 300,
      "description": "All the Crystals you need to go from T4 Level 1 to T4 Level 3"
    },
    {
      "name": "T4 Iso Boost: Support",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "5d 4h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "T4 Support Armor Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_SUPPORT_ARMOR_16",
          "qty": 9
        },
        {
          "item": "T4 Support Damage Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_SUPPORT_DAMAGE_16",
          "qty": 9
        },
        {
          "item": "T4 Support Focus Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_SUPPORT_FOCUS_16",
          "qty": 9
        },
        {
          "item": "T4 Support Health Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_SUPPORT_HEALTH_16",
          "qty": 9
        },
        {
          "item": "T4 Support Resist Level 1 Iso-8",
          "id": "ISOITEM_ORANGE_SUPPORT_RESIST_16",
          "qty": 9
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "ultraCores": 300,
      "description": "All the Crystals you need to go from T4 Level 1 to T4 Level 3"
    },
    {
      "name": "Awakened Protector of the Universe",
      "price": 49.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 21h",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Quasar's Ultimate Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_QUASAR_ULTIMATE",
          "qty": 200
        },
        {
          "item": "T4 Ability Material",
          "id": "ABILITY_MATERIAL_ORANGE_ABILITY_MAT",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 3500,
          "webBonus": true
        }
      ],
      "ultraCores": 350,
      "description": "Unlock Quasar's Ultimate Awakened Ability with this limited time offer and unleash his Quantum Constructs Battlefield Effect!"
    },
    {
      "name": "Awakened Living Bomb-Burst",
      "price": 49.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 21h",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Blastaar's Passive Awakened Ability Material",
          "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_BLASTAAR_PASSIVE",
          "qty": 200
        },
        {
          "item": "T4 Ability Material",
          "id": "ABILITY_MATERIAL_ORANGE_ABILITY_MAT",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 3500,
          "webBonus": true
        }
      ],
      "ultraCores": 350,
      "description": "Unlock Blastaar's Passive Awakened Ability with this limited time offer and unleash the full capabilities of his new status effect, Bomb-Burst!"
    },
    {
      "name": "Diamond Orb Mega Launch Special",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 10,
      "expires": "4h 14m",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Diamond Orb Fragments",
          "id": "GACHA_CRATE_DIAMOND_BASIC_TOKEN_de8786ff",
          "qty": 10000
        },
        {
          "item": "Elite 7 Credit",
          "id": "ELITE_7_CUR",
          "qty": 7500
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "ultraCores": 1000,
      "description": "Take your roster to the next level with this deal on multiple Diamonds Orbs and Elite 7 Credits!"
    },
    {
      "name": "Diamond Orb Launch Special",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 25,
      "expires": "4h 14m",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Diamond Orb Fragments",
          "id": "GACHA_CRATE_DIAMOND_BASIC_TOKEN_de8786ff",
          "qty": 2000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "ultraCores": 200,
      "description": "Harness the power of Diamonds! Earn 20 Silver Diamond Credits and a guaranteed Diamond Promotion with each orb!"
    },
    {
      "name": "Dark Promotion Sale - Diamond Tier",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "4h 14m",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Dark Promotion Credit",
          "id": "PROMOTION_CUR_ULT",
          "qty": 2750
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "ultraCores": 1000,
      "description": "Power up the likes of Doctor Doom and Morgan Le Fay when you use these Dark Promotion Credits to get the next Red Star for them! Save big on 2,750 Dark Promotion Credits. Achieve new Red Star Levels with this offer today!"
    },
    {
      "name": "XP Overload",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 10,
      "expires": "4h 14m",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Commander XP",
          "id": "XP",
          "qty": 21000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "ultraCores": 1000,
      "description": "Accelerate your way to new levels with this XP pack! Don't miss out on this opportunity to boost your progress!"
    },
    {
      "name": "XP Rush",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 10,
      "expires": "4h 14m",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Commander XP",
          "id": "XP",
          "qty": 10000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "ultraCores": 500,
      "description": "Experience the new levels faster with this XP pack! Prepare your roster for the challenges ahead."
    },
    {
      "name": "XP Dash",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 10,
      "expires": "4h 14m",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Commander XP",
          "id": "XP",
          "qty": 4000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "ultraCores": 200,
      "description": "Max level here you come! Get progress with this special XP pack!"
    },
    {
      "name": "Premium Plus Chapter Battle Pass Ticket Pack",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 2,
      "expires": "4h 14m",
      "section": "battle pass and s.t.r.i.k.e pass offers",
      "sections": [
        "battle pass and s.t.r.i.k.e pass offers"
      ],
      "contents": [
        {
          "item": "Premium Plus Battle Pass Ticket",
          "id": "BP_PREMIUM_PLUS_CUR",
          "qty": 1
        },
        {
          "item": "Shop Credits",
          "id": "LC",
          "qty": 500000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "ultraCores": 500,
      "description": "Get bonus Shop Credits when you purchase 1 Premium Plus Chapter Battle Pass Tickets with this Web Exclusive bundle! Tickets can be redeemed in-game to activate any single Premium Plus Chapter Battle Pass. Valid only for Chapter Battle Passes."
    },
    {
      "name": "(untitled)",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "6d 4h",
      "section": "Time Heist",
      "sections": [
        "Time Heist"
      ],
      "contents": [
        {
          "item": "TIMEHEIST_LEVEL_45",
          "id": "TIMEHEIST_LEVEL_45",
          "qty": 1
        },
        {
          "item": "Gold",
          "id": "SC",
          "qty": 3000000
        },
        {
          "item": "L3 Training Module",
          "id": "CONSUMABLE_XPLVL60",
          "qty": 600
        },
        {
          "item": "Silver Promotion Credit",
          "id": "PROMOTION_CUR",
          "qty": 500
        },
        {
          "item": "Elite 4 Credit",
          "id": "ELITE_4_CUR",
          "qty": 25000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "ultraCores": 250
    },
    {
      "name": "Strike Store Exclusive!",
      "price": 6000,
      "currency": "Strike Points",
      "purchaseLimit": 5,
      "expires": "4h 14m",
      "section": "STRIKE STORE",
      "sections": [
        "STRIKE STORE"
      ],
      "contents": [
        {
          "item": "Strike Store Exclusive",
          "id": "GACHA_ecf009d34acb586fb94f4bbf4ac26aea6548425d0875bbca13e6bdf3992df9e8",
          "qty": 1
        }
      ],
      "boughtBefore": true,
      "paidWith": "Strike Points",
      "description": "Open this Strike Store exclusive orb for a chance at 3-Diamond promotions for recent characters! Characters from Fantastic Four (MCU), Hellfire Club, and Insidious Six."
    },
    {
      "name": "Maximum Ability",
      "price": 5000,
      "currency": "Strike Points",
      "purchaseLimit": 100,
      "expires": "4h 14m",
      "section": "STRIKE STORE",
      "sections": [
        "STRIKE STORE"
      ],
      "contents": [
        {
          "item": "T4 Ability Material",
          "id": "ABILITY_MATERIAL_ORANGE_ABILITY_MAT",
          "qty": 50
        }
      ],
      "boughtBefore": true,
      "paidWith": "Strike Points",
      "description": "Get the edge on your opponents with T4 Ability Materials bundle!"
    },
    {
      "name": "Gold Standard",
      "price": 2500,
      "currency": "Strike Points",
      "purchaseLimit": 15,
      "expires": "25d 4h",
      "section": "STRIKE STORE",
      "sections": [
        "STRIKE STORE"
      ],
      "contents": [
        {
          "item": "Gold",
          "id": "SC",
          "qty": 2000000
        }
      ],
      "boughtBefore": true,
      "paidWith": "Strike Points",
      "description": "Boost your roster power with this Gold bundle!"
    },
    {
      "name": "Training Bootcamp",
      "price": 2500,
      "currency": "Strike Points",
      "purchaseLimit": 100,
      "expires": "4h 14m",
      "section": "STRIKE STORE",
      "sections": [
        "STRIKE STORE"
      ],
      "contents": [
        {
          "item": "L4 Training Module",
          "id": "CONSUMABLE_XPLVL80",
          "qty": 150
        }
      ],
      "boughtBefore": true,
      "paidWith": "Strike Points",
      "description": "Level up your top characters with this Training Module bundle!"
    },
    {
      "name": "Augmented Energy",
      "price": 1000,
      "currency": "Strike Points",
      "purchaseLimit": 100,
      "expires": "4h 14m",
      "section": "STRIKE STORE",
      "sections": [
        "STRIKE STORE"
      ],
      "contents": [
        {
          "item": "Armory 17 Orb Fragments",
          "id": "GACHA_CRATE_GT17_C1_C8_TOKEN_138df228",
          "qty": 340000
        },
        {
          "item": "Teal Catalyst Pack",
          "id": "GACHA_66bd727a4ce31aeff7360e11b606eced807c843e6f312ba340fb0c25f87eec78",
          "qty": 3
        },
        {
          "item": "Campaign Energy",
          "id": "CAMPAIGN_PLAYER_ENERGY",
          "qty": 130
        }
      ],
      "boughtBefore": true,
      "paidWith": "Strike Points",
      "description": "Conquer enemies and Campaigns with Armory Orbs and Campaign Energy!"
    },
    {
      "name": "Gold Standard",
      "price": 500,
      "currency": "Strike Points",
      "purchaseLimit": 30,
      "expires": "25d 4h",
      "section": "STRIKE STORE",
      "sections": [
        "STRIKE STORE"
      ],
      "contents": [
        {
          "item": "Gold",
          "id": "SC",
          "qty": 250000
        }
      ],
      "boughtBefore": true,
      "paidWith": "Strike Points",
      "description": "Boost your roster power with this Gold bundle!"
    },
    {
      "name": "Training Bootcamp",
      "price": 500,
      "currency": "Strike Points",
      "purchaseLimit": 100,
      "expires": "4h 14m",
      "section": "STRIKE STORE",
      "sections": [
        "STRIKE STORE"
      ],
      "contents": [
        {
          "item": "L4 Training Module",
          "id": "CONSUMABLE_XPLVL80",
          "qty": 20
        }
      ],
      "paidWith": "Strike Points",
      "description": "Level up your top characters with this Training Module bundle!"
    },
    {
      "name": "Power Cores",
      "price": 2.99,
      "currency": "CAD",
      "purchaseLimit": null,
      "expires": null,
      "section": "Power Cores",
      "sections": [
        "Power Cores"
      ],
      "contents": [
        {
          "item": "Power Cores",
          "id": "HC",
          "qty": 150
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 200,
          "webBonus": true
        }
      ],
      "ultraCores": 20
    },
    {
      "name": "Cluster of Power Cores",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": null,
      "expires": null,
      "section": "Power Cores",
      "sections": [
        "Power Cores"
      ],
      "contents": [
        {
          "item": "Power Cores",
          "id": "HC",
          "qty": 375
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 500,
          "webBonus": true
        }
      ],
      "ultraCores": 50
    },
    {
      "name": "Bundle of Power Cores",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": null,
      "expires": null,
      "section": "Power Cores",
      "sections": [
        "Power Cores"
      ],
      "contents": [
        {
          "item": "Power Cores",
          "id": "HC",
          "qty": 750
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "ultraCores": 100
    },
    {
      "name": "Case of Power Cores",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": null,
      "expires": null,
      "section": "Power Cores",
      "sections": [
        "Power Cores"
      ],
      "contents": [
        {
          "item": "Power Cores",
          "id": "HC",
          "qty": 1580
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "ultraCores": 200
    },
    {
      "name": "Crate of Power Cores",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": null,
      "expires": null,
      "section": "Power Cores",
      "sections": [
        "Power Cores"
      ],
      "contents": [
        {
          "item": "Power Cores",
          "id": "HC",
          "qty": 4130
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "ultraCores": 500
    },
    {
      "name": "Shipment of Power Cores",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": null,
      "expires": null,
      "section": "Power Cores",
      "sections": [
        "Power Cores"
      ],
      "contents": [
        {
          "item": "Power Cores",
          "id": "HC",
          "qty": 8630
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "ultraCores": 1000
    },
    {
      "name": "Ultra Cores",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": null,
      "expires": null,
      "section": "Ultra Cores",
      "sections": [
        "Ultra Cores"
      ],
      "contents": [
        {
          "item": "Ultra Cores",
          "id": "UC",
          "qty": 100
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 1000,
          "webBonus": true
        }
      ]
    },
    {
      "name": "Cluster of Ultra Cores",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": null,
      "expires": null,
      "section": "Ultra Cores",
      "sections": [
        "Ultra Cores"
      ],
      "contents": [
        {
          "item": "Ultra Cores",
          "id": "UC",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 2000,
          "webBonus": true
        }
      ]
    },
    {
      "name": "Bundle of Ultra Cores",
      "price": 49.99,
      "currency": "CAD",
      "purchaseLimit": null,
      "expires": null,
      "section": "Ultra Cores",
      "sections": [
        "Ultra Cores"
      ],
      "contents": [
        {
          "item": "Ultra Cores",
          "id": "UC",
          "qty": 350
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 3500,
          "webBonus": true
        }
      ]
    },
    {
      "name": "Case of Ultra Cores",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": null,
      "expires": null,
      "section": "Ultra Cores",
      "sections": [
        "Ultra Cores"
      ],
      "contents": [
        {
          "item": "Ultra Cores",
          "id": "UC",
          "qty": 500
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 5000,
          "webBonus": true
        }
      ]
    },
    {
      "name": "Crate of Ultra Cores",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": null,
      "expires": null,
      "section": "Ultra Cores",
      "sections": [
        "Ultra Cores"
      ],
      "contents": [
        {
          "item": "Ultra Cores",
          "id": "UC",
          "qty": 1000
        },
        {
          "item": "Strike Points",
          "id": "BFYB-CUR",
          "qty": 10000,
          "webBonus": true
        }
      ]
    }
  ]
};
