const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { ERROR_MESSAGES } = require("../utils/errors");
const { UnauthorizedError } = require("./errorHandler");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  console.log("Authorization header:", req.headers.authorization);

  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return next(new UnauthorizedError(ERROR_MESSAGES.AUTHORIZATION_REQUIRED));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return next(new UnauthorizedError(ERROR_MESSAGES.INVALID_TOKEN));
  }
};

module.exports = auth;
