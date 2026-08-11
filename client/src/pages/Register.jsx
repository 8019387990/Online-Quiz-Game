import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();

      console.log("Status:", response.status);
      console.log("Response:", data);

      if (response.ok) {
        alert(data.message || "Registration Successful!");

        setUser({
          name: "",
          email: "",
          password: "",
        });

        navigate("/login");
      } else {
        alert(data.message || "Registration Failed!");
      }
    } catch (error) {
      console.error("Registration Error:", error);

      alert(
        "Unable to connect to server.\n\n" +
          "Make sure your backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="text-4xl font-bold text-white"
          >
            QuizMaster
          </Link>

          <p className="text-blue-100 mt-2">
            Start your quiz journey today 🚀
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              Create Account
            </h1>

            <p className="text-slate-500 mt-2">
              Join QuizMaster and start learning
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="mb-5">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={user.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />

            </div>

            {/* Email */}
            <div className="mb-5">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={user.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />

            </div>

            {/* Password */}
            <div className="mb-6">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={user.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pr-20 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-blue-600 hover:text-blue-800"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition shadow-lg"
            >
              {loading ? "Creating Account..." : "Create Account →"}
            </button>

          </form>

          {/* Login */}
          <div className="text-center mt-6">

            <p className="text-slate-500">
              Already have an account?
            </p>

            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:text-blue-800 transition"
            >
              Login to your account
            </Link>

          </div>

          {/* Back Home */}
          <div className="text-center mt-5">

            <Link
              to="/"
              className="text-sm text-slate-400 hover:text-slate-600"
            >
              ← Back to Home
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;