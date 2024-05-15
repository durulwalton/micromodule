const mongoose = require("mongoose");
const { Schema } = mongoose;
const citySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
    default: 0,
  },
});
const City = mongoose.model("City", citySchema);
function validate(city) {
  const schema = Joi.object({
    name: Joi.string(),
  });
  return schema.validate(city);
}
module.exports = {
  citySchema,
  City,
  validate,
};
