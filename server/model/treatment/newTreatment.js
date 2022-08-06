const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
  name: { type: String },

  desc: { type: String },
  image: { type: String },
  category: { type: String },
  keywords: { type: Array },
});

module.exports = mongoose.model('treatment', treatmentSchema);
