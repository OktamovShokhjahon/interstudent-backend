const { Schema, model } = require("mongoose");

const Status = new Schema({
  value: String,
  title: String
});

module.exports = model("Status", Status);
