const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");
const roleSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    roleKey: {
      type: String,
      minlength: 5,
      maxlength: 20,
    },
    power: {
      type: Number,
    },
    note: {
      type: String,
      minlength: 5,
      maxlength: 255,
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
const Role = mongoose.model("Role", roleSchema);
function validateRole(role) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    roleKey: Joi.string().min(5).max(255).required(),
    resources: Joi.array().items(
      Joi.object({
        resourceId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
        isRead: Joi.boolean(),
        isCreate: Joi.boolean(),
        isWrite: Joi.boolean(),
      })
    ),
    createdBy: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  });
  return schema.validate(role);
}
exports.Role = Role;
exports.validate = validateRole;
