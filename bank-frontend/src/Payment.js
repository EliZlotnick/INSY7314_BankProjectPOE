import React, { useState } from "react";

function Payment() {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [provider, setProvider] = useState("SWIFT");
  const [payeeAccount, setPayeeAccount] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [message, setMessage] = useState("");

  // RegEx patterns
  const accountRegex = /^[0-9]{4,12}$/;
  const amountRegex = /^\d+(\.\d{1,2})?$/;
  const swiftRegex = /^[A-Z]{6,11}$/;

  const handlePayment = () => {
    if (!accountNumber || !amount || !payeeAccount || !swiftCode) {
      setMessage("Please fill in all required fields");
      return;
    }

    if (!accountRegex.test(accountNumber)) {
      setMessage("Invalid account number format");
      return;
    }
    if (!accountRegex.test(payeeAccount)) {
      setMessage("Invalid payee account format");
      return;
    }
    if (!amountRegex.test(amount)) {
      setMessage("Invalid amount format");
      return;
    }
    if (!swiftRegex.test(swiftCode)) {
      setMessage("Invalid SWIFT code format");
      return;
    }

    setMessage(`Payment of ${amount} ${currency} submitted from account ${accountNumber} to ${payeeAccount} via ${provider} (SWIFT: ${swiftCode})`);
  };


  const pageStyle = 
  {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "60px",
    marginTop: "50px",
  };

  const formContainerStyle = 
  {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const exampleBoxStyle = 
  {
    color: "grey",
    maxWidth: "200px",
    lineHeight: "1.6",
    textAlign: "left",
    alignSelf: "center", 
    marginTop: "0px",
  };


  return (
    <div style={pageStyle}>
      <div style={formContainerStyle}>
        <h1>Make a Payment</h1>
        <input
          placeholder="Your Account Number"
          value={accountNumber}
          onChange={e => setAccountNumber(e.target.value)}
        /><br /><br />
        <input
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        /><br /><br />
        <select value={currency} onChange={e => setCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="ZAR">ZAR</option>
        </select><br /><br />
        <input
          placeholder="Provider"
          value={provider}
          onChange={e => setProvider(e.target.value)}
        /><br /><br />
        <input
          placeholder="Payee Account Number"
          value={payeeAccount}
          onChange={e => setPayeeAccount(e.target.value)}
        /><br /><br />
        <input
          placeholder="SWIFT Code"
          value={swiftCode}
          onChange={e => setSwiftCode(e.target.value)}
        /><br /><br />
        <button onClick={handlePayment}>Submit Payment</button>
        <p>{message}</p>
      </div>

      {/* Example SWIFT codes */}
      <div style={exampleBoxStyle}>
        <h3>Example SWIFT Codes</h3>
        <p>HSBC: HSBCHKHH</p>
        <p>Standard Bank: SBZAZAJJ</p>
      </div>
    </div>
  );
}

export default Payment;
