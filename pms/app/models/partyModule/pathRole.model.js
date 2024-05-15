const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");
const pathRoleSchema = new Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
});
const PathRole = mongoose.model("PathRole", pathRoleSchema);
function validatePathUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(user);
}
exports.PathRole = PathRole;
exports.validate = validatePathUser;
