const mongoose = require("mongoose");

const forgetPassSchema = new mongoose.Schema({

    email: { type: String },
    createdAt: { type: Date, expires: '15m', default: Date.now }


});

// forgetPassSchema.index({ expireAt: 1 }, { expireAfterSeconds: 10 });

module.exports = mongoose.model("forgetPass", forgetPassSchema);