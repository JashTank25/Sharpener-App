const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
  title: { type: "string", required: true },
  content: { type: "string", required: true },
  function_name: { type: "string", required: true },
  return_type: { type: "string", required: true },
  showing_date: { type: "string", required: true },
  test_case: { type: "string", required: true },
  print_statement: { type: "string", required: true },
  // output: { type: "string", required: true },
});

module.exports = mongoose.model("QuestionSet", Schema);
