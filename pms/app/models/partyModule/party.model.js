const mongoose = require("mongoose");
const Joi = require("joi");
const { Schema } = mongoose;
const partySchema = new Schema(
  {
    wiptCode: {
      type: String,
    },
    finalStatus: {
      type: String,
      required: true,
      default: "pending",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    referencePartyId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    fromUserId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    isModified: {
      type: Boolean,
      required: true,
      default: false,
    },
    lastModifiedNo: {
      type: Number,
      required: true,
      default: 0,
    },
    isActiveUser: {
      type: Boolean,
      required: true,
      default: true,
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
partySchema.index(
  { wiptCode: 1, userId: 1, lastModifiedNo: 1 },
  { unique: true }
);
const Party = mongoose.model("Party", partySchema);
function validateParty(party) {
  const schema = Joi.object({
    wiptCode: Joi.string(),
    userId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .required(),
    createdBy: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .required(),
  });
  return schema.validate(party);
}
module.exports = {
  partySchema,
  Party,
  validateParty,
};
