const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUser,
  loginUser,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/signup", createUser);
router.post("/signin", loginUser);

module.exports = router;
