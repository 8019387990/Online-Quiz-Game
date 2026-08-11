function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              QuizMaster
            </h2>

            <p className="mt-4 text-slate-400 leading-relaxed">
              Test your knowledge, improve your skills,
              and challenge yourself with interactive quizzes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">
              <a href="/" className="hover:text-blue-400 transition">
                Home
              </a>

              <a href="/login" className="hover:text-blue-400 transition">
                Login
              </a>

              <a href="/register" className="hover:text-blue-400 transition">
                Register
              </a>

              <a href="/dashboard" className="hover:text-blue-400 transition">
                Dashboard
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Connect With Us
            </h3>

            <p className="text-slate-400">
              📧 support@quizmaster.com
            </p>

            <p className="text-slate-400 mt-3">
              🌐 Online Quiz Platform
            </p>
          </div>

        </div>

        <div className="border-t border-slate-700 mt-10 pt-6 text-center">
          <p className="text-slate-500">
            © 2026 QuizMaster. All rights reserved.
          </p>
        </div>

      </div>

    </footer>
  );
}

export default Footer;