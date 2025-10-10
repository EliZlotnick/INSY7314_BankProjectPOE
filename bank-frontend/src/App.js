import React, { useState } from "react";
import Login from "./Login";
import Payment from "./Payment"; 

function App() {
  const [page, setPage] = useState("login"); // default page

  // Render page
  const renderPage = () => {
    switch (page) {
      case "register":
        return <Register />;
      case "login":
        return <Login />;
      case "payment":
        return <Payment />;
      default:
        return <Login />;
    }
  };

  return (
    <div>
      {/* Navigation buttons */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={() => setPage("register")}>Register</button>
        <button onClick={() => setPage("login")}>Login</button>
        <button onClick={() => setPage("payment")}>Payment</button>
      </div>

      {/* Page content */}
      {renderPage()}
    </div>
  );
}

// Register
function Register() {
  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch("https://localhost:3001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, idNumber, accountNumber, password }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        setMessage(`Error: ${errorText}`);
        return;
      }

      const text = await res.text();
      setMessage(text);
    } catch (err) {
      setMessage(`Error connecting to server: ${err.message}`);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Customer Registration</h1>
      <input
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      /><br /><br />
      <input
        placeholder="ID Number"
        value={idNumber}
        onChange={(e) => setIdNumber(e.target.value)}
      /><br /><br />
      <input
        placeholder="Account Number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      /><br /><br />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button onClick={handleRegister}>Register</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
