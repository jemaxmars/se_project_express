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
      // Convert to object and delete password
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
        return res
          .status(UNAUTHORIZED)
          .json({ message: "Invalid email or password" });
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
      res.json(user);
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
      res
        .status(500)
        .json({ message: "An error occurred while fetching user" });
    });
};

const updateCurrentUser = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body; // Only extract allowed fields

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      console.error("Error updating user:", err);
      res
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
