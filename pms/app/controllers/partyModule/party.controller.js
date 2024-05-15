const express = require("express");
const partyService = require("../../services/party.service");
const auth = require("../../middlewares/auth.middleware");
const router = express.Router();

// to show all Party lists
router.get("/index", (req, res) => {
  partyService.getAll().then((partyList) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(partyList));
  });
});
// to view a specific Party details
router.get("/view/:id", (req, res) => {
  let partyId = req.params.id;
  partyService.getById(partyId).then((party) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(party));
  });
});
// to create a Party
router.post("/create", auth, (req, res) => {
  let formData = req.body;
  let user = req.user;
  partyService.save({ ...formData, createdBy: user._id }).then((party) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(party));
  });
});
// to edit a specific Party
router.put("/edit/:id", (req, res) => {
  let partyId = req.params.id;
  partyService.update(partyId, req.body).then((result) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result));
  });
});
// to Delete a specific Party
router.delete("/remove/:id", (req, res) => {
  let partyId = req.params.id;
  partyService.remove(partyId, req.body).then((result) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
