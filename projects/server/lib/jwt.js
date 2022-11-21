const jwt = require("jsonwebtoken");

const SECRET_KEY = `${process.env.SECRET_KEY}`;

const signToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

module.exports = {
  signToken,
};