import { useState } from "react";

// React component: its only job is collecting a photo and sending it to the API.
export default function ReceiptUploadScreen() {
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState("");
  const [amountsByUser, setAmountsByUser] = useState([]);

  async function uploadReceipt() {
    if (!photo) {
      setMessage("Choose a receipt photo first.");
      return;
    }

    const formData = new FormData();
    formData.append("receiptPhoto", photo);

    const response = await fetch(
      "http://localhost:3000/api/bills/from-receipt",
      {
        method: "POST",
        body: formData,
      },
    );

    const bill = await response.json();
    setMessage(`Bill ${bill.id} created. Total: $${bill.total}`);
  }

  async function showBillsByUser() {
    const response = await fetch("http://localhost:3000/api/bills");
    const bills = await response.json();
    const totals = {};

    // Each bill has a shares array. Add a roommate's amount from every bill.
    for (const bill of bills) {
      for (const share of bill.shares) {
        const currentTotal = totals[share.roommateName] ?? 0;
        totals[share.roommateName] = currentTotal + share.amountOwed;
      }
    }

    const userTotals = Object.entries(totals).map(([name, amountOwed]) => ({
      name,
      amountOwed,
    }));

    setAmountsByUser(userTotals);
  }

  return (
    <section>
      <h2>Upload a grocery receipt</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(event) => setPhoto(event.target.files[0])}
      />
      <div className="action-row">
        <button onClick={uploadReceipt}>Create bill</button>
        <button className="secondary-button" onClick={showBillsByUser}>
          Show bills by each user
        </button>
      </div>
      <p>{message}</p>

      {amountsByUser.length > 0 && (
        <div className="amounts-due">
          <h3>Amounts due</h3>
          <ul>
            {amountsByUser.map((user) => (
              <li key={user.name}>
                <span>{user.name}</span>
                <strong>${user.amountOwed.toFixed(2)}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
