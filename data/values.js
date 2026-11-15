/*
 * Value table: what each item usually costs in this player's own store, in CA$ and in Ultra Cores.
 *
 * Built by `node tools/refresh.js` from data/reads.json, the archive of this store's own reads, and
 * from nothing else. tools/market.js has the rules; in short, per item:
 *   value       CA$ that `per` units cost at the usual price (per / observed.perCash)
 *   coreValue   Ultra Cores that `per` units cost at the usual price (per / observed.perCore)
 *   observed.basis      "own": sold on its own, priced by those offers; "set": only sold together
 *                       with other things that have no offer of their own, the price split evenly.
 *                       An item that only comes beside things sold on their own has no price.
 *   observed.perCash    usual units per CA$; observed.perCore: usual units per Ultra Core
 *   observed.days       the read days the usual price comes from: the days BEFORE the read being
 *                       rated (meta.baseline.ratedDay) and within six months of it. The usual price
 *                       is the best of those days' prices that was matched or beaten at least two
 *                       thirds of the time, each read counting for the days it stands for
 *                       (meta.baseline.weights), so a sale never sets its own yardstick
 *   observed.firstSeen  no earlier read carried it: priced by the rated read itself, so it rates
 *                       about 1x until there is a second read
 *   observed.byDay      its price on each read day that has one, by the same rules: { day: { per
 *                       (units per CA$), offer } }. observed.coreByDay is the same per Ultra Core
 *   observed.best       the cheapest of those days: { per, day, offer }; observed.bestCore the
 *                       same per Ultra Core
 *   observed.family     set when the price is shared with every item of a family: the stat crystals
 *                       of a tier cost the same whatever their class and stat
 * Items with excludeFromValue are event or loyalty points, never counted. `id` (and `ids`) is the
 * store's own resource id: offer lines read from the store page resolve by it. A row with
 * derivedFrom is priced from another by a fixed ratio (L1 to L3 training modules from L4, by XP).
 *
 * Keys: shard:<character name lower-case> (with `character`), orb:<name>, gear:<name>,
 * training_module:<tier>, ability_material:<tier>, iso8:<name>, points:<event>, promotion:<...>.
 * Edits made on the Value table tab are stored in the browser and win over this file there.
 */
window.MSF_VALUE_TABLE = {
  "meta": {
    "currency": "CAD",
    "grades": [
      {
        "min": 2.5,
        "label": "A",
        "note": "2.5× the usual price or better: the deals of the day"
      },
      {
        "min": 1.75,
        "label": "B",
        "note": "1.75× to 2.5×: clearly better than the usual web-store price"
      },
      {
        "min": 1.25,
        "label": "C",
        "note": "1.25× to 1.75×: a bit better than usual"
      },
      {
        "min": 1,
        "label": "D",
        "note": "1× to 1.25×: about the usual price"
      },
      {
        "min": 0,
        "label": "F",
        "note": "below 1×: worse than usual, wait for a better one"
      }
    ],
    "unit": "CAD",
    "fxToUsd": {
      "CAD": 1
    },
    "xpNote": "Training modules carry xp (L1 50, L2 200, L3 800, L4 1600). Levels without offers of their own are priced from L4 by XP through derivedFrom.",
    "source": "Your own store reads (2026-10-18, 2026-10-24, 2026-11-06, 2026-11-14, 2026-11-15); built 2026-11-15",
    "updated": "2026-11-15",
    "coreTiers": [
      [
        2.99,
        20
      ],
      [
        3.99,
        30
      ],
      [
        6.99,
        50
      ],
      [
        12.99,
        100
      ],
      [
        19.99,
        150
      ],
      [
        24.99,
        200
      ],
      [
        34.99,
        250
      ],
      [
        39.99,
        300
      ],
      [
        69.99,
        500
      ],
      [
        79.99,
        600
      ],
      [
        99.99,
        700
      ],
      [
        119.99,
        900
      ],
      [
        129.99,
        1000
      ],
      [
        549.99,
        4000
      ]
    ],
    "baseline": {
      "method": "own-history",
      "builtAt": "2026-11-15T21:04:08.297Z",
      "ratedDay": "2026-11-15",
      "readDays": [
        "2026-10-18",
        "2026-10-24",
        "2026-11-06",
        "2026-11-14",
        "2026-11-15"
      ],
      "archivedOffers": 414,
      "priced": 251,
      "firstSeen": 3,
      "months": 6,
      "share": 0.6667,
      "from": "2026-05-15",
      "weights": {
        "2026-10-18": 10,
        "2026-10-24": 9.5,
        "2026-11-06": 10.5,
        "2026-11-14": 4.5
      }
    },
    "gradeNote": "Value per CA$ (or per Ultra Core): the offer's contents at their usual prices, divided by its price. Usual prices come from your own earlier store reads (see the top of data/values.js), so 1× means the offer charges what these things usually cost you, and each item's own figure says what the offer is worth for that item alone."
  },
  "items": {
    "battle_pass_tokens": {
      "name": "Battle Pass Tokens",
      "category": "currency",
      "per": 1,
      "aliases": [],
      "value": 0.866003,
      "observed": {
        "basis": "own",
        "perCash": 1.15473,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 1.15473,
          "day": "2026-10-18",
          "offer": "Battle Pass Catch-Up!"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.15473,
            "offer": "Battle Pass Catch-Up!"
          },
          "2026-10-24": {
            "per": 1.15473,
            "offer": "Battle Pass Catch-Up!"
          },
          "2026-11-06": {
            "per": 1.15473,
            "offer": "Battle Pass Catch-Up!"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "Battle Pass Catch-Up!"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "Battle Pass Catch-Up!"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "Battle Pass Catch-Up!"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "Battle Pass Catch-Up!"
          }
        }
      },
      "coreValue": 6.66667
    },
    "commander_xp": {
      "name": "Commander XP",
      "category": "currency",
      "per": 100,
      "aliases": [],
      "value": 0.619,
      "id": "XP",
      "observed": {
        "basis": "own",
        "perCash": 161.551,
        "perCore": 21,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 15,
        "firstSeen": false,
        "best": {
          "per": 161.551,
          "day": "2026-10-18",
          "offer": "XP Overload"
        },
        "byDay": {
          "2026-10-18": {
            "per": 161.551,
            "offer": "XP Overload"
          },
          "2026-10-24": {
            "per": 161.551,
            "offer": "XP Overload"
          },
          "2026-11-06": {
            "per": 161.551,
            "offer": "XP Overload"
          },
          "2026-11-14": {
            "per": 161.551,
            "offer": "XP Overload"
          },
          "2026-11-15": {
            "per": 161.551,
            "offer": "XP Overload"
          }
        },
        "bestCore": {
          "per": 21,
          "day": "2026-10-18",
          "offer": "XP Overload"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 21,
            "offer": "XP Overload"
          },
          "2026-10-24": {
            "per": 21,
            "offer": "XP Overload"
          },
          "2026-11-06": {
            "per": 21,
            "offer": "XP Overload"
          },
          "2026-11-14": {
            "per": 21,
            "offer": "XP Overload"
          },
          "2026-11-15": {
            "per": 21,
            "offer": "XP Overload"
          }
        }
      },
      "coreValue": 4.7619
    },
    "dark_promotion_credit": {
      "name": "Dark Promotion Credit",
      "category": "currency",
      "per": 1,
      "aliases": [],
      "value": 0.047269,
      "id": "PROMOTION_CUR_ULT",
      "observed": {
        "basis": "own",
        "perCash": 21.1555,
        "perCore": 2.75,
        "days": [
          "2026-10-18",
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 21.1555,
          "day": "2026-10-18",
          "offer": "Dark Promotion Sale - Diamond Tier"
        },
        "byDay": {
          "2026-10-18": {
            "per": 21.1555,
            "offer": "Dark Promotion Sale - Diamond Tier"
          },
          "2026-11-14": {
            "per": 21.1555,
            "offer": "Dark Promotion Sale - Diamond Tier"
          }
        },
        "bestCore": {
          "per": 2.75,
          "day": "2026-10-18",
          "offer": "Dark Promotion Sale - Diamond Tier"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 2.75,
            "offer": "Dark Promotion Sale - Diamond Tier"
          },
          "2026-11-14": {
            "per": 2.75,
            "offer": "Dark Promotion Sale - Diamond Tier"
          }
        }
      },
      "coreValue": 0.363636
    },
    "elite_6_credit": {
      "name": "Elite 6 Credit",
      "category": "currency",
      "per": 1000,
      "aliases": [],
      "value": 0.32475,
      "observed": {
        "basis": "own",
        "perCash": 3079.29,
        "perCore": 400,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 3079.29,
          "day": "2026-10-18",
          "offer": "Elite 6 Star Orb Offer"
        },
        "byDay": {
          "2026-10-18": {
            "per": 3079.29,
            "offer": "Elite 6 Star Orb Offer"
          }
        },
        "bestCore": {
          "per": 400,
          "day": "2026-10-18",
          "offer": "Elite 6 Star Orb Offer"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 400,
            "offer": "Elite 6 Star Orb Offer"
          }
        }
      },
      "coreValue": 2.5,
      "id": "ELITE_6_CUR"
    },
    "elite_7_credit": {
      "name": "Elite 7 Credit",
      "category": "currency",
      "per": 100,
      "aliases": [],
      "value": null,
      "id": "ELITE_7_CUR",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gold": {
      "name": "Gold",
      "category": "currency",
      "per": 1000000,
      "aliases": [],
      "value": 1.42829,
      "id": "SC",
      "observed": {
        "basis": "own",
        "perCash": 700140,
        "perCore": 87500,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 12,
        "firstSeen": false,
        "best": {
          "per": 1214460,
          "day": "2026-10-18",
          "offer": "Gold Galore"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1214460,
            "offer": "Gold Galore"
          },
          "2026-10-24": {
            "per": 1200480,
            "offer": "Gold Galore"
          },
          "2026-11-06": {
            "per": 700140,
            "offer": "Unlock Special: LV105 Gold Boost"
          }
        },
        "bestCore": {
          "per": 170000,
          "day": "2026-10-18",
          "offer": "Gold Galore"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 170000,
            "offer": "Gold Galore"
          },
          "2026-10-24": {
            "per": 150000,
            "offer": "Gold Galore"
          },
          "2026-11-06": {
            "per": 87500,
            "offer": "Unlock Special: LV105 Gold Boost"
          }
        }
      },
      "coreValue": 11.4286
    },
    "power_cores": {
      "name": "Power Cores",
      "category": "currency",
      "per": 1,
      "aliases": [],
      "value": 0.01398,
      "id": "HC",
      "observed": {
        "basis": "own",
        "perCash": 71.5308,
        "perCore": 10,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 36,
        "firstSeen": false,
        "best": {
          "per": 76.9823,
          "day": "2026-11-14",
          "offer": "Cyber Breach: Cores Pack (step 2 of 5)"
        },
        "byDay": {
          "2026-10-18": {
            "per": 71.449,
            "offer": "Iron Vengeance: Power Core Bundle"
          },
          "2026-10-24": {
            "per": 71.5308,
            "offer": "Feast of Shadows: Cores Pack (step 1 of 5)"
          },
          "2026-11-06": {
            "per": 71.5308,
            "offer": "Cyber Breach: Cores Pack (step 1 of 5)"
          },
          "2026-11-14": {
            "per": 76.9823,
            "offer": "Cyber Breach: Cores Pack (step 2 of 5)"
          },
          "2026-11-15": {
            "per": 76.9823,
            "offer": "Cyber Breach: Cores Pack (step 2 of 5)"
          }
        },
        "bestCore": {
          "per": 10,
          "day": "2026-10-18",
          "offer": "Iron Vengeance: Power Core Bundle"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 10,
            "offer": "Iron Vengeance: Power Core Bundle"
          },
          "2026-10-24": {
            "per": 10,
            "offer": "Feast of Shadows: Cores Pack (step 1 of 5)"
          },
          "2026-11-06": {
            "per": 10,
            "offer": "Cyber Breach: Cores Pack (step 1 of 5)"
          },
          "2026-11-14": {
            "per": 10,
            "offer": "Cyber Breach: Cores Pack (step 2 of 5)"
          },
          "2026-11-15": {
            "per": 10,
            "offer": "Cyber Breach: Cores Pack (step 2 of 5)"
          }
        }
      },
      "coreValue": 0.1
    },
    "shop_credits": {
      "name": "Shop Credits",
      "category": "currency",
      "per": 1000,
      "aliases": [],
      "value": 0.0699898,
      "id": "LC",
      "observed": {
        "basis": "set",
        "perCash": 14287.8,
        "perCore": 2000,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 5,
        "firstSeen": false,
        "best": {
          "per": 14287.8,
          "day": "2026-10-18",
          "offer": "Premium Plus Chapter Battle Pass Ticket Pack"
        },
        "byDay": {
          "2026-10-18": {
            "per": 14287.8,
            "offer": "Premium Plus Chapter Battle Pass Ticket Pack"
          },
          "2026-10-24": {
            "per": 14287.8,
            "offer": "Premium Plus Chapter Battle Pass Ticket Pack"
          },
          "2026-11-06": {
            "per": 14287.8,
            "offer": "Premium Plus Chapter Battle Pass Ticket Pack"
          },
          "2026-11-14": {
            "per": 14287.8,
            "offer": "Premium Plus Chapter Battle Pass Ticket Pack"
          },
          "2026-11-15": {
            "per": 14287.8,
            "offer": "Premium Plus Chapter Battle Pass Ticket Pack"
          }
        },
        "bestCore": {
          "per": 2000,
          "day": "2026-10-18",
          "offer": "Premium Plus Chapter Battle Pass Ticket Pack"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 2000,
            "offer": "Premium Plus Chapter Battle Pass Ticket Pack"
          },
          "2026-10-24": {
            "per": 2000,
            "offer": "Premium Plus Chapter Battle Pass Ticket Pack"
          },
          "2026-11-06": {
            "per": 2000,
            "offer": "Premium Plus Chapter Battle Pass Ticket Pack"
          },
          "2026-11-14": {
            "per": 2000,
            "offer": "Premium Plus Chapter Battle Pass Ticket Pack"
          },
          "2026-11-15": {
            "per": 2000,
            "offer": "Premium Plus Chapter Battle Pass Ticket Pack"
          }
        }
      },
      "coreValue": 0.5
    },
    "strike_points": {
      "name": "Strike Points",
      "category": "currency",
      "per": 100,
      "aliases": [],
      "excludeFromValue": true,
      "value": null,
      "id": "BFYB-CUR"
    },
    "ultra_cores": {
      "name": "Ultra Cores",
      "category": "currency",
      "per": 1,
      "aliases": [],
      "value": 0.12495,
      "id": "UC",
      "observed": {
        "basis": "own",
        "perCash": 8.0032,
        "perCore": null,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 8.0032,
          "day": "2026-10-18",
          "offer": "Cluster of Ultra Cores"
        },
        "byDay": {
          "2026-10-18": {
            "per": 8.0032,
            "offer": "Cluster of Ultra Cores"
          },
          "2026-10-24": {
            "per": 8.0032,
            "offer": "Cluster of Ultra Cores"
          },
          "2026-11-06": {
            "per": 8.0032,
            "offer": "Cluster of Ultra Cores"
          },
          "2026-11-14": {
            "per": 8.0032,
            "offer": "Cluster of Ultra Cores"
          },
          "2026-11-15": {
            "per": 8.0032,
            "offer": "Cluster of Ultra Cores"
          }
        }
      },
      "coreValue": null
    },
    "shard:beast": {
      "name": "Beast shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Beast",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:beta ray bill": {
      "name": "Beta Ray Bill shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Beta Ray Bill",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:blade (mighty)": {
      "name": "Blade (Mighty) shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Blade (Mighty)",
      "value": 0.25998,
      "observed": {
        "basis": "own",
        "perCash": 3.84645,
        "perCore": 0.5,
        "days": [
          "2026-10-18"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 3.84645,
          "day": "2026-10-18",
          "offer": "Iron Vengeance: Blade (Mighty)"
        },
        "byDay": {
          "2026-10-18": {
            "per": 3.84645,
            "offer": "Iron Vengeance: Blade (Mighty)"
          }
        },
        "bestCore": {
          "per": 0.5,
          "day": "2026-10-18",
          "offer": "Iron Vengeance: Blade (Mighty)"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.5,
            "offer": "Iron Vengeance: Blade (Mighty)"
          }
        }
      },
      "coreValue": 2
    },
    "shard:cable": {
      "name": "Cable shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Cable",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:carnage": {
      "name": "Carnage shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Carnage",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:colleen wing": {
      "name": "Colleen Wing shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Colleen Wing",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:colossus": {
      "name": "Colossus shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Colossus",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:crossbones": {
      "name": "Crossbones shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Crossbones",
      "value": 0.016037,
      "id": "SHARD_CROSSBONES",
      "observed": {
        "basis": "own",
        "perCash": 62.3557,
        "perCore": 8.1,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 62.3557,
          "day": "2026-10-18",
          "offer": "Iron Vengeance: Crossbones"
        },
        "byDay": {
          "2026-10-18": {
            "per": 62.3557,
            "offer": "Iron Vengeance: Crossbones"
          }
        },
        "bestCore": {
          "per": 8.1,
          "day": "2026-10-18",
          "offer": "Iron Vengeance: Crossbones"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 8.1,
            "offer": "Iron Vengeance: Crossbones"
          }
        }
      },
      "coreValue": 0.123457
    },
    "shard:cull obsidian": {
      "name": "Cull Obsidian shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Cull Obsidian",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:cyclops": {
      "name": "Cyclops shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Cyclops",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:darkhawk": {
      "name": "Darkhawk shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Darkhawk",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:deadpool": {
      "name": "Deadpool shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Deadpool",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:doctor strange": {
      "name": "Doctor Strange shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Doctor Strange",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:domino": {
      "name": "Domino shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Domino",
      "value": 0.016037,
      "observed": {
        "basis": "own",
        "perCash": 62.3557,
        "perCore": 8.1,
        "days": [
          "2026-10-18"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 62.3557,
          "day": "2026-10-18",
          "offer": "Domino Ultimate Strike"
        },
        "byDay": {
          "2026-10-18": {
            "per": 62.3557,
            "offer": "Domino Ultimate Strike"
          }
        },
        "bestCore": {
          "per": 8.1,
          "day": "2026-10-18",
          "offer": "Domino Ultimate Strike"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 8.1,
            "offer": "Domino Ultimate Strike"
          }
        }
      },
      "coreValue": 0.123457
    },
    "shard:ebony maw": {
      "name": "Ebony Maw shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Ebony Maw",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:executioner": {
      "name": "Executioner shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Executioner",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:forge": {
      "name": "Forge shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Forge",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:gambit": {
      "name": "Gambit shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Gambit",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:ghost rider (robbie)": {
      "name": "Ghost Rider (Robbie) shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Ghost Rider (Robbie)",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:ghost-spider": {
      "name": "Ghost-Spider shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Ghost-Spider",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:gilgamesh": {
      "name": "Gilgamesh shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Gilgamesh",
      "value": 0.3499,
      "observed": {
        "basis": "own",
        "perCash": 2.85796,
        "perCore": 0.4,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 2.85796,
          "day": "2026-10-18",
          "offer": "Eternals Radiance: Gilgamesh"
        },
        "byDay": {
          "2026-10-18": {
            "per": 2.85796,
            "offer": "Eternals Radiance: Gilgamesh"
          }
        },
        "bestCore": {
          "per": 0.4,
          "day": "2026-10-18",
          "offer": "Eternals Radiance: Gilgamesh"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.4,
            "offer": "Eternals Radiance: Gilgamesh"
          }
        }
      },
      "coreValue": 2.5
    },
    "shard:green goblin": {
      "name": "Green Goblin shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Green Goblin",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:gwenom": {
      "name": "Gwenom shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Gwenom",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:hela": {
      "name": "Hela shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Hela",
      "value": 0.0133,
      "observed": {
        "basis": "own",
        "perCash": 75.188,
        "perCore": 10,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 75.188,
          "day": "2026-10-18",
          "offer": "Hela Booster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 75.188,
            "offer": "Hela Booster"
          }
        },
        "bestCore": {
          "per": 10,
          "day": "2026-10-18",
          "offer": "Hela Booster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 10,
            "offer": "Hela Booster"
          }
        }
      },
      "coreValue": 0.1
    },
    "shard:high evolutionary": {
      "name": "High Evolutionary shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "High Evolutionary",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:hulk": {
      "name": "Hulk shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Hulk",
      "value": 0.016037,
      "observed": {
        "basis": "own",
        "perCash": 62.3557,
        "perCore": 8.1,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 62.3557,
          "day": "2026-10-18",
          "offer": "Iron Vengeance: Hulk"
        },
        "byDay": {
          "2026-10-18": {
            "per": 62.3557,
            "offer": "Iron Vengeance: Hulk"
          }
        },
        "bestCore": {
          "per": 8.1,
          "day": "2026-10-18",
          "offer": "Iron Vengeance: Hulk"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 8.1,
            "offer": "Iron Vengeance: Hulk"
          }
        }
      },
      "coreValue": 0.123457
    },
    "shard:iceman": {
      "name": "Iceman shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Iceman",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:ikaris": {
      "name": "Ikaris shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Ikaris",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:iron fist": {
      "name": "Iron Fist shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Iron Fist",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:iron man (infinity war)": {
      "name": "Iron Man (Infinity War) shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Iron Man (Infinity War)",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:iron man (zombie)": {
      "name": "Iron Man (Zombie) shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Iron Man (Zombie)",
      "value": 0.0133,
      "observed": {
        "basis": "own",
        "perCash": 75.188,
        "perCore": 10,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 75.188,
          "day": "2026-10-18",
          "offer": "Iron Man (Zombie) Booster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 75.188,
            "offer": "Iron Man (Zombie) Booster"
          }
        },
        "bestCore": {
          "per": 10,
          "day": "2026-10-18",
          "offer": "Iron Man (Zombie) Booster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 10,
            "offer": "Iron Man (Zombie) Booster"
          }
        }
      },
      "coreValue": 0.1
    },
    "shard:iron monger": {
      "name": "Iron Monger shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Iron Monger",
      "value": 0.4333,
      "id": "SHARD_IRONMONGER",
      "observed": {
        "basis": "own",
        "perCash": 2.30787,
        "perCore": 0.3,
        "days": [
          "2026-10-18",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 5,
        "firstSeen": false,
        "best": {
          "per": 2.85796,
          "day": "2026-11-06",
          "offer": "Cyber Breach: Iron Monger"
        },
        "byDay": {
          "2026-10-18": {
            "per": 2.30787,
            "offer": "Iron Vengeance: Iron Monger"
          },
          "2026-11-06": {
            "per": 2.85796,
            "offer": "Cyber Breach: Iron Monger"
          },
          "2026-11-14": {
            "per": 2.85796,
            "offer": "Cyber Breach: Iron Monger"
          },
          "2026-11-15": {
            "per": 2.85796,
            "offer": "Cyber Breach: Iron Monger"
          }
        },
        "bestCore": {
          "per": 0.4,
          "day": "2026-11-06",
          "offer": "Cyber Breach: Iron Monger"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.3,
            "offer": "Iron Vengeance: Iron Monger"
          },
          "2026-11-06": {
            "per": 0.4,
            "offer": "Cyber Breach: Iron Monger"
          },
          "2026-11-14": {
            "per": 0.4,
            "offer": "Cyber Breach: Iron Monger"
          },
          "2026-11-15": {
            "per": 0.4,
            "offer": "Cyber Breach: Iron Monger"
          }
        }
      },
      "coreValue": 3.33333
    },
    "shard:ironheart (mkii)": {
      "name": "Ironheart (MKII) shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Ironheart (MKII)",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:jocasta": {
      "name": "Jocasta shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Jocasta",
      "value": 0.699898,
      "id": "SHARD_JOCASTA",
      "observed": {
        "basis": "own",
        "perCash": 1.42878,
        "perCore": 0.2,
        "days": [
          "2026-10-18",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 4,
        "firstSeen": false,
        "best": {
          "per": 2.25056,
          "day": "2026-10-18",
          "offer": "(1/6) Boot Sequence"
        },
        "byDay": {
          "2026-10-18": {
            "per": 2.25056,
            "offer": "(1/6) Boot Sequence"
          },
          "2026-11-06": {
            "per": 1.42878,
            "offer": "Cyber Breach: Jocasta"
          },
          "2026-11-14": {
            "per": 1.42878,
            "offer": "Cyber Breach: Jocasta"
          },
          "2026-11-15": {
            "per": 1.42878,
            "offer": "Cyber Breach: Jocasta"
          }
        },
        "bestCore": {
          "per": 0.3,
          "day": "2026-10-18",
          "offer": "(1/6) Boot Sequence"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.3,
            "offer": "(1/6) Boot Sequence"
          },
          "2026-11-06": {
            "per": 0.2,
            "offer": "Cyber Breach: Jocasta"
          },
          "2026-11-14": {
            "per": 0.2,
            "offer": "Cyber Breach: Jocasta"
          },
          "2026-11-15": {
            "per": 0.2,
            "offer": "Cyber Breach: Jocasta"
          }
        }
      },
      "coreValue": 5
    },
    "shard:juggernaut (zombie)": {
      "name": "Juggernaut (Zombie) shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Juggernaut (Zombie)",
      "value": 0.0233,
      "observed": {
        "basis": "own",
        "perCash": 42.9185,
        "perCore": 6,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 42.9185,
          "day": "2026-10-18",
          "offer": "Juggernaut (Zombie) Booster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 42.9185,
            "offer": "Juggernaut (Zombie) Booster"
          }
        },
        "bestCore": {
          "per": 6,
          "day": "2026-10-18",
          "offer": "Juggernaut (Zombie) Booster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 6,
            "offer": "Juggernaut (Zombie) Booster"
          }
        }
      },
      "coreValue": 0.166667
    },
    "shard:kestrel (zombie)": {
      "name": "Kestrel (Zombie) shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Kestrel (Zombie)",
      "value": 0.0873752,
      "observed": {
        "basis": "own",
        "perCash": 11.4449,
        "perCore": 1.6,
        "days": [
          "2026-10-18"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 11.4449,
          "day": "2026-10-18",
          "offer": "Kestrel Starter"
        },
        "byDay": {
          "2026-10-18": {
            "per": 11.4449,
            "offer": "Kestrel Starter"
          }
        },
        "bestCore": {
          "per": 1.6,
          "day": "2026-10-18",
          "offer": "Kestrel Starter"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.6,
            "offer": "Kestrel Starter"
          }
        }
      },
      "coreValue": 0.625
    },
    "shard:kingo": {
      "name": "Kingo shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Kingo",
      "value": 0.3499,
      "observed": {
        "basis": "own",
        "perCash": 2.85796,
        "perCore": 0.4,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 2.85796,
          "day": "2026-10-18",
          "offer": "Eternals Radiance: Kingo"
        },
        "byDay": {
          "2026-10-18": {
            "per": 2.85796,
            "offer": "Eternals Radiance: Kingo"
          }
        },
        "bestCore": {
          "per": 0.4,
          "day": "2026-10-18",
          "offer": "Eternals Radiance: Kingo"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.4,
            "offer": "Eternals Radiance: Kingo"
          }
        }
      },
      "coreValue": 2.5
    },
    "shard:loki (teen)": {
      "name": "Loki (Teen) shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Loki (Teen)",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:loki": {
      "name": "Loki shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Loki",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:luke cage": {
      "name": "Luke Cage shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Luke Cage",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:malekith": {
      "name": "Malekith shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Malekith",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:minn-erva": {
      "name": "Minn-Erva shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Minn-Erva",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:misty knight": {
      "name": "Misty Knight shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Misty Knight",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:ms. marvel (hard light)": {
      "name": "Ms. Marvel (Hard Light) shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Ms. Marvel (Hard Light)",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:mysterio": {
      "name": "Mysterio shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Mysterio",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:negasonic": {
      "name": "Negasonic shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Negasonic",
      "value": 0.016037,
      "observed": {
        "basis": "own",
        "perCash": 62.3557,
        "perCore": 8.1,
        "days": [
          "2026-10-18"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 62.3557,
          "day": "2026-10-18",
          "offer": "Negasonic Ultimate Strike"
        },
        "byDay": {
          "2026-10-18": {
            "per": 62.3557,
            "offer": "Negasonic Ultimate Strike"
          }
        },
        "bestCore": {
          "per": 8.1,
          "day": "2026-10-18",
          "offer": "Negasonic Ultimate Strike"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 8.1,
            "offer": "Negasonic Ultimate Strike"
          }
        }
      },
      "coreValue": 0.123457
    },
    "shard:nightcrawler": {
      "name": "Nightcrawler shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Nightcrawler",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:peni parker": {
      "name": "Peni Parker shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Peni Parker",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:peter b. parker": {
      "name": "Peter B. Parker shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Peter B. Parker",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:phantom rider": {
      "name": "Phantom Rider shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Phantom Rider",
      "value": 0.016037,
      "observed": {
        "basis": "own",
        "perCash": 62.3557,
        "perCore": 8.1,
        "days": [
          "2026-10-18"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 62.3557,
          "day": "2026-10-18",
          "offer": "Phantom Rider Ultimate Strike"
        },
        "byDay": {
          "2026-10-18": {
            "per": 62.3557,
            "offer": "Phantom Rider Ultimate Strike"
          }
        },
        "bestCore": {
          "per": 8.1,
          "day": "2026-10-18",
          "offer": "Phantom Rider Ultimate Strike"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 8.1,
            "offer": "Phantom Rider Ultimate Strike"
          }
        }
      },
      "coreValue": 0.123457
    },
    "shard:photon": {
      "name": "Photon shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Photon",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:quake": {
      "name": "Quake shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Quake",
      "value": 0.016037,
      "observed": {
        "basis": "own",
        "perCash": 62.3557,
        "perCore": 8.1,
        "days": [
          "2026-10-18"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 62.3557,
          "day": "2026-10-18",
          "offer": "Quake Ultimate Strike"
        },
        "byDay": {
          "2026-10-18": {
            "per": 62.3557,
            "offer": "Quake Ultimate Strike"
          }
        },
        "bestCore": {
          "per": 8.1,
          "day": "2026-10-18",
          "offer": "Quake Ultimate Strike"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 8.1,
            "offer": "Quake Ultimate Strike"
          }
        }
      },
      "coreValue": 0.123457
    },
    "shard:quicksilver (symbiote)": {
      "name": "Quicksilver (Symbiote) shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Quicksilver (Symbiote)",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:rachel cole-alves": {
      "name": "Rachel Cole-Alves shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Rachel Cole-Alves",
      "value": 0.25998,
      "observed": {
        "basis": "own",
        "perCash": 3.84645,
        "perCore": 0.5,
        "days": [
          "2026-10-18"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 3.84645,
          "day": "2026-10-18",
          "offer": "Iron Vengeance: Rachel Cole-Alves"
        },
        "byDay": {
          "2026-10-18": {
            "per": 3.84645,
            "offer": "Iron Vengeance: Rachel Cole-Alves"
          }
        },
        "bestCore": {
          "per": 0.5,
          "day": "2026-10-18",
          "offer": "Iron Vengeance: Rachel Cole-Alves"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.5,
            "offer": "Iron Vengeance: Rachel Cole-Alves"
          }
        }
      },
      "coreValue": 2
    },
    "shard:ravager boomer": {
      "name": "Ravager Boomer shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Ravager Boomer",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:ravager bruiser": {
      "name": "Ravager Bruiser shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Ravager Bruiser",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:ravager stitcher": {
      "name": "Ravager Stitcher shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Ravager Stitcher",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:red goblin": {
      "name": "Red Goblin shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Red Goblin",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:rescue": {
      "name": "Rescue shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Rescue",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:rhino": {
      "name": "Rhino shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Rhino",
      "value": 0.016037,
      "observed": {
        "basis": "own",
        "perCash": 62.3557,
        "perCore": 8.1,
        "days": [
          "2026-10-24"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 62.3557,
          "day": "2026-10-24",
          "offer": "Feast of Shadows: Rhino"
        },
        "byDay": {
          "2026-10-24": {
            "per": 62.3557,
            "offer": "Feast of Shadows: Rhino"
          }
        },
        "bestCore": {
          "per": 8.1,
          "day": "2026-10-24",
          "offer": "Feast of Shadows: Rhino"
        },
        "coreByDay": {
          "2026-10-24": {
            "per": 8.1,
            "offer": "Feast of Shadows: Rhino"
          }
        }
      },
      "coreValue": 0.123457
    },
    "shard:riot": {
      "name": "Riot shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Riot",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:ronan the accuser": {
      "name": "Ronan the Accuser shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Ronan the Accuser",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:scarlet witch (zombie)": {
      "name": "Scarlet Witch (Zombie) shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Scarlet Witch (Zombie)",
      "value": 0.0433,
      "observed": {
        "basis": "own",
        "perCash": 23.0947,
        "perCore": 3,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 23.0947,
          "day": "2026-10-18",
          "offer": "Scarlet Witch (Zombie) Booster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 23.0947,
            "offer": "Scarlet Witch (Zombie) Booster"
          }
        },
        "bestCore": {
          "per": 3,
          "day": "2026-10-18",
          "offer": "Scarlet Witch (Zombie) Booster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 3,
            "offer": "Scarlet Witch (Zombie) Booster"
          }
        }
      },
      "coreValue": 0.333333
    },
    "shard:scarlet witch": {
      "name": "Scarlet Witch shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Scarlet Witch",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:sersi": {
      "name": "Sersi shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Sersi",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:shang-chi": {
      "name": "Shang-Chi shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Shang-Chi",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:shocker": {
      "name": "Shocker shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Shocker",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:silver surfer (breaker)": {
      "name": "Silver Surfer (Breaker) shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Silver Surfer (Breaker)",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:spider-man (noir)": {
      "name": "Spider-Man (Noir) shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Spider-Man (Noir)",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:spider-man (pavitr)": {
      "name": "Spider-Man (Pavitr) shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Spider-Man (Pavitr)",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:spider-man 2099": {
      "name": "Spider-Man 2099 shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Spider-Man 2099",
      "value": 0.02598,
      "observed": {
        "basis": "set",
        "perCash": 38.4911,
        "perCore": 5,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 38.4911,
          "day": "2026-10-18",
          "offer": "Web of the Future"
        },
        "byDay": {
          "2026-10-18": {
            "per": 38.4911,
            "offer": "Web of the Future"
          }
        },
        "bestCore": {
          "per": 5,
          "day": "2026-10-18",
          "offer": "Web of the Future"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 5,
            "offer": "Web of the Future"
          }
        }
      },
      "coreValue": 0.2
    },
    "shard:spider-man": {
      "name": "Spider-Man shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Spider-Man",
      "value": 0.016037,
      "observed": {
        "basis": "own",
        "perCash": 62.3557,
        "perCore": 8.1,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 62.3557,
          "day": "2026-10-18",
          "offer": "Iron Vengeance: Spider-Man"
        },
        "byDay": {
          "2026-10-18": {
            "per": 62.3557,
            "offer": "Iron Vengeance: Spider-Man"
          }
        },
        "bestCore": {
          "per": 8.1,
          "day": "2026-10-18",
          "offer": "Iron Vengeance: Spider-Man"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 8.1,
            "offer": "Iron Vengeance: Spider-Man"
          }
        }
      },
      "coreValue": 0.123457
    },
    "shard:spider-woman (julia)": {
      "name": "Spider-Woman (Julia) shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Spider-Woman (Julia)",
      "value": 0.25998,
      "observed": {
        "basis": "own",
        "perCash": 3.84645,
        "perCore": 0.5,
        "days": [
          "2026-10-18"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 3.84645,
          "day": "2026-10-18",
          "offer": "Iron Vengeance: Spider-Woman (Julia)"
        },
        "byDay": {
          "2026-10-18": {
            "per": 3.84645,
            "offer": "Iron Vengeance: Spider-Woman (Julia)"
          }
        },
        "bestCore": {
          "per": 0.5,
          "day": "2026-10-18",
          "offer": "Iron Vengeance: Spider-Woman (Julia)"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.5,
            "offer": "Iron Vengeance: Spider-Woman (Julia)"
          }
        }
      },
      "coreValue": 2
    },
    "shard:star-lord (t'challa)": {
      "name": "Star-Lord (T'Challa) shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Star-Lord (T'Challa)",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:strange (heartless)": {
      "name": "Strange (Heartless) shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Strange (Heartless)",
      "value": 0.0254182,
      "observed": {
        "basis": "set",
        "perCash": 39.3419,
        "perCore": 5.5,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 39.3419,
          "day": "2026-10-18",
          "offer": "Sorcerer Supreme Offer"
        },
        "byDay": {
          "2026-10-18": {
            "per": 39.3419,
            "offer": "Sorcerer Supreme Offer"
          }
        },
        "bestCore": {
          "per": 5.5,
          "day": "2026-10-18",
          "offer": "Sorcerer Supreme Offer"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 5.5,
            "offer": "Sorcerer Supreme Offer"
          }
        }
      },
      "coreValue": 0.181818
    },
    "shard:sunspot": {
      "name": "Sunspot shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Sunspot",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:sylvie": {
      "name": "Sylvie shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Sylvie",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:thanos": {
      "name": "Thanos shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Thanos",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:thena": {
      "name": "Thena shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Thena",
      "value": 0.3499,
      "observed": {
        "basis": "own",
        "perCash": 2.85796,
        "perCore": 0.4,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 2.85796,
          "day": "2026-10-18",
          "offer": "Eternals Radiance: Thena"
        },
        "byDay": {
          "2026-10-18": {
            "per": 2.85796,
            "offer": "Eternals Radiance: Thena"
          }
        },
        "bestCore": {
          "per": 0.4,
          "day": "2026-10-18",
          "offer": "Eternals Radiance: Thena"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.4,
            "offer": "Eternals Radiance: Thena"
          }
        }
      },
      "coreValue": 2.5
    },
    "shard:toxin": {
      "name": "Toxin shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Toxin",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:ulysses klaue": {
      "name": "Ulysses Klaue shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Ulysses Klaue",
      "value": 0.4333,
      "id": "SHARD_ULYSSESKLAUE",
      "observed": {
        "basis": "own",
        "perCash": 2.30787,
        "perCore": 0.3,
        "days": [
          "2026-10-18",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 5,
        "firstSeen": false,
        "best": {
          "per": 2.85796,
          "day": "2026-11-06",
          "offer": "Cyber Breach: Ulysses Klaue"
        },
        "byDay": {
          "2026-10-18": {
            "per": 2.30787,
            "offer": "Iron Vengeance: Ulysses Klaue"
          },
          "2026-11-06": {
            "per": 2.85796,
            "offer": "Cyber Breach: Ulysses Klaue"
          },
          "2026-11-14": {
            "per": 2.85796,
            "offer": "Cyber Breach: Ulysses Klaue"
          },
          "2026-11-15": {
            "per": 2.85796,
            "offer": "Cyber Breach: Ulysses Klaue"
          }
        },
        "bestCore": {
          "per": 0.4,
          "day": "2026-11-06",
          "offer": "Cyber Breach: Ulysses Klaue"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.3,
            "offer": "Iron Vengeance: Ulysses Klaue"
          },
          "2026-11-06": {
            "per": 0.4,
            "offer": "Cyber Breach: Ulysses Klaue"
          },
          "2026-11-14": {
            "per": 0.4,
            "offer": "Cyber Breach: Ulysses Klaue"
          },
          "2026-11-15": {
            "per": 0.4,
            "offer": "Cyber Breach: Ulysses Klaue"
          }
        }
      },
      "coreValue": 3.33333
    },
    "shard:vahl": {
      "name": "Vahl shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Vahl",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:venom": {
      "name": "Venom shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Venom",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:void knight": {
      "name": "Void Knight shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Void Knight",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:vulture": {
      "name": "Vulture shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Vulture",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:wasp (janet)": {
      "name": "Wasp (Janet) shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Wasp (Janet)",
      "value": 0.2499,
      "id": "SHARD_WASPJANET",
      "observed": {
        "basis": "own",
        "perCash": 4.0016,
        "perCore": 0.5,
        "days": [
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 4.0016,
          "day": "2026-11-06",
          "offer": "Short on Wasp (Janet) Shards?"
        },
        "byDay": {
          "2026-11-06": {
            "per": 4.0016,
            "offer": "Short on Wasp (Janet) Shards?"
          },
          "2026-11-14": {
            "per": 4.0016,
            "offer": "Short on Wasp (Janet) Shards?"
          },
          "2026-11-15": {
            "per": 4.0016,
            "offer": "Short on Wasp (Janet) Shards?"
          }
        },
        "bestCore": {
          "per": 0.5,
          "day": "2026-11-06",
          "offer": "Short on Wasp (Janet) Shards?"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 0.5,
            "offer": "Short on Wasp (Janet) Shards?"
          },
          "2026-11-14": {
            "per": 0.5,
            "offer": "Short on Wasp (Janet) Shards?"
          },
          "2026-11-15": {
            "per": 0.5,
            "offer": "Short on Wasp (Janet) Shards?"
          }
        }
      },
      "coreValue": 2
    },
    "shard:whiplash": {
      "name": "Whiplash shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Whiplash",
      "value": 0.4333,
      "id": "SHARD_WHIPLASH",
      "observed": {
        "basis": "own",
        "perCash": 2.30787,
        "perCore": 0.3,
        "days": [
          "2026-10-18",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 5,
        "firstSeen": false,
        "best": {
          "per": 2.85796,
          "day": "2026-11-06",
          "offer": "Cyber Breach: Whiplash"
        },
        "byDay": {
          "2026-10-18": {
            "per": 2.30787,
            "offer": "Iron Vengeance: Whiplash"
          },
          "2026-11-06": {
            "per": 2.85796,
            "offer": "Cyber Breach: Whiplash"
          },
          "2026-11-14": {
            "per": 2.85796,
            "offer": "Cyber Breach: Whiplash"
          },
          "2026-11-15": {
            "per": 2.85796,
            "offer": "Cyber Breach: Whiplash"
          }
        },
        "bestCore": {
          "per": 0.4,
          "day": "2026-11-06",
          "offer": "Cyber Breach: Whiplash"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.3,
            "offer": "Iron Vengeance: Whiplash"
          },
          "2026-11-06": {
            "per": 0.4,
            "offer": "Cyber Breach: Whiplash"
          },
          "2026-11-14": {
            "per": 0.4,
            "offer": "Cyber Breach: Whiplash"
          },
          "2026-11-15": {
            "per": 0.4,
            "offer": "Cyber Breach: Whiplash"
          }
        }
      },
      "coreValue": 3.33333
    },
    "shard:x-23": {
      "name": "X-23 shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "X-23",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:yellowjacket": {
      "name": "Yellowjacket shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Yellowjacket",
      "value": 0.016037,
      "id": "SHARD_YELLOWJACKET",
      "observed": {
        "basis": "own",
        "perCash": 62.3557,
        "perCore": 8.1,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 62.3557,
          "day": "2026-10-18",
          "offer": "Iron Vengeance: Yellowjacket"
        },
        "byDay": {
          "2026-10-18": {
            "per": 62.3557,
            "offer": "Iron Vengeance: Yellowjacket"
          }
        },
        "bestCore": {
          "per": 8.1,
          "day": "2026-10-18",
          "offer": "Iron Vengeance: Yellowjacket"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 8.1,
            "offer": "Iron Vengeance: Yellowjacket"
          }
        }
      },
      "coreValue": 0.123457
    },
    "shard:yo-yo": {
      "name": "Yo-Yo shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Yo-Yo",
      "value": 0.016037,
      "observed": {
        "basis": "own",
        "perCash": 62.3557,
        "perCore": 8.1,
        "days": [
          "2026-10-18"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 62.3557,
          "day": "2026-10-18",
          "offer": "Yo-Yo Ultimate Strike"
        },
        "byDay": {
          "2026-10-18": {
            "per": 62.3557,
            "offer": "Yo-Yo Ultimate Strike"
          }
        },
        "bestCore": {
          "per": 8.1,
          "day": "2026-10-18",
          "offer": "Yo-Yo Ultimate Strike"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 8.1,
            "offer": "Yo-Yo Ultimate Strike"
          }
        }
      },
      "coreValue": 0.123457
    },
    "shard:yondu": {
      "name": "Yondu shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Yondu",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "training_module:l1": {
      "name": "L1 Training Module",
      "category": "training",
      "per": 1,
      "aliases": [],
      "xp": 50,
      "derivedFrom": {
        "key": "training_module:l4",
        "ratio": 0.03125,
        "basis": "XP"
      },
      "value": null,
      "observed": {
        "note": "priced from training_module:l4 by XP"
      }
    },
    "training_module:l2": {
      "name": "L2 Training Module",
      "category": "training",
      "per": 1,
      "aliases": [],
      "xp": 200,
      "derivedFrom": {
        "key": "training_module:l4",
        "ratio": 0.125,
        "basis": "XP"
      },
      "value": null,
      "observed": {
        "note": "priced from training_module:l4 by XP"
      }
    },
    "training_module:l3": {
      "name": "L3 Training Module",
      "category": "training",
      "per": 1,
      "aliases": [],
      "xp": 800,
      "derivedFrom": {
        "key": "training_module:l4",
        "ratio": 0.5,
        "basis": "XP"
      },
      "value": null,
      "id": "CONSUMABLE_XPLVL60",
      "observed": {
        "note": "priced from training_module:l4 by XP"
      }
    },
    "training_module:l4": {
      "name": "L4 Training Module",
      "category": "training",
      "per": 100,
      "aliases": [],
      "xp": 1600,
      "value": 0.540909,
      "id": "CONSUMABLE_XPLVL80",
      "observed": {
        "basis": "own",
        "perCash": 184.874,
        "perCore": 23.1,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 16,
        "firstSeen": false,
        "best": {
          "per": 184.874,
          "day": "2026-10-18",
          "offer": "Iron Vengeance: Terrific Training"
        },
        "byDay": {
          "2026-10-18": {
            "per": 184.874,
            "offer": "Iron Vengeance: Terrific Training"
          },
          "2026-10-24": {
            "per": 184.874,
            "offer": "Feast of Shadows: Terrific Training"
          },
          "2026-11-06": {
            "per": 184.874,
            "offer": "Cyber Breach: Terrific Training"
          },
          "2026-11-14": {
            "per": 184.874,
            "offer": "Cyber Breach: Terrific Training"
          },
          "2026-11-15": {
            "per": 184.874,
            "offer": "Cyber Breach: Terrific Training"
          }
        },
        "bestCore": {
          "per": 23.1,
          "day": "2026-10-18",
          "offer": "Iron Vengeance: Terrific Training"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 23.1,
            "offer": "Iron Vengeance: Terrific Training"
          },
          "2026-10-24": {
            "per": 23.1,
            "offer": "Feast of Shadows: Terrific Training"
          },
          "2026-11-06": {
            "per": 23.1,
            "offer": "Cyber Breach: Terrific Training"
          },
          "2026-11-14": {
            "per": 23.1,
            "offer": "Cyber Breach: Terrific Training"
          },
          "2026-11-15": {
            "per": 23.1,
            "offer": "Cyber Breach: Terrific Training"
          }
        }
      },
      "coreValue": 4.329
    },
    "ability_material:phantom_rider_basic_awakened": {
      "name": "Phantom Rider's Basic Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "aliases": [],
      "character": "Phantom Rider",
      "value": 0.03495,
      "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_PHANTOMRIDER_BASIC",
      "observed": {
        "basis": "own",
        "perCash": 28.6123,
        "perCore": 4,
        "days": [
          "2026-10-18",
          "2026-11-14"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 28.6123,
          "day": "2026-10-18",
          "offer": "Phantom Rider Awakening"
        },
        "byDay": {
          "2026-10-18": {
            "per": 28.6123,
            "offer": "Phantom Rider Awakening"
          },
          "2026-11-14": {
            "per": 15.3965,
            "offer": "Awakened Quickdraw"
          },
          "2026-11-15": {
            "per": 15.3965,
            "offer": "Awakened Quickdraw"
          }
        },
        "bestCore": {
          "per": 4,
          "day": "2026-10-18",
          "offer": "Phantom Rider Awakening"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 4,
            "offer": "Phantom Rider Awakening"
          },
          "2026-11-14": {
            "per": 2,
            "offer": "Awakened Quickdraw"
          },
          "2026-11-15": {
            "per": 2,
            "offer": "Awakened Quickdraw"
          }
        }
      },
      "coreValue": 0.25
    },
    "ability_material:phantom_rider_special_awakened": {
      "name": "Phantom Rider's Special Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "aliases": [],
      "character": "Phantom Rider",
      "value": 0.03495,
      "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_PHANTOMRIDER_SPECIAL",
      "observed": {
        "basis": "own",
        "perCash": 28.6123,
        "perCore": 4,
        "days": [
          "2026-10-18",
          "2026-11-14"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 28.6123,
          "day": "2026-10-18",
          "offer": "Phantom Rider Awakening"
        },
        "byDay": {
          "2026-10-18": {
            "per": 28.6123,
            "offer": "Phantom Rider Awakening"
          },
          "2026-11-14": {
            "per": 15.3965,
            "offer": "Awakened Ghost Ride"
          },
          "2026-11-15": {
            "per": 15.3965,
            "offer": "Awakened Ghost Ride"
          }
        },
        "bestCore": {
          "per": 4,
          "day": "2026-10-18",
          "offer": "Phantom Rider Awakening"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 4,
            "offer": "Phantom Rider Awakening"
          },
          "2026-11-14": {
            "per": 2,
            "offer": "Awakened Ghost Ride"
          },
          "2026-11-15": {
            "per": 2,
            "offer": "Awakened Ghost Ride"
          }
        }
      },
      "coreValue": 0.25
    },
    "ability_material:phantom_rider_ultimate_awakened": {
      "name": "Phantom Rider's Ultimate Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "aliases": [],
      "character": "Phantom Rider",
      "value": 0.03495,
      "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_PHANTOMRIDER_ULTIMATE",
      "observed": {
        "basis": "own",
        "perCash": 28.6123,
        "perCore": 4,
        "days": [
          "2026-10-18",
          "2026-11-14"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 28.6123,
          "day": "2026-10-18",
          "offer": "Phantom Rider Awakening"
        },
        "byDay": {
          "2026-10-18": {
            "per": 28.6123,
            "offer": "Phantom Rider Awakening"
          },
          "2026-11-14": {
            "per": 15.3965,
            "offer": "Awakened Bucking Banshee"
          },
          "2026-11-15": {
            "per": 15.3965,
            "offer": "Awakened Bucking Banshee"
          }
        },
        "bestCore": {
          "per": 4,
          "day": "2026-10-18",
          "offer": "Phantom Rider Awakening"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 4,
            "offer": "Phantom Rider Awakening"
          },
          "2026-11-14": {
            "per": 2,
            "offer": "Awakened Bucking Banshee"
          },
          "2026-11-15": {
            "per": 2,
            "offer": "Awakened Bucking Banshee"
          }
        }
      },
      "coreValue": 0.25
    },
    "ability_material:t1": {
      "name": "T1 Ability Material",
      "category": "ability",
      "per": 1,
      "aliases": [],
      "value": null,
      "id": "ABILITY_MATERIAL_GREEN_ABILITY_MAT",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "ability_material:t2": {
      "name": "T2 Ability Material",
      "category": "ability",
      "per": 1,
      "aliases": [],
      "value": null,
      "id": "ABILITY_MATERIAL_BLUE_ABILITY_MAT",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "ability_material:t3": {
      "name": "T3 Ability Material",
      "category": "ability",
      "per": 100,
      "aliases": [],
      "value": null,
      "id": "ABILITY_MATERIAL_PURPLE_ABILITY_MAT",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "ability_material:t4": {
      "name": "T4 Ability Material",
      "category": "ability",
      "per": 1,
      "aliases": [],
      "value": 0.0270162,
      "id": "ABILITY_MATERIAL_ORANGE_ABILITY_MAT",
      "observed": {
        "basis": "own",
        "perCash": 37.0148,
        "perCore": 4.625,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 13,
        "firstSeen": false,
        "best": {
          "per": 39.2157,
          "day": "2026-10-18",
          "offer": "Ability Ultimate Bundle"
        },
        "byDay": {
          "2026-10-18": {
            "per": 39.2157,
            "offer": "Ability Ultimate Bundle"
          },
          "2026-10-24": {
            "per": 37.0148,
            "offer": "Ability Ultimate Cache"
          },
          "2026-11-06": {
            "per": 37.415,
            "offer": "Ability Ultimate Stash"
          },
          "2026-11-14": {
            "per": 33.6134,
            "offer": "Cyber Breach: Ability Power Up"
          },
          "2026-11-15": {
            "per": 33.6134,
            "offer": "Cyber Breach: Ability Power Up"
          }
        },
        "bestCore": {
          "per": 4.9,
          "day": "2026-10-18",
          "offer": "Ability Ultimate Bundle"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 4.9,
            "offer": "Ability Ultimate Bundle"
          },
          "2026-10-24": {
            "per": 4.625,
            "offer": "Ability Ultimate Cache"
          },
          "2026-11-06": {
            "per": 4.675,
            "offer": "Ability Ultimate Stash"
          },
          "2026-11-14": {
            "per": 4.25,
            "offer": "Ability Value Vault"
          },
          "2026-11-15": {
            "per": 4.2,
            "offer": "Cyber Breach: Ability Power Up"
          }
        }
      },
      "coreValue": 0.216216
    },
    "iso8:t1_ions": {
      "name": "T1 Ions",
      "category": "iso8",
      "per": 1000000,
      "aliases": [],
      "value": 3.495,
      "observed": {
        "basis": "set",
        "perCash": 286123,
        "perCore": 40000,
        "days": [
          "2026-10-18"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 858369,
          "day": "2026-11-15",
          "offer": "Unlock Special: Blue ISO"
        },
        "byDay": {
          "2026-10-18": {
            "per": 286123,
            "offer": "Green ISO Ions Top Up"
          },
          "2026-11-15": {
            "per": 858369,
            "offer": "Unlock Special: Blue ISO"
          }
        },
        "bestCore": {
          "per": 120000,
          "day": "2026-11-15",
          "offer": "Unlock Special: Blue ISO"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 40000,
            "offer": "Green ISO Ions Top Up"
          },
          "2026-11-15": {
            "per": 120000,
            "offer": "Unlock Special: Blue ISO"
          }
        }
      },
      "coreValue": 25,
      "id": "ISO8-TIER-0-CURRENCY"
    },
    "iso8:t2_brawler_armor_level_1_iso-8": {
      "name": "T2 Brawler Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "iso8:t2_brawler_focus_level_1_iso-8": {
      "name": "T2 Brawler Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "iso8:t2_brawler_health_level_1_iso-8": {
      "name": "T2 Brawler Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "iso8:t2_brawler_resist_level_1_iso-8": {
      "name": "T2 Brawler Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "iso8:t2_level_5_ions": {
      "name": "T2 Level 5 Ions",
      "category": "iso8",
      "per": 1000000,
      "aliases": [],
      "value": 1.7475,
      "observed": {
        "basis": "set",
        "perCash": 572246,
        "perCore": 80000,
        "days": [
          "2026-10-18"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 1287550,
          "day": "2026-11-15",
          "offer": "Unlock Special: Blue ISO"
        },
        "byDay": {
          "2026-10-18": {
            "per": 572246,
            "offer": "Blue ISO Ions Top Up"
          },
          "2026-11-15": {
            "per": 1287550,
            "offer": "Unlock Special: Blue ISO"
          }
        },
        "bestCore": {
          "per": 180000,
          "day": "2026-11-15",
          "offer": "Unlock Special: Blue ISO"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 80000,
            "offer": "Blue ISO Ions Top Up"
          },
          "2026-11-15": {
            "per": 180000,
            "offer": "Unlock Special: Blue ISO"
          }
        }
      },
      "coreValue": 12.5,
      "id": "ISO8-TIER-1-C-CURRENCY"
    },
    "iso8:t3_blaster_armor_level_1_iso-8": {
      "name": "T3 Blaster Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.0987411,
      "id": "ISOITEM_PURPLE_BLASTER_ARMOR_11",
      "observed": {
        "basis": "own",
        "perCash": 10.1275,
        "perCore": 1.35,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 10.1275,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "bestCore": {
          "per": 1.35,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "family": "family:t3_crystals"
      },
      "coreValue": 0.740741
    },
    "iso8:t3_blaster_damage_level_1_iso-8": {
      "name": "T3 Blaster Damage Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.0987411,
      "id": "ISOITEM_PURPLE_BLASTER_DAMAGE_11",
      "observed": {
        "basis": "own",
        "perCash": 10.1275,
        "perCore": 1.35,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 10.1275,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "bestCore": {
          "per": 1.35,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "family": "family:t3_crystals"
      },
      "coreValue": 0.740741
    },
    "iso8:t3_blaster_focus_level_1_iso-8": {
      "name": "T3 Blaster Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.0987411,
      "id": "ISOITEM_PURPLE_BLASTER_FOCUS_11",
      "observed": {
        "basis": "own",
        "perCash": 10.1275,
        "perCore": 1.35,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 10.1275,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "bestCore": {
          "per": 1.35,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "family": "family:t3_crystals"
      },
      "coreValue": 0.740741
    },
    "iso8:t3_blaster_health_level_1_iso-8": {
      "name": "T3 Blaster Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.0987411,
      "id": "ISOITEM_PURPLE_BLASTER_HEALTH_11",
      "observed": {
        "basis": "own",
        "perCash": 10.1275,
        "perCore": 1.35,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 10.1275,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "bestCore": {
          "per": 1.35,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "family": "family:t3_crystals"
      },
      "coreValue": 0.740741
    },
    "iso8:t3_blaster_resist_level_1_iso-8": {
      "name": "T3 Blaster Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.0987411,
      "id": "ISOITEM_PURPLE_BLASTER_RESIST_11",
      "observed": {
        "basis": "own",
        "perCash": 10.1275,
        "perCore": 1.35,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 10.1275,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "bestCore": {
          "per": 1.35,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "family": "family:t3_crystals"
      },
      "coreValue": 0.740741
    },
    "iso8:t3_brawler_armor_level_1_iso-8": {
      "name": "T3 Brawler Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.0987411,
      "id": "ISOITEM_PURPLE_BRAWLER_ARMOR_11",
      "observed": {
        "basis": "own",
        "perCash": 10.1275,
        "perCore": 1.35,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 10.1275,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "bestCore": {
          "per": 1.35,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "family": "family:t3_crystals"
      },
      "coreValue": 0.740741
    },
    "iso8:t3_brawler_damage_level_1_iso-8": {
      "name": "T3 Brawler Damage Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.0987411,
      "id": "ISOITEM_PURPLE_BRAWLER_DAMAGE_11",
      "observed": {
        "basis": "own",
        "perCash": 10.1275,
        "perCore": 1.35,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 10.1275,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "bestCore": {
          "per": 1.35,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "family": "family:t3_crystals"
      },
      "coreValue": 0.740741
    },
    "iso8:t3_brawler_focus_level_1_iso-8": {
      "name": "T3 Brawler Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.0987411,
      "id": "ISOITEM_PURPLE_BRAWLER_FOCUS_11",
      "observed": {
        "basis": "own",
        "perCash": 10.1275,
        "perCore": 1.35,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 10.1275,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "bestCore": {
          "per": 1.35,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "family": "family:t3_crystals"
      },
      "coreValue": 0.740741
    },
    "iso8:t3_brawler_health_level_1_iso-8": {
      "name": "T3 Brawler Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.0987411,
      "id": "ISOITEM_PURPLE_BRAWLER_HEALTH_11",
      "observed": {
        "basis": "own",
        "perCash": 10.1275,
        "perCore": 1.35,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 10.1275,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "bestCore": {
          "per": 1.35,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "family": "family:t3_crystals"
      },
      "coreValue": 0.740741
    },
    "iso8:t3_brawler_resist_level_1_iso-8": {
      "name": "T3 Brawler Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.0987411,
      "id": "ISOITEM_PURPLE_BRAWLER_RESIST_11",
      "observed": {
        "basis": "own",
        "perCash": 10.1275,
        "perCore": 1.35,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 10.1275,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "bestCore": {
          "per": 1.35,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "family": "family:t3_crystals"
      },
      "coreValue": 0.740741
    },
    "iso8:t3_controller_armor_level_1_iso-8": {
      "name": "T3 Controller Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.0987411,
      "id": "ISOITEM_PURPLE_CONTROLLER_ARMOR_11",
      "observed": {
        "basis": "own",
        "perCash": 10.1275,
        "perCore": 1.35,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 10.1275,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "bestCore": {
          "per": 1.35,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "family": "family:t3_crystals"
      },
      "coreValue": 0.740741
    },
    "iso8:t3_controller_damage_level_1_iso-8": {
      "name": "T3 Controller Damage Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.0987411,
      "id": "ISOITEM_PURPLE_CONTROLLER_DAMAGE_11",
      "observed": {
        "basis": "own",
        "perCash": 10.1275,
        "perCore": 1.35,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 10.1275,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "bestCore": {
          "per": 1.35,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "family": "family:t3_crystals"
      },
      "coreValue": 0.740741
    },
    "iso8:t3_controller_focus_level_1_iso-8": {
      "name": "T3 Controller Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.0987411,
      "id": "ISOITEM_PURPLE_CONTROLLER_FOCUS_11",
      "observed": {
        "basis": "own",
        "perCash": 10.1275,
        "perCore": 1.35,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 10.1275,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "bestCore": {
          "per": 1.35,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "family": "family:t3_crystals"
      },
      "coreValue": 0.740741
    },
    "iso8:t3_controller_health_level_1_iso-8": {
      "name": "T3 Controller Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.0987411,
      "id": "ISOITEM_PURPLE_CONTROLLER_HEALTH_11",
      "observed": {
        "basis": "own",
        "perCash": 10.1275,
        "perCore": 1.35,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 10.1275,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "bestCore": {
          "per": 1.35,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "family": "family:t3_crystals"
      },
      "coreValue": 0.740741
    },
    "iso8:t3_controller_resist_level_1_iso-8": {
      "name": "T3 Controller Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.0987411,
      "id": "ISOITEM_PURPLE_CONTROLLER_RESIST_11",
      "observed": {
        "basis": "own",
        "perCash": 10.1275,
        "perCore": 1.35,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 10.1275,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "bestCore": {
          "per": 1.35,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "family": "family:t3_crystals"
      },
      "coreValue": 0.740741
    },
    "iso8:t3_iso-8_credits": {
      "name": "T3 Iso-8 Credits",
      "category": "iso8",
      "per": 100,
      "aliases": [],
      "value": null,
      "id": "ISO8-TIER-2-ITEM-CREDITS-CURRENCY",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "iso8:t3_level_1_ions": {
      "name": "T3 Level 1 Ions",
      "category": "iso8",
      "per": 1000000,
      "aliases": [],
      "value": 4.81112,
      "id": "ISO8-TIER-2-A-CURRENCY",
      "observed": {
        "basis": "own",
        "perCash": 207852,
        "perCore": 27000,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 386266,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Ion Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 386266,
            "offer": "Unlock Special: T3 Ion Max"
          },
          "2026-10-24": {
            "per": 207852,
            "offer": "Unlock Special: T3 Ion Max"
          },
          "2026-11-06": {
            "per": 207852,
            "offer": "Unlock Special: T3 Ion Max"
          }
        },
        "bestCore": {
          "per": 54000,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Ion Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 54000,
            "offer": "Unlock Special: T3 Ion Max"
          },
          "2026-10-24": {
            "per": 27000,
            "offer": "Unlock Special: T3 Ion Max"
          },
          "2026-11-06": {
            "per": 27000,
            "offer": "Unlock Special: T3 Ion Max"
          }
        }
      },
      "coreValue": 37.037
    },
    "iso8:t3_level_4_ions": {
      "name": "T3 Level 4 Ions",
      "category": "iso8",
      "per": 1000000,
      "aliases": [],
      "value": 3.70185,
      "id": "ISO8-TIER-2-B-CURRENCY",
      "observed": {
        "basis": "set",
        "perCash": 270135,
        "perCore": 36000,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 8,
        "firstSeen": false,
        "best": {
          "per": 1030040,
          "day": "2026-10-18",
          "offer": "ISO Fest: T3 Level 4 Ions"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1030040,
            "offer": "ISO Fest: T3 Level 4 Ions"
          },
          "2026-10-24": {
            "per": 335410,
            "offer": "Age of Fear: T3 Ions Bundle"
          },
          "2026-11-06": {
            "per": 270135,
            "offer": "Cyber Breach: Ions Special"
          },
          "2026-11-14": {
            "per": 270135,
            "offer": "Cyber Breach: Ions Special"
          },
          "2026-11-15": {
            "per": 270135,
            "offer": "Cyber Breach: Ions Special"
          }
        },
        "bestCore": {
          "per": 144000,
          "day": "2026-10-18",
          "offer": "ISO Fest: T3 Level 4 Ions"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 144000,
            "offer": "ISO Fest: T3 Level 4 Ions"
          },
          "2026-10-24": {
            "per": 43600,
            "offer": "Age of Fear: T3 Ions Bundle"
          },
          "2026-11-06": {
            "per": 36000,
            "offer": "Cyber Breach: Ions Special"
          },
          "2026-11-14": {
            "per": 36000,
            "offer": "Cyber Breach: Ions Special"
          },
          "2026-11-15": {
            "per": 36000,
            "offer": "Cyber Breach: Ions Special"
          }
        }
      },
      "coreValue": 27.7778
    },
    "iso8:t3_level_5_ions": {
      "name": "T3 Level 5 Ions",
      "category": "iso8",
      "per": 1000000,
      "aliases": [],
      "value": 2.98143,
      "id": "ISO8-TIER-2-C-CURRENCY",
      "observed": {
        "basis": "set",
        "perCash": 335410,
        "perCore": 43600,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 10,
        "firstSeen": false,
        "best": {
          "per": 858369,
          "day": "2026-10-18",
          "offer": "ISO Fest: T3 Level 5 Ions"
        },
        "byDay": {
          "2026-10-18": {
            "per": 858369,
            "offer": "ISO Fest: T3 Level 5 Ions"
          },
          "2026-10-24": {
            "per": 335410,
            "offer": "Age of Fear: T3 Ions Bundle"
          },
          "2026-11-06": {
            "per": 270135,
            "offer": "Cyber Breach: Ions Special"
          },
          "2026-11-14": {
            "per": 858369,
            "offer": "ISO Fest: T3 Level 5 Ions"
          },
          "2026-11-15": {
            "per": 858369,
            "offer": "ISO Fest: T3 Level 5 Ions"
          }
        },
        "bestCore": {
          "per": 120000,
          "day": "2026-10-18",
          "offer": "ISO Fest: T3 Level 5 Ions"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 120000,
            "offer": "ISO Fest: T3 Level 5 Ions"
          },
          "2026-10-24": {
            "per": 43600,
            "offer": "Age of Fear: T3 Ions Bundle"
          },
          "2026-11-06": {
            "per": 36000,
            "offer": "Cyber Breach: Ions Special"
          },
          "2026-11-14": {
            "per": 120000,
            "offer": "ISO Fest: T3 Level 5 Ions"
          },
          "2026-11-15": {
            "per": 120000,
            "offer": "ISO Fest: T3 Level 5 Ions"
          }
        }
      },
      "coreValue": 22.9358
    },
    "iso8:t3_protector_armor_level_1_iso-8": {
      "name": "T3 Protector Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.0987411,
      "id": "ISOITEM_PURPLE_PROTECTOR_ARMOR_11",
      "observed": {
        "basis": "own",
        "perCash": 10.1275,
        "perCore": 1.35,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 10.1275,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "bestCore": {
          "per": 1.35,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "family": "family:t3_crystals"
      },
      "coreValue": 0.740741
    },
    "iso8:t3_protector_damage_level_1_iso-8": {
      "name": "T3 Protector Damage Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.0987411,
      "id": "ISOITEM_PURPLE_PROTECTOR_DAMAGE_11",
      "observed": {
        "basis": "own",
        "perCash": 10.1275,
        "perCore": 1.35,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 10.1275,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "bestCore": {
          "per": 1.35,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "family": "family:t3_crystals"
      },
      "coreValue": 0.740741
    },
    "iso8:t3_protector_focus_level_1_iso-8": {
      "name": "T3 Protector Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.0987411,
      "id": "ISOITEM_PURPLE_PROTECTOR_FOCUS_11",
      "observed": {
        "basis": "own",
        "perCash": 10.1275,
        "perCore": 1.35,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 10.1275,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "bestCore": {
          "per": 1.35,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "family": "family:t3_crystals"
      },
      "coreValue": 0.740741
    },
    "iso8:t3_protector_health_level_1_iso-8": {
      "name": "T3 Protector Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.0987411,
      "id": "ISOITEM_PURPLE_PROTECTOR_HEALTH_11",
      "observed": {
        "basis": "own",
        "perCash": 10.1275,
        "perCore": 1.35,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 10.1275,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "bestCore": {
          "per": 1.35,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "family": "family:t3_crystals"
      },
      "coreValue": 0.740741
    },
    "iso8:t3_protector_resist_level_1_iso-8": {
      "name": "T3 Protector Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.0987411,
      "id": "ISOITEM_PURPLE_PROTECTOR_RESIST_11",
      "observed": {
        "basis": "own",
        "perCash": 10.1275,
        "perCore": 1.35,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 10.1275,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "bestCore": {
          "per": 1.35,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "family": "family:t3_crystals"
      },
      "coreValue": 0.740741
    },
    "iso8:t3_support_armor_level_1_iso-8": {
      "name": "T3 Support Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.0987411,
      "id": "ISOITEM_PURPLE_SUPPORT_ARMOR_11",
      "observed": {
        "basis": "own",
        "perCash": 10.1275,
        "perCore": 1.35,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 10.1275,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "bestCore": {
          "per": 1.35,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "family": "family:t3_crystals"
      },
      "coreValue": 0.740741
    },
    "iso8:t3_support_damage_level_1_iso-8": {
      "name": "T3 Support Damage Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.0987411,
      "id": "ISOITEM_PURPLE_SUPPORT_DAMAGE_11",
      "observed": {
        "basis": "own",
        "perCash": 10.1275,
        "perCore": 1.35,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 10.1275,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "bestCore": {
          "per": 1.35,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "family": "family:t3_crystals"
      },
      "coreValue": 0.740741
    },
    "iso8:t3_support_focus_level_1_iso-8": {
      "name": "T3 Support Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.0987411,
      "id": "ISOITEM_PURPLE_SUPPORT_FOCUS_11",
      "observed": {
        "basis": "own",
        "perCash": 10.1275,
        "perCore": 1.35,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 10.1275,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "bestCore": {
          "per": 1.35,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "family": "family:t3_crystals"
      },
      "coreValue": 0.740741
    },
    "iso8:t3_support_health_level_1_iso-8": {
      "name": "T3 Support Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.0987411,
      "id": "ISOITEM_PURPLE_SUPPORT_HEALTH_11",
      "observed": {
        "basis": "own",
        "perCash": 10.1275,
        "perCore": 1.35,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 10.1275,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "bestCore": {
          "per": 1.35,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "family": "family:t3_crystals"
      },
      "coreValue": 0.740741
    },
    "iso8:t3_support_resist_level_1_iso-8": {
      "name": "T3 Support Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.0987411,
      "id": "ISOITEM_PURPLE_SUPPORT_RESIST_11",
      "observed": {
        "basis": "own",
        "perCash": 10.1275,
        "perCore": 1.35,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 10.1275,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "byDay": {
          "2026-10-18": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 10.1275,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "bestCore": {
          "per": 1.35,
          "day": "2026-10-18",
          "offer": "Unlock Special: T3 Crystal Max"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-10-24": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          },
          "2026-11-06": {
            "per": 1.35,
            "offer": "Unlock Special: T3 Crystal Max"
          }
        },
        "family": "family:t3_crystals"
      },
      "coreValue": 0.740741
    },
    "iso8:t4_blaster_armor_level_1_iso-8": {
      "name": "T4 Blaster Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "ISOITEM_ORANGE_BLASTER_ARMOR_16",
      "observed": {
        "basis": "own",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 1.12528,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "family": "family:t4_crystals"
      },
      "coreValue": 6.66667
    },
    "iso8:t4_blaster_damage_level_1_iso-8": {
      "name": "T4 Blaster Damage Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "ISOITEM_ORANGE_BLASTER_DAMAGE_16",
      "observed": {
        "basis": "own",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 1.12528,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "family": "family:t4_crystals"
      },
      "coreValue": 6.66667
    },
    "iso8:t4_blaster_focus_level_1_iso-8": {
      "name": "T4 Blaster Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "ISOITEM_ORANGE_BLASTER_FOCUS_16",
      "observed": {
        "basis": "own",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 1.12528,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "family": "family:t4_crystals"
      },
      "coreValue": 6.66667
    },
    "iso8:t4_blaster_health_level_1_iso-8": {
      "name": "T4 Blaster Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "ISOITEM_ORANGE_BLASTER_HEALTH_16",
      "observed": {
        "basis": "own",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 1.12528,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "family": "family:t4_crystals"
      },
      "coreValue": 6.66667
    },
    "iso8:t4_blaster_resist_level_1_iso-8": {
      "name": "T4 Blaster Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "ISOITEM_ORANGE_BLASTER_RESIST_16",
      "observed": {
        "basis": "own",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 1.12528,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "family": "family:t4_crystals"
      },
      "coreValue": 6.66667
    },
    "iso8:t4_brawler_armor_level_1_iso-8": {
      "name": "T4 Brawler Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "ISOITEM_ORANGE_BRAWLER_ARMOR_16",
      "observed": {
        "basis": "own",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 1.12528,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "family": "family:t4_crystals"
      },
      "coreValue": 6.66667
    },
    "iso8:t4_brawler_damage_level_1_iso-8": {
      "name": "T4 Brawler Damage Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "ISOITEM_ORANGE_BRAWLER_DAMAGE_16",
      "observed": {
        "basis": "own",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 1.12528,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "family": "family:t4_crystals"
      },
      "coreValue": 6.66667
    },
    "iso8:t4_brawler_focus_level_1_iso-8": {
      "name": "T4 Brawler Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "ISOITEM_ORANGE_BRAWLER_FOCUS_16",
      "observed": {
        "basis": "own",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 1.12528,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "family": "family:t4_crystals"
      },
      "coreValue": 6.66667
    },
    "iso8:t4_brawler_health_level_1_iso-8": {
      "name": "T4 Brawler Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "ISOITEM_ORANGE_BRAWLER_HEALTH_16",
      "observed": {
        "basis": "own",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 1.12528,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "family": "family:t4_crystals"
      },
      "coreValue": 6.66667
    },
    "iso8:t4_brawler_resist_level_1_iso-8": {
      "name": "T4 Brawler Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "ISOITEM_ORANGE_BRAWLER_RESIST_16",
      "observed": {
        "basis": "own",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 1.12528,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "family": "family:t4_crystals"
      },
      "coreValue": 6.66667
    },
    "iso8:t4_controller_armor_level_1_iso-8": {
      "name": "T4 Controller Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "ISOITEM_ORANGE_CONTROLLER_ARMOR_16",
      "observed": {
        "basis": "own",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 1.12528,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "family": "family:t4_crystals"
      },
      "coreValue": 6.66667
    },
    "iso8:t4_controller_damage_level_1_iso-8": {
      "name": "T4 Controller Damage Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "ISOITEM_ORANGE_CONTROLLER_DAMAGE_16",
      "observed": {
        "basis": "own",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 1.12528,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "family": "family:t4_crystals"
      },
      "coreValue": 6.66667
    },
    "iso8:t4_controller_focus_level_1_iso-8": {
      "name": "T4 Controller Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "ISOITEM_ORANGE_CONTROLLER_FOCUS_16",
      "observed": {
        "basis": "own",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 1.12528,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "family": "family:t4_crystals"
      },
      "coreValue": 6.66667
    },
    "iso8:t4_controller_health_level_1_iso-8": {
      "name": "T4 Controller Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "ISOITEM_ORANGE_CONTROLLER_HEALTH_16",
      "observed": {
        "basis": "own",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 1.12528,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "family": "family:t4_crystals"
      },
      "coreValue": 6.66667
    },
    "iso8:t4_controller_resist_level_1_iso-8": {
      "name": "T4 Controller Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "ISOITEM_ORANGE_CONTROLLER_RESIST_16",
      "observed": {
        "basis": "own",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 1.12528,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "family": "family:t4_crystals"
      },
      "coreValue": 6.66667
    },
    "iso8:t4_level_1_ions": {
      "name": "T4 Level 1 Ions",
      "category": "iso8",
      "per": 1000,
      "aliases": [],
      "value": 0.16665,
      "id": "ISO8-TIER-3-A-CURRENCY",
      "observed": {
        "basis": "own",
        "perCash": 6000.6,
        "perCore": 857.143,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 5,
        "firstSeen": false,
        "best": {
          "per": 6000.6,
          "day": "2026-10-18",
          "offer": "T4 Ions"
        },
        "byDay": {
          "2026-10-18": {
            "per": 6000.6,
            "offer": "T4 Ions"
          },
          "2026-10-24": {
            "per": 6000.6,
            "offer": "T4 Ions"
          },
          "2026-11-06": {
            "per": 6000.6,
            "offer": "T4 Ions"
          },
          "2026-11-14": {
            "per": 6000.6,
            "offer": "T4 Ions"
          },
          "2026-11-15": {
            "per": 6000.6,
            "offer": "T4 Ions"
          }
        },
        "bestCore": {
          "per": 857.143,
          "day": "2026-10-18",
          "offer": "T4 Ions"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 857.143,
            "offer": "T4 Ions"
          },
          "2026-10-24": {
            "per": 857.143,
            "offer": "T4 Ions"
          },
          "2026-11-06": {
            "per": 857.143,
            "offer": "T4 Ions"
          },
          "2026-11-14": {
            "per": 857.143,
            "offer": "T4 Ions"
          },
          "2026-11-15": {
            "per": 857.143,
            "offer": "T4 Ions"
          }
        }
      },
      "coreValue": 1.16667
    },
    "iso8:t4_protector_armor_level_1_iso-8": {
      "name": "T4 Protector Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "ISOITEM_ORANGE_PROTECTOR_ARMOR_16",
      "observed": {
        "basis": "own",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 1.12528,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "family": "family:t4_crystals"
      },
      "coreValue": 6.66667
    },
    "iso8:t4_protector_damage_level_1_iso-8": {
      "name": "T4 Protector Damage Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "ISOITEM_ORANGE_PROTECTOR_DAMAGE_16",
      "observed": {
        "basis": "own",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 1.12528,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "family": "family:t4_crystals"
      },
      "coreValue": 6.66667
    },
    "iso8:t4_protector_focus_level_1_iso-8": {
      "name": "T4 Protector Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "ISOITEM_ORANGE_PROTECTOR_FOCUS_16",
      "observed": {
        "basis": "own",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 1.12528,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "family": "family:t4_crystals"
      },
      "coreValue": 6.66667
    },
    "iso8:t4_protector_health_level_1_iso-8": {
      "name": "T4 Protector Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "ISOITEM_ORANGE_PROTECTOR_HEALTH_16",
      "observed": {
        "basis": "own",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 1.12528,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "family": "family:t4_crystals"
      },
      "coreValue": 6.66667
    },
    "iso8:t4_protector_resist_level_1_iso-8": {
      "name": "T4 Protector Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "ISOITEM_ORANGE_PROTECTOR_RESIST_16",
      "observed": {
        "basis": "own",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 1.12528,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "family": "family:t4_crystals"
      },
      "coreValue": 6.66667
    },
    "iso8:t4_support_armor_level_1_iso-8": {
      "name": "T4 Support Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "ISOITEM_ORANGE_SUPPORT_ARMOR_16",
      "observed": {
        "basis": "own",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 1.12528,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "family": "family:t4_crystals"
      },
      "coreValue": 6.66667
    },
    "iso8:t4_support_damage_level_1_iso-8": {
      "name": "T4 Support Damage Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "ISOITEM_ORANGE_SUPPORT_DAMAGE_16",
      "observed": {
        "basis": "own",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 1.12528,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "family": "family:t4_crystals"
      },
      "coreValue": 6.66667
    },
    "iso8:t4_support_focus_level_1_iso-8": {
      "name": "T4 Support Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "ISOITEM_ORANGE_SUPPORT_FOCUS_16",
      "observed": {
        "basis": "own",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 1.12528,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "family": "family:t4_crystals"
      },
      "coreValue": 6.66667
    },
    "iso8:t4_support_health_level_1_iso-8": {
      "name": "T4 Support Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "ISOITEM_ORANGE_SUPPORT_HEALTH_16",
      "observed": {
        "basis": "own",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 1.12528,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "family": "family:t4_crystals"
      },
      "coreValue": 6.66667
    },
    "iso8:t4_support_resist_level_1_iso-8": {
      "name": "T4 Support Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "ISOITEM_ORANGE_SUPPORT_RESIST_16",
      "observed": {
        "basis": "own",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 25,
        "firstSeen": false,
        "best": {
          "per": 1.12528,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 1.12528,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "bestCore": {
          "per": 0.15,
          "day": "2026-10-18",
          "offer": "T4 Iso Boost: Blaster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-10-24": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-14": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          },
          "2026-11-15": {
            "per": 0.15,
            "offer": "T4 Iso Boost: Blaster"
          }
        },
        "family": "family:t4_crystals"
      },
      "coreValue": 6.66667
    },
    "gear:crimson_adaptive_pathogens": {
      "name": "Crimson Adaptive Pathogens",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.177756,
      "observed": {
        "basis": "set",
        "perCash": 5.6257,
        "perCore": 0.75,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 5.6257,
          "day": "2026-10-18",
          "offer": "Unlock Special: Crimson Uniques"
        },
        "byDay": {
          "2026-10-18": {
            "per": 5.6257,
            "offer": "Unlock Special: Crimson Uniques"
          }
        },
        "bestCore": {
          "per": 0.75,
          "day": "2026-10-18",
          "offer": "Unlock Special: Crimson Uniques"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.75,
            "offer": "Unlock Special: Crimson Uniques"
          }
        }
      },
      "coreValue": 1.33333
    },
    "gear:crimson_arcane_powder": {
      "name": "Crimson Arcane Powder",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.0198397,
      "id": "GEAR_RED_MYSTIC_MAT_BIT",
      "observed": {
        "basis": "set",
        "perCash": 50.4039,
        "perCore": 6.552,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 50.4039,
          "day": "2026-11-14",
          "offer": "Morbius Power Pack"
        },
        "byDay": {
          "2026-11-14": {
            "per": 50.4039,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 50.4039,
            "offer": "Morbius Power Pack"
          }
        },
        "bestCore": {
          "per": 6.552,
          "day": "2026-11-14",
          "offer": "Morbius Power Pack"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 6.552,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 6.552,
            "offer": "Morbius Power Pack"
          }
        }
      },
      "coreValue": 0.152625
    },
    "gear:crimson_armor_catalyst_part": {
      "name": "Crimson Armor Catalyst Part",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.01299,
      "observed": {
        "basis": "set",
        "perCash": 76.9823,
        "perCore": 10,
        "days": [
          "2026-10-18"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 138.568,
          "day": "2026-11-15",
          "offer": "Unlock Special: Crimson Catalysts"
        },
        "byDay": {
          "2026-10-18": {
            "per": 76.9823,
            "offer": "Unlock Special: Crimson Catalysts"
          },
          "2026-11-15": {
            "per": 138.568,
            "offer": "Unlock Special: Crimson Catalysts"
          }
        },
        "bestCore": {
          "per": 18,
          "day": "2026-11-15",
          "offer": "Unlock Special: Crimson Catalysts"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 10,
            "offer": "Unlock Special: Crimson Catalysts"
          },
          "2026-11-15": {
            "per": 18,
            "offer": "Unlock Special: Crimson Catalysts"
          }
        }
      },
      "coreValue": 0.1,
      "id": "GEAR_RED_ARMOR_MAT_BIT"
    },
    "gear:crimson_basic_catalyst_part": {
      "name": "Crimson Basic Catalyst Part",
      "category": "gear",
      "per": 100,
      "aliases": [],
      "value": 0.148457,
      "id": "GEAR_RED_BASIC_CAT_BIT",
      "observed": {
        "basis": "set",
        "perCash": 673.595,
        "perCore": 87.5,
        "days": [
          "2026-10-18",
          "2026-11-14"
        ],
        "offers": 4,
        "firstSeen": false,
        "best": {
          "per": 673.595,
          "day": "2026-10-18",
          "offer": "Unlock Special: Crimson Catalysts"
        },
        "byDay": {
          "2026-10-18": {
            "per": 673.595,
            "offer": "Unlock Special: Crimson Catalysts"
          },
          "2026-11-14": {
            "per": 201.939,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 230.947,
            "offer": "Unlock Special: Crimson Catalysts"
          }
        },
        "bestCore": {
          "per": 87.5,
          "day": "2026-10-18",
          "offer": "Unlock Special: Crimson Catalysts"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 87.5,
            "offer": "Unlock Special: Crimson Catalysts"
          },
          "2026-11-14": {
            "per": 26.25,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 30,
            "offer": "Unlock Special: Crimson Catalysts"
          }
        }
      },
      "coreValue": 1.14286
    },
    "gear:crimson_biopolymers": {
      "name": "Crimson Biopolymers",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": null,
      "id": "GEAR_RED_MUTANT_MAT_C6",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:crimson_chaotic_ribosomes": {
      "name": "Crimson Chaotic Ribosomes",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.213306,
      "observed": {
        "basis": "set",
        "perCash": 4.68809,
        "perCore": 0.625,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 4.68809,
          "day": "2026-10-18",
          "offer": "Unlock Special: Crimson Uniques"
        },
        "byDay": {
          "2026-10-18": {
            "per": 4.68809,
            "offer": "Unlock Special: Crimson Uniques"
          }
        },
        "bestCore": {
          "per": 0.625,
          "day": "2026-10-18",
          "offer": "Unlock Special: Crimson Uniques"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.625,
            "offer": "Unlock Special: Crimson Uniques"
          }
        }
      },
      "coreValue": 1.6
    },
    "gear:crimson_cytoplasm": {
      "name": "Crimson Cytoplasm",
      "category": "gear",
      "per": 100,
      "aliases": [],
      "value": 0.405218,
      "id": "GEAR_RED_MUTANT_MAT_C2",
      "observed": {
        "basis": "set",
        "perCash": 246.781,
        "perCore": 34.5,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 246.781,
          "day": "2026-10-18",
          "offer": "Unlock Special: Crimson Origins"
        },
        "byDay": {
          "2026-10-18": {
            "per": 246.781,
            "offer": "Unlock Special: Crimson Origins"
          }
        },
        "bestCore": {
          "per": 34.5,
          "day": "2026-10-18",
          "offer": "Unlock Special: Crimson Origins"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 34.5,
            "offer": "Unlock Special: Crimson Origins"
          }
        }
      },
      "coreValue": 2.89855
    },
    "gear:crimson_damage_catalyst_part": {
      "name": "Crimson Damage Catalyst Part",
      "category": "gear",
      "per": 100,
      "aliases": [],
      "value": 0.721667,
      "coreValue": 5.55556,
      "observed": {
        "basis": "set",
        "perCash": 138.568,
        "perCore": 18,
        "days": [
          "2026-11-15"
        ],
        "offers": 1,
        "firstSeen": true,
        "best": {
          "per": 138.568,
          "day": "2026-11-15",
          "offer": "Unlock Special: Crimson Catalysts"
        },
        "byDay": {
          "2026-11-15": {
            "per": 138.568,
            "offer": "Unlock Special: Crimson Catalysts"
          }
        },
        "bestCore": {
          "per": 18,
          "day": "2026-11-15",
          "offer": "Unlock Special: Crimson Catalysts"
        },
        "coreByDay": {
          "2026-11-15": {
            "per": 18,
            "offer": "Unlock Special: Crimson Catalysts"
          }
        }
      },
      "id": "GEAR_RED_DAMAGE_MAT_BIT"
    },
    "gear:crimson_dargonite": {
      "name": "Crimson Dargonite",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": null,
      "id": "GEAR_RED_TECH_MAT_C6",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:crimson_esoteric_glyphs": {
      "name": "Crimson Esoteric Glyphs",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.0238077,
      "id": "GEAR_RED_MYSTIC_MAT_C2",
      "observed": {
        "basis": "set",
        "perCash": 42.0032,
        "perCore": 5.46,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 42.0032,
          "day": "2026-11-14",
          "offer": "Morbius Power Pack"
        },
        "byDay": {
          "2026-11-14": {
            "per": 42.0032,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 42.0032,
            "offer": "Morbius Power Pack"
          }
        },
        "bestCore": {
          "per": 5.46,
          "day": "2026-11-14",
          "offer": "Morbius Power Pack"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 5.46,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 5.46,
            "offer": "Morbius Power Pack"
          }
        }
      },
      "coreValue": 0.18315
    },
    "gear:crimson_focus_catalyst_part": {
      "name": "Crimson Focus Catalyst Part",
      "category": "gear",
      "per": 100,
      "aliases": [],
      "value": 0.412381,
      "id": "GEAR_RED_FOCUS_MAT_BIT",
      "observed": {
        "basis": "set",
        "perCash": 242.494,
        "perCore": 31.5,
        "days": [
          "2026-10-18",
          "2026-11-14"
        ],
        "offers": 4,
        "firstSeen": false,
        "best": {
          "per": 242.494,
          "day": "2026-10-18",
          "offer": "Unlock Special: Crimson Catalysts"
        },
        "byDay": {
          "2026-10-18": {
            "per": 242.494,
            "offer": "Unlock Special: Crimson Catalysts"
          },
          "2026-11-14": {
            "per": 40.3877,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 138.568,
            "offer": "Unlock Special: Crimson Catalysts"
          }
        },
        "bestCore": {
          "per": 31.5,
          "day": "2026-10-18",
          "offer": "Unlock Special: Crimson Catalysts"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 31.5,
            "offer": "Unlock Special: Crimson Catalysts"
          },
          "2026-11-14": {
            "per": 5.25,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 18,
            "offer": "Unlock Special: Crimson Catalysts"
          }
        }
      },
      "coreValue": 3.1746
    },
    "gear:crimson_focused_chi": {
      "name": "Crimson Focused Chi",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:crimson_health_catalyst_part": {
      "name": "Crimson Health Catalyst Part",
      "category": "gear",
      "per": 100,
      "aliases": [],
      "value": 0.742286,
      "id": "GEAR_RED_HEALTH_MAT_BIT",
      "observed": {
        "basis": "set",
        "perCash": 134.719,
        "perCore": 17.5,
        "days": [
          "2026-10-18",
          "2026-11-14"
        ],
        "offers": 4,
        "firstSeen": false,
        "best": {
          "per": 138.568,
          "day": "2026-11-15",
          "offer": "Unlock Special: Crimson Catalysts"
        },
        "byDay": {
          "2026-10-18": {
            "per": 134.719,
            "offer": "Unlock Special: Crimson Catalysts"
          },
          "2026-11-14": {
            "per": 72.6979,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 138.568,
            "offer": "Unlock Special: Crimson Catalysts"
          }
        },
        "bestCore": {
          "per": 18,
          "day": "2026-11-15",
          "offer": "Unlock Special: Crimson Catalysts"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 17.5,
            "offer": "Unlock Special: Crimson Catalysts"
          },
          "2026-11-14": {
            "per": 9.45,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 18,
            "offer": "Unlock Special: Crimson Catalysts"
          }
        }
      },
      "coreValue": 5.71429
    },
    "gear:crimson_hyperphage": {
      "name": "Crimson Hyperphage",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": null,
      "id": "GEAR_RED_BIO_MAT_C6",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:crimson_isochronal_compound": {
      "name": "Crimson Isochronal Compound",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.177756,
      "observed": {
        "basis": "set",
        "perCash": 5.6257,
        "perCore": 0.75,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 5.6257,
          "day": "2026-10-18",
          "offer": "Unlock Special: Crimson Uniques"
        },
        "byDay": {
          "2026-10-18": {
            "per": 5.6257,
            "offer": "Unlock Special: Crimson Uniques"
          }
        },
        "bestCore": {
          "per": 0.75,
          "day": "2026-10-18",
          "offer": "Unlock Special: Crimson Uniques"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.75,
            "offer": "Unlock Special: Crimson Uniques"
          }
        }
      },
      "coreValue": 1.33333
    },
    "gear:crimson_liquid_hydrazine": {
      "name": "Crimson Liquid Hydrazine",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": null,
      "id": "GEAR_RED_TECH_MAT_C4",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:crimson_metabolic_enhancers": {
      "name": "Crimson Metabolic Enhancers",
      "category": "gear",
      "per": 100,
      "aliases": [],
      "value": 0.466001,
      "id": "GEAR_RED_MUTANT_MAT_C3",
      "observed": {
        "basis": "set",
        "perCash": 214.592,
        "perCore": 30,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 214.592,
          "day": "2026-10-18",
          "offer": "Unlock Special: Crimson Origins"
        },
        "byDay": {
          "2026-10-18": {
            "per": 214.592,
            "offer": "Unlock Special: Crimson Origins"
          }
        },
        "bestCore": {
          "per": 30,
          "day": "2026-10-18",
          "offer": "Unlock Special: Crimson Origins"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 30,
            "offer": "Unlock Special: Crimson Origins"
          }
        }
      },
      "coreValue": 3.33333
    },
    "gear:crimson_mythic_geode": {
      "name": "Crimson Mythic Geode",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.1238,
      "id": "GEAR_RED_MYSTIC_MAT_C8",
      "observed": {
        "basis": "set",
        "perCash": 8.07754,
        "perCore": 1.05,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 8.07754,
          "day": "2026-11-14",
          "offer": "Morbius Power Pack"
        },
        "byDay": {
          "2026-11-14": {
            "per": 8.07754,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 8.07754,
            "offer": "Morbius Power Pack"
          }
        },
        "bestCore": {
          "per": 1.05,
          "day": "2026-11-14",
          "offer": "Morbius Power Pack"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 1.05,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 1.05,
            "offer": "Morbius Power Pack"
          }
        }
      },
      "coreValue": 0.952381
    },
    "gear:crimson_nebulizer": {
      "name": "Crimson Nebulizer",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": null,
      "id": "GEAR_RED_BIO_MAT_C4",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:crimson_nucleic_infusion": {
      "name": "Crimson Nucleic Infusion",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": null,
      "id": "GEAR_RED_MUTANT_MAT_C4",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:crimson_phytonutrients": {
      "name": "Crimson Phytonutrients",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.213306,
      "observed": {
        "basis": "set",
        "perCash": 4.68809,
        "perCore": 0.625,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 4.68809,
          "day": "2026-10-18",
          "offer": "Unlock Special: Crimson Uniques"
        },
        "byDay": {
          "2026-10-18": {
            "per": 4.68809,
            "offer": "Unlock Special: Crimson Uniques"
          }
        },
        "bestCore": {
          "per": 0.625,
          "day": "2026-10-18",
          "offer": "Unlock Special: Crimson Uniques"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.625,
            "offer": "Unlock Special: Crimson Uniques"
          }
        }
      },
      "coreValue": 1.6
    },
    "gear:crimson_psionic_essence": {
      "name": "Crimson Psionic Essence",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 1.42843,
      "id": "GEAR_RED_MYSTIC_MAT_C6",
      "observed": {
        "basis": "set",
        "perCash": 0.70007,
        "perCore": 0.0875,
        "days": [
          "2026-11-06"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 0.70007,
          "day": "2026-11-06",
          "offer": "Gear Tier 21: Mystic Bundle"
        },
        "byDay": {
          "2026-11-06": {
            "per": 0.70007,
            "offer": "Gear Tier 21: Mystic Bundle"
          }
        },
        "bestCore": {
          "per": 0.0875,
          "day": "2026-11-06",
          "offer": "Gear Tier 21: Mystic Bundle"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 0.0875,
            "offer": "Gear Tier 21: Mystic Bundle"
          }
        }
      },
      "coreValue": 11.4286
    },
    "gear:crimson_remote_access_codes": {
      "name": "Crimson Remote Access Codes",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": null,
      "id": "GEAR_RED_SKILL_MAT_C6",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:crimson_resistance_catalyst_part": {
      "name": "Crimson Resistance Catalyst Part",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.02598,
      "id": "GEAR_RED_RESIST_MAT_BIT",
      "observed": {
        "basis": "set",
        "perCash": 38.4911,
        "perCore": 5,
        "days": [
          "2026-10-18",
          "2026-11-14"
        ],
        "offers": 4,
        "firstSeen": false,
        "best": {
          "per": 138.568,
          "day": "2026-11-15",
          "offer": "Unlock Special: Crimson Catalysts"
        },
        "byDay": {
          "2026-10-18": {
            "per": 38.4911,
            "offer": "Unlock Special: Crimson Catalysts"
          },
          "2026-11-14": {
            "per": 16.1551,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 138.568,
            "offer": "Unlock Special: Crimson Catalysts"
          }
        },
        "bestCore": {
          "per": 18,
          "day": "2026-11-15",
          "offer": "Unlock Special: Crimson Catalysts"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 5,
            "offer": "Unlock Special: Crimson Catalysts"
          },
          "2026-11-14": {
            "per": 2.1,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 18,
            "offer": "Unlock Special: Crimson Catalysts"
          }
        }
      },
      "coreValue": 0.2
    },
    "gear:crimson_ritual_salts": {
      "name": "Crimson Ritual Salts",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 1.42843,
      "id": "GEAR_RED_MYSTIC_MAT_C4",
      "observed": {
        "basis": "set",
        "perCash": 0.70007,
        "perCore": 0.0875,
        "days": [
          "2026-11-06"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 0.70007,
          "day": "2026-11-06",
          "offer": "Gear Tier 21: Mystic Bundle"
        },
        "byDay": {
          "2026-11-06": {
            "per": 0.70007,
            "offer": "Gear Tier 21: Mystic Bundle"
          }
        },
        "bestCore": {
          "per": 0.0875,
          "day": "2026-11-06",
          "offer": "Gear Tier 21: Mystic Bundle"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 0.0875,
            "offer": "Gear Tier 21: Mystic Bundle"
          }
        }
      },
      "coreValue": 11.4286
    },
    "gear:crimson_security_bypass": {
      "name": "Crimson Security Bypass",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": null,
      "id": "GEAR_RED_SKILL_MAT_C4",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:crimson_sigil": {
      "name": "Crimson Sigil",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.1238,
      "id": "GEAR_RED_MYSTIC_MAT_C1",
      "observed": {
        "basis": "set",
        "perCash": 8.07754,
        "perCore": 1.05,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 8.07754,
          "day": "2026-11-14",
          "offer": "Morbius Power Pack"
        },
        "byDay": {
          "2026-11-14": {
            "per": 8.07754,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 8.07754,
            "offer": "Morbius Power Pack"
          }
        },
        "bestCore": {
          "per": 1.05,
          "day": "2026-11-14",
          "offer": "Morbius Power Pack"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 1.05,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 1.05,
            "offer": "Morbius Power Pack"
          }
        }
      },
      "coreValue": 0.952381
    },
    "gear:crimson_spliced_x-gene": {
      "name": "Crimson Spliced X-Gene",
      "category": "gear",
      "per": 100,
      "aliases": [],
      "value": 0.332857,
      "id": "GEAR_RED_MUTANT_MAT_BIT",
      "observed": {
        "basis": "set",
        "perCash": 300.429,
        "perCore": 42,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 300.429,
          "day": "2026-10-18",
          "offer": "Unlock Special: Crimson Origins"
        },
        "byDay": {
          "2026-10-18": {
            "per": 300.429,
            "offer": "Unlock Special: Crimson Origins"
          }
        },
        "bestCore": {
          "per": 42,
          "day": "2026-10-18",
          "offer": "Unlock Special: Crimson Origins"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 42,
            "offer": "Unlock Special: Crimson Origins"
          }
        }
      },
      "coreValue": 2.38095
    },
    "gear:crimson_tempered_osmium": {
      "name": "Crimson Tempered Osmium",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:crimson_uru": {
      "name": "Crimson Uru",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.888668,
      "id": "GEAR_RED_MAGIC3",
      "observed": {
        "basis": "set",
        "perCash": 1.12528,
        "perCore": 0.15,
        "days": [
          "2026-10-18",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 4,
        "firstSeen": false,
        "best": {
          "per": 4.03877,
          "day": "2026-11-14",
          "offer": "Morbius Power Pack"
        },
        "byDay": {
          "2026-10-18": {
            "per": 2.81285,
            "offer": "Unlock Special: Crimson Uniques"
          },
          "2026-11-06": {
            "per": 1.12528,
            "offer": "Unlock Special: Crimson Gear"
          },
          "2026-11-14": {
            "per": 4.03877,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 4.03877,
            "offer": "Morbius Power Pack"
          }
        },
        "bestCore": {
          "per": 0.525,
          "day": "2026-11-14",
          "offer": "Morbius Power Pack"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.375,
            "offer": "Unlock Special: Crimson Uniques"
          },
          "2026-11-06": {
            "per": 0.15,
            "offer": "Unlock Special: Crimson Gear"
          },
          "2026-11-14": {
            "per": 0.525,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 0.525,
            "offer": "Morbius Power Pack"
          }
        }
      },
      "coreValue": 6.66667
    },
    "gear:improved_arcane_powder": {
      "name": "Improved Arcane Powder",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.02796,
      "observed": {
        "basis": "set",
        "perCash": 35.7654,
        "perCore": 5,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 35.7654,
          "day": "2026-10-18",
          "offer": "Sorcerer Supreme Offer"
        },
        "byDay": {
          "2026-10-18": {
            "per": 35.7654,
            "offer": "Sorcerer Supreme Offer"
          }
        },
        "bestCore": {
          "per": 5,
          "day": "2026-10-18",
          "offer": "Sorcerer Supreme Offer"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 5,
            "offer": "Sorcerer Supreme Offer"
          }
        }
      },
      "coreValue": 0.2
    },
    "gear:improved_isomer": {
      "name": "Improved Isomer",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.032475,
      "observed": {
        "basis": "set",
        "perCash": 30.7929,
        "perCore": 4,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 30.7929,
          "day": "2026-10-18",
          "offer": "Web of the Future"
        },
        "byDay": {
          "2026-10-18": {
            "per": 30.7929,
            "offer": "Web of the Future"
          }
        },
        "bestCore": {
          "per": 4,
          "day": "2026-10-18",
          "offer": "Web of the Future"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 4,
            "offer": "Web of the Future"
          }
        }
      },
      "coreValue": 0.25
    },
    "gear:improved_mri": {
      "name": "Improved MRI",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.032475,
      "observed": {
        "basis": "set",
        "perCash": 30.7929,
        "perCore": 4,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 30.7929,
          "day": "2026-10-18",
          "offer": "Web of the Future"
        },
        "byDay": {
          "2026-10-18": {
            "per": 30.7929,
            "offer": "Web of the Future"
          }
        },
        "bestCore": {
          "per": 4,
          "day": "2026-10-18",
          "offer": "Web of the Future"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 4,
            "offer": "Web of the Future"
          }
        }
      },
      "coreValue": 0.25
    },
    "gear:improved_parchment": {
      "name": "Improved Parchment",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.02796,
      "observed": {
        "basis": "set",
        "perCash": 35.7654,
        "perCore": 5,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 35.7654,
          "day": "2026-10-18",
          "offer": "Sorcerer Supreme Offer"
        },
        "byDay": {
          "2026-10-18": {
            "per": 35.7654,
            "offer": "Sorcerer Supreme Offer"
          }
        },
        "bestCore": {
          "per": 5,
          "day": "2026-10-18",
          "offer": "Sorcerer Supreme Offer"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 5,
            "offer": "Sorcerer Supreme Offer"
          }
        }
      },
      "coreValue": 0.2
    },
    "gear:improved_sigil": {
      "name": "Improved Sigil",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.02796,
      "observed": {
        "basis": "set",
        "perCash": 35.7654,
        "perCore": 5,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 35.7654,
          "day": "2026-10-18",
          "offer": "Sorcerer Supreme Offer"
        },
        "byDay": {
          "2026-10-18": {
            "per": 35.7654,
            "offer": "Sorcerer Supreme Offer"
          }
        },
        "bestCore": {
          "per": 5,
          "day": "2026-10-18",
          "offer": "Sorcerer Supreme Offer"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 5,
            "offer": "Sorcerer Supreme Offer"
          }
        }
      },
      "coreValue": 0.2
    },
    "gear:improved_syringe": {
      "name": "Improved Syringe",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.032475,
      "observed": {
        "basis": "set",
        "perCash": 30.7929,
        "perCore": 4,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 30.7929,
          "day": "2026-10-18",
          "offer": "Web of the Future"
        },
        "byDay": {
          "2026-10-18": {
            "per": 30.7929,
            "offer": "Web of the Future"
          }
        },
        "bestCore": {
          "per": 4,
          "day": "2026-10-18",
          "offer": "Web of the Future"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 4,
            "offer": "Web of the Future"
          }
        }
      },
      "coreValue": 0.25
    },
    "gear:improved_vial": {
      "name": "Improved Vial",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.02796,
      "observed": {
        "basis": "set",
        "perCash": 35.7654,
        "perCore": 5,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 35.7654,
          "day": "2026-10-18",
          "offer": "Sorcerer Supreme Offer"
        },
        "byDay": {
          "2026-10-18": {
            "per": 35.7654,
            "offer": "Sorcerer Supreme Offer"
          }
        },
        "bestCore": {
          "per": 5,
          "day": "2026-10-18",
          "offer": "Sorcerer Supreme Offer"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 5,
            "offer": "Sorcerer Supreme Offer"
          }
        }
      },
      "coreValue": 0.2
    },
    "gear:improved_x-rays": {
      "name": "Improved X-Rays",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.032475,
      "observed": {
        "basis": "set",
        "perCash": 30.7929,
        "perCore": 4,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 30.7929,
          "day": "2026-10-18",
          "offer": "Web of the Future"
        },
        "byDay": {
          "2026-10-18": {
            "per": 30.7929,
            "offer": "Web of the Future"
          }
        },
        "bestCore": {
          "per": 4,
          "day": "2026-10-18",
          "offer": "Web of the Future"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 4,
            "offer": "Web of the Future"
          }
        }
      },
      "coreValue": 0.25
    },
    "gear:teal_catalyst_pack": {
      "name": "Teal Catalyst Pack",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": null,
      "id": "GACHA_66bd727a4ce31aeff7360e11b606eced807c843e6f312ba340fb0c25f87eec78",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "orb:allied_supply_xii": {
      "name": "Allied Supply XII Orb Fragments",
      "category": "orb",
      "per": 100,
      "aliases": [],
      "value": 0.20825,
      "observed": {
        "basis": "own",
        "perCash": 480.192,
        "perCore": 60,
        "days": [
          "2026-10-18",
          "2026-10-24"
        ],
        "offers": 5,
        "firstSeen": false,
        "best": {
          "per": 480.192,
          "day": "2026-10-18",
          "offer": "Raid Warzone: Daily Allied Supply"
        },
        "byDay": {
          "2026-10-18": {
            "per": 480.192,
            "offer": "Raid Warzone: Daily Allied Supply"
          },
          "2026-10-24": {
            "per": 480.192,
            "offer": "Raid Warzone: Daily Allied Supply"
          }
        },
        "bestCore": {
          "per": 60,
          "day": "2026-10-18",
          "offer": "Raid Warzone: Daily Allied Supply"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 60,
            "offer": "Raid Warzone: Daily Allied Supply"
          },
          "2026-10-24": {
            "per": 60,
            "offer": "Raid Warzone: Daily Allied Supply"
          }
        }
      },
      "coreValue": 1.66667
    },
    "orb:amazing_avengers_mega": {
      "name": "Amazing Avengers Mega Orb Fragments",
      "category": "orb",
      "per": 1,
      "aliases": [],
      "value": 0.064995,
      "observed": {
        "basis": "own",
        "perCash": 15.3858,
        "perCore": 2,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 15.3858,
          "day": "2026-10-18",
          "offer": "Iron Vengeance: Amazing Avengers"
        },
        "byDay": {
          "2026-10-18": {
            "per": 15.3858,
            "offer": "Iron Vengeance: Amazing Avengers"
          }
        },
        "bestCore": {
          "per": 2,
          "day": "2026-10-18",
          "offer": "Iron Vengeance: Amazing Avengers"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 2,
            "offer": "Iron Vengeance: Amazing Avengers"
          }
        }
      },
      "coreValue": 0.5
    },
    "orb:armory_14": {
      "name": "Armory 14 Orb Fragments",
      "category": "orb",
      "per": 1000,
      "aliases": [],
      "value": 0.0133,
      "observed": {
        "basis": "set",
        "perCash": 75188,
        "perCore": 10000,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 75188,
          "day": "2026-10-18",
          "offer": "Armory Booster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 75188,
            "offer": "Armory Booster"
          }
        },
        "bestCore": {
          "per": 10000,
          "day": "2026-10-18",
          "offer": "Armory Booster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 10000,
            "offer": "Armory Booster"
          }
        }
      },
      "coreValue": 0.1
    },
    "orb:armory_15": {
      "name": "Armory 15 Orb Fragments",
      "category": "orb",
      "per": 1000,
      "aliases": [],
      "value": 0.0133,
      "observed": {
        "basis": "set",
        "perCash": 75188,
        "perCore": 10000,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 75188,
          "day": "2026-10-18",
          "offer": "Armory Booster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 75188,
            "offer": "Armory Booster"
          }
        },
        "bestCore": {
          "per": 10000,
          "day": "2026-10-18",
          "offer": "Armory Booster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 10000,
            "offer": "Armory Booster"
          }
        }
      },
      "coreValue": 0.1
    },
    "orb:armory_16": {
      "name": "Armory 16 Orb Fragments",
      "category": "orb",
      "per": 1000,
      "aliases": [],
      "value": 0.0133,
      "observed": {
        "basis": "set",
        "perCash": 75188,
        "perCore": 10000,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 75188,
          "day": "2026-10-18",
          "offer": "Armory Booster"
        },
        "byDay": {
          "2026-10-18": {
            "per": 75188,
            "offer": "Armory Booster"
          }
        },
        "bestCore": {
          "per": 10000,
          "day": "2026-10-18",
          "offer": "Armory Booster"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 10000,
            "offer": "Armory Booster"
          }
        }
      },
      "coreValue": 0.1
    },
    "orb:armory_17": {
      "name": "Armory 17 Orb Fragments",
      "category": "orb",
      "per": 1000,
      "aliases": [],
      "value": 0.03495,
      "id": "GACHA_CRATE_GT17_C1_C8_TOKEN_138df228",
      "observed": {
        "basis": "set",
        "perCash": 28612.3,
        "perCore": 4000,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 28612.3,
          "day": "2026-10-18",
          "offer": "Armory 18 Orb Special"
        },
        "byDay": {
          "2026-10-18": {
            "per": 28612.3,
            "offer": "Armory 18 Orb Special"
          }
        },
        "bestCore": {
          "per": 4000,
          "day": "2026-10-18",
          "offer": "Armory 18 Orb Special"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 4000,
            "offer": "Armory 18 Orb Special"
          }
        }
      },
      "coreValue": 0.25
    },
    "orb:armory_18": {
      "name": "Armory 18 Orb Fragments",
      "category": "orb",
      "per": 1000,
      "aliases": [],
      "value": 0.03495,
      "observed": {
        "basis": "set",
        "perCash": 28612.3,
        "perCore": 4000,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 28612.3,
          "day": "2026-10-18",
          "offer": "Armory 18 Orb Special"
        },
        "byDay": {
          "2026-10-18": {
            "per": 28612.3,
            "offer": "Armory 18 Orb Special"
          }
        },
        "bestCore": {
          "per": 4000,
          "day": "2026-10-18",
          "offer": "Armory 18 Orb Special"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 4000,
            "offer": "Armory 18 Orb Special"
          }
        }
      },
      "coreValue": 0.25
    },
    "orb:basic_t2_iso-8": {
      "name": "Basic T2 Iso-8 Orb Fragments",
      "category": "orb",
      "per": 1000,
      "aliases": [],
      "value": 0.017475,
      "observed": {
        "basis": "set",
        "perCash": 57224.6,
        "perCore": 8000,
        "days": [
          "2026-10-18"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 171674,
          "day": "2026-11-15",
          "offer": "Unlock Special: Blue ISO"
        },
        "byDay": {
          "2026-10-18": {
            "per": 57224.6,
            "offer": "Blue ISO Ions Top Up"
          },
          "2026-11-15": {
            "per": 171674,
            "offer": "Unlock Special: Blue ISO"
          }
        },
        "bestCore": {
          "per": 24000,
          "day": "2026-11-15",
          "offer": "Unlock Special: Blue ISO"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 8000,
            "offer": "Blue ISO Ions Top Up"
          },
          "2026-11-15": {
            "per": 24000,
            "offer": "Unlock Special: Blue ISO"
          }
        }
      },
      "coreValue": 0.125,
      "id": "GACHA_CRATE_ISO8_T2_BASIC_TOKEN_f8d78c4c"
    },
    "orb:basic_t3_iso-8": {
      "name": "Basic T3 Iso-8 Orb Fragments",
      "category": "orb",
      "per": 1000,
      "aliases": [],
      "value": 0.0698998,
      "id": "GACHA_CRATE_ISO8_T3_BASIC_TOKEN_6812fd67",
      "observed": {
        "basis": "set",
        "perCash": 14306.2,
        "perCore": 2000,
        "days": [
          "2026-10-18",
          "2026-11-14"
        ],
        "offers": 4,
        "firstSeen": false,
        "best": {
          "per": 14306.2,
          "day": "2026-10-18",
          "offer": "ISO Fest: T3 Level 5 Ions"
        },
        "byDay": {
          "2026-10-18": {
            "per": 14306.2,
            "offer": "ISO Fest: T3 Level 5 Ions"
          },
          "2026-11-14": {
            "per": 14306.2,
            "offer": "ISO Fest: T3 Level 5 Ions"
          },
          "2026-11-15": {
            "per": 14306.2,
            "offer": "ISO Fest: T3 Level 5 Ions"
          }
        },
        "bestCore": {
          "per": 2000,
          "day": "2026-10-18",
          "offer": "ISO Fest: T3 Level 5 Ions"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 2000,
            "offer": "ISO Fest: T3 Level 5 Ions"
          },
          "2026-11-14": {
            "per": 2000,
            "offer": "ISO Fest: T3 Level 5 Ions"
          },
          "2026-11-15": {
            "per": 2000,
            "offer": "ISO Fest: T3 Level 5 Ions"
          }
        }
      },
      "coreValue": 0.5
    },
    "orb:crimson_elite": {
      "name": "Crimson Elite Orb Fragments",
      "category": "orb",
      "per": 100,
      "aliases": [],
      "value": 0.1995,
      "id": "GACHA_CRATE_GT19_20_TOKEN_4c7f2032",
      "observed": {
        "basis": "own",
        "perCash": 501.253,
        "perCore": 66.6667,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 5,
        "firstSeen": false,
        "best": {
          "per": 501.253,
          "day": "2026-10-18",
          "offer": "Iron Vengeance: Crimson Elite Orb"
        },
        "byDay": {
          "2026-10-18": {
            "per": 501.253,
            "offer": "Iron Vengeance: Crimson Elite Orb"
          },
          "2026-10-24": {
            "per": 501.253,
            "offer": "Feast of Shadows: Crimson Elite Orb"
          },
          "2026-11-06": {
            "per": 501.253,
            "offer": "Cyber Breach: Crimson Elite Orb"
          },
          "2026-11-14": {
            "per": 501.253,
            "offer": "Cyber Breach: Crimson Elite Orb"
          },
          "2026-11-15": {
            "per": 501.253,
            "offer": "Cyber Breach: Crimson Elite Orb"
          }
        },
        "bestCore": {
          "per": 66.6667,
          "day": "2026-10-18",
          "offer": "Iron Vengeance: Crimson Elite Orb"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 66.6667,
            "offer": "Iron Vengeance: Crimson Elite Orb"
          },
          "2026-10-24": {
            "per": 66.6667,
            "offer": "Feast of Shadows: Crimson Elite Orb"
          },
          "2026-11-06": {
            "per": 66.6667,
            "offer": "Cyber Breach: Crimson Elite Orb"
          },
          "2026-11-14": {
            "per": 66.6667,
            "offer": "Cyber Breach: Crimson Elite Orb"
          },
          "2026-11-15": {
            "per": 66.6667,
            "offer": "Cyber Breach: Crimson Elite Orb"
          }
        }
      },
      "coreValue": 1.5
    },
    "orb:diamond": {
      "name": "Diamond Orb Fragments",
      "category": "orb",
      "per": 1,
      "aliases": [],
      "value": 0.012495,
      "id": "GACHA_CRATE_DIAMOND_BASIC_TOKEN_de8786ff",
      "observed": {
        "basis": "own",
        "perCash": 80.032,
        "perCore": 10,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 6,
        "firstSeen": false,
        "best": {
          "per": 286.123,
          "day": "2026-11-06",
          "offer": "Unlock Special: Diamond Authority"
        },
        "byDay": {
          "2026-10-18": {
            "per": 80.032,
            "offer": "Diamond Orb Launch Special"
          },
          "2026-10-24": {
            "per": 80.032,
            "offer": "Diamond Orb Launch Special"
          },
          "2026-11-06": {
            "per": 286.123,
            "offer": "Unlock Special: Diamond Authority"
          },
          "2026-11-14": {
            "per": 80.032,
            "offer": "Diamond Orb Launch Special"
          },
          "2026-11-15": {
            "per": 80.032,
            "offer": "Diamond Orb Launch Special"
          }
        },
        "bestCore": {
          "per": 40,
          "day": "2026-11-06",
          "offer": "Unlock Special: Diamond Authority"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 10,
            "offer": "Diamond Orb Launch Special"
          },
          "2026-10-24": {
            "per": 10,
            "offer": "Diamond Orb Launch Special"
          },
          "2026-11-06": {
            "per": 40,
            "offer": "Unlock Special: Diamond Authority"
          },
          "2026-11-14": {
            "per": 10,
            "offer": "Diamond Orb Launch Special"
          },
          "2026-11-15": {
            "per": 10,
            "offer": "Diamond Orb Launch Special"
          }
        }
      },
      "coreValue": 0.1
    },
    "orb:extra-spooky": {
      "name": "Extra-SPOOKY Orb Fragments",
      "category": "orb",
      "per": 100,
      "aliases": [],
      "value": 0.780939,
      "observed": {
        "basis": "set",
        "perCash": 128.051,
        "perCore": 16,
        "days": [
          "2026-10-18",
          "2026-10-24"
        ],
        "offers": 4,
        "firstSeen": false,
        "best": {
          "per": 128.051,
          "day": "2026-10-18",
          "offer": "Halloween Haul"
        },
        "byDay": {
          "2026-10-18": {
            "per": 128.051,
            "offer": "Halloween Haul"
          },
          "2026-10-24": {
            "per": 128.051,
            "offer": "Halloween Haul"
          }
        },
        "bestCore": {
          "per": 16,
          "day": "2026-10-18",
          "offer": "Halloween Haul"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 16,
            "offer": "Halloween Haul"
          },
          "2026-10-24": {
            "per": 16,
            "offer": "Halloween Haul"
          }
        }
      },
      "coreValue": 6.25
    },
    "orb:gold": {
      "name": "Gold Orb Fragments",
      "category": "orb",
      "per": 100,
      "aliases": [],
      "value": 0.64995,
      "id": "GACHA_CRATE_GOLD_TOKEN_b39f19f5",
      "observed": {
        "basis": "own",
        "perCash": 153.858,
        "perCore": 20,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 5,
        "firstSeen": false,
        "best": {
          "per": 153.858,
          "day": "2026-10-18",
          "offer": "Raid Warzone: Mega Pack"
        },
        "byDay": {
          "2026-10-18": {
            "per": 153.858,
            "offer": "Raid Warzone: Mega Pack"
          },
          "2026-10-24": {
            "per": 153.858,
            "offer": "Raid Warzone: Mega Pack"
          },
          "2026-11-06": {
            "per": 153.858,
            "offer": "Raid Warzone: Mega Pack"
          },
          "2026-11-14": {
            "per": 153.858,
            "offer": "Raid Warzone: Mega Pack"
          },
          "2026-11-15": {
            "per": 153.858,
            "offer": "Raid Warzone: Mega Pack"
          }
        },
        "bestCore": {
          "per": 20,
          "day": "2026-10-18",
          "offer": "Raid Warzone: Mega Pack"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 20,
            "offer": "Raid Warzone: Mega Pack"
          },
          "2026-10-24": {
            "per": 20,
            "offer": "Raid Warzone: Mega Pack"
          },
          "2026-11-06": {
            "per": 20,
            "offer": "Raid Warzone: Mega Pack"
          },
          "2026-11-14": {
            "per": 20,
            "offer": "Raid Warzone: Mega Pack"
          },
          "2026-11-15": {
            "per": 20,
            "offer": "Raid Warzone: Mega Pack"
          }
        }
      },
      "coreValue": 5
    },
    "orb:halloween": {
      "name": "Halloween Orb Fragments",
      "category": "orb",
      "per": 100,
      "aliases": [],
      "value": 0.12495,
      "observed": {
        "basis": "set",
        "perCash": 800.32,
        "perCore": 100,
        "days": [
          "2026-10-18",
          "2026-10-24"
        ],
        "offers": 4,
        "firstSeen": false,
        "best": {
          "per": 800.32,
          "day": "2026-10-18",
          "offer": "Halloween Haul"
        },
        "byDay": {
          "2026-10-18": {
            "per": 800.32,
            "offer": "Halloween Haul"
          },
          "2026-10-24": {
            "per": 800.32,
            "offer": "Halloween Haul"
          }
        },
        "bestCore": {
          "per": 100,
          "day": "2026-10-18",
          "offer": "Halloween Haul"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 100,
            "offer": "Halloween Haul"
          },
          "2026-10-24": {
            "per": 100,
            "offer": "Halloween Haul"
          }
        }
      },
      "coreValue": 1
    },
    "orb:iron_raiders_mega": {
      "name": "Iron Raiders Mega Orb Fragments",
      "category": "orb",
      "per": 1,
      "aliases": [],
      "value": 0.064995,
      "observed": {
        "basis": "own",
        "perCash": 15.3858,
        "perCore": 2,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 15.3858,
          "day": "2026-10-18",
          "offer": "Iron Vengeance: Iron Raiders"
        },
        "byDay": {
          "2026-10-18": {
            "per": 15.3858,
            "offer": "Iron Vengeance: Iron Raiders"
          }
        },
        "bestCore": {
          "per": 2,
          "day": "2026-10-18",
          "offer": "Iron Vengeance: Iron Raiders"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 2,
            "offer": "Iron Vengeance: Iron Raiders"
          }
        }
      },
      "coreValue": 0.5
    },
    "orb:iso-fest_diamond": {
      "name": "ISO-Fest Diamond Orb Fragments",
      "category": "orb",
      "per": 100,
      "aliases": [],
      "value": 0.499963,
      "id": "GACHA_CRATE_ISOFEST_DIAMOND_TOKEN_346424e5",
      "observed": {
        "basis": "own",
        "perCash": 200.015,
        "perCore": 26,
        "days": [
          "2026-10-18",
          "2026-11-14"
        ],
        "offers": 7,
        "firstSeen": false,
        "best": {
          "per": 200.015,
          "day": "2026-10-18",
          "offer": "ISO Fest: ISO Fest Diamond Orb"
        },
        "byDay": {
          "2026-10-18": {
            "per": 200.015,
            "offer": "ISO Fest: ISO Fest Diamond Orb"
          },
          "2026-11-14": {
            "per": 200.015,
            "offer": "ISO Fest: ISO Fest Diamond Orb"
          },
          "2026-11-15": {
            "per": 200.015,
            "offer": "ISO Fest: ISO Fest Diamond Orb"
          }
        },
        "bestCore": {
          "per": 26,
          "day": "2026-10-18",
          "offer": "ISO Fest: ISO Fest Diamond Orb"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 26,
            "offer": "ISO Fest: ISO Fest Diamond Orb"
          },
          "2026-11-14": {
            "per": 26,
            "offer": "ISO Fest: ISO Fest Diamond Orb"
          },
          "2026-11-15": {
            "per": 26,
            "offer": "ISO Fest: ISO Fest Diamond Orb"
          }
        }
      },
      "coreValue": 3.84615
    },
    "orb:iso-fest_yellow": {
      "name": "ISO-Fest Yellow Orb Fragments",
      "category": "orb",
      "per": 100,
      "aliases": [],
      "value": 0.25998,
      "id": "GACHA_CRATE_ISOFEST_YELLOW_TOKEN_c0eea83a",
      "observed": {
        "basis": "own",
        "perCash": 384.645,
        "perCore": 50,
        "days": [
          "2026-10-18",
          "2026-11-14"
        ],
        "offers": 7,
        "firstSeen": false,
        "best": {
          "per": 384.645,
          "day": "2026-10-18",
          "offer": "ISO Fest: ISO Fest Yellow Orb"
        },
        "byDay": {
          "2026-10-18": {
            "per": 384.645,
            "offer": "ISO Fest: ISO Fest Yellow Orb"
          },
          "2026-11-14": {
            "per": 384.645,
            "offer": "ISO Fest: ISO Fest Yellow Orb"
          },
          "2026-11-15": {
            "per": 384.645,
            "offer": "ISO Fest: ISO Fest Yellow Orb"
          }
        },
        "bestCore": {
          "per": 50,
          "day": "2026-10-18",
          "offer": "ISO Fest: ISO Fest Yellow Orb"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 50,
            "offer": "ISO Fest: ISO Fest Yellow Orb"
          },
          "2026-11-14": {
            "per": 50,
            "offer": "ISO Fest: ISO Fest Yellow Orb"
          },
          "2026-11-15": {
            "per": 50,
            "offer": "ISO Fest: ISO Fest Yellow Orb"
          }
        }
      },
      "coreValue": 2
    },
    "orb:mega_gold": {
      "name": "Mega Gold Orb Fragments",
      "category": "orb",
      "per": 1,
      "aliases": [],
      "value": 0.0124975,
      "observed": {
        "basis": "set",
        "perCash": 80.016,
        "perCore": 10,
        "days": [
          "2026-10-18",
          "2026-11-06"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 100.025,
          "day": "2026-10-18",
          "offer": "(1/6) Boot Sequence"
        },
        "byDay": {
          "2026-10-18": {
            "per": 100.025,
            "offer": "(1/6) Boot Sequence"
          },
          "2026-11-06": {
            "per": 80.016,
            "offer": "Lock-On Orb"
          }
        },
        "bestCore": {
          "per": 13.3333,
          "day": "2026-10-18",
          "offer": "(1/6) Boot Sequence"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 13.3333,
            "offer": "(1/6) Boot Sequence"
          },
          "2026-11-06": {
            "per": 10,
            "offer": "Lock-On Orb"
          }
        }
      },
      "coreValue": 0.1
    },
    "orb:mega_override": {
      "name": "MEGA Override Orb Fragments",
      "category": "orb",
      "per": 1,
      "aliases": [],
      "value": 0.064995,
      "observed": {
        "basis": "own",
        "perCash": 15.3858,
        "perCore": 2,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 15.3858,
          "day": "2026-10-18",
          "offer": "MEGA Override Orb"
        },
        "byDay": {
          "2026-10-18": {
            "per": 15.3858,
            "offer": "MEGA Override Orb"
          }
        },
        "bestCore": {
          "per": 2,
          "day": "2026-10-18",
          "offer": "MEGA Override Orb"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 2,
            "offer": "MEGA Override Orb"
          }
        }
      },
      "coreValue": 0.5
    },
    "orb:mutant_gt21_premium_orb": {
      "name": "Mutant GT21 Premium Orb",
      "category": "orb",
      "per": 1,
      "aliases": [],
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "orb:mutant_gt21_standard_orb": {
      "name": "Mutant GT21 Standard Orb",
      "category": "orb",
      "per": 1,
      "aliases": [],
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "orb:orange_mega_orb": {
      "name": "Orange Mega Orb",
      "category": "orb",
      "per": 1,
      "aliases": [],
      "value": 129.99,
      "id": "GACHA_75701dd14119cc312211b430d144aafb9b926e8172872eb620d634b4a18a920f",
      "observed": {
        "basis": "own",
        "perCash": 0.0076929,
        "perCore": 0.001,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 10,
        "firstSeen": false,
        "best": {
          "per": 0.00833403,
          "day": "2026-11-14",
          "offer": "ISO Fest: Orange Mega Orb"
        },
        "byDay": {
          "2026-10-18": {
            "per": 0.0076929,
            "offer": "Iron Vengeance: Orange Mega Orb"
          },
          "2026-10-24": {
            "per": 0.0076929,
            "offer": "Feast of Shadows: Orange Mega Orb"
          },
          "2026-11-06": {
            "per": 0.0076929,
            "offer": "Cyber Breach: Orange Mega Orb"
          },
          "2026-11-14": {
            "per": 0.00833403,
            "offer": "ISO Fest: Orange Mega Orb"
          },
          "2026-11-15": {
            "per": 0.00833403,
            "offer": "ISO Fest: Orange Mega Orb"
          }
        },
        "bestCore": {
          "per": 0.00111111,
          "day": "2026-11-14",
          "offer": "ISO Fest: Orange Mega Orb"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.001,
            "offer": "Iron Vengeance: Orange Mega Orb"
          },
          "2026-10-24": {
            "per": 0.001,
            "offer": "Feast of Shadows: Orange Mega Orb"
          },
          "2026-11-06": {
            "per": 0.001,
            "offer": "Cyber Breach: Orange Mega Orb"
          },
          "2026-11-14": {
            "per": 0.00111111,
            "offer": "ISO Fest: Orange Mega Orb"
          },
          "2026-11-15": {
            "per": 0.00111111,
            "offer": "ISO Fest: Orange Mega Orb"
          }
        }
      },
      "coreValue": 1000
    },
    "orb:override": {
      "name": "Override Orb Fragments",
      "category": "orb",
      "per": 1,
      "aliases": [],
      "value": 0.0124975,
      "observed": {
        "basis": "set",
        "perCash": 80.016,
        "perCore": 10,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 80.016,
          "day": "2026-10-18",
          "offer": "Override Orb"
        },
        "byDay": {
          "2026-10-18": {
            "per": 80.016,
            "offer": "Override Orb"
          }
        },
        "bestCore": {
          "per": 10,
          "day": "2026-10-18",
          "offer": "Override Orb"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 10,
            "offer": "Override Orb"
          }
        }
      },
      "coreValue": 0.1
    },
    "orb:premium": {
      "name": "Premium Orb Fragments",
      "category": "orb",
      "per": 1000,
      "aliases": [],
      "value": 0.498751,
      "observed": {
        "basis": "set",
        "perCash": 2005.01,
        "perCore": 266.667,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 2005.01,
          "day": "2026-10-18",
          "offer": "Extra Energy Rush"
        },
        "byDay": {
          "2026-10-18": {
            "per": 2005.01,
            "offer": "Extra Energy Rush"
          }
        },
        "bestCore": {
          "per": 266.667,
          "day": "2026-10-18",
          "offer": "Extra Energy Rush"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 266.667,
            "offer": "Extra Energy Rush"
          }
        }
      },
      "coreValue": 3.75
    },
    "orb:premium_t1_iso-8": {
      "name": "Premium T1 Iso-8 Orb Fragments",
      "category": "orb",
      "per": 1000,
      "aliases": [],
      "value": 0.03495,
      "observed": {
        "basis": "set",
        "perCash": 28612.3,
        "perCore": 4000,
        "days": [
          "2026-10-18"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 171674,
          "day": "2026-11-15",
          "offer": "Unlock Special: Blue ISO"
        },
        "byDay": {
          "2026-10-18": {
            "per": 28612.3,
            "offer": "Green ISO Ions Top Up"
          },
          "2026-11-15": {
            "per": 171674,
            "offer": "Unlock Special: Blue ISO"
          }
        },
        "bestCore": {
          "per": 24000,
          "day": "2026-11-15",
          "offer": "Unlock Special: Blue ISO"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 4000,
            "offer": "Green ISO Ions Top Up"
          },
          "2026-11-15": {
            "per": 24000,
            "offer": "Unlock Special: Blue ISO"
          }
        }
      },
      "coreValue": 0.25,
      "id": "GACHA_CRATE_ISO8_T1_PREMIUM_TOKEN_63c8d433"
    },
    "orb:t3_ability": {
      "name": "T3 Ability Orb Fragments",
      "category": "orb",
      "per": 1,
      "aliases": [],
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "orb:timeless_eternals_mega": {
      "name": "Timeless Eternals Mega Orb Fragment",
      "category": "orb",
      "per": 1,
      "aliases": [],
      "value": 0.064995,
      "observed": {
        "basis": "own",
        "perCash": 15.3858,
        "perCore": 2,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 15.3858,
          "day": "2026-10-18",
          "offer": "Eternals Radiance: Mega Orb"
        },
        "byDay": {
          "2026-10-18": {
            "per": 15.3858,
            "offer": "Eternals Radiance: Mega Orb"
          }
        },
        "bestCore": {
          "per": 2,
          "day": "2026-10-18",
          "offer": "Eternals Radiance: Mega Orb"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 2,
            "offer": "Eternals Radiance: Mega Orb"
          }
        }
      },
      "coreValue": 0.5
    },
    "orb:training": {
      "name": "Training Orb Fragments",
      "category": "orb",
      "per": 1,
      "aliases": [],
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:jocasta_—_7_red_star_promotion": {
      "name": "Jocasta — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "aliases": [],
      "character": "Jocasta",
      "value": null,
      "id": "RS_JOCASTA_7",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "points:eternals_radiance": {
      "name": "Eternals Radiance Milestone Points",
      "category": "points",
      "per": 1,
      "aliases": [],
      "excludeFromValue": true,
      "value": null
    },
    "points:iron_vengeance": {
      "name": "Iron Vengeance Milestone Points",
      "category": "points",
      "per": 1000000,
      "aliases": [],
      "excludeFromValue": true,
      "value": null
    },
    "points:iso_fest": {
      "name": "ISO Fest Milestone Points",
      "category": "points",
      "per": 1000000,
      "aliases": [],
      "excludeFromValue": true,
      "value": null,
      "id": "EVTA_META_NOV_H"
    },
    "points:raid_warzone": {
      "name": "Raid Warzone Milestone Points",
      "category": "points",
      "per": 100,
      "aliases": [],
      "excludeFromValue": true,
      "value": null,
      "id": "EVTA_META_NOV_C"
    },
    "other:campaign_energy": {
      "name": "Campaign Energy",
      "category": "other",
      "per": 100,
      "aliases": [],
      "value": 0.997496,
      "id": "CAMPAIGN_PLAYER_ENERGY",
      "observed": {
        "basis": "set",
        "perCash": 100.251,
        "perCore": 13.3333,
        "days": [
          "2026-10-18"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 100.251,
          "day": "2026-10-18",
          "offer": "Extra Energy Rush"
        },
        "byDay": {
          "2026-10-18": {
            "per": 100.251,
            "offer": "Extra Energy Rush"
          }
        },
        "bestCore": {
          "per": 13.3333,
          "day": "2026-10-18",
          "offer": "Extra Energy Rush"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 13.3333,
            "offer": "Extra Energy Rush"
          }
        }
      },
      "coreValue": 7.50002
    },
    "other:epic_essence": {
      "name": "Epic Essence",
      "category": "other",
      "per": 1,
      "aliases": [],
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "other:gt21_mutant_calendar": {
      "name": "GT21 Mutant Calendar",
      "category": "other",
      "per": 1,
      "aliases": [],
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "other:premium_plus_battle_pass_ticket": {
      "name": "Premium Plus Battle Pass Ticket",
      "category": "other",
      "per": 1,
      "aliases": [],
      "value": 34.995,
      "id": "BP_PREMIUM_PLUS_CUR",
      "observed": {
        "basis": "set",
        "perCash": 0.0285755,
        "perCore": 0.004,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 5,
        "firstSeen": false,
        "best": {
          "per": 0.0285755,
          "day": "2026-10-18",
          "offer": "Premium Plus Chapter Battle Pass Ticket Pack"
        },
        "byDay": {
          "2026-10-18": {
            "per": 0.0285755,
            "offer": "Premium Plus Chapter Battle Pass Ticket Pack"
          },
          "2026-10-24": {
            "per": 0.0285755,
            "offer": "Premium Plus Chapter Battle Pass Ticket Pack"
          },
          "2026-11-06": {
            "per": 0.0285755,
            "offer": "Premium Plus Chapter Battle Pass Ticket Pack"
          },
          "2026-11-14": {
            "per": 0.0285755,
            "offer": "Premium Plus Chapter Battle Pass Ticket Pack"
          },
          "2026-11-15": {
            "per": 0.0285755,
            "offer": "Premium Plus Chapter Battle Pass Ticket Pack"
          }
        },
        "bestCore": {
          "per": 0.004,
          "day": "2026-10-18",
          "offer": "Premium Plus Chapter Battle Pass Ticket Pack"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 0.004,
            "offer": "Premium Plus Chapter Battle Pass Ticket Pack"
          },
          "2026-10-24": {
            "per": 0.004,
            "offer": "Premium Plus Chapter Battle Pass Ticket Pack"
          },
          "2026-11-06": {
            "per": 0.004,
            "offer": "Premium Plus Chapter Battle Pass Ticket Pack"
          },
          "2026-11-14": {
            "per": 0.004,
            "offer": "Premium Plus Chapter Battle Pass Ticket Pack"
          },
          "2026-11-15": {
            "per": 0.004,
            "offer": "Premium Plus Chapter Battle Pass Ticket Pack"
          }
        }
      },
      "coreValue": 250
    },
    "other:raid_energy_refill": {
      "name": "Raid Energy Refill",
      "category": "other",
      "per": 100,
      "aliases": [],
      "value": 0.873752,
      "id": "ENERGY-RAID-CUR",
      "observed": {
        "basis": "set",
        "perCash": 114.449,
        "perCore": 16,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 5,
        "firstSeen": false,
        "best": {
          "per": 114.449,
          "day": "2026-10-18",
          "offer": "Raid Warzone: Raid Boost"
        },
        "byDay": {
          "2026-10-18": {
            "per": 114.449,
            "offer": "Raid Warzone: Raid Boost"
          },
          "2026-10-24": {
            "per": 114.449,
            "offer": "Raid Warzone: Raid Boost"
          },
          "2026-11-06": {
            "per": 114.449,
            "offer": "Raid Warzone: Raid Boost"
          },
          "2026-11-14": {
            "per": 114.449,
            "offer": "Raid Warzone: Raid Boost"
          },
          "2026-11-15": {
            "per": 114.449,
            "offer": "Raid Warzone: Raid Boost"
          }
        },
        "bestCore": {
          "per": 16,
          "day": "2026-10-18",
          "offer": "Raid Warzone: Raid Boost"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 16,
            "offer": "Raid Warzone: Raid Boost"
          },
          "2026-10-24": {
            "per": 16,
            "offer": "Raid Warzone: Raid Boost"
          },
          "2026-11-06": {
            "per": 16,
            "offer": "Raid Warzone: Raid Boost"
          },
          "2026-11-14": {
            "per": 16,
            "offer": "Raid Warzone: Raid Boost"
          },
          "2026-11-15": {
            "per": 16,
            "offer": "Raid Warzone: Raid Boost"
          }
        }
      },
      "coreValue": 6.25
    },
    "other:raid_health_pack": {
      "name": "Raid Health Pack",
      "category": "other",
      "per": 1,
      "aliases": [],
      "value": 0.01165,
      "id": "HEAL-RAID-CUR",
      "observed": {
        "basis": "set",
        "perCash": 85.8369,
        "perCore": 12,
        "days": [
          "2026-10-18",
          "2026-10-24",
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 5,
        "firstSeen": false,
        "best": {
          "per": 85.8369,
          "day": "2026-10-18",
          "offer": "Raid Warzone: Raid Boost"
        },
        "byDay": {
          "2026-10-18": {
            "per": 85.8369,
            "offer": "Raid Warzone: Raid Boost"
          },
          "2026-10-24": {
            "per": 85.8369,
            "offer": "Raid Warzone: Raid Boost"
          },
          "2026-11-06": {
            "per": 85.8369,
            "offer": "Raid Warzone: Raid Boost"
          },
          "2026-11-14": {
            "per": 85.8369,
            "offer": "Raid Warzone: Raid Boost"
          },
          "2026-11-15": {
            "per": 85.8369,
            "offer": "Raid Warzone: Raid Boost"
          }
        },
        "bestCore": {
          "per": 12,
          "day": "2026-10-18",
          "offer": "Raid Warzone: Raid Boost"
        },
        "coreByDay": {
          "2026-10-18": {
            "per": 12,
            "offer": "Raid Warzone: Raid Boost"
          },
          "2026-10-24": {
            "per": 12,
            "offer": "Raid Warzone: Raid Boost"
          },
          "2026-11-06": {
            "per": 12,
            "offer": "Raid Warzone: Raid Boost"
          },
          "2026-11-14": {
            "per": 12,
            "offer": "Raid Warzone: Raid Boost"
          },
          "2026-11-15": {
            "per": 12,
            "offer": "Raid Warzone: Raid Boost"
          }
        }
      },
      "coreValue": 0.0833333
    },
    "other:strike_store_exclusive": {
      "name": "Strike Store Exclusive",
      "category": "other",
      "per": 1,
      "aliases": [],
      "value": null,
      "id": "GACHA_ecf009d34acb586fb94f4bbf4ac26aea6548425d0875bbca13e6bdf3992df9e8",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:crimson_molecular_cloth": {
      "name": "Crimson Molecular Cloth",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.355511,
      "observed": {
        "basis": "set",
        "perCash": 2.81285,
        "perCore": 0.375,
        "days": [
          "2026-10-24"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 2.81285,
          "day": "2026-10-24",
          "offer": "Unlock Special: Crimson Uniques"
        },
        "byDay": {
          "2026-10-24": {
            "per": 2.81285,
            "offer": "Unlock Special: Crimson Uniques"
          }
        },
        "bestCore": {
          "per": 0.375,
          "day": "2026-10-24",
          "offer": "Unlock Special: Crimson Uniques"
        },
        "coreByDay": {
          "2026-10-24": {
            "per": 0.375,
            "offer": "Unlock Special: Crimson Uniques"
          }
        }
      },
      "coreValue": 2.66667
    },
    "gear:crimson_molecular_scan": {
      "name": "Crimson Molecular Scan",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.177756,
      "observed": {
        "basis": "set",
        "perCash": 5.6257,
        "perCore": 0.75,
        "days": [
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 5.6257,
          "day": "2026-10-24",
          "offer": "Unlock Special: Crimson Uniques"
        },
        "byDay": {
          "2026-10-24": {
            "per": 5.6257,
            "offer": "Unlock Special: Crimson Uniques"
          },
          "2026-11-06": {
            "per": 5.6257,
            "offer": "Unlock Special: Crimson Uniques"
          }
        },
        "bestCore": {
          "per": 0.75,
          "day": "2026-10-24",
          "offer": "Unlock Special: Crimson Uniques"
        },
        "coreByDay": {
          "2026-10-24": {
            "per": 0.75,
            "offer": "Unlock Special: Crimson Uniques"
          },
          "2026-11-06": {
            "per": 0.75,
            "offer": "Unlock Special: Crimson Uniques"
          }
        }
      },
      "coreValue": 1.33333
    },
    "gear:crimson_marrow_extract": {
      "name": "Crimson Marrow Extract",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.177756,
      "observed": {
        "basis": "set",
        "perCash": 5.6257,
        "perCore": 0.75,
        "days": [
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 5.6257,
          "day": "2026-10-24",
          "offer": "Unlock Special: Crimson Uniques"
        },
        "byDay": {
          "2026-10-24": {
            "per": 5.6257,
            "offer": "Unlock Special: Crimson Uniques"
          },
          "2026-11-06": {
            "per": 5.6257,
            "offer": "Unlock Special: Crimson Uniques"
          }
        },
        "bestCore": {
          "per": 0.75,
          "day": "2026-10-24",
          "offer": "Unlock Special: Crimson Uniques"
        },
        "coreByDay": {
          "2026-10-24": {
            "per": 0.75,
            "offer": "Unlock Special: Crimson Uniques"
          },
          "2026-11-06": {
            "per": 0.75,
            "offer": "Unlock Special: Crimson Uniques"
          }
        }
      },
      "coreValue": 1.33333
    },
    "gear:crimson_mri": {
      "name": "Crimson MRI",
      "category": "gear",
      "per": 100,
      "aliases": [],
      "value": 0.466001,
      "id": "GEAR_RED_BIO_MAT_C3",
      "observed": {
        "basis": "set",
        "perCash": 214.592,
        "perCore": 30,
        "days": [
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 214.592,
          "day": "2026-10-24",
          "offer": "Unlock Special: Crimson Origins"
        },
        "byDay": {
          "2026-10-24": {
            "per": 214.592,
            "offer": "Unlock Special: Crimson Origins"
          },
          "2026-11-06": {
            "per": 214.592,
            "offer": "Unlock Special: Crimson Origins"
          }
        },
        "bestCore": {
          "per": 30,
          "day": "2026-10-24",
          "offer": "Unlock Special: Crimson Origins"
        },
        "coreByDay": {
          "2026-10-24": {
            "per": 30,
            "offer": "Unlock Special: Crimson Origins"
          },
          "2026-11-06": {
            "per": 30,
            "offer": "Unlock Special: Crimson Origins"
          }
        }
      },
      "coreValue": 3.33333
    },
    "gear:crimson_syringe": {
      "name": "Crimson Syringe",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.213306,
      "observed": {
        "basis": "set",
        "perCash": 4.68809,
        "perCore": 0.625,
        "days": [
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 4.68809,
          "day": "2026-10-24",
          "offer": "Unlock Special: Crimson Uniques"
        },
        "byDay": {
          "2026-10-24": {
            "per": 4.68809,
            "offer": "Unlock Special: Crimson Uniques"
          },
          "2026-11-06": {
            "per": 4.68809,
            "offer": "Unlock Special: Crimson Uniques"
          }
        },
        "bestCore": {
          "per": 0.625,
          "day": "2026-10-24",
          "offer": "Unlock Special: Crimson Uniques"
        },
        "coreByDay": {
          "2026-10-24": {
            "per": 0.625,
            "offer": "Unlock Special: Crimson Uniques"
          },
          "2026-11-06": {
            "per": 0.625,
            "offer": "Unlock Special: Crimson Uniques"
          }
        }
      },
      "coreValue": 1.6
    },
    "gear:crimson_spectral_analysis": {
      "name": "Crimson Spectral Analysis",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.213306,
      "observed": {
        "basis": "set",
        "perCash": 4.68809,
        "perCore": 0.625,
        "days": [
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 4.68809,
          "day": "2026-10-24",
          "offer": "Unlock Special: Crimson Uniques"
        },
        "byDay": {
          "2026-10-24": {
            "per": 4.68809,
            "offer": "Unlock Special: Crimson Uniques"
          },
          "2026-11-06": {
            "per": 4.68809,
            "offer": "Unlock Special: Crimson Uniques"
          }
        },
        "bestCore": {
          "per": 0.625,
          "day": "2026-10-24",
          "offer": "Unlock Special: Crimson Uniques"
        },
        "coreByDay": {
          "2026-10-24": {
            "per": 0.625,
            "offer": "Unlock Special: Crimson Uniques"
          },
          "2026-11-06": {
            "per": 0.625,
            "offer": "Unlock Special: Crimson Uniques"
          }
        }
      },
      "coreValue": 1.6
    },
    "gear:crimson_isomer": {
      "name": "Crimson Isomer",
      "category": "gear",
      "per": 100,
      "aliases": [],
      "value": 0.332857,
      "id": "GEAR_RED_BIO_MAT_BIT",
      "observed": {
        "basis": "set",
        "perCash": 300.429,
        "perCore": 42,
        "days": [
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 300.429,
          "day": "2026-10-24",
          "offer": "Unlock Special: Crimson Origins"
        },
        "byDay": {
          "2026-10-24": {
            "per": 300.429,
            "offer": "Unlock Special: Crimson Origins"
          },
          "2026-11-06": {
            "per": 300.429,
            "offer": "Unlock Special: Crimson Origins"
          }
        },
        "bestCore": {
          "per": 42,
          "day": "2026-10-24",
          "offer": "Unlock Special: Crimson Origins"
        },
        "coreByDay": {
          "2026-10-24": {
            "per": 42,
            "offer": "Unlock Special: Crimson Origins"
          },
          "2026-11-06": {
            "per": 42,
            "offer": "Unlock Special: Crimson Origins"
          }
        }
      },
      "coreValue": 2.38095
    },
    "gear:crimson_phosphates": {
      "name": "Crimson Phosphates",
      "category": "gear",
      "per": 100,
      "aliases": [],
      "value": 0.388333,
      "id": "GEAR_RED_BIO_MAT_C2",
      "observed": {
        "basis": "set",
        "perCash": 257.511,
        "perCore": 36,
        "days": [
          "2026-10-24",
          "2026-11-06"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 257.511,
          "day": "2026-10-24",
          "offer": "Unlock Special: Crimson Origins"
        },
        "byDay": {
          "2026-10-24": {
            "per": 257.511,
            "offer": "Unlock Special: Crimson Origins"
          },
          "2026-11-06": {
            "per": 257.511,
            "offer": "Unlock Special: Crimson Origins"
          }
        },
        "bestCore": {
          "per": 36,
          "day": "2026-10-24",
          "offer": "Unlock Special: Crimson Origins"
        },
        "coreByDay": {
          "2026-10-24": {
            "per": 36,
            "offer": "Unlock Special: Crimson Origins"
          },
          "2026-11-06": {
            "per": 36,
            "offer": "Unlock Special: Crimson Origins"
          }
        }
      },
      "coreValue": 2.77778
    },
    "shard:dracula": {
      "name": "Dracula shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Dracula",
      "value": 0.81244,
      "observed": {
        "basis": "own",
        "perCash": 1.23086,
        "perCore": 0.16,
        "days": [
          "2026-10-24"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 1.23086,
          "day": "2026-10-24",
          "offer": "Ultra Sovereign"
        },
        "byDay": {
          "2026-10-24": {
            "per": 1.23086,
            "offer": "Ultra Sovereign"
          }
        },
        "bestCore": {
          "per": 0.16,
          "day": "2026-10-24",
          "offer": "Ultra Sovereign"
        },
        "coreByDay": {
          "2026-10-24": {
            "per": 0.16,
            "offer": "Ultra Sovereign"
          }
        }
      },
      "coreValue": 6.25
    },
    "shard:morbius": {
      "name": "Morbius shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Morbius",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:electro": {
      "name": "Electro shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Electro",
      "value": 0.016037,
      "observed": {
        "basis": "own",
        "perCash": 62.3557,
        "perCore": 8.1,
        "days": [
          "2026-10-24"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 62.3557,
          "day": "2026-10-24",
          "offer": "Feast of Shadows: Electro"
        },
        "byDay": {
          "2026-10-24": {
            "per": 62.3557,
            "offer": "Feast of Shadows: Electro"
          }
        },
        "bestCore": {
          "per": 8.1,
          "day": "2026-10-24",
          "offer": "Feast of Shadows: Electro"
        },
        "coreByDay": {
          "2026-10-24": {
            "per": 8.1,
            "offer": "Feast of Shadows: Electro"
          }
        }
      },
      "coreValue": 0.123457
    },
    "shard:mister negative": {
      "name": "Mister Negative shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Mister Negative",
      "value": 0.016037,
      "observed": {
        "basis": "own",
        "perCash": 62.3557,
        "perCore": 8.1,
        "days": [
          "2026-10-24"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 62.3557,
          "day": "2026-10-24",
          "offer": "Feast of Shadows: Mister Negative"
        },
        "byDay": {
          "2026-10-24": {
            "per": 62.3557,
            "offer": "Feast of Shadows: Mister Negative"
          }
        },
        "bestCore": {
          "per": 8.1,
          "day": "2026-10-24",
          "offer": "Feast of Shadows: Mister Negative"
        },
        "coreByDay": {
          "2026-10-24": {
            "per": 8.1,
            "offer": "Feast of Shadows: Mister Negative"
          }
        }
      },
      "coreValue": 0.123457
    },
    "shard:bullseye": {
      "name": "Bullseye shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Bullseye",
      "value": 0.016037,
      "observed": {
        "basis": "own",
        "perCash": 62.3557,
        "perCore": 8.1,
        "days": [
          "2026-10-24"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 62.3557,
          "day": "2026-10-24",
          "offer": "Feast of Shadows: Bullseye"
        },
        "byDay": {
          "2026-10-24": {
            "per": 62.3557,
            "offer": "Feast of Shadows: Bullseye"
          }
        },
        "bestCore": {
          "per": 8.1,
          "day": "2026-10-24",
          "offer": "Feast of Shadows: Bullseye"
        },
        "coreByDay": {
          "2026-10-24": {
            "per": 8.1,
            "offer": "Feast of Shadows: Bullseye"
          }
        }
      },
      "coreValue": 0.123457
    },
    "shard:scorpion (breaker)": {
      "name": "Scorpion (Breaker) shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Scorpion (Breaker)",
      "value": 0.6998,
      "observed": {
        "basis": "own",
        "perCash": 1.42898,
        "perCore": 0.2,
        "days": [
          "2026-10-24"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 1.42898,
          "day": "2026-10-24",
          "offer": "Feast of Shadows: Scorpion (Breaker)"
        },
        "byDay": {
          "2026-10-24": {
            "per": 1.42898,
            "offer": "Feast of Shadows: Scorpion (Breaker)"
          }
        },
        "bestCore": {
          "per": 0.2,
          "day": "2026-10-24",
          "offer": "Feast of Shadows: Scorpion (Breaker)"
        },
        "coreByDay": {
          "2026-10-24": {
            "per": 0.2,
            "offer": "Feast of Shadows: Scorpion (Breaker)"
          }
        }
      },
      "coreValue": 5
    },
    "shard:blade": {
      "name": "Blade shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Blade",
      "value": 0.0185093,
      "id": "SHARD_BLADE",
      "observed": {
        "basis": "set",
        "perCash": 54.027,
        "perCore": 7.2,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 54.027,
          "day": "2026-11-14",
          "offer": "Nightstalker Power Up"
        },
        "byDay": {
          "2026-11-14": {
            "per": 54.027,
            "offer": "Nightstalker Power Up"
          },
          "2026-11-15": {
            "per": 54.027,
            "offer": "Nightstalker Power Up"
          }
        },
        "bestCore": {
          "per": 7.2,
          "day": "2026-11-14",
          "offer": "Nightstalker Power Up"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 7.2,
            "offer": "Nightstalker Power Up"
          },
          "2026-11-15": {
            "per": 7.2,
            "offer": "Nightstalker Power Up"
          }
        }
      },
      "coreValue": 0.138889
    },
    "shard:hit monkey": {
      "name": "Hit-Monkey shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Hit-Monkey",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:lady deathstrike": {
      "name": "Lady Deathstrike shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Lady Deathstrike",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:gladiator": {
      "name": "Gladiator shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Gladiator",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:lizard": {
      "name": "Lizard shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Lizard",
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "orb:the_summoners": {
      "name": "The Summoner's Orb Fragments",
      "category": "orb",
      "per": 100,
      "aliases": [],
      "value": 0.2165,
      "observed": {
        "basis": "own",
        "perCash": 461.894,
        "perCore": 60,
        "days": [
          "2026-10-24"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 461.894,
          "day": "2026-10-24",
          "offer": "Mephisto's Summoning: Orb Special"
        },
        "byDay": {
          "2026-10-24": {
            "per": 461.894,
            "offer": "Mephisto's Summoning: Orb Special"
          }
        },
        "bestCore": {
          "per": 60,
          "day": "2026-10-24",
          "offer": "Mephisto's Summoning: Orb Special"
        },
        "coreByDay": {
          "2026-10-24": {
            "per": 60,
            "offer": "Mephisto's Summoning: Orb Special"
          }
        }
      },
      "coreValue": 1.66667
    },
    "orb:zombie_mega": {
      "name": "Zombie Mega Orb Fragments",
      "category": "orb",
      "per": 100,
      "aliases": [],
      "value": 0.4333,
      "observed": {
        "basis": "own",
        "perCash": 230.787,
        "perCore": 30,
        "days": [
          "2026-10-24"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 230.787,
          "day": "2026-10-24",
          "offer": "Feast of Shadows: Zombie Orb"
        },
        "byDay": {
          "2026-10-24": {
            "per": 230.787,
            "offer": "Feast of Shadows: Zombie Orb"
          }
        },
        "bestCore": {
          "per": 30,
          "day": "2026-10-24",
          "offer": "Feast of Shadows: Zombie Orb"
        },
        "coreByDay": {
          "2026-10-24": {
            "per": 30,
            "offer": "Feast of Shadows: Zombie Orb"
          }
        }
      },
      "coreValue": 3.33333
    },
    "orb:scorpion_(breaker)_mega": {
      "name": "Scorpion (Breaker) Mega Orb Fragments",
      "category": "orb",
      "per": 1,
      "aliases": [],
      "value": 0.064995,
      "observed": {
        "basis": "own",
        "perCash": 15.3858,
        "perCore": 2,
        "days": [
          "2026-10-24"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 15.3858,
          "day": "2026-10-24",
          "offer": "Feast of Shadows: Scorpion (Breaker)"
        },
        "byDay": {
          "2026-10-24": {
            "per": 15.3858,
            "offer": "Feast of Shadows: Scorpion (Breaker)"
          }
        },
        "bestCore": {
          "per": 2,
          "day": "2026-10-24",
          "offer": "Feast of Shadows: Scorpion (Breaker)"
        },
        "coreByDay": {
          "2026-10-24": {
            "per": 2,
            "offer": "Feast of Shadows: Scorpion (Breaker)"
          }
        }
      },
      "coreValue": 0.5
    },
    "orb:mega": {
      "name": "Mega Orb Fragments",
      "category": "orb",
      "per": 100,
      "aliases": [],
      "value": 0.649498,
      "observed": {
        "basis": "own",
        "perCash": 153.965,
        "perCore": 20,
        "days": [
          "2026-10-24"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 153.965,
          "day": "2026-10-24",
          "offer": "Feast of Shadows: Hidden Treasure"
        },
        "byDay": {
          "2026-10-24": {
            "per": 153.965,
            "offer": "Feast of Shadows: Hidden Treasure"
          }
        },
        "bestCore": {
          "per": 20,
          "day": "2026-10-24",
          "offer": "Feast of Shadows: Hidden Treasure"
        },
        "coreByDay": {
          "2026-10-24": {
            "per": 20,
            "offer": "Feast of Shadows: Hidden Treasure"
          }
        }
      },
      "coreValue": 5
    },
    "orb:nightreaver": {
      "name": "Nightreaver Orb Fragments",
      "category": "orb",
      "per": 100,
      "aliases": [],
      "value": 0.3495,
      "observed": {
        "basis": "own",
        "perCash": 286.123,
        "perCore": 40,
        "days": [
          "2026-10-24"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 286.123,
          "day": "2026-10-24",
          "offer": "Nightreaver Orb"
        },
        "byDay": {
          "2026-10-24": {
            "per": 286.123,
            "offer": "Nightreaver Orb"
          }
        },
        "bestCore": {
          "per": 40,
          "day": "2026-10-24",
          "offer": "Nightreaver Orb"
        },
        "coreByDay": {
          "2026-10-24": {
            "per": 40,
            "offer": "Nightreaver Orb"
          }
        }
      },
      "coreValue": 2.5
    },
    "other:gt21_bio_calendar": {
      "name": "GT21 Bio Calendar",
      "category": "other",
      "per": 1,
      "aliases": [],
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "orb:a.i._avengers_mega": {
      "name": "A.I. Avengers Mega Orb Fragment",
      "category": "orb",
      "per": 1,
      "aliases": [],
      "value": 0.064995,
      "id": "GACHA_CRATE_AIAVENGERSMEGA_NOV26_TOKEN_c1bb1633",
      "observed": {
        "basis": "own",
        "perCash": 15.3858,
        "perCore": 2,
        "days": [
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 15.3858,
          "day": "2026-11-06",
          "offer": "Cyber Breach: A.I. Avengers Mega Orb"
        },
        "byDay": {
          "2026-11-06": {
            "per": 15.3858,
            "offer": "Cyber Breach: A.I. Avengers Mega Orb"
          },
          "2026-11-14": {
            "per": 15.3858,
            "offer": "Cyber Breach: A.I. Avengers Mega Orb"
          },
          "2026-11-15": {
            "per": 15.3858,
            "offer": "Cyber Breach: A.I. Avengers Mega Orb"
          }
        },
        "bestCore": {
          "per": 2,
          "day": "2026-11-06",
          "offer": "Cyber Breach: A.I. Avengers Mega Orb"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 2,
            "offer": "Cyber Breach: A.I. Avengers Mega Orb"
          },
          "2026-11-14": {
            "per": 2,
            "offer": "Cyber Breach: A.I. Avengers Mega Orb"
          },
          "2026-11-15": {
            "per": 2,
            "offer": "Cyber Breach: A.I. Avengers Mega Orb"
          }
        }
      },
      "coreValue": 0.5
    },
    "orb:allied_supply_xiii": {
      "name": "Allied Supply XIII Orb Fragments",
      "category": "orb",
      "per": 100,
      "aliases": [],
      "value": 0.312375,
      "id": "GACHA_CRATE_ALLIEDSUPPLY13_TOKEN_23246982",
      "observed": {
        "basis": "own",
        "perCash": 320.128,
        "perCore": 40,
        "days": [
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 6,
        "firstSeen": false,
        "best": {
          "per": 320.128,
          "day": "2026-11-06",
          "offer": "Raid Warzone: Daily Allied Supply"
        },
        "byDay": {
          "2026-11-06": {
            "per": 320.128,
            "offer": "Raid Warzone: Daily Allied Supply"
          },
          "2026-11-14": {
            "per": 320.128,
            "offer": "Raid Warzone: Daily Allied Supply"
          },
          "2026-11-15": {
            "per": 320.128,
            "offer": "Raid Warzone: Daily Allied Supply"
          }
        },
        "bestCore": {
          "per": 40,
          "day": "2026-11-06",
          "offer": "Raid Warzone: Daily Allied Supply"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 40,
            "offer": "Raid Warzone: Daily Allied Supply"
          },
          "2026-11-14": {
            "per": 40,
            "offer": "Raid Warzone: Daily Allied Supply"
          },
          "2026-11-15": {
            "per": 40,
            "offer": "Raid Warzone: Daily Allied Supply"
          }
        }
      },
      "coreValue": 2.5
    },
    "orb:armory_19": {
      "name": "Armory 19 Orb Fragments",
      "category": "orb",
      "per": 1000,
      "aliases": [],
      "value": 0.433,
      "observed": {
        "basis": "own",
        "perCash": 2309.47,
        "perCore": 300,
        "days": [
          "2026-11-06"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 2309.47,
          "day": "2026-11-06",
          "offer": "Armory 19 Orb Special"
        },
        "byDay": {
          "2026-11-06": {
            "per": 2309.47,
            "offer": "Armory 19 Orb Special"
          }
        },
        "bestCore": {
          "per": 300,
          "day": "2026-11-06",
          "offer": "Armory 19 Orb Special"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 300,
            "offer": "Armory 19 Orb Special"
          }
        }
      },
      "coreValue": 3.33333,
      "id": "GACHA_CRATE_GT19_C5_C9_TOKEN_ea9ada8f"
    },
    "gear:augmented_arcane_powder": {
      "name": "Augmented Arcane Powder",
      "category": "gear",
      "per": 100,
      "aliases": [],
      "value": 0.259185,
      "id": "GEAR_TEAL_MYSTIC_MAT_BIT",
      "observed": {
        "basis": "set",
        "perCash": 385.825,
        "perCore": 54,
        "days": [
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 385.825,
          "day": "2026-11-06",
          "offer": "Unlock Special: Teal Gear"
        },
        "byDay": {
          "2026-11-06": {
            "per": 385.825,
            "offer": "Unlock Special: Teal Gear"
          },
          "2026-11-14": {
            "per": 31.9871,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 31.9871,
            "offer": "Morbius Power Pack"
          }
        },
        "bestCore": {
          "per": 54,
          "day": "2026-11-06",
          "offer": "Unlock Special: Teal Gear"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 54,
            "offer": "Unlock Special: Teal Gear"
          },
          "2026-11-14": {
            "per": 4.158,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 4.158,
            "offer": "Morbius Power Pack"
          }
        }
      },
      "coreValue": 1.85185
    },
    "gear:augmented_basic_catalyst_part": {
      "name": "Augmented Basic Catalyst Part",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:augmented_celestial_lattice": {
      "name": "Augmented Celestial Lattice",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.01428,
      "observed": {
        "basis": "set",
        "perCash": 70.028,
        "perCore": 8.75,
        "days": [
          "2026-11-06"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 70.028,
          "day": "2026-11-06",
          "offer": "Unlock Special: Uniquely Teal"
        },
        "byDay": {
          "2026-11-06": {
            "per": 70.028,
            "offer": "Unlock Special: Uniquely Teal"
          }
        },
        "bestCore": {
          "per": 8.75,
          "day": "2026-11-06",
          "offer": "Unlock Special: Uniquely Teal"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 8.75,
            "offer": "Unlock Special: Uniquely Teal"
          }
        }
      },
      "coreValue": 0.114286
    },
    "gear:augmented_damage_catalyst_part": {
      "name": "Augmented Damage Catalyst Part",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.02476,
      "id": "GEAR_TEAL_DAMAGE_MAT_BIT",
      "observed": {
        "basis": "set",
        "perCash": 40.3877,
        "perCore": 5.25,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 40.3877,
          "day": "2026-11-14",
          "offer": "Morbius Power Pack"
        },
        "byDay": {
          "2026-11-14": {
            "per": 40.3877,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 40.3877,
            "offer": "Morbius Power Pack"
          }
        },
        "bestCore": {
          "per": 5.25,
          "day": "2026-11-14",
          "offer": "Morbius Power Pack"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 5.25,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 5.25,
            "offer": "Morbius Power Pack"
          }
        }
      },
      "coreValue": 0.190476
    },
    "gear:augmented_esoteric_glyphs": {
      "name": "Augmented Esoteric Glyphs",
      "category": "gear",
      "per": 100,
      "aliases": [],
      "value": 0.259185,
      "id": "GEAR_TEAL_MYSTIC_MAT_C2",
      "observed": {
        "basis": "set",
        "perCash": 385.825,
        "perCore": 54,
        "days": [
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 385.825,
          "day": "2026-11-06",
          "offer": "Unlock Special: Teal Gear"
        },
        "byDay": {
          "2026-11-06": {
            "per": 385.825,
            "offer": "Unlock Special: Teal Gear"
          },
          "2026-11-14": {
            "per": 26.6559,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 26.6559,
            "offer": "Morbius Power Pack"
          }
        },
        "bestCore": {
          "per": 54,
          "day": "2026-11-06",
          "offer": "Unlock Special: Teal Gear"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 54,
            "offer": "Unlock Special: Teal Gear"
          },
          "2026-11-14": {
            "per": 3.465,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 3.465,
            "offer": "Morbius Power Pack"
          }
        }
      },
      "coreValue": 1.85185
    },
    "gear:augmented_focus_catalyst_part": {
      "name": "Augmented Focus Catalyst Part",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:augmented_health_catalyst_part": {
      "name": "Augmented Health Catalyst Part",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:augmented_mythic_geode": {
      "name": "Augmented Mythic Geode",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.01428,
      "id": "GEAR_TEAL_MYSTIC_MAT_C8",
      "observed": {
        "basis": "set",
        "perCash": 70.028,
        "perCore": 8.75,
        "days": [
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 70.028,
          "day": "2026-11-06",
          "offer": "Unlock Special: Uniquely Teal"
        },
        "byDay": {
          "2026-11-06": {
            "per": 70.028,
            "offer": "Unlock Special: Uniquely Teal"
          },
          "2026-11-14": {
            "per": 3.23102,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 3.23102,
            "offer": "Morbius Power Pack"
          }
        },
        "bestCore": {
          "per": 8.75,
          "day": "2026-11-06",
          "offer": "Unlock Special: Uniquely Teal"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 8.75,
            "offer": "Unlock Special: Uniquely Teal"
          },
          "2026-11-14": {
            "per": 0.42,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 0.42,
            "offer": "Morbius Power Pack"
          }
        }
      },
      "coreValue": 0.114286
    },
    "gear:augmented_resistance_catalyst_part": {
      "name": "Augmented Resistance Catalyst Part",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:augmented_shoggoth_ichor": {
      "name": "Augmented Shoggoth Ichor",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.01428,
      "observed": {
        "basis": "set",
        "perCash": 70.028,
        "perCore": 8.75,
        "days": [
          "2026-11-06"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 70.028,
          "day": "2026-11-06",
          "offer": "Unlock Special: Uniquely Teal"
        },
        "byDay": {
          "2026-11-06": {
            "per": 70.028,
            "offer": "Unlock Special: Uniquely Teal"
          }
        },
        "bestCore": {
          "per": 8.75,
          "day": "2026-11-06",
          "offer": "Unlock Special: Uniquely Teal"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 8.75,
            "offer": "Unlock Special: Uniquely Teal"
          }
        }
      },
      "coreValue": 0.114286
    },
    "gear:augmented_sigil": {
      "name": "Augmented Sigil",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.01428,
      "id": "GEAR_TEAL_MYSTIC_MAT_C1",
      "observed": {
        "basis": "set",
        "perCash": 70.028,
        "perCore": 8.75,
        "days": [
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 70.028,
          "day": "2026-11-06",
          "offer": "Unlock Special: Uniquely Teal"
        },
        "byDay": {
          "2026-11-06": {
            "per": 70.028,
            "offer": "Unlock Special: Uniquely Teal"
          },
          "2026-11-14": {
            "per": 3.23102,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 3.23102,
            "offer": "Morbius Power Pack"
          }
        },
        "bestCore": {
          "per": 8.75,
          "day": "2026-11-06",
          "offer": "Unlock Special: Uniquely Teal"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 8.75,
            "offer": "Unlock Special: Uniquely Teal"
          },
          "2026-11-14": {
            "per": 0.42,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 0.42,
            "offer": "Morbius Power Pack"
          }
        }
      },
      "coreValue": 0.114286
    },
    "gear:augmented_uru": {
      "name": "Augmented Uru",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.0768923,
      "observed": {
        "basis": "set",
        "perCash": 13.0052,
        "perCore": 1.625,
        "days": [
          "2026-11-06"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 13.0052,
          "day": "2026-11-06",
          "offer": "Unlock Special: Uniquely Teal"
        },
        "byDay": {
          "2026-11-06": {
            "per": 13.0052,
            "offer": "Unlock Special: Uniquely Teal"
          }
        },
        "bestCore": {
          "per": 1.625,
          "day": "2026-11-06",
          "offer": "Unlock Special: Uniquely Teal"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 1.625,
            "offer": "Unlock Special: Uniquely Teal"
          }
        }
      },
      "coreValue": 0.615385
    },
    "gear:augmented_vial": {
      "name": "Augmented Vial",
      "category": "gear",
      "per": 100,
      "aliases": [],
      "value": 0.259185,
      "id": "GEAR_TEAL_MYSTIC_MAT_C3",
      "observed": {
        "basis": "set",
        "perCash": 385.825,
        "perCore": 54,
        "days": [
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 385.825,
          "day": "2026-11-06",
          "offer": "Unlock Special: Teal Gear"
        },
        "byDay": {
          "2026-11-06": {
            "per": 385.825,
            "offer": "Unlock Special: Teal Gear"
          },
          "2026-11-14": {
            "per": 21.3247,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 21.3247,
            "offer": "Morbius Power Pack"
          }
        },
        "bestCore": {
          "per": 54,
          "day": "2026-11-06",
          "offer": "Unlock Special: Teal Gear"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 54,
            "offer": "Unlock Special: Teal Gear"
          },
          "2026-11-14": {
            "per": 2.772,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 2.772,
            "offer": "Morbius Power Pack"
          }
        }
      },
      "coreValue": 1.85185
    },
    "orb:black_friday_sneak_peaks": {
      "name": "Black Friday Sneak Peaks Orb Fragments",
      "category": "orb",
      "per": 1,
      "aliases": [],
      "value": 0.012495,
      "id": "GACHA_CRATE_BLACKFRIDAY26_DIAMOND_TOKEN_4a5aa8fa",
      "observed": {
        "basis": "own",
        "perCash": 80.032,
        "perCore": 10,
        "days": [
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 80.032,
          "day": "2026-11-06",
          "offer": "Black Friday Sneak Peak"
        },
        "byDay": {
          "2026-11-06": {
            "per": 80.032,
            "offer": "Black Friday Sneak Peak"
          },
          "2026-11-14": {
            "per": 80.032,
            "offer": "Black Friday Sneak Peak"
          },
          "2026-11-15": {
            "per": 80.032,
            "offer": "Black Friday Sneak Peak"
          }
        },
        "bestCore": {
          "per": 10,
          "day": "2026-11-06",
          "offer": "Black Friday Sneak Peak"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 10,
            "offer": "Black Friday Sneak Peak"
          },
          "2026-11-14": {
            "per": 10,
            "offer": "Black Friday Sneak Peak"
          },
          "2026-11-15": {
            "per": 10,
            "offer": "Black Friday Sneak Peak"
          }
        }
      },
      "coreValue": 0.1
    },
    "gear:crimson_celestial_lattice": {
      "name": "Crimson Celestial Lattice",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.444334,
      "id": "GEAR_RED_MYSTIC_MAT_C9",
      "observed": {
        "basis": "set",
        "perCash": 2.25056,
        "perCore": 0.3,
        "days": [
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 2.90792,
          "day": "2026-11-14",
          "offer": "Morbius Power Pack"
        },
        "byDay": {
          "2026-11-06": {
            "per": 2.25056,
            "offer": "Unlock Special: Crimson Gear"
          },
          "2026-11-14": {
            "per": 2.90792,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 2.90792,
            "offer": "Morbius Power Pack"
          }
        },
        "bestCore": {
          "per": 0.378,
          "day": "2026-11-14",
          "offer": "Morbius Power Pack"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 0.3,
            "offer": "Unlock Special: Crimson Gear"
          },
          "2026-11-14": {
            "per": 0.378,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 0.378,
            "offer": "Morbius Power Pack"
          }
        }
      },
      "coreValue": 3.33333
    },
    "gear:crimson_laser_torch": {
      "name": "Crimson Laser Torch",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": null,
      "id": "GEAR_RED_TECH_MAT_C2",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:crimson_locked_case": {
      "name": "Crimson Locked Case",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": null,
      "id": "GEAR_RED_SKILL_MAT_C2",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:crimson_secret_intel": {
      "name": "Crimson Secret Intel",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": null,
      "id": "GEAR_RED_SKILL_MAT_BIT",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:crimson_shoggoth_ichor": {
      "name": "Crimson Shoggoth Ichor",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.444334,
      "id": "GEAR_RED_MYSTIC_MAT_C5",
      "observed": {
        "basis": "set",
        "perCash": 2.25056,
        "perCore": 0.3,
        "days": [
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 2.90792,
          "day": "2026-11-14",
          "offer": "Morbius Power Pack"
        },
        "byDay": {
          "2026-11-06": {
            "per": 2.25056,
            "offer": "Unlock Special: Crimson Gear"
          },
          "2026-11-14": {
            "per": 2.90792,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 2.90792,
            "offer": "Morbius Power Pack"
          }
        },
        "bestCore": {
          "per": 0.378,
          "day": "2026-11-14",
          "offer": "Morbius Power Pack"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 0.3,
            "offer": "Unlock Special: Crimson Gear"
          },
          "2026-11-14": {
            "per": 0.378,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 0.378,
            "offer": "Morbius Power Pack"
          }
        }
      },
      "coreValue": 3.33333
    },
    "gear:crimson_titanium_alloy": {
      "name": "Crimson Titanium Alloy",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.355511,
      "observed": {
        "basis": "set",
        "perCash": 2.81285,
        "perCore": 0.375,
        "days": [
          "2026-11-06"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 2.81285,
          "day": "2026-11-06",
          "offer": "Unlock Special: Crimson Uniques"
        },
        "byDay": {
          "2026-11-06": {
            "per": 2.81285,
            "offer": "Unlock Special: Crimson Uniques"
          }
        },
        "bestCore": {
          "per": 0.375,
          "day": "2026-11-06",
          "offer": "Unlock Special: Crimson Uniques"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 0.375,
            "offer": "Unlock Special: Crimson Uniques"
          }
        }
      },
      "coreValue": 2.66667
    },
    "gear:crimson_unstable_molecules": {
      "name": "Crimson Unstable Molecules",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": null,
      "id": "GEAR_RED_TECH_MAT_BIT",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:crimson_vial": {
      "name": "Crimson Vial",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": 0.0297596,
      "id": "GEAR_RED_MYSTIC_MAT_C3",
      "observed": {
        "basis": "set",
        "perCash": 33.6026,
        "perCore": 4.368,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 33.6026,
          "day": "2026-11-14",
          "offer": "Morbius Power Pack"
        },
        "byDay": {
          "2026-11-14": {
            "per": 33.6026,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 33.6026,
            "offer": "Morbius Power Pack"
          }
        },
        "bestCore": {
          "per": 4.368,
          "day": "2026-11-14",
          "offer": "Morbius Power Pack"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 4.368,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 4.368,
            "offer": "Morbius Power Pack"
          }
        }
      },
      "coreValue": 0.228938
    },
    "elite_4_credit": {
      "name": "Elite 4 Credit",
      "category": "currency",
      "per": 1000,
      "aliases": [],
      "value": 0.017475,
      "id": "ELITE_4_CUR",
      "observed": {
        "basis": "own",
        "perCash": 57224.6,
        "perCore": 8000,
        "days": [
          "2026-11-06"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 57224.6,
          "day": "2026-11-06",
          "offer": "Elite 4 Star Orb Offer"
        },
        "byDay": {
          "2026-11-06": {
            "per": 57224.6,
            "offer": "Elite 4 Star Orb Offer"
          },
          "2026-11-15": {
            "per": 57224.6,
            "offer": "Elite 4 Star Orb Offer"
          }
        },
        "bestCore": {
          "per": 8000,
          "day": "2026-11-06",
          "offer": "Elite 4 Star Orb Offer"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 8000,
            "offer": "Elite 4 Star Orb Offer"
          },
          "2026-11-15": {
            "per": 8000,
            "offer": "Elite 4 Star Orb Offer"
          }
        }
      },
      "coreValue": 0.125
    },
    "elite_5_credit": {
      "name": "Elite 5 Credit",
      "category": "currency",
      "per": 1,
      "aliases": [],
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "orb:hidden_jungle": {
      "name": "Hidden Jungle Orb Fragments",
      "category": "orb",
      "per": 1,
      "aliases": [],
      "value": 0.012495,
      "id": "GACHA_CRATE_FCO_KAZAR_20_TOKEN_9693b14a",
      "observed": {
        "basis": "own",
        "perCash": 80.032,
        "perCore": 10,
        "days": [
          "2026-11-06",
          "2026-11-14"
        ],
        "offers": 3,
        "firstSeen": false,
        "best": {
          "per": 80.032,
          "day": "2026-11-06",
          "offer": "Hidden Jungle Orb"
        },
        "byDay": {
          "2026-11-06": {
            "per": 80.032,
            "offer": "Hidden Jungle Orb"
          },
          "2026-11-14": {
            "per": 80.032,
            "offer": "Hidden Jungle Orb"
          },
          "2026-11-15": {
            "per": 80.032,
            "offer": "Hidden Jungle Orb"
          }
        },
        "bestCore": {
          "per": 10,
          "day": "2026-11-06",
          "offer": "Hidden Jungle Orb"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 10,
            "offer": "Hidden Jungle Orb"
          },
          "2026-11-14": {
            "per": 10,
            "offer": "Hidden Jungle Orb"
          },
          "2026-11-15": {
            "per": 10,
            "offer": "Hidden Jungle Orb"
          }
        }
      },
      "coreValue": 0.1
    },
    "shard:ka zar": {
      "name": "Ka-Zar shards",
      "category": "shard",
      "per": 1,
      "aliases": [],
      "character": "Ka-Zar",
      "value": 0.4165,
      "id": "SHARD_KAZAR",
      "observed": {
        "basis": "own",
        "perCash": 2.40096,
        "perCore": 0.3,
        "days": [
          "2026-11-06"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 2.40096,
          "day": "2026-11-06",
          "offer": "Cyber Breach: Ka-Zar"
        },
        "byDay": {
          "2026-11-06": {
            "per": 2.40096,
            "offer": "Cyber Breach: Ka-Zar"
          }
        },
        "bestCore": {
          "per": 0.3,
          "day": "2026-11-06",
          "offer": "Cyber Breach: Ka-Zar"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 0.3,
            "offer": "Cyber Breach: Ka-Zar"
          }
        }
      },
      "coreValue": 3.33333
    },
    "orb:lock_on": {
      "name": "Lock-On Orb Fragments",
      "category": "orb",
      "per": 1,
      "aliases": [],
      "value": 0.0124975,
      "observed": {
        "basis": "set",
        "perCash": 80.016,
        "perCore": 10,
        "days": [
          "2026-11-06"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 80.016,
          "day": "2026-11-06",
          "offer": "Lock-On Orb"
        },
        "byDay": {
          "2026-11-06": {
            "per": 80.016,
            "offer": "Lock-On Orb"
          }
        },
        "bestCore": {
          "per": 10,
          "day": "2026-11-06",
          "offer": "Lock-On Orb"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 10,
            "offer": "Lock-On Orb"
          }
        }
      },
      "coreValue": 0.1
    },
    "orb:mega_lock_on": {
      "name": "MEGA Lock-On Orb Fragments",
      "category": "orb",
      "per": 1,
      "aliases": [],
      "value": 0.064995,
      "observed": {
        "basis": "own",
        "perCash": 15.3858,
        "perCore": 2,
        "days": [
          "2026-11-06"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 15.3858,
          "day": "2026-11-06",
          "offer": "MEGA Lock-On Orb"
        },
        "byDay": {
          "2026-11-06": {
            "per": 15.3858,
            "offer": "MEGA Lock-On Orb"
          }
        },
        "bestCore": {
          "per": 2,
          "day": "2026-11-06",
          "offer": "MEGA Lock-On Orb"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 2,
            "offer": "MEGA Lock-On Orb"
          }
        }
      },
      "coreValue": 0.5
    },
    "ability_material:magneto_(phoenix_force)_basic_awakened": {
      "name": "Magneto (Phoenix Force)'s Basic Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "aliases": [],
      "character": "Magneto (Phoenix Force)",
      "value": 0.12495,
      "observed": {
        "basis": "own",
        "perCash": 8.0032,
        "perCore": 1,
        "days": [
          "2026-11-06"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 8.0032,
          "day": "2026-11-06",
          "offer": "Awakened Thermo-Magnetic Force"
        },
        "byDay": {
          "2026-11-06": {
            "per": 8.0032,
            "offer": "Awakened Thermo-Magnetic Force"
          }
        },
        "bestCore": {
          "per": 1,
          "day": "2026-11-06",
          "offer": "Awakened Thermo-Magnetic Force"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 1,
            "offer": "Awakened Thermo-Magnetic Force"
          }
        }
      },
      "coreValue": 1
    },
    "ability_material:magneto_(phoenix_force)_special_awakened": {
      "name": "Magneto (Phoenix Force)'s Special Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "aliases": [],
      "character": "Magneto (Phoenix Force)",
      "value": 0.12495,
      "observed": {
        "basis": "own",
        "perCash": 8.0032,
        "perCore": 1,
        "days": [
          "2026-11-06"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 8.0032,
          "day": "2026-11-06",
          "offer": "Awakened Magnetized Sentinel"
        },
        "byDay": {
          "2026-11-06": {
            "per": 8.0032,
            "offer": "Awakened Magnetized Sentinel"
          }
        },
        "bestCore": {
          "per": 1,
          "day": "2026-11-06",
          "offer": "Awakened Magnetized Sentinel"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 1,
            "offer": "Awakened Magnetized Sentinel"
          }
        }
      },
      "coreValue": 1
    },
    "ability_material:magneto_(phoenix_force)_ultimate_awakened": {
      "name": "Magneto (Phoenix Force)'s Ultimate Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "aliases": [],
      "character": "Magneto (Phoenix Force)",
      "value": 0.12495,
      "observed": {
        "basis": "own",
        "perCash": 8.0032,
        "perCore": 1,
        "days": [
          "2026-11-06"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 8.0032,
          "day": "2026-11-06",
          "offer": "Awakened Phoenix Polarity"
        },
        "byDay": {
          "2026-11-06": {
            "per": 8.0032,
            "offer": "Awakened Phoenix Polarity"
          }
        },
        "bestCore": {
          "per": 1,
          "day": "2026-11-06",
          "offer": "Awakened Phoenix Polarity"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 1,
            "offer": "Awakened Phoenix Polarity"
          }
        }
      },
      "coreValue": 1
    },
    "ability_material:omega_red_(phoenix_force)_basic_awakened": {
      "name": "Omega Red (Phoenix Force)'s Basic Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "aliases": [],
      "character": "Omega Red (Phoenix Force)",
      "value": 0.0649498,
      "observed": {
        "basis": "own",
        "perCash": 15.3965,
        "perCore": 2,
        "days": [
          "2026-11-06"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 15.3965,
          "day": "2026-11-06",
          "offer": "Awakened Carbonadium Fire"
        },
        "byDay": {
          "2026-11-06": {
            "per": 15.3965,
            "offer": "Awakened Carbonadium Fire"
          }
        },
        "bestCore": {
          "per": 2,
          "day": "2026-11-06",
          "offer": "Awakened Carbonadium Fire"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 2,
            "offer": "Awakened Carbonadium Fire"
          }
        }
      },
      "coreValue": 0.5
    },
    "ability_material:omega_red_(phoenix_force)_passive_awakened": {
      "name": "Omega Red (Phoenix Force)'s Passive Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "aliases": [],
      "character": "Omega Red (Phoenix Force)",
      "value": 0.0649498,
      "observed": {
        "basis": "own",
        "perCash": 15.3965,
        "perCore": 2,
        "days": [
          "2026-11-06"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 15.3965,
          "day": "2026-11-06",
          "offer": "Awakened Death Incarnate"
        },
        "byDay": {
          "2026-11-06": {
            "per": 15.3965,
            "offer": "Awakened Death Incarnate"
          }
        },
        "bestCore": {
          "per": 2,
          "day": "2026-11-06",
          "offer": "Awakened Death Incarnate"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 2,
            "offer": "Awakened Death Incarnate"
          }
        }
      },
      "coreValue": 0.5
    },
    "ability_material:phoenix_passive_awakened": {
      "name": "Phoenix's Passive Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "aliases": [],
      "character": "Phoenix",
      "value": 0.0649498,
      "observed": {
        "basis": "own",
        "perCash": 15.3965,
        "perCore": 2,
        "days": [
          "2026-11-06"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 15.3965,
          "day": "2026-11-06",
          "offer": "Awakened Phoenix Rising"
        },
        "byDay": {
          "2026-11-06": {
            "per": 15.3965,
            "offer": "Awakened Phoenix Rising"
          }
        },
        "bestCore": {
          "per": 2,
          "day": "2026-11-06",
          "offer": "Awakened Phoenix Rising"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 2,
            "offer": "Awakened Phoenix Rising"
          }
        }
      },
      "coreValue": 0.5
    },
    "ability_material:phoenix_ultimate_awakened": {
      "name": "Phoenix's Ultimate Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "aliases": [],
      "character": "Phoenix",
      "value": 0.0649498,
      "observed": {
        "basis": "own",
        "perCash": 15.3965,
        "perCore": 2,
        "days": [
          "2026-11-06"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 15.3965,
          "day": "2026-11-06",
          "offer": "Awakened Phoenix Force"
        },
        "byDay": {
          "2026-11-06": {
            "per": 15.3965,
            "offer": "Awakened Phoenix Force"
          }
        },
        "bestCore": {
          "per": 2,
          "day": "2026-11-06",
          "offer": "Awakened Phoenix Force"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 2,
            "offer": "Awakened Phoenix Force"
          }
        }
      },
      "coreValue": 0.5
    },
    "strike_tokens": {
      "name": "S.T.R.I.K.E. Tokens",
      "category": "currency",
      "per": 1,
      "aliases": [],
      "value": 1.2495,
      "observed": {
        "basis": "own",
        "perCash": 0.80032,
        "perCore": 0.1,
        "days": [
          "2026-11-06"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 0.80032,
          "day": "2026-11-06",
          "offer": "S.T.R.I.K.E Pass Catch-Up!"
        },
        "byDay": {
          "2026-11-06": {
            "per": 0.80032,
            "offer": "S.T.R.I.K.E Pass Catch-Up!"
          }
        },
        "bestCore": {
          "per": 0.1,
          "day": "2026-11-06",
          "offer": "S.T.R.I.K.E Pass Catch-Up!"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 0.1,
            "offer": "S.T.R.I.K.E Pass Catch-Up!"
          }
        }
      },
      "coreValue": 10
    },
    "ability_material:scorpion_(breaker)_basic_awakened": {
      "name": "Scorpion (Breaker)'s Basic Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "aliases": [],
      "character": "Scorpion (Breaker)",
      "value": 0.12495,
      "observed": {
        "basis": "own",
        "perCash": 8.0032,
        "perCore": 1,
        "days": [
          "2026-11-06"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 8.0032,
          "day": "2026-11-06",
          "offer": "Scorpion (Breaker) Basic Awakened"
        },
        "byDay": {
          "2026-11-06": {
            "per": 8.0032,
            "offer": "Scorpion (Breaker) Basic Awakened"
          }
        },
        "bestCore": {
          "per": 1,
          "day": "2026-11-06",
          "offer": "Scorpion (Breaker) Basic Awakened"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 1,
            "offer": "Scorpion (Breaker) Basic Awakened"
          }
        }
      },
      "coreValue": 1
    },
    "ability_material:scorpion_(breaker)_passive_awakened": {
      "name": "Scorpion (Breaker)'s Passive Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "aliases": [],
      "character": "Scorpion (Breaker)",
      "value": 0.12495,
      "observed": {
        "basis": "own",
        "perCash": 8.0032,
        "perCore": 1,
        "days": [
          "2026-11-06"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 8.0032,
          "day": "2026-11-06",
          "offer": "Scorpion (Breaker) Passive Awakened"
        },
        "byDay": {
          "2026-11-06": {
            "per": 8.0032,
            "offer": "Scorpion (Breaker) Passive Awakened"
          }
        },
        "bestCore": {
          "per": 1,
          "day": "2026-11-06",
          "offer": "Scorpion (Breaker) Passive Awakened"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 1,
            "offer": "Scorpion (Breaker) Passive Awakened"
          }
        }
      },
      "coreValue": 1
    },
    "ability_material:scorpion_(breaker)_special_awakened": {
      "name": "Scorpion (Breaker)'s Special Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "aliases": [],
      "character": "Scorpion (Breaker)",
      "value": 0.12495,
      "observed": {
        "basis": "own",
        "perCash": 8.0032,
        "perCore": 1,
        "days": [
          "2026-11-06"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 8.0032,
          "day": "2026-11-06",
          "offer": "Scorpion (Breaker) Special Awakened"
        },
        "byDay": {
          "2026-11-06": {
            "per": 8.0032,
            "offer": "Scorpion (Breaker) Special Awakened"
          }
        },
        "bestCore": {
          "per": 1,
          "day": "2026-11-06",
          "offer": "Scorpion (Breaker) Special Awakened"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 1,
            "offer": "Scorpion (Breaker) Special Awakened"
          }
        }
      },
      "coreValue": 1
    },
    "ability_material:scorpion_(breaker)_ultimate_awakened": {
      "name": "Scorpion (Breaker)'s Ultimate Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "aliases": [],
      "character": "Scorpion (Breaker)",
      "value": 0.12495,
      "observed": {
        "basis": "own",
        "perCash": 8.0032,
        "perCore": 1,
        "days": [
          "2026-11-06"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 8.0032,
          "day": "2026-11-06",
          "offer": "Scorpion (Breaker) Ultimate Awakened"
        },
        "byDay": {
          "2026-11-06": {
            "per": 8.0032,
            "offer": "Scorpion (Breaker) Ultimate Awakened"
          }
        },
        "bestCore": {
          "per": 1,
          "day": "2026-11-06",
          "offer": "Scorpion (Breaker) Ultimate Awakened"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 1,
            "offer": "Scorpion (Breaker) Ultimate Awakened"
          }
        }
      },
      "coreValue": 1
    },
    "ability_material:silver_surfer_(breaker)_basic_awakened": {
      "name": "Silver Surfer (Breaker)'s Basic Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "aliases": [],
      "character": "Silver Surfer (Breaker)",
      "value": 0.12495,
      "observed": {
        "basis": "own",
        "perCash": 8.0032,
        "perCore": 1,
        "days": [
          "2026-11-06"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 8.0032,
          "day": "2026-11-06",
          "offer": "Silver Surfer (Breaker) Basic Awakened"
        },
        "byDay": {
          "2026-11-06": {
            "per": 8.0032,
            "offer": "Silver Surfer (Breaker) Basic Awakened"
          }
        },
        "bestCore": {
          "per": 1,
          "day": "2026-11-06",
          "offer": "Silver Surfer (Breaker) Basic Awakened"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 1,
            "offer": "Silver Surfer (Breaker) Basic Awakened"
          }
        }
      },
      "coreValue": 1
    },
    "ability_material:silver_surfer_(breaker)_passive_awakened": {
      "name": "Silver Surfer (Breaker)'s Passive Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "aliases": [],
      "character": "Silver Surfer (Breaker)",
      "value": 0.12495,
      "observed": {
        "basis": "own",
        "perCash": 8.0032,
        "perCore": 1,
        "days": [
          "2026-11-06"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 8.0032,
          "day": "2026-11-06",
          "offer": "Silver Surfer (Breaker) Passive Awakened"
        },
        "byDay": {
          "2026-11-06": {
            "per": 8.0032,
            "offer": "Silver Surfer (Breaker) Passive Awakened"
          }
        },
        "bestCore": {
          "per": 1,
          "day": "2026-11-06",
          "offer": "Silver Surfer (Breaker) Passive Awakened"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 1,
            "offer": "Silver Surfer (Breaker) Passive Awakened"
          }
        }
      },
      "coreValue": 1
    },
    "ability_material:silver_surfer_(breaker)_special_awakened": {
      "name": "Silver Surfer (Breaker)'s Special Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "aliases": [],
      "character": "Silver Surfer (Breaker)",
      "value": 0.12495,
      "observed": {
        "basis": "own",
        "perCash": 8.0032,
        "perCore": 1,
        "days": [
          "2026-11-06"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 8.0032,
          "day": "2026-11-06",
          "offer": "Silver Surfer (Breaker) Special Awakened"
        },
        "byDay": {
          "2026-11-06": {
            "per": 8.0032,
            "offer": "Silver Surfer (Breaker) Special Awakened"
          }
        },
        "bestCore": {
          "per": 1,
          "day": "2026-11-06",
          "offer": "Silver Surfer (Breaker) Special Awakened"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 1,
            "offer": "Silver Surfer (Breaker) Special Awakened"
          }
        }
      },
      "coreValue": 1
    },
    "ability_material:silver_surfer_(breaker)_ultimate_awakened": {
      "name": "Silver Surfer (Breaker)'s Ultimate Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "aliases": [],
      "character": "Silver Surfer (Breaker)",
      "value": 0.12495,
      "observed": {
        "basis": "own",
        "perCash": 8.0032,
        "perCore": 1,
        "days": [
          "2026-11-06"
        ],
        "offers": 1,
        "firstSeen": false,
        "best": {
          "per": 8.0032,
          "day": "2026-11-06",
          "offer": "Silver Surfer (Breaker) Ultimate Awakened"
        },
        "byDay": {
          "2026-11-06": {
            "per": 8.0032,
            "offer": "Silver Surfer (Breaker) Ultimate Awakened"
          }
        },
        "bestCore": {
          "per": 1,
          "day": "2026-11-06",
          "offer": "Silver Surfer (Breaker) Ultimate Awakened"
        },
        "coreByDay": {
          "2026-11-06": {
            "per": 1,
            "offer": "Silver Surfer (Breaker) Ultimate Awakened"
          }
        }
      },
      "coreValue": 1
    },
    "gear:superior_arcane_powder": {
      "name": "Superior Arcane Powder",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:superior_esoteric_glyphs": {
      "name": "Superior Esoteric Glyphs",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:superior_shoggoth_ichor": {
      "name": "Superior Shoggoth Ichor",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:superior_sigil": {
      "name": "Superior Sigil",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:superior_vial": {
      "name": "Superior Vial",
      "category": "gear",
      "per": 1,
      "aliases": [],
      "value": null,
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "points:designed_to_sting": {
      "name": "Designed to Sting Milestone Points",
      "category": "points",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "EVTA_META_SEP_O",
      "excludeFromValue": true,
      "note": "event or loyalty points: not counted"
    },
    "points:founding_force": {
      "name": "Founding Force Milestone Points",
      "category": "points",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "EVTA_META_SEP_N",
      "excludeFromValue": true,
      "note": "event or loyalty points: not counted"
    },
    "shard:war machine": {
      "name": "War Machine shards",
      "category": "shard",
      "per": 1,
      "value": 0.049975,
      "aliases": [],
      "id": "SHARD_WARMACHINE",
      "character": "War Machine",
      "observed": {
        "basis": "set",
        "perCash": 20.01,
        "perCore": 2.66667,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 20.01,
          "day": "2026-11-14",
          "offer": "Short on West Coast Avenger Shards?"
        },
        "byDay": {
          "2026-11-14": {
            "per": 20.01,
            "offer": "Short on West Coast Avenger Shards?"
          },
          "2026-11-15": {
            "per": 20.01,
            "offer": "Short on West Coast Avenger Shards?"
          }
        },
        "bestCore": {
          "per": 2.66667,
          "day": "2026-11-14",
          "offer": "Short on West Coast Avenger Shards?"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 2.66667,
            "offer": "Short on West Coast Avenger Shards?"
          },
          "2026-11-15": {
            "per": 2.66667,
            "offer": "Short on West Coast Avenger Shards?"
          }
        }
      },
      "coreValue": 0.375
    },
    "shard:tigra": {
      "name": "Tigra shards",
      "category": "shard",
      "per": 1,
      "value": 0.049975,
      "aliases": [],
      "id": "SHARD_TIGRA",
      "character": "Tigra",
      "observed": {
        "basis": "set",
        "perCash": 20.01,
        "perCore": 2.66667,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 20.01,
          "day": "2026-11-14",
          "offer": "Short on West Coast Avenger Shards?"
        },
        "byDay": {
          "2026-11-14": {
            "per": 20.01,
            "offer": "Short on West Coast Avenger Shards?"
          },
          "2026-11-15": {
            "per": 20.01,
            "offer": "Short on West Coast Avenger Shards?"
          }
        },
        "bestCore": {
          "per": 2.66667,
          "day": "2026-11-14",
          "offer": "Short on West Coast Avenger Shards?"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 2.66667,
            "offer": "Short on West Coast Avenger Shards?"
          },
          "2026-11-15": {
            "per": 2.66667,
            "offer": "Short on West Coast Avenger Shards?"
          }
        }
      },
      "coreValue": 0.375
    },
    "shard:mockingbird": {
      "name": "Mockingbird shards",
      "category": "shard",
      "per": 1,
      "value": 0.049975,
      "aliases": [],
      "id": "SHARD_MOCKINGBIRD",
      "character": "Mockingbird",
      "observed": {
        "basis": "set",
        "perCash": 20.01,
        "perCore": 2.66667,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 20.01,
          "day": "2026-11-14",
          "offer": "Short on West Coast Avenger Shards?"
        },
        "byDay": {
          "2026-11-14": {
            "per": 20.01,
            "offer": "Short on West Coast Avenger Shards?"
          },
          "2026-11-15": {
            "per": 20.01,
            "offer": "Short on West Coast Avenger Shards?"
          }
        },
        "bestCore": {
          "per": 2.66667,
          "day": "2026-11-14",
          "offer": "Short on West Coast Avenger Shards?"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 2.66667,
            "offer": "Short on West Coast Avenger Shards?"
          },
          "2026-11-15": {
            "per": 2.66667,
            "offer": "Short on West Coast Avenger Shards?"
          }
        }
      },
      "coreValue": 0.375
    },
    "shard:hawkeye": {
      "name": "Hawkeye shards",
      "category": "shard",
      "per": 1,
      "value": 0.049975,
      "aliases": [],
      "id": "SHARD_HAWKEYE",
      "character": "Hawkeye",
      "observed": {
        "basis": "set",
        "perCash": 20.01,
        "perCore": 2.66667,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 20.01,
          "day": "2026-11-14",
          "offer": "Short on West Coast Avenger Shards?"
        },
        "byDay": {
          "2026-11-14": {
            "per": 20.01,
            "offer": "Short on West Coast Avenger Shards?"
          },
          "2026-11-15": {
            "per": 20.01,
            "offer": "Short on West Coast Avenger Shards?"
          }
        },
        "bestCore": {
          "per": 2.66667,
          "day": "2026-11-14",
          "offer": "Short on West Coast Avenger Shards?"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 2.66667,
            "offer": "Short on West Coast Avenger Shards?"
          },
          "2026-11-15": {
            "per": 2.66667,
            "offer": "Short on West Coast Avenger Shards?"
          }
        }
      },
      "coreValue": 0.375
    },
    "shard:cyclops (mighty)": {
      "name": "Cyclops (Mighty) shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "SHARD_CYCLOPSMIGHTY",
      "character": "Cyclops (Mighty)",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:cyclops_(mighty)_—_4_red_star_promotion": {
      "name": "Cyclops (Mighty) — 4 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "RS_CYCLOPSMIGHTY_4",
      "character": "Cyclops (Mighty)",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "orb:basic_t4_iso-8": {
      "name": "Basic T4 Iso-8 Orb Fragments",
      "category": "orb",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "GACHA_CRATE_ISO8_T4_BASIC_TOKEN_2c51c796",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:cyclops_(mighty)_—_5_red_star_promotion": {
      "name": "Cyclops (Mighty) — 5 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "RS_CYCLOPSMIGHTY_5",
      "character": "Cyclops (Mighty)",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:cyclops_(mighty)_—_6_red_star_promotion": {
      "name": "Cyclops (Mighty) — 6 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "RS_CYCLOPSMIGHTY_6",
      "character": "Cyclops (Mighty)",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:cyclops_(mighty)_—_7_red_star_promotion": {
      "name": "Cyclops (Mighty) — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "RS_CYCLOPSMIGHTY_7",
      "character": "Cyclops (Mighty)",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:cyclops_(mighty)_—_1_diamond_promotion": {
      "name": "Cyclops (Mighty) — 1 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "PD_CYCLOPSMIGHTY_1",
      "character": "Cyclops (Mighty)",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "orb:full_aperture": {
      "name": "Full Aperture Orb Fragments",
      "category": "orb",
      "per": 1,
      "value": 0.064995,
      "aliases": [],
      "id": "GACHA_CRATE_CYCLOPSMIGHTY_MEGA_TOKEN_aecdb726",
      "observed": {
        "basis": "own",
        "perCash": 15.3858,
        "perCore": 2,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 15.3858,
          "day": "2026-11-14",
          "offer": "Full Aperture"
        },
        "byDay": {
          "2026-11-14": {
            "per": 15.3858,
            "offer": "Full Aperture"
          },
          "2026-11-15": {
            "per": 15.3858,
            "offer": "Full Aperture"
          }
        },
        "bestCore": {
          "per": 2,
          "day": "2026-11-14",
          "offer": "Full Aperture"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 2,
            "offer": "Full Aperture"
          },
          "2026-11-15": {
            "per": 2,
            "offer": "Full Aperture"
          }
        }
      },
      "coreValue": 0.5
    },
    "orb:visor_unleashed": {
      "name": "Visor Unleashed Orb Fragments",
      "category": "orb",
      "per": 1,
      "value": 0.024995,
      "aliases": [],
      "id": "GACHA_CRATE_FCO_CYCLOPSMIGHTY_30_TOKEN_985ee30d",
      "observed": {
        "basis": "own",
        "perCash": 40.008,
        "perCore": 5,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 40.008,
          "day": "2026-11-14",
          "offer": "Visor Unleashed"
        },
        "byDay": {
          "2026-11-14": {
            "per": 40.008,
            "offer": "Visor Unleashed"
          },
          "2026-11-15": {
            "per": 40.008,
            "offer": "Visor Unleashed"
          }
        },
        "bestCore": {
          "per": 5,
          "day": "2026-11-14",
          "offer": "Visor Unleashed"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 5,
            "offer": "Visor Unleashed"
          },
          "2026-11-15": {
            "per": 5,
            "offer": "Visor Unleashed"
          }
        }
      },
      "coreValue": 0.2
    },
    "promotion:ka-zar_—_4_red_star_promotion": {
      "name": "Ka-Zar — 4 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "RS_KAZAR_4",
      "character": "Ka-Zar",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:ka-zar_—_5_red_star_promotion": {
      "name": "Ka-Zar — 5 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "RS_KAZAR_5",
      "character": "Ka-Zar",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:ka-zar_—_6_red_star_promotion": {
      "name": "Ka-Zar — 6 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "RS_KAZAR_6",
      "character": "Ka-Zar",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:ka-zar_—_7_red_star_promotion": {
      "name": "Ka-Zar — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "RS_KAZAR_7",
      "character": "Ka-Zar",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:ka-zar_—_1_diamond_promotion": {
      "name": "Ka-Zar — 1 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "PD_KAZAR_1",
      "character": "Ka-Zar",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "ability_material:jeff_the_land_shark's_basic_awakened": {
      "name": "Jeff the Land Shark's Basic Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "value": 0.12495,
      "aliases": [],
      "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_JEFFTHELANDSHARK_BASIC",
      "character": "Jeff the Land Shark",
      "observed": {
        "basis": "own",
        "perCash": 8.0032,
        "perCore": 1,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 8.0032,
          "day": "2026-11-14",
          "offer": "Awakened Just A Taste"
        },
        "byDay": {
          "2026-11-14": {
            "per": 8.0032,
            "offer": "Awakened Just A Taste"
          },
          "2026-11-15": {
            "per": 8.0032,
            "offer": "Awakened Just A Taste"
          }
        },
        "bestCore": {
          "per": 1,
          "day": "2026-11-14",
          "offer": "Awakened Just A Taste"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 1,
            "offer": "Awakened Just A Taste"
          },
          "2026-11-15": {
            "per": 1,
            "offer": "Awakened Just A Taste"
          }
        }
      },
      "coreValue": 1
    },
    "ability_material:jeff_the_land_shark's_special_awakened": {
      "name": "Jeff the Land Shark's Special Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "value": 0.12495,
      "aliases": [],
      "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_JEFFTHELANDSHARK_SPECIAL",
      "character": "Jeff the Land Shark",
      "observed": {
        "basis": "own",
        "perCash": 8.0032,
        "perCore": 1,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 8.0032,
          "day": "2026-11-14",
          "offer": "Awakened Sharknado"
        },
        "byDay": {
          "2026-11-14": {
            "per": 8.0032,
            "offer": "Awakened Sharknado"
          },
          "2026-11-15": {
            "per": 8.0032,
            "offer": "Awakened Sharknado"
          }
        },
        "bestCore": {
          "per": 1,
          "day": "2026-11-14",
          "offer": "Awakened Sharknado"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 1,
            "offer": "Awakened Sharknado"
          },
          "2026-11-15": {
            "per": 1,
            "offer": "Awakened Sharknado"
          }
        }
      },
      "coreValue": 1
    },
    "ability_material:jeff_the_land_shark's_ultimate_awakened": {
      "name": "Jeff the Land Shark's Ultimate Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "value": 0.12495,
      "aliases": [],
      "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_JEFFTHELANDSHARK_ULTIMATE",
      "character": "Jeff the Land Shark",
      "observed": {
        "basis": "own",
        "perCash": 8.0032,
        "perCore": 1,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 8.0032,
          "day": "2026-11-14",
          "offer": "Awakened Deep Dive"
        },
        "byDay": {
          "2026-11-14": {
            "per": 8.0032,
            "offer": "Awakened Deep Dive"
          },
          "2026-11-15": {
            "per": 8.0032,
            "offer": "Awakened Deep Dive"
          }
        },
        "bestCore": {
          "per": 1,
          "day": "2026-11-14",
          "offer": "Awakened Deep Dive"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 1,
            "offer": "Awakened Deep Dive"
          },
          "2026-11-15": {
            "per": 1,
            "offer": "Awakened Deep Dive"
          }
        }
      },
      "coreValue": 1
    },
    "ability_material:jeff_the_land_shark's_passive_awakened": {
      "name": "Jeff the Land Shark's Passive Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "value": 0.12495,
      "aliases": [],
      "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_JEFFTHELANDSHARK_PASSIVE",
      "character": "Jeff the Land Shark",
      "observed": {
        "basis": "own",
        "perCash": 8.0032,
        "perCore": 1,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 8.0032,
          "day": "2026-11-14",
          "offer": "Awakened Cute Carcharodon"
        },
        "byDay": {
          "2026-11-14": {
            "per": 8.0032,
            "offer": "Awakened Cute Carcharodon"
          },
          "2026-11-15": {
            "per": 8.0032,
            "offer": "Awakened Cute Carcharodon"
          }
        },
        "bestCore": {
          "per": 1,
          "day": "2026-11-14",
          "offer": "Awakened Cute Carcharodon"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 1,
            "offer": "Awakened Cute Carcharodon"
          },
          "2026-11-15": {
            "per": 1,
            "offer": "Awakened Cute Carcharodon"
          }
        }
      },
      "coreValue": 1
    },
    "ability_material:phantom_rider's_passive_awakened": {
      "name": "Phantom Rider's Passive Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "value": 0.0649498,
      "aliases": [],
      "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_PHANTOMRIDER_PASSIVE",
      "character": "Phantom Rider",
      "observed": {
        "basis": "own",
        "perCash": 15.3965,
        "perCore": 2,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 15.3965,
          "day": "2026-11-14",
          "offer": "Awakened Ghostly Gunslinger"
        },
        "byDay": {
          "2026-11-14": {
            "per": 15.3965,
            "offer": "Awakened Ghostly Gunslinger"
          },
          "2026-11-15": {
            "per": 15.3965,
            "offer": "Awakened Ghostly Gunslinger"
          }
        },
        "bestCore": {
          "per": 2,
          "day": "2026-11-14",
          "offer": "Awakened Ghostly Gunslinger"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 2,
            "offer": "Awakened Ghostly Gunslinger"
          },
          "2026-11-15": {
            "per": 2,
            "offer": "Awakened Ghostly Gunslinger"
          }
        }
      },
      "coreValue": 0.5
    },
    "ability_material:quasar's_basic_awakened": {
      "name": "Quasar's Basic Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "value": 0.0649498,
      "aliases": [],
      "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_QUASAR_BASIC",
      "character": "Quasar",
      "observed": {
        "basis": "own",
        "perCash": 15.3965,
        "perCore": 2,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 15.3965,
          "day": "2026-11-14",
          "offer": "Awakened Quantum Blast"
        },
        "byDay": {
          "2026-11-14": {
            "per": 15.3965,
            "offer": "Awakened Quantum Blast"
          },
          "2026-11-15": {
            "per": 15.3965,
            "offer": "Awakened Quantum Blast"
          }
        },
        "bestCore": {
          "per": 2,
          "day": "2026-11-14",
          "offer": "Awakened Quantum Blast"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 2,
            "offer": "Awakened Quantum Blast"
          },
          "2026-11-15": {
            "per": 2,
            "offer": "Awakened Quantum Blast"
          }
        }
      },
      "coreValue": 0.5
    },
    "ability_material:quasar's_ultimate_awakened": {
      "name": "Quasar's Ultimate Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "value": 0.0649498,
      "aliases": [],
      "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_QUASAR_ULTIMATE",
      "character": "Quasar",
      "observed": {
        "basis": "own",
        "perCash": 15.3965,
        "perCore": 2,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 15.3965,
          "day": "2026-11-14",
          "offer": "Awakened Meteor Smackdown"
        },
        "byDay": {
          "2026-11-14": {
            "per": 15.3965,
            "offer": "Awakened Meteor Smackdown"
          },
          "2026-11-15": {
            "per": 15.3965,
            "offer": "Awakened Meteor Smackdown"
          }
        },
        "bestCore": {
          "per": 2,
          "day": "2026-11-14",
          "offer": "Awakened Meteor Smackdown"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 2,
            "offer": "Awakened Meteor Smackdown"
          },
          "2026-11-15": {
            "per": 2,
            "offer": "Awakened Meteor Smackdown"
          }
        }
      },
      "coreValue": 0.5
    },
    "ability_material:quasar's_passive_awakened": {
      "name": "Quasar's Passive Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_QUASAR_PASSIVE",
      "character": "Quasar",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "ability_material:blastaar's_basic_awakened": {
      "name": "Blastaar's Basic Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "value": 0.0649498,
      "aliases": [],
      "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_BLASTAAR_BASIC",
      "character": "Blastaar",
      "observed": {
        "basis": "own",
        "perCash": 15.3965,
        "perCore": 2,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 15.3965,
          "day": "2026-11-14",
          "offer": "Awakened Violent Subjugation"
        },
        "byDay": {
          "2026-11-14": {
            "per": 15.3965,
            "offer": "Awakened Violent Subjugation"
          },
          "2026-11-15": {
            "per": 15.3965,
            "offer": "Awakened Violent Subjugation"
          }
        },
        "bestCore": {
          "per": 2,
          "day": "2026-11-14",
          "offer": "Awakened Violent Subjugation"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 2,
            "offer": "Awakened Violent Subjugation"
          },
          "2026-11-15": {
            "per": 2,
            "offer": "Awakened Violent Subjugation"
          }
        }
      },
      "coreValue": 0.5
    },
    "ability_material:blastaar's_ultimate_awakened": {
      "name": "Blastaar's Ultimate Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "value": 0.0649498,
      "aliases": [],
      "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_BLASTAAR_ULTIMATE",
      "character": "Blastaar",
      "observed": {
        "basis": "own",
        "perCash": 15.3965,
        "perCore": 2,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 15.3965,
          "day": "2026-11-14",
          "offer": "Awakened Sweeping Destruction"
        },
        "byDay": {
          "2026-11-14": {
            "per": 15.3965,
            "offer": "Awakened Sweeping Destruction"
          },
          "2026-11-15": {
            "per": 15.3965,
            "offer": "Awakened Sweeping Destruction"
          }
        },
        "bestCore": {
          "per": 2,
          "day": "2026-11-14",
          "offer": "Awakened Sweeping Destruction"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 2,
            "offer": "Awakened Sweeping Destruction"
          },
          "2026-11-15": {
            "per": 2,
            "offer": "Awakened Sweeping Destruction"
          }
        }
      },
      "coreValue": 0.5
    },
    "ability_material:blastaar's_passive_awakened": {
      "name": "Blastaar's Passive Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "value": 0.0649498,
      "aliases": [],
      "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_BLASTAAR_PASSIVE",
      "character": "Blastaar",
      "observed": {
        "basis": "own",
        "perCash": 15.3965,
        "perCore": 2,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 15.3965,
          "day": "2026-11-14",
          "offer": "Awakened The Living Bomb-Burst"
        },
        "byDay": {
          "2026-11-14": {
            "per": 15.3965,
            "offer": "Awakened The Living Bomb-Burst"
          },
          "2026-11-15": {
            "per": 15.3965,
            "offer": "Awakened The Living Bomb-Burst"
          }
        },
        "bestCore": {
          "per": 2,
          "day": "2026-11-14",
          "offer": "Awakened The Living Bomb-Burst"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 2,
            "offer": "Awakened The Living Bomb-Burst"
          },
          "2026-11-15": {
            "per": 2,
            "offer": "Awakened The Living Bomb-Burst"
          }
        }
      },
      "coreValue": 0.5
    },
    "ability_material:thunderstrike's_basic_awakened": {
      "name": "Thunderstrike's Basic Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "value": 0.0649498,
      "aliases": [],
      "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_THUNDERSTRIKE_BASIC",
      "character": "Thunderstrike",
      "observed": {
        "basis": "own",
        "perCash": 15.3965,
        "perCore": 2,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 15.3965,
          "day": "2026-11-14",
          "offer": "Awakened Thunder Burst"
        },
        "byDay": {
          "2026-11-14": {
            "per": 15.3965,
            "offer": "Awakened Thunder Burst"
          },
          "2026-11-15": {
            "per": 15.3965,
            "offer": "Awakened Thunder Burst"
          }
        },
        "bestCore": {
          "per": 2,
          "day": "2026-11-14",
          "offer": "Awakened Thunder Burst"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 2,
            "offer": "Awakened Thunder Burst"
          },
          "2026-11-15": {
            "per": 2,
            "offer": "Awakened Thunder Burst"
          }
        }
      },
      "coreValue": 0.5
    },
    "ability_material:thunderstrike's_ultimate_awakened": {
      "name": "Thunderstrike's Ultimate Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "value": 0.0649498,
      "aliases": [],
      "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_THUNDERSTRIKE_ULTIMATE",
      "character": "Thunderstrike",
      "observed": {
        "basis": "own",
        "perCash": 15.3965,
        "perCore": 2,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 15.3965,
          "day": "2026-11-14",
          "offer": "Awakened Rolling Thunder"
        },
        "byDay": {
          "2026-11-14": {
            "per": 15.3965,
            "offer": "Awakened Rolling Thunder"
          },
          "2026-11-15": {
            "per": 15.3965,
            "offer": "Awakened Rolling Thunder"
          }
        },
        "bestCore": {
          "per": 2,
          "day": "2026-11-14",
          "offer": "Awakened Rolling Thunder"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 2,
            "offer": "Awakened Rolling Thunder"
          },
          "2026-11-15": {
            "per": 2,
            "offer": "Awakened Rolling Thunder"
          }
        }
      },
      "coreValue": 0.5
    },
    "ability_material:thunderstrike's_passive_awakened": {
      "name": "Thunderstrike's Passive Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "value": 0.0649498,
      "aliases": [],
      "id": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_THUNDERSTRIKE_PASSIVE",
      "character": "Thunderstrike",
      "observed": {
        "basis": "own",
        "perCash": 15.3965,
        "perCore": 2,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 15.3965,
          "day": "2026-11-14",
          "offer": "Awakened Architect of Thunder"
        },
        "byDay": {
          "2026-11-14": {
            "per": 15.3965,
            "offer": "Awakened Architect of Thunder"
          },
          "2026-11-15": {
            "per": 15.3965,
            "offer": "Awakened Architect of Thunder"
          }
        },
        "bestCore": {
          "per": 2,
          "day": "2026-11-14",
          "offer": "Awakened Architect of Thunder"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 2,
            "offer": "Awakened Architect of Thunder"
          },
          "2026-11-15": {
            "per": 2,
            "offer": "Awakened Architect of Thunder"
          }
        }
      },
      "coreValue": 0.5
    },
    "points:cyber_breach": {
      "name": "Cyber Breach Milestone Points",
      "category": "points",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "EVTA_META_NOV_D",
      "excludeFromValue": true,
      "note": "event or loyalty points: not counted"
    },
    "shard:ultron": {
      "name": "Ultron shards",
      "category": "shard",
      "per": 100,
      "value": 0.534568,
      "aliases": [],
      "id": "SHARD_ULTRON",
      "character": "Ultron",
      "observed": {
        "basis": "set",
        "perCash": 187.067,
        "perCore": 24.3,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 187.067,
          "day": "2026-11-14",
          "offer": "Cyber Breach: Ultron"
        },
        "byDay": {
          "2026-11-14": {
            "per": 187.067,
            "offer": "Cyber Breach: Ultron"
          },
          "2026-11-15": {
            "per": 187.067,
            "offer": "Cyber Breach: Ultron"
          }
        },
        "bestCore": {
          "per": 24.3,
          "day": "2026-11-14",
          "offer": "Cyber Breach: Ultron"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 24.3,
            "offer": "Cyber Breach: Ultron"
          },
          "2026-11-15": {
            "per": 24.3,
            "offer": "Cyber Breach: Ultron"
          }
        }
      },
      "coreValue": 4.11523
    },
    "promotion:ultron_—_1_diamond_promotion": {
      "name": "Ultron — 1 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 4.33,
      "aliases": [],
      "id": "PD_ULTRON_1",
      "character": "Ultron",
      "observed": {
        "basis": "set",
        "perCash": 0.230947,
        "perCore": 0.03,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 0.230947,
          "day": "2026-11-14",
          "offer": "Cyber Breach: Ultron"
        },
        "byDay": {
          "2026-11-14": {
            "per": 0.230947,
            "offer": "Cyber Breach: Ultron"
          },
          "2026-11-15": {
            "per": 0.230947,
            "offer": "Cyber Breach: Ultron"
          }
        },
        "bestCore": {
          "per": 0.03,
          "day": "2026-11-14",
          "offer": "Cyber Breach: Ultron"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 0.03,
            "offer": "Cyber Breach: Ultron"
          },
          "2026-11-15": {
            "per": 0.03,
            "offer": "Cyber Breach: Ultron"
          }
        }
      },
      "coreValue": 33.3333
    },
    "promotion:ultron_—_7_red_star_promotion": {
      "name": "Ultron — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": 4.33,
      "aliases": [],
      "id": "RS_ULTRON_7",
      "character": "Ultron",
      "observed": {
        "basis": "set",
        "perCash": 0.230947,
        "perCore": 0.03,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 0.230947,
          "day": "2026-11-14",
          "offer": "Cyber Breach: Ultron"
        },
        "byDay": {
          "2026-11-14": {
            "per": 0.230947,
            "offer": "Cyber Breach: Ultron"
          },
          "2026-11-15": {
            "per": 0.230947,
            "offer": "Cyber Breach: Ultron"
          }
        },
        "bestCore": {
          "per": 0.03,
          "day": "2026-11-14",
          "offer": "Cyber Breach: Ultron"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 0.03,
            "offer": "Cyber Breach: Ultron"
          },
          "2026-11-15": {
            "per": 0.03,
            "offer": "Cyber Breach: Ultron"
          }
        }
      },
      "coreValue": 33.3333
    },
    "shard:vision": {
      "name": "Vision shards",
      "category": "shard",
      "per": 100,
      "value": 0.534568,
      "aliases": [],
      "id": "SHARD_VISION",
      "character": "Vision",
      "observed": {
        "basis": "set",
        "perCash": 187.067,
        "perCore": 24.3,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 187.067,
          "day": "2026-11-14",
          "offer": "Cyber Breach: Vision"
        },
        "byDay": {
          "2026-11-14": {
            "per": 187.067,
            "offer": "Cyber Breach: Vision"
          },
          "2026-11-15": {
            "per": 187.067,
            "offer": "Cyber Breach: Vision"
          }
        },
        "bestCore": {
          "per": 24.3,
          "day": "2026-11-14",
          "offer": "Cyber Breach: Vision"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 24.3,
            "offer": "Cyber Breach: Vision"
          },
          "2026-11-15": {
            "per": 24.3,
            "offer": "Cyber Breach: Vision"
          }
        }
      },
      "coreValue": 4.11523
    },
    "promotion:vision_—_1_diamond_promotion": {
      "name": "Vision — 1 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 4.33,
      "aliases": [],
      "id": "PD_VISION_1",
      "character": "Vision",
      "observed": {
        "basis": "set",
        "perCash": 0.230947,
        "perCore": 0.03,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 0.230947,
          "day": "2026-11-14",
          "offer": "Cyber Breach: Vision"
        },
        "byDay": {
          "2026-11-14": {
            "per": 0.230947,
            "offer": "Cyber Breach: Vision"
          },
          "2026-11-15": {
            "per": 0.230947,
            "offer": "Cyber Breach: Vision"
          }
        },
        "bestCore": {
          "per": 0.03,
          "day": "2026-11-14",
          "offer": "Cyber Breach: Vision"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 0.03,
            "offer": "Cyber Breach: Vision"
          },
          "2026-11-15": {
            "per": 0.03,
            "offer": "Cyber Breach: Vision"
          }
        }
      },
      "coreValue": 33.3333
    },
    "promotion:vision_—_7_red_star_promotion": {
      "name": "Vision — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": 4.33,
      "aliases": [],
      "id": "RS_VISION_7",
      "character": "Vision",
      "observed": {
        "basis": "set",
        "perCash": 0.230947,
        "perCore": 0.03,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 0.230947,
          "day": "2026-11-14",
          "offer": "Cyber Breach: Vision"
        },
        "byDay": {
          "2026-11-14": {
            "per": 0.230947,
            "offer": "Cyber Breach: Vision"
          },
          "2026-11-15": {
            "per": 0.230947,
            "offer": "Cyber Breach: Vision"
          }
        },
        "bestCore": {
          "per": 0.03,
          "day": "2026-11-14",
          "offer": "Cyber Breach: Vision"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 0.03,
            "offer": "Cyber Breach: Vision"
          },
          "2026-11-15": {
            "per": 0.03,
            "offer": "Cyber Breach: Vision"
          }
        }
      },
      "coreValue": 33.3333
    },
    "promotion:ultron_—_2_diamond_promotion": {
      "name": "Ultron — 2 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "PD_ULTRON_2",
      "character": "Ultron",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:vision_—_2_diamond_promotion": {
      "name": "Vision — 2 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "PD_VISION_2",
      "character": "Vision",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:yellowjacket_—_2_diamond_promotion": {
      "name": "Yellowjacket — 2 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "PD_YELLOWJACKET_2",
      "character": "Yellowjacket",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:crossbones_—_2_diamond_promotion": {
      "name": "Crossbones — 2 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "PD_CROSSBONES_2",
      "character": "Crossbones",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:yellowjacket_—_7_red_star_promotion": {
      "name": "Yellowjacket — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "RS_YELLOWJACKET_7",
      "character": "Yellowjacket",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:crossbones_—_7_red_star_promotion": {
      "name": "Crossbones — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "RS_CROSSBONES_7",
      "character": "Crossbones",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:crimson_charged_particles": {
      "name": "Crimson Charged Particles",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "GEAR_RED_TECH_MAT_C3",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:crimson_confidential_dossiers": {
      "name": "Crimson Confidential Dossiers",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "GEAR_RED_SKILL_MAT_C3",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "shard:hawkeye (robot)": {
      "name": "Hawkeye (Robot) shards",
      "category": "shard",
      "per": 1,
      "value": 0.699898,
      "aliases": [],
      "id": "SHARD_HAWKEYEROBOT",
      "character": "Hawkeye (Robot)",
      "observed": {
        "basis": "own",
        "perCash": 1.42878,
        "perCore": 0.2,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 1.42878,
          "day": "2026-11-14",
          "offer": "Cyber Breach: Hawkeye (Robot)"
        },
        "byDay": {
          "2026-11-14": {
            "per": 1.42878,
            "offer": "Cyber Breach: Hawkeye (Robot)"
          },
          "2026-11-15": {
            "per": 1.42878,
            "offer": "Cyber Breach: Hawkeye (Robot)"
          }
        },
        "bestCore": {
          "per": 0.2,
          "day": "2026-11-14",
          "offer": "Cyber Breach: Hawkeye (Robot)"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 0.2,
            "offer": "Cyber Breach: Hawkeye (Robot)"
          },
          "2026-11-15": {
            "per": 0.2,
            "offer": "Cyber Breach: Hawkeye (Robot)"
          }
        }
      },
      "coreValue": 5
    },
    "shard:human torch (jim)": {
      "name": "Human Torch (Jim) shards",
      "category": "shard",
      "per": 1,
      "value": 0.699898,
      "aliases": [],
      "id": "SHARD_HUMANTORCHJIM",
      "character": "Human Torch (Jim)",
      "observed": {
        "basis": "own",
        "perCash": 1.42878,
        "perCore": 0.2,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 1.42878,
          "day": "2026-11-14",
          "offer": "Cyber Breach: Human Torch (Jim)"
        },
        "byDay": {
          "2026-11-14": {
            "per": 1.42878,
            "offer": "Cyber Breach: Human Torch (Jim)"
          },
          "2026-11-15": {
            "per": 1.42878,
            "offer": "Cyber Breach: Human Torch (Jim)"
          }
        },
        "bestCore": {
          "per": 0.2,
          "day": "2026-11-14",
          "offer": "Cyber Breach: Human Torch (Jim)"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 0.2,
            "offer": "Cyber Breach: Human Torch (Jim)"
          },
          "2026-11-15": {
            "per": 0.2,
            "offer": "Cyber Breach: Human Torch (Jim)"
          }
        }
      },
      "coreValue": 5
    },
    "promotion:jocasta_—_2_diamond_promotion": {
      "name": "Jocasta — 2 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "PD_JOCASTA_2",
      "character": "Jocasta",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:hawkeye_(robot)_—_2_diamond_promotion": {
      "name": "Hawkeye (Robot) — 2 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "PD_HAWKEYEROBOT_2",
      "character": "Hawkeye (Robot)",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:hawkeye_(robot)_—_7_red_star_promotion": {
      "name": "Hawkeye (Robot) — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "RS_HAWKEYEROBOT_7",
      "character": "Hawkeye (Robot)",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:human_torch_(jim)_—_2_diamond_promotion": {
      "name": "Human Torch (Jim) — 2 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "PD_HUMANTORCHJIM_2",
      "character": "Human Torch (Jim)",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:human_torch_(jim)_—_7_red_star_promotion": {
      "name": "Human Torch (Jim) — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "RS_HUMANTORCHJIM_7",
      "character": "Human Torch (Jim)",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:whiplash_—_2_diamond_promotion": {
      "name": "Whiplash — 2 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "PD_WHIPLASH_2",
      "character": "Whiplash",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:whiplash_—_7_red_star_promotion": {
      "name": "Whiplash — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "RS_WHIPLASH_7",
      "character": "Whiplash",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:ulysses_klaue_—_2_diamond_promotion": {
      "name": "Ulysses Klaue — 2 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "PD_ULYSSESKLAUE_2",
      "character": "Ulysses Klaue",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:ulysses_klaue_—_7_red_star_promotion": {
      "name": "Ulysses Klaue — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "RS_ULYSSESKLAUE_7",
      "character": "Ulysses Klaue",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:iron_monger_—_2_diamond_promotion": {
      "name": "Iron Monger — 2 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "PD_IRONMONGER_2",
      "character": "Iron Monger",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:iron_monger_—_7_red_star_promotion": {
      "name": "Iron Monger — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "RS_IRONMONGER_7",
      "character": "Iron Monger",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "promotion:jocasta_—_3_diamond_promotion": {
      "name": "Jocasta — 3 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 129.99,
      "aliases": [],
      "id": "PD_JOCASTA_3",
      "character": "Jocasta",
      "observed": {
        "basis": "own",
        "perCash": 0.0076929,
        "perCore": 0.001,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 0.0076929,
          "day": "2026-11-14",
          "offer": "Cyber Breach: Jocasta 3-Diamond"
        },
        "byDay": {
          "2026-11-14": {
            "per": 0.0076929,
            "offer": "Cyber Breach: Jocasta 3-Diamond"
          },
          "2026-11-15": {
            "per": 0.0076929,
            "offer": "Cyber Breach: Jocasta 3-Diamond"
          }
        },
        "bestCore": {
          "per": 0.001,
          "day": "2026-11-14",
          "offer": "Cyber Breach: Jocasta 3-Diamond"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 0.001,
            "offer": "Cyber Breach: Jocasta 3-Diamond"
          },
          "2026-11-15": {
            "per": 0.001,
            "offer": "Cyber Breach: Jocasta 3-Diamond"
          }
        }
      },
      "coreValue": 1000
    },
    "promotion:hawkeye_(robot)_—_3_diamond_promotion": {
      "name": "Hawkeye (Robot) — 3 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 129.99,
      "aliases": [],
      "id": "PD_HAWKEYEROBOT_3",
      "character": "Hawkeye (Robot)",
      "observed": {
        "basis": "own",
        "perCash": 0.0076929,
        "perCore": 0.001,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 0.0076929,
          "day": "2026-11-14",
          "offer": "Cyber Breach: Hawkeye (Robot) 3-Diamond"
        },
        "byDay": {
          "2026-11-14": {
            "per": 0.0076929,
            "offer": "Cyber Breach: Hawkeye (Robot) 3-Diamond"
          },
          "2026-11-15": {
            "per": 0.0076929,
            "offer": "Cyber Breach: Hawkeye (Robot) 3-Diamond"
          }
        },
        "bestCore": {
          "per": 0.001,
          "day": "2026-11-14",
          "offer": "Cyber Breach: Hawkeye (Robot) 3-Diamond"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 0.001,
            "offer": "Cyber Breach: Hawkeye (Robot) 3-Diamond"
          },
          "2026-11-15": {
            "per": 0.001,
            "offer": "Cyber Breach: Hawkeye (Robot) 3-Diamond"
          }
        }
      },
      "coreValue": 1000
    },
    "promotion:human_torch_(jim)_—_3_diamond_promotion": {
      "name": "Human Torch (Jim) — 3 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 129.99,
      "aliases": [],
      "id": "PD_HUMANTORCHJIM_3",
      "character": "Human Torch (Jim)",
      "observed": {
        "basis": "own",
        "perCash": 0.0076929,
        "perCore": 0.001,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 0.0076929,
          "day": "2026-11-14",
          "offer": "Cyber Breach: Human Torch (Jim) 3-Diamond"
        },
        "byDay": {
          "2026-11-14": {
            "per": 0.0076929,
            "offer": "Cyber Breach: Human Torch (Jim) 3-Diamond"
          },
          "2026-11-15": {
            "per": 0.0076929,
            "offer": "Cyber Breach: Human Torch (Jim) 3-Diamond"
          }
        },
        "bestCore": {
          "per": 0.001,
          "day": "2026-11-14",
          "offer": "Cyber Breach: Human Torch (Jim) 3-Diamond"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 0.001,
            "offer": "Cyber Breach: Human Torch (Jim) 3-Diamond"
          },
          "2026-11-15": {
            "per": 0.001,
            "offer": "Cyber Breach: Human Torch (Jim) 3-Diamond"
          }
        }
      },
      "coreValue": 1000
    },
    "orb:iron_raiders_mega_2": {
      "name": "Iron Raiders Mega Orb Fragment",
      "category": "orb",
      "per": 1,
      "value": 0.064995,
      "aliases": [],
      "id": "GACHA_CRATE_IRONRAIDERSMEGA_NOV26_TOKEN_d9bf3541",
      "observed": {
        "basis": "own",
        "perCash": 15.3858,
        "perCore": 2,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 15.3858,
          "day": "2026-11-14",
          "offer": "Cyber Breach: Iron Raiders Mega Orb"
        },
        "byDay": {
          "2026-11-14": {
            "per": 15.3858,
            "offer": "Cyber Breach: Iron Raiders Mega Orb"
          },
          "2026-11-15": {
            "per": 15.3858,
            "offer": "Cyber Breach: Iron Raiders Mega Orb"
          }
        },
        "bestCore": {
          "per": 2,
          "day": "2026-11-14",
          "offer": "Cyber Breach: Iron Raiders Mega Orb"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 2,
            "offer": "Cyber Breach: Iron Raiders Mega Orb"
          },
          "2026-11-15": {
            "per": 2,
            "offer": "Cyber Breach: Iron Raiders Mega Orb"
          }
        }
      },
      "coreValue": 0.5
    },
    "orb:shadow_diamond": {
      "name": "Shadow Diamond Orb Fragments",
      "category": "orb",
      "per": 100,
      "value": 0.4333,
      "aliases": [],
      "id": "GACHA_CRATE_SHADOW_DIAMOND_TOKEN_bd83d98b",
      "observed": {
        "basis": "own",
        "perCash": 230.787,
        "perCore": 30,
        "days": [
          "2026-11-14"
        ],
        "offers": 6,
        "firstSeen": false,
        "best": {
          "per": 230.787,
          "day": "2026-11-14",
          "offer": "Shadow Diamond Orbs: Premium"
        },
        "byDay": {
          "2026-11-14": {
            "per": 230.787,
            "offer": "Shadow Diamond Orbs: Premium"
          },
          "2026-11-15": {
            "per": 230.787,
            "offer": "Shadow Diamond Orbs: Premium"
          }
        },
        "bestCore": {
          "per": 30,
          "day": "2026-11-14",
          "offer": "Shadow Diamond Orbs: Premium"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 30,
            "offer": "Shadow Diamond Orbs: Premium"
          },
          "2026-11-15": {
            "per": 30,
            "offer": "Shadow Diamond Orbs: Premium"
          }
        }
      },
      "coreValue": 3.33333
    },
    "points:tip:_shadow_radiance": {
      "name": "Tip: Shadow Radiance",
      "category": "points",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "EVTA_META_NOV_G",
      "excludeFromValue": true,
      "note": "event or loyalty points: not counted"
    },
    "orb:shadow_rising": {
      "name": "Shadow Rising Orb Fragments",
      "category": "orb",
      "per": 100,
      "value": 0.2499,
      "aliases": [],
      "id": "GACHA_CRATE_SHADOWRISING_TOKEN_0e6b0ac7",
      "observed": {
        "basis": "own",
        "perCash": 400.16,
        "perCore": 50,
        "days": [
          "2026-11-14"
        ],
        "offers": 4,
        "firstSeen": false,
        "best": {
          "per": 400.16,
          "day": "2026-11-14",
          "offer": "Shadow Rising: Web Special"
        },
        "byDay": {
          "2026-11-14": {
            "per": 400.16,
            "offer": "Shadow Rising: Web Special"
          },
          "2026-11-15": {
            "per": 400.16,
            "offer": "Shadow Rising: Web Special"
          }
        },
        "bestCore": {
          "per": 50,
          "day": "2026-11-14",
          "offer": "Shadow Rising: Web Special"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 50,
            "offer": "Shadow Rising: Web Special"
          },
          "2026-11-15": {
            "per": 50,
            "offer": "Shadow Rising: Web Special"
          }
        }
      },
      "coreValue": 2
    },
    "points:tip:_shadow_rising": {
      "name": "Tip: Shadow Rising",
      "category": "points",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "EVTA_META_NOV_F",
      "excludeFromValue": true,
      "note": "event or loyalty points: not counted"
    },
    "shard:agatha harkness": {
      "name": "Agatha Harkness shards",
      "category": "shard",
      "per": 1,
      "value": 0.0185093,
      "aliases": [],
      "id": "SHARD_AGATHAHARKNESS",
      "character": "Agatha Harkness",
      "observed": {
        "basis": "set",
        "perCash": 54.027,
        "perCore": 7.2,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 54.027,
          "day": "2026-11-14",
          "offer": "Nightstalker Power Up"
        },
        "byDay": {
          "2026-11-14": {
            "per": 54.027,
            "offer": "Nightstalker Power Up"
          },
          "2026-11-15": {
            "per": 54.027,
            "offer": "Nightstalker Power Up"
          }
        },
        "bestCore": {
          "per": 7.2,
          "day": "2026-11-14",
          "offer": "Nightstalker Power Up"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 7.2,
            "offer": "Nightstalker Power Up"
          },
          "2026-11-15": {
            "per": 7.2,
            "offer": "Nightstalker Power Up"
          }
        }
      },
      "coreValue": 0.138889
    },
    "shard:man-thing": {
      "name": "Man-Thing shards",
      "category": "shard",
      "per": 1,
      "value": 0.0185093,
      "aliases": [],
      "id": "SHARD_MANTHING",
      "character": "Man-Thing",
      "observed": {
        "basis": "set",
        "perCash": 54.027,
        "perCore": 7.2,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 54.027,
          "day": "2026-11-14",
          "offer": "Nightstalker Power Up"
        },
        "byDay": {
          "2026-11-14": {
            "per": 54.027,
            "offer": "Nightstalker Power Up"
          },
          "2026-11-15": {
            "per": 54.027,
            "offer": "Nightstalker Power Up"
          }
        },
        "bestCore": {
          "per": 7.2,
          "day": "2026-11-14",
          "offer": "Nightstalker Power Up"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 7.2,
            "offer": "Nightstalker Power Up"
          },
          "2026-11-15": {
            "per": 7.2,
            "offer": "Nightstalker Power Up"
          }
        }
      },
      "coreValue": 0.138889
    },
    "shard:oath": {
      "name": "Oath shards",
      "category": "shard",
      "per": 1,
      "value": 0.0185093,
      "aliases": [],
      "id": "SHARD_OATH",
      "character": "Oath",
      "observed": {
        "basis": "set",
        "perCash": 54.027,
        "perCore": 7.2,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 54.027,
          "day": "2026-11-14",
          "offer": "Nightstalker Power Up"
        },
        "byDay": {
          "2026-11-14": {
            "per": 54.027,
            "offer": "Nightstalker Power Up"
          },
          "2026-11-15": {
            "per": 54.027,
            "offer": "Nightstalker Power Up"
          }
        },
        "bestCore": {
          "per": 7.2,
          "day": "2026-11-14",
          "offer": "Nightstalker Power Up"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 7.2,
            "offer": "Nightstalker Power Up"
          },
          "2026-11-15": {
            "per": 7.2,
            "offer": "Nightstalker Power Up"
          }
        }
      },
      "coreValue": 0.138889
    },
    "gear:augmented_ritual_salts": {
      "name": "Augmented Ritual Salts",
      "category": "gear",
      "per": 1,
      "value": 0.281364,
      "aliases": [],
      "id": "GEAR_TEAL_MYSTIC_MAT_C4",
      "observed": {
        "basis": "set",
        "perCash": 3.55412,
        "perCore": 0.462,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 3.55412,
          "day": "2026-11-14",
          "offer": "Morbius Power Pack"
        },
        "byDay": {
          "2026-11-14": {
            "per": 3.55412,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 3.55412,
            "offer": "Morbius Power Pack"
          }
        },
        "bestCore": {
          "per": 0.462,
          "day": "2026-11-14",
          "offer": "Morbius Power Pack"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 0.462,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 0.462,
            "offer": "Morbius Power Pack"
          }
        }
      },
      "coreValue": 2.1645
    },
    "gear:augmented_psionic_essence": {
      "name": "Augmented Psionic Essence",
      "category": "gear",
      "per": 1,
      "value": 0.281364,
      "aliases": [],
      "id": "GEAR_TEAL_MYSTIC_MAT_C6",
      "observed": {
        "basis": "set",
        "perCash": 3.55412,
        "perCore": 0.462,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 3.55412,
          "day": "2026-11-14",
          "offer": "Morbius Power Pack"
        },
        "byDay": {
          "2026-11-14": {
            "per": 3.55412,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 3.55412,
            "offer": "Morbius Power Pack"
          }
        },
        "bestCore": {
          "per": 0.462,
          "day": "2026-11-14",
          "offer": "Morbius Power Pack"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 0.462,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 0.462,
            "offer": "Morbius Power Pack"
          }
        }
      },
      "coreValue": 2.1645
    },
    "gear:augmented_armor_catalyst_part": {
      "name": "Augmented Armor Catalyst Part",
      "category": "gear",
      "per": 1,
      "value": 0.0412667,
      "aliases": [],
      "id": "GEAR_TEAL_ARMOR_MAT_BIT",
      "observed": {
        "basis": "set",
        "perCash": 24.2326,
        "perCore": 3.15,
        "days": [
          "2026-11-14"
        ],
        "offers": 2,
        "firstSeen": false,
        "best": {
          "per": 24.2326,
          "day": "2026-11-14",
          "offer": "Morbius Power Pack"
        },
        "byDay": {
          "2026-11-14": {
            "per": 24.2326,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 24.2326,
            "offer": "Morbius Power Pack"
          }
        },
        "bestCore": {
          "per": 3.15,
          "day": "2026-11-14",
          "offer": "Morbius Power Pack"
        },
        "coreByDay": {
          "2026-11-14": {
            "per": 3.15,
            "offer": "Morbius Power Pack"
          },
          "2026-11-15": {
            "per": 3.15,
            "offer": "Morbius Power Pack"
          }
        }
      },
      "coreValue": 0.31746
    },
    "other:silver_promotion_credit": {
      "name": "Silver Promotion Credit",
      "category": "other",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "PROMOTION_CUR",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "gear:crimson_alien_spores": {
      "name": "Crimson Alien Spores",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "id": "GEAR_RED_SERUM1",
      "coreValue": null,
      "observed": {
        "perCash": null
      }
    },
    "iso8:t2_level_1_ions": {
      "name": "T2 Level 1 Ions",
      "category": "iso8",
      "per": 1000000,
      "value": 0.776669,
      "aliases": [],
      "id": "ISO8-TIER-1-A-CURRENCY",
      "observed": {
        "basis": "set",
        "perCash": 1287550,
        "perCore": 180000,
        "days": [
          "2026-11-15"
        ],
        "offers": 1,
        "firstSeen": true,
        "best": {
          "per": 1287550,
          "day": "2026-11-15",
          "offer": "Unlock Special: Blue ISO"
        },
        "byDay": {
          "2026-11-15": {
            "per": 1287550,
            "offer": "Unlock Special: Blue ISO"
          }
        },
        "bestCore": {
          "per": 180000,
          "day": "2026-11-15",
          "offer": "Unlock Special: Blue ISO"
        },
        "coreByDay": {
          "2026-11-15": {
            "per": 180000,
            "offer": "Unlock Special: Blue ISO"
          }
        }
      },
      "coreValue": 5.55556
    },
    "iso8:t2_level_4_ions": {
      "name": "T2 Level 4 Ions",
      "category": "iso8",
      "per": 1000000,
      "value": 0.776669,
      "aliases": [],
      "id": "ISO8-TIER-1-B-CURRENCY",
      "observed": {
        "basis": "set",
        "perCash": 1287550,
        "perCore": 180000,
        "days": [
          "2026-11-15"
        ],
        "offers": 1,
        "firstSeen": true,
        "best": {
          "per": 1287550,
          "day": "2026-11-15",
          "offer": "Unlock Special: Blue ISO"
        },
        "byDay": {
          "2026-11-15": {
            "per": 1287550,
            "offer": "Unlock Special: Blue ISO"
          }
        },
        "bestCore": {
          "per": 180000,
          "day": "2026-11-15",
          "offer": "Unlock Special: Blue ISO"
        },
        "coreByDay": {
          "2026-11-15": {
            "per": 180000,
            "offer": "Unlock Special: Blue ISO"
          }
        }
      },
      "coreValue": 5.55556
    }
  }
};
