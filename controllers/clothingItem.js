const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  ERROR_MESSAGES,
} = require("../utils/errors");

// GET ALL ITEMS
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      return res
        .status(SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_ERROR });
    });
};

// CREATE ITEM
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id; // Use authenticated user's ID

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(201).send(item);
    })
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "An error has occurred on the server." });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_ERROR });
    });
};

// DELETE ITEM
const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then(() => res.status(200).send({ message: "Item deleted successfully" }))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: ERROR_MESSAGES.ITEM_NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.INVALID_ITEM_ID });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_ERROR });
    });
};

// LIKE ITEM
const likeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id; // Use authenticated user's ID

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: ERROR_MESSAGES.ITEM_NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.INVALID_ITEM_ID });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_ERROR });
    });
};

// UNLIKE ITEM
const dislikeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id; // Use authenticated user's ID

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } }, // remove _id from the array
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: ERROR_MESSAGES.ITEM_NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.INVALID_ITEM_ID });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_ERROR });
    });
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
