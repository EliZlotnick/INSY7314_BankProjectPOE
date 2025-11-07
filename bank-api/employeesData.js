// Storing static employee accounts safely

// password: hashed version of the real password
const employees = [
  { username: "alice", password: "$2b$10$EXAMPLEHASH1" },
  { username: "bob", password: "$2b$10$EXAMPLEHASH2" }
];

module.exports = employees;