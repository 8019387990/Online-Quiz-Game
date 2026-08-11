import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    {
      name: "Java",
      icon: "☕",
      description: "Test your Java programming knowledge",
    },
    {
      name: "Python",
      icon: "🐍",
      description: "Practice Python concepts and coding",
    },
    {
      name: "Web Development",
      icon: "🌐",
      description: "HTML, CSS, JavaScript and React",
    },
    {
      name: "DBMS",
      icon: "🗄️",
      description: "SQL and database concepts",
    },
    {
      name: "Operating Systems",
      icon: "💻",
      description: "Learn OS concepts and fundamentals",
    },
    {
      name: "Aptitude",
      icon: "🧠",
      description: "Improve logical and quantitative skills",
    },
  ];

  // ==========================================
  // GET USER'S QUIZ RESULTS
  // ==========================================

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No token found");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/results",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log("Dashboard Results Response:", data);

        if (response.ok && data.success) {
          const storedUser = JSON.parse(
            localStorage.getItem("user") || "null"
          );

          const userId =
            localStorage.getItem("userId") ||
            storedUser?.id ||
            storedUser?._id;

          const userResults = (data.results || []).filter(
            (result) =>
              String(result.userId?._id || result.userId) ===
              String(userId)
          );

          console.log("Dashboard User ID:", userId);
          console.log("Dashboard User Results:", userResults);

          setResults(userResults);
        } else {
          console.error(
            "Failed to load results:",
            data.message
          );

          setResults([]);
        }
      } catch (error) {
        console.error(
          "Dashboard Results Error:",
          error
        );

        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  // ==========================================
  // STATISTICS
  // ==========================================

  const quizzesCompleted = results.length;

  const bestScore =
    results.length > 0
      ? Math.max(
          ...results.map((result) => {
            const total = Number(
              result.totalQuestions || 0
            );

            const score = Number(result.score || 0);

            if (total === 0) {
              return 0;
            }

            return Math.round((score / total) * 100);
          })
        )
      : 0;

  const averageScore =
    results.length > 0
      ? Math.round(
          results.reduce((total, result) => {
            const totalQuestions = Number(
              result.totalQuestions || 0
            );

            const score = Number(result.score || 0);

            if (totalQuestions === 0) {
              return total;
            }

            return (
              total +
              (score / totalQuestions) * 100
            );
          }, 0) / results.length
        )
      : 0;

  const questionsAnswered = results.reduce(
    (total, result) =>
      total + Number(result.totalQuestions || 0),
    0
  );

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= NAVBAR ================= */}

      <nav className="bg-slate-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}

          <Link
            to="/"
            className="text-2xl font-bold text-blue-400"
          >
            QuizMaster
          </Link>

          {/* Navigation */}

          <div className="flex items-center gap-4 sm:gap-6">

            <Link
              to="/"
              className="hidden sm:block hover:text-blue-400 transition"
            >
              Home
            </Link>

            <Link
              to="/profile"
              className="hover:text-blue-400 transition font-medium"
            >
              👤 Profile
            </Link>

            <Link
              to="/leaderboard"
              className="hover:text-yellow-400 transition font-medium"
            >
              🏆 Leaderboard
            </Link>

            <div className="hidden md:block text-slate-300">
              👤 {user?.name || "Player"}
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition font-semibold"
            >
              Logout
            </button>

          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}

      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">

        <div className="max-w-7xl mx-auto px-6 py-14">

          <p className="text-blue-200 font-semibold mb-2">
            👋 Welcome back
          </p>

          <h1 className="text-4xl md:text-5xl font-bold">
            {user?.name || "Quiz Champion"}!
          </h1>

          <p className="text-blue-100 mt-4 text-lg max-w-2xl">
            Ready to challenge yourself, improve your
            knowledge and climb the leaderboard?
          </p>

          <div className="flex flex-wrap gap-4 mt-6">

            <Link
              to="/leaderboard"
              className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition shadow-lg"
            >
              🏆 View Leaderboard
            </Link>

            <Link
              to="/profile"
              className="inline-block border border-white/50 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition"
            >
              👤 View Profile
            </Link>

          </div>

        </div>

      </section>

      {/* ================= STATISTICS ================= */}

      <section className="max-w-7xl mx-auto px-6 -mt-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* Quizzes Completed */}

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm font-medium">
                  Quizzes Completed
                </p>

                <h2 className="text-3xl font-bold text-blue-600 mt-2">
                  {loading ? "..." : quizzesCompleted}
                </h2>

              </div>

              <div className="text-4xl">
                📝
              </div>

            </div>

          </div>

          {/* Best Score */}

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm font-medium">
                  Best Score
                </p>

                <h2 className="text-3xl font-bold text-indigo-600 mt-2">
                  {loading ? "..." : `${bestScore}%`}
                </h2>

              </div>

              <div className="text-4xl">
                🏆
              </div>

            </div>

          </div>

          {/* Average Score */}

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm font-medium">
                  Average Score
                </p>

                <h2 className="text-3xl font-bold text-purple-600 mt-2">
                  {loading ? "..." : `${averageScore}%`}
                </h2>

              </div>

              <div className="text-4xl">
                📊
              </div>

            </div>

          </div>

          {/* Questions Answered */}

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm font-medium">
                  Questions Answered
                </p>

                <h2 className="text-3xl font-bold text-green-600 mt-2">
                  {loading ? "..." : questionsAnswered}
                </h2>

              </div>

              <div className="text-4xl">
                🎯
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CATEGORIES ================= */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="mb-8">

          <h2 className="text-3xl font-bold text-slate-900">
            Choose a Quiz
          </h2>

          <p className="text-slate-500 mt-2">
            Select a category and start testing your
            knowledge.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {categories.map((category) => (

            <div
              key={category.name}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:-translate-y-1 hover:shadow-xl transition duration-300"
            >

              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-3xl mb-5">
                {category.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                {category.name}
              </h3>

              <p className="text-slate-500 mt-2 min-h-[48px]">
                {category.description}
              </p>

              <Link
                to={`/quiz?category=${encodeURIComponent(
                  category.name
                )}`}
                className="inline-block mt-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg transition"
              >
                Start Quiz →
              </Link>

            </div>

          ))}

        </div>

      </section>

      {/* ================= RECENT RESULTS ================= */}

      {results.length > 0 && (

        <section className="max-w-7xl mx-auto px-6 pb-16">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-3xl font-bold text-slate-900">
                Recent Results
              </h2>

              <p className="text-slate-500 mt-2">
                Track your recent quiz performance.
              </p>

            </div>

            <Link
              to="/leaderboard"
              className="text-blue-600 font-semibold hover:text-blue-800"
            >
              View Leaderboard →
            </Link>

          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

            {results
              .slice()
              .reverse()
              .slice(0, 5)
              .map((result) => {

                const totalQuestions = Number(
                  result.totalQuestions || 0
                );

                const score = Number(
                  result.score || 0
                );

                const percentage =
                  totalQuestions > 0
                    ? Math.round(
                        (score / totalQuestions) * 100
                      )
                    : 0;

                return (

                  <div
                    key={result._id}
                    className="flex items-center justify-between px-6 py-5 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition"
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-xl">
                        📝
                      </div>

                      <div>

                        <h3 className="font-semibold text-slate-800">
                          {result.category}
                        </h3>

                        <p className="text-sm text-slate-400">
                          {score} / {totalQuestions} correct
                        </p>

                      </div>

                    </div>

                    <div className="text-right">

                      <p className="text-lg font-bold text-blue-600">
                        {percentage}%
                      </p>

                      <p className="text-xs text-slate-400">
                        Score
                      </p>

                    </div>

                  </div>

                );
              })}

          </div>

        </section>

      )}

      {/* ================= FOOTER ================= */}

      <footer className="bg-slate-900 text-slate-400">

        <div className="max-w-7xl mx-auto px-6 py-8 text-center">

          <p className="font-semibold text-white">
            QuizMaster
          </p>

          <p className="text-sm mt-2">
            Learn. Practice. Compete. 🚀
          </p>

          <p className="text-xs mt-4">
            © 2026 QuizMaster. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Dashboard;