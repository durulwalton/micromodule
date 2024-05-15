const mongoose = require("mongoose");
const Joi = require("joi");
const { Schema } = mongoose;
// For Path SetUp
const pathSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    nextId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    prevId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    isActivePath: {
      type: Boolean,
      required: true,
      default: true,
    },
    pathRoleId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    moduleId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      default: null,
    },
  },
  { timestamps: true }
);
const Path = mongoose.model("Path", pathSchema);
function validatePath(path) {
  const schema = Joi.object({
    userId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    nextId: Joi.string(),
    prevId: Joi.string(),
    createdBy: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  });
  return schema.validate(path);
}
exports.Path = Path;
exports.validatePath = validatePath;
