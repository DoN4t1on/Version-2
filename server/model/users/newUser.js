const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fname: { type: String, default: null },
  lname: { type: String, default: null },
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  pic: { type: String, default: 'avatar.png' },
  description: { type: String, default: '' },

  link: { type: String, default: '' },

  loc: {
    type: Object,
  },

  fbId: { type: String },
  googleId: { type: String },
  registeredBy: { type: String },
  bday: { type: Date, default: null },
  gender: { type: String, default: null },

  address: { type: String, default: null },

  contactNo: { type: String, default: null },

  isEnable: { type: String, default: 'yes' },

  Roles: { type: Array, default: ['user'] },

  pass: { type: String },
  token: { type: String },
  following: { type: Number, default: 0 },
  follower: { type: Number, default: 0 },

  verify: { type: String, default: 'no' },
  counterId: { type: Number },
  date: { type: Date, default: new Date() },

  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model('Users', userSchema);
