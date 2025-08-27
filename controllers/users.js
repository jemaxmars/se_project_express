const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  CONFLICT,
  UNAUTHORIZED,
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
        .status(SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_ERROR });
    });
};

// CREATE USER (SIGNUP)
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  // Check if all required fields are provided
  if (!name || !avatar || !email || !password) {
    return res.status(BAD_REQUEST).json({ message: "All fields are required" });
  }

  // Check password length
  if (password.length < 8) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Password must be at least 8 characters" });
  }

  // Create user (password will be hashed by the pre-save hook)
  return User.create({ name, avatar, email, password })
    .then((user) => {
      const { password: userPassword, ...userWithoutPassword } =
        user.toObject();
      return res.status(201).json(userWithoutPassword);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(CONFLICT).json({ message: "Email already exists" });
      }
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_ERROR });
    });
};

// LOGIN USER (SIGNIN)
const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Email and password are required" });
  }

  return User.findUserByCredentials(email, password) // Use custom method
    .then((user) => {
      // Create JWT token
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      // Send token to client
      return res.json({ token });
    })
    .catch((err) => {
      if (err.name === "SomeSpecificError") {
        return res.status(UNAUTHORIZED).json({ message: "Invalid email or password" });
      }
      return res.status(SERVER_ERROR).send({ message: ERROR_MESSAGES.INTERNAL_ERROR });
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
        .status(SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_ERROR });
    });
};

module.exports = { getUsers, createUser, getUser, loginUser };
