"use strict";

// Server-side service: its only job is calculating roommate shares.
class ShareCalculator {
  calculateEqualShares(items, roommates) {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    const amountPerRoommate = total / roommates.length;

    return {
      total,
      shares: roommates.map((roommate) => ({
        roommateName: roommate.name,
        amountOwed: amountPerRoommate,
      })),
    };
  }
}

module.exports = ShareCalculator;
