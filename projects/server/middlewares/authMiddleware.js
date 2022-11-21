const { validToken } = require("../lib/jwt");

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  console.log(token, "token");

  if (!token) {
    return res.status(401).json({
      message: "User is unauthorized",
    });
  }

  try {
    token = token.split(" ")[1];
    console.log(token, "TOKEN2222");

    const userVerify = validToken(token);
    console.log(userVerify, "userverify");

    if (!userVerify) {
      return res.status(401).json({
        message: "unauthorized request",
      });
    }

    req.user = userVerify;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "Token Error!",
    });
  }
};

module.exports = {
  verifyToken,
};
