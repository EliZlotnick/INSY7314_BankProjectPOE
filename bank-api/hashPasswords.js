const bcrypt = require("bcrypt");

// plain passwords for static users before hash
const users = [
  { accountNumber: "123456", password: "pass123" },
  { accountNumber: "987654", password: "mypassword" },
];

users.forEach(async (user) => {
  const hash = await bcrypt.hash(user.password, 10);
  console.log(`${user.accountNumber} -> ${hash}`);
});
