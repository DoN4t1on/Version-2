const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema({
  name: { type: String },

  desc: { type: String },
  image: { type: String },
  affected: { type: Number, default: 0 },

  keywords: { type: Array },
});

module.exports = mongoose.model("disease", diseaseSchema);
