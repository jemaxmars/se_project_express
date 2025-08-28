const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getUsers,
  createUser,
  getCurrentUser,
  updateCurrentUser,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateCurrentUser);
router.post("/", createUser);

module.exports = router;
