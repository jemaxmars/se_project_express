const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem"); // Note: singular 'clothingItem'
const auth = require("../middlewares/auth");

router.get("/", getItems); // Public - no auth needed
router.post("/", auth, createItem); // Protected - needs auth
router.delete("/:itemId", auth, deleteItem); // Protected - needs auth
router.put("/:itemId/likes", auth, likeItem); // Protected - needs auth
router.delete("/:itemId/likes", auth, dislikeItem); // Protected - needs auth

module.exports = router;
