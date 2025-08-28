const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "You must enter a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false, // prevents password from being returned in queries
  },
});

// Hash password before saving
userSchema.pre("save", async function hashPassword(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  // Hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  return next();
});

// This will be a static method added to your userSchema
userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  // 1. Find user by email AND include password field
  // 2. Check if user exists
  // 3. Compare provided password with stored hash
  // 4. Return user if valid OR throw error if invalid
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      // Step 2: Check if user exists
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }

      // Step 3: Compare passwords
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }

        // Step 4: Return user (password will be excluded due to select: false)
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
