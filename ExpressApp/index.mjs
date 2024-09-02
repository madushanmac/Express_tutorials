import express, { response } from "express";

const app = express();
const mockUsers = [
  { id: 1, username: "chamindu", displyName: "mac" },
  { id: 2, username: "madushan", displyName: "dev" },
  { id: 3, username: "lakshan", displyName: "junny" },
];

app.get("/test", (req, res) => {
  res.json({ msg: "Hello, this is the test route" });
});

app.get("/api/users/:id", (req, res) => {
  const parseId = parseInt(req.params.id); // Convert id to parseInt
  if (isNaN(parseId)) return res.status(401).send({ msg: "Bad Request" });

  const findUsers = mockUsers.find((user) => user.id === parseId);
  if (!mockUsers || !findUsers)
    return res.status(401).send({ msg: "users empty" });
  return res.status(201).json(findUsers);
});

app.get("/api/users/", (req, res) => {
  // const parseId = parseInt(req.params.id); // Convert id to parseInt
  // if (isNaN(parseId)) return res.status(401).send({ msg: "Bad Request" });

  console.log(req.query);

  const {
    query: { filter, value },
  } = req;

  if (filter && value)
    return res.json(mockUsers.filter((user) => user[filter].includes(value)));
  return res.json(mockUsers);
});

app.get("/api/products/", (req, res) => {
  const products = [
    { id: 100, productName: "Solor", price: 2500.0 },
    { id: 200, productName: "Malcl", price: 5500.0 },
    { id: 300, productName: "RedRum", price: 9500.0 },
  ];

  res.json(products);
});

// Start the server
app
  .listen(4000, () => {
    console.log("Server is running on PORT 4000");
  })
  .on("error", (err) => {
    console.error("Server failed to start:", err);
  });
