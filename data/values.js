/*
 * Value table: what one unit of each item is worth.
 *
 * STATUS: the msfwar.com Spenders Guide numbers are NOT loaded yet. The cloud session
 * that built this tool could not reach msfwar.com, so every "value" below is null.
 * The page shows items with null values as "no value in table yet".
 *
 * How to fill it in:
 *   - meta.unit: "USD" if values are dollar figures, "cores" if they are Power Core
 *     equivalents. meta.unitPerUsd is how many units one dollar buys (1 for USD).
 *   - items[key].value is the value of `per` units. Gold is listed per 100,000 so a
 *     value of 0.5 would mean 100k gold is worth half a dollar.
 *   - Character shards use key "shard:<character name lower-case>" and must carry
 *     `character` so roster personalization can find them.
 *   - Edits made on the Value table tab are stored in the browser; "Export JSON" writes
 *     the merged table so it can be pasted back here as the new baseline.
 */
window.MSF_VALUE_TABLE = {
  meta: {
    source: 'msfwar.com Spenders Guide (not loaded yet)',
    sourceUrl: 'https://www.msfwar.com/spenders-guide/',
    updated: null,
    unit: 'USD',
    unitPerUsd: 1,
    currency: 'USD',
    grades: [
      { min: 3, label: 'Excellent' },
      { min: 2, label: 'Good' },
      { min: 1, label: 'Fair' },
      { min: 0, label: 'Poor' }
    ],
    shardRules: { maxedMultiplier: 0, maxStars: 7 }
  },
  items: {
    'gold': { name: 'Gold', category: 'currency', per: 100000, value: null, aliases: ['Gold Coins'] },
    'power_cores': { name: 'Power Cores', category: 'currency', per: 100, value: null, aliases: ['Cores', 'Power Core'] },
    'promotion_credits': { name: 'Promotion Credits', category: 'currency', per: 100, value: null, aliases: ['Promotion Credit'] },
    'arena_credits': { name: 'Arena Credits', category: 'currency', per: 1000, value: null, aliases: [] },
    'blitz_credits': { name: 'Blitz Credits', category: 'currency', per: 1000, value: null, aliases: [] },
    'raid_credits': { name: 'Raid Credits', category: 'currency', per: 1000, value: null, aliases: [] },
    'war_credits': { name: 'War Credits', category: 'currency', per: 1000, value: null, aliases: [] },
    'orb:premium': { name: 'Premium Orb', category: 'orb', per: 1, value: null, aliases: ['Premium Orbs'] },
    'orb:mega': { name: 'Mega Orb', category: 'orb', per: 1, value: null, aliases: ['Mega Orbs'] },
    'orb:basic': { name: 'Basic Orb', category: 'orb', per: 1, value: null, aliases: ['Basic Orbs'] },
    'orb:gold': { name: 'Gold Orb', category: 'orb', per: 1, value: null, aliases: ['Gold Orbs'] },
    'orb:red_star': { name: 'Red Star Orb', category: 'orb', per: 1, value: null, aliases: ['Red Star Orbs'] },
    'training_module:orange': { name: 'Orange Training Module', category: 'training', per: 1, value: null, aliases: ['Orange Training Modules'] },
    'training_module:purple': { name: 'Purple Training Module', category: 'training', per: 1, value: null, aliases: ['Purple Training Modules'] },
    'ability_material:orange': { name: 'Orange Ability Material', category: 'ability', per: 1, value: null, aliases: ['Orange Ability Materials'] },
    'ability_material:purple': { name: 'Purple Ability Material', category: 'ability', per: 1, value: null, aliases: ['Purple Ability Materials'] }
  }
};
