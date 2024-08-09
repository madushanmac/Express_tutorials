require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT;
const app = express();

const mockUsers = [
  { id: 1, username: "chamindu", displyName: "mac" },
  { id: 2, username: "madushan", displyName: "dev" },
  { id: 3, username: "lakshan", displyName: "junny" },
];

app.get("/api/users/", (req, res) => {
  res.send(mockUsers);
});

app.get("/api/users/:id", (req, res) => {
  console.log(req.params);

  const parseId = parseInt(req.params.id);
  // derectly retuens number and if i request nan , return NAN(Not a Number)
  if (isNaN(parseId))
    return res.status(400).send({ msg: "Bad Request. invalid ID: " });

  // find user.
  const findUser = mockUsers.find((user) => user.id === parseId);
  if (!mockUsers) return res.sendStatus(404);
  return res.status(201).send(findUser);
});

// Start the Sever on port
app.listen(PORT || 4000, (err) => {
  if (err) {
    console.error(`Failed to start server on PORT ${PORT}:`, err);
    process.exit(1);
  } else {
    console.log(`Server running on PORT ${PORT}`);
  }
});

// localhost:4000
// localhost:4000/users
// localhost:4000/products
