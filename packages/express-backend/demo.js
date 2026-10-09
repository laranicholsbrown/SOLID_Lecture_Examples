"use strict";

const ReceiptReader = require("./services/ReceiptReader");
const ShareCalculator = require("./services/ShareCalculator");
const CreateBillService = require("./services/CreateBillService");
const BillRepository = require("./models/BillRepository");

const receiptReader = new ReceiptReader();
const shareCalculator = new ShareCalculator();
const billRepository = new BillRepository();
const createBillService = new CreateBillService(
  receiptReader,
  shareCalculator,
  billRepository,
);

const receiptPhoto = { fileName: "grocery-receipt.jpg" };
const roommates = [{ name: "Maya" }, { name: "Jordan" }, { name: "Priya" }];

async function runDemo() {
  const bill = await createBillService.createFromReceiptPhoto(
    receiptPhoto,
    roommates,
  );

  console.log("\nCreated bill:");
  console.log(bill);
}

runDemo();
