const ClothingItem = require("../models/clothingItem");

// GET ALL ITEMS
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};

// CREATE ITEM
const createItem = (req, res) => {
  console.log(req.body);
  const { name, weather, imageUrl } = req.body;
  //using temporary value for now
  const owner = "507f1f77bcf86cd799439011"; // temp user ID

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      console.log(item);
      res.status(201).send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

// DELETE ITEM
const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then(() => res.status(200).send({ message: "Item deleted successfully" }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Item not found" });
      } else if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item ID format" });
      } else {
        return res.status(500).send({ message: err.message });
      }
    });
};

module.exports = { getItems, createItem, deleteItem };
