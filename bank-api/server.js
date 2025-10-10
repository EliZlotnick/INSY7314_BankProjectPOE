const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const https = require("https");
const fs = require("fs");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(helmet()); 

// Rate limiting to prevent DDoS
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 100 
});
app.use(limiter);

// Temp Storage
let customers = [];
let payments = [];

// Registration
app.post("/api/register", async (req, res) => {
  const { fullName, idNumber, accountNumber, password } = req.body;

  // Input validation (whitelisting)
  if (!/^[A-Za-z\s'-]{2,100}$/.test(fullName)) return res.status(400).send("Bad name");
  if (!/^\d{13}$/.test(idNumber)) return res.status(400).send("Bad ID");
  if (!/^\d{8,20}$/.test(accountNumber)) return res.status(400).send("Bad account");
  if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(password)) return res.status(400).send("Weak password");

  // Password hashing + salting
  const hashedPassword = await bcrypt.hash(password, 12);
  customers.push({ fullName, idNumber, accountNumber, password: hashedPassword, role: "customer" });

  res.send("Registered successfully!");
});

// Login
app.post("/api/login", async (req, res) => {
  const { accountNumber, password } = req.body;
  const user = customers.find(c => c.accountNumber === accountNumber);

  if (!user) return res.status(400).send("Account not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).send("Wrong password");

  res.send(`Welcome ${user.fullName}!`);
});

// Add Payment
app.post("/api/payment", (req, res) => {
  const { accountNumber, amount, currency, provider, payeeAccount, swiftCode } = req.body;

  // Payment input validation
  if (!/^\d+(\.\d{1,2})?$/.test(amount)) return res.status(400).send("Invalid amount");
  if (!/^[A-Z]{3}$/.test(currency)) return res.status(400).send("Invalid currency");
  if (!/^[A-Za-z\s]+$/.test(provider)) return res.status(400).send("Invalid provider");
  if (!/^\d{8,20}$/.test(payeeAccount)) return res.status(400).send("Invalid payee account");
  if (!/^[A-Z]{6}[A-Z0-9]{2,5}$/.test(swiftCode)) return res.status(400).send("Invalid SWIFT code");

  payments.push({ accountNumber, amount, currency, provider, payeeAccount, swiftCode, status: "Pending" });
  res.send("Payment created successfully!");
});

// View Payment
app.get("/api/payments", (req, res) => {
  res.json(payments);
});

// Verify Payment
app.post("/api/verify", (req, res) => {
  const { index } = req.body;
  if (payments[index]) payments[index].status = "Verified";
  res.send("Payment verified!");
});

// Submit to SWIFT
app.post("/api/submit", (req, res) => {
  const { index } = req.body;
  if (payments[index]) payments[index].status = "Submitted to SWIFT";
  res.send("Payment submitted to SWIFT!");
});

// HTTPS Server
const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem")
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`HTTPS Server running on https://localhost:${PORT}`);
});
