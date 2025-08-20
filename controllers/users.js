const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  ERROR_MESSAGES,
} = require("../utils/errors");

// GET USERS
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_ERROR });
    });
};

// CREATE USER
const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_ERROR });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occurred while executing the code`
      );
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: ERROR_MESSAGES.USER_NOT_FOUND });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: ERROR_MESSAGES.INVALID_USER_ID });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_ERROR });
    });
};

module.exports = { getUsers, createUser, getUser };
