"use strict";

// This service coordinates the focused modules. It does not read images,
// calculate the splitting rules, or store database records itself.
class CreateBillService {
  constructor(receiptReader, shareCalculator, billRepository) {
    this.receiptReader = receiptReader;
    this.shareCalculator = shareCalculator;
    this.billRepository = billRepository;
  }

  async createFromReceiptPhoto(receiptPhoto, roommates) {
    const items = await this.receiptReader.extractItems(receiptPhoto);
    const { total, shares } = this.shareCalculator.calculateEqualShares(
      items,
      roommates,
    );

    const bill = {
      id: `bill-${Date.now()}`,
      items,
      total,
      shares,
    };

    return this.billRepository.save(bill);
  }
}

module.exports = CreateBillService;
