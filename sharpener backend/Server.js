const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { executeCode } = require("./executeCode");
const Code = require("./CodeSchema");
const QuestionSet = require("./Schema");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/sharpenerDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Code Execution Route
app.post("/run", async (req, res) => {
  const { code, language, testType } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required!" });
  }

  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, "0")}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${today.getFullYear()}`;

  // Find the question with today's date
  const question = await QuestionSet.findOne({ showing_date: formattedDate });

  console.log(question);

  let testCode = code;
  if (language === "java") {
    testCode = `
        import java.util.*;
        public class Solution {
            ${code} 
            public static void main(String[] args) {
                ${question.test_case}
                if ("${testType}".equals("initial")) {
                    ${question.print_statement};
                } else {
                    System.out.println("error"); 
                }
            }
        }`;
  } else if (language === "python") {
    testCode = `
        def example_function(a, b):
            ${code.replace("def example_function", "")}

        if "${testType}" == "initial":
            print(example_function(2, 3))
        else:
            print(example_function(5, 7))
    `;
  }

  try {
    const output = await executeCode(testCode, language);

    // Save executed code to MongoDB
    const newCode = new Code({ language, code, output });
    await newCode.save();

    res.json({ output: output.trim() });
  } catch (error) {
    const data = error.split("error:");
    res.status(400).json({ error: data[1].trim() });
  }
});

app.get("/submissions", async (req, res) => {
  try {
    const submissions = await Code.find().sort({ timestamp: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: "Error fetching submissions" });
  }
});
app.post("/questionUpload", async (req, res) => {
  const {
    title,
    content,
    function_name,
    return_type,
    showing_date,
    test_case,
    print_statement,
  } = req.body;

  if (
    !title ||
    !content ||
    !function_name ||
    !return_type ||
    !showing_date ||
    !test_case ||
    !print_statement
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newQuestion = new QuestionSet({
      title,
      content,
      function_name,
      return_type,
      showing_date,
      test_case,
      print_statement,
    });

    await newQuestion.save();
    res
      .status(201)
      .json({ message: "Question saved successfully", data: newQuestion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/get-todays-question", async (req, res) => {
  try {
    // Get today's date in "DD-MM-YYYY" format
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${today.getFullYear()}`;

    // Find the question with today's date
    const question = await QuestionSet.findOne({ showing_date: formattedDate });

    if (!question) {
      return res
        .status(404)
        .json({ message: "No question available for today" });
    }

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
