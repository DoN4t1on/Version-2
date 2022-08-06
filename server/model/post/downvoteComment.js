const mongoose = require('mongoose');

const downvoteCommentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  expId: { type: mongoose.Schema.Types.ObjectId },
  dateTime: { type: Date },
  Isincognito: { type: Boolean, default: false },
});

module.exports = mongoose.model('downvoteComment', downvoteCommentSchema);
