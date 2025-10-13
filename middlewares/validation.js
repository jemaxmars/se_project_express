const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

// Custom URL validation using validator library
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// Custom email validation using validator library
const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error("string.email");
};

// Custom MongoDB ObjectId validation
const validateObjectId = (value, helpers) => {
  if (validator.isMongoId(value)) {
    return value;
  }
  return helpers.error("string.objectId");
};

// Validation for creating clothing items
const validateCreateItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    weather: Joi.string().required().valid("hot", "warm", "cold").messages({
      "string.empty": 'The "weather" field must be filled in',
      "any.only": 'The "weather" field must be one of: hot, warm, cold',
    }),
  }),
});

// Validation for creating users
const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'the "avatar" field must be a valid url',
    }),
    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// Validation for user login
const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// Validation for clothing item ID in URL parameters
const validateItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().required().custom(validateObjectId).messages({
      "string.empty": 'The "itemId" parameter must be provided',
      "string.objectId": 'The "itemId" parameter must be a valid ObjectId',
    }),
  }),
});

// Validation for user ID in URL parameters
const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(validateObjectId).messages({
      "string.empty": 'The "userId" parameter must be provided',
      "string.objectId": 'The "userId" parameter must be a valid ObjectId',
    }),
  }),
});

module.exports = {
  validateCreateItem,
  validateCreateUser,
  validateUserLogin,
  validateItemId,
  validateUserId,
};
