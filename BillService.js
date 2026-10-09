"use strict";

// BillService.js
// INTENTIONALLY OVERLOADED EXAMPLE
// This class is an example of a service class that does too many jobs.
// It violates the Single Responsibility Principle.

class BillService {
  async createBillFromReceiptPhoto(receiptPhoto, roommates) {
    // Job 1: Read an uploaded image file.
    const imageBytes = this.readImage(receiptPhoto);

    // Job 2: Use receipt-reading logic to identify grocery items.
    const groceryItems = this.identifyGroceryItems(imageBytes);

    // Job 3: Calculate how much each roommate owes.
    const shares = this.calculateShares(groceryItems, roommates);

    const bill = {
      id: `bill-${Date.now()}`,
      items: groceryItems,
      shares,
    };

    // Job 4: Save the bill to storage.
    this.saveBill(bill);

    // Job 5: Build the response data for the React screen.
    const screenData = this.createScreenData(bill);

    // Job 6: Send reminders to roommates.
    this.sendReminders(roommates, shares);

    return screenData;
  }

  readImage(receiptPhoto) {
    console.log(`Reading uploaded receipt photo: ${receiptPhoto.fileName}`);
    return receiptPhoto.fakeImageBytes;
  }

  identifyGroceryItems(imageBytes) {
    console.log(`Identifying items from image data: ${imageBytes}`);

    // Pretend an OCR tool found these items in the receipt image.
    return [
      { name: "Milk", price: 4 },
      { name: "Pasta", price: 3 },
      { name: "Apples", price: 5 },
    ];
  }

  calculateShares(groceryItems, roommates) {
    const total = groceryItems.reduce((sum, item) => sum + item.price, 0);
    const amountPerRoommate = total / roommates.length;

    console.log(`Splitting $${total} among ${roommates.length} roommates.`);

    return roommates.map((roommate) => ({
      roommateName: roommate.name,
      amountOwed: amountPerRoommate,
    }));
  }

  saveBill(bill) {
    // Pretend this writes to a database.
    console.log(`Saving ${bill.id} to the database.`);
  }

  createScreenData(bill) {
    // Pretend this is JSON returned to the React app.
    return {
      heading: "Bill created",
      billId: bill.id,
      total: bill.items.reduce((sum, item) => sum + item.price, 0),
      shares: bill.shares,
    };
  }

  sendReminders(roommates, shares) {
    for (const roommate of roommates) {
      const share = shares.find((item) => item.roommateName === roommate.name);
      console.log(
        `Sending reminder to ${roommate.name}: you owe $${share.amountOwed}.`,
      );
    }
  }
}

// Test data for the teaching example.
const receiptPhoto = {
  fileName: "grocery-receipt.jpg",
  fakeImageBytes: "pretend-image-data",
};

const roommates = [{ name: "Maya" }, { name: "Jordan" }, { name: "Priya" }];

async function runDemo() {
  const billService = new BillService();
  const screenData = await billService.createBillFromReceiptPhoto(
    receiptPhoto,
    roommates,
  );

  console.log("\nData sent back to the React screen:");
  console.log(screenData);
}

runDemo();
