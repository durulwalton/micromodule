const express = require("express");
const cors = require("cors");
const partyRoute = require("../controllers/partyModule/party.controller");
const pathRoute = require("../controllers/partyModule/path.controller");
const partyRoleRoute = require("../controllers/partyModule/partyRole.controller");
const cityRoute = require("../controllers/settings/city/cityRoute");
module.exports = function (app) {
  app.use(express.json());
  app.use(cors());
  app.use("/api/pms/party", partyRoute);
  app.use("/api/pms/path", pathRoute);
  app.use("/api/pms/party-role", partyRoleRoute);
  app.use("/api/pms/city", cityRoute);
};
