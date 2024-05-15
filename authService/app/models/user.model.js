const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const userSchema = new Schema(
  {
    userName: {
      type: String,
      minlength: 5,
      maxlength: 255,
    },
    countryCode: {
      type: String,
      minlength: 5,
      maxlength: 20,
    },
    phoneNumber: {
      type: String,
      minlength: 5,
      maxlength: 20,
    },
    email: {
      type: String,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);
userSchema.index({ email: 1, phoneNumber: 1 }, { unique: true });
userSchema.methods.generateAuthToken = function () {
  let token = jwt.sign(
    {
      _id: this._id,
      userName: this.userName,
      email: this.email,
      countryCode: this.countryCode,
      phoneNumber: this.phoneNumber,
    },
    "talha"
  );
  return token;
};
const User = mongoose.model("User", userSchema);
function validateUser(user) {
  const schema = Joi.object({
    userName: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(user);
}
function validateLoginUser(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(user);
}
exports.User = User;
exports.validate = validateUser;
exports.validateLoginUser = validateLoginUser;
