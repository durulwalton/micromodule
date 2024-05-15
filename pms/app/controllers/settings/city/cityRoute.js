const express = require("express");
const { index, view, create, edit } = require("./cityController");
const router = express.Router();
router.get("/index", index); // to show all City lists

router.get("/view/:id", view); // to view a specific City details

router.post("/create", create); // to create a City

router.put("/edit/:id", edit); // to edit a specific City

module.exports = router;