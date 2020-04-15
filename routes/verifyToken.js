// Importing npm packages
const express = require("express");

const model = require("./../models");

// Importing helpers defined else where
const { checkToken, verifyToken } = require("../utility/tokenUtils");
const { userDetailsResponseObject } = require("../utility/responseUtils");

// Initialization
const router = express.Router();

/* GET detail of token owner */
router.get("/", checkToken, async (req, res, next) => {
  const token = await verifyToken(req.token);
  if (!token.verified) {
    return res.status(403).json({ message: "Token invalid" });
  }
  const { email } = token;
  const userDetail = await model.user.isEmailTaken(email);

  if (userDetail) {
    return res.status(200).json(userDetailsResponseObject(userDetail));
  }
  return res
    .status(422)
    .json({ messaage: "User owning this token does not exists.s" });
});

module.exports = router;
