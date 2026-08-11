const Question = require("../models/Question");

// Add Question
const addQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);

    res.status(201).json({
      message: "Question Added Successfully",
      question,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get All Questions
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();

    res.json(questions);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  addQuestion,
  getQuestions,
};