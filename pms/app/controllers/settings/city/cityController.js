const { validate } = require("../../../models/settings/city.model");
const cityService = require("../../../services/city.service");
const index = (req, res, next) => {
  cityService.getAll().then((partyList) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(partyList));
  });
};
const view = async (req, res, next) => {
  let partyId = req.params.id;
  cityService.getById(partyId).then((party) => {
    res.send(JSON.stringify(party));
  });
};
const create = async (req, res, next) => {
  let formData = req.body;
  cityService.save(formData).then((party) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(party));
  });
};
const edit = async (req, res, next) => {};

module.exports = {
  index,
  view,
  create,
  edit,
};
