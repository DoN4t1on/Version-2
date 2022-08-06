const mongoose = require("mongoose");

const sympAffectedHisSchema = new mongoose.Schema({
  sympId: { type: mongoose.Schema.Types.ObjectId },
  userId: { type: mongoose.Schema.Types.ObjectId },
});

module.exports = mongoose.model("sympaffected", sympAffectedHisSchema);
