"use strict";

// BorrowableItem is the parent class for physical items that a student can
// check out and later return, such as a board game or cooking tool.
class BorrowableItem {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.borrowedBy = null;
  }

  isAvailable() {
    return this.borrowedBy === null;
  }

  startLoan(student) {
    if (!this.isAvailable()) {
      throw new Error(`${this.name} is already checked out.`);
    }

    this.borrowedBy = student;
    console.log(`${student.name} checked out ${this.name}.`);
  }

  returnItem() {
    if (this.isAvailable()) {
      throw new Error(`${this.name} is not currently checked out.`);
    }

    console.log(`${this.borrowedBy.name} returned ${this.name}.`);
    this.borrowedBy = null;
  }
}

module.exports = BorrowableItem;
