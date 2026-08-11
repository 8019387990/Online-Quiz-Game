import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="max-w-3xl">

            <p className="text-blue-200 font-semibold mb-4">
              🚀 Welcome to QuizMaster
            </p>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Test Your Knowledge.
              <br />
              Challenge Yourself.
            </h1>

            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              Improve your knowledge with interactive quizzes,
              instant results, timed challenges, and competitive
              leaderboards.
            </p>

            <div className="flex flex-wrap gap-4">

              <Link
                to="/login"
                className="bg-white text-blue-700 font-semibold px-7 py-3 rounded-xl hover:bg-blue-50 transition shadow-lg"
              >
                Start Quiz →
              </Link>

              <Link
                to="/register"
                className="border border-white/50 px-7 py-3 rounded-xl hover:bg-white/10 transition"
              >
                Create Account
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* Quiz Categories */}
      <Categories />

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="text-center mb-12">

          <p className="text-blue-600 font-semibold">
            Learn & Improve
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
            Why QuizMaster?
          </h2>

          <p className="text-slate-500 mt-3">
            Everything you need to practice, compete, and improve.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-1 hover:shadow-lg transition duration-300">

            <div className="text-4xl mb-4">
              ⏱️
            </div>

            <h3 className="text-xl font-semibold mb-2 text-slate-900">
              Timed Quizzes
            </h3>

            <p className="text-slate-500 leading-relaxed">
              Challenge yourself with timed quizzes and improve
              your speed and accuracy.
            </p>

          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-1 hover:shadow-lg transition duration-300">

            <div className="text-4xl mb-4">
              📊
            </div>

            <h3 className="text-xl font-semibold mb-2 text-slate-900">
              Instant Results
            </h3>

            <p className="text-slate-500 leading-relaxed">
              Get your score immediately after completing a quiz
              and understand your performance.
            </p>

          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-1 hover:shadow-lg transition duration-300">

            <div className="text-4xl mb-4">
              🏆
            </div>

            <h3 className="text-xl font-semibold mb-2 text-slate-900">
              Leaderboard
            </h3>

            <p className="text-slate-500 leading-relaxed">
              Compete with other users, improve your score,
              and climb the leaderboard.
            </p>

          </div>

        </div>

      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default Home;