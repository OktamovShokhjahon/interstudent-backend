const { Schema, model } = require("mongoose");

const Message = new Schema({
  firstname: String,
  phone: String,
  message: String,
  date: String
});

module.exports = model("Message", Message);
