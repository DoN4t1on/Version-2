const mongoose = require('mongoose');

const downvoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  postId: { type: mongoose.Schema.Types.ObjectId },
  dateTime: { type: Date },
  Isincognito: { type: Boolean, default: false },
});

module.exports = mongoose.model('downvote', downvoteSchema);
