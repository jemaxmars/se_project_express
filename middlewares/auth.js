const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  "Authorization header:", req.headers.authorization;

  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ message: "Authorization required" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // Attach user info to request
    next();
  } catch (err) {
    return res.status(401).send({ message: "Invalid token" });
  }
};

module.exports = auth;
