const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getCurrentUser,
  updateCurrentUser,
} = require("../controllers/users");

// Registration route
router.post("/signup", createUser);

// Login route
router.post("/signin", loginUser);

// Protected routes (require authentication middleware)
const auth = require("../middlewares/auth");
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateCurrentUser);
// ...other protected routes

module.exports = router;
