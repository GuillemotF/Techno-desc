const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const APIError = require("../utils/errors");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }
});

/**
 * pre/post save
 */

UserSchema.pre("save", async function save(next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    this.password = await bcrypt.hash(this.password);

    return next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Methods
 */

UserSchema.method({
  transform() {
    const transformed = {};
    const fields = ["username", "email"];

    fields.forEach(field => {
      transformed[field] = this[field];
    });

    return transformed;
  },
  passwordMatches(password) {
    return bcrypt.compareSync(password, this.password);
  }
});

/**
 * Statics
 */

UserSchema.static({
  checkDuplicateEmailError(err) {
    if (err.code === 11000) {
      var error = new Error("Email already taken");
      error.errors = [
        {
          field: "email",
          location: "body",
          messages: ["Email already taken"]
        }
      ];
      error.status = 409;
      return error;
    }

    return err;
  },

  async findAndValidatePassword(payload) {
    const { email, password } = payload;
    if (!email) throw new APIError("Email must be provided for login");
    const user = await this.findOne({ email });
    if (!user) throw new APIError(`Email not found`, 404);

    const passwordOK = await user.passwordMatches(password);

    if (!passwordOK) throw new APIError(`Password mismatch`, 403);

    return user;
  },
  async saveRefreshToken(payload) {
    const { email, refreshToken } = payload;
    if (!email) throw new APIError("Email must be provided for login");

    const user = await this.findOne({ email }).exec();
    if (!user) throw new APIError(`No user associated with ${email}`, 404);

    await this.updateOne({ email }, { refreshToken });
    return { ...user, refreshToken };
  }
});

/**
 * Register
 */

module.exports = mongoose.model("User", UserSchema);
