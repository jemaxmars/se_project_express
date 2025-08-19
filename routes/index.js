const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");

router.use("/users", userRouter);
router.use("/items", itemRouter);

// handle nonexistent resources
router.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;
