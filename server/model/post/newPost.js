const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },

  title: { type: String },

  status: { type: Boolean, default: true },

  description: { type: String },
  pic: { type: String },
  comments: { type: Number, default: 0 },
  bidder: { type: Number, default: 0 },

  upVote: { type: Number, default: 0 },
  downVote: { type: Number, default: 0 },

  loc: {
    type: Object,
  },
});

postSchema.index({ loc: '2dsphere' });

module.exports = mongoose.model('post', postSchema);
