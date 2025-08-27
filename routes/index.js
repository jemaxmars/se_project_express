const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { NOT_FOUND, ERROR_MESSAGES } = require("../utils/errors");
const auth = require("../middlewares/auth");

router.use("/users", userRouter);
router.use("/items", itemRouter);
router.get("/protected-route", auth, (req, res) => {
  res.send("This is a protected route");
});

// handle nonexistent resources
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: ERROR_MESSAGES.DOCUMENT_NOT_FOUND });
});

module.exports = router;
