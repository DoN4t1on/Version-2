const mongoose = require("mongoose");

const expLikeHisSchema = new mongoose.Schema({
  expId: { type: mongoose.Schema.Types.ObjectId },
  userId: { type: mongoose.Schema.Types.ObjectId },
});

module.exports = mongoose.model("likesHistory", expLikeHisSchema);
