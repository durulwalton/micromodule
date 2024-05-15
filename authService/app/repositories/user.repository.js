const { User } = require("../models/user.model");
function getAllAndCount() {}
function getAll() {
  return User.find();
}
function getById(id) {
  return User.findOne({ _id: id });
}
function getByFields(fields) {
  return User.findOne(fields);
}
function save(data) {
  let newUser = new User(data);
  return newUser.save();
}
function create() {}
function update(id, data) {
  return User.findByIdAndUpdate(id, data, { new: true });
}
function delById(id) {
  return User.findByIdAndDelete(id);
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
