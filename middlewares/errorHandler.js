// Custom Error Classes
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

// Error Messages Object
const ERROR_MESSAGES = {
  INTERNAL_ERROR: "An error occurred on the server",
  INVALID_DATA: "Invalid data provided",
  FORBIDDEN_DELETE: "Cannot delete item without owner",
  ACCESS_DENIED: "Access denied",
  ITEM_NOT_FOUND: "Item not found",
  INVALID_ITEM_ID: "Invalid item ID format",
  ITEM_UNAVAILABLE: "This item is currently unavailable for interaction",

  // User-related messages
  ALL_FIELDS_REQUIRED: "All fields are required",
  PASSWORD_TOO_SHORT: "Password must be at least 8 characters",
  EMAIL_EXISTS: "Email already exists",
  EMAIL_PASSWORD_REQUIRED: "Email and password are required",
  INCORRECT_CREDENTIALS: "Incorrect email or password",
  USER_NOT_FOUND: "User not found",
  INVALID_USER_ID: "Invalid user ID",

  // Auth-related messages
  AUTHORIZATION_REQUIRED: "Authorization required",
  INVALID_TOKEN: "Invalid token",
};

// Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  console.error(err);

  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
};

// Export everything
module.exports = {
  errorHandler,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalServerError,
  ERROR_MESSAGES,
};
