const express = require("express");
const cors = require("cors");
const userController = require("../controllers/user.controller");
const resourceController = require("../controllers/resource.controller");
const roleController = require("../controllers/role.controller");
module.exports = function (app) {
  app.use(express.json());
  app.use(cors());
  app.use("/api/auth/user", userController);
  app.use("/api/auth/resource", resourceController);
  app.use("/api/auth/role", roleController);
};
