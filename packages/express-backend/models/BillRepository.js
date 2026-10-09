"use strict";

// Repository: its only job is storing and retrieving bill data.
class BillRepository {
  constructor() {
    this.savedBills = [];
  }

  async save(bill) {
    this.savedBills.push(bill);
    console.log(`Saved ${bill.id}.`);
    return bill;
  }

  async findAll() {
    return this.savedBills;
  }
}

module.exports = BillRepository;
