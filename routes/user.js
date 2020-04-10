// Importing npm packages
const express = require("express");
const { check, validationResult } = require("express-validator");

const model = require("./../models");

// Importing helpers defined else where
const { checkToken, verifyToken } = require("../utility/tokenUtils");
const { userDetailsResponseObject } = require("../utility/responseUtils");
const {
  getInvalidRequestParamErrorMessage,
} = require("../utility/requestUtils");

// Initialization
const router = express.Router();

// Helper methods utilized in this module
const userDeatilValidationRules = [check("userId").isNumeric()];

/* GET list of users */
router.get(
  "/",
  checkToken,
  userDeatilValidationRules,
  async (req, res, next) => {
    const token = await verifyToken(req.token);
    if (!token.verified) {
      return res.status(403).json({ message: "Token invalid" });
    }
    const validationCheckResult = validationResult(req).array();

    if (validationCheckResult.length !== 0) {
      return res.status(422).json({
        message: getInvalidRequestParamErrorMessage(validationCheckResult[0]),
      });
    }

    const userDetail = await model.user.findById(req.params.userId);

    return res.status(200).json(userDetailsResponseObject(userDetail));
  }
);

/* GET single user API */
router.get(
  "/:userId",
  checkToken,
  userDeatilValidationRules,
  async (req, res, next) => {
    const token = await verifyToken(req.token);
    if (!token.verified) {
      return res.status(403).json({ message: "Token invalid" });
    }
    const validationCheckResult = validationResult(req).array();

    if (validationCheckResult.length !== 0) {
      return res.status(422).json({
        message: getInvalidRequestParamErrorMessage(validationCheckResult[0]),
      });
    }

    const userDetail = await model.user.findById(req.params.userId);

    return res.status(200).json(userDetailsResponseObject(userDetail));
  }
);

module.exports = router;
