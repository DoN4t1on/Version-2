const mongoose = require("mongoose");

const userPlansHistorySchema = new mongoose.Schema({
  userID: { type: mongoose.Types.ObjectId },
  apiKey: { type: Array, default: [] },
  plansHistory: { type: Array, default: [] },
});

module.exports = mongoose.model("userPlansHistory", userPlansHistorySchema);
