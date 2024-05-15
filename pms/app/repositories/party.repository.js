const { Party } = require("../models/partyModule/party.model");
function getAllAndCount() {}
function getAll() {
  return Party.find();
}
function getById(id) {
  return Party.findOne({ _id: id });
}
function getByFields(fields) {
  return Party.findOne(fields);
}
function save(data) {
  let newParty = new Party(data);
  return newParty.save(data);
}
function create() {}
function update(id, data) {
  return Party.findByIdAndUpdate(id, data, { new: true });
}
function delById(id) {
  return Party.findByIdAndDelete(id);
}
function delByFields(fields) {}

module.exports = {
  getAllAndCount,
  getAll,
  getById,
  getByFields,
  save,
  create,
  update,
  delById,
  delByFields,
};
