const router = require("express").Router();
const { getUsers, createUser, getUser } = require("../controllers/users");

// User routes
router.get("/", getUsers); // GET /users - get all users
router.get("/:userId", getUser); // GET /users/:userId - get user by ID
router.post("/", createUser); // POST /users - create user (signup)

module.exports = router;
