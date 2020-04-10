// Main file that gets server up and running
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const userRouter = require("./routes/user");

// Constants
const PORT = 3000;

// Initialization
const app = express();

// Middleware to parse incoming request
app.options("*", cors());
app.use(bodyParser.json());

// List of routes to use
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);

// Default route returning 404
app.use(function (req, res, next) {
  res.status(404);

  // respond with json
  if (req.accepts("json")) {
    res.send({ error: "Route not found" });
    return;
  }

  // default to plain-text. send()
  res.type("txt").send("Not found");
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
