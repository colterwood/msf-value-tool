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
  "updated": "2026-10-18T19:38:24.883Z",
  "source": "web-store",
  "account": "CZARFACE (level 105)",
  "priceCurrency": "CAD",
  "note": "Read from the logged-in web store (marvelstrikeforce.com/en/store), every section. Cards that show '+N More' hide part of their contents behind the Buy flow; those offers carry a `notes` field and grade as incomplete. Power Core and Ultra Core packs were read from their own cards. Prices are CA$ as shown; the value table converts with meta.fxToUsd.",
  "offers": [
    {
      "name": "Extra Energy Rush",
      "price": 3.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "3d 1h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Campaign Energy",
          "qty": 200
        },
        {
          "item": "Premium Orb Fragments",
          "qty": 4000
        },
        {
          "item": "Strike Points",
          "qty": 300,
          "webBonus": true
        }
      ],
      "description": "Boost your power with extra energy and stack up gold to dominate the campaign!"
    },
    {
      "name": "ISO Fest: T3 Level 1 Ions",
      "price": 3.99,
      "currency": "CAD",
      "purchaseLimit": 92,
      "expires": "1h 21m",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "qty": 6000000
        },
        {
          "item": "T3 Level 1 Ions",
          "qty": 3000000
        },
        {
          "item": "Basic T3 Iso-8 Orb Fragments",
          "qty": 30000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 300,
          "webBonus": true
        }
      ],
      "description": "Get a supply of T3 Level 1 Ions, also gain progress in the ISO Fest Milestone!"
    },
    {
      "name": "Golden Boost",
      "price": 3.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "4d",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / FOR NEW PLAYERS"
      ],
      "contents": [
        {
          "item": "Gold",
          "qty": 2000000
        },
        {
          "item": "T2 Ability Material",
          "qty": 2000
        },
        {
          "item": "T3 Ability Material",
          "qty": 1000
        },
        {
          "item": "L3 Training Module",
          "qty": 500
        },
        {
          "item": "Strike Points",
          "qty": 300,
          "webBonus": true
        }
      ],
      "description": "Boost the ability and capability of your roster with this limited time offer!"
    },
    {
      "name": "Override Orb",
      "price": 49.99,
      "currency": "CAD",
      "purchaseLimit": 8,
      "expires": "1h 21m",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / NEW CHARACTERS"
      ],
      "contents": [
        {
          "item": "Override Orb Fragments",
          "qty": 2000
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 111000000
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
      "description": "Each Override Orb contains up to 410 Jocasta shards with 50 shards guaranteed! She sustains team with Repair, heals Tech allies, and calls coordinated attacks!"
    },
    {
      "name": "Raid Warzone: Mega Pack",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1h 21m",
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
      "name": "Iron Vengeance: Iron Raiders",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 2,
      "expires": "1h 21m",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 300000000
        },
        {
          "item": "Iron Raiders Mega Orb Fragments",
          "qty": 2000
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 15000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Open this Orb for a chance to get 810 Shards for Iron Raiders, plus a bunch of points toward the Iron Vengeance Milestone!"
    },
    {
      "name": "Iron Vengeance: Amazing Avengers",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 2,
      "expires": "1h 21m",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 300000000
        },
        {
          "item": "Amazing Avengers Mega Orb Fragments",
          "qty": 2000
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 15000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Open this Orb for a chance to get 810 Shards for Amazing Avengers, plus a bunch of points toward the Iron Vengeance Milestone!"
    },
    {
      "name": "Iron Vengeance: Ultimate Pack",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 50,
      "expires": "1h 21m",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 450000000
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 22500000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Get ahead in the Iron Vengeance Leaderboard to secure 5-Diamond for Spider-Woman (Julia), Rachel Cole-Alves, and Blade (Mighty)!"
    },
    {
      "name": "Premium Plus Chapter Battle Pass Ticket Pack",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 2,
      "expires": "1h 21m",
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
      "name": "(1/6) Boot Sequence",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1h 21m",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Jocasta",
          "qty": 45
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 76000000
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
      "description": "A special launch offer has appeared for you! Recruit Jocasta, and grab points toward the Iron Vengeance Milestone event!",
      "chain": true
    },
    {
      "name": "Kestrel Starter",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Kestrel (Zombie)",
          "qty": 80
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Fuel Kestrel (Zombie)'s power and let your Undying overwhelm every opponent in their path!",
      "chain": true
    },
    {
      "name": "Training Overdrive (1/5)",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "L4 Training Module",
          "qty": 900
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Ready to train your roster? Start here!",
      "chain": true
    },
    {
      "name": "Amazing Avengers Surge (option 1)",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": null,
      "expires": "1h 21m",
      "section": "dual offers",
      "sections": [
        "dual offers"
      ],
      "contents": [
        {
          "item": "Gold",
          "qty": 200000000
        },
        {
          "item": "Spider-Woman (Julia)",
          "qty": 200
        },
        {
          "item": "Rachel Cole-Alves",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ]
    },
    {
      "name": "Amazing Avengers Surge (option 2)",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": null,
      "expires": "1h 21m",
      "section": "dual offers",
      "sections": [
        "dual offers"
      ],
      "contents": [
        {
          "item": "Gold",
          "qty": 50000000
        },
        {
          "item": "Spider-Woman (Julia)",
          "qty": 50
        },
        {
          "item": "Rachel Cole-Alves",
          "qty": 50
        },
        {
          "item": "Strike Points",
          "qty": 1500,
          "webBonus": true
        }
      ]
    },
    {
      "name": "Sorcerer Supreme Offer",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 2,
      "expires": "4d",
      "section": "Offers / FOR NEW PLAYERS",
      "sections": [
        "Offers / FOR NEW PLAYERS"
      ],
      "contents": [
        {
          "item": "Strange (Heartless)",
          "qty": 55
        },
        {
          "item": "Improved Arcane Powder",
          "qty": 50
        },
        {
          "item": "Improved Vial",
          "qty": 50
        },
        {
          "item": "Improved Parchment",
          "qty": 50
        },
        {
          "item": "Improved Sigil",
          "qty": 50
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Gain the upper hand with this offer for 55 Doctor Strange shards; use his ability to flip positive effects and revive fallen teammates."
    },
    {
      "name": "Web of the Future",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 2,
      "expires": "4d",
      "section": "Offers / FOR NEW PLAYERS",
      "sections": [
        "Offers / FOR NEW PLAYERS"
      ],
      "contents": [
        {
          "item": "Spider-Man 2099",
          "qty": 100
        },
        {
          "item": "Improved Isomer",
          "qty": 80
        },
        {
          "item": "Improved MRI",
          "qty": 80
        },
        {
          "item": "Improved X-Rays",
          "qty": 80
        },
        {
          "item": "Improved Syringe",
          "qty": 80
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Get 100 Spider-Man 2099 shards and send enemies to a painful future! Apply negative effects and grant Tangled Web allies Drain, Focus, and Resistance."
    },
    {
      "name": "MEGA Override Orb",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "1h 21m",
      "section": "Offers / NEW CHARACTERS",
      "sections": [
        "Offers / NEW CHARACTERS"
      ],
      "contents": [
        {
          "item": "MEGA Override Orb Fragments",
          "qty": 2000
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 300000000
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Open MEGA Override Orb for a guaranteed 4-Yellow-Star Jocasta, with a chance up to 7 Yellow Stars!"
    },
    {
      "name": "Secret Warrior Diamond",
      "price": 179.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / WEB EXCLUSIVE",
      "sections": [
        "Offers / WEB EXCLUSIVE"
      ],
      "contents": [
        {
          "item": "Phantom Rider",
          "qty": 1
        },
        {
          "item": "Yo-Yo",
          "qty": 1
        },
        {
          "item": "Domino",
          "qty": 1
        },
        {
          "item": "Quake",
          "qty": 1
        },
        {
          "item": "Negasonic",
          "qty": 1
        }
      ],
      "description": "Empower your Secret Warriors with 5-Diamond power and unleash their full potential!",
      "notes": "6 more item(s) not shown on the card"
    },
    {
      "name": "Vampire Slayer",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 19h",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Crimson Ritual Salts",
          "qty": 105
        },
        {
          "item": "Crimson Psionic Essence",
          "qty": 105
        },
        {
          "item": "Crimson Tempered Osmium",
          "qty": 50
        },
        {
          "item": "Crimson Sigil",
          "qty": 50
        },
        {
          "item": "Crimson Mythic Geode",
          "qty": 50
        }
      ],
      "description": "Get all the Crimson Mini Uniques you need to reach GT21 with your newest team member!",
      "notes": "10 more item(s) not shown on the card"
    },
    {
      "name": "Cosmic Showman",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 19h",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Crimson Ritual Salts",
          "qty": 105
        },
        {
          "item": "Crimson Psionic Essence",
          "qty": 105
        },
        {
          "item": "Crimson Focused Chi",
          "qty": 50
        },
        {
          "item": "Crimson Sigil",
          "qty": 50
        },
        {
          "item": "Crimson Mythic Geode",
          "qty": 50
        }
      ],
      "description": "Get all the Crimson Mini Uniques you need to reach GT21 with your newest team member!",
      "notes": "10 more item(s) not shown on the card"
    },
    {
      "name": "Quantum Energy",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 19h",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Gold",
          "qty": 10000000
        },
        {
          "item": "Crimson Basic Catalyst Part",
          "qty": 5250
        },
        {
          "item": "Crimson Arcane Powder",
          "qty": 1890
        },
        {
          "item": "Crimson Health Catalyst Part",
          "qty": 1830
        },
        {
          "item": "Crimson Esoteric Glyphs",
          "qty": 1575
        }
      ],
      "description": "Get all the Crimson Mini Uniques you need to reach GT21 with your newest team member!",
      "notes": "13 more item(s) not shown on the card"
    },
    {
      "name": "Unlock Special: Level 110 Gold Boost",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "8h 54m",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Gold",
          "qty": 50000000
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "description": "All the Gold needed to reach Level 110 with your newest recruit!"
    },
    {
      "name": "Unlock Special: Level 100 Gold Boost",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "8h 54m",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Gold",
          "qty": 24000000
        },
        {
          "item": "Strike Points",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "description": "All the Gold needed to reach Level 100 with your newest recruit!"
    },
    {
      "name": "Unlock Special: Level 110 Training Boost",
      "price": 79.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "8h 54m",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "L4 Training Module",
          "qty": 4800
        },
        {
          "item": "Strike Points",
          "qty": 6000,
          "webBonus": true
        }
      ],
      "description": "Get all the L4 Training Materials needed to reach Level 110 with your latest character!"
    },
    {
      "name": "Unlock Special: Level 100 Training Boost",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "8h 54m",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "L4 Training Module",
          "qty": 2345
        },
        {
          "item": "Strike Points",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "description": "Get all the L4 Training Materials needed to reach Level 100 with your latest character!"
    },
    {
      "name": "Unlock Special: Perfect Skills",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "8h 54m",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "T4 Ability Material",
          "qty": 1000
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
      "expires": "8h 54m",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Crimson Uru",
          "qty": 45
        },
        {
          "item": "Crimson Phytonutrients",
          "qty": 75
        },
        {
          "item": "Crimson Isochronal Compound",
          "qty": 90
        },
        {
          "item": "Crimson Chaotic Ribosomes",
          "qty": 75
        },
        {
          "item": "Crimson Adaptive Pathogens",
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
      "expires": "8h 54m",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Crimson Spliced X-Gene",
          "qty": 700
        },
        {
          "item": "Crimson Cytoplasm",
          "qty": 575
        },
        {
          "item": "Crimson Metabolic Enhancers",
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
      "expires": "8h 54m",
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
          "qty": 200
        },
        {
          "item": "Crimson Focus Catalyst Part",
          "qty": 630
        },
        {
          "item": "Crimson Health Catalyst Part",
          "qty": 350
        },
        {
          "item": "Crimson Resistance Catalyst Part",
          "qty": 100
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Get all the Crimson Catalysts you need to reach GT20 with your newest roster addition!"
    },
    {
      "name": "Unlock Special: T3 Ion Max",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "8h 54m",
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
          "qty": 500,
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
      "expires": "8h 54m",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "T3 Blaster Armor Level 1 Iso-8",
          "qty": 81
        },
        {
          "item": "T3 Blaster Damage Level 1 Iso-8",
          "qty": 81
        },
        {
          "item": "T3 Blaster Focus Level 1 Iso-8",
          "qty": 81
        },
        {
          "item": "T3 Blaster Health Level 1 Iso-8",
          "qty": 81
        },
        {
          "item": "T3 Blaster Resist Level 1 Iso-8",
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
      "name": "Nature's Wrath",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "2d 8h",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Gold",
          "qty": 10000000
        },
        {
          "item": "Crimson Basic Catalyst Part",
          "qty": 5250
        },
        {
          "item": "Crimson Spliced X-Gene",
          "qty": 1950
        },
        {
          "item": "Crimson Focus Catalyst Part",
          "qty": 1830
        },
        {
          "item": "Crimson Cytoplasm",
          "qty": 1625
        }
      ],
      "description": "Get all the Crimson Mini Uniques you need to reach GT21 with your newest team member!",
      "notes": "13 more item(s) not shown on the card"
    },
    {
      "name": "Phantom Rider Ascendant",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Phantom Rider",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Elevate Phantom Rider to 3-Diamond and unleash his growing power!"
    },
    {
      "name": "Unstoppable Yo-Yo",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Yo-Yo",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Elevate Yo-Yo to 3-Diamond and enhance her battlefield potential!"
    },
    {
      "name": "Lucky Break",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Domino",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Elevate Domino to 3-Diamond and let luck favor your battles!"
    },
    {
      "name": "Earthshaker",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Quake",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Elevate Quake to 3-Diamond and amplify her battlefield impact!"
    },
    {
      "name": "Explosive Potential",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Negasonic",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Elevate Negasonic to 3-Diamond and unleash her explosive potential!"
    },
    {
      "name": "Phantom Rider Ascendant",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Phantom Rider",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Boost Phantom Rider to 2-Diamond and strengthen his combat prowess!"
    },
    {
      "name": "Unstoppable Yo-Yo",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Yo-Yo",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Boost Yo-Yo to 2-Diamond and strengthen her battlefield presence!"
    },
    {
      "name": "Lucky Break",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Domino",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Boost Domino to 2-Diamond and turn the odds in your favor!"
    },
    {
      "name": "Earthshaker",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Quake",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Boost Quake to 2-Diamond and strengthen her seismic power!"
    },
    {
      "name": "Explosive Potential",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Negasonic",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Boost Negasonic to 2-Diamond and unleash more explosive power!"
    },
    {
      "name": "Phantom Rider Elite Strike",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Phantom Rider",
          "qty": 310
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Strengthen Phantom Rider with character shards and bring him closer to his full potential!"
    },
    {
      "name": "Phantom Rider Ultimate Strike",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Phantom Rider",
          "qty": 810
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Power up Phantom Rider with character shards and maximize his combat potential!"
    },
    {
      "name": "Yo-Yo Elite Strike",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Yo-Yo",
          "qty": 310
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Strengthen Yo-Yo with character shards and enhance her abilities!"
    },
    {
      "name": "Yo-Yo Ultimate Strike",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Yo-Yo",
          "qty": 810
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Power up Yo-Yo with character shards and maximize her battlefield potential!"
    },
    {
      "name": "Domino Elite Strike",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Domino",
          "qty": 310
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Strengthen Domino with character shards and let luck lead the way!"
    },
    {
      "name": "Domino Ultimate Strike",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Domino",
          "qty": 810
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Power up Domino with character shards and maximize her combat potential!"
    },
    {
      "name": "Quake Elite Strike",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Quake",
          "qty": 310
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Strengthen Quake with character shards and amplify her power!"
    },
    {
      "name": "Quake Ultimate Strike",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Quake",
          "qty": 810
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Power up Quake with character shards and maximize her battlefield impact!"
    },
    {
      "name": "Negasonic Elite Strike",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Negasonic",
          "qty": 310
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Strengthen Negasonic with character shards and unleash her explosive potential!"
    },
    {
      "name": "Negasonic Ultimate Strike",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Negasonic",
          "qty": 810
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Power up Negasonic with character shards and maximize her destructive power!"
    },
    {
      "name": "Secret Warrior Strike",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Yo-Yo",
          "qty": 310
        },
        {
          "item": "Domino",
          "qty": 310
        },
        {
          "item": "Quake",
          "qty": 310
        },
        {
          "item": "Negasonic",
          "qty": 310
        },
        {
          "item": "Strike Points",
          "qty": 1500,
          "webBonus": true
        }
      ],
      "description": "Rally your Secret Warriors with character shards for four members of the team and strengthen your squad!"
    },
    {
      "name": "Phantom Rider Awakening",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Phantom Rider's Basic Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Phantom Rider's Special Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Phantom Rider's Ultimate Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Unlock the full potential of Phantom Rider with materials to upgrade all three Awakened Abilities!"
    },
    {
      "name": "Phantom Rider Awakening",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Phantom Rider's Basic Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Enhance Phantom Rider with materials to upgrade his Basic Awakened Ability!"
    },
    {
      "name": "Phantom Rider Awakening",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Phantom Rider's Special Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Empower Phantom Rider with materials to upgrade his Special Awakened Ability!"
    },
    {
      "name": "Phantom Rider Awakening",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Phantom Rider's Ultimate Awakened Ability Material",
          "qty": 200
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Unleash the full force of Phantom Rider with materials to upgrade his Ultimate Awakened Ability!"
    },
    {
      "name": "Ability Essentials Bundle",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "T2 Ability Material",
          "qty": 200
        },
        {
          "item": "T1 Ability Material",
          "qty": 200
        },
        {
          "item": "T4 Ability Material",
          "qty": 140
        },
        {
          "item": "T3 Ability Material",
          "qty": 300
        },
        {
          "item": "T2 Ability Material",
          "qty": 20,
          "webBonus": true
        }
      ],
      "description": "Stock up Ability Materials to upgrade your roster now!",
      "notes": "4 more item(s) not shown on the card"
    },
    {
      "name": "Ability Value Bundle",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "3d 1h",
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
      "description": "Get the edge on your opponents with T4 Ability Materials bundle!"
    },
    {
      "name": "Ability Ultimate Bundle",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "3d 1h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "T4 Ability Material",
          "qty": 890
        },
        {
          "item": "T4 Ability Material",
          "qty": 90,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Take your roster to new heights of power by unlocking their potential with this pack of Ability Materials!"
    },
    {
      "name": "Power Up Your Squad",
      "price": 59.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1h 21m",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Silver Surfer (Breaker)",
          "qty": null
        },
        {
          "item": "Ebony Maw",
          "qty": null
        },
        {
          "item": "Cull Obsidian",
          "qty": null
        },
        {
          "item": "Minn-Erva",
          "qty": null
        },
        {
          "item": "Ronan the Accuser",
          "qty": null
        }
      ],
      "description": "Start promoting your roster with a special limited time offer today!",
      "notes": "qty unreadable for Silver Surfer (Breaker); qty unreadable for Ebony Maw; qty unreadable for Cull Obsidian; qty unreadable for Minn-Erva; qty unreadable for Ronan the Accuser; 2 more item(s) not shown on the card"
    },
    {
      "name": "Shadow Conclave Boost Up",
      "price": 59.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1h 21m",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Malekith",
          "qty": null
        },
        {
          "item": "Executioner",
          "qty": null
        },
        {
          "item": "High Evolutionary",
          "qty": null
        },
        {
          "item": "Sylvie",
          "qty": null
        },
        {
          "item": "Thanos",
          "qty": null
        }
      ],
      "description": "Boost up your Shadow Conclave team's power with this special offer and strengthen your squad!",
      "notes": "qty unreadable for Malekith; qty unreadable for Executioner; qty unreadable for High Evolutionary; qty unreadable for Sylvie; qty unreadable for Thanos; 2 more item(s) not shown on the card"
    },
    {
      "name": "Shadow Conclave Combo",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1h 21m",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Malekith",
          "qty": null
        },
        {
          "item": "Executioner",
          "qty": null
        },
        {
          "item": "High Evolutionary",
          "qty": null
        },
        {
          "item": "Sylvie",
          "qty": null
        },
        {
          "item": "Thanos",
          "qty": null
        }
      ],
      "description": "Don't miss this chance to power up your Shadow Conclave team!",
      "notes": "qty unreadable for Malekith; qty unreadable for Executioner; qty unreadable for High Evolutionary; qty unreadable for Sylvie; qty unreadable for Thanos; 2 more item(s) not shown on the card"
    },
    {
      "name": "Symbiote Six Boost Up",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1h 21m",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "Quicksilver (Symbiote)",
          "qty": null
        },
        {
          "item": "Toxin",
          "qty": null
        },
        {
          "item": "Riot",
          "qty": null
        },
        {
          "item": "Venom",
          "qty": null
        },
        {
          "item": "Gold",
          "qty": 2040000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "description": "Boost up your Symbiote Six team's power with this special offer and strengthen your squad!",
      "notes": "qty unreadable for Quicksilver (Symbiote); qty unreadable for Toxin; qty unreadable for Riot; qty unreadable for Venom"
    },
    {
      "name": "Halloween Haul",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "15d 1h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Halloween Orb Fragments",
          "qty": 10000
        },
        {
          "item": "Extra-SPOOKY Orb Fragments",
          "qty": 1600
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "There's something powerful lurking inside! Seize it and see what treats await!"
    },
    {
      "name": "Trick-or-Orb",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "15d 1h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Halloween Orb Fragments",
          "qty": 2000
        },
        {
          "item": "Extra-SPOOKY Orb Fragments",
          "qty": 400
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "It's time to Trick or Treat! Add some extra fright to your roster with Shards, Red Stars, and Diamond upgrades!"
    },
    {
      "name": "GT21 Mutant Calendar",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1h 21m",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "GT21 Mutant Calendar",
          "qty": null
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "description": "Login daily to claim a cache of valuable Gear Tier 21 Mini-Unique, Crimson Catalyst Parts and Gold!",
      "notes": "qty unreadable for GT21 Mutant Calendar"
    },
    {
      "name": "Kestrel (Zombie) Booster",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 8,
      "expires": "3d 1h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Kestrel (Zombie)",
          "qty": 50
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Upgrade Kestrel (Zombie) and strengthen your Undying to dominate Alliance War"
    },
    {
      "name": "Scarlet Witch (Zombie) Booster",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 8,
      "expires": "3d 1h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Scarlet Witch (Zombie)",
          "qty": 300
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Raise the stakes with Scarlet Witch (Zombie) and turn your Undying into a nightmare that never dies!"
    },
    {
      "name": "Juggernaut (Zombie) Booster",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 8,
      "expires": "3d 1h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Juggernaut (Zombie)",
          "qty": 300
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Death is only the beginning! Empower Juggernaut (Zombie) and unleash the terror of your Undying!"
    },
    {
      "name": "Iron Man (Zombie) Booster",
      "price": 3.99,
      "currency": "CAD",
      "purchaseLimit": 8,
      "expires": "3d 1h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Iron Man (Zombie)",
          "qty": 300
        },
        {
          "item": "Strike Points",
          "qty": 300,
          "webBonus": true
        }
      ],
      "description": "Take Iron Man (Zombie) to the next level and make your Undying even deadlier!"
    },
    {
      "name": "Hela Booster",
      "price": 3.99,
      "currency": "CAD",
      "purchaseLimit": 8,
      "expires": "3d 1h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Hela",
          "qty": 300
        },
        {
          "item": "Strike Points",
          "qty": 300,
          "webBonus": true
        }
      ],
      "description": "The dead grow stronger! Upgrade Hela and let the nightmare begin!"
    },
    {
      "name": "Undying Rising",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "3d 1h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Kestrel (Zombie)",
          "qty": 300
        },
        {
          "item": "Scarlet Witch (Zombie)",
          "qty": 300
        },
        {
          "item": "Juggernaut (Zombie)",
          "qty": 300
        },
        {
          "item": "Iron Man (Zombie)",
          "qty": 300
        },
        {
          "item": "Hela",
          "qty": 300
        },
        {
          "item": "Strike Points",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "description": "Raise your power with the Undying and overwhelm your foes with relentless destruction!"
    },
    {
      "name": "Kestrel (Zombie) Diamond Ascension",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Kestrel (Zombie)",
          "qty": 1
        },
        {
          "item": "Kestrel (Zombie)",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Boost Kestrel (Zombie) to 3-Diamond and unleash the undead terror"
    },
    {
      "name": "Scarlet Witch (Zombie) 3-Diamond",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Scarlet Witch (Zombie)",
          "qty": 1
        },
        {
          "item": "Scarlet Witch (Zombie)",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Upgrade Scarlet Witch (Zombie) to 3-Diamond and turn your Undying into a force to be reckoned with!"
    },
    {
      "name": "Juggernaut (Zombie) 3-Diamond",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Juggernaut (Zombie)",
          "qty": 1
        },
        {
          "item": "Juggernaut (Zombie)",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Turn Juggernaut (Zombie) into an unbreakable force with a 3-Diamond upgrade!"
    },
    {
      "name": "Iron Man (Zombie) 3-Diamond",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Iron Man (Zombie)",
          "qty": 1
        },
        {
          "item": "Iron Man (Zombie)",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Let death reign supreme! Upgrade Iron Man (Zombie) to 3-Diamond and unleash your Undying!"
    },
    {
      "name": "Hela 3-Diamond",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Hela",
          "qty": 1
        },
        {
          "item": "Hela",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Give Hela a 3-Diamond upgrade and let her bring death to all who oppose the Undying!"
    },
    {
      "name": "Undying Full Team 3-Diamond",
      "price": 49.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "3d 1h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Kestrel (Zombie)",
          "qty": 1
        },
        {
          "item": "Scarlet Witch (Zombie)",
          "qty": 1
        },
        {
          "item": "Juggernaut (Zombie)",
          "qty": 1
        },
        {
          "item": "Iron Man (Zombie)",
          "qty": 1
        },
        {
          "item": "Hela",
          "qty": 1
        }
      ],
      "description": "Let your Undying bring death to those who stand in their way with 3-Diamond upgrade!",
      "notes": "6 more item(s) not shown on the card"
    },
    {
      "name": "Thena Power Pack",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 2,
      "expires": "1h 21m",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Crimson Armor Catalyst Part",
          "qty": 125
        },
        {
          "item": "Crimson Basic Catalyst Part",
          "qty": 437
        },
        {
          "item": "Crimson Damage Catalyst Part",
          "qty": 50
        },
        {
          "item": "Crimson Focus Catalyst Part",
          "qty": 50
        },
        {
          "item": "Crimson Health Catalyst Part",
          "qty": 225
        }
      ],
      "description": "Don't miss this chance to power up your Thena!",
      "notes": "10 more item(s) not shown on the card"
    },
    {
      "name": "Gilgamesh Power Pack",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 2,
      "expires": "1h 21m",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Crimson Armor Catalyst Part",
          "qty": 50
        },
        {
          "item": "Crimson Basic Catalyst Part",
          "qty": 437
        },
        {
          "item": "Crimson Damage Catalyst Part",
          "qty": 125
        },
        {
          "item": "Crimson Focus Catalyst Part",
          "qty": 50
        },
        {
          "item": "Crimson Health Catalyst Part",
          "qty": 225
        }
      ],
      "description": "Don't miss this chance to power up your Gilgamesh!",
      "notes": "10 more item(s) not shown on the card"
    },
    {
      "name": "Thena Power Pack",
      "price": 49.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1h 21m",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Thena",
          "qty": 130
        },
        {
          "item": "Gold",
          "qty": 20000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 4000,
          "webBonus": true
        }
      ],
      "description": "Don't miss this chance to power up your Thena!"
    },
    {
      "name": "Gilgamesh Power Pack",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1h 21m",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Gilgamesh",
          "qty": 220
        },
        {
          "item": "Gold",
          "qty": 25000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "description": "Don't miss this chance to power up your Gilgamesh!"
    },
    {
      "name": "Age of Fear: T3 Ions Bundle",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 1h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "T3 Level 5 Ions",
          "qty": 8970000
        },
        {
          "item": "T3 Level 4 Ions",
          "qty": 8970000
        },
        {
          "item": "T3 Level 5 Ions",
          "qty": 900000,
          "webBonus": true
        },
        {
          "item": "T3 Level 4 Ions",
          "qty": 900000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "description": "Push your strongest characters beyond their limits with this elite upgrade bundle."
    },
    {
      "name": "Age of Fear: Training Modules",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 1h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "L4 Training Module",
          "qty": 6600
        },
        {
          "item": "L4 Training Module",
          "qty": 660,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "description": "Level up fast and leave the competition in the shadows!"
    },
    {
      "name": "Gold Galore",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "1d 1h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Gold",
          "qty": 10000000
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Limited time savings is HERE! Unbelievable gold value you cannot miss out on!"
    },
    {
      "name": "Gold Galore",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "1d 1h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Gold",
          "qty": 24000000
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Limited time savings is HERE! Unbelievable gold value you cannot miss out on!"
    },
    {
      "name": "Gold Galore",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "1d 1h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Gold",
          "qty": 85000000
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "description": "Limited time savings is HERE! Unbelievable gold value you cannot miss out on!"
    },
    {
      "name": "Raid Warzone: Daily Allied Supply",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "1h 21m",
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
          "item": "Allied Supply XII Orb Fragments",
          "qty": 12000
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Get Allied Supply XII Orbs for Raid Warzone progress!"
    },
    {
      "name": "Raid Warzone: Daily Allied Supply",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "1h 21m",
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
          "item": "Allied Supply XII Orb Fragments",
          "qty": 4000
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Get Allied Supply XII Orbs for Raid Warzone progress!"
    },
    {
      "name": "Raid Warzone: Special Bundle",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 4,
      "expires": "1h 21m",
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
      "expires": "1h 21m",
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
      "name": "Iron Vengeance: Whiplash",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 16,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 60000000
        },
        {
          "item": "Whiplash",
          "qty": 50
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 3000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "description": "Get Whiplash Shards to power up this hero and also grab a bunch of points to gain progress in the Iron Vengeance Milestone!"
    },
    {
      "name": "Iron Vengeance: Whiplash",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 2,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 300000000
        },
        {
          "item": "Whiplash",
          "qty": 300
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 15000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Get Whiplash Shards to power up this hero and also grab a bunch of points to gain progress in the Iron Vengeance Milestone!"
    },
    {
      "name": "Iron Vengeance: Ulysses Klaue",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 16,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 60000000
        },
        {
          "item": "Ulysses Klaue",
          "qty": 50
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 3000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "description": "Get Ulysses Klaue Shards to power up this hero and also grab a bunch of points to gain progress in the Iron Vengeance Milestone!"
    },
    {
      "name": "Iron Vengeance: Ulysses Klaue",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 2,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 300000000
        },
        {
          "item": "Ulysses Klaue",
          "qty": 300
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 15000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Get Ulysses Klaue Shards to power up this hero and also grab a bunch of points to gain progress in the Iron Vengeance Milestone!"
    },
    {
      "name": "Iron Vengeance: Iron Monger",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 16,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 60000000
        },
        {
          "item": "Iron Monger",
          "qty": 50
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 3000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "description": "Get Iron Monger Shards to power up this hero and also grab a bunch of points to gain progress in the Iron Vengeance Milestone!"
    },
    {
      "name": "Iron Vengeance: Iron Monger",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 2,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 300000000
        },
        {
          "item": "Iron Monger",
          "qty": 300
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 15000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Get Iron Monger Shards to power up this hero and also grab a bunch of points to gain progress in the Iron Vengeance Milestone!"
    },
    {
      "name": "Iron Vengeance: Spider-Woman (Julia)",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 8,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 60000000
        },
        {
          "item": "Spider-Woman (Julia)",
          "qty": 100
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 3000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "description": "Get Spider-Woman (Julia) Shards to power up this hero and also grab a bunch of points to gain progress in the Iron Vengeance Milestone!"
    },
    {
      "name": "Iron Vengeance: Spider-Woman (Julia)",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 300000000
        },
        {
          "item": "Spider-Woman (Julia)",
          "qty": 500
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 15000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Get Spider-Woman (Julia) Shards to power up this hero and also grab a bunch of points to gain progress in the Iron Vengeance Milestone!"
    },
    {
      "name": "Iron Vengeance: Rachel Cole-Alves",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 8,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 60000000
        },
        {
          "item": "Rachel Cole-Alves",
          "qty": 100
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 3000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "description": "Get Rachel Cole-Alves Shards to power up this hero and also grab a bunch of points to gain progress in the Iron Vengeance Milestone!"
    },
    {
      "name": "Iron Vengeance: Rachel Cole-Alves",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 300000000
        },
        {
          "item": "Rachel Cole-Alves",
          "qty": 500
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 15000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Get Rachel Cole-Alves Shards to power up this hero and also grab a bunch of points to gain progress in the Iron Vengeance Milestone!"
    },
    {
      "name": "Iron Vengeance: Blade (Mighty)",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 8,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 60000000
        },
        {
          "item": "Blade (Mighty)",
          "qty": 100
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 3000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "description": "Get Blade (Mighty) Shards to power up this hero and also grab a bunch of points to gain progress in the Iron Vengeance Milestone!"
    },
    {
      "name": "Iron Vengeance: Blade (Mighty)",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 300000000
        },
        {
          "item": "Blade (Mighty)",
          "qty": 500
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 15000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Get Blade (Mighty) Shards to power up this hero and also grab a bunch of points to gain progress in the Iron Vengeance Milestone!"
    },
    {
      "name": "Iron Vengeance: Hulk",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 75000000
        },
        {
          "item": "Hulk",
          "qty": 810
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 3750000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Get Hulk Shards to power up this hero and also grab a bunch of points to gain progress in the Iron Vengeance Milestone!"
    },
    {
      "name": "Iron Vengeance: Spider-Man",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 75000000
        },
        {
          "item": "Spider-Man",
          "qty": 810
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 3750000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Get Spider-Man Shards to power up this hero and also grab a bunch of points to gain progress in the Iron Vengeance Milestone!"
    },
    {
      "name": "Iron Vengeance: Yellowjacket",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 75000000
        },
        {
          "item": "Yellowjacket",
          "qty": 810
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 3750000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Get Yellowjacket Shards to power up this hero and also grab a bunch of points to gain progress in the Iron Vengeance Milestone!"
    },
    {
      "name": "Iron Vengeance: Crossbones",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 75000000
        },
        {
          "item": "Crossbones",
          "qty": 810
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 3750000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Get Crossbones Shards to power up this hero and also grab a bunch of points to gain progress in the Iron Vengeance Milestone!"
    },
    {
      "name": "Iron Vengeance: Crimson Elite Orb",
      "price": 3.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 4500000
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
      "description": "Earn Gear Tier 19 and 20 Mini-Unique, and also grab a bunch of points to gain progress in the Iron Vengeance Milestone!"
    },
    {
      "name": "Iron Vengeance: GT21 Mutant",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 300000000
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
          "item": "Gold",
          "qty": 10000000
        },
        {
          "item": "Crimson Health Catalyst Part",
          "qty": 1200
        }
      ],
      "description": "Earn Gear Tier 21 Mutant Mini-Unique, and also grab a bunch of points to gain progress in the Iron Vengeance Milestone!",
      "notes": "7 more item(s) not shown on the card"
    },
    {
      "name": "Iron Vengeance: GT21 Tech",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 300000000
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
          "item": "Gold",
          "qty": 10000000
        },
        {
          "item": "Crimson Health Catalyst Part",
          "qty": 1200
        }
      ],
      "description": "Earn Gear Tier 21 Tech Mini-Unique, and also grab a bunch of points to gain progress in the Iron Vengeance Milestone!",
      "notes": "7 more item(s) not shown on the card"
    },
    {
      "name": "Iron Vengeance: GT21 Bio",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 300000000
        },
        {
          "item": "Crimson Hyperphage",
          "qty": 105
        },
        {
          "item": "Crimson Nebulizer",
          "qty": 105
        },
        {
          "item": "Gold",
          "qty": 10000000
        },
        {
          "item": "Crimson Health Catalyst Part",
          "qty": 1200
        }
      ],
      "description": "Earn Gear Tier 21 Bio Mini-Unique, and also grab a bunch of points to gain progress in the Iron Vengeance Milestone!",
      "notes": "7 more item(s) not shown on the card"
    },
    {
      "name": "Iron Vengeance: GT21 Skill",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 300000000
        },
        {
          "item": "Crimson Remote Access Codes",
          "qty": 105
        },
        {
          "item": "Crimson Security Bypass",
          "qty": 105
        },
        {
          "item": "Gold",
          "qty": 10000000
        },
        {
          "item": "Crimson Health Catalyst Part",
          "qty": 1200
        }
      ],
      "description": "Earn Gear Tier 21 Skill Mini-Unique, and also grab a bunch of points to gain progress in the Iron Vengeance Milestone!",
      "notes": "7 more item(s) not shown on the card"
    },
    {
      "name": "Iron Vengeance: GT21 Mystic",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 300000000
        },
        {
          "item": "Crimson Psionic Essence",
          "qty": 105
        },
        {
          "item": "Crimson Ritual Salts",
          "qty": 105
        },
        {
          "item": "Gold",
          "qty": 10000000
        },
        {
          "item": "Crimson Health Catalyst Part",
          "qty": 1200
        }
      ],
      "description": "Earn Gear Tier 21 Mystic Mini-Unique, and also grab a bunch of points to gain progress in the Iron Vengeance Milestone!",
      "notes": "7 more item(s) not shown on the card"
    },
    {
      "name": "Iron Vengeance: Ions Special",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 30000000
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
          "item": "Iron Vengeance Milestone Points",
          "qty": 1500000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 1500,
          "webBonus": true
        }
      ],
      "description": "Earn T3 Level 4 and Level 5 Ions, and also gain progress in the Iron Vengeance Milestone!"
    },
    {
      "name": "Iron Vengeance: Orange Mega Orb",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 300000000
        },
        {
          "item": "Orange Mega Orb",
          "qty": 1
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 15000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Open this Orb to stock up on T4 Level 1 Ions and T4 Iso-8 Credits, also gain progress in the Iron Vengeance Milestone! This special Orb will automatically open upon purchase."
    },
    {
      "name": "Iron Vengeance: Ability Power Up",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 45000000
        },
        {
          "item": "T4 Ability Material",
          "qty": 840
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 2250000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Strengthen your roster with T4 Ability Materials and also grab a bunch of points to gain progress in the Iron Vengeance Milestone!"
    },
    {
      "name": "Iron Vengeance: Terrific Training",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 45000000
        },
        {
          "item": "L4 Training Module",
          "qty": 4620
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 2250000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Pick up a great L4 Training Module bundle to level up characters and also grab a bunch of points to gain progress in the Iron Vengeance Milestone!"
    },
    {
      "name": "Iron Vengeance: Power Core Bundle",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 60000000
        },
        {
          "item": "Power Cores",
          "qty": 2500
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 3000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "description": "Grab this deal to seize 2500 Power Cores and also gain progress in the Iron Vengeance Milestone!"
    },
    {
      "name": "Iron Vengeance: Basic Pack",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 75000000
        },
        {
          "item": "Iron Vengeance Milestone Points",
          "qty": 3750000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Get ahead in the Iron Vengeance Leaderboard to secure 5-Diamond for Spider-Woman (Julia), Rachel Cole-Alves, and Blade (Mighty)!"
    },
    {
      "name": "T3 L5 Ions Brawler Pack",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 10,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "qty": 20000000
        },
        {
          "item": "T3 Level 5 Ions",
          "qty": 3000000
        },
        {
          "item": "T3 Level 4 Ions",
          "qty": 3000000
        },
        {
          "item": "T3 Level 1 Ions",
          "qty": 3000000
        },
        {
          "item": "T3 Brawler Armor Level 1 Iso-8",
          "qty": 81
        }
      ],
      "description": "ISO Fest: Earn a supply of T3 Level 5 Ions and T3 Brawler Level 1 Iso-8 Crystals, also gain progress in this Milestone event!",
      "notes": "6 more item(s) not shown on the card"
    },
    {
      "name": "T3 L5 Ions Blaster Pack",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 10,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "qty": 20000000
        },
        {
          "item": "T3 Level 5 Ions",
          "qty": 3000000
        },
        {
          "item": "T3 Level 4 Ions",
          "qty": 3000000
        },
        {
          "item": "T3 Level 1 Ions",
          "qty": 3000000
        },
        {
          "item": "T3 Blaster Armor Level 1 Iso-8",
          "qty": 81
        }
      ],
      "description": "ISO Fest: Earn a supply of T3 Level 5 Ions and T3 Blaster Level 1 Iso-8 Crystals, also gain progress in this Milestone event!",
      "notes": "6 more item(s) not shown on the card"
    },
    {
      "name": "T3 L5 Ions Controller Pack",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 10,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "qty": 20000000
        },
        {
          "item": "T3 Level 5 Ions",
          "qty": 3000000
        },
        {
          "item": "T3 Level 4 Ions",
          "qty": 3000000
        },
        {
          "item": "T3 Level 1 Ions",
          "qty": 3000000
        },
        {
          "item": "T3 Controller Armor Level 1 Iso-8",
          "qty": 81
        }
      ],
      "description": "ISO Fest: Earn a supply of T3 Level 5 Ions and T3 Controller Level 1 Iso-8 Crystals, also gain progress in this Milestone event!",
      "notes": "6 more item(s) not shown on the card"
    },
    {
      "name": "T3 L5 Ions Protector Pack",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 10,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "qty": 20000000
        },
        {
          "item": "T3 Level 5 Ions",
          "qty": 3000000
        },
        {
          "item": "T3 Level 4 Ions",
          "qty": 3000000
        },
        {
          "item": "T3 Level 1 Ions",
          "qty": 3000000
        },
        {
          "item": "T3 Protector Armor Level 1 Iso-8",
          "qty": 81
        }
      ],
      "description": "ISO Fest: Earn a supply of T3 Level 5 Ions and T3 Protector Level 1 Iso-8 Crystals, also gain progress in this Milestone event!",
      "notes": "6 more item(s) not shown on the card"
    },
    {
      "name": "T3 L5 Ions Support Pack",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 10,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "qty": 20000000
        },
        {
          "item": "T3 Level 5 Ions",
          "qty": 3000000
        },
        {
          "item": "T3 Level 4 Ions",
          "qty": 3000000
        },
        {
          "item": "T3 Level 1 Ions",
          "qty": 3000000
        },
        {
          "item": "T3 Support Armor Level 1 Iso-8",
          "qty": 81
        }
      ],
      "description": "ISO Fest: Earn a supply of T3 Level 5 Ions and T3 Support Level 1 Iso-8 Crystals, also gain progress in this Milestone event!",
      "notes": "6 more item(s) not shown on the card"
    },
    {
      "name": "ISO Fest: T3 Level 4 Ions",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 98,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "qty": 10000000
        },
        {
          "item": "T3 Level 4 Ions",
          "qty": 3600000
        },
        {
          "item": "Basic T3 Iso-8 Orb Fragments",
          "qty": 40000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Seize a chance of T3 Level 4 Ions, also gain progress in the ISO Fest Milestone!"
    },
    {
      "name": "ISO Fest: T3 Level 5 Ions",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "qty": 10000000
        },
        {
          "item": "T3 Level 5 Ions",
          "qty": 3000000
        },
        {
          "item": "Basic T3 Iso-8 Orb Fragments",
          "qty": 50000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Secure a trove of T3 Level 5 Ions, also gain progress in the ISO Fest Milestone!"
    },
    {
      "name": "ISO Fest: T3 Level 1 Crystals Pack",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 20,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "qty": 10000000
        },
        {
          "item": "T3 Brawler Armor Level 1 Iso-8",
          "qty": 81
        },
        {
          "item": "T3 Brawler Resist Level 1 Iso-8",
          "qty": 81
        },
        {
          "item": "T3 Brawler Health Level 1 Iso-8",
          "qty": 81
        },
        {
          "item": "T3 Brawler Focus Level 1 Iso-8",
          "qty": 81
        }
      ],
      "description": "Upgrade 1 character of each role trait to T3 Level 5 Iso-8 and also grab a bunch of points to gain progress in the ISO Fest Milestone!",
      "notes": "23 more item(s) not shown on the card"
    },
    {
      "name": "ISO Fest: T3 Level 5 Ions Cache",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "qty": 63000000
        },
        {
          "item": "T3 Level 5 Ions",
          "qty": 10000000
        },
        {
          "item": "T3 Level 4 Ions",
          "qty": 10000000
        },
        {
          "item": "T3 Level 1 Ions",
          "qty": 7500000
        },
        {
          "item": "T3 Level 1 Ions",
          "qty": 2500000
        }
      ],
      "description": "Seize the T3 Level 5 Ions and boost 1 character of each role trait to T3 Level 5 Iso-8, also grab a bunch of points to gain progress in this Milestone event!",
      "notes": "27 more item(s) not shown on the card"
    },
    {
      "name": "ISO Fest: T3 Level 5 Ions Trove",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "qty": 225000000
        },
        {
          "item": "T3 Level 5 Ions",
          "qty": 40000000
        },
        {
          "item": "T3 Level 4 Ions",
          "qty": 40000000
        },
        {
          "item": "T3 Level 1 Ions",
          "qty": 7500000
        },
        {
          "item": "T3 Level 1 Ions",
          "qty": 7500000
        }
      ],
      "description": "Seize the T3 Level 5 Ions and boost 5 characters of each role trait to T3 Level 5 Iso-8, also grab a bunch of points to gain progress in this Milestone event!",
      "notes": "31 more item(s) not shown on the card"
    },
    {
      "name": "ISO Fest: T2 Level 1 Crystals Kit",
      "price": 2.99,
      "currency": "CAD",
      "purchaseLimit": 17,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "qty": 4000000
        },
        {
          "item": "T2 Brawler Armor Level 1 Iso-8",
          "qty": 81
        },
        {
          "item": "T2 Brawler Resist Level 1 Iso-8",
          "qty": 81
        },
        {
          "item": "T2 Brawler Health Level 1 Iso-8",
          "qty": 81
        },
        {
          "item": "T2 Brawler Focus Level 1 Iso-8",
          "qty": 81
        }
      ],
      "description": "Upgrade 1 character of each role trait to T2 Level 5 Iso-8 and also grab a bunch of points to gain progress in the ISO Fest Milestone!",
      "notes": "23 more item(s) not shown on the card"
    },
    {
      "name": "ISO Fest: T2 Level 5 Ions Stash",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "qty": 63000000
        },
        {
          "item": "T2 Level 5 Ions",
          "qty": 10000000
        },
        {
          "item": "T2 Level 5 Ions",
          "qty": 10000000
        },
        {
          "item": "T2 Level 5 Ions",
          "qty": 10000000
        },
        {
          "item": "T2 Level 5 Ions",
          "qty": 4800000
        }
      ],
      "description": "Seize the T2 Level 5 Ions and boost 5 characters of each role trait to T2 Level 5 Iso-8, also grab a bunch of points to gain progress in this Milestone event!",
      "notes": "29 more item(s) not shown on the card"
    },
    {
      "name": "ISO Fest: Orange Mega Orb",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "qty": 225000000
        },
        {
          "item": "Orange Mega Orb",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Open this Orb to stock up on T4 Level 1 Ions and T4 Iso-8 Credits, also gain progress in the ISO Fest Milestone! This special Orb will automatically open upon purchase."
    },
    {
      "name": "ISO Fest: ISO Fest Yellow Orb",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "qty": 10000000
        },
        {
          "item": "ISO-Fest Yellow Orb Fragments",
          "qty": 2000
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Open this Orb to earn up to 810 Shards for select characters, also gain progress in the ISO Fest Milestone!"
    },
    {
      "name": "ISO Fest: ISO Fest Yellow Orb",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "qty": 52500000
        },
        {
          "item": "ISO-Fest Yellow Orb Fragments",
          "qty": 12000
        },
        {
          "item": "Strike Points",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "description": "Open this Orb to earn up to 810 Shards for select characters, also gain progress in the ISO Fest Milestone!"
    },
    {
      "name": "ISO Fest: ISO Fest Yellow Orb",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "qty": 225000000
        },
        {
          "item": "ISO-Fest Yellow Orb Fragments",
          "qty": 50000
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Open this Orb to earn up to 810 Shards for select characters, also gain progress in the ISO Fest Milestone!"
    },
    {
      "name": "ISO Fest: ISO Fest Diamond Orb",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "qty": 20000000
        },
        {
          "item": "ISO-Fest Diamond Orb Fragments",
          "qty": 2000
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Open this Orb to earn up to 4 Diamonds for select characters, also gain progress in the ISO Fest Milestone!"
    },
    {
      "name": "ISO Fest: ISO Fest Diamond Orb",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "qty": 110000000
        },
        {
          "item": "ISO-Fest Diamond Orb Fragments",
          "qty": 12000
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "description": "Open this Orb to earn up to 4 Diamonds for select characters, also gain progress in the ISO Fest Milestone!"
    },
    {
      "name": "ISO Fest: ISO Fest Diamond Orb",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "qty": 225000000
        },
        {
          "item": "ISO-Fest Diamond Orb Fragments",
          "qty": 26000
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Open this Orb to earn up to 4 Diamonds for select characters, also gain progress in the ISO Fest Milestone!"
    },
    {
      "name": "ISO Fest: Points Surge",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 20,
      "expires": "1h 21m",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "ISO Fest Milestone Points",
          "qty": 40000000
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Progress through the ISO Fest Milestone to secure 5-Diamond Knull and 5-Diamond Professor Xavier!"
    },
    {
      "name": "Eternals Radiance: Kingo",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 8,
      "expires": "6d 1h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Eternals Radiance Milestone Points",
          "qty": 250
        },
        {
          "item": "Kingo",
          "qty": 100
        },
        {
          "item": "Strike Points",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "description": "Get Kingo Shards to power up this hero and also grab a bunch of points to gain progress in the Eternals Radiance Milestone!"
    },
    {
      "name": "Eternals Radiance: Gilgamesh",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 8,
      "expires": "6d 1h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Eternals Radiance Milestone Points",
          "qty": 250
        },
        {
          "item": "Gilgamesh",
          "qty": 100
        },
        {
          "item": "Strike Points",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "description": "Get Gilgamesh Shards to power up this hero and also grab a bunch of points to gain progress in the Eternals Radiance Milestone!"
    },
    {
      "name": "Eternals Radiance: Thena",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 8,
      "expires": "6d 1h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Eternals Radiance Milestone Points",
          "qty": 250
        },
        {
          "item": "Thena",
          "qty": 100
        },
        {
          "item": "Strike Points",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "description": "Get Thena Shards to power up this hero and also grab a bunch of points to gain progress in the Eternals Radiance Milestone!"
    },
    {
      "name": "Eternals Radiance: Ikaris",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "6d 1h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Eternals Radiance Milestone Points",
          "qty": 200
        },
        {
          "item": "Ikaris",
          "qty": 810
        },
        {
          "item": "Ikaris",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Max out Ikaris to 7-Red Star and pocket extra Eternals Radiance Milestone points!"
    },
    {
      "name": "Eternals Radiance: Sersi",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "6d 1h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Eternals Radiance Milestone Points",
          "qty": 200
        },
        {
          "item": "Sersi",
          "qty": 810
        },
        {
          "item": "Sersi",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Max out Sersi to 7-Red Star and pocket extra Eternals Radiance Milestone points!"
    },
    {
      "name": "Eternals Radiance: Mega Orb",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "6d 1h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Eternals Radiance Milestone Points",
          "qty": 1000
        },
        {
          "item": "Timeless Eternals Mega Orb Fragment",
          "qty": 2000
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Open this Orb for a chance to get 810 Shards of Gilgamesh, Thena and Kingo, plus a bunch of points toward the Eternals Radiance Milestone!"
    },
    {
      "name": "Eternals Radiance: 4-Diamond Ikaris",
      "price": 49.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "6d 1h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Eternals Radiance Milestone Points",
          "qty": 400
        },
        {
          "item": "Ikaris",
          "qty": 1
        },
        {
          "item": "Ikaris",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 4000,
          "webBonus": true
        }
      ],
      "description": "Supercharge Ikaris to 4-Diamond and gain progress in the Eternals Radiance Milestone!"
    },
    {
      "name": "Eternals Radiance: 4-Diamond Sersi",
      "price": 49.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "6d 1h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Eternals Radiance Milestone Points",
          "qty": 400
        },
        {
          "item": "Sersi",
          "qty": 1
        },
        {
          "item": "Sersi",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 4000,
          "webBonus": true
        }
      ],
      "description": "Supercharge Sersi to 4-Diamond and gain progress in the Eternals Radiance Milestone!"
    },
    {
      "name": "Eternals Radiance: 2-Diamond Kingo",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "6d 1h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Eternals Radiance Milestone Points",
          "qty": 300
        },
        {
          "item": "Kingo",
          "qty": 1
        },
        {
          "item": "Kingo",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "description": "Boost Kingo to 2-Diamond with this bundle along with the Eternals Radiance Milestone progress!"
    },
    {
      "name": "Eternals Radiance: 2-Diamond Gilgamesh",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "6d 1h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Eternals Radiance Milestone Points",
          "qty": 300
        },
        {
          "item": "Gilgamesh",
          "qty": 1
        },
        {
          "item": "Gilgamesh",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "description": "Boost Gilgamesh to 2-Diamond with this bundle along with the Eternals Radiance Milestone progress!"
    },
    {
      "name": "Eternals Radiance: 2-Diamond Thena",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "6d 1h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Eternals Radiance Milestone Points",
          "qty": 300
        },
        {
          "item": "Thena",
          "qty": 1
        },
        {
          "item": "Thena",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "description": "Boost Thena to 2-Diamond with this bundle along with the Eternals Radiance Milestone progress!"
    },
    {
      "name": "Eternals Radiance: 2-Diamond Eternals",
      "price": 79.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "6d 1h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Eternals Radiance Milestone Points",
          "qty": 600
        },
        {
          "item": "Kingo",
          "qty": 1
        },
        {
          "item": "Gilgamesh",
          "qty": 1
        },
        {
          "item": "Thena",
          "qty": 1
        },
        {
          "item": "Ikaris",
          "qty": 1
        }
      ],
      "description": "Power up your Timeless Eternals team to 2-Diamond and pocket extra Eternals Radiance Milestone points!",
      "notes": "7 more item(s) not shown on the card"
    },
    {
      "name": "Eternals Radiance: 3-Diamond Kingo",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "6d 1h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Eternals Radiance Milestone Points",
          "qty": 500
        },
        {
          "item": "Kingo",
          "qty": 1
        },
        {
          "item": "Kingo",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "description": "Promote Kingo to 3-Diamond and gain progress in the Eternals Radiance Milestone!"
    },
    {
      "name": "Eternals Radiance: 3-Diamond Gilgamesh",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "6d 1h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Eternals Radiance Milestone Points",
          "qty": 500
        },
        {
          "item": "Gilgamesh",
          "qty": 1
        },
        {
          "item": "Gilgamesh",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "description": "Promote Gilgamesh to 3-Diamond and gain progress in the Eternals Radiance Milestone!"
    },
    {
      "name": "Eternals Radiance: 3-Diamond Thena",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "6d 1h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Eternals Radiance Milestone Points",
          "qty": 500
        },
        {
          "item": "Thena",
          "qty": 1
        },
        {
          "item": "Thena",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "description": "Promote Thena to 3-Diamond and gain progress in the Eternals Radiance Milestone!"
    },
    {
      "name": "Eternals Radiance: Eternals Trio",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "6d 1h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Eternals Radiance Milestone Points",
          "qty": 1000
        },
        {
          "item": "Kingo",
          "qty": 1
        },
        {
          "item": "Gilgamesh",
          "qty": 1
        },
        {
          "item": "Thena",
          "qty": 1
        },
        {
          "item": "Kingo",
          "qty": 1
        }
      ],
      "description": "Strengthen Kingo, Gilgamesh and Thena to 3-Diamond, plus a bunch of points toward the Eternals Radiance Milestone!",
      "notes": "3 more item(s) not shown on the card"
    },
    {
      "name": "Eternals Radiance: 4-Diamond Kingo",
      "price": 179.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "6d 1h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Eternals Radiance Milestone Points",
          "qty": 1250
        },
        {
          "item": "Kingo",
          "qty": 1
        },
        {
          "item": "Kingo",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 12500,
          "webBonus": true
        }
      ],
      "description": "Supercharge Kingo to 4-Diamond and gain massive progress in the Eternals Radiance Milestone!"
    },
    {
      "name": "Eternals Radiance: 4-Diamond Gilgamesh",
      "price": 179.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "6d 1h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Eternals Radiance Milestone Points",
          "qty": 1250
        },
        {
          "item": "Gilgamesh",
          "qty": 1
        },
        {
          "item": "Gilgamesh",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 12500,
          "webBonus": true
        }
      ],
      "description": "Supercharge Gilgamesh to 4-Diamond and gain massive progress in the Eternals Radiance Milestone!"
    },
    {
      "name": "Eternals Radiance: 4-Diamond Thena",
      "price": 179.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "6d 1h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Eternals Radiance Milestone Points",
          "qty": 1250
        },
        {
          "item": "Thena",
          "qty": 1
        },
        {
          "item": "Thena",
          "qty": 1
        },
        {
          "item": "Strike Points",
          "qty": 12500,
          "webBonus": true
        }
      ],
      "description": "Supercharge Thena to 4-Diamond and gain massive progress in the Eternals Radiance Milestone!"
    },
    {
      "name": "Eternals Radiance: Ultimate Pack",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "6d 1h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Eternals Radiance Milestone Points",
          "qty": 1250
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Get ahead in the Eternals Radiance Milestone and stake your claim on 5-Diamond Timeless Eternals!"
    },
    {
      "name": "Battle Pass Catch-Up!",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "1d 1h",
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
      "name": "X-Men Team Offer",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "11d",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Gambit",
          "qty": 100
        },
        {
          "item": "Beast",
          "qty": 100
        },
        {
          "item": "Colossus",
          "qty": 100
        },
        {
          "item": "Cyclops",
          "qty": 100
        },
        {
          "item": "Iceman",
          "qty": 100
        }
      ],
      "description": "Limited-time for new players: Unlock a 3-Star X-Men team!",
      "notes": "2 more item(s) not shown on the card"
    },
    {
      "name": "Team Funding",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "3d 1h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Gold Orb Fragments",
          "qty": 10000
        },
        {
          "item": "Training Orb Fragments",
          "qty": 10000
        },
        {
          "item": "T3 Ability Orb Fragments",
          "qty": 10000
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "A premium offer opportunity has arised for you! Don't miss out! A 2x value!"
    },
    {
      "name": "Green ISO Ions Top Up",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "3d 1h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Premium T1 Iso-8 Orb Fragments",
          "qty": 100000
        },
        {
          "item": "T1 Ions",
          "qty": 1000000
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Upgrade a character's class with this incredible Ion deal! Boost your power by upgrading your Iso-8 Crystals."
    },
    {
      "name": "Blue ISO Ions Top Up",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "3d 1h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Basic T2 Iso-8 Orb Fragments",
          "qty": 200000
        },
        {
          "item": "T2 Level 5 Ions",
          "qty": 2000000
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Upgrade a character's class with this incredible Ion deal! Boost your power by upgrading your Iso-8 Crystals."
    },
    {
      "name": "Armory Booster",
      "price": 3.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "3d 1h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Armory 14 Orb Fragments",
          "qty": 100000
        },
        {
          "item": "Armory 15 Orb Fragments",
          "qty": 100000
        },
        {
          "item": "Armory 16 Orb Fragments",
          "qty": 100000
        },
        {
          "item": "Strike Points",
          "qty": 300,
          "webBonus": true
        }
      ],
      "description": "Take advantage of this great deal on Armory 16 Orb Fragments!"
    },
    {
      "name": "Armory 18 Orb Special",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "3d 1h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Armory 17 Orb Fragments",
          "qty": 100000
        },
        {
          "item": "Armory 18 Orb Fragments",
          "qty": 100000
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Take advantage of this great deal on Armory 18 Orb Fragments!"
    },
    {
      "name": "The Path to the Geniuses",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "3d 1h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Ghost-Spider",
          "qty": 100
        },
        {
          "item": "Peni Parker",
          "qty": 100
        },
        {
          "item": "Peter B. Parker",
          "qty": 100
        },
        {
          "item": "Spider-Man (Noir)",
          "qty": 100
        },
        {
          "item": "Spider-Man (Pavitr)",
          "qty": 100
        }
      ],
      "description": "Get the members of the Spider Society to overcome Iron Man and Shuri Legendary Challenges!",
      "notes": "3 more item(s) not shown on the card"
    },
    {
      "name": "The Path to the Doctor",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "3d 1h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Cable",
          "qty": 100
        },
        {
          "item": "Deadpool",
          "qty": 100
        },
        {
          "item": "Domino",
          "qty": 100
        },
        {
          "item": "Negasonic",
          "qty": 100
        },
        {
          "item": "X-23",
          "qty": 100
        }
      ],
      "description": "The X-Force team is here to help you overcome Doctor Octopus' Legendary Challenge!",
      "notes": "3 more item(s) not shown on the card"
    },
    {
      "name": "The Path to Righteousness",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "3d 1h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Cyclops",
          "qty": 100
        },
        {
          "item": "Forge",
          "qty": 100
        },
        {
          "item": "Gambit",
          "qty": 100
        },
        {
          "item": "Nightcrawler",
          "qty": 100
        },
        {
          "item": "Sunspot",
          "qty": 100
        }
      ],
      "description": "Obtain the X-Treme X-Men to conquer Magneto and Adam Warlock Legendary Challenges!",
      "notes": "3 more item(s) not shown on the card"
    },
    {
      "name": "The Path to the Leader",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "3d 1h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Shang-Chi",
          "qty": 100
        },
        {
          "item": "Colleen Wing",
          "qty": 100
        },
        {
          "item": "Misty Knight",
          "qty": 100
        },
        {
          "item": "Luke Cage",
          "qty": 100
        },
        {
          "item": "Iron Fist",
          "qty": 100
        }
      ],
      "description": "Get the members of the Heroes for Hire team to overcome Nick Fury's Legendary Challenge!",
      "notes": "3 more item(s) not shown on the card"
    },
    {
      "name": "The Path to the Interstellar Hero",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "3d 1h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Star-Lord (T'Challa)",
          "qty": 100
        },
        {
          "item": "Yondu",
          "qty": 100
        },
        {
          "item": "Ravager Boomer",
          "qty": 150
        },
        {
          "item": "Ravager Bruiser",
          "qty": 150
        },
        {
          "item": "Ravager Stitcher",
          "qty": 150
        }
      ],
      "description": "Get the members of the Ravagers to overcome Star-Lord's Legendary Challenge!",
      "notes": "3 more item(s) not shown on the card"
    },
    {
      "name": "The Path to Omnipotence",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "3d 1h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Sersi",
          "qty": 100
        },
        {
          "item": "Scarlet Witch",
          "qty": 100
        },
        {
          "item": "Hela",
          "qty": 100
        },
        {
          "item": "Loki",
          "qty": 100
        },
        {
          "item": "Sylvie",
          "qty": 100
        }
      ],
      "description": "Use these Mystic Controllers to help conquer Phoenix's Legendary Challenge!",
      "notes": "3 more item(s) not shown on the card"
    },
    {
      "name": "The path to being Fantastic!",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "3d 1h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Green Goblin",
          "qty": 100
        },
        {
          "item": "Mysterio",
          "qty": 100
        },
        {
          "item": "Rhino",
          "qty": 100
        },
        {
          "item": "Shocker",
          "qty": 100
        },
        {
          "item": "Vulture",
          "qty": 100
        }
      ],
      "description": "Get the members of the Sinister Six team to overcome Invisible Woman's Legendary Challenge!",
      "notes": "3 more item(s) not shown on the card"
    },
    {
      "name": "The Path to the Monarch",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "3d 1h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Beta Ray Bill",
          "qty": 100
        },
        {
          "item": "Loki",
          "qty": 100
        },
        {
          "item": "Loki (Teen)",
          "qty": 100
        },
        {
          "item": "Sylvie",
          "qty": 100
        },
        {
          "item": "Vahl",
          "qty": 100
        }
      ],
      "description": "Get the members of the Bifrost team to overcome Black Bolt's Legendary Challenge!",
      "notes": "3 more item(s) not shown on the card"
    },
    {
      "name": "The Path to Pestilence",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "2d 1h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Carnage",
          "qty": 100
        },
        {
          "item": "Venom",
          "qty": 100
        },
        {
          "item": "Red Goblin",
          "qty": 100
        },
        {
          "item": "Gwenom",
          "qty": 100
        },
        {
          "item": "Void Knight",
          "qty": 100
        }
      ],
      "description": "Get the members of the Hive-Mind team to overcome the Pestilence Scourge!",
      "notes": "3 more item(s) not shown on the card"
    },
    {
      "name": "The Path to Famine",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "2d 1h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Ghost Rider (Robbie)",
          "qty": 120
        },
        {
          "item": "Ms. Marvel (Hard Light)",
          "qty": 120
        },
        {
          "item": "Photon",
          "qty": 120
        },
        {
          "item": "Doctor Strange",
          "qty": 120
        },
        {
          "item": "Training Orb Fragments",
          "qty": 10000
        }
      ],
      "description": "Get the members of the Secret Defenders team to overcome the Famine Scourge!",
      "notes": "2 more item(s) not shown on the card"
    },
    {
      "name": "The Path to War",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "2d 1h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Beta Ray Bill",
          "qty": 100
        },
        {
          "item": "Loki",
          "qty": 100
        },
        {
          "item": "Loki (Teen)",
          "qty": 100
        },
        {
          "item": "Sylvie",
          "qty": 100
        },
        {
          "item": "Vahl",
          "qty": 100
        }
      ],
      "description": "Get the members of the Bifrost team to overcome the War Scourge!",
      "notes": "3 more item(s) not shown on the card"
    },
    {
      "name": "The Path to Death",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "2d 1h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Rescue",
          "qty": 120
        },
        {
          "item": "Ironheart (MKII)",
          "qty": 120
        },
        {
          "item": "Darkhawk",
          "qty": 120
        },
        {
          "item": "Iron Man (Infinity War)",
          "qty": 120
        },
        {
          "item": "Training Orb Fragments",
          "qty": 10000
        }
      ],
      "description": "Get the members of the P.E.G.A.S.U.S. team to overcome the Death Scourge!",
      "notes": "2 more item(s) not shown on the card"
    },
    {
      "name": "T4 Ions",
      "price": 99.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "4d 1h",
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
      "expires": "4d 1h",
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
      "expires": "4d 1h",
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
      "expires": "4d 1h",
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
      "expires": "4d 1h",
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
      "expires": "4d 1h",
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
      "expires": "1h 21m",
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
      "expires": "1h 21m",
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
      "name": "Dark Promotion Sale - Diamond Tier",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "1h 21m",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Dark Promotion Credit",
          "qty": 2750
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Power up the likes of Doctor Doom and Morgan Le Fay when you use these Dark Promotion Credits to get the next Red Star for them! Save big on 2,750 Dark Promotion Credits. Achieve new Red Star Levels with this offer today!"
    },
    {
      "name": "Elite 6 Star Orb Offer",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "1d 1h",
      "section": "Offers / GENERAL",
      "sections": [
        "Offers / GENERAL"
      ],
      "contents": [
        {
          "item": "Elite 6 Credit",
          "qty": 40000
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Take advantage of this exclusive offer and buy now! This orb will guarantee you a 6-Red Star or higher character!"
    },
    {
      "name": "XP Overload",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 10,
      "expires": "1h 21m",
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
      "expires": "1h 21m",
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
      "expires": "1h 21m",
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
      "name": "Mutant GT21 Premium Orb",
      "price": 25000,
      "currency": "Strike Points",
      "purchaseLimit": 1,
      "expires": "4d 1h",
      "section": "STRIKE STORE",
      "sections": [
        "STRIKE STORE"
      ],
      "contents": [
        {
          "item": "Mutant GT21 Premium Orb",
          "qty": 1
        }
      ],
      "paidWith": "Strike Points",
      "description": "GT21 Strike Store Special Event: For a limited time, use Strike Points to earn guaranteed Mutant GT21 Mini-Uniques!"
    },
    {
      "name": "Mutant GT21 Standard Orb",
      "price": 6000,
      "currency": "Strike Points",
      "purchaseLimit": 1,
      "expires": "4d 1h",
      "section": "STRIKE STORE",
      "sections": [
        "STRIKE STORE"
      ],
      "contents": [
        {
          "item": "Mutant GT21 Standard Orb",
          "qty": 1
        }
      ],
      "paidWith": "Strike Points",
      "description": "GT21 Strike Store Special Event: Earn guaranteed Mutant GT21 Mini-Uniques by spending Strike Points during this limited-time event!"
    },
    {
      "name": "Epic Essence Bundle",
      "price": 500,
      "currency": "Strike Points",
      "purchaseLimit": 5,
      "expires": "8d 1h",
      "section": "STRIKE STORE",
      "sections": [
        "STRIKE STORE"
      ],
      "contents": [
        {
          "item": "Epic Essence",
          "qty": 20000
        }
      ],
      "paidWith": "Strike Points",
      "description": "Upgrade your Chapter Boosts with this Epic Essence bundle!"
    },
    {
      "name": "Strike Store Exclusive!",
      "price": 6000,
      "currency": "Strike Points",
      "purchaseLimit": 5,
      "expires": "1d 1h",
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
      "expires": "1h 21m",
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
      "expires": "1h 21m",
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
      "expires": "1h 21m",
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
      "expires": "22d 1h",
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
      "expires": "1h 21m",
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
