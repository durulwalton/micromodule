const roleService = require("../services/role.service");
const auth = require("../middlewares/auth.middleware");
const express = require("express");
const router = express.Router();

router.get("/index", function (req, res) {
  roleService.getAll().then((result) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result));
  });
});
router.post("/create", auth, async function (req, res) {
  let authUser = req.user;
  roleService.save({ ...req.body, createdBy: authUser._id }).then((result) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result));
  });
});
router.put("/edit/:id", auth, function (req, res) {
  let resourceId = req.params.id;
  let authUser = req.user;
  roleService
    .update(resourceId, { ...req.body, updatedBy: authUser._id })
    .then((result) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(result));
    });
});
router.get("/view/:id", function (req, res) {
  let resourceId = req.params.id;
  roleService.getById(resourceId).then((result) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result));
  });
});
router.delete("/remove/:id", function (req, res) {
  let resourceId = req.params.id;
  roleService.delById(resourceId).then((result) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
