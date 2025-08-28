const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { NOT_FOUND, ERROR_MESSAGES } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: ERROR_MESSAGES.DOCUMENT_NOT_FOUND });
});

module.exports = router;
