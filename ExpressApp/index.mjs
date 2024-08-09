import express from "express";

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
  //res.status(200).json(mockUsers);
  const parseId = parseInt(req.params.id); // Convert id to parseInt
  if (isNaN(parseId)) return res.status(401).send({ msg: "Bad Request" });

  const findUsers = mockUsers.find((user) => user.id === parseId);
  if (!mockUsers || !findUsers)
    return res.status(401).send({ msg: "Users Empty " });
  return res.status(201).send(findUsers);
});

// Start the server
app
  .listen(4000, () => {
    console.log("Server is running on PORT 4000");
  })
  .on("error", (err) => {
    console.error("Server failed to start:", err);
  });
