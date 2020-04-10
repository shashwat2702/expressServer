const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];
  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    req.token = token;
    next();
  } else {
    //If header is undefined return Forbidden (403)
    res.sendStatus(403);
  }
};

const generateToken = (emailId) => {
  return jwt.sign({ email: emailId }, "secretKey", {
    expiresIn: 30 * 60,
  });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, "secretKey");
    return Promise.resolve({ ...decoded, verified: true });
  } catch (err) {
    return Promise.resolve({
      verified: false,
    });
  }
};

module.exports = { checkToken, generateToken, verifyToken };
