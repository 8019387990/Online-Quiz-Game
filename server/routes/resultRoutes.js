const express = require("express");
const router = express.Router();

const Result = require("../models/Result");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// ==========================================
// SAVE QUIZ RESULT
// POST /api/results
// ==========================================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      category,
      score,
      totalQuestions,
    } = req.body;

    // Get logged-in user ID from JWT
    const userId = req.user.id;

    // Find user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validate result data
    if (
      !category ||
      score === undefined ||
      totalQuestions === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all result details",
      });
    }

    // Create result
    const result = await Result.create({
      userId: user._id,
      userName: user.name,
      category: category,
      score: score,
      totalQuestions: totalQuestions,
    });

    res.status(201).json({
      success: true,
      message: "Quiz result saved successfully",
      result,
    });

  } catch (error) {
    console.error("Save Result Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save quiz result",
    });
  }
});

// ==========================================
// GET MY RESULTS
// GET /api/results/my-results
// ==========================================
router.get("/my-results", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const results = await Result.find({
      userId: userId,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      results,
    });

  } catch (error) {
    console.error("Get My Results Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load your results",
    });
  }
});

// ==========================================
// GET ALL RESULTS
// GET /api/results
// ==========================================
router.get("/", authMiddleware, async (req, res) => {
  try {
    const results = await Result.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      results,
    });

  } catch (error) {
    console.error("Get Results Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load results",
    });
  }
});

// ==========================================
// GET LEADERBOARD
// GET /api/results/leaderboard
// ==========================================
router.get("/leaderboard", async (req, res) => {
  try {

    const results = await Result.find();

    // Calculate percentage for every result
    const leaderboard = results.map((result) => {

      const score = Number(result.score) || 0;

      const totalQuestions =
        Number(result.totalQuestions) || 0;

      const percentage =
        totalQuestions > 0
          ? Math.round(
              (score / totalQuestions) * 100
            )
          : 0;

      return {
        ...result.toObject(),
        percentage,
      };
    });

    // Sort by percentage first
    // If percentage is same, higher score comes first
    // If still same, older result comes first
    leaderboard.sort((a, b) => {

      if (b.percentage !== a.percentage) {
        return b.percentage - a.percentage;
      }

      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return (
        new Date(a.createdAt) -
        new Date(b.createdAt)
      );
    });

    // Top 20 results
    const topResults = leaderboard.slice(0, 20);

    res.json({
      success: true,
      results: topResults,
    });

  } catch (error) {
    console.error("Leaderboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load leaderboard",
    });
  }
});

module.exports = router;