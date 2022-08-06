const mongoose = require('mongoose');

const upvoteCommentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  expId: { type: mongoose.Schema.Types.ObjectId },
  dateTime: { type: Date },
  Isincognito: { type: Boolean, default: false },
});

module.exports = mongoose.model('upvoteComment', upvoteCommentSchema);
