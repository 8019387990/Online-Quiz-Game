import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const category =
    searchParams.get("category") || "All Categories";

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // ==============================
  // FETCH QUESTIONS
  // ==============================
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/questions",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok && data.success) {
          let quizQuestions = data.questions;

          // Filter category
          if (
            category !== "All Categories" &&
            category !== "all"
          ) {
            quizQuestions = quizQuestions.filter(
              (question) =>
                question.category?.toLowerCase() ===
                category.toLowerCase()
            );
          }

          setQuestions(quizQuestions);
        } else {
          setError("Failed to load quiz questions.");
        }
      } catch (error) {
        console.error("Questions Error:", error);

        setError(
          "Unable to connect to the server. Make sure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category]);

  // ==============================
  // TIMER
  // ==============================
  useEffect(() => {
    if (
      loading ||
      questions.length === 0 ||
      saving
    ) {
      return;
    }

    if (timeLeft <= 0) {
      finishQuiz(score);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [
    timeLeft,
    loading,
    questions.length,
    saving,
    score,
  ]);

  // ==============================
  // SELECT ANSWER
  // ==============================
  const handleAnswer = (option) => {
    setSelectedAnswer(option);
  };

  // ==============================
  // SAVE RESULT
  // ==============================
  const saveResult = async (finalScore) => {
    if (saving) return;

    setSaving(true);

    // Get JWT token
    const token = localStorage.getItem("token");

    // Check login
    if (!token) {
      alert("Session expired. Please login again.");
      setSaving(false);
      navigate("/login");
      return;
    }

    // Result data
    const resultData = {
      category: category,
      score: finalScore,
      totalQuestions: questions.length,
    };

    console.log("Result Data:", resultData);

    try {
      const response = await fetch(
        "http://localhost:5000/api/results",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(resultData),
        }
      );

      const data = await response.json();

      console.log(
        "Save Result Status:",
        response.status
      );

      console.log(
        "Save Result Response:",
        data
      );

      if (!response.ok) {
        console.error(
          "Save Result Error:",
          data
        );

        alert(
          data.message ||
            "Failed to save quiz result."
        );

        setSaving(false);
        return;
      }

      // Go to result page
      navigate("/result", {
        state: {
          score: finalScore,
          total: questions.length,
          category: category,
        },
      });

    } catch (error) {
      console.error(
        "Save Result Error:",
        error
      );

      alert(
        "Unable to save result. Make sure the backend server is running."
      );

      setSaving(false);
    }
  };

  // ==============================
  // FINISH QUIZ
  // ==============================
  const finishQuiz = (finalScore = score) => {
    saveResult(finalScore);
  };

  // ==============================
  // NEXT QUESTION
  // ==============================
  const handleNext = () => {
    if (!selectedAnswer) {
      alert("Please select an answer.");
      return;
    }

    const question = questions[currentQuestion];

    let newScore = score;

    if (selectedAnswer === question.answer) {
      newScore = score + 1;
      setScore(newScore);
    }

    setSelectedAnswer("");

    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        currentQuestion + 1
      );
    } else {
      // Last question
      finishQuiz(newScore);
    }
  };

  // ==============================
  // LOADING SCREEN
  // ==============================
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-5xl mb-4">
            ⏳
          </div>

          <h2 className="text-2xl font-bold text-slate-800">
            Loading Quiz...
          </h2>

          <p className="text-slate-500 mt-2">
            Getting questions from the server
          </p>
        </div>
      </div>
    );
  }

  // ==============================
  // ERROR SCREEN
  // ==============================
  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md">
          <div className="text-5xl mb-4">
            ❌
          </div>

          <h2 className="text-2xl font-bold text-slate-800">
            Unable to Load Quiz
          </h2>

          <p className="text-red-500 mt-3">
            {error}
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ==============================
  // NO QUESTIONS
  // ==============================
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md">
          <div className="text-5xl mb-4">
            📝
          </div>

          <h2 className="text-2xl font-bold text-slate-800">
            No Questions Available
          </h2>

          <p className="text-slate-500 mt-2">
            Please add questions to the database.
          </p>

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const question =
    questions[currentQuestion];

  // ==============================
  // QUIZ UI
  // ==============================
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <nav className="bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-2xl font-bold text-blue-400">
            QuizMaster
          </h1>

          <div className="flex items-center gap-4">

            <span className="hidden sm:block text-slate-300">
              Player
            </span>

            <div
              className={`px-4 py-2 rounded-lg font-semibold ${
                timeLeft <= 10
                  ? "bg-red-600"
                  : "bg-blue-600"
              }`}
            >
              ⏱️ {timeLeft}s
            </div>

          </div>

        </div>
      </nav>

      {/* Quiz */}
      <main className="max-w-3xl mx-auto px-6 py-12">

        {/* Progress Information */}
        <div className="flex justify-between mb-4 text-sm font-semibold">

          <span className="text-slate-600">
            Question {currentQuestion + 1} of{" "}
            {questions.length}
          </span>

          <span className="text-blue-600">
            Score: {score}
          </span>

        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-2 mb-8">

          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{
              width: `${
                ((currentQuestion + 1) /
                  questions.length) *
                100
              }%`,
            }}
          ></div>

        </div>

        {/* Category */}
        <div className="mb-4">

          <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
            📚 {question.category}
          </span>

        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-4">

            {question.options.map(
              (option) => (
                <button
                  key={option}
                  onClick={() =>
                    handleAnswer(option)
                  }
                  className={`w-full text-left p-4 rounded-xl border-2 transition ${
                    selectedAnswer === option
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-200 hover:border-blue-400 hover:bg-slate-50"
                  }`}
                >
                  <span className="font-medium">
                    {option}
                  </span>
                </button>
              )
            )}

          </div>

          {/* Next / Submit */}
          <button
            onClick={handleNext}
            disabled={saving}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition"
          >
            {saving
              ? "Saving Result..."
              : currentQuestion ===
                questions.length - 1
              ? "Submit Quiz"
              : "Next Question →"}
          </button>

        </div>

      </main>

    </div>
  );
}

export default Quiz;