const mongoose = require("mongoose");

const themaSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  symptons_id: { type: mongoose.Schema.Types.ObjectId },
});

module.exports = mongoose.model("thema", themaSchema);
