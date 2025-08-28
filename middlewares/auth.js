const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const auth = (req, res, next) => {
  // If user is already set by test middleware, skip JWT verification
  if (req.user && req.user._id) {
    return next();
  }

  // 1. Extract Authorization header
  const { authorization } = req.headers;
  // 2. Check if header exists
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization required" });
  }
  // 3. Remove "Bearer " prefix
  const token = authorization.replace("Bearer ", "");
  // 4. Verify JWT token
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
