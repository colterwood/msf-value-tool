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
  updated: null,
  source: null,
  offers: []
};
