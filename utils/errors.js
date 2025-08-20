// HTTP Status Codes
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

// Error Messages
const ERROR_MESSAGES = {
  VALIDATION_ERROR: "Validation failed",
  CAST_ERROR: "Invalid ID format",
  DOCUMENT_NOT_FOUND: "Requested resource not found",
  USER_NOT_FOUND: "User not found",
  ITEM_NOT_FOUND: "Item not found",
  INVALID_USER_ID: "Invalid user ID format",
  INVALID_ITEM_ID: "Invalid item ID format",
  INTERNAL_ERROR: "An error occurred on the server",
};

module.exports = {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  ERROR_MESSAGES,
};
