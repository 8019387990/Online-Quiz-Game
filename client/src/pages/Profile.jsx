import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==============================
  // GET USER
  // ==============================
  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (!storedUser) {
      setLoading(false);
      return;
    }

    setUser(storedUser);
    fetchResults();
  }, []);

  // ==============================
  // FETCH MY RESULTS
  // ==============================
  const fetchResults = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("Token not found");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/results/my-results",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("My Results API:", data);

      if (response.ok && data.success) {
        setResults(data.results || []);
      } else {
        console.error(
          "Failed to load results:",
          data.message
        );
        setResults([]);
      }
    } catch (error) {
      console.error("Profile Results Error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // STATISTICS
  // ==============================

  const totalQuizzes = results.length;

  const bestPercentage =
    results.length > 0
      ? Math.max(
          ...results.map((result) => {
            const score = Number(result.score) || 0;
            const total =
              Number(result.totalQuestions) || 0;

            if (total === 0) {
              return 0;
            }

            return Math.round((score / total) * 100);
          })
        )
      : 0;

  const averagePercentage =
    results.length > 0
      ? Math.round(
          results.reduce((sum, result) => {
            const score = Number(result.score) || 0;
            const total =
              Number(result.totalQuestions) || 0;

            if (total === 0) {
              return sum;
            }

            return sum + (score / total) * 100;
          }, 0) / results.length
        )
      : 0;

  const questionsAnswered = results.reduce(
    (sum, result) =>
      sum + (Number(result.totalQuestions) || 0),
    0
  );

  // ==============================
  // LOGIN CHECK
  // ==============================

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md w-full">

          <div className="text-5xl mb-4">
            🔐
          </div>

          <h2 className="text-2xl font-bold text-slate-800">
            Please Login
          </h2>

          <p className="text-slate-500 mt-2">
            Login to view your profile.
          </p>

          <Link
            to="/login"
            className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Login
          </Link>

        </div>
      </div>
    );
  }

  // ==============================
  // PROFILE PAGE
  // ==============================

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <nav className="bg-slate-900 text-white shadow-lg">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <Link
            to="/"
            className="text-2xl font-bold text-blue-400"
          >
            QuizMaster
          </Link>

          <div className="flex items-center gap-4">

            <Link
              to="/dashboard"
              className="hover:text-blue-400 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/leaderboard"
              className="hover:text-blue-400 transition"
            >
              🏆 Leaderboard
            </Link>

          </div>

        </div>

      </nav>

      {/* Profile Header */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">

        <div className="max-w-7xl mx-auto px-6 py-14">

          <div className="flex flex-col md:flex-row items-center gap-6">

            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-white text-blue-600 flex items-center justify-center text-4xl font-bold shadow-xl">

              {user.name
                ? user.name.charAt(0).toUpperCase()
                : "U"}

            </div>

            {/* User Details */}
            <div className="text-center md:text-left">

              <p className="text-blue-200 font-semibold">
                👤 My Profile
              </p>

              <h1 className="text-4xl font-bold mt-2">
                {user.name}
              </h1>

              <p className="text-blue-100 mt-2">
                {user.email}
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* Statistics */}
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          📊 My Statistics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Quizzes Completed */}
          <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="text-3xl mb-3">
              📝
            </div>

            <p className="text-slate-500">
              Quizzes Completed
            </p>

            <h3 className="text-3xl font-bold text-blue-600 mt-2">
              {totalQuizzes}
            </h3>

          </div>

          {/* Best Score */}
          <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="text-3xl mb-3">
              🏆
            </div>

            <p className="text-slate-500">
              Best Score
            </p>

            <h3 className="text-3xl font-bold text-purple-600 mt-2">
              {bestPercentage}%
            </h3>

          </div>

          {/* Average Score */}
          <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="text-3xl mb-3">
              📈
            </div>

            <p className="text-slate-500">
              Average Score
            </p>

            <h3 className="text-3xl font-bold text-indigo-600 mt-2">
              {averagePercentage}%
            </h3>

          </div>

          {/* Questions Answered */}
          <div className="bg-white rounded-2xl shadow-lg p-6">

            <div className="text-3xl mb-3">
              🎯
            </div>

            <p className="text-slate-500">
              Questions Answered
            </p>

            <h3 className="text-3xl font-bold text-green-600 mt-2">
              {questionsAnswered}
            </h3>

          </div>

        </div>

        {/* Quiz History */}
        <section className="mt-12">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-2xl font-bold text-slate-900">
                📚 My Quiz History
              </h2>

              <p className="text-slate-500 mt-1">
                Your recent quiz performances
              </p>

            </div>

            <Link
              to="/dashboard"
              className="hidden sm:block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold"
            >
              Take Quiz →
            </Link>

          </div>

          {/* Loading */}
          {loading && (
            <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

              <div className="text-4xl mb-3">
                ⏳
              </div>

              <p className="text-slate-600">
                Loading your results...
              </p>

            </div>
          )}

          {/* No Results */}
          {!loading && results.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

              <div className="text-5xl">
                📝
              </div>

              <h3 className="text-xl font-bold text-slate-800 mt-4">
                No Quiz Attempts Yet
              </h3>

              <p className="text-slate-500 mt-2">
                Complete your first quiz to see your results here.
              </p>

              <Link
                to="/dashboard"
                className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
              >
                Start Quiz →
              </Link>

            </div>
          )}

          {/* Results */}
          {!loading && results.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 bg-slate-900 text-white px-6 py-4 font-semibold">

                <div className="col-span-3">
                  Category
                </div>

                <div className="col-span-3">
                  Score
                </div>

                <div className="col-span-3">
                  Percentage
                </div>

                <div className="col-span-3 text-right">
                  Date
                </div>

              </div>

              {/* Results */}
              {results.map((result) => {

                const score =
                  Number(result.score) || 0;

                const total =
                  Number(result.totalQuestions) || 0;

                const percentage =
                  total > 0
                    ? Math.round(
                        (score / total) * 100
                      )
                    : 0;

                return (
                  <div
                    key={result._id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-5 border-b border-slate-100 hover:bg-slate-50 transition"
                  >

                    {/* Category */}
                    <div className="md:col-span-3">

                      <p className="text-xs text-slate-400 md:hidden">
                        CATEGORY
                      </p>

                      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {result.category}
                      </span>

                    </div>

                    {/* Score */}
                    <div className="md:col-span-3">

                      <p className="text-xs text-slate-400 md:hidden">
                        SCORE
                      </p>

                      <p className="font-bold text-blue-600">
                        {score} / {total}
                      </p>

                    </div>

                    {/* Percentage */}
                    <div className="md:col-span-3">

                      <p className="text-xs text-slate-400 md:hidden">
                        PERCENTAGE
                      </p>

                      <p
                        className={`font-bold ${
                          percentage >= 80
                            ? "text-green-600"
                            : percentage >= 60
                            ? "text-blue-600"
                            : percentage >= 40
                            ? "text-orange-500"
                            : "text-red-500"
                        }`}
                      >
                        {percentage}%
                      </p>

                    </div>

                    {/* Date */}
                    <div className="md:col-span-3 md:text-right">

                      <p className="text-xs text-slate-400 md:hidden">
                        DATE
                      </p>

                      <p className="text-slate-500 text-sm">
                        {result.createdAt
                          ? new Date(
                              result.createdAt
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 mt-10">

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

export default Profile;