import { Link, useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const score = location.state?.score ?? 0;
  const total = location.state?.total ?? 0;
  const category = location.state?.category ?? "Quiz";

  const percentage =
    total > 0 ? Math.round((score / total) * 100) : 0;

  const getMessage = () => {
    if (percentage >= 80) {
      return "Excellent Performance! 🌟";
    }

    if (percentage >= 60) {
      return "Great Job! Keep improving! 👏";
    }

    if (percentage >= 40) {
      return "Good effort! Practice more! 💪";
    }

    return "Keep practicing. You can do it! 🚀";
  };

  const getPerformance = () => {
    if (percentage >= 80) {
      return "Excellent";
    }

    if (percentage >= 60) {
      return "Good";
    }

    if (percentage >= 40) {
      return "Average";
    }

    return "Needs Improvement";
  };

  const handleRetry = () => {
    navigate(`/quiz?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-6 py-12">

      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 text-center">

        {/* Logo */}

        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          QuizMaster
        </Link>

        {/* Result Icon */}

        <div className="text-6xl mt-6 mb-4">
          {percentage >= 60 ? "🎉" : "💪"}
        </div>

        {/* Title */}

        <h1 className="text-3xl font-bold text-slate-900">
          Quiz Completed!
        </h1>

        <p className="text-slate-500 mt-2">
          Great work! Here is your result.
        </p>

        {/* Category */}

        <div className="mt-5">

          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
            📚 {category}
          </span>

        </div>

        {/* Score */}

        <div className="bg-blue-50 rounded-2xl p-8 my-8">

          <p className="text-slate-500 font-medium">
            Your Score
          </p>

          <h2 className="text-5xl font-bold text-blue-600 mt-2">
            {score} / {total}
          </h2>

          <p className="text-2xl font-semibold text-indigo-600 mt-3">
            {percentage}%
          </p>

        </div>

        {/* Performance */}

        <div className="bg-slate-50 rounded-xl p-4 mb-5">

          <p className="text-sm text-slate-500">
            Performance
          </p>

          <p
            className={`text-xl font-bold mt-1 ${
              percentage >= 80
                ? "text-green-600"
                : percentage >= 60
                ? "text-blue-600"
                : percentage >= 40
                ? "text-orange-500"
                : "text-red-500"
            }`}
          >
            {getPerformance()}
          </p>

        </div>

        {/* Message */}

        <h3 className="text-xl font-semibold text-slate-800">
          {getMessage()}
        </h3>

        {/* Main Buttons */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

          <button
            onClick={handleRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition shadow-md"
          >
            🔄 Try Again
          </button>

          <Link
            to="/dashboard"
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl transition"
          >
            📊 Dashboard
          </Link>

        </div>

        {/* Additional Navigation */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">

          <Link
            to="/profile"
            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold py-3 rounded-xl transition"
          >
            👤 My Profile
          </Link>

          <Link
            to="/leaderboard"
            className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-semibold py-3 rounded-xl transition"
          >
            🏆 Leaderboard
          </Link>

        </div>

        {/* Home */}

        <Link
          to="/"
          className="inline-block mt-6 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Home
        </Link>

      </div>

    </div>
  );
}

export default Result;