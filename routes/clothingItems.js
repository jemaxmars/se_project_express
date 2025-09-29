const express = require("express");
const router = express.Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");

// Protect these routes:
router.post("/", auth, createItem);
router.delete("/:itemId", auth, deleteItem); // <-- Use controller directly
router.put("/:itemId/likes", auth, likeItem);
router.delete("/:itemId/likes", auth, dislikeItem);

// Public route (if you want)
router.get("/", getItems);

module.exports = router;
