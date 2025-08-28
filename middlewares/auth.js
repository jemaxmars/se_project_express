const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const auth = (req, res, next) => {
  // 1. Extract Authorization header
  const { authorization } = req.headers;

  // If there's an Authorization header, use JWT verification instead of hardcoded user
  if (authorization && authorization.startsWith("Bearer ")) {
    // 3. Remove "Bearer " prefix
    const token = authorization.replace("Bearer ", "");
    // 4. Verify JWT token
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload; // Override any existing req.user with JWT payload
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }

  // If no Authorization header but user is set by test middleware, allow it
  if (req.user && req.user._id) {
    return next();
  }

  // 2. No auth header and no existing user - require authorization
  return res.status(401).json({ message: "Authorization required" });
};

module.exports = auth;
