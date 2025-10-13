const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getCurrentUser,
  updateCurrentUser,
} = require("../controllers/users");
const {
  validateCreateUser,
  validateUserLogin,
} = require("../middlewares/validation");

router.post("/signup", validateCreateUser, createUser);
router.post("/signin", validateUserLogin, loginUser);

const auth = require("../middlewares/auth");
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateCurrentUser);

module.exports = router;
