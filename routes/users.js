const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getUsers,
  getUserById,
  createUser,
  getCurrentUser,
  updateCurrentUser,
} = require("../controllers/users");

// User routes
router.get("/", getUsers); // GET /users - get all users
router.get("/me", auth, getCurrentUser); // Add auth middleware
router.patch("/me", auth, updateCurrentUser); // PATCH /users/me - update current user
router.post("/", createUser); // POST /users - create user (signup)

module.exports = router;
