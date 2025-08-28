const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT = 409;
const SERVER_ERROR = 500;

const ERROR_MESSAGES = {
  INTERNAL_ERROR: "An error has occurred on the server",
  USER_NOT_FOUND: "User not found",
  INVALID_USER_ID: "Invalid user ID",
  ITEM_NOT_FOUND: "Item not found",
  INVALID_ITEM_ID: "Invalid item ID",
  FORBIDDEN: "You are not authorized to perform this action",
};

module.exports = {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  SERVER_ERROR,
  ERROR_MESSAGES,
};
