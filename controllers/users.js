const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const { ERROR_MESSAGES } = require("../utils/errors");
const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
  InternalServerError,
} = require("../middlewares/errorHandler");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  if (!name || !avatar || !email || !password) {
    return next(new BadRequestError(ERROR_MESSAGES.ALL_FIELDS_REQUIRED));
  }

  if (password.length < 8) {
    return next(new BadRequestError(ERROR_MESSAGES.PASSWORD_TOO_SHORT));
  }

  return User.create({ name, avatar, email, password })
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password;
      return res.status(201).json(userObject);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(ERROR_MESSAGES.EMAIL_EXISTS));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError(ERROR_MESSAGES.INVALID_DATA));
      }
      return next(new InternalServerError(ERROR_MESSAGES.INTERNAL_ERROR));
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError(ERROR_MESSAGES.EMAIL_PASSWORD_REQUIRED));
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
        return next(
          new UnauthorizedError(ERROR_MESSAGES.INCORRECT_CREDENTIALS)
        );
      }
      if (err.name === "ValidationError" || err.name === "CastError") {
        return next(new BadRequestError(ERROR_MESSAGES.INVALID_DATA));
      }
      return next(new InternalServerError(ERROR_MESSAGES.INTERNAL_ERROR));
    });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND));
      }
      return res.json(user);
    })
    .catch(() => next(new InternalServerError(ERROR_MESSAGES.INTERNAL_ERROR)));
};

const updateCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND));
      }
      return res.json(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError(ERROR_MESSAGES.INVALID_DATA));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError(ERROR_MESSAGES.INVALID_USER_ID));
      }
      return next(new InternalServerError(ERROR_MESSAGES.INTERNAL_ERROR));
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  loginUser,
  updateCurrentUser,
};
