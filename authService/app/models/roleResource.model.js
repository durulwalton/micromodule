const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");
const roleResourceSchema = new Schema(
  {
    roleId: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    resourceId: {
      type: Schema.Types.ObjectId,
      ref: "Resource",
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    isCreate: {
      type: Boolean,
      default: false,
    },
    isWrite: {
      type: Boolean,
      default: false,
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
const RoleResource = mongoose.model("RoleResource", roleResourceSchema);
function validateRole(role) {
  const schema = Joi.object({
    roleId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    resourceId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    isRead: Joi.boolean(),
    isCreate: Joi.boolean(),
    isWrite: Joi.boolean(),
    createdBy: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  });
  return schema.validate(role);
}
exports.RoleResource = RoleResource;
exports.validate = validateRole;
