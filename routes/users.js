const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getUsers,
  createUser,
  getCurrentUser,
} = require("../controllers/users");

// User routes
router.get("/", getUsers); // GET /users - get all users
router.get("/me", auth, getCurrentUser); // GET /users/me - get current user
router.post("/", createUser); // POST /users - create user (signup)

module.exports = router;
