const router = require("express").Router();

// All user routes have been moved to app.js or will be replaced with authenticated routes
// POST /signup and POST /signin are now handled at the main app level
// GET routes for users are removed for security - users should not access other profiles

module.exports = router;
