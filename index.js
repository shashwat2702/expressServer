const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const port = 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  const userName = req.query.username;
  console.log(userName);
  const token = jwt.sign({ foo: "bar" }, "shhhhh");
  res.json({ token, userName });
});

app.post("/", (req, res) => res.send("Got a POST request"));

app.put("/user", function (req, res) {
  res.send("Got a PUT request at /user");
});

app.delete("/user", function (req, res) {
  res.send("Got a DELETE request at /user");
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
