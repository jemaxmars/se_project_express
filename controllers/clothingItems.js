const ClothingItem = require("../models/clothingItem");
const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  InternalServerError,
  ERROR_MESSAGES,
} = require("../middlewares/errorHandler");

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(() => next(new InternalServerError(ERROR_MESSAGES.INTERNAL_ERROR)));
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.status(201).send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError(ERROR_MESSAGES.INVALID_DATA));
      }
      return next(new InternalServerError(ERROR_MESSAGES.INTERNAL_ERROR));
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (!item.owner) {
        return next(new ForbiddenError(ERROR_MESSAGES.FORBIDDEN_DELETE));
      }

      if (item.owner.toString() !== userId.toString()) {
        return next(new ForbiddenError(ERROR_MESSAGES.ACCESS_DENIED));
      }

      return ClothingItem.findByIdAndDelete(itemId).then(() =>
        res.status(200).send({ message: "Item deleted successfully" })
      );
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError(ERROR_MESSAGES.ITEM_NOT_FOUND));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError(ERROR_MESSAGES.INVALID_ITEM_ID));
      }
      return next(new InternalServerError(ERROR_MESSAGES.INTERNAL_ERROR));
    });
};

const likeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (!item.owner) {
        return next(new ForbiddenError(ERROR_MESSAGES.ITEM_UNAVAILABLE));
      }
      return ClothingItem.findByIdAndUpdate(
        itemId,
        { $addToSet: { likes: userId } },
        { new: true }
      );
    })
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError(ERROR_MESSAGES.ITEM_NOT_FOUND));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError(ERROR_MESSAGES.INVALID_ITEM_ID));
      }
      return next(new InternalServerError(ERROR_MESSAGES.INTERNAL_ERROR));
    });
};

const dislikeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      if (!item.owner) {
        return next(new BadRequestError(ERROR_MESSAGES.ITEM_UNAVAILABLE));
      }
      return res.status(200).send(item);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError(ERROR_MESSAGES.ITEM_NOT_FOUND));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError(ERROR_MESSAGES.INVALID_ITEM_ID));
      }
      return next(new InternalServerError(ERROR_MESSAGES.INTERNAL_ERROR));
    });
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
