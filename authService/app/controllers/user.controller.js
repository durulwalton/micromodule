const userService = require("../services/user.service");
const auth = require("../middlewares/auth.middleware");
const express = require("express");
const router = express.Router();

router.get("/index", function (req, res) {
  userService.getAll().then((result) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result));
  });
});
router.post("/create", async function (req, res) {
  userService.save(req.body).then((result) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result));
  });
});
router.put("/edit/:id", function (req, res) {
  let accounId = req.params.id;
  userService.update(accounId, req.body).then((result) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result));
  });
});
router.get("/view/:id", function (req, res) {
  let accounId = req.params.id;
  userService.getById(accounId).then((result) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result));
  });
});
router.delete("/remove/:id", function (req, res) {
  let accounId = req.params.id;
  userService.delById(accounId).then((result) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result));
  });
});

// ========================Login Api End Point
router.post("/auth", async function (req, res) {
  userService.getAuth(req.body).then((result) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result));
  });
});
router.get("/auth-info", auth, function (req, res) {
  let user = req.user;
  userService.getAuthInfo({ email: user.email }).then((result) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
