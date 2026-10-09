"use strict";

// Server-side service: its only job is extracting items from a receipt photo.
class ReceiptReader {
  async extractItems(receiptPhoto) {
    console.log(`Reading receipt photo: ${receiptPhoto.fileName}`);

    // Replace this with an OCR service later.
    return [
      { name: "Milk", price: 4 },
      { name: "Pasta", price: 3 },
      { name: "Apples", price: 5 },
    ];
  }
}

module.exports = ReceiptReader;
