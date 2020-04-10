// Importing npm packages
const express = require("express");
const { body, check, validationResult } = require("express-validator");

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
const createUser = async (body) => {
  return await model.user.registerUser({
    inputEmail: body.email,
    inputFirstName: body.firstName,
    inputLastName: body.lastName,
    inputPassword: body.password,
  });
};

const createUserValidationRules = [
  body("email")
    .isEmail()
    .custom((value) => {
      return model.user.isEmailTaken(value).then((user) => {
        if (user) {
          return Promise.reject("Email already in use");
        }
      });
    }),
  check("firstName").isAlphanumeric().optional(),
  check("lastName").isAlphanumeric().optional(),
  check("password").isLength({ min: 6 }),
];

/* POST signup API */
router.post("/", createUserValidationRules, async (req, res, next) => {
  const validationCheckResult = validationResult(req).array();

  if (validationCheckResult.length !== 0) {
    return res.status(422).json({
      message: getInvalidRequestParamErrorMessage(validationCheckResult[0]),
    });
  }

  const newUser = await createUser(req.body);

  return res.status(201).json({
    ...userDetailsResponseObject(newUser),
    token: generateToken(newUser.email),
  });
});

module.exports = router;
