import React, { useState } from "react";
import axios from "axios";

function Login({ onLoginSuccess }) {
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Account number = only digits, 4-12 characters
  const accountNumberRegex = /^[0-9]{4,12}$/;
  // Password = letters, numbers, special chars, 4-20 characters
  const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+]{4,20}$/;

  // Function when user clicks Login button
  const handleLogin = async () => {
    // Validate account number 
    if (!accountNumberRegex.test(accountNumber)) {
      setMessage("Invalid account number format");
      return;
    }

    // Validate password 
    if (!passwordRegex.test(password)) {
      setMessage("Invalid password format");
      return;
    }

    try {
      // Send login request to API
      const response = await axios.post("https://localhost:5000/login", {
        accountNumber,
        password
      });

      // Show message from backend
      const backendMessage = response.data.message;
      setMessage(backendMessage);

      // Call parent function if login successful
      if (backendMessage === "Login successful" && onLoginSuccess) {
        onLoginSuccess({ accountNumber });
      }
    } catch (err) {
      // Show error if backend request fails
      setMessage(err.response?.data?.message || "Something went wrong, try again later");
    }
  };

  // Render login form
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Customer Login</h1>

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
      
      <button onClick={handleLogin}>Login</button>

      <p>{message}</p>
    </div>
  );
}

export default Login;
