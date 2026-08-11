import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Leaderboard() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/results/leaderboard"
      );

      const data = await response.json();

      console.log("Leaderboard Response:", data);

      if (response.ok && data.success) {
        setResults(data.results || []);
      } else {
        setError(data.message || "Unable to load leaderboard.");
      }
    } catch (error) {
      console.error("Leaderboard Error:", error);

      setError(
        "Unable to connect to the server. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= NAVBAR ================= */}

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
              className="hidden sm:block hover:text-blue-400 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/profile"
              className="hidden sm:block hover:text-blue-400 transition"
            >
              👤 Profile
            </Link>

            <Link
              to="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold transition"
            >
              Start Quiz
            </Link>

          </div>
        </div>
      </nav>

      {/* ================= HEADER ================= */}

      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">

        <div className="max-w-7xl mx-auto px-6 py-14 text-center">

          <div className="text-6xl mb-4">
            🏆
          </div>

          <h1 className="text-4xl md:text-5xl font-bold">
            QuizMaster Leaderboard
          </h1>

          <p className="text-blue-100 mt-4 text-lg">
            See who is leading the quiz competition!
          </p>

        </div>

      </section>

      {/* ================= MAIN ================= */}

      <main className="max-w-6xl mx-auto px-6 py-12">

        {/* ================= LOADING ================= */}

        {loading && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">

            <div className="text-5xl mb-4">
              ⏳
            </div>

            <h2 className="text-2xl font-bold text-slate-800">
              Loading Leaderboard...
            </h2>

            <p className="text-slate-500 mt-2">
              Getting the latest quiz scores
            </p>

          </div>
        )}

        {/* ================= ERROR ================= */}

        {!loading && error && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">

            <div className="text-5xl mb-4">
              ❌
            </div>

            <h2 className="text-2xl font-bold text-slate-800">
              Unable to Load Leaderboard
            </h2>

            <p className="text-red-500 mt-3">
              {error}
            </p>

            <button
              onClick={fetchLeaderboard}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition"
            >
              🔄 Try Again
            </button>

          </div>
        )}

        {/* ================= EMPTY ================= */}

        {!loading && !error && results.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">

            <div className="text-6xl mb-5">
              📝
            </div>

            <h2 className="text-2xl font-bold text-slate-800">
              No Results Yet
            </h2>

            <p className="text-slate-500 mt-3">
              Complete a quiz to appear on the leaderboard.
            </p>

            <Link
              to="/dashboard"
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Start Your First Quiz →
            </Link>

          </div>
        )}

        {/* ================= LEADERBOARD ================= */}

        {!loading && !error && results.length > 0 && (

          <div className="space-y-8">

            {/* ================= TOP PERFORMERS ================= */}

            <div>

              <div className="text-center mb-8">

                <h2 className="text-3xl font-bold text-slate-900">
                  🏆 Top Performers
                </h2>

                <p className="text-slate-500 mt-2">
                  The best quiz performances
                </p>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* SECOND PLACE */}

                {results[1] && (
                  <div className="bg-white rounded-2xl shadow-lg p-7 text-center md:mt-8 border border-slate-200">

                    <div className="text-6xl">
                      🥈
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mt-4">
                      {results[1].userName}
                    </h3>

                    <span className="inline-block mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {results[1].category}
                    </span>

                    <p className="text-3xl font-bold text-blue-600 mt-5">
                      {results[1].score} / {results[1].totalQuestions}
                    </p>

                    <p className="text-slate-400 mt-1">
                      Score
                    </p>

                  </div>
                )}

                {/* FIRST PLACE */}

                {results[0] && (
                  <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-2 border-yellow-400 transform md:-translate-y-3">

                    <div className="text-7xl">
                      🥇
                    </div>

                    <p className="text-yellow-500 font-bold mt-2">
                      #1 TOP PERFORMER
                    </p>

                    <h3 className="text-2xl font-bold text-slate-900 mt-3">
                      {results[0].userName}
                    </h3>

                    <span className="inline-block mt-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {results[0].category}
                    </span>

                    <p className="text-4xl font-bold text-yellow-500 mt-5">
                      {results[0].score} / {results[0].totalQuestions}
                    </p>

                    <p className="text-slate-400 mt-1">
                      Highest Score
                    </p>

                  </div>
                )}

                {/* THIRD PLACE */}

                {results[2] && (
                  <div className="bg-white rounded-2xl shadow-lg p-7 text-center md:mt-8 border border-slate-200">

                    <div className="text-6xl">
                      🥉
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mt-4">
                      {results[2].userName}
                    </h3>

                    <span className="inline-block mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {results[2].category}
                    </span>

                    <p className="text-3xl font-bold text-blue-600 mt-5">
                      {results[2].score} / {results[2].totalQuestions}
                    </p>

                    <p className="text-slate-400 mt-1">
                      Score
                    </p>

                  </div>
                )}

              </div>
            </div>

            {/* ================= FULL RANKING ================= */}

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

              <div className="px-6 py-6 border-b border-slate-200">

                <h2 className="text-2xl font-bold text-slate-900">
                  📊 Complete Rankings
                </h2>

                <p className="text-slate-500 mt-1">
                  All quiz performances
                </p>

              </div>

              {/* TABLE HEADER */}

              <div className="hidden md:grid grid-cols-12 gap-4 bg-slate-900 text-white px-6 py-4 font-semibold">

                <div className="col-span-2">
                  Rank
                </div>

                <div className="col-span-3">
                  Player
                </div>

                <div className="col-span-3">
                  Category
                </div>

                <div className="col-span-2">
                  Score
                </div>

                <div className="col-span-2 text-right">
                  Percentage
                </div>

              </div>

              {/* RESULTS */}

              {results.map((result, index) => {

                const score = Number(result.score) || 0;

                const total =
                  Number(result.totalQuestions) || 0;

                const percentage =
                  total > 0
                    ? Math.round((score / total) * 100)
                    : 0;

                return (
                  <div
                    key={result._id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-5 border-b border-slate-100 hover:bg-slate-50 transition items-center"
                  >

                    {/* Rank */}

                    <div className="md:col-span-2">

                      <p className="text-xs text-slate-400 md:hidden">
                        RANK
                      </p>

                      <span className="font-bold text-lg">
                        {index === 0
                          ? "🥇"
                          : index === 1
                          ? "🥈"
                          : index === 2
                          ? "🥉"
                          : `#${index + 1}`}
                      </span>

                    </div>

                    {/* Player */}

                    <div className="md:col-span-3">

                      <p className="text-xs text-slate-400 md:hidden">
                        PLAYER
                      </p>

                      <p className="font-semibold text-slate-800">
                        {result.userName}
                      </p>

                    </div>

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

                    <div className="md:col-span-2">

                      <p className="text-xs text-slate-400 md:hidden">
                        SCORE
                      </p>

                      <p className="font-bold text-blue-600">
                        {score} / {total}
                      </p>

                    </div>

                    {/* Percentage */}

                    <div className="md:col-span-2 md:text-right">

                      <p className="text-xs text-slate-400 md:hidden">
                        PERCENTAGE
                      </p>

                      <span
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
                      </span>

                    </div>

                  </div>
                );
              })}

            </div>

            {/* ================= BUTTONS ================= */}

            <div className="flex flex-col sm:flex-row justify-center gap-4">

              <Link
                to="/dashboard"
                className="text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-xl transition"
              >
                🎯 Take Another Quiz
              </Link>

              <Link
                to="/profile"
                className="text-center bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold px-7 py-3 rounded-xl transition"
              >
                👤 View My Profile
              </Link>

            </div>

          </div>
        )}

      </main>

      {/* ================= FOOTER ================= */}

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

export default Leaderboard;