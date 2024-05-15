var express = require("express");
var app = express();
const mongoose = require("mongoose");
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/blood_bank");
}
app.get("/", (req, res) => {
  res.send("Hello World!");
});
require("./app/config/routes")(app);
app.listen(4001, () => {
  console.log("Running server at localhost:4001");
});
