const { default: mongoose } = require("mongoose");

const CodeSchema = new mongoose.Schema({
  language: String,
  code: String,
  output: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Code", CodeSchema);
