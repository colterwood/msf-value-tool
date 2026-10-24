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
  "updated": "2026-10-24T21:24:10.380Z",
  "source": "web-store",
  "account": "CZARFACE level 105",
  "priceCurrency": "CAD",
  "note": "Read from the logged-in web store with the MSF Store Value bookmarklet. Cards that show \"+N More\" hide part of their contents; those offers carry a notes field and grade as incomplete.",
  "offers": [
    {
      "name": "Mephisto's Summoning: Orb Special",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 10,
      "expires": "8d 23h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Mephisto's Summoning Milestone Points",
          "qty": 100
        },
        {
          "item": "The Summoner's Orb Fragments",
          "qty": 6000
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Open these Orbs to make progress in the Mephisto's Summoning Milestone event, with a chance to earn 5-Diamond Mephisto!"
    },
    {
      "name": "Feast of Shadows: Terrific Training",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 98,
      "expires": "8d 23h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 300000000
        },
        {
          "item": "L4 Training Module",
          "qty": 4620
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 15000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Pick up a great L4 Training Module bundle to level up characters and also grab a bunch of points to gain progress in the Feast of Shadows Milestone!"
    },
    {
      "name": "Golden Boost",
      "price": 3.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "4d 23h",
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
      "name": "Supreme Vampiric",
      "price": 549.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "8d 23h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / NEW CHARACTERS"
      ],
      "contents": [
        {
          "item": "Dracula",
          "qty": 810
        },
        {
          "item": "Dracula",
          "qty": 1
        },
        {
          "item": "Dracula",
          "qty": 1
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": null
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": null
        }
      ],
      "description": "Unleash Dracula's true potential with 2 Diamonds and make massive progress in the Feast of Shadows Milestone event!",
      "notes": "qty unreadable for Feast of Shadows Milestone Points; qty unreadable for Feast of Shadows Milestone Points; 7 more item(s) not shown on the card"
    },
    {
      "name": "Raid Warzone: Mega Pack",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "23h 35m",
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
      "name": "Feast of Shadows: Zombie Orb",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "8d 23h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": null
        },
        {
          "item": "Zombie Mega Orb Fragments",
          "qty": 30000
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 100000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Open this Orb for a chance to get 810 Shards, 7 Red Stars, and 3-Diamond for Undying Zombies, plus a bunch of points toward the Feast of Shadows Milestone!",
      "notes": "qty unreadable for Feast of Shadows Milestone Points"
    },
    {
      "name": "Feast of Shadows: Scorpion (Breaker)",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 8,
      "expires": "8d 23h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": null
        },
        {
          "item": "Scorpion (Breaker) Mega Orb Fragments",
          "qty": 2000
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": null
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 150000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Open this Orb for a chance to get 810 Shards for Scorpion (Breaker), plus a bunch of points toward the Feast of Shadows Milestone!",
      "notes": "qty unreadable for Feast of Shadows Milestone Points; qty unreadable for Feast of Shadows Milestone Points"
    },
    {
      "name": "Feast of Shadows: Orange Mega Orb",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "8d 23h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": null
        },
        {
          "item": "Orange Mega Orb",
          "qty": 1
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": null
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 150000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Open this Orb to stock up on T4 Level 1 Ions and T4 Iso-8 Credits, also gain progress in the Feast of Shadows Milestone! This special Orb will automatically open upon purchase.",
      "notes": "qty unreadable for Feast of Shadows Milestone Points; qty unreadable for Feast of Shadows Milestone Points"
    },
    {
      "name": "Feast of Shadows: Ultimate Pack",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 50,
      "expires": "8d 23h",
      "section": "Buy Again",
      "sections": [
        "Buy Again",
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": null
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": null
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": null
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 250000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Get ahead in the Feast of Shadows Leaderboard to secure 5-Diamond for Dracula, Scorpion (Breaker), Morbius, and Kestrel (Zombie)!",
      "notes": "qty unreadable for Feast of Shadows Milestone Points; qty unreadable for Feast of Shadows Milestone Points; qty unreadable for Feast of Shadows Milestone Points"
    },
    {
      "name": "Premium Plus Chapter Battle Pass Ticket Pack",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 2,
      "expires": "23h 35m",
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
      "name": "Resource Overdrive (step 1 of 5)",
      "price": 3.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 23h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Power Cores",
          "qty": 1500
        },
        {
          "item": "Gold",
          "qty": 5000000
        },
        {
          "item": "Strike Points",
          "qty": 300,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Resource Overdrive",
        "step": 1,
        "of": 5,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Resource Overdrive",
            "price": 3.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Power Cores",
                "qty": 1500
              },
              {
                "item": "Gold",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "qty": 300,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Resource Overdrive",
            "price": 3.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "L4 Training Module",
                "qty": 350
              },
              {
                "item": "Gold",
                "qty": 10000000
              },
              {
                "item": "Strike Points",
                "qty": 300,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Resource Overdrive",
            "price": 6.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "L4 Training Module",
                "qty": 550
              },
              {
                "item": "Gold",
                "qty": 12000000
              },
              {
                "item": "Strike Points",
                "qty": 500,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Resource Overdrive",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "L4 Training Module",
                "qty": 1100
              },
              {
                "item": "Gold",
                "qty": 30000000
              },
              {
                "item": "Power Cores",
                "qty": 1500
              },
              {
                "item": "Strike Points",
                "qty": 1000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 5,
            "name": "Resource Overdrive",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "L4 Training Module",
                "qty": 2620
              },
              {
                "item": "Gold",
                "qty": 30000000
              },
              {
                "item": "T4 Ability Material",
                "qty": 840
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          }
        ]
      },
      "description": "Kick off your power-up with a boost of Gold and Power Cores!"
    },
    {
      "name": "Resource Overdrive (step 2 of 5)",
      "price": 3.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 23h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "L4 Training Module",
          "qty": 350
        },
        {
          "item": "Gold",
          "qty": 10000000
        },
        {
          "item": "Strike Points",
          "qty": 300,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Resource Overdrive",
        "step": 2,
        "of": 5,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Resource Overdrive",
            "price": 3.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Power Cores",
                "qty": 1500
              },
              {
                "item": "Gold",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "qty": 300,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Resource Overdrive",
            "price": 3.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "L4 Training Module",
                "qty": 350
              },
              {
                "item": "Gold",
                "qty": 10000000
              },
              {
                "item": "Strike Points",
                "qty": 300,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Resource Overdrive",
            "price": 6.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "L4 Training Module",
                "qty": 550
              },
              {
                "item": "Gold",
                "qty": 12000000
              },
              {
                "item": "Strike Points",
                "qty": 500,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Resource Overdrive",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "L4 Training Module",
                "qty": 1100
              },
              {
                "item": "Gold",
                "qty": 30000000
              },
              {
                "item": "Power Cores",
                "qty": 1500
              },
              {
                "item": "Strike Points",
                "qty": 1000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 5,
            "name": "Resource Overdrive",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "L4 Training Module",
                "qty": 2620
              },
              {
                "item": "Gold",
                "qty": 30000000
              },
              {
                "item": "T4 Ability Material",
                "qty": 840
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          }
        ]
      }
    },
    {
      "name": "Resource Overdrive (step 3 of 5)",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 23h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "L4 Training Module",
          "qty": 550
        },
        {
          "item": "Gold",
          "qty": 12000000
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Resource Overdrive",
        "step": 3,
        "of": 5,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Resource Overdrive",
            "price": 3.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Power Cores",
                "qty": 1500
              },
              {
                "item": "Gold",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "qty": 300,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Resource Overdrive",
            "price": 3.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "L4 Training Module",
                "qty": 350
              },
              {
                "item": "Gold",
                "qty": 10000000
              },
              {
                "item": "Strike Points",
                "qty": 300,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Resource Overdrive",
            "price": 6.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "L4 Training Module",
                "qty": 550
              },
              {
                "item": "Gold",
                "qty": 12000000
              },
              {
                "item": "Strike Points",
                "qty": 500,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Resource Overdrive",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "L4 Training Module",
                "qty": 1100
              },
              {
                "item": "Gold",
                "qty": 30000000
              },
              {
                "item": "Power Cores",
                "qty": 1500
              },
              {
                "item": "Strike Points",
                "qty": 1000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 5,
            "name": "Resource Overdrive",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "L4 Training Module",
                "qty": 2620
              },
              {
                "item": "Gold",
                "qty": 30000000
              },
              {
                "item": "T4 Ability Material",
                "qty": 840
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          }
        ]
      }
    },
    {
      "name": "Resource Overdrive (step 4 of 5)",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 23h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "L4 Training Module",
          "qty": 1100
        },
        {
          "item": "Gold",
          "qty": 30000000
        },
        {
          "item": "Power Cores",
          "qty": 1500
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Resource Overdrive",
        "step": 4,
        "of": 5,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Resource Overdrive",
            "price": 3.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Power Cores",
                "qty": 1500
              },
              {
                "item": "Gold",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "qty": 300,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Resource Overdrive",
            "price": 3.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "L4 Training Module",
                "qty": 350
              },
              {
                "item": "Gold",
                "qty": 10000000
              },
              {
                "item": "Strike Points",
                "qty": 300,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Resource Overdrive",
            "price": 6.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "L4 Training Module",
                "qty": 550
              },
              {
                "item": "Gold",
                "qty": 12000000
              },
              {
                "item": "Strike Points",
                "qty": 500,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Resource Overdrive",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "L4 Training Module",
                "qty": 1100
              },
              {
                "item": "Gold",
                "qty": 30000000
              },
              {
                "item": "Power Cores",
                "qty": 1500
              },
              {
                "item": "Strike Points",
                "qty": 1000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 5,
            "name": "Resource Overdrive",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "L4 Training Module",
                "qty": 2620
              },
              {
                "item": "Gold",
                "qty": 30000000
              },
              {
                "item": "T4 Ability Material",
                "qty": 840
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          }
        ]
      }
    },
    {
      "name": "Resource Overdrive (step 5 of 5)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 23h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "L4 Training Module",
          "qty": 2620
        },
        {
          "item": "Gold",
          "qty": 30000000
        },
        {
          "item": "T4 Ability Material",
          "qty": 840
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Resource Overdrive",
        "step": 5,
        "of": 5,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Resource Overdrive",
            "price": 3.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Power Cores",
                "qty": 1500
              },
              {
                "item": "Gold",
                "qty": 5000000
              },
              {
                "item": "Strike Points",
                "qty": 300,
                "webBonus": true
              }
            ]
          },
          {
            "step": 2,
            "name": "Resource Overdrive",
            "price": 3.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "L4 Training Module",
                "qty": 350
              },
              {
                "item": "Gold",
                "qty": 10000000
              },
              {
                "item": "Strike Points",
                "qty": 300,
                "webBonus": true
              }
            ]
          },
          {
            "step": 3,
            "name": "Resource Overdrive",
            "price": 6.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "L4 Training Module",
                "qty": 550
              },
              {
                "item": "Gold",
                "qty": 12000000
              },
              {
                "item": "Strike Points",
                "qty": 500,
                "webBonus": true
              }
            ]
          },
          {
            "step": 4,
            "name": "Resource Overdrive",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "L4 Training Module",
                "qty": 1100
              },
              {
                "item": "Gold",
                "qty": 30000000
              },
              {
                "item": "Power Cores",
                "qty": 1500
              },
              {
                "item": "Strike Points",
                "qty": 1000,
                "webBonus": true
              }
            ]
          },
          {
            "step": 5,
            "name": "Resource Overdrive",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "L4 Training Module",
                "qty": 2620
              },
              {
                "item": "Gold",
                "qty": 30000000
              },
              {
                "item": "T4 Ability Material",
                "qty": 840
              },
              {
                "item": "Strike Points",
                "qty": 2000,
                "webBonus": true
              }
            ]
          }
        ]
      }
    },
    {
      "name": "Feast of Shadows: Cores Pack (step 1 of 5)",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "8d 23h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 50000000
        },
        {
          "item": "Power Cores",
          "qty": 500
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 2500000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Feast of Shadows: Cores Pack",
        "step": 1,
        "of": 5,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Feast of Shadows: Cores Pack",
            "price": 6.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 50000000
              },
              {
                "item": "Power Cores",
                "qty": 500
              },
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 2500000,
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
            "name": "Feast of Shadows: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 100000000
              },
              {
                "item": "Power Cores",
                "qty": 1000
              },
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 5000000,
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
            "name": "Feast of Shadows: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 120000000
              },
              {
                "item": "Power Cores",
                "qty": 1100
              },
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 6000000,
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
            "name": "Feast of Shadows: Cores Pack",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 250000000
              },
              {
                "item": "Power Cores",
                "qty": 2300
              },
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 12500000,
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
            "name": "Feast of Shadows: Cores Pack",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 700000000
              },
              {
                "item": "Power Cores",
                "qty": 6000
              },
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 35000000,
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
      "description": "Grab more Power Cores to fuel your upgrades and make progress toward the Feast of Shadows Milestone!"
    },
    {
      "name": "Feast of Shadows: Cores Pack (step 2 of 5)",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "8d 23h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 100000000
        },
        {
          "item": "Power Cores",
          "qty": 1000
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 5000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Feast of Shadows: Cores Pack",
        "step": 2,
        "of": 5,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Feast of Shadows: Cores Pack",
            "price": 6.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 50000000
              },
              {
                "item": "Power Cores",
                "qty": 500
              },
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 2500000,
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
            "name": "Feast of Shadows: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 100000000
              },
              {
                "item": "Power Cores",
                "qty": 1000
              },
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 5000000,
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
            "name": "Feast of Shadows: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 120000000
              },
              {
                "item": "Power Cores",
                "qty": 1100
              },
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 6000000,
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
            "name": "Feast of Shadows: Cores Pack",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 250000000
              },
              {
                "item": "Power Cores",
                "qty": 2300
              },
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 12500000,
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
            "name": "Feast of Shadows: Cores Pack",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 700000000
              },
              {
                "item": "Power Cores",
                "qty": 6000
              },
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 35000000,
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
      "name": "Feast of Shadows: Cores Pack (step 3 of 5)",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "8d 23h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 120000000
        },
        {
          "item": "Power Cores",
          "qty": 1100
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 6000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Feast of Shadows: Cores Pack",
        "step": 3,
        "of": 5,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Feast of Shadows: Cores Pack",
            "price": 6.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 50000000
              },
              {
                "item": "Power Cores",
                "qty": 500
              },
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 2500000,
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
            "name": "Feast of Shadows: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 100000000
              },
              {
                "item": "Power Cores",
                "qty": 1000
              },
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 5000000,
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
            "name": "Feast of Shadows: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 120000000
              },
              {
                "item": "Power Cores",
                "qty": 1100
              },
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 6000000,
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
            "name": "Feast of Shadows: Cores Pack",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 250000000
              },
              {
                "item": "Power Cores",
                "qty": 2300
              },
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 12500000,
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
            "name": "Feast of Shadows: Cores Pack",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 700000000
              },
              {
                "item": "Power Cores",
                "qty": 6000
              },
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 35000000,
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
      "name": "Feast of Shadows: Cores Pack (step 4 of 5)",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "8d 23h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 250000000
        },
        {
          "item": "Power Cores",
          "qty": 2300
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 12500000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Feast of Shadows: Cores Pack",
        "step": 4,
        "of": 5,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Feast of Shadows: Cores Pack",
            "price": 6.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 50000000
              },
              {
                "item": "Power Cores",
                "qty": 500
              },
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 2500000,
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
            "name": "Feast of Shadows: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 100000000
              },
              {
                "item": "Power Cores",
                "qty": 1000
              },
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 5000000,
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
            "name": "Feast of Shadows: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 120000000
              },
              {
                "item": "Power Cores",
                "qty": 1100
              },
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 6000000,
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
            "name": "Feast of Shadows: Cores Pack",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 250000000
              },
              {
                "item": "Power Cores",
                "qty": 2300
              },
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 12500000,
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
            "name": "Feast of Shadows: Cores Pack",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 700000000
              },
              {
                "item": "Power Cores",
                "qty": 6000
              },
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 35000000,
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
      "name": "Feast of Shadows: Cores Pack (step 5 of 5)",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "8d 23h",
      "section": "Chain Offers",
      "sections": [
        "Chain Offers"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 700000000
        },
        {
          "item": "Power Cores",
          "qty": 6000
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 35000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "chain": {
        "name": "Feast of Shadows: Cores Pack",
        "step": 5,
        "of": 5,
        "current": 1,
        "steps": [
          {
            "step": 1,
            "name": "Feast of Shadows: Cores Pack",
            "price": 6.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 50000000
              },
              {
                "item": "Power Cores",
                "qty": 500
              },
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 2500000,
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
            "name": "Feast of Shadows: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 100000000
              },
              {
                "item": "Power Cores",
                "qty": 1000
              },
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 5000000,
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
            "name": "Feast of Shadows: Cores Pack",
            "price": 12.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 120000000
              },
              {
                "item": "Power Cores",
                "qty": 1100
              },
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 6000000,
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
            "name": "Feast of Shadows: Cores Pack",
            "price": 24.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 250000000
              },
              {
                "item": "Power Cores",
                "qty": 2300
              },
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 12500000,
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
            "name": "Feast of Shadows: Cores Pack",
            "price": 69.99,
            "currency": "CAD",
            "contents": [
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 700000000
              },
              {
                "item": "Power Cores",
                "qty": 6000
              },
              {
                "item": "Feast of Shadows Milestone Points",
                "qty": 35000000,
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
      "name": "Raid Warzone: Supply Special",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "23h 35m",
      "section": "Second Chance Offers",
      "sections": [
        "Second Chance Offers"
      ],
      "contents": [
        {
          "item": "Raid Warzone Milestone Points",
          "qty": 4000
        },
        {
          "item": "Allied Supply XII Orb Fragments",
          "qty": 2000
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Stock up on Allied Supply XII Orbs for extra progress in the Raid Warzone Milestone!"
    },
    {
      "name": "Feast of Shadows: Hidden Vault",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "23h 35m",
      "section": "Second Chance Offers",
      "sections": [
        "Second Chance Offers"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 100000000
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "You just unlocked a special deal! Seize it to gain more progress in the Feast of Shadows Milestone!"
    },
    {
      "name": "Feast of Shadows: Hidden Treasure",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 2,
      "expires": "1d 23h",
      "section": "Second Chance Offers",
      "sections": [
        "Second Chance Offers"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 220000000
        },
        {
          "item": "Mega Orb Fragments",
          "qty": 2000
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "A special deal awaits you! Take advantage of it and boost up your progress in the Feast of Shadows Milestone!"
    },
    {
      "name": "Ultra Sovereign",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "8d 23h",
      "section": "Offers / NEW CHARACTERS",
      "sections": [
        "Offers / NEW CHARACTERS"
      ],
      "contents": [
        {
          "item": "Dracula",
          "qty": 160
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": null
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": null
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Don't miss this chance to power up your Dracula and earn more Feast of Shadows Milestone progress!",
      "notes": "qty unreadable for Feast of Shadows Milestone Points; qty unreadable for Feast of Shadows Milestone Points"
    },
    {
      "name": "Mega Nocturnal",
      "price": 79.99,
      "currency": "CAD",
      "purchaseLimit": 11,
      "expires": "8d 23h",
      "section": "Offers / NEW CHARACTERS",
      "sections": [
        "Offers / NEW CHARACTERS"
      ],
      "contents": [
        {
          "item": "Dracula",
          "qty": 70
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": null
        },
        {
          "item": "Strike Points",
          "qty": 6000,
          "webBonus": true
        }
      ],
      "description": "Power up Dracula with this shard offer, and grab points toward the Feast of Shadows Milestone event!",
      "notes": "qty unreadable for Feast of Shadows Milestone Points"
    },
    {
      "name": "Mighty Bloodline",
      "price": 39.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "8d 23h",
      "section": "Offers / NEW CHARACTERS",
      "sections": [
        "Offers / NEW CHARACTERS"
      ],
      "contents": [
        {
          "item": "Dracula",
          "qty": 45
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 750000000
        },
        {
          "item": "Strike Points",
          "qty": 3000,
          "webBonus": true
        }
      ],
      "description": "Unlock Dracula now! He inflicts Bleed, Slow, Silence, Disrupted, triggers Bleed damage every turn, and protects allies from Mind Control!"
    },
    {
      "name": "Nightreaver Orb",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "8d 23h",
      "section": "Offers / NEW CHARACTERS",
      "sections": [
        "Offers / NEW CHARACTERS"
      ],
      "contents": [
        {
          "item": "Nightreaver Orb Fragments",
          "qty": 2000
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 80000000
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Don't miss this chance to earn the Nightreaver Orb. This orb contains Dracula shards and his Nightreaver allies!"
    },
    {
      "name": "Unlock Special: LV105 Gold Boost",
      "price": 49.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "14m",
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
      "expires": "14m",
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
      "expires": "14m",
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
      "expires": "14m",
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
      "expires": "14m",
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
      "expires": "14m",
      "section": "Offers / UNLOCKED OFFERS",
      "sections": [
        "Offers / UNLOCKED OFFERS"
      ],
      "contents": [
        {
          "item": "Crimson Molecular Cloth",
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
      "expires": "14m",
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
      "expires": "14m",
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
          "qty": 350
        },
        {
          "item": "Crimson Focus Catalyst Part",
          "qty": 630
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
      "name": "Unlock Special: T3 Ion Max",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "14m",
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
      "expires": "14m",
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
      "expires": "14m",
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
          "item": "Crimson Molecular Cloth",
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
      "name": "Ability Essentials Cache",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "2d 23h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "T4 Ability Material",
          "qty": 150
        },
        {
          "item": "T4 Ability Material",
          "qty": 15,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Running out of Ability materials? No problem, stock back up with this special offer."
    },
    {
      "name": "Ability Value Cache",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "2d 23h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "T4 Ability Material",
          "qty": 360
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
      "description": "Sharpen your roster with this ability pack."
    },
    {
      "name": "Ability Ultimate Cache",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "2d 23h",
      "section": "Offers / RECOMMENDED",
      "sections": [
        "Offers / RECOMMENDED"
      ],
      "contents": [
        {
          "item": "T4 Ability Material",
          "qty": 840
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
      "description": "Improve your abilities today for the new level."
    },
    {
      "name": "Power Up Your Squad",
      "price": 59.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "23h 35m",
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
      "expires": "23h 35m",
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
      "expires": "23h 35m",
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
      "name": "Halloween Haul",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "8d 23h",
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
      "expires": "8d 23h",
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
      "name": "GT21 Bio Calendar",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "1d 23h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "GT21 Bio Calendar",
          "qty": null
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "description": "Login daily to claim a cache of valuable Gear Tier 21 Mini-Unique, Crimson Catalyst Parts and Gold!",
      "notes": "qty unreadable for GT21 Bio Calendar"
    },
    {
      "name": "Blade 5-Diamond",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 23h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Blade",
          "qty": 1
        },
        {
          "item": "Blade",
          "qty": 1
        },
        {
          "item": "Blade",
          "qty": null
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Upgrade Blade to 5-Diamond and slice through the competition!",
      "notes": "qty unreadable for Blade"
    },
    {
      "name": "Nightcrawler 5-Diamond",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 23h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Nightcrawler",
          "qty": 1
        },
        {
          "item": "Nightcrawler",
          "qty": 1
        },
        {
          "item": "Nightcrawler",
          "qty": null
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Boost Nightcrawler to 5-Diamond and outmaneuver your foes!",
      "notes": "qty unreadable for Nightcrawler"
    },
    {
      "name": "Hit-Monkey 5-Diamond",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 23h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Hit-Monkey",
          "qty": 1
        },
        {
          "item": "Hit-Monkey",
          "qty": 1
        },
        {
          "item": "Hit-Monkey",
          "qty": null
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Upgrade Hit-Monkey to 5-Diamond and unleash primate precision!",
      "notes": "qty unreadable for Hit-Monkey"
    },
    {
      "name": "Lady Deathstrike 5-Diamond",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 23h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Lady Deathstrike",
          "qty": 1
        },
        {
          "item": "Lady Deathstrike",
          "qty": 1
        },
        {
          "item": "Lady Deathstrike",
          "qty": null
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Turn Lady Deathstrike into an unstoppable force with a 5-Diamond upgrade!",
      "notes": "qty unreadable for Lady Deathstrike"
    },
    {
      "name": "Gladiator 5-Diamond",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 23h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Gladiator",
          "qty": 1
        },
        {
          "item": "Gladiator",
          "qty": 1
        },
        {
          "item": "Gladiator",
          "qty": null
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Upgrade Gladiator to 5-Diamond and shield your team with unyielding protection!",
      "notes": "qty unreadable for Gladiator"
    },
    {
      "name": "Lizard 5-Diamond",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 23h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Lizard",
          "qty": 1
        },
        {
          "item": "Lizard",
          "qty": 1
        },
        {
          "item": "Lizard",
          "qty": null
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Boost Lizard to 5-Diamond and strike with cold-blooded power!",
      "notes": "qty unreadable for Lizard"
    },
    {
      "name": "5-Diamond Power Pack",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "5d 23h",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Blade",
          "qty": 1
        },
        {
          "item": "Nightcrawler",
          "qty": 1
        },
        {
          "item": "Hit-Monkey",
          "qty": 1
        },
        {
          "item": "Lady Deathstrike",
          "qty": 1
        },
        {
          "item": "Vulture",
          "qty": 1
        }
      ],
      "description": "Empower your roster with 5-Diamond upgrades and dominate the battlefield!",
      "notes": "17 more item(s) not shown on the card"
    },
    {
      "name": "Thena Power Pack",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "23h 35m",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Crimson Armor Catalyst Part",
          "qty": 250
        },
        {
          "item": "Crimson Basic Catalyst Part",
          "qty": 875
        },
        {
          "item": "Crimson Damage Catalyst Part",
          "qty": 100
        },
        {
          "item": "Crimson Focus Catalyst Part",
          "qty": 100
        },
        {
          "item": "Crimson Health Catalyst Part",
          "qty": 450
        }
      ],
      "description": "Don't miss this chance to power up your Thena!",
      "notes": "10 more item(s) not shown on the card"
    },
    {
      "name": "Gilgamesh Power Pack",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "23h 35m",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Crimson Armor Catalyst Part",
          "qty": 100
        },
        {
          "item": "Crimson Basic Catalyst Part",
          "qty": 875
        },
        {
          "item": "Crimson Damage Catalyst Part",
          "qty": 250
        },
        {
          "item": "Crimson Focus Catalyst Part",
          "qty": 100
        },
        {
          "item": "Crimson Health Catalyst Part",
          "qty": 450
        }
      ],
      "description": "Don't miss this chance to power up your Gilgamesh!",
      "notes": "10 more item(s) not shown on the card"
    },
    {
      "name": "Thena Power Pack",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "23h 35m",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Thena",
          "qty": 400
        },
        {
          "item": "Gold",
          "qty": 50000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Don't miss this chance to power up your Thena!"
    },
    {
      "name": "Gilgamesh Power Pack",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "23h 35m",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Gilgamesh",
          "qty": 505
        },
        {
          "item": "Gold",
          "qty": 50000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Don't miss this chance to power up your Gilgamesh!"
    },
    {
      "name": "Age of Fear: Super Pack",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "23h 35m",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "L4 Training Module",
          "qty": 14100
        },
        {
          "item": "T4 Ability Material",
          "qty": 2660
        },
        {
          "item": "L4 Training Module",
          "qty": 1400,
          "webBonus": true
        },
        {
          "item": "T4 Ability Material",
          "qty": 270,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "One bundle. Endless potential. Step into greatness with resources built for legends who refuse to fall!"
    },
    {
      "name": "Age of Fear: T3 Ions Bundle",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "23h 35m",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "T3 Level 5 Ions",
          "qty": 19800000
        },
        {
          "item": "T3 Level 4 Ions",
          "qty": 19800000
        },
        {
          "item": "T3 Level 5 Ions",
          "qty": 2000000,
          "webBonus": true
        },
        {
          "item": "T3 Level 4 Ions",
          "qty": 2000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Push your strongest characters beyond their limits with this elite upgrade bundle."
    },
    {
      "name": "Age of Fear: Training Modules",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "23h 35m",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "L4 Training Module",
          "qty": 14400
        },
        {
          "item": "L4 Training Module",
          "qty": 1400,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 10000,
          "webBonus": true
        }
      ],
      "description": "Level up fast and leave the competition in the shadows!"
    },
    {
      "name": "Gold Galore",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "23h 35m",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Gold",
          "qty": 150000000
        },
        {
          "item": "Strike Points",
          "qty": 10000,
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
      "expires": "23h 35m",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Gold",
          "qty": 30000000
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
      "price": 99.99,
      "currency": "CAD",
      "purchaseLimit": 3,
      "expires": "23h 35m",
      "section": "Offers / FEATURED",
      "sections": [
        "Offers / FEATURED"
      ],
      "contents": [
        {
          "item": "Gold",
          "qty": 112500000
        },
        {
          "item": "Strike Points",
          "qty": 7500,
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
      "expires": "23h 35m",
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
      "expires": "23h 35m",
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
      "expires": "23h 35m",
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
      "expires": "23h 35m",
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
      "name": "Feast of Shadows: Morbius",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "8d 23h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 500000000
        },
        {
          "item": "Morbius",
          "qty": 810
        },
        {
          "item": "Morbius",
          "qty": 1
        },
        {
          "item": "Morbius",
          "qty": 1
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 25000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Instantly power up Morbius to 2-Diamond and also grab a bunch of points to gain progress in the Feast of Shadows Milestone!"
    },
    {
      "name": "Feast of Shadows: Zombie Orb",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "8d 23h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 300000000
        },
        {
          "item": "Zombie Mega Orb Fragments",
          "qty": 4000
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 15000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Open this Orb for a chance to get 810 Shards, 7 Red Stars, and 3-Diamond for Undying Zombies, plus a bunch of points toward the Feast of Shadows Milestone!"
    },
    {
      "name": "Feast of Shadows: Zombie Orb",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "8d 23h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 900000000
        },
        {
          "item": "Zombie Mega Orb Fragments",
          "qty": 12000
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 45000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "description": "Open this Orb for a chance to get 810 Shards, 7 Red Stars, and 3-Diamond for Undying Zombies, plus a bunch of points toward the Feast of Shadows Milestone!"
    },
    {
      "name": "Feast of Shadows: Scorpion (Breaker)",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 16,
      "expires": "8d 23h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 600000000
        },
        {
          "item": "Scorpion (Breaker)",
          "qty": 50
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 30000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "description": "Get Scorpion (Breaker) Shards to power up this hero and also grab a bunch of points to gain progress in the Feast of Shadows Milestone!"
    },
    {
      "name": "Feast of Shadows: Rhino",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "8d 23h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 300000000
        },
        {
          "item": "Rhino",
          "qty": 810
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 15000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Get Rhino Shards to power up this hero and also grab a bunch of points to gain progress in the Feast of Shadows Milestone!"
    },
    {
      "name": "Feast of Shadows: Electro",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "8d 23h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 300000000
        },
        {
          "item": "Electro",
          "qty": 810
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 15000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Get Electro Shards to power up this hero and also grab a bunch of points to gain progress in the Feast of Shadows Milestone!"
    },
    {
      "name": "Feast of Shadows: Mister Negative",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "8d 23h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 300000000
        },
        {
          "item": "Mister Negative",
          "qty": 810
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 15000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Get Mister Negative Shards to power up this hero and also grab a bunch of points to gain progress in the Feast of Shadows Milestone!"
    },
    {
      "name": "Feast of Shadows: Bullseye",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "8d 23h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 300000000
        },
        {
          "item": "Bullseye",
          "qty": 810
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 15000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 1000,
          "webBonus": true
        }
      ],
      "description": "Get Bullseye Shards to power up this hero and also grab a bunch of points to gain progress in the Feast of Shadows Milestone!"
    },
    {
      "name": "Feast of Shadows: Dread",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 1,
      "expires": "8d 23h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": null
        },
        {
          "item": "Rhino",
          "qty": 810
        },
        {
          "item": "Electro",
          "qty": 810
        },
        {
          "item": "Mister Negative",
          "qty": 810
        },
        {
          "item": "Bullseye",
          "qty": 810
        }
      ],
      "description": "Instantly power up Dread team to 1-Diamond and also grab a bunch of points to gain progress in the Feast of Shadows Milestone!",
      "notes": "qty unreadable for Feast of Shadows Milestone Points; 10 more item(s) not shown on the card"
    },
    {
      "name": "Feast of Shadows: Crimson Elite Orb",
      "price": 3.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "8d 23h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 30000000
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
      "description": "Earn Gear Tier 19 and 20 Mini-Unique, and also grab a bunch of points to gain progress in the Feast of Shadows Milestone!"
    },
    {
      "name": "Feast of Shadows: Basic Pack",
      "price": 69.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "8d 23h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": null
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 100000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 5000,
          "webBonus": true
        }
      ],
      "description": "Get ahead in the Feast of Shadows Leaderboard to secure 5-Diamond for Dracula, Scorpion (Breaker), Morbius, and Kestrel (Zombie)!",
      "notes": "qty unreadable for Feast of Shadows Milestone Points"
    },
    {
      "name": "Feast of Shadows: GT21 Mutant",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "8d 23h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": null
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
      "description": "Earn Gear Tier 21 Mutant Mini-Unique, and also grab a bunch of points to gain progress in the Feast of Shadows Milestone!",
      "notes": "qty unreadable for Feast of Shadows Milestone Points; 6 more item(s) not shown on the card"
    },
    {
      "name": "Feast of Shadows: GT21 Tech",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "8d 23h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": null
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
      "description": "Earn Gear Tier 21 Tech Mini-Unique, and also grab a bunch of points to gain progress in the Feast of Shadows Milestone!",
      "notes": "qty unreadable for Feast of Shadows Milestone Points; 6 more item(s) not shown on the card"
    },
    {
      "name": "Feast of Shadows: GT21 Bio",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "8d 23h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": null
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
      "description": "Earn Gear Tier 21 Bio Mini-Unique, and also grab a bunch of points to gain progress in the Feast of Shadows Milestone!",
      "notes": "qty unreadable for Feast of Shadows Milestone Points; 6 more item(s) not shown on the card"
    },
    {
      "name": "Feast of Shadows: GT21 Skill",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "8d 23h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": null
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
      "description": "Earn Gear Tier 21 Skill Mini-Unique, and also grab a bunch of points to gain progress in the Feast of Shadows Milestone!",
      "notes": "qty unreadable for Feast of Shadows Milestone Points; 6 more item(s) not shown on the card"
    },
    {
      "name": "Feast of Shadows: GT21 Mystic",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "8d 23h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": null
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
      "description": "Earn Gear Tier 21 Mystic Mini-Unique, and also grab a bunch of points to gain progress in the Feast of Shadows Milestone!",
      "notes": "qty unreadable for Feast of Shadows Milestone Points; 6 more item(s) not shown on the card"
    },
    {
      "name": "Feast of Shadows: Ions Special",
      "price": 19.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "8d 23h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 200000000
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
          "item": "Feast of Shadows Milestone Points",
          "qty": 10000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 1500,
          "webBonus": true
        }
      ],
      "description": "Earn T3 Level 4 and Level 5 Ions, and also gain progress in the Feast of Shadows Milestone!"
    },
    {
      "name": "Feast of Shadows: Ability Power Up",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "8d 23h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 300000000
        },
        {
          "item": "T4 Ability Material",
          "qty": 840
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 15000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Strengthen your roster with T4 Ability Materials and also grab a bunch of points to gain progress in the Feast of Shadows Milestone!"
    },
    {
      "name": "Feast of Shadows: Power Core Bundle",
      "price": 34.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "8d 23h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 400000000
        },
        {
          "item": "Power Cores",
          "qty": 2500
        },
        {
          "item": "Feast of Shadows Milestone Points",
          "qty": 20000000,
          "webBonus": true
        },
        {
          "item": "Strike Points",
          "qty": 2500,
          "webBonus": true
        }
      ],
      "description": "Grab this deal to seize 2500 Power Cores and also gain progress in the Feast of Shadows Milestone!"
    },
    {
      "name": "Mephisto's Summoning: Basic Pack",
      "price": 6.99,
      "currency": "CAD",
      "purchaseLimit": 24,
      "expires": "8d 23h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Mephisto's Summoning Milestone Points",
          "qty": 200
        },
        {
          "item": "The Summoner's Orb Fragments",
          "qty": 2000
        },
        {
          "item": "Strike Points",
          "qty": 500,
          "webBonus": true
        }
      ],
      "description": "Get ahead in the Mephisto's Summoning Milestone event and start making your way toward 5-Diamond for Mephisto!"
    },
    {
      "name": "Mephisto's Summoning: Points Surge",
      "price": 24.99,
      "currency": "CAD",
      "purchaseLimit": 6,
      "expires": "8d 23h",
      "section": "Offers / EVENTS",
      "sections": [
        "Offers / EVENTS"
      ],
      "contents": [
        {
          "item": "Mephisto's Summoning Milestone Points",
          "qty": 2000
        },
        {
          "item": "Strike Points",
          "qty": 2000,
          "webBonus": true
        }
      ],
      "description": "Progress through the Mephisto's Summoning Milestone to secure 5-Diamond for Mephisto!"
    },
    {
      "name": "Battle Pass Catch-Up!",
      "price": 12.99,
      "currency": "CAD",
      "purchaseLimit": 5,
      "expires": "8d 23h",
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
      "expires": "4d 23h",
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
      "name": "T4 Ions",
      "price": 99.99,
      "currency": "CAD",
      "purchaseLimit": 99,
      "expires": "4d 23h",
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
      "expires": "4d 23h",
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
      "expires": "4d 23h",
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
      "expires": "4d 23h",
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
      "expires": "4d 23h",
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
      "expires": "4d 23h",
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
      "expires": "23h 35m",
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
      "expires": "23h 35m",
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
      "name": "XP Overload",
      "price": 129.99,
      "currency": "CAD",
      "purchaseLimit": 10,
      "expires": "23h 35m",
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
      "expires": "23h 35m",
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
      "expires": "23h 35m",
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
      "name": "Epic Essence Bundle",
      "price": 500,
      "currency": "Strike Points",
      "purchaseLimit": 5,
      "expires": "1d 23h",
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
      "expires": "23h 35m",
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
      "expires": "23h 35m",
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
      "expires": "23h 35m",
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
      "expires": "23h 35m",
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
      "expires": "15d 23h",
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
      "expires": "23h 35m",
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
  ],
  "bookmarklet": "2026-10-24"
};
