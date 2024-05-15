const express = require("express");
const partyRoleService = require("../../services/partyRole.service");

const router = express.Router();

// to show all Party lists
router.get("/index", (req, res) => {
  partyRoleService.getAll().then((partyList) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(partyList));
  });
});
// to view a specific Party details
router.get("/view/:id", (req, res) => {
  let partyId = req.params.id;
  partyRoleService.getById(partyId).then((party) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(party));
  });
});
// to create a Party
router.post("/create", (req, res) => {
  let formData = req.body;
  partyRoleService.save(formData).then((party) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(party));
  });
});
// to edit a specific Party
router.put("/edit/:id", (req, res) => {
  let partyId = req.params.id;
  partyRoleService.update(partyId, req.body).then((result) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result));
  });
});
// to Delete a specific Party
router.delete("/remove/:id", (req, res) => {
  let partyId = req.params.id;
  partyRoleService.remove(partyId, req.body).then((result) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
