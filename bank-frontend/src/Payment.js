import React, { useState } from "react";

function Payment() {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [provider, setProvider] = useState("SWIFT");
  const [payeeAccount, setPayeeAccount] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    try {
      const res = await fetch("https://localhost:3001/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountNumber, amount, currency, provider, payeeAccount, swiftCode }),
      });
      const text = await res.text();
      setMessage(text);
    } catch (err) {
      setMessage("Error submitting payment");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Make a Payment</h1>
      <input placeholder="Your Account Number" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} /><br /><br />
      <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} /><br /><br />
      <select value={currency} onChange={e => setCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="ZAR">ZAR</option>
      </select><br /><br />
      <input placeholder="Provider" value={provider} onChange={e => setProvider(e.target.value)} /><br /><br />
      <input placeholder="Payee Account Number" value={payeeAccount} onChange={e => setPayeeAccount(e.target.value)} /><br /><br />
      <input placeholder="SWIFT Code" value={swiftCode} onChange={e => setSwiftCode(e.target.value)} /><br /><br />
      <button onClick={handlePayment}>Submit Payment</button>
      <p>{message}</p>
    </div>
  );
}

export default Payment;
