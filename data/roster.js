/*
 * The player's roster, used to personalize values (shards for a character already at
 * 7 stars are worth meta.shardRules.maxedMultiplier of their generic value).
 *
 * Written by a desktop Claude session from the web portal roster page, or pasted on the
 * Roster tab. Character names must match the `character` field of shard items in the
 * value table (matching ignores case, spaces and punctuation).
 *
 * Schema:
 *   {
 *     updated: "2026-10-18T19:00:00Z",
 *     characters: {
 *       "Iron Man": { stars: 7, redStars: 5, gearTier: 17, level: 95 }
 *     }
 *   }
 */
window.MSF_ROSTER = null;
