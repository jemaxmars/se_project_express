const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.replace("Bearer ", "");
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }

  if (req.user && req.user._id) {
    return next();
  }

  return res.status(401).json({ message: "Authorization required" });
};
module.exports = auth;
