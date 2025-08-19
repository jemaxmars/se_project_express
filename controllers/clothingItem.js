const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
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
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_ERROR });
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
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      } else {
        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: ERROR_MESSAGES.INTERNAL_ERROR });
      }
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
      } else if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.INVALID_ITEM_ID });
      } else {
        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: ERROR_MESSAGES.INTERNAL_ERROR });
      }
    });
};

// LIKE ITEM
const likeItem = (req, res) => {
  const { itemId } = req.params;
  // TODO: Replace with actual user ID from req.user._id when authentication is implemented
  const userId = "507f1f77bcf86cd799439011"; // Temporary user ID

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
      } else if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.INVALID_ITEM_ID });
      } else {
        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: ERROR_MESSAGES.INTERNAL_ERROR });
      }
    });
};

// UNLIKE ITEM
const dislikeItem = (req, res) => {
  const { itemId } = req.params;
  // TODO: Replace with actual user ID from req.user._id when authentication is implemented
  const userId = "507f1f77bcf86cd799439011"; // Temporary user ID

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
      } else if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.INVALID_ITEM_ID });
      } else {
        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: ERROR_MESSAGES.INTERNAL_ERROR });
      }
    });
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
