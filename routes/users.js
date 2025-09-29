const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getCurrentUser,
  updateCurrentUser,
} = require("../controllers/users");

router.post("/signup", createUser);

router.post("/signin", loginUser);

const auth = require("../middlewares/auth");
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateCurrentUser);

module.exports = router;
