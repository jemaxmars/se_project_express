const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  BAD_REQUEST,
  SERVER_ERROR,
  CONFLICT,
  UNAUTHORIZED,
  ERROR_MESSAGES,
} = require("../utils/errors");

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

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  if (!name || !avatar || !email || !password) {
    return res.status(BAD_REQUEST).json({ message: "All fields are required" });
  }

  if (password.length < 8) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Password must be at least 8 characters" });
  }

  return User.create({ name, avatar, email, password })
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password;
      return res.status(201).json(userObject);
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

const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Email and password are required" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.json({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return res
          .status(UNAUTHORIZED)
          .json({ message: "Incorrect email or password" });
      }
      if (err.name === "ValidationError" || err.name === "CastError") {
        return res.status(BAD_REQUEST).json({ message: "Invalid data" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.INTERNAL_ERROR });
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json(user);
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
      return res
        .status(500)
        .json({ message: "An error occurred while fetching user" });
    });
};

const updateCurrentUser = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      console.error("Error updating user:", err);
      return res
        .status(500)
        .json({ message: "An error occurred while updating user" });
    });
};

module.exports = {
  getUsers,
  createUser,
  getCurrentUser,
  loginUser,
  updateCurrentUser,
};
