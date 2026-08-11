const express = require("express");
const router = express.Router();

const Question = require("../models/Question");

// Get questions
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    let questions;

    if (category) {
      questions = await Question.find({ category });
    } else {
      questions = await Question.find();
    }

    res.json({
      success: true,
      questions,
    });
  } catch (error) {
    console.error("Get Questions Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get questions",
    });
  }
});

module.exports = router;