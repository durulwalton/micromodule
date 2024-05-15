const mongoose = require("mongoose");
const { Role } = require("../models/role.model");
const { RoleResource } = require("../models/roleResource.model");
function getAllAndCount() {}
function getAll() {
  return Role.find()
    .populate("createdBy", "-password")
    .populate("updatedBy", "-password")
    .exec();
}
function getById(id) {
  return Role.findOne({ _id: id });
}
function getByFields(fields) {
  return Role.findOne(fields);
}
async function save(data) {
  let formData = {...data};
  let resources = formData.resources;
  delete formData.resources;
  let newRole = new Role(formData);
  let resourcesData = resources.map((item) => {
    return {
      roleId: newRole._id,
      ...item,
      createdBy: data.createdBy,
    };
  });
  const session = await mongoose.startSession();
  session.startTransaction();
  return formData;
  session.endSession();
  // try {
  //   // await newRole.save({ session: session });
  //   await RoleResource.create(resourcesData, { session: session });
  //   session.commitTransaction();
  //   session.endSession();
  //   return "ok";
  // } catch (error) {
  //   console.log(error);
  //   session.abortTransaction();
  //   session.endSession();
  //   return "No";
  // }
}
function create() {}
function update(id, data) {
  return Role.findByIdAndUpdate({ _id: id }, data, { new: true });
}
function delById(id) {
  return Role.findByIdAndDelete(id);
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
