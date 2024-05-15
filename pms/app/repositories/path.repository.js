const { Path } = require("../models/partyModule/path.model");
function getAllAndCount() {}
function getAll() {
  return Path.find();
}
function getById(id) {
  return Path.findOne({ _id: id });
}
function getByFields(fields) {
  return Path.findOne(fields);
}
function save(data) {
  let newPath = new Path(data);
  return newPath.save(data);
}
function create() {}
function update(id, data) {
  return Path.findByIdAndUpdate(id, data, { new: true });
}
function delById(id) {
  return Path.findByIdAndDelete(id);
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
