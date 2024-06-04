const { Schema, model } = require("mongoose");

const News = new Schema({
  title_uz: String,
  description_uz: String,
  title_en: String,
  description_en: String,
  title_ru: String,
  description_ru: String,
  image: String,
  date: String
});

module.exports = model("News", News);
