"use strict";

const express = require("express");
const cors = require("cors");
const multer = require("multer");

const ReceiptReader = require("./services/ReceiptReader");
const ShareCalculator = require("./services/ShareCalculator");
const CreateBillService = require("./services/CreateBillService");
const BillRepository = require("./models/BillRepository");

const app = express();
const port = 3000;

// Allow the React app, normally on port 5173, to call this backend.
app.use(cors({ origin: "http://localhost:5173" }));

// This lets Express receive the receipt-photo upload.
const upload = multer({ storage: multer.memoryStorage() });

// Create the focused services once when the server starts.
const receiptReader = new ReceiptReader();
const shareCalculator = new ShareCalculator();
const billRepository = new BillRepository();

const createBillService = new CreateBillService(
  receiptReader,
  shareCalculator,
  billRepository,
);

// React sends its receipt photo to this route.
app.post(
  "/api/bills/from-receipt",
  upload.single("receiptPhoto"),
  async (request, response) => {
    if (!request.file) {
      response.status(400).json({ error: "A receipt photo is required." });
      return;
    }

    // Temporary class-example data.
    // Later, React could send roommate IDs instead.
    const roommates = [{ name: "Maya" }, { name: "Jordan" }, { name: "Priya" }];

    const receiptPhoto = {
      fileName: request.file.originalname,
      fakeImageBytes: request.file.buffer,
    };

    const bill = await createBillService.createFromReceiptPhoto(
      receiptPhoto,
      roommates,
    );

    response.status(201).json(bill);
  },
);

app.get("/api/bills", async (request, response) => {
  const bills = await billRepository.findAll();
  response.json(bills);
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
