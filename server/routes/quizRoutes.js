const express = require("express");
const router = express.Router();

const {
  addQuestion,
  getQuestions,
} = require("../controllers/quizController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, addQuestion);
router.get("/", authMiddleware, getQuestions);

module.exports = router;