const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");

router.get("/", getItems);                    // Public - no auth needed
router.post("/", auth, createItem);           // Protected - needs auth
router.delete("/:itemId", auth, deleteItem);  // Protected - needs auth

module.exports = router;
