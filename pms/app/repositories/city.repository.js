const { City } = require("../models/settings/city.model");
const getAllCount = () => {};
const getAll = () => {
  return City.find({});
};
const getById = (cityId) => {
  return City.findOne({
    id: cityId,
  });
};
const save = (data) => {
  return City.create(data);
};
const update = () => {};
module.exports = {
  getAllCount,
  getAll,
  getById,
  save,
  update,
};
