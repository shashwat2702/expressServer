// Importing npm packages
const express = require("express");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

// Importing helpers defined else where
const {
  getInvalidRequestParamErrorMessage,
} = require("../utility/requestUtils");

// Initialization
const router = express.Router();

// Helper methods utilized in this module
const validationRules = [
  check("email").isEmail(),
  check("password").isLength({ min: 6 }),
  check("username").isAlphanumeric(),
];

/* GET signup page. */
router.get("/", (req, res, next) => {
  return res.json({ message: "Page is not built yet" });
});

/* POST signup page. */
router.post("/", validationRules, (req, res, next) => {
  const validationCheckResult = validationResult(req).array();
  console.log(validationCheckResult);
  if (validationCheckResult.length !== 0) {
    return res.status(422).json({
      message: getInvalidRequestParamErrorMessage(validationCheckResult[0]),
    });
  }
  const token = jwt.sign({ foo: "bar" }, "shhhhh");
  return res.json({ userName: req.body.username, token });
});

module.exports = router;
