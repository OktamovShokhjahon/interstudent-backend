const { Schema, model } = require("mongoose");

const Admin = new Schema({
  login: String,
  password: String,
  active_time: String
});

module.exports = model("Admin", Admin);
