const router = require("express").Router();
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const {
  validateUserLogin,
  validateCreateUser,
} = require("../middlewares/validation"); // Add validateCreateUser
const { loginUser, createUser } = require("../controllers/users"); // Add createUser

// Direct auth routes (no /users prefix)
router.post("/signin", validateUserLogin, loginUser);
router.post("/signup", validateCreateUser, createUser); // Now this will work

// Other routes with prefixes
router.use("/users", userRoutes);
router.use("/items", itemRoutes);

module.exports = router;
