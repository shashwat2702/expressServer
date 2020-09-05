// Importing npm packages
const express = require("express");
const { check, validationResult } = require("express-validator");

const model = require("./../models");

// Importing helpers defined else where
const { generateToken } = require("../utility/tokenUtils");
const { userDetailsResponseObject } = require("../utility/responseUtils");
const {
  getInvalidRequestParamErrorMessage,
} = require("../utility/requestUtils");

// Initialization
const router = express.Router();

// Helper methods utilized in this module
const authenticateUser = async (body) => {
  return await model.user.checkCredential(body.email, body.password);
};

const loginUserValidationRules = [
  check("email").isEmail(),
  check("password").isLength({ min: 6 }),
];

/* POST login API */
router.post("/", loginUserValidationRules, async (req, res, next) => {
  const validationCheckResult = validationResult(req).array();

  if (validationCheckResult.length !== 0) {
    return res.status(422).json({
      message: getInvalidRequestParamErrorMessage(validationCheckResult[0]),
    });
  }

  const userDetail = await authenticateUser(req.body);
  if (userDetail) {
    return res.status(200).json({
      ...userDetailsResponseObject(userDetail),
      token: generateToken(userDetail.email),
    });
  } else {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }
});

module.exports = router;
