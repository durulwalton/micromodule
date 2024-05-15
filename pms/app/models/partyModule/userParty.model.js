const mongoose = require("mongoose");
const Joi = require("joi");
const { Schema } = mongoose;
const userPartySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  nextId: {
    type: Schema.Types.ObjectId,
  },
  prevId: {
    type: Schema.Types.ObjectId,
  },
  partyId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  approvedStatus: {
    type: String,
    required: true,
    default: "pending",
  },
  isActiveUser: {
    type: Boolean,
    required: true,
    default: true,
  },
  pathRoleId: {
    type: Schema.Types.ObjectId,
  },
  roleId: {
    type: Schema.Types.ObjectId,
  },
});
const userParty = mongoose.model("userParty", userPartySchema);
function validateuserParty(party) {
  const schema = Joi.object({
    userId: Joi.string(),
  });
  return schema.validate(party);
}
exports.userParty = userParty;
exports.validate = validateuserParty;
