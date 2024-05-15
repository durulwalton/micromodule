const { Resource } = require("../models/resource.model");
function getAllAndCount() {}
function getAll() {
  return Resource.find()
  .populate("parentId")
  .populate("createdBy","-password")
  .populate("updatedBy","-password")
  .exec();
}
function getById(id) {
  return Resource.findOne({ _id: id });
}
function getByFields(fields) {
  return Resource.findOne(fields);
}
function save(data) {
  let newResource = new Resource(data);
  return newResource.save(data);
}
function create() {}
function update(id, data) {
  console.log(id);
  return Resource.findByIdAndUpdate({ _id: id }, data, { new: true });
}
function delById(id) {
  return Resource.findByIdAndDelete(id);
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
