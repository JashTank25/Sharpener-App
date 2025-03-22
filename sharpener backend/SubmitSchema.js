const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
  showing_date: { type: "string", required: true },
  test_case: { type: [String], required: true },
  outputs: { type: [String], required: true },
  print_statement: { type: "string", required: true },
});

module.exports = mongoose.model("SubmitAnswer", Schema);
