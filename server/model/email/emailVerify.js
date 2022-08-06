const mongoose = require("mongoose");

const emailVerifySchema = new mongoose.Schema({

    email: { type: String, },

});

module.exports = mongoose.model("emailVerify", emailVerifySchema);