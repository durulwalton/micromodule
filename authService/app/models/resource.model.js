const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");
const resourceSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 5,
      maxlength: 255,
      required: true,
      unique: true,
    },
    pageUrl: {
      type: String,
      minlength: 1,
      maxlength: 255,
      required: true,
    },
    apiEnd: {
      type: String,
      minlength: 1,
      maxlength: 255,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Resource",
      default: null,
    },
    orderNo: {
      type: Number,
    },
    isSideLoc: {
      type: Boolean,
      default: true,
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
const Resource = mongoose.model("Resource", resourceSchema);
function validateResource(party) {
  const schema = Joi.object({
    name: Joi.string().required(),
    pageUrl: Joi.string().required(),
    parentId: Joi.string(),
    createdBy: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .required(),
  });
  return schema.validate(party);
}
exports.Resource = Resource;
exports.validate = validateResource;
