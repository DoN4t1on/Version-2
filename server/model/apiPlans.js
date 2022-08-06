const mongoose = require("mongoose");

const apiPlansSchema = new mongoose.Schema({
  title: { type: String, default: null },
  apiUsage: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
});

module.exports = mongoose.model("ApiPlans", apiPlansSchema);
