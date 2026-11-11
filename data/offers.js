/*
 * Offers currently live in the player's store.
 *
 * Written by a desktop Claude session that reads the logged-in web store through Chrome
 * (see .claude/skills/msf-store-pull/SKILL.md). The page loads this file on open; the
 * "My store" tab can also take the same JSON pasted in.
 *
 * Schema:
 *   {
 *     updated: "2026-10-18T19:00:00Z",   // when the store was read
 *     source: "web-store" | "in-game",
 *     offers: [
 *       {
 *         id: "optional stable id",
 *         name: "Offer title as shown",
 *         price: 9.99,
 *         currency: "USD",
 *         purchaseLimit: 1,              // null when unlimited
 *         expires: "2026-10-20T00:00:00Z", // null when not shown
 *         section: "Daily Deals",        // store section it appeared in, if any
 *         contents: [
 *           { item: "Gold", qty: 500000 },
 *           { item: "Iron Man shards", qty: 50 },
 *           { key: "orb:premium", qty: 3 }   // `key` targets a value-table key directly
 *         ]
 *       }
 *     ]
 *   }
 */
window.MSF_OFFERS = {
  "updated": "2026-11-06T01:15:22.312Z",
  "source": "web-store",
  "bookmarklet": "2026-10-24",
  "account": "CZARFACE level 107",
  "priceCurrency": "CAD",
  "note": "Read from the logged-in web store with the MSF Store Value bookmarklet. Cards that show \"+N More\" hide part of their contents; those offers carry a notes field and grade as incomplete.",
  "offers": [
    {
      "name": "Ability Ultimate Stash",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 2,
      "expires": "2d 19h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "T4 Ability Material",
          "qty": 850
        },
        {
          "item": "T4 Ability Material",
          "qty": 85,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Train hard, fight harder. Boost your team now!"
    },
    {
      "name": "Supreme Snipe",
      "price": 549.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 19h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / NEW CHARACTERS"
      ],
      "contents": [
        {
          "item": "Hawkeye (Robot)",
          "qty": 810
        },
        {
          "item": "Hawkeye (Robot)",
          "qty": 1
        },
        {
          "item": "Hawkeye (Robot)",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 40000,
          "webBonus": true
        }
      ],
      "description": "Unlock Hawkeye (Robot)'s full potential with 2 Diamonds and dominate Cosmic Crucible!"
    },
    {
      "name": "Black Friday Sneak Peak",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "6d 19h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Black Friday Sneak Peaks Orb Fragments",
          "qty": 2000
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Get a sneak peek at Black Friday! Open the special Orb for a chance to earn up to 5-Diamond promotions for select powerhouse characters!"
    },
    {
      "name": "Cyber Breach: Ultimate Pack",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 50,
      "expires": "9d 19h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 1500000
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 75000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Get ahead in the Cyber Breach Leaderboard to secure 3-Diamond for Whiplash, Ulysses Klaue, Iron Monger!"
    },
    {
      "name": "Cyber Breach: Jocasta 2-Diamond",
      "price": 549.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "9d 19h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 4000000
        },
        {
          "item": "Jocasta",
          "qty": 810
        },
        {
          "item": "Jocasta",
          "qty": 1
        },
        {
          "item": "Jocasta",
          "qty": 1
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 200000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 40000,
          "webBonus": true
        }
      ],
      "description": "Instantly power up Jocasta to 2-Diamond and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Hawkeye (Robot) 2-Diamond",
      "price": 549.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "9d 19h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 4000000
        },
        {
          "item": "Hawkeye (Robot)",
          "qty": 810
        },
        {
          "item": "Hawkeye (Robot)",
          "qty": 1
        },
        {
          "item": "Hawkeye (Robot)",
          "qty": 1
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 200000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 40000,
          "webBonus": true
        }
      ],
      "description": "Instantly power up Hawkeye (Robot) to 2-Diamond and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Human Torch (Jim) 2-Diamond",
      "price": 549.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "9d 19h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 4000000
        },
        {
          "item": "Human Torch (Jim)",
          "qty": 810
        },
        {
          "item": "Human Torch (Jim)",
          "qty": 1
        },
        {
          "item": "Human Torch (Jim)",
          "qty": 1
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 200000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 40000,
          "webBonus": true
        }
      ],
      "description": "Instantly power up Human Torch (Jim) to 2-Diamond and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Whiplash 2-Diamond",
      "price": 549.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "9d 19h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 4000000
        },
        {
          "item": "Whiplash",
          "qty": 810
        },
        {
          "item": "Whiplash",
          "qty": 1
        },
        {
          "item": "Whiplash",
          "qty": 1
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 200000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 40000,
          "webBonus": true
        }
      ],
      "description": "Instantly power up Whiplash to 2-Diamond and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Ulysses Klaue 2-Diamond",
      "price": 549.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "9d 19h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 4000000
        },
        {
          "item": "Ulysses Klaue",
          "qty": 810
        },
        {
          "item": "Ulysses Klaue",
          "qty": 1
        },
        {
          "item": "Ulysses Klaue",
          "qty": 1
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 200000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 40000,
          "webBonus": true
        }
      ],
      "description": "Instantly power up Ulysses Klaue to 2-Diamond and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Iron Monger 2-Diamond",
      "price": 549.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "9d 19h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 4000000
        },
        {
          "item": "Iron Monger",
          "qty": 810
        },
        {
          "item": "Iron Monger",
          "qty": 1
        },
        {
          "item": "Iron Monger",
          "qty": 1
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 200000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 40000,
          "webBonus": true
        }
      ],
      "description": "Instantly power up Iron Monger to 2-Diamond and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: A.I. Avengers Mega Orb",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "9d 19h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 800000
        },
        {
          "item": "A.I. Avengers Mega Orb Fragment",
          "qty": 2000
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 40000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Open this Orb for a chance to get 400 Shards for A.I. Avengers, plus a bunch of points toward the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Iron Raiders Mega Orb",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "9d 19h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 800000
        },
        {
          "item": "Iron Raiders Mega Orb Fragment",
          "qty": 2000
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 40000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Open this Orb for a chance to get 500 Shards for Iron Raiders, plus a bunch of points toward the Cyber Breach Milestone!"
    },
    {
      "name": "Raid Warzone: Mega Pack",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "19h 44m",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Raid Warzone Milestone Points",
          "qty": 120000
        },
        {
          "item": "Gold Orb Fragments",
          "qty": 20000
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Get ahead in Raid Warzone Milestone and propel your Alliance to Gold Orb Fragments!"
    },
    {
      "name": "Unlock Special: Training Drill",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "1d 15h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "L4 Training Module",
          "qty": 2200
        },
        {
          "item": "Strike Points",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "description": "Pick up this special Training Module offer to level up your new character!"
    },
    {
      "name": "Unlock Special: Awesome Ability",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 2,
      "expires": "1d 15h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "T4 Ability Material",
          "qty": 500
        },
        {
          "item": "T3 Ability Material",
          "qty": 1000
        },
        {
          "item": "T2 Ability Material",
          "qty": 300
        },
        {
          "item": "T1 Ability Material",
          "qty": 100
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "description": "Grab this bundle to get the abilites of your new roster member up to speed!"
    },
    {
      "name": "Unlock Special: Crimson Gear",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 2,
      "expires": "1d 15h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Crimson Uru",
          "qty": 9
        },
        {
          "item": "Crimson Shoggoth Ichor",
          "qty": 18
        },
        {
          "item": "Crimson Celestial Lattice",
          "qty": 18
        },
        {
          "item": "Augmented Shoggoth Ichor",
          "qty": 350
        },
        {
          "item": "Augmented Celestial Lattice",
          "qty": 350
        },
        {
          "item": "Strike Points",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "description": "Pick up the Crimson Unique and Mini-Unique gear for your new character to help them jump right into the greatest challenges."
    },
    {
      "name": "Unlock Special: Crimson Gear",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 2,
      "expires": "1d 15h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Crimson Arcane Powder",
          "qty": 250
        },
        {
          "item": "Crimson Esoteric Glyphs",
          "qty": 225
        },
        {
          "item": "Crimson Vial",
          "qty": 200
        },
        {
          "item": "Armory 19 Orb Fragments",
          "qty": 8000
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Grab the Crimson gear needed to power up the latest character added to your roster."
    },
    {
      "name": "Unlock Special: Crimson Catalysts",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 2,
      "expires": "1d 15h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Crimson Basic Catalyst Part",
          "qty": 500
        },
        {
          "item": "Crimson Damage Catalyst Part",
          "qty": 200
        },
        {
          "item": "Crimson Focus Catalyst Part",
          "qty": 200
        },
        {
          "item": "Crimson Health Catalyst Part",
          "qty": 200
        },
        {
          "item": "Crimson Resistance Catalyst Part",
          "qty": 200
        }
      ],
      "description": "Use these Catalysts to craft your way to Crimson gear greatness for your new roster member.",
      "notes": "2 more item(s) not shown on the card"
    },
    {
      "name": "Unlock Special: Uniquely Teal",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 4,
      "expires": "1d 15h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Augmented Uru",
          "qty": 65
        },
        {
          "item": "Augmented Sigil",
          "qty": 350
        },
        {
          "item": "Augmented Mythic Geode",
          "qty": 350
        },
        {
          "item": "Augmented Shoggoth Ichor",
          "qty": 350
        },
        {
          "item": "Augmented Celestial Lattice",
          "qty": 350
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Pick up the Unique and Mini-Unique gear for your new character to help them jump right into the greatest challenges."
    },
    {
      "name": "Unlock Special: Teal Gear",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 4,
      "expires": "1d 15h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Augmented Arcane Powder",
          "qty": 4500
        },
        {
          "item": "Augmented Esoteric Glyphs",
          "qty": 4500
        },
        {
          "item": "Augmented Vial",
          "qty": 4500
        },
        {
          "item": "Strike Points",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "description": "Grab the Teal gear needed to power up the latest character added to your roster."
    },
    {
      "name": "Unlock Special: Teal Catalysts",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 4,
      "expires": "1d 15h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Augmented Basic Catalyst Part",
          "qty": 900
        },
        {
          "item": "Augmented Damage Catalyst Part",
          "qty": 900
        },
        {
          "item": "Augmented Focus Catalyst Part",
          "qty": 900
        },
        {
          "item": "Augmented Health Catalyst Part",
          "qty": 900
        },
        {
          "item": "Augmented Resistance Catalyst Part",
          "qty": 900
        }
      ],
      "description": "Use these Catalysts to craft your way to Teal gear greatness for your new roster member.",
      "notes": "2 more item(s) not shown on the card"
    },
    {
      "name": "Unlock Special: Gear Tier 15",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 15h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Superior Arcane Powder",
          "qty": 600
        },
        {
          "item": "Superior Esoteric Glyphs",
          "qty": 300
        },
        {
          "item": "Superior Vial",
          "qty": 225
        },
        {
          "item": "Superior Sigil",
          "qty": 40
        },
        {
          "item": "Superior Shoggoth Ichor",
          "qty": 90
        }
      ],
      "description": "Bring your newest character to Gear Tier 15 with this massive bundle that has so much gear, you'll have to tap to see all thats included!",
      "notes": "40 more item(s) not shown on the card"
    },
    {
      "name": "Unlock Special: Diamond Authority",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "1d 15h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Diamond Orb Fragments",
          "qty": 2000
        },
        {
          "item": "Elite 7 Credit",
          "qty": 2500
        },
        {
          "item": "Elite 6 Credit",
          "qty": 5000
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "More Diamonds means MORE POWER! Power up with this Diamond Bundle!"
    },
    {
      "name": "Unlock Special: Red Star Rush",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": 2,
      "expires": "2d 15h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Elite 7 Credit",
          "qty": 12500
        },
        {
          "item": "Elite 6 Credit",
          "qty": 20000
        },
        {
          "item": "Elite 5 Credit",
          "qty": 25000
        },
        {
          "item": "Elite 4 Credit",
          "qty": 30000
        },
        {
          "item": "Strike Points",
          "qty": 1500,
          "webBonus": true
        }
      ],
      "description": "Take advantage of the limited-time increased chance for Red Star promotions for your newest character with this bundle!"
    },
    {
      "name": "Premium Plus Chapter Battle Pass Ticket Pack",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 2,
      "expires": "19h 44m",
      "section": "battle pass and s.t.r.i.k.e pass offers",
      "sections": [
        "battle pass and s.t.r.i.k.e pass offers"
      ],
      "contents": [
        {
          "item": "Premium Plus Battle Pass Ticket",
          "qty": 1
        },
        {
          "item": "Shop Credits",
          "qty": 500000
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "description": "Get bonus Shop Credits when you purchase 1 Premium Plus Chapter Battle Pass Tickets with this Web Exclusive bundle! Tickets can be redeemed in-game to activate any single Premium Plus Chapter Battle Pass. Valid only for Chapter Battle Passes."
    },
    {
      "name": "Range Finder (step 1 of 6)",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Hawkeye (Robot)",
          "qty": 45
        },
        {
          "item": "Hawkeye (Robot)",
          "qty": 1
        },
        {
          "item": "Mega Gold Orb Fragments",
          "qty": 2000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Range Finder",
        "step": 1,
        "of": 6,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Range Finder",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 45
              },
              {
                "item": "Hawkeye (Robot)",
                "qty": 1
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 3000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Range Finder",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 55
              },
              {
                "item": "Hawkeye (Robot)",
                "qty": 1
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 3000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Range Finder",
            "price": 49.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 80
              },
              {
                "item": "Hawkeye (Robot)",
                "qty": 1
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 4000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Range Finder",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 130
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 5000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 5,
            "name": "Range Finder",
            "price": 79.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 200
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 6000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 6,
            "name": "Range Finder",
            "price": 129.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 300
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 10000,
                "webBonus": true
              }
            ]
          }
        ]
      },
      "description": "A special launch offer has appeared for you! Recruit Hawkeye (Robot) today!"
    },
    {
      "name": "Range Finder (step 2 of 6)",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Hawkeye (Robot)",
          "qty": 55
        },
        {
          "item": "Hawkeye (Robot)",
          "qty": 1
        },
        {
          "item": "Mega Gold Orb Fragments",
          "qty": 2000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Range Finder",
        "step": 2,
        "of": 6,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Range Finder",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 45
              },
              {
                "item": "Hawkeye (Robot)",
                "qty": 1
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 3000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Range Finder",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 55
              },
              {
                "item": "Hawkeye (Robot)",
                "qty": 1
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 3000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Range Finder",
            "price": 49.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 80
              },
              {
                "item": "Hawkeye (Robot)",
                "qty": 1
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 4000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Range Finder",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 130
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 5000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 5,
            "name": "Range Finder",
            "price": 79.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 200
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 6000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 6,
            "name": "Range Finder",
            "price": 129.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 300
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 10000,
                "webBonus": true
              }
            ]
          }
        ]
      }
    },
    {
      "name": "Range Finder (step 3 of 6)",
      "price": 49.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Hawkeye (Robot)",
          "qty": 80
        },
        {
          "item": "Hawkeye (Robot)",
          "qty": 1
        },
        {
          "item": "Mega Gold Orb Fragments",
          "qty": 2000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 4000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Range Finder",
        "step": 3,
        "of": 6,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Range Finder",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 45
              },
              {
                "item": "Hawkeye (Robot)",
                "qty": 1
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 3000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Range Finder",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 55
              },
              {
                "item": "Hawkeye (Robot)",
                "qty": 1
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 3000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Range Finder",
            "price": 49.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 80
              },
              {
                "item": "Hawkeye (Robot)",
                "qty": 1
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 4000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Range Finder",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 130
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 5000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 5,
            "name": "Range Finder",
            "price": 79.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 200
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 6000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 6,
            "name": "Range Finder",
            "price": 129.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 300
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 10000,
                "webBonus": true
              }
            ]
          }
        ]
      }
    },
    {
      "name": "Range Finder (step 4 of 6)",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Hawkeye (Robot)",
          "qty": 130
        },
        {
          "item": "Mega Gold Orb Fragments",
          "qty": 2000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Range Finder",
        "step": 4,
        "of": 6,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Range Finder",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 45
              },
              {
                "item": "Hawkeye (Robot)",
                "qty": 1
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 3000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Range Finder",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 55
              },
              {
                "item": "Hawkeye (Robot)",
                "qty": 1
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 3000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Range Finder",
            "price": 49.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 80
              },
              {
                "item": "Hawkeye (Robot)",
                "qty": 1
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 4000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Range Finder",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 130
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 5000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 5,
            "name": "Range Finder",
            "price": 79.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 200
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 6000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 6,
            "name": "Range Finder",
            "price": 129.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 300
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 10000,
                "webBonus": true
              }
            ]
          }
        ]
      }
    },
    {
      "name": "Range Finder (step 5 of 6)",
      "price": 79.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Hawkeye (Robot)",
          "qty": 200
        },
        {
          "item": "Mega Gold Orb Fragments",
          "qty": 2000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 6000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Range Finder",
        "step": 5,
        "of": 6,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Range Finder",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 45
              },
              {
                "item": "Hawkeye (Robot)",
                "qty": 1
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 3000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Range Finder",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 55
              },
              {
                "item": "Hawkeye (Robot)",
                "qty": 1
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 3000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Range Finder",
            "price": 49.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 80
              },
              {
                "item": "Hawkeye (Robot)",
                "qty": 1
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 4000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Range Finder",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 130
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 5000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 5,
            "name": "Range Finder",
            "price": 79.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 200
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 6000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 6,
            "name": "Range Finder",
            "price": 129.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 300
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 10000,
                "webBonus": true
              }
            ]
          }
        ]
      }
    },
    {
      "name": "Range Finder (step 6 of 6)",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Hawkeye (Robot)",
          "qty": 300
        },
        {
          "item": "Mega Gold Orb Fragments",
          "qty": 2000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Range Finder",
        "step": 6,
        "of": 6,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Range Finder",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 45
              },
              {
                "item": "Hawkeye (Robot)",
                "qty": 1
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 3000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Range Finder",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 55
              },
              {
                "item": "Hawkeye (Robot)",
                "qty": 1
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 3000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Range Finder",
            "price": 49.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 80
              },
              {
                "item": "Hawkeye (Robot)",
                "qty": 1
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 4000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Range Finder",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 130
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 5000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 5,
            "name": "Range Finder",
            "price": 79.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 200
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 6000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 6,
            "name": "Range Finder",
            "price": 129.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Hawkeye (Robot)",
                "qty": 300
              },
              {
                "item": "Mega Gold Orb Fragments",
                "qty": 2000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 10000,
                "webBonus": true
              }
            ]
          }
        ]
      }
    },
    {
      "name": "Son of the Tiger (step 1 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "11d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar",
          "qty": 60
        },
        {
          "item": "Shop Credits",
          "qty": 50000
        },
        {
          "item": "Gold",
          "qty": 1500000
        },
        {
          "item": "Strike Points",
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
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 50000
              },
              {
                "item": "Gold",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 40000
              },
              {
                "item": "Gold",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          }
        ]
      },
      "description": "A special launch offer has appeared for you! Recruit Ka-Zar today!"
    },
    {
      "name": "Son of the Tiger (step 2 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "11d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar",
          "qty": 60
        },
        {
          "item": "Shop Credits",
          "qty": 40000
        },
        {
          "item": "Gold",
          "qty": 2000000
        },
        {
          "item": "Strike Points",
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
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 50000
              },
              {
                "item": "Gold",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 40000
              },
              {
                "item": "Gold",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          }
        ]
      }
    },
    {
      "name": "Son of the Tiger (step 3 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "11d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar",
          "qty": 60
        },
        {
          "item": "Shop Credits",
          "qty": 30000
        },
        {
          "item": "Gold",
          "qty": 3000000
        },
        {
          "item": "Strike Points",
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
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 50000
              },
              {
                "item": "Gold",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 40000
              },
              {
                "item": "Gold",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          }
        ]
      }
    },
    {
      "name": "Son of the Tiger (step 4 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "11d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar",
          "qty": 60
        },
        {
          "item": "Ka-Zar",
          "qty": 1
        },
        {
          "item": "Shop Credits",
          "qty": 30000
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
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 50000
              },
              {
                "item": "Gold",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 40000
              },
              {
                "item": "Gold",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          }
        ]
      },
      "notes": "2 more item(s) not shown on the card"
    },
    {
      "name": "Son of the Tiger (step 5 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "11d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar",
          "qty": 70
        },
        {
          "item": "Shop Credits",
          "qty": 30000
        },
        {
          "item": "L4 Training Module",
          "qty": 250
        },
        {
          "item": "Strike Points",
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
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 50000
              },
              {
                "item": "Gold",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 40000
              },
              {
                "item": "Gold",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          }
        ]
      }
    },
    {
      "name": "Son of the Tiger (step 6 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "11d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar",
          "qty": 60
        },
        {
          "item": "Ka-Zar",
          "qty": 1
        },
        {
          "item": "Shop Credits",
          "qty": 30000
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
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 50000
              },
              {
                "item": "Gold",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 40000
              },
              {
                "item": "Gold",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          }
        ]
      },
      "notes": "2 more item(s) not shown on the card"
    },
    {
      "name": "Son of the Tiger (step 7 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "11d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar",
          "qty": 60
        },
        {
          "item": "Shop Credits",
          "qty": 30000
        },
        {
          "item": "Gold",
          "qty": 4000000
        },
        {
          "item": "Strike Points",
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
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 50000
              },
              {
                "item": "Gold",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 40000
              },
              {
                "item": "Gold",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          }
        ]
      }
    },
    {
      "name": "Son of the Tiger (step 8 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "11d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar",
          "qty": 60
        },
        {
          "item": "Shop Credits",
          "qty": 30000
        },
        {
          "item": "Gold",
          "qty": 5000000
        },
        {
          "item": "Strike Points",
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
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 50000
              },
              {
                "item": "Gold",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 40000
              },
              {
                "item": "Gold",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          }
        ]
      }
    },
    {
      "name": "Son of the Tiger (step 9 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "11d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar",
          "qty": 60
        },
        {
          "item": "Shop Credits",
          "qty": 30000
        },
        {
          "item": "Gold",
          "qty": 6000000
        },
        {
          "item": "Strike Points",
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
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 50000
              },
              {
                "item": "Gold",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 40000
              },
              {
                "item": "Gold",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          }
        ]
      }
    },
    {
      "name": "Son of the Tiger (step 10 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "11d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar",
          "qty": 60
        },
        {
          "item": "Ka-Zar",
          "qty": 1
        },
        {
          "item": "Shop Credits",
          "qty": 30000
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
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 50000
              },
              {
                "item": "Gold",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 40000
              },
              {
                "item": "Gold",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          }
        ]
      },
      "notes": "2 more item(s) not shown on the card"
    },
    {
      "name": "Son of the Tiger (step 11 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "11d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar",
          "qty": 60
        },
        {
          "item": "Shop Credits",
          "qty": 30000
        },
        {
          "item": "L4 Training Module",
          "qty": 400
        },
        {
          "item": "Strike Points",
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
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 50000
              },
              {
                "item": "Gold",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 40000
              },
              {
                "item": "Gold",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          }
        ]
      }
    },
    {
      "name": "Son of the Tiger (step 12 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "11d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar",
          "qty": 60
        },
        {
          "item": "Shop Credits",
          "qty": 30000
        },
        {
          "item": "L4 Training Module",
          "qty": 450
        },
        {
          "item": "Strike Points",
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
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 50000
              },
              {
                "item": "Gold",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 40000
              },
              {
                "item": "Gold",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          }
        ]
      }
    },
    {
      "name": "Son of the Tiger (step 13 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "11d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar",
          "qty": 80
        },
        {
          "item": "Shop Credits",
          "qty": 30000
        },
        {
          "item": "L4 Training Module",
          "qty": 500
        },
        {
          "item": "Strike Points",
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
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 50000
              },
              {
                "item": "Gold",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 40000
              },
              {
                "item": "Gold",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          }
        ]
      }
    },
    {
      "name": "Son of the Tiger (step 14 of 14)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "11d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Ka-Zar",
          "qty": 1
        },
        {
          "item": "Ka-Zar",
          "qty": 1
        },
        {
          "item": "Shop Credits",
          "qty": 30000
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
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 50000
              },
              {
                "item": "Gold",
                "qty": 1500000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 40000
              },
              {
                "item": "Gold",
                "qty": 2000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 3000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 5,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 70
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 250
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 6,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 7,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 4000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 8,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 9,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "Gold",
                "qty": 6000000
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 10,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 11,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 400
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 12,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 60
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 450
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 13,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 80
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              },
              {
                "item": "L4 Training Module",
                "qty": 500
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 14,
            "name": "Son of the Tiger",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Ka-Zar",
                "qty": 1
              },
              {
                "item": "Shop Credits",
                "qty": 30000
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          }
        ]
      },
      "notes": "2 more item(s) not shown on the card"
    },
    {
      "name": "Magnetic Dominion (step 1 of 5)",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Magneto (Phoenix Force)",
          "qty": 80
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Magnetic Dominion",
        "step": 1,
        "of": 5,
        "current": 2,
        "steps": [
          {
            "step": 1,
            "name": "Magnetic Dominion",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Magneto (Phoenix Force)",
                "qty": 80
              },
              {
                "item": "Strike Points",
                "qty": 1000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Magnetic Dominion",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Magneto (Phoenix Force)",
                "qty": 80
              },
              {
                "item": "Strike Points",
                "qty": 1000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Magnetic Dominion",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Magneto (Phoenix Force)",
                "qty": 130
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Magnetic Dominion",
            "price": 34.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Magneto (Phoenix Force)",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "qty": 2500,
                "webBonus": true
              }
            ]
          },
          {
            "step": 5,
            "name": "Magnetic Dominion",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Magneto (Phoenix Force)",
                "qty": 300
              },
              {
                "item": "Strike Points",
                "qty": 3000,
                "webBonus": true
              }
            ]
          }
        ]
      }
    },
    {
      "name": "Magnetic Dominion (step 2 of 5)",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Magneto (Phoenix Force)",
          "qty": 80
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Magnetic Dominion",
        "step": 2,
        "of": 5,
        "current": 2,
        "steps": [
          {
            "step": 1,
            "name": "Magnetic Dominion",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Magneto (Phoenix Force)",
                "qty": 80
              },
              {
                "item": "Strike Points",
                "qty": 1000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Magnetic Dominion",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Magneto (Phoenix Force)",
                "qty": 80
              },
              {
                "item": "Strike Points",
                "qty": 1000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Magnetic Dominion",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Magneto (Phoenix Force)",
                "qty": 130
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Magnetic Dominion",
            "price": 34.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Magneto (Phoenix Force)",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "qty": 2500,
                "webBonus": true
              }
            ]
          },
          {
            "step": 5,
            "name": "Magnetic Dominion",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Magneto (Phoenix Force)",
                "qty": 300
              },
              {
                "item": "Strike Points",
                "qty": 3000,
                "webBonus": true
              }
            ]
          }
        ]
      },
      "description": "Harness the power of the Phoenix Force and prepare Magneto (Phoenix Force) for battle!"
    },
    {
      "name": "Magnetic Dominion (step 3 of 5)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Magneto (Phoenix Force)",
          "qty": 130
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Magnetic Dominion",
        "step": 3,
        "of": 5,
        "current": 2,
        "steps": [
          {
            "step": 1,
            "name": "Magnetic Dominion",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Magneto (Phoenix Force)",
                "qty": 80
              },
              {
                "item": "Strike Points",
                "qty": 1000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Magnetic Dominion",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Magneto (Phoenix Force)",
                "qty": 80
              },
              {
                "item": "Strike Points",
                "qty": 1000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Magnetic Dominion",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Magneto (Phoenix Force)",
                "qty": 130
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Magnetic Dominion",
            "price": 34.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Magneto (Phoenix Force)",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "qty": 2500,
                "webBonus": true
              }
            ]
          },
          {
            "step": 5,
            "name": "Magnetic Dominion",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Magneto (Phoenix Force)",
                "qty": 300
              },
              {
                "item": "Strike Points",
                "qty": 3000,
                "webBonus": true
              }
            ]
          }
        ]
      }
    },
    {
      "name": "Magnetic Dominion (step 4 of 5)",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Magneto (Phoenix Force)",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Magnetic Dominion",
        "step": 4,
        "of": 5,
        "current": 2,
        "steps": [
          {
            "step": 1,
            "name": "Magnetic Dominion",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Magneto (Phoenix Force)",
                "qty": 80
              },
              {
                "item": "Strike Points",
                "qty": 1000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Magnetic Dominion",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Magneto (Phoenix Force)",
                "qty": 80
              },
              {
                "item": "Strike Points",
                "qty": 1000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Magnetic Dominion",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Magneto (Phoenix Force)",
                "qty": 130
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Magnetic Dominion",
            "price": 34.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Magneto (Phoenix Force)",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "qty": 2500,
                "webBonus": true
              }
            ]
          },
          {
            "step": 5,
            "name": "Magnetic Dominion",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Magneto (Phoenix Force)",
                "qty": 300
              },
              {
                "item": "Strike Points",
                "qty": 3000,
                "webBonus": true
              }
            ]
          }
        ]
      }
    },
    {
      "name": "Magnetic Dominion (step 5 of 5)",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Magneto (Phoenix Force)",
          "qty": 300
        },
        {
          "item": "Strike Points",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Magnetic Dominion",
        "step": 5,
        "of": 5,
        "current": 2,
        "steps": [
          {
            "step": 1,
            "name": "Magnetic Dominion",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Magneto (Phoenix Force)",
                "qty": 80
              },
              {
                "item": "Strike Points",
                "qty": 1000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Magnetic Dominion",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Magneto (Phoenix Force)",
                "qty": 80
              },
              {
                "item": "Strike Points",
                "qty": 1000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Magnetic Dominion",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Magneto (Phoenix Force)",
                "qty": 130
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Magnetic Dominion",
            "price": 34.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Magneto (Phoenix Force)",
                "qty": 200
              },
              {
                "item": "Strike Points",
                "qty": 2500,
                "webBonus": true
              }
            ]
          },
          {
            "step": 5,
            "name": "Magnetic Dominion",
            "price": 39.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Magneto (Phoenix Force)",
                "qty": 300
              },
              {
                "item": "Strike Points",
                "qty": 3000,
                "webBonus": true
              }
            ]
          }
        ]
      }
    },
    {
      "name": "Cyber Breach: Cores Pack (step 1 of 5)",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "9d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 15000
        },
        {
          "item": "Power Cores",
          "qty": 500
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 750,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Cyber Breach: Cores Pack",
        "step": 1,
        "of": 5,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Cyber Breach: Cores Pack",
            "price": 6.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 15000
              },
              {
                "item": "Power Cores",
                "qty": 500
              },
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 750,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 500,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Cyber Breach: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 30000
              },
              {
                "item": "Power Cores",
                "qty": 1000
              },
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 1500,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 1000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Cyber Breach: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 30000
              },
              {
                "item": "Power Cores",
                "qty": 1100
              },
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 1500,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 1000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Cyber Breach: Cores Pack",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 75000
              },
              {
                "item": "Power Cores",
                "qty": 2300
              },
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 3750,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 5,
            "name": "Cyber Breach: Cores Pack",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 200000
              },
              {
                "item": "Power Cores",
                "qty": 6000
              },
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 10000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 5000,
                "webBonus": true
              }
            ]
          }
        ]
      },
      "description": "Grab more Power Cores to fuel your upgrades and make progress toward the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Cores Pack (step 2 of 5)",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "9d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 30000
        },
        {
          "item": "Power Cores",
          "qty": 1000
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 1500,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Cyber Breach: Cores Pack",
        "step": 2,
        "of": 5,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Cyber Breach: Cores Pack",
            "price": 6.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 15000
              },
              {
                "item": "Power Cores",
                "qty": 500
              },
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 750,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 500,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Cyber Breach: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 30000
              },
              {
                "item": "Power Cores",
                "qty": 1000
              },
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 1500,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 1000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Cyber Breach: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 30000
              },
              {
                "item": "Power Cores",
                "qty": 1100
              },
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 1500,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 1000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Cyber Breach: Cores Pack",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 75000
              },
              {
                "item": "Power Cores",
                "qty": 2300
              },
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 3750,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 5,
            "name": "Cyber Breach: Cores Pack",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 200000
              },
              {
                "item": "Power Cores",
                "qty": 6000
              },
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 10000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 5000,
                "webBonus": true
              }
            ]
          }
        ]
      }
    },
    {
      "name": "Cyber Breach: Cores Pack (step 3 of 5)",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "9d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 30000
        },
        {
          "item": "Power Cores",
          "qty": 1100
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 1500,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Cyber Breach: Cores Pack",
        "step": 3,
        "of": 5,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Cyber Breach: Cores Pack",
            "price": 6.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 15000
              },
              {
                "item": "Power Cores",
                "qty": 500
              },
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 750,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 500,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Cyber Breach: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 30000
              },
              {
                "item": "Power Cores",
                "qty": 1000
              },
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 1500,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 1000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Cyber Breach: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 30000
              },
              {
                "item": "Power Cores",
                "qty": 1100
              },
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 1500,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 1000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Cyber Breach: Cores Pack",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 75000
              },
              {
                "item": "Power Cores",
                "qty": 2300
              },
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 3750,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 5,
            "name": "Cyber Breach: Cores Pack",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 200000
              },
              {
                "item": "Power Cores",
                "qty": 6000
              },
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 10000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 5000,
                "webBonus": true
              }
            ]
          }
        ]
      }
    },
    {
      "name": "Cyber Breach: Cores Pack (step 4 of 5)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "9d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 75000
        },
        {
          "item": "Power Cores",
          "qty": 2300
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 3750,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Cyber Breach: Cores Pack",
        "step": 4,
        "of": 5,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Cyber Breach: Cores Pack",
            "price": 6.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 15000
              },
              {
                "item": "Power Cores",
                "qty": 500
              },
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 750,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 500,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Cyber Breach: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 30000
              },
              {
                "item": "Power Cores",
                "qty": 1000
              },
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 1500,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 1000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Cyber Breach: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 30000
              },
              {
                "item": "Power Cores",
                "qty": 1100
              },
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 1500,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 1000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Cyber Breach: Cores Pack",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 75000
              },
              {
                "item": "Power Cores",
                "qty": 2300
              },
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 3750,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 5,
            "name": "Cyber Breach: Cores Pack",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 200000
              },
              {
                "item": "Power Cores",
                "qty": 6000
              },
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 10000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 5000,
                "webBonus": true
              }
            ]
          }
        ]
      }
    },
    {
      "name": "Cyber Breach: Cores Pack (step 5 of 5)",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "9d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 200000
        },
        {
          "item": "Power Cores",
          "qty": 6000
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 10000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Cyber Breach: Cores Pack",
        "step": 5,
        "of": 5,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Cyber Breach: Cores Pack",
            "price": 6.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 15000
              },
              {
                "item": "Power Cores",
                "qty": 500
              },
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 750,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 500,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Cyber Breach: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 30000
              },
              {
                "item": "Power Cores",
                "qty": 1000
              },
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 1500,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 1000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Cyber Breach: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 30000
              },
              {
                "item": "Power Cores",
                "qty": 1100
              },
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 1500,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 1000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Cyber Breach: Cores Pack",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 75000
              },
              {
                "item": "Power Cores",
                "qty": 2300
              },
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 3750,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 5,
            "name": "Cyber Breach: Cores Pack",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 200000
              },
              {
                "item": "Power Cores",
                "qty": 6000
              },
              {
                "item": "Cyber Breach Milestone Points",
                "qty": 10000,
                "webBonus": true
              },
              {
                "item": "Strike Points",
                "qty": 5000,
                "webBonus": true
              }
            ]
          }
        ]
      }
    },
    {
      "name": "Resource Chain Special (step 1 of 4)",
      "price": 99.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Gold",
          "qty": 129300000
        },
        {
          "item": "L4 Training Module",
          "qty": 11200
        },
        {
          "item": "Gold",
          "qty": 12930000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Resource Chain Special",
        "step": 1,
        "of": 4,
        "current": 4,
        "steps": [
          {
            "step": 1,
            "name": "Resource Chain Special",
            "price": 99.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Gold",
                "qty": 129300000
              },
              {
                "item": "L4 Training Module",
                "qty": 11200
              },
              {
                "item": "Gold",
                "qty": 12930000,
                "webBonus": true
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 2,
            "name": "Resource Chain Special",
            "price": 99.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Gold",
                "qty": 129300000
              },
              {
                "item": "L4 Training Module",
                "qty": 11200
              },
              {
                "item": "Gold",
                "qty": 12930000,
                "webBonus": true
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 3,
            "name": "Resource Chain Special",
            "price": 99.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Gold",
                "qty": 129300000
              },
              {
                "item": "L4 Training Module",
                "qty": 11200
              },
              {
                "item": "Gold",
                "qty": 12930000,
                "webBonus": true
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 4,
            "name": "Resource Chain Special",
            "price": 99.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Gold",
                "qty": 129300000
              },
              {
                "item": "L4 Training Module",
                "qty": 11200
              },
              {
                "item": "Gold",
                "qty": 12930000,
                "webBonus": true
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          }
        ]
      },
      "notes": "2 more item(s) not shown on the card"
    },
    {
      "name": "Resource Chain Special (step 2 of 4)",
      "price": 99.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Gold",
          "qty": 129300000
        },
        {
          "item": "L4 Training Module",
          "qty": 11200
        },
        {
          "item": "Gold",
          "qty": 12930000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Resource Chain Special",
        "step": 2,
        "of": 4,
        "current": 4,
        "steps": [
          {
            "step": 1,
            "name": "Resource Chain Special",
            "price": 99.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Gold",
                "qty": 129300000
              },
              {
                "item": "L4 Training Module",
                "qty": 11200
              },
              {
                "item": "Gold",
                "qty": 12930000,
                "webBonus": true
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 2,
            "name": "Resource Chain Special",
            "price": 99.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Gold",
                "qty": 129300000
              },
              {
                "item": "L4 Training Module",
                "qty": 11200
              },
              {
                "item": "Gold",
                "qty": 12930000,
                "webBonus": true
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 3,
            "name": "Resource Chain Special",
            "price": 99.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Gold",
                "qty": 129300000
              },
              {
                "item": "L4 Training Module",
                "qty": 11200
              },
              {
                "item": "Gold",
                "qty": 12930000,
                "webBonus": true
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 4,
            "name": "Resource Chain Special",
            "price": 99.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Gold",
                "qty": 129300000
              },
              {
                "item": "L4 Training Module",
                "qty": 11200
              },
              {
                "item": "Gold",
                "qty": 12930000,
                "webBonus": true
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          }
        ]
      },
      "notes": "2 more item(s) not shown on the card"
    },
    {
      "name": "Resource Chain Special (step 3 of 4)",
      "price": 99.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Gold",
          "qty": 129300000
        },
        {
          "item": "L4 Training Module",
          "qty": 11200
        },
        {
          "item": "Gold",
          "qty": 12930000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Resource Chain Special",
        "step": 3,
        "of": 4,
        "current": 4,
        "steps": [
          {
            "step": 1,
            "name": "Resource Chain Special",
            "price": 99.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Gold",
                "qty": 129300000
              },
              {
                "item": "L4 Training Module",
                "qty": 11200
              },
              {
                "item": "Gold",
                "qty": 12930000,
                "webBonus": true
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 2,
            "name": "Resource Chain Special",
            "price": 99.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Gold",
                "qty": 129300000
              },
              {
                "item": "L4 Training Module",
                "qty": 11200
              },
              {
                "item": "Gold",
                "qty": 12930000,
                "webBonus": true
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 3,
            "name": "Resource Chain Special",
            "price": 99.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Gold",
                "qty": 129300000
              },
              {
                "item": "L4 Training Module",
                "qty": 11200
              },
              {
                "item": "Gold",
                "qty": 12930000,
                "webBonus": true
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 4,
            "name": "Resource Chain Special",
            "price": 99.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Gold",
                "qty": 129300000
              },
              {
                "item": "L4 Training Module",
                "qty": 11200
              },
              {
                "item": "Gold",
                "qty": 12930000,
                "webBonus": true
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          }
        ]
      },
      "notes": "2 more item(s) not shown on the card"
    },
    {
      "name": "Resource Chain Special (step 4 of 4)",
      "price": 99.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 19h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Gold",
          "qty": 129300000
        },
        {
          "item": "L4 Training Module",
          "qty": 11200
        },
        {
          "item": "Gold",
          "qty": 12930000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Resource Chain Special",
        "step": 4,
        "of": 4,
        "current": 4,
        "steps": [
          {
            "step": 1,
            "name": "Resource Chain Special",
            "price": 99.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Gold",
                "qty": 129300000
              },
              {
                "item": "L4 Training Module",
                "qty": 11200
              },
              {
                "item": "Gold",
                "qty": 12930000,
                "webBonus": true
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 2,
            "name": "Resource Chain Special",
            "price": 99.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Gold",
                "qty": 129300000
              },
              {
                "item": "L4 Training Module",
                "qty": 11200
              },
              {
                "item": "Gold",
                "qty": 12930000,
                "webBonus": true
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 3,
            "name": "Resource Chain Special",
            "price": 99.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Gold",
                "qty": 129300000
              },
              {
                "item": "L4 Training Module",
                "qty": 11200
              },
              {
                "item": "Gold",
                "qty": 12930000,
                "webBonus": true
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          },
          {
            "step": 4,
            "name": "Resource Chain Special",
            "price": 99.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Gold",
                "qty": 129300000
              },
              {
                "item": "L4 Training Module",
                "qty": 11200
              },
              {
                "item": "Gold",
                "qty": 12930000,
                "webBonus": true
              }
            ],
            "notes": "2 more item(s) not shown on the card"
          }
        ]
      },
      "notes": "2 more item(s) not shown on the card",
      "description": "Grab this special offer chain today! Gold and Training crafted just for you!"
    },
    {
      "name": "Turn Up the Power (option 1)",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": null,
      "expires": "1d 19h",
      "section": "dual offers",
      "sections": [
        "dual offers"
      ],
      "contents": [
        {
          "item": "T4 Ability Material",
          "qty": 630
        },
        {
          "item": "T4 Level 1 Ions",
          "qty": 95000
        },
        {
          "item": "Strike Points",
          "qty": 1500,
          "webBonus": true
        }
      ]
    },
    {
      "name": "Turn Up the Power (option 2)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": null,
      "expires": "1d 19h",
      "section": "dual offers",
      "sections": [
        "dual offers"
      ],
      "contents": [
        {
          "item": "T4 Ability Material",
          "qty": 920
        },
        {
          "item": "T4 Level 1 Ions",
          "qty": 143000
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ]
    },
    {
      "name": "MEGA Lock-On Orb",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "3d 19h",
      "section": "Offers / NEW CHARACTERS",
      "sections": [
        "Offers / NEW CHARACTERS"
      ],
      "contents": [
        {
          "item": "MEGA Lock-On Orb Fragments",
          "qty": 2000
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Open MEGA Lock-On Orb for a guaranteed 4-Yellow-Star Hawkeye (Robot), with a chance up to 7 Yellow Stars!"
    },
    {
      "name": "Hidden Jungle Orb",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 8,
      "expires": "11d 19h",
      "section": "Offers / NEW CHARACTERS",
      "sections": [
        "Offers / NEW CHARACTERS"
      ],
      "contents": [
        {
          "item": "Hidden Jungle Orb Fragments",
          "qty": 2000
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Each Hidden Jungle Orb contains up to 250 Ka-Zar shards with 55 shards guaranteed! He flips negatives, grants Safeguard and Defense Up, heals allies, calls ally attacks!"
    },
    {
      "name": "Lock-On Orb",
      "price": 49.99,
      "currency": "CAD",
      "purchaseLimit": 8,
      "expires": "3d 19h",
      "section": "Offers / NEW CHARACTERS",
      "sections": [
        "Offers / NEW CHARACTERS"
      ],
      "contents": [
        {
          "item": "Lock-On Orb Fragments",
          "qty": 2000
        },
        {
          "item": "Mega Gold Orb Fragments",
          "qty": 2000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 4000,
          "webBonus": true
        }
      ],
      "description": "Each Lock-On Orb contains up to 410 Hawkeye (Robot) shards with 50 shards guaranteed! He applies Exposed, clears enemy Barrier, and stops Speed Bar manipulation!"
    },
    {
      "name": "Gear Tier 21: Mystic Bundle",
      "price": 99.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "19h 44m",
      "section": "Offers / WEB EXCLUSIVE",
      "sections": [
        "Offers / WEB EXCLUSIVE"
      ],
      "contents": [
        {
          "item": "Crimson Ritual Salts",
          "qty": 35
        },
        {
          "item": "Crimson Psionic Essence",
          "qty": 35
        },
        {
          "item": "Strike Points",
          "qty": 8000,
          "webBonus": true
        }
      ],
      "description": "Take your roster to the next level with essential Gear Tier 21. Power up your characters and get ready for Annihilus. Don't wait!"
    },
    {
      "name": "Unlock Special: LV105 Gold Boost",
      "price": 49.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "22h 14m",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Gold",
          "qty": 35000000
        },
        {
          "item": "Strike Points",
          "qty": 4000,
          "webBonus": true
        }
      ],
      "description": "All the Gold you need to bring your character to LV105 in one deal!"
    },
    {
      "name": "Unlock Special: LV95 Gold Boost",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "22h 14m",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Gold",
          "qty": 17000000
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "All the Gold needed to reach LV95 with your newest recruit!"
    },
    {
      "name": "Unlock Special: LV105 Training Boost",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "22h 14m",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "L4 Training Module",
          "qty": 3600
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "description": "Pick up this special offer for all the L4 Training Materials to reach LV105 with your newest member!"
    },
    {
      "name": "Unlock Special: LV95 Training Boost",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "22h 14m",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "L4 Training Module",
          "qty": 1700
        },
        {
          "item": "Strike Points",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "description": "Get all the L4 Training Materials needed to reach LV95 with your latest character!"
    },
    {
      "name": "Unlock Special: Perfect Skills",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "22h 14m",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "T4 Ability Material",
          "qty": 850
        },
        {
          "item": "T3 Ability Material",
          "qty": 750
        },
        {
          "item": "T2 Ability Material",
          "qty": 300
        },
        {
          "item": "T1 Ability Material",
          "qty": 100
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "description": "Grab this bundle to bring your latest recruit's abilities to their highest potential!"
    },
    {
      "name": "Unlock Special: Crimson Uniques",
      "price": 79.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "22h 14m",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Crimson Titanium Alloy",
          "qty": 45
        },
        {
          "item": "Crimson Syringe",
          "qty": 75
        },
        {
          "item": "Crimson Marrow Extract",
          "qty": 90
        },
        {
          "item": "Crimson Spectral Analysis",
          "qty": 75
        },
        {
          "item": "Crimson Molecular Scan",
          "qty": 90
        },
        {
          "item": "Strike Points",
          "qty": 6000,
          "webBonus": true
        }
      ],
      "description": "Get all the Crimson Uniques you need to reach GT20 with your newest recruit!!"
    },
    {
      "name": "Unlock Special: Crimson Origins",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "22h 14m",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Crimson Isomer",
          "qty": 700
        },
        {
          "item": "Crimson Phosphates",
          "qty": 600
        },
        {
          "item": "Crimson MRI",
          "qty": 500
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Get all the Crimson Origin Gear you need to reach GT20 with your latest character!"
    },
    {
      "name": "Unlock Special: Crimson Catalysts",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "22h 14m",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Crimson Basic Catalyst Part",
          "qty": 1750
        },
        {
          "item": "Crimson Armor Catalyst Part",
          "qty": 100
        },
        {
          "item": "Crimson Damage Catalyst Part",
          "qty": 630
        },
        {
          "item": "Crimson Focus Catalyst Part",
          "qty": 350
        },
        {
          "item": "Crimson Health Catalyst Part",
          "qty": 350
        }
      ],
      "description": "Get all the Crimson Catalysts you need to reach GT20 with your newest roster addition!",
      "notes": "2 more item(s) not shown on the card"
    },
    {
      "name": "Unlock Special: Diamond Authority",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "22h 14m",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Diamond Orb Fragments",
          "qty": 2000
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "More Diamonds means MORE POWER! Power up with this Diamond Bundle!"
    },
    {
      "name": "Unlock Special: T3 Ion Max",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "22h 14m",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "T3 Level 1 Ions",
          "qty": 2700000
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Enough T3 L1 Ions to completely reach T3 L5 Max! Get it now to maximize your potential."
    },
    {
      "name": "Unlock Special: T3 Crystal Max",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "22h 14m",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "T3 Controller Armor Level 1 Iso-8",
          "qty": 81
        },
        {
          "item": "T3 Controller Damage Level 1 Iso-8",
          "qty": 81
        },
        {
          "item": "T3 Controller Focus Level 1 Iso-8",
          "qty": 81
        },
        {
          "item": "T3 Controller Health Level 1 Iso-8",
          "qty": 81
        },
        {
          "item": "T3 Controller Resist Level 1 Iso-8",
          "qty": 81
        },
        {
          "item": "Strike Points",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "description": "All the T3 Crystals you need to take your character to their maximum ISO-8 potential!"
    },
    {
      "name": "Unlock Special: Gear Tier 19",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "22h 14m",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Gold",
          "qty": 6000000
        },
        {
          "item": "Crimson Titanium Alloy",
          "qty": 20
        },
        {
          "item": "Crimson Molecular Scan",
          "qty": 55
        },
        {
          "item": "Crimson Marrow Extract",
          "qty": 55
        },
        {
          "item": "Crimson MRI",
          "qty": 155
        }
      ],
      "description": "Get the Crimson and Augmented gear your newest character needs for Gear Tier 19 with this massive bundle! Tap to see all the contents.",
      "notes": "23 more item(s) not shown on the card"
    },
    {
      "name": "Magnetic Might",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 19h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Magneto (Phoenix Force)",
          "qty": 50
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Collect character shards for Magneto (Phoenix Force) and make him a formidable force on the battlefield!"
    },
    {
      "name": "Omega's Inferno: Evolved",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 19h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Omega Red (Phoenix Force)",
          "qty": 100
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Build up Omega Red (Phoenix Force) with character shards and make every attack count!"
    },
    {
      "name": "Magneto (Phoenix Force) 3-Diamond",
      "price": 99.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 19h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Magneto (Phoenix Force)",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 8000,
          "webBonus": true
        }
      ],
      "description": "Empower Magneto (Phoenix Force) with a 3-Diamond upgrade and unleash his magnetic might!"
    },
    {
      "name": "Awakened Thermo-Magnetic Force",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 19h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Magneto (Phoenix Force)'s Basic Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Don't miss your chance to unlock the Basic Awakened Ability for Magneto (Phoenix Force)!"
    },
    {
      "name": "Awakened Magnetized Sentinel",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 19h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Magneto (Phoenix Force)'s Special Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Unlock the Special Awakened Ability for Magneto (Phoenix Force) while this offer lasts!"
    },
    {
      "name": "Awakened Phoenix Polarity",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 19h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Magneto (Phoenix Force)'s Ultimate Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Get the Ultimate Awakened Ability for Magneto (Phoenix Force) before it's gone!"
    },
    {
      "name": "Magneto (Phoenix Force) Full Awakening",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 19h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Magneto (Phoenix Force)'s Basic Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Magneto (Phoenix Force)'s Special Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Magneto (Phoenix Force)'s Ultimate Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "description": "Great. Ability. Savings. Fully awaken Magneto (Phoenix Force)'s abilities with this limited-time bundle!"
    },
    {
      "name": "Awakened Carbonadium Fire",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 19h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Omega Red (Phoenix Force)'s Basic Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Don't miss your chance to unlock the Basic Awakened Ability for Omega Red (Phoenix Force)!"
    },
    {
      "name": "Awakened Death Incarnate",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 19h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Omega Red (Phoenix Force)'s Passive Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Enhance Omega Red (Phoenix Force) with his Passive Awakened Ability before this limited-time offer ends!"
    },
    {
      "name": "Omega Red (Phoenix Force) Full Awakening",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 19h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Omega Red (Phoenix Force)'s Basic Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Omega Red (Phoenix Force)'s Passive Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "qty": 1500,
          "webBonus": true
        }
      ],
      "description": "Great. Ability. Savings. Fully awaken Omega Red (Phoenix Force)'s abilities with this limited-time bundle!"
    },
    {
      "name": "Awakened Phoenix Force",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 19h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Phoenix's Ultimate Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Get the Ultimate Awakened Ability for Phoenix before it's gone!"
    },
    {
      "name": "Awakened Phoenix Rising",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 19h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Phoenix's Passive Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Enhance Phoenix with his Passive Awakened Ability before this limited-time offer ends!"
    },
    {
      "name": "Phoenix Full Awakening",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 19h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Phoenix's Ultimate Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Phoenix's Passive Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "qty": 1500,
          "webBonus": true
        }
      ],
      "description": "Great. Ability. Savings. Fully awaken Phoenix's abilities with this limited-time bundle!"
    },
    {
      "name": "Ability Essentials Stash",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "2d 19h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "T2 Ability Material",
          "qty": 450
        },
        {
          "item": "T1 Ability Material",
          "qty": 450
        },
        {
          "item": "T4 Ability Material",
          "qty": 135
        },
        {
          "item": "T3 Ability Material",
          "qty": 450
        },
        {
          "item": "T2 Ability Material",
          "qty": 45,
          "webBonus": true
        }
      ],
      "description": "Improve your abilities today for the new level.",
      "notes": "4 more item(s) not shown on the card"
    },
    {
      "name": "Ability Value Stash",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "2d 19h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "T4 Ability Material",
          "qty": 390
        },
        {
          "item": "T4 Ability Material",
          "qty": 40,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Stock up Ability Materials to upgrade your roster now!"
    },
    {
      "name": "Scorpion (Breaker) Awakening Bundle",
      "price": 79.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 19h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Scorpion (Breaker)'s Basic Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Scorpion (Breaker)'s Special Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Scorpion (Breaker)'s Ultimate Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Scorpion (Breaker)'s Passive Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "qty": 6000,
          "webBonus": true
        }
      ],
      "description": "Unlock the full potential of Scorpion (Breaker) with a full set of Awakened Ability upgrades!"
    },
    {
      "name": "Scorpion (Breaker) Basic Awakened",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 19h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Scorpion (Breaker)'s Basic Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Enhance Scorpion (Breaker) with his Basic Awakened Ability to boost his combat potential!"
    },
    {
      "name": "Scorpion (Breaker) Special Awakened",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 19h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Scorpion (Breaker)'s Special Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Empower Scorpion (Breaker) with his Special Awakened Ability to unleash devastating attacks!"
    },
    {
      "name": "Scorpion (Breaker) Ultimate Awakened",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 19h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Scorpion (Breaker)'s Ultimate Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Unleash the full force of Scorpion (Breaker) with materials to upgrade his Ultimate Awakened Ability!"
    },
    {
      "name": "Scorpion (Breaker) Passive Awakened",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 19h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Scorpion (Breaker)'s Passive Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Strengthen Scorpion (Breaker) with his Passive Awakened Ability to take his power even further!"
    },
    {
      "name": "Silver Surfer (Breaker) Basic Awakened",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 19h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Silver Surfer (Breaker)'s Basic Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Enhance Silver Surfer (Breaker) to new heights with his Basic Awakened Ability!"
    },
    {
      "name": "Silver Surfer (Breaker) Special Awakened",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 19h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Silver Surfer (Breaker)'s Special Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Elevate Silver Surfer (Breaker) to greater power with his Special Awakened Ability!"
    },
    {
      "name": "Silver Surfer (Breaker) Ultimate Awakened",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 19h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Silver Surfer (Breaker)'s Ultimate Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Ascend to overwhelming strength with Silver Surfer (Breaker)'s Ultimate Awakened Ability!"
    },
    {
      "name": "Silver Surfer (Breaker) Passive Awakened",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 19h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Silver Surfer (Breaker)'s Passive Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Take Silver Surfer (Breaker) to new heights with his Passive Awakened Ability!"
    },
    {
      "name": "Whiplash Power Pack",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "19h 44m",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Whiplash",
          "qty": 20
        },
        {
          "item": "Gold",
          "qty": 340000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Upgrade Whiplash to push through Mission 2 of the Breaker Event: Sabretooth!"
    },
    {
      "name": "Morbius Power Pack",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "19h 44m",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Morbius",
          "qty": null
        },
        {
          "item": "Gold",
          "qty": 520000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 1500,
          "webBonus": true
        }
      ],
      "description": "Upgrade Morbius to push through Mission 5 of the Breaker Event: Sabretooth!",
      "notes": "qty unreadable for Morbius"
    },
    {
      "name": "Oath Power Pack",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "19h 44m",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Oath",
          "qty": null
        },
        {
          "item": "Gold",
          "qty": 520000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 1500,
          "webBonus": true
        }
      ],
      "description": "Upgrade Oath to push through Mission 5 of the Breaker Event: Sabretooth!",
      "notes": "qty unreadable for Oath"
    },
    {
      "name": "Iron Raiders Upgrade Combo",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "19h 44m",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Iron Monger",
          "qty": 45
        },
        {
          "item": "Ulysses Klaue",
          "qty": 45
        },
        {
          "item": "Yellowjacket",
          "qty": 225
        },
        {
          "item": "Crossbones",
          "qty": 225
        },
        {
          "item": "Gold",
          "qty": 860000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "description": "Upgrade Iron Raiders to push through Missions 2 and 10 of the Breaker Event: Sabretooth!"
    },
    {
      "name": "Cyber Breach: Ultron",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "9d 19h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 50000
        },
        {
          "item": "Ultron",
          "qty": 810
        },
        {
          "item": "Ultron",
          "qty": 1
        },
        {
          "item": "Ultron",
          "qty": 1
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 2500,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Instantly power up Ultron to 1-Diamond and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Vision",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "9d 19h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 50000
        },
        {
          "item": "Vision",
          "qty": 810
        },
        {
          "item": "Vision",
          "qty": 1
        },
        {
          "item": "Vision",
          "qty": 1
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 2500,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Instantly power up Vision to 1-Diamond and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Sentient Squad",
      "price": 49.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "9d 19h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 500000
        },
        {
          "item": "Ultron",
          "qty": 810
        },
        {
          "item": "Vision",
          "qty": 810
        },
        {
          "item": "Yellowjacket",
          "qty": 810
        },
        {
          "item": "Crossbones",
          "qty": 810
        }
      ],
      "description": "Instantly power up Ultron, Vision, Yellowjacket, and Crossbones to 2-Diamond and also grab a bunch of points to gain progress in the Cyber Breach Milestone!",
      "notes": "10 more item(s) not shown on the card"
    },
    {
      "name": "Cyber Breach: Crimson Elite Orb",
      "price": 3.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "9d 19h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 10000
        },
        {
          "item": "Crimson Elite Orb Fragments",
          "qty": 2000
        },
        {
          "item": "Strike Points",
          "qty": 300,
          "webBonus": true
        }
      ],
      "description": "Earn Gear Tier 19 and 20 Mini-Unique, and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Orange Mega Orb",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "9d 19h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 800000
        },
        {
          "item": "Orange Mega Orb",
          "qty": 1
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 40000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Open this Orb to stock up on T4 Level 1 Ions and T4 Iso-8 Credits, also gain progress in the Cyber Breach Milestone! This special Orb will automatically open upon purchase."
    },
    {
      "name": "Cyber Breach: Basic Pack",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "9d 19h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 500000
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 25000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "description": "Get ahead in the Cyber Breach Leaderboard to secure 3-Diamond for Whiplash, Ulysses Klaue, Iron Monger!"
    },
    {
      "name": "Cyber Breach: GT21 Mutant",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "9d 19h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 800000
        },
        {
          "item": "Crimson Nucleic Infusion",
          "qty": 105
        },
        {
          "item": "Crimson Biopolymers",
          "qty": 105
        },
        {
          "item": "Crimson Spliced X-Gene",
          "qty": 1650
        },
        {
          "item": "Crimson Cytoplasm",
          "qty": 1375
        }
      ],
      "description": "Earn Gear Tier 21 Mutant Mini-Unique, and also grab a bunch of points to gain progress in the Cyber Breach Milestone!",
      "notes": "5 more item(s) not shown on the card"
    },
    {
      "name": "Cyber Breach: GT21 Tech",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "9d 19h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 800000
        },
        {
          "item": "Crimson Liquid Hydrazine",
          "qty": 105
        },
        {
          "item": "Crimson Dargonite",
          "qty": 105
        },
        {
          "item": "Crimson Unstable Molecules",
          "qty": 1650
        },
        {
          "item": "Crimson Laser Torch",
          "qty": 1375
        }
      ],
      "description": "Earn Gear Tier 21 Tech Mini-Unique, and also grab a bunch of points to gain progress in the Cyber Breach Milestone!",
      "notes": "5 more item(s) not shown on the card"
    },
    {
      "name": "Cyber Breach: GT21 Bio",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "9d 19h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 800000
        },
        {
          "item": "Crimson Nebulizer",
          "qty": 105
        },
        {
          "item": "Crimson Hyperphage",
          "qty": 105
        },
        {
          "item": "Crimson Isomer",
          "qty": 1650
        },
        {
          "item": "Crimson Phosphates",
          "qty": 1375
        }
      ],
      "description": "Earn Gear Tier 21 Bio Mini-Unique, and also grab a bunch of points to gain progress in the Cyber Breach Milestone!",
      "notes": "5 more item(s) not shown on the card"
    },
    {
      "name": "Cyber Breach: GT21 Skill",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "9d 19h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 800000
        },
        {
          "item": "Crimson Security Bypass",
          "qty": 105
        },
        {
          "item": "Crimson Remote Access Codes",
          "qty": 105
        },
        {
          "item": "Crimson Secret Intel",
          "qty": 1650
        },
        {
          "item": "Crimson Locked Case",
          "qty": 1375
        }
      ],
      "description": "Earn Gear Tier 21 Skill Mini-Unique, and also grab a bunch of points to gain progress in the Cyber Breach Milestone!",
      "notes": "5 more item(s) not shown on the card"
    },
    {
      "name": "Cyber Breach: GT21 Mystic",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "9d 19h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 800000
        },
        {
          "item": "Crimson Ritual Salts",
          "qty": 105
        },
        {
          "item": "Crimson Psionic Essence",
          "qty": 105
        },
        {
          "item": "Crimson Arcane Powder",
          "qty": 1650
        },
        {
          "item": "Crimson Esoteric Glyphs",
          "qty": 1375
        }
      ],
      "description": "Earn Gear Tier 21 Mystic Mini-Unique, and also grab a bunch of points to gain progress in the Cyber Breach Milestone!",
      "notes": "5 more item(s) not shown on the card"
    },
    {
      "name": "Cyber Breach: Ions Special",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "9d 19h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 50000
        },
        {
          "item": "T3 Level 4 Ions",
          "qty": 2700000
        },
        {
          "item": "T3 Level 5 Ions",
          "qty": 2700000
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 2500,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 1500,
          "webBonus": true
        }
      ],
      "description": "Earn T3 Level 4 and Level 5 Ions, and also gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Ability Power Up",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "9d 19h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 75000
        },
        {
          "item": "T4 Ability Material",
          "qty": 840
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 3750,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Strengthen your roster with T4 Ability Materials and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Terrific Training",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "9d 19h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 75000
        },
        {
          "item": "L4 Training Module",
          "qty": 4620
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 3750,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Pick up a great L4 Training Module bundle to level up characters and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Whiplash",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 9,
      "expires": "9d 19h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 125000
        },
        {
          "item": "Whiplash",
          "qty": 100
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 6250,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "description": "Strengthen your roster with Whiplash shards and earn points toward the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Ulysses Klaue",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 9,
      "expires": "9d 19h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 125000
        },
        {
          "item": "Ulysses Klaue",
          "qty": 100
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 6250,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "description": "Power up your roster with Ulysses Klaue shards and make progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Iron Monger",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 9,
      "expires": "9d 19h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 125000
        },
        {
          "item": "Iron Monger",
          "qty": 100
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 6250,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "description": "Boost your roster with Iron Monger shards and claim progress toward the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Jocasta",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 9,
      "expires": "9d 19h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 300000
        },
        {
          "item": "Jocasta",
          "qty": 100
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 15000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "description": "Grab Jocasta shards and score points to push further in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Hawkeye (Robot)",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 9,
      "expires": "9d 19h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 300000
        },
        {
          "item": "Hawkeye (Robot)",
          "qty": 100
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 15000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "description": "Gear up with Hawkeye (Robot) shards and rack up points in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Human Torch (Jim)",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 9,
      "expires": "9d 19h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 300000
        },
        {
          "item": "Human Torch (Jim)",
          "qty": 100
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 15000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "description": "Gather Human Torch (Jim) shards and unlock more rewards as you advance in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Jocasta 3-Diamond",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "9d 19h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 800000
        },
        {
          "item": "Jocasta",
          "qty": 1
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 40000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Upgrade Jocasta to 3-Diamond and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Hawkeye (Robot) 3-Diamond",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "9d 19h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 800000
        },
        {
          "item": "Hawkeye (Robot)",
          "qty": 1
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 40000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Empower Hawkeye (Robot) with a 3-Diamond upgrade and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Human Torch (Jim) 3-Diamond",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "9d 19h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 800000
        },
        {
          "item": "Human Torch (Jim)",
          "qty": 1
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 40000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Boost Human Torch (Jim) to 3-Diamond and also grab a bunch of points to gain progress in the Cyber Breach Milestone!"
    },
    {
      "name": "Cyber Breach: Ka-Zar",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 19h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 100000
        },
        {
          "item": "Ka-Zar",
          "qty": 60
        },
        {
          "item": "Cyber Breach Milestone Points",
          "qty": 5000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Strengthen your roster with Ka-Zar shards and earn points toward the Cyber Breach Milestone!"
    },
    {
      "name": "Raid Warzone: Daily Allied Supply",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "19h 44m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Raid Warzone Milestone Points",
          "qty": 3500
        },
        {
          "item": "Allied Supply XIII Orb Fragments",
          "qty": 4000
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Get Allied Supply XIII Orbs for Raid Warzone progress!"
    },
    {
      "name": "Raid Warzone: Special Bundle",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 4,
      "expires": "19h 44m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Raid Warzone Milestone Points",
          "qty": 20000
        },
        {
          "item": "L4 Training Module",
          "qty": 500
        },
        {
          "item": "T3 Iso-8 Credits",
          "qty": 10000
        },
        {
          "item": "Strike Points",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "description": "Claim this special deal to boost your progress in the Raid Warzone Milestone!"
    },
    {
      "name": "Raid Warzone: Raid Boost",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "19h 44m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Raid Warzone Milestone Points",
          "qty": 2000
        },
        {
          "item": "Raid Health Pack",
          "qty": 300
        },
        {
          "item": "Raid Energy Refill",
          "qty": 400
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Stock up on Raid Supplies and get ahead in the Raid Warzone Milestone!"
    },
    {
      "name": "Raid Warzone: Daily Allied Supply",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "19h 44m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Raid Warzone Milestone Points",
          "qty": 7000
        },
        {
          "item": "Allied Supply XIII Orb Fragments",
          "qty": 8000
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Get Allied Supply XIII Orbs for Raid Warzone progress!"
    },
    {
      "name": "Short on Wasp (Janet) Shards?",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 8,
      "expires": "17d 19h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Wasp (Janet)",
          "qty": 100
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Didn't finish the Chapter Battle Pass? Grab your missing shards before this offer ends!"
    },
    {
      "name": "Battle Pass Catch-Up!",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "10d 19h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Battle Pass Tokens",
          "qty": 15
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Get 15 Level Tokens to catch up on Battle Pass progress!"
    },
    {
      "name": "Short on West Coast Avenger Shards?",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": 8,
      "expires": "17d 19h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "War Machine",
          "qty": 100
        },
        {
          "item": "Tigra",
          "qty": 100
        },
        {
          "item": "Mockingbird",
          "qty": 100
        },
        {
          "item": "Hawkeye",
          "qty": 100
        },
        {
          "item": "Strike Points",
          "qty": 1500,
          "webBonus": true
        }
      ],
      "description": "Grab your missing West Coast Avenger shards before this offer ends!"
    },
    {
      "name": "Armory 19 Orb Special",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "19h 44m",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Armory 19 Orb Fragments",
          "qty": 30000
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Take advantage of this great deal on Armory 19 Orb Fragments!"
    },
    {
      "name": "S.T.R.I.K.E Pass Catch-Up!",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "3d 19h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "S.T.R.I.K.E. Tokens",
          "qty": 20
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Get 20 S.T.R.I.K.E. Levels to catch up on S.T.R.I.K.E pass progress!"
    },
    {
      "name": "T4 Ions",
      "price": 99.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "6d 19h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "T4 Level 1 Ions",
          "qty": 600000
        },
        {
          "item": "Strike Points",
          "qty": 7000,
          "webBonus": true
        }
      ],
      "description": "All the Ions you need to upgrade from T4 Level 1 to T4 Level 3!"
    },
    {
      "name": "T4 Iso Boost: Blaster",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "6d 19h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "T4 Blaster Armor Level 1 Iso-8",
          "qty": 9
        },
        {
          "item": "T4 Blaster Damage Level 1 Iso-8",
          "qty": 9
        },
        {
          "item": "T4 Blaster Focus Level 1 Iso-8",
          "qty": 9
        },
        {
          "item": "T4 Blaster Health Level 1 Iso-8",
          "qty": 9
        },
        {
          "item": "T4 Blaster Resist Level 1 Iso-8",
          "qty": 9
        },
        {
          "item": "Strike Points",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "description": "All the Crystals you need to go from T4 Level 1 to T4 Level 3"
    },
    {
      "name": "T4 Iso Boost: Brawler",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "6d 19h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "T4 Brawler Armor Level 1 Iso-8",
          "qty": 9
        },
        {
          "item": "T4 Brawler Damage Level 1 Iso-8",
          "qty": 9
        },
        {
          "item": "T4 Brawler Focus Level 1 Iso-8",
          "qty": 9
        },
        {
          "item": "T4 Brawler Health Level 1 Iso-8",
          "qty": 9
        },
        {
          "item": "T4 Brawler Resist Level 1 Iso-8",
          "qty": 9
        },
        {
          "item": "Strike Points",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "description": "All the Crystals you need to go from T4 Level 1 to T4 Level 3"
    },
    {
      "name": "T4 Iso Boost: Controller",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "6d 19h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "T4 Controller Armor Level 1 Iso-8",
          "qty": 9
        },
        {
          "item": "T4 Controller Damage Level 1 Iso-8",
          "qty": 9
        },
        {
          "item": "T4 Controller Focus Level 1 Iso-8",
          "qty": 9
        },
        {
          "item": "T4 Controller Health Level 1 Iso-8",
          "qty": 9
        },
        {
          "item": "T4 Controller Resist Level 1 Iso-8",
          "qty": 9
        },
        {
          "item": "Strike Points",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "description": "All the Crystals you need to go from T4 Level 1 to T4 Level 3"
    },
    {
      "name": "T4 Iso Boost: Protector",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "6d 19h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "T4 Protector Armor Level 1 Iso-8",
          "qty": 9
        },
        {
          "item": "T4 Protector Damage Level 1 Iso-8",
          "qty": 9
        },
        {
          "item": "T4 Protector Focus Level 1 Iso-8",
          "qty": 9
        },
        {
          "item": "T4 Protector Health Level 1 Iso-8",
          "qty": 9
        },
        {
          "item": "T4 Protector Resist Level 1 Iso-8",
          "qty": 9
        },
        {
          "item": "Strike Points",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "description": "All the Crystals you need to go from T4 Level 1 to T4 Level 3"
    },
    {
      "name": "T4 Iso Boost: Support",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "6d 19h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "T4 Support Armor Level 1 Iso-8",
          "qty": 9
        },
        {
          "item": "T4 Support Damage Level 1 Iso-8",
          "qty": 9
        },
        {
          "item": "T4 Support Focus Level 1 Iso-8",
          "qty": 9
        },
        {
          "item": "T4 Support Health Level 1 Iso-8",
          "qty": 9
        },
        {
          "item": "T4 Support Resist Level 1 Iso-8",
          "qty": 9
        },
        {
          "item": "Strike Points",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "description": "All the Crystals you need to go from T4 Level 1 to T4 Level 3"
    },
    {
      "name": "Diamond Orb Mega Launch Special",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 10,
      "expires": "19h 44m",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Diamond Orb Fragments",
          "qty": 10000
        },
        {
          "item": "Elite 7 Credit",
          "qty": 7500
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Take your roster to the next level with this deal on multiple Diamonds Orbs and Elite 7 Credits!"
    },
    {
      "name": "Diamond Orb Launch Special",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 25,
      "expires": "19h 44m",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Diamond Orb Fragments",
          "qty": 2000
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Harness the power of Diamonds! Earn 20 Silver Diamond Credits and a guaranteed Diamond Promotion with each orb!"
    },
    {
      "name": "Elite 4 Star Orb Offer",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "19h 44m",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Elite 4 Credit",
          "qty": 125000
        },
        {
          "item": "Elite 4 Credit",
          "qty": 125000
        },
        {
          "item": "Elite 4 Credit",
          "qty": 125000
        },
        {
          "item": "Elite 4 Credit",
          "qty": 25000
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Take advantage of this exclusive offer and buy now! This orb will guarantee you a 4-Red Star or higher Promotion!"
    },
    {
      "name": "XP Overload",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 10,
      "expires": "19h 44m",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Commander XP",
          "qty": 21000
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Accelerate your way to new levels with this XP pack! Don't miss out on this opportunity to boost your progress!"
    },
    {
      "name": "XP Rush",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 10,
      "expires": "19h 44m",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Commander XP",
          "qty": 10000
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "description": "Experience the new levels faster with this XP pack! Prepare your roster for the challenges ahead."
    },
    {
      "name": "XP Dash",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 10,
      "expires": "19h 44m",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Commander XP",
          "qty": 4000
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Max level here you come! Get progress with this special XP pack!"
    },
    {
      "name": "Strike Store Exclusive!",
      "price": 6000,
      "currency": "Strike Points",
      "purchaseLimit": 5,
      "expires": "19h 44m",
      "section": "STRIKE STORE",
      "sections": [
        "STRIKE STORE"
      ],
      "contents": [
        {
          "item": "Strike Store Exclusive",
          "qty": 1
        }
      ],
      "paidWith": "Strike Points",
      "description": "Open this Strike Store exclusive orb for a chance at 3-Diamond promotions for recent characters! Characters from Fantastic Four (MCU), Hellfire Club, and Insidious Six."
    },
    {
      "name": "Maximum Ability",
      "price": 5000,
      "currency": "Strike Points",
      "purchaseLimit": 100,
      "expires": "19h 44m",
      "section": "STRIKE STORE",
      "sections": [
        "STRIKE STORE"
      ],
      "contents": [
        {
          "item": "T4 Ability Material",
          "qty": 50
        }
      ],
      "paidWith": "Strike Points",
      "description": "Get the edge on your opponents with T4 Ability Materials bundle!"
    },
    {
      "name": "Training Bootcamp",
      "price": 2500,
      "currency": "Strike Points",
      "purchaseLimit": 100,
      "expires": "19h 44m",
      "section": "STRIKE STORE",
      "sections": [
        "STRIKE STORE"
      ],
      "contents": [
        {
          "item": "L4 Training Module",
          "qty": 150
        }
      ],
      "paidWith": "Strike Points",
      "description": "Level up your top characters with this Training Module bundle!"
    },
    {
      "name": "Augmented Energy",
      "price": 1000,
      "currency": "Strike Points",
      "purchaseLimit": 100,
      "expires": "19h 44m",
      "section": "STRIKE STORE",
      "sections": [
        "STRIKE STORE"
      ],
      "contents": [
        {
          "item": "Armory 17 Orb Fragments",
          "qty": 340000
        },
        {
          "item": "Teal Catalyst Pack",
          "qty": 3
        },
        {
          "item": "Campaign Energy",
          "qty": 130
        }
      ],
      "paidWith": "Strike Points",
      "description": "Conquer enemies and Campaigns with Armory Orbs and Campaign Energy!"
    },
    {
      "name": "Gold Standard",
      "price": 500,
      "currency": "Strike Points",
      "purchaseLimit": 30,
      "expires": "3d 19h",
      "section": "STRIKE STORE",
      "sections": [
        "STRIKE STORE"
      ],
      "contents": [
        {
          "item": "Gold",
          "qty": 250000
        }
      ],
      "paidWith": "Strike Points",
      "description": "Boost your roster power with this Gold bundle!"
    },
    {
      "name": "Training Bootcamp",
      "price": 500,
      "currency": "Strike Points",
      "purchaseLimit": 100,
      "expires": "19h 44m",
      "section": "STRIKE STORE",
      "sections": [
        "STRIKE STORE"
      ],
      "contents": [
        {
          "item": "L4 Training Module",
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
          "qty": 150
        },
        {
          "item": "Strike Points",
          "qty": 200,
          "webBonus": true
        }
      ]
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
          "qty": 375
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ]
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
          "qty": 750
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ]
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
          "qty": 1580
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ]
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
          "qty": 4130
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ]
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
          "qty": 8630
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ]
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
          "qty": 100
        },
        {
          "item": "Strike Points",
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
          "qty": 200
        },
        {
          "item": "Strike Points",
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
          "qty": 350
        },
        {
          "item": "Strike Points",
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
          "qty": 500
        },
        {
          "item": "Strike Points",
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
          "qty": 1000
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ]
    }
  ]
};
