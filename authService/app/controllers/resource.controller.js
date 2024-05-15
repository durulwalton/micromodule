const resourceService = require("../services/resource.service");
const auth = require("../middlewares/auth.middleware");
const express = require("express");
const { Parser } = require("json2csv");
const router = express.Router();

router.get("/index", function (req, res) {
  resourceService.getAll().then((result) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result));
  });
});
router.get("/read", function (req, res) {
  resourceService.getAll().then((result) => {
    const jsonToCSVParser = new Parser();
    const csv = jsonToCSVParser.parse(
      result.appData.map((item) => {
        return {
          id: item._id,
          name: item.name,
        };
      })
    );
    res.attachment("a.csv");
    res.send(csv);
  });
});
router.post("/create", auth, async function (req, res) {
  let authUser = req.user;
  resourceService
    .save({ ...req.body, createdBy: authUser._id })
    .then((result) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(result));
    });
});
router.put("/edit/:id", auth, function (req, res) {
  let resourceId = req.params.id;
  let authUser = req.user;
  resourceService
    .update(resourceId, { ...req.body, updatedBy: authUser._id })
    .then((result) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(result));
    });
});
router.get("/view/:id", function (req, res) {
  let resourceId = req.params.id;
  resourceService.getById(resourceId).then((result) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result));
  });
});
router.delete("/remove/:id", function (req, res) {
  let resourceId = req.params.id;
  resourceService.delById(resourceId).then((result) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
