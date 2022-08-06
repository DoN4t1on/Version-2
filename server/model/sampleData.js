const mongoose = require("mongoose");

const sampleDataSchema = new mongoose.Schema({
  title: { type: String, default: null },
});

module.exports = mongoose.model("SampleData", sampleDataSchema);
