/*
 * Value table: what one unit of each item is worth, in US dollars.
 *
 * SOURCE: msfwar.com Spender's Guide. For each resource msfwar publishes an "observed average",
 * the number of units one US dollar bought across recent paid offers (e.g. Gold: 884,050 per $1
 * over 5 days and 55 offer observations). `value` here is the dollars that `per` units cost at
 * that average, i.e. value = per / observed.perUsd. Items whose observed.perUsd is null were on
 * msfwar's list or in this store but had no baseline yet; their value is null and the page
 * flags them.
 *
 * observed.earlyEstimate mirrors msfwar's "early estimate" (fewer than seven observed days).
 * Items with excludeFromValue are event/loyalty points, which msfwar leaves out of grades.
 *
 * meta.fxToUsd converts the store's price currency to US dollars before any ratio is computed.
 * meta.scoring holds the msfwar-style grading rules (see README, "How value is computed").
 *
 * Keys: shard:<character name lower-case> (with `character`), orb:<name>, gear:<name>,
 * training_module:<tier>, ability_material:<tier>, iso8:<name>, points:<event>, promotion:<...>.
 * Edits made on the Value table tab are stored in the browser; "Export JSON" writes the merged
 * table so it can be pasted back here as the new baseline.
 */
window.MSF_VALUE_TABLE = {
  "meta": {
    "source": "msfwar.com Spender's Guide, observed averages read 18 October 2026 (guide last checked 17 October 2026, 6:27 PM EDT)",
    "sourceUrl": "https://www.msfwar.com/spenders-guide/",
    "updated": "2026-10-18",
    "unit": "USD",
    "unitPerUsd": 1,
    "currency": "USD",
    "fxToUsd": {
      "USD": 1,
      "CAD": 0.7138
    },
    "fxNote": "USD per 1 CAD. USD/CAD 1.401 on 18 Sep 2026 (Federal Reserve H.10 via YCharts); msfwar prices are US dollars before tax, this store shows CA$.",
    "scoring": {
      "method": "msfwar",
      "typicalScore": 70,
      "scorePerRatio": 40,
      "maxScore": 100,
      "minScore": 0,
      "weights": {
        "gold": 30,
        "training": 30,
        "orangeIso": 20,
        "shard": 15,
        "other": 5
      },
      "letters": [
        {
          "min": 90,
          "label": "A"
        },
        {
          "min": 80,
          "label": "B"
        },
        {
          "min": 70,
          "label": "C"
        },
        {
          "min": 60,
          "label": "D"
        },
        {
          "min": 0,
          "label": "F"
        }
      ],
      "note": "Each resource is compared with its msfwar observed average: typical value scores 70 (C), 25% more per dollar 80 (B), 50% more 90 (A), capped at 100. Resource scores average within a category and categories combine by weight; only categories present share the weighting. Milestone and Strike Points are excluded. Letters below C and the 0-100 clamp are this tool's reading of msfwar's description, not confirmed from the site."
    },
    "grades": [
      {
        "min": 1.5,
        "label": "Excellent"
      },
      {
        "min": 1.25,
        "label": "Good"
      },
      {
        "min": 1,
        "label": "Fair"
      },
      {
        "min": 0,
        "label": "Poor"
      }
    ],
    "shardRules": {
      "maxedMultiplier": 0,
      "maxStars": 7
    }
  },
  "items": {
    "battle_pass_tokens": {
      "name": "Battle Pass Tokens",
      "category": "currency",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "commander_xp": {
      "name": "Commander XP",
      "category": "currency",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "dark_promotion_credit": {
      "name": "Dark Promotion Credit",
      "category": "currency",
      "per": 1,
      "value": 0.036364,
      "aliases": [],
      "msfwar": {
        "key": "PROMOTION_CUR_ULT",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 27.5,
        "days": 2,
        "observations": 2,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "elite_6_credit": {
      "name": "Elite 6 Credit",
      "category": "currency",
      "per": 1000,
      "value": 0.24975,
      "aliases": [],
      "msfwar": {
        "key": "ELITE_6_CUR",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 4004.0,
        "days": 2,
        "observations": 2,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "elite_7_credit": {
      "name": "Elite 7 Credit",
      "category": "currency",
      "per": 100,
      "value": 1.333156,
      "aliases": [],
      "msfwar": {
        "key": "ELITE_7_CUR",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 75.01,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "gold": {
      "name": "Gold",
      "category": "currency",
      "per": 1000000,
      "value": 1.131158,
      "aliases": [],
      "msfwar": {
        "key": "SC",
        "category": "Gold"
      },
      "observed": {
        "perUsd": 884050.0,
        "days": 5,
        "observations": 55,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "power_cores": {
      "name": "Power Cores",
      "category": "currency",
      "per": 100,
      "value": 1.089087,
      "aliases": [],
      "msfwar": {
        "key": "HC",
        "category": "Power Cores"
      },
      "observed": {
        "perUsd": 91.82,
        "days": 5,
        "observations": 60,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "shop_credits": {
      "name": "Shop Credits",
      "category": "currency",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "strike_points": {
      "name": "Strike Points",
      "category": "currency",
      "per": 100,
      "value": 1.0,
      "aliases": [],
      "msfwar": {
        "key": "BFYB-CUR",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 100.0,
        "days": 5,
        "observations": 783,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      },
      "excludeFromValue": true,
      "note": "Event and loyalty points are excluded from grading, as on msfwar."
    },
    "ultra_cores": {
      "name": "Ultra Cores",
      "category": "currency",
      "per": 1,
      "value": 0.1,
      "aliases": [],
      "msfwar": {
        "key": "UC",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 10.0,
        "days": 5,
        "observations": 30,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "shard:beast": {
      "name": "Beast shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Beast",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:beta ray bill": {
      "name": "Beta Ray Bill shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Beta Ray Bill",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:blade (mighty)": {
      "name": "Blade (Mighty) shards",
      "category": "shard",
      "per": 1,
      "value": 0.222222,
      "aliases": [],
      "msfwar": {
        "key": "SHARD_BLADEMIGHTY",
        "category": "Character shards"
      },
      "character": "Blade (Mighty)",
      "observed": {
        "perUsd": 4.5,
        "days": 5,
        "observations": 10,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "shard:cable": {
      "name": "Cable shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Cable",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:carnage": {
      "name": "Carnage shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Carnage",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:colleen wing": {
      "name": "Colleen Wing shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Colleen Wing",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:colossus": {
      "name": "Colossus shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Colossus",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:crossbones": {
      "name": "Crossbones shards",
      "category": "shard",
      "per": 100,
      "value": 1.23335,
      "aliases": [],
      "msfwar": {
        "key": "SHARD_CROSSBONES",
        "category": "Character shards"
      },
      "character": "Crossbones",
      "observed": {
        "perUsd": 81.08,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "shard:cull obsidian": {
      "name": "Cull Obsidian shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Cull Obsidian",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:cyclops": {
      "name": "Cyclops shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Cyclops",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:darkhawk": {
      "name": "Darkhawk shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Darkhawk",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:deadpool": {
      "name": "Deadpool shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Deadpool",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:doctor strange": {
      "name": "Doctor Strange shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Doctor Strange",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:domino": {
      "name": "Domino shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Domino",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:ebony maw": {
      "name": "Ebony Maw shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Ebony Maw",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:executioner": {
      "name": "Executioner shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Executioner",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:forge": {
      "name": "Forge shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Forge",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:gambit": {
      "name": "Gambit shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Gambit",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:ghost rider (robbie)": {
      "name": "Ghost Rider (Robbie) shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Ghost Rider (Robbie)",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:ghost-spider": {
      "name": "Ghost-Spider shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Ghost-Spider",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:gilgamesh": {
      "name": "Gilgamesh shards",
      "category": "shard",
      "per": 1,
      "value": 0.25,
      "aliases": [],
      "msfwar": {
        "key": "SHARD_GILGAMESH",
        "category": "Character shards"
      },
      "character": "Gilgamesh",
      "observed": {
        "perUsd": 4.0,
        "days": 1,
        "observations": 1,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "shard:green goblin": {
      "name": "Green Goblin shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Green Goblin",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:gwenom": {
      "name": "Gwenom shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Gwenom",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:hela": {
      "name": "Hela shards",
      "category": "shard",
      "per": 1,
      "value": 0.1,
      "aliases": [],
      "msfwar": {
        "key": "SHARD_HELA",
        "category": "Character shards"
      },
      "character": "Hela",
      "observed": {
        "perUsd": 10.0,
        "days": 4,
        "observations": 4,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "shard:high evolutionary": {
      "name": "High Evolutionary shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "High Evolutionary",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:hulk": {
      "name": "Hulk shards",
      "category": "shard",
      "per": 100,
      "value": 1.23335,
      "aliases": [],
      "msfwar": {
        "key": "SHARD_HULK",
        "category": "Character shards"
      },
      "character": "Hulk",
      "observed": {
        "perUsd": 81.08,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "shard:iceman": {
      "name": "Iceman shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Iceman",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:ikaris": {
      "name": "Ikaris shards",
      "category": "shard",
      "per": 1,
      "value": 0.024679,
      "aliases": [],
      "msfwar": {
        "key": "SHARD_IKARIS",
        "category": "Character shards"
      },
      "character": "Ikaris",
      "observed": {
        "perUsd": 40.52,
        "days": 1,
        "observations": 1,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "shard:iron fist": {
      "name": "Iron Fist shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Iron Fist",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:iron man (infinity war)": {
      "name": "Iron Man (Infinity War) shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Iron Man (Infinity War)",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:iron man (zombie)": {
      "name": "Iron Man (Zombie) shards",
      "category": "shard",
      "per": 1,
      "value": 0.1,
      "aliases": [],
      "msfwar": {
        "key": "SHARD_ZOMBIEIRONMAN",
        "category": "Character shards"
      },
      "character": "Iron Man (Zombie)",
      "observed": {
        "perUsd": 10.0,
        "days": 4,
        "observations": 4,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "shard:iron monger": {
      "name": "Iron Monger shards",
      "category": "shard",
      "per": 1,
      "value": 0.4,
      "aliases": [],
      "msfwar": {
        "key": "SHARD_IRONMONGER",
        "category": "Character shards"
      },
      "character": "Iron Monger",
      "observed": {
        "perUsd": 2.5,
        "days": 5,
        "observations": 10,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "shard:ironheart (mkii)": {
      "name": "Ironheart (MKII) shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Ironheart (MKII)",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:jocasta": {
      "name": "Jocasta shards",
      "category": "shard",
      "per": 1,
      "value": 0.497512,
      "aliases": [],
      "msfwar": {
        "key": "SHARD_JOCASTA",
        "category": "Character shards"
      },
      "character": "Jocasta",
      "observed": {
        "perUsd": 2.01,
        "days": 5,
        "observations": 30,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "shard:juggernaut (zombie)": {
      "name": "Juggernaut (Zombie) shards",
      "category": "shard",
      "per": 1,
      "value": 0.1,
      "aliases": [],
      "msfwar": {
        "key": "SHARD_ZOMBIEJUGGERNAUT",
        "category": "Character shards"
      },
      "character": "Juggernaut (Zombie)",
      "observed": {
        "perUsd": 10.0,
        "days": 4,
        "observations": 4,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "shard:kestrel (zombie)": {
      "name": "Kestrel (Zombie) shards",
      "category": "shard",
      "per": 1000,
      "value": 0.069109,
      "aliases": [],
      "msfwar": {
        "key": "SHARD_ZOMBIEKESTREL",
        "category": "Character shards"
      },
      "character": "Kestrel (Zombie)",
      "observed": {
        "perUsd": 14470.0,
        "days": 4,
        "observations": 24,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "shard:kingo": {
      "name": "Kingo shards",
      "category": "shard",
      "per": 1000,
      "value": 0.25,
      "aliases": [],
      "msfwar": {
        "key": "SHARD_KINGO",
        "category": "Character shards"
      },
      "character": "Kingo",
      "observed": {
        "perUsd": 4000.0,
        "days": 1,
        "observations": 1,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "shard:loki (teen)": {
      "name": "Loki (Teen) shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Loki (Teen)",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:loki": {
      "name": "Loki shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Loki",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:luke cage": {
      "name": "Luke Cage shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Luke Cage",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:malekith": {
      "name": "Malekith shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Malekith",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:minn-erva": {
      "name": "Minn-Erva shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Minn-Erva",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:misty knight": {
      "name": "Misty Knight shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Misty Knight",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:ms. marvel (hard light)": {
      "name": "Ms. Marvel (Hard Light) shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Ms. Marvel (Hard Light)",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:mysterio": {
      "name": "Mysterio shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Mysterio",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:negasonic": {
      "name": "Negasonic shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Negasonic",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:nightcrawler": {
      "name": "Nightcrawler shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Nightcrawler",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:peni parker": {
      "name": "Peni Parker shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Peni Parker",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:peter b. parker": {
      "name": "Peter B. Parker shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Peter B. Parker",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:phantom rider": {
      "name": "Phantom Rider shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Phantom Rider",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:photon": {
      "name": "Photon shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Photon",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:quake": {
      "name": "Quake shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Quake",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:quicksilver (symbiote)": {
      "name": "Quicksilver (Symbiote) shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Quicksilver (Symbiote)",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:rachel cole-alves": {
      "name": "Rachel Cole-Alves shards",
      "category": "shard",
      "per": 1,
      "value": 0.226244,
      "aliases": [],
      "msfwar": {
        "key": "SHARD_RACHELCOLEALVES",
        "category": "Character shards"
      },
      "character": "Rachel Cole-Alves",
      "observed": {
        "perUsd": 4.42,
        "days": 5,
        "observations": 12,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "shard:ravager boomer": {
      "name": "Ravager Boomer shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Ravager Boomer",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:ravager bruiser": {
      "name": "Ravager Bruiser shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Ravager Bruiser",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:ravager stitcher": {
      "name": "Ravager Stitcher shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Ravager Stitcher",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:red goblin": {
      "name": "Red Goblin shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Red Goblin",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:rescue": {
      "name": "Rescue shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Rescue",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:rhino": {
      "name": "Rhino shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Rhino",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:riot": {
      "name": "Riot shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Riot",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:ronan the accuser": {
      "name": "Ronan the Accuser shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Ronan the Accuser",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:scarlet witch (zombie)": {
      "name": "Scarlet Witch (Zombie) shards",
      "category": "shard",
      "per": 1,
      "value": 0.1,
      "aliases": [],
      "msfwar": {
        "key": "SHARD_ZOMBIESCARLETWITCH",
        "category": "Character shards"
      },
      "character": "Scarlet Witch (Zombie)",
      "observed": {
        "perUsd": 10.0,
        "days": 4,
        "observations": 4,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "shard:scarlet witch": {
      "name": "Scarlet Witch shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Scarlet Witch",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:sersi": {
      "name": "Sersi shards",
      "category": "shard",
      "per": 1,
      "value": 0.024679,
      "aliases": [],
      "msfwar": {
        "key": "SHARD_SERSI",
        "category": "Character shards"
      },
      "character": "Sersi",
      "observed": {
        "perUsd": 40.52,
        "days": 1,
        "observations": 1,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "shard:shang-chi": {
      "name": "Shang-Chi shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Shang-Chi",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:shocker": {
      "name": "Shocker shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Shocker",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:silver surfer (breaker)": {
      "name": "Silver Surfer (Breaker) shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Silver Surfer (Breaker)",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:spider-man (noir)": {
      "name": "Spider-Man (Noir) shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Spider-Man (Noir)",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:spider-man (pavitr)": {
      "name": "Spider-Man (Pavitr) shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Spider-Man (Pavitr)",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:spider-man 2099": {
      "name": "Spider-Man 2099 shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Spider-Man 2099",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:spider-man": {
      "name": "Spider-Man shards",
      "category": "shard",
      "per": 100,
      "value": 1.23335,
      "aliases": [],
      "msfwar": {
        "key": "SHARD_SPIDERMAN",
        "category": "Character shards"
      },
      "character": "Spider-Man",
      "observed": {
        "perUsd": 81.08,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "shard:spider-woman (julia)": {
      "name": "Spider-Woman (Julia) shards",
      "category": "shard",
      "per": 1,
      "value": 0.226244,
      "aliases": [],
      "msfwar": {
        "key": "SHARD_SPIDERWOMANJULIA",
        "category": "Character shards"
      },
      "character": "Spider-Woman (Julia)",
      "observed": {
        "perUsd": 4.42,
        "days": 5,
        "observations": 12,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "shard:star-lord (t'challa)": {
      "name": "Star-Lord (T'Challa) shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Star-Lord (T'Challa)",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:strange (heartless)": {
      "name": "Strange (Heartless) shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Strange (Heartless)",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:sunspot": {
      "name": "Sunspot shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Sunspot",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:sylvie": {
      "name": "Sylvie shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Sylvie",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:thanos": {
      "name": "Thanos shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Thanos",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:thena": {
      "name": "Thena shards",
      "category": "shard",
      "per": 1,
      "value": 0.25,
      "aliases": [],
      "msfwar": {
        "key": "SHARD_THENA",
        "category": "Character shards"
      },
      "character": "Thena",
      "observed": {
        "perUsd": 4.0,
        "days": 1,
        "observations": 1,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "shard:toxin": {
      "name": "Toxin shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Toxin",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:ulysses klaue": {
      "name": "Ulysses Klaue shards",
      "category": "shard",
      "per": 1,
      "value": 0.4,
      "aliases": [],
      "msfwar": {
        "key": "SHARD_ULYSSESKLAUE",
        "category": "Character shards"
      },
      "character": "Ulysses Klaue",
      "observed": {
        "perUsd": 2.5,
        "days": 5,
        "observations": 10,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "shard:vahl": {
      "name": "Vahl shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Vahl",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:venom": {
      "name": "Venom shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Venom",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:void knight": {
      "name": "Void Knight shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Void Knight",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:vulture": {
      "name": "Vulture shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Vulture",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:wasp (janet)": {
      "name": "Wasp (Janet) shards",
      "category": "shard",
      "per": 1,
      "value": 0.199601,
      "aliases": [],
      "msfwar": {
        "key": "SHARD_WASPJANET",
        "category": "Character shards"
      },
      "character": "Wasp (Janet)",
      "observed": {
        "perUsd": 5.01,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "shard:whiplash": {
      "name": "Whiplash shards",
      "category": "shard",
      "per": 1,
      "value": 0.4,
      "aliases": [],
      "msfwar": {
        "key": "SHARD_WHIPLASH",
        "category": "Character shards"
      },
      "character": "Whiplash",
      "observed": {
        "perUsd": 2.5,
        "days": 5,
        "observations": 10,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "shard:x-23": {
      "name": "X-23 shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "X-23",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:yellowjacket": {
      "name": "Yellowjacket shards",
      "category": "shard",
      "per": 100,
      "value": 1.23335,
      "aliases": [],
      "msfwar": {
        "key": "SHARD_YELLOWJACKET",
        "category": "Character shards"
      },
      "character": "Yellowjacket",
      "observed": {
        "perUsd": 81.08,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "shard:yo-yo": {
      "name": "Yo-Yo shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Yo-Yo",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "shard:yondu": {
      "name": "Yondu shards",
      "category": "shard",
      "per": 1,
      "value": null,
      "aliases": [],
      "character": "Yondu",
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "training_module:l3": {
      "name": "L3 Training Module",
      "category": "training",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "training_module:l4": {
      "name": "L4 Training Module",
      "category": "training",
      "per": 100,
      "value": 0.78125,
      "aliases": [],
      "msfwar": {
        "key": "CONSUMABLE_XPLVL80",
        "category": "Training materials"
      },
      "observed": {
        "perUsd": 128.0,
        "days": 5,
        "observations": 40,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "ability_material:phantom_rider_basic_awakened": {
      "name": "Phantom Rider's Basic Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "value": 0.033278,
      "aliases": [],
      "msfwar": {
        "key": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_PHANTOMRIDER_BASIC",
        "category": "Ability materials"
      },
      "observed": {
        "perUsd": 30.05,
        "days": 4,
        "observations": 8,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "ability_material:phantom_rider_special_awakened": {
      "name": "Phantom Rider's Special Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "value": 0.033278,
      "aliases": [],
      "msfwar": {
        "key": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_PHANTOMRIDER_SPECIAL",
        "category": "Ability materials"
      },
      "observed": {
        "perUsd": 30.05,
        "days": 4,
        "observations": 8,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "ability_material:phantom_rider_ultimate_awakened": {
      "name": "Phantom Rider's Ultimate Awakened Ability Material",
      "category": "ability",
      "per": 1,
      "value": 0.04995,
      "aliases": [],
      "msfwar": {
        "key": "ABILITY_MATERIAL_UNIQUE_ABILITY_MAT_PHANTOMRIDER_ULTIMATE",
        "category": "Ability materials"
      },
      "observed": {
        "perUsd": 20.02,
        "days": 4,
        "observations": 4,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "ability_material:t1": {
      "name": "T1 Ability Material",
      "category": "ability",
      "per": 1,
      "value": 0.02572,
      "aliases": [],
      "msfwar": {
        "key": "ABILITY_MATERIAL_GREEN_ABILITY_MAT",
        "category": "Ability materials"
      },
      "observed": {
        "perUsd": 38.88,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "ability_material:t2": {
      "name": "T2 Ability Material",
      "category": "ability",
      "per": 1,
      "value": 0.02572,
      "aliases": [],
      "msfwar": {
        "key": "ABILITY_MATERIAL_BLUE_ABILITY_MAT",
        "category": "Ability materials"
      },
      "observed": {
        "perUsd": 38.88,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "ability_material:t3": {
      "name": "T3 Ability Material",
      "category": "ability",
      "per": 100,
      "value": 0.304878,
      "aliases": [],
      "msfwar": {
        "key": "ABILITY_MATERIAL_PURPLE_ABILITY_MAT",
        "category": "Ability materials"
      },
      "observed": {
        "perUsd": 328.0,
        "days": 5,
        "observations": 10,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "ability_material:t4": {
      "name": "T4 Ability Material",
      "category": "ability",
      "per": 1,
      "value": 0.028902,
      "aliases": [],
      "msfwar": {
        "key": "ABILITY_MATERIAL_ORANGE_ABILITY_MAT",
        "category": "Ability materials"
      },
      "observed": {
        "perUsd": 34.6,
        "days": 5,
        "observations": 30,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t1_ions": {
      "name": "T1 Ions",
      "category": "iso8",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "iso8:t2_blaster_armor_level_1_iso-8": {
      "name": "T2 Blaster Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.048146,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_BLUE_BLASTER_ARMOR_6",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 20.77,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_blaster_damage_level_1_iso-8": {
      "name": "T2 Blaster Damage Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.048146,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_BLUE_BLASTER_DAMAGE_6",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 20.77,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_blaster_focus_level_1_iso-8": {
      "name": "T2 Blaster Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.048146,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_BLUE_BLASTER_FOCUS_6",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 20.77,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_blaster_health_level_1_iso-8": {
      "name": "T2 Blaster Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.048146,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_BLUE_BLASTER_HEALTH_6",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 20.77,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_blaster_resist_level_1_iso-8": {
      "name": "T2 Blaster Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.048146,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_BLUE_BLASTER_RESIST_6",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 20.77,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_brawler_armor_level_1_iso-8": {
      "name": "T2 Brawler Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.048146,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_BLUE_BRAWLER_ARMOR_6",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 20.77,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_brawler_damage_level_1_iso-8": {
      "name": "T2 Brawler Damage Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.048146,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_BLUE_BRAWLER_DAMAGE_6",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 20.77,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_brawler_focus_level_1_iso-8": {
      "name": "T2 Brawler Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.048146,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_BLUE_BRAWLER_FOCUS_6",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 20.77,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_brawler_health_level_1_iso-8": {
      "name": "T2 Brawler Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.048146,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_BLUE_BRAWLER_HEALTH_6",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 20.77,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_brawler_resist_level_1_iso-8": {
      "name": "T2 Brawler Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.048146,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_BLUE_BRAWLER_RESIST_6",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 20.77,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_controller_armor_level_1_iso-8": {
      "name": "T2 Controller Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.048146,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_BLUE_CONTROLLER_ARMOR_6",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 20.77,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_controller_damage_level_1_iso-8": {
      "name": "T2 Controller Damage Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.048146,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_BLUE_CONTROLLER_DAMAGE_6",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 20.77,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_controller_focus_level_1_iso-8": {
      "name": "T2 Controller Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.048146,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_BLUE_CONTROLLER_FOCUS_6",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 20.77,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_controller_health_level_1_iso-8": {
      "name": "T2 Controller Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.048146,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_BLUE_CONTROLLER_HEALTH_6",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 20.77,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_controller_resist_level_1_iso-8": {
      "name": "T2 Controller Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.048146,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_BLUE_CONTROLLER_RESIST_6",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 20.77,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_level_1_ions": {
      "name": "T2 Level 1 Ions",
      "category": "iso8",
      "per": 1000000,
      "value": 1.713238,
      "aliases": [],
      "msfwar": {
        "key": "ISO8-TIER-1-A-CURRENCY",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 583690.0,
        "days": 5,
        "observations": 10,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_level_4_ions": {
      "name": "T2 Level 4 Ions",
      "category": "iso8",
      "per": 1000000,
      "value": 1.713238,
      "aliases": [],
      "msfwar": {
        "key": "ISO8-TIER-1-B-CURRENCY",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 583690.0,
        "days": 5,
        "observations": 10,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_level_5_ions": {
      "name": "T2 Level 5 Ions",
      "category": "iso8",
      "per": 1000000,
      "value": 0.934579,
      "aliases": [],
      "msfwar": {
        "key": "ISO8-TIER-1-C-CURRENCY",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 1070000.0,
        "days": 5,
        "observations": 10,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_protector_armor_level_1_iso-8": {
      "name": "T2 Protector Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.048146,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_BLUE_PROTECTOR_ARMOR_6",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 20.77,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_protector_damage_level_1_iso-8": {
      "name": "T2 Protector Damage Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.048146,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_BLUE_PROTECTOR_DAMAGE_6",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 20.77,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_protector_focus_level_1_iso-8": {
      "name": "T2 Protector Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.048146,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_BLUE_PROTECTOR_FOCUS_6",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 20.77,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_protector_health_level_1_iso-8": {
      "name": "T2 Protector Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.048146,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_BLUE_PROTECTOR_HEALTH_6",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 20.77,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_protector_resist_level_1_iso-8": {
      "name": "T2 Protector Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.048146,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_BLUE_PROTECTOR_RESIST_6",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 20.77,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_support_armor_level_1_iso-8": {
      "name": "T2 Support Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.048146,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_BLUE_SUPPORT_ARMOR_6",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 20.77,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_support_damage_level_1_iso-8": {
      "name": "T2 Support Damage Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.048146,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_BLUE_SUPPORT_DAMAGE_6",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 20.77,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_support_focus_level_1_iso-8": {
      "name": "T2 Support Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.048146,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_BLUE_SUPPORT_FOCUS_6",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 20.77,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_support_health_level_1_iso-8": {
      "name": "T2 Support Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.048146,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_BLUE_SUPPORT_HEALTH_6",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 20.77,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t2_support_resist_level_1_iso-8": {
      "name": "T2 Support Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.048146,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_BLUE_SUPPORT_RESIST_6",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 20.77,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_blaster_armor_level_1_iso-8": {
      "name": "T3 Blaster Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.1287,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_PURPLE_BLASTER_ARMOR_11",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 7.77,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_blaster_damage_level_1_iso-8": {
      "name": "T3 Blaster Damage Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.1287,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_PURPLE_BLASTER_DAMAGE_11",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 7.77,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_blaster_focus_level_1_iso-8": {
      "name": "T3 Blaster Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.1287,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_PURPLE_BLASTER_FOCUS_11",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 7.77,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_blaster_health_level_1_iso-8": {
      "name": "T3 Blaster Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.1287,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_PURPLE_BLASTER_HEALTH_11",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 7.77,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_blaster_resist_level_1_iso-8": {
      "name": "T3 Blaster Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.1287,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_PURPLE_BLASTER_RESIST_11",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 7.77,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_brawler_armor_level_1_iso-8": {
      "name": "T3 Brawler Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.1287,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_PURPLE_BRAWLER_ARMOR_11",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 7.77,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_brawler_damage_level_1_iso-8": {
      "name": "T3 Brawler Damage Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.1287,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_PURPLE_BRAWLER_DAMAGE_11",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 7.77,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_brawler_focus_level_1_iso-8": {
      "name": "T3 Brawler Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.1287,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_PURPLE_BRAWLER_FOCUS_11",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 7.77,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_brawler_health_level_1_iso-8": {
      "name": "T3 Brawler Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.1287,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_PURPLE_BRAWLER_HEALTH_11",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 7.77,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_brawler_resist_level_1_iso-8": {
      "name": "T3 Brawler Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.1287,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_PURPLE_BRAWLER_RESIST_11",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 7.77,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_controller_armor_level_1_iso-8": {
      "name": "T3 Controller Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.1287,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_PURPLE_CONTROLLER_ARMOR_11",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 7.77,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_controller_damage_level_1_iso-8": {
      "name": "T3 Controller Damage Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.1287,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_PURPLE_CONTROLLER_DAMAGE_11",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 7.77,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_controller_focus_level_1_iso-8": {
      "name": "T3 Controller Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.1287,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_PURPLE_CONTROLLER_FOCUS_11",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 7.77,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_controller_health_level_1_iso-8": {
      "name": "T3 Controller Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.1287,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_PURPLE_CONTROLLER_HEALTH_11",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 7.77,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_controller_resist_level_1_iso-8": {
      "name": "T3 Controller Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.1287,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_PURPLE_CONTROLLER_RESIST_11",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 7.77,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_iso-8_credits": {
      "name": "T3 Iso-8 Credits",
      "category": "iso8",
      "per": 100,
      "value": 0.3003,
      "aliases": [],
      "msfwar": {
        "key": "ISO8-TIER-2-ITEM-CREDITS-CURRENCY",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 333.0,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_level_1_ions": {
      "name": "T3 Level 1 Ions",
      "category": "iso8",
      "per": 1000000,
      "value": 2.470417,
      "aliases": [],
      "msfwar": {
        "key": "ISO8-TIER-2-A-CURRENCY",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 404790.0,
        "days": 5,
        "observations": 40,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_level_4_ions": {
      "name": "T3 Level 4 Ions",
      "category": "iso8",
      "per": 1000000,
      "value": 3.151691,
      "aliases": [],
      "msfwar": {
        "key": "ISO8-TIER-2-B-CURRENCY",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 317290.0,
        "days": 5,
        "observations": 55,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_level_5_ions": {
      "name": "T3 Level 5 Ions",
      "category": "iso8",
      "per": 1000000,
      "value": 3.094155,
      "aliases": [],
      "msfwar": {
        "key": "ISO8-TIER-2-C-CURRENCY",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 323190.0,
        "days": 5,
        "observations": 55,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_protector_armor_level_1_iso-8": {
      "name": "T3 Protector Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.1287,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_PURPLE_PROTECTOR_ARMOR_11",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 7.77,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_protector_damage_level_1_iso-8": {
      "name": "T3 Protector Damage Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.1287,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_PURPLE_PROTECTOR_DAMAGE_11",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 7.77,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_protector_focus_level_1_iso-8": {
      "name": "T3 Protector Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.1287,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_PURPLE_PROTECTOR_FOCUS_11",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 7.77,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_protector_health_level_1_iso-8": {
      "name": "T3 Protector Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.1287,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_PURPLE_PROTECTOR_HEALTH_11",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 7.77,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_protector_resist_level_1_iso-8": {
      "name": "T3 Protector Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.1287,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_PURPLE_PROTECTOR_RESIST_11",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 7.77,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_support_armor_level_1_iso-8": {
      "name": "T3 Support Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.1287,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_PURPLE_SUPPORT_ARMOR_11",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 7.77,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_support_damage_level_1_iso-8": {
      "name": "T3 Support Damage Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.1287,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_PURPLE_SUPPORT_DAMAGE_11",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 7.77,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_support_focus_level_1_iso-8": {
      "name": "T3 Support Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.1287,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_PURPLE_SUPPORT_FOCUS_11",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 7.77,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_support_health_level_1_iso-8": {
      "name": "T3 Support Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.1287,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_PURPLE_SUPPORT_HEALTH_11",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 7.77,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t3_support_resist_level_1_iso-8": {
      "name": "T3 Support Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 0.1287,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_PURPLE_SUPPORT_RESIST_11",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 7.77,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_blaster_armor_level_1_iso-8": {
      "name": "T4 Blaster Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 3.333333,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_ORANGE_BLASTER_ARMOR_16",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 0.3,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_blaster_damage_level_1_iso-8": {
      "name": "T4 Blaster Damage Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 3.333333,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_ORANGE_BLASTER_DAMAGE_16",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 0.3,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_blaster_focus_level_1_iso-8": {
      "name": "T4 Blaster Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 3.333333,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_ORANGE_BLASTER_FOCUS_16",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 0.3,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_blaster_health_level_1_iso-8": {
      "name": "T4 Blaster Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 3.333333,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_ORANGE_BLASTER_HEALTH_16",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 0.3,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_blaster_resist_level_1_iso-8": {
      "name": "T4 Blaster Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 3.333333,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_ORANGE_BLASTER_RESIST_16",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 0.3,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_brawler_armor_level_1_iso-8": {
      "name": "T4 Brawler Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 3.333333,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_ORANGE_BRAWLER_ARMOR_16",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 0.3,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_brawler_damage_level_1_iso-8": {
      "name": "T4 Brawler Damage Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 3.333333,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_ORANGE_BRAWLER_DAMAGE_16",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 0.3,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_brawler_focus_level_1_iso-8": {
      "name": "T4 Brawler Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 3.333333,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_ORANGE_BRAWLER_FOCUS_16",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 0.3,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_brawler_health_level_1_iso-8": {
      "name": "T4 Brawler Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 3.333333,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_ORANGE_BRAWLER_HEALTH_16",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 0.3,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_brawler_resist_level_1_iso-8": {
      "name": "T4 Brawler Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 3.333333,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_ORANGE_BRAWLER_RESIST_16",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 0.3,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_controller_armor_level_1_iso-8": {
      "name": "T4 Controller Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 3.333333,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_ORANGE_CONTROLLER_ARMOR_16",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 0.3,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_controller_damage_level_1_iso-8": {
      "name": "T4 Controller Damage Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 3.333333,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_ORANGE_CONTROLLER_DAMAGE_16",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 0.3,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_controller_focus_level_1_iso-8": {
      "name": "T4 Controller Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 3.333333,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_ORANGE_CONTROLLER_FOCUS_16",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 0.3,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_controller_health_level_1_iso-8": {
      "name": "T4 Controller Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 3.333333,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_ORANGE_CONTROLLER_HEALTH_16",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 0.3,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_controller_resist_level_1_iso-8": {
      "name": "T4 Controller Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 3.333333,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_ORANGE_CONTROLLER_RESIST_16",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 0.3,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_level_1_ions": {
      "name": "T4 Level 1 Ions",
      "category": "iso8",
      "per": 1000,
      "value": 0.1241,
      "aliases": [],
      "msfwar": {
        "key": "ISO8-TIER-3-A-CURRENCY",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 8058.0,
        "days": 5,
        "observations": 7,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_protector_armor_level_1_iso-8": {
      "name": "T4 Protector Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 3.333333,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_ORANGE_PROTECTOR_ARMOR_16",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 0.3,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_protector_damage_level_1_iso-8": {
      "name": "T4 Protector Damage Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 3.333333,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_ORANGE_PROTECTOR_DAMAGE_16",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 0.3,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_protector_focus_level_1_iso-8": {
      "name": "T4 Protector Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 3.333333,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_ORANGE_PROTECTOR_FOCUS_16",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 0.3,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_protector_health_level_1_iso-8": {
      "name": "T4 Protector Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 3.333333,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_ORANGE_PROTECTOR_HEALTH_16",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 0.3,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_protector_resist_level_1_iso-8": {
      "name": "T4 Protector Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 3.333333,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_ORANGE_PROTECTOR_RESIST_16",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 0.3,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_support_armor_level_1_iso-8": {
      "name": "T4 Support Armor Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 3.846154,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_ORANGE_SUPPORT_ARMOR_16",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 0.26,
        "days": 5,
        "observations": 7,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_support_damage_level_1_iso-8": {
      "name": "T4 Support Damage Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 3.846154,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_ORANGE_SUPPORT_DAMAGE_16",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 0.26,
        "days": 5,
        "observations": 7,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_support_focus_level_1_iso-8": {
      "name": "T4 Support Focus Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 3.846154,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_ORANGE_SUPPORT_FOCUS_16",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 0.26,
        "days": 5,
        "observations": 7,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_support_health_level_1_iso-8": {
      "name": "T4 Support Health Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 3.846154,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_ORANGE_SUPPORT_HEALTH_16",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 0.26,
        "days": 5,
        "observations": 7,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "iso8:t4_support_resist_level_1_iso-8": {
      "name": "T4 Support Resist Level 1 Iso-8",
      "category": "iso8",
      "per": 1,
      "value": 3.846154,
      "aliases": [],
      "msfwar": {
        "key": "ISOITEM_ORANGE_SUPPORT_RESIST_16",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 0.26,
        "days": 5,
        "observations": 7,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "gear:crimson_adaptive_pathogens": {
      "name": "Crimson Adaptive Pathogens",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_arcane_powder": {
      "name": "Crimson Arcane Powder",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_armor_catalyst_part": {
      "name": "Crimson Armor Catalyst Part",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_basic_catalyst_part": {
      "name": "Crimson Basic Catalyst Part",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_biopolymers": {
      "name": "Crimson Biopolymers",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_chaotic_ribosomes": {
      "name": "Crimson Chaotic Ribosomes",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_cytoplasm": {
      "name": "Crimson Cytoplasm",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_damage_catalyst_part": {
      "name": "Crimson Damage Catalyst Part",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_dargonite": {
      "name": "Crimson Dargonite",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_esoteric_glyphs": {
      "name": "Crimson Esoteric Glyphs",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_focus_catalyst_part": {
      "name": "Crimson Focus Catalyst Part",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_focused_chi": {
      "name": "Crimson Focused Chi",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_health_catalyst_part": {
      "name": "Crimson Health Catalyst Part",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_hyperphage": {
      "name": "Crimson Hyperphage",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_isochronal_compound": {
      "name": "Crimson Isochronal Compound",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_liquid_hydrazine": {
      "name": "Crimson Liquid Hydrazine",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_metabolic_enhancers": {
      "name": "Crimson Metabolic Enhancers",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_mythic_geode": {
      "name": "Crimson Mythic Geode",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_nebulizer": {
      "name": "Crimson Nebulizer",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_nucleic_infusion": {
      "name": "Crimson Nucleic Infusion",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_phytonutrients": {
      "name": "Crimson Phytonutrients",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_psionic_essence": {
      "name": "Crimson Psionic Essence",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_remote_access_codes": {
      "name": "Crimson Remote Access Codes",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_resistance_catalyst_part": {
      "name": "Crimson Resistance Catalyst Part",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_ritual_salts": {
      "name": "Crimson Ritual Salts",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_security_bypass": {
      "name": "Crimson Security Bypass",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_sigil": {
      "name": "Crimson Sigil",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_spliced_x-gene": {
      "name": "Crimson Spliced X-Gene",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_tempered_osmium": {
      "name": "Crimson Tempered Osmium",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:crimson_uru": {
      "name": "Crimson Uru",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:improved_arcane_powder": {
      "name": "Improved Arcane Powder",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:improved_isomer": {
      "name": "Improved Isomer",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:improved_mri": {
      "name": "Improved MRI",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:improved_parchment": {
      "name": "Improved Parchment",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:improved_sigil": {
      "name": "Improved Sigil",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:improved_syringe": {
      "name": "Improved Syringe",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:improved_vial": {
      "name": "Improved Vial",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:improved_x-rays": {
      "name": "Improved X-Rays",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "gear:teal_catalyst_pack": {
      "name": "Teal Catalyst Pack",
      "category": "gear",
      "per": 1,
      "value": null,
      "aliases": [],
      "msfwar": {
        "key": "GACHA_2756c5c8b3fa34cbf6a427d9c9bb7d956314f63198e0eb3aac394d916f66e8a0",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": null,
        "note": "no baseline yet on msfwar"
      }
    },
    "orb:allied_supply_xii": {
      "name": "Allied Supply XII Orb Fragments",
      "category": "orb",
      "per": 100,
      "value": 0.202429,
      "aliases": [],
      "msfwar": {
        "key": "GACHA_CRATE_ALLIEDSUPPLY12_TOKEN_2ebd0f2e",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 494.0,
        "days": 5,
        "observations": 11,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "orb:amazing_avengers_mega": {
      "name": "Amazing Avengers Mega Orb Fragments",
      "category": "orb",
      "per": 1,
      "value": 0.05,
      "aliases": [],
      "msfwar": {
        "key": "GACHA_CRATE_AMAZINGAVENGERSMEGA_TOKEN_d9960ab4",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 20.0,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "orb:armory_14": {
      "name": "Armory 14 Orb Fragments",
      "category": "orb",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "orb:armory_15": {
      "name": "Armory 15 Orb Fragments",
      "category": "orb",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "orb:armory_16": {
      "name": "Armory 16 Orb Fragments",
      "category": "orb",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "orb:armory_17": {
      "name": "Armory 17 Orb Fragments",
      "category": "orb",
      "per": 1,
      "value": null,
      "aliases": [],
      "msfwar": {
        "key": "GACHA_CRATE_GT17_C1_C8_TOKEN_138df228",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": null,
        "note": "no baseline yet on msfwar"
      }
    },
    "orb:armory_18": {
      "name": "Armory 18 Orb Fragments",
      "category": "orb",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "orb:basic_t2_iso-8": {
      "name": "Basic T2 Iso-8 Orb Fragments",
      "category": "orb",
      "per": 1000,
      "value": 0.039799,
      "aliases": [],
      "msfwar": {
        "key": "GACHA_CRATE_ISO8_T2_BASIC_TOKEN_f8d78c4c",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 25126.0,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "orb:basic_t3_iso-8": {
      "name": "Basic T3 Iso-8 Orb Fragments",
      "category": "orb",
      "per": 1000,
      "value": 0.10502,
      "aliases": [],
      "msfwar": {
        "key": "GACHA_CRATE_ISO8_T3_BASIC_TOKEN_6812fd67",
        "category": "ISO-8"
      },
      "observed": {
        "perUsd": 9522.0,
        "days": 5,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "orb:crimson_elite": {
      "name": "Crimson Elite Orb Fragments",
      "category": "orb",
      "per": 100,
      "value": 0.149477,
      "aliases": [],
      "msfwar": {
        "key": "GACHA_CRATE_GT19_20_TOKEN_4c7f2032",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 669.0,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "orb:diamond": {
      "name": "Diamond Orb Fragments",
      "category": "orb",
      "per": 100,
      "value": 1.0,
      "aliases": [],
      "msfwar": {
        "key": "GACHA_CRATE_DIAMOND_BASIC_TOKEN_de8786ff",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 100.0,
        "days": 5,
        "observations": 10,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "orb:extra-spooky": {
      "name": "Extra-SPOOKY Orb Fragments",
      "category": "orb",
      "per": 100,
      "value": 1.248439,
      "aliases": [],
      "msfwar": {
        "key": "GACHA_CRATE_HALLOWEEN_BONUS_TOKEN_1728e517",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 80.1,
        "days": 4,
        "observations": 8,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "orb:gold": {
      "name": "Gold Orb Fragments",
      "category": "orb",
      "per": 100,
      "value": 0.5,
      "aliases": [],
      "msfwar": {
        "key": "GACHA_CRATE_GOLD_TOKEN_b39f19f5",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 200.0,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "orb:halloween": {
      "name": "Halloween Orb Fragments",
      "category": "orb",
      "per": 100,
      "value": 0.221729,
      "aliases": [],
      "msfwar": {
        "key": "GACHA_CRATE_HALLOWEEN_TOKEN_122feb95",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 451.0,
        "days": 4,
        "observations": 8,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "orb:iron_raiders_mega": {
      "name": "Iron Raiders Mega Orb Fragments",
      "category": "orb",
      "per": 1,
      "value": 0.05,
      "aliases": [],
      "msfwar": {
        "key": "GACHA_CRATE_IRONRAIDERSMEGA_TOKEN_92682ed0",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 20.0,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "orb:iso-fest_diamond": {
      "name": "ISO-Fest Diamond Orb Fragments",
      "category": "orb",
      "per": 100,
      "value": 0.429185,
      "aliases": [],
      "msfwar": {
        "key": "GACHA_CRATE_ISOFEST_DIAMOND_TOKEN_346424e5",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 233.0,
        "days": 5,
        "observations": 15,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "orb:iso-fest_yellow": {
      "name": "ISO-Fest Yellow Orb Fragments",
      "category": "orb",
      "per": 100,
      "value": 0.218818,
      "aliases": [],
      "msfwar": {
        "key": "GACHA_CRATE_ISOFEST_YELLOW_TOKEN_c0eea83a",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 457.0,
        "days": 5,
        "observations": 16,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "orb:mega_gold": {
      "name": "Mega Gold Orb Fragments",
      "category": "orb",
      "per": 1000000,
      "value": 0.018272,
      "aliases": [],
      "msfwar": {
        "key": "GACHA_CRATE_GOLD_MEGA_TOKEN_eec28697",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 54730000.0,
        "days": 5,
        "observations": 35,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "orb:mega_override": {
      "name": "MEGA Override Orb Fragments",
      "category": "orb",
      "per": 1000000,
      "value": 0.05,
      "aliases": [],
      "msfwar": {
        "key": "GACHA_CRATE_JOCASTA_MEGA_TOKEN_a274410c",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 20000000.0,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "orb:mutant_gt21_premium_orb": {
      "name": "Mutant GT21 Premium Orb",
      "category": "orb",
      "per": 1,
      "value": null,
      "aliases": [],
      "msfwar": {
        "key": "GACHA_e12d7a6b7c1919c03067705e3a5b317dae9afd41fcf06ee08628352fb63bdd51",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": null,
        "note": "no baseline yet on msfwar"
      }
    },
    "orb:mutant_gt21_standard_orb": {
      "name": "Mutant GT21 Standard Orb",
      "category": "orb",
      "per": 1,
      "value": null,
      "aliases": [],
      "msfwar": {
        "key": "GACHA_d1c1db64e3ed10b089517548babbb0003f7bddb710789daaeb2993ebf508a24c",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": null,
        "note": "no baseline yet on msfwar"
      }
    },
    "orb:orange_mega_orb": {
      "name": "Orange Mega Orb",
      "category": "orb",
      "per": 1,
      "value": 100.0,
      "aliases": [],
      "msfwar": {
        "key": "GACHA_0bb6fd319dfe9bd2ba800bddac3dff0b7c85739457bcb626f5a927e218eb546d",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.01,
        "days": 2,
        "observations": 4,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "orb:override": {
      "name": "Override Orb Fragments",
      "category": "orb",
      "per": 100,
      "value": 1.9996,
      "aliases": [],
      "msfwar": {
        "key": "GACHA_CRATE_FCO_JOCASTA_TOKEN_605e8350",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 50.01,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "orb:premium": {
      "name": "Premium Orb Fragments",
      "category": "orb",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "orb:premium_t1_iso-8": {
      "name": "Premium T1 Iso-8 Orb Fragments",
      "category": "orb",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "orb:t3_ability": {
      "name": "T3 Ability Orb Fragments",
      "category": "orb",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "orb:timeless_eternals_mega": {
      "name": "Timeless Eternals Mega Orb Fragment",
      "category": "orb",
      "per": 1,
      "value": 0.05,
      "aliases": [],
      "msfwar": {
        "key": "GACHA_CRATE_TIMELESSETERNAL_MEGA_TOKEN_cf399fa5",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 20.0,
        "days": 1,
        "observations": 1,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "orb:training": {
      "name": "Training Orb Fragments",
      "category": "orb",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "promotion:domino_—_5_diamond_promotion": {
      "name": "Domino — 5 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 100.0,
      "aliases": [],
      "msfwar": {
        "key": "PD_DOMINO_5",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.01,
        "days": 4,
        "observations": 4,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:domino_—_7_red_star_promotion": {
      "name": "Domino — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": 100.0,
      "aliases": [],
      "msfwar": {
        "key": "RS_DOMINO_7",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.01,
        "days": 4,
        "observations": 4,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:gilgamesh_—_2_diamond_promotion": {
      "name": "Gilgamesh — 2 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 33.333333,
      "aliases": [],
      "msfwar": {
        "key": "PD_GILGAMESH_2",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.03,
        "days": 1,
        "observations": 2,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:gilgamesh_—_3_diamond_promotion": {
      "name": "Gilgamesh — 3 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 50.0,
      "aliases": [],
      "msfwar": {
        "key": "PD_GILGAMESH_3",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.02,
        "days": 1,
        "observations": 2,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:gilgamesh_—_4_diamond_promotion": {
      "name": "Gilgamesh — 4 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 100.0,
      "aliases": [],
      "msfwar": {
        "key": "PD_GILGAMESH_4",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.01,
        "days": 1,
        "observations": 1,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:gilgamesh_—_7_red_star_promotion": {
      "name": "Gilgamesh — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": 50.0,
      "aliases": [],
      "msfwar": {
        "key": "RS_GILGAMESH_7",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.02,
        "days": 1,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:hela_—_3_diamond_promotion": {
      "name": "Hela — 3 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 33.333333,
      "aliases": [],
      "msfwar": {
        "key": "PD_HELA_3",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.03,
        "days": 4,
        "observations": 4,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:hela_—_7_red_star_promotion": {
      "name": "Hela — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": 33.333333,
      "aliases": [],
      "msfwar": {
        "key": "RS_HELA_7",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.03,
        "days": 4,
        "observations": 4,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:ikaris_—_2_diamond_promotion": {
      "name": "Ikaris — 2 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 50.0,
      "aliases": [],
      "msfwar": {
        "key": "PD_IKARIS_2",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.02,
        "days": 1,
        "observations": 1,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:ikaris_—_4_diamond_promotion": {
      "name": "Ikaris — 4 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 33.333333,
      "aliases": [],
      "msfwar": {
        "key": "PD_IKARIS_4",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.03,
        "days": 1,
        "observations": 1,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:ikaris_—_7_red_star_promotion": {
      "name": "Ikaris — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": 33.333333,
      "aliases": [],
      "msfwar": {
        "key": "RS_IKARIS_7",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.03,
        "days": 1,
        "observations": 3,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:iron_man_(zombie)_—_3_diamond_promotion": {
      "name": "Iron Man (Zombie) — 3 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 33.333333,
      "aliases": [],
      "msfwar": {
        "key": "PD_ZOMBIEIRONMAN_3",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.03,
        "days": 4,
        "observations": 4,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:iron_man_(zombie)_—_7_red_star_promotion": {
      "name": "Iron Man (Zombie) — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": 33.333333,
      "aliases": [],
      "msfwar": {
        "key": "RS_ZOMBIEIRONMAN_7",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.03,
        "days": 4,
        "observations": 4,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:jocasta_—_7_red_star_promotion": {
      "name": "Jocasta — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": null,
      "aliases": [],
      "msfwar": {
        "key": "RS_JOCASTA_7",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": null,
        "note": "no baseline yet on msfwar"
      }
    },
    "promotion:juggernaut_(zombie)_—_3_diamond_promotion": {
      "name": "Juggernaut (Zombie) — 3 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 33.333333,
      "aliases": [],
      "msfwar": {
        "key": "PD_ZOMBIEJUGGERNAUT_3",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.03,
        "days": 4,
        "observations": 4,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:juggernaut_(zombie)_—_7_red_star_promotion": {
      "name": "Juggernaut (Zombie) — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": 33.333333,
      "aliases": [],
      "msfwar": {
        "key": "RS_ZOMBIEJUGGERNAUT_7",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.03,
        "days": 4,
        "observations": 4,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:kestrel_(zombie)_—_3_diamond_promotion": {
      "name": "Kestrel (Zombie) — 3 diamond promotion",
      "category": "promotion",
      "per": 100,
      "value": 1.666667,
      "aliases": [],
      "msfwar": {
        "key": "PD_ZOMBIEKESTREL_3",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 60.0,
        "days": 4,
        "observations": 8,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:kestrel_(zombie)_—_7_red_star_promotion": {
      "name": "Kestrel (Zombie) — 7 red star promotion",
      "category": "promotion",
      "per": 100,
      "value": 1.666667,
      "aliases": [],
      "msfwar": {
        "key": "RS_ZOMBIEKESTREL_7",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 60.0,
        "days": 4,
        "observations": 8,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:kingo_—_2_diamond_promotion": {
      "name": "Kingo — 2 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 0.033333,
      "aliases": [],
      "msfwar": {
        "key": "PD_KINGO_2",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 30.0,
        "days": 1,
        "observations": 2,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:kingo_—_3_diamond_promotion": {
      "name": "Kingo — 3 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 0.05,
      "aliases": [],
      "msfwar": {
        "key": "PD_KINGO_3",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 20.0,
        "days": 1,
        "observations": 2,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:kingo_—_4_diamond_promotion": {
      "name": "Kingo — 4 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 0.1,
      "aliases": [],
      "msfwar": {
        "key": "PD_KINGO_4",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 10.0,
        "days": 1,
        "observations": 1,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:kingo_—_7_red_star_promotion": {
      "name": "Kingo — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": 0.05,
      "aliases": [],
      "msfwar": {
        "key": "RS_KINGO_7",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 20.0,
        "days": 1,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:negasonic_—_5_diamond_promotion": {
      "name": "Negasonic — 5 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 100.0,
      "aliases": [],
      "msfwar": {
        "key": "PD_NEGASONIC_5",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.01,
        "days": 4,
        "observations": 4,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:negasonic_—_7_red_star_promotion": {
      "name": "Negasonic — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": 100.0,
      "aliases": [],
      "msfwar": {
        "key": "RS_NEGASONIC_7",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.01,
        "days": 4,
        "observations": 4,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:phantom_rider_—_5_diamond_promotion": {
      "name": "Phantom Rider — 5 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 100.0,
      "aliases": [],
      "msfwar": {
        "key": "PD_PHANTOMRIDER_5",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.01,
        "days": 4,
        "observations": 4,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:phantom_rider_—_7_red_star_promotion": {
      "name": "Phantom Rider — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": 100.0,
      "aliases": [],
      "msfwar": {
        "key": "RS_PHANTOMRIDER_7",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.01,
        "days": 4,
        "observations": 4,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:quake_—_5_diamond_promotion": {
      "name": "Quake — 5 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 100.0,
      "aliases": [],
      "msfwar": {
        "key": "PD_QUAKE_5",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.01,
        "days": 4,
        "observations": 4,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:quake_—_7_red_star_promotion": {
      "name": "Quake — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": 100.0,
      "aliases": [],
      "msfwar": {
        "key": "RS_QUAKE_7",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.01,
        "days": 4,
        "observations": 4,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:scarlet_witch_(zombie)_—_3_diamond_promotion": {
      "name": "Scarlet Witch (Zombie) — 3 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 33.333333,
      "aliases": [],
      "msfwar": {
        "key": "PD_ZOMBIESCARLETWITCH_3",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.03,
        "days": 4,
        "observations": 4,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:scarlet_witch_(zombie)_—_7_red_star_promotion": {
      "name": "Scarlet Witch (Zombie) — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": 33.333333,
      "aliases": [],
      "msfwar": {
        "key": "RS_ZOMBIESCARLETWITCH_7",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.03,
        "days": 4,
        "observations": 4,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:sersi_—_2_diamond_promotion": {
      "name": "Sersi — 2 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 50.0,
      "aliases": [],
      "msfwar": {
        "key": "PD_SERSI_2",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.02,
        "days": 1,
        "observations": 1,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:sersi_—_4_diamond_promotion": {
      "name": "Sersi — 4 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 33.333333,
      "aliases": [],
      "msfwar": {
        "key": "PD_SERSI_4",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.03,
        "days": 1,
        "observations": 1,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:sersi_—_7_red_star_promotion": {
      "name": "Sersi — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": 33.333333,
      "aliases": [],
      "msfwar": {
        "key": "RS_SERSI_7",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.03,
        "days": 1,
        "observations": 3,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:thena_—_2_diamond_promotion": {
      "name": "Thena — 2 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 33.333333,
      "aliases": [],
      "msfwar": {
        "key": "PD_THENA_2",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.03,
        "days": 1,
        "observations": 2,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:thena_—_3_diamond_promotion": {
      "name": "Thena — 3 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 50.0,
      "aliases": [],
      "msfwar": {
        "key": "PD_THENA_3",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.02,
        "days": 1,
        "observations": 2,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:thena_—_4_diamond_promotion": {
      "name": "Thena — 4 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 100.0,
      "aliases": [],
      "msfwar": {
        "key": "PD_THENA_4",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.01,
        "days": 1,
        "observations": 1,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:thena_—_7_red_star_promotion": {
      "name": "Thena — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": 50.0,
      "aliases": [],
      "msfwar": {
        "key": "RS_THENA_7",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.02,
        "days": 1,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:yo-yo_—_5_diamond_promotion": {
      "name": "Yo-Yo — 5 diamond promotion",
      "category": "promotion",
      "per": 1,
      "value": 100.0,
      "aliases": [],
      "msfwar": {
        "key": "PD_YOYO_5",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.01,
        "days": 4,
        "observations": 4,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "promotion:yo-yo_—_7_red_star_promotion": {
      "name": "Yo-Yo — 7 red star promotion",
      "category": "promotion",
      "per": 1,
      "value": 100.0,
      "aliases": [],
      "msfwar": {
        "key": "RS_YOYO_7",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 0.01,
        "days": 4,
        "observations": 4,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "points:eternals_radiance": {
      "name": "Eternals Radiance Milestone Points",
      "category": "points",
      "per": 1,
      "value": 0.098717,
      "aliases": [],
      "msfwar": {
        "key": "EVTA_META_OCT_F",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 10.13,
        "days": 1,
        "observations": 20,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      },
      "excludeFromValue": true,
      "note": "Event and loyalty points are excluded from grading, as on msfwar."
    },
    "points:iron_vengeance": {
      "name": "Iron Vengeance Milestone Points",
      "category": "points",
      "per": 1000000,
      "value": 0.301205,
      "aliases": [],
      "msfwar": {
        "key": "EVTA_META_OCT_C",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 3320000.0,
        "days": 5,
        "observations": 221,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      },
      "excludeFromValue": true,
      "note": "Event and loyalty points are excluded from grading, as on msfwar."
    },
    "points:iso_fest": {
      "name": "ISO Fest Milestone Points",
      "category": "points",
      "per": 1000000,
      "value": 0.483092,
      "aliases": [],
      "msfwar": {
        "key": "EVTA_META_OCT_B",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 2069999.9999999998,
        "days": 5,
        "observations": 111,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      },
      "excludeFromValue": true,
      "note": "Event and loyalty points are excluded from grading, as on msfwar."
    },
    "points:raid_warzone": {
      "name": "Raid Warzone Milestone Points",
      "category": "points",
      "per": 100,
      "value": 0.166389,
      "aliases": [],
      "msfwar": {
        "key": "EVTA_META_FEB_C",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 601.0,
        "days": 5,
        "observations": 26,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      },
      "excludeFromValue": true,
      "note": "Event and loyalty points are excluded from grading, as on msfwar."
    },
    "other:campaign_energy": {
      "name": "Campaign Energy",
      "category": "other",
      "per": 1,
      "value": null,
      "aliases": [],
      "msfwar": {
        "key": "CAMPAIGN_PLAYER_ENERGY",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": null,
        "note": "no baseline yet on msfwar"
      }
    },
    "other:epic_essence": {
      "name": "Epic Essence",
      "category": "other",
      "per": 1,
      "value": null,
      "aliases": [],
      "msfwar": {
        "key": "EVENT_CUR25",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": null,
        "note": "no baseline yet on msfwar"
      }
    },
    "other:gt21_mutant_calendar": {
      "name": "GT21 Mutant Calendar",
      "category": "other",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "other:premium_plus_battle_pass_ticket": {
      "name": "Premium Plus Battle Pass Ticket",
      "category": "other",
      "per": 1,
      "value": null,
      "aliases": [],
      "observed": {
        "perUsd": null,
        "note": "not on msfwar's resource list as of 2026-10-18"
      }
    },
    "other:raid_energy_refill": {
      "name": "Raid Energy Refill",
      "category": "other",
      "per": 100,
      "value": 1.247505,
      "aliases": [],
      "msfwar": {
        "key": "ENERGY-RAID-CUR",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 80.16,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "other:raid_health_pack": {
      "name": "Raid Health Pack",
      "category": "other",
      "per": 100,
      "value": 1.66334,
      "aliases": [],
      "msfwar": {
        "key": "HEAL-RAID-CUR",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": 60.12,
        "days": 5,
        "observations": 5,
        "readAt": "2026-10-18",
        "earlyEstimate": true
      }
    },
    "other:strike_store_exclusive": {
      "name": "Strike Store Exclusive",
      "category": "other",
      "per": 1,
      "value": null,
      "aliases": [],
      "msfwar": {
        "key": "GACHA_dad2f884a3698c09995cb6e798416d4a893c034f49f59bb33a7589d046c02f6e",
        "category": "Other resources"
      },
      "observed": {
        "perUsd": null,
        "note": "no baseline yet on msfwar"
      }
    }
  }
};
