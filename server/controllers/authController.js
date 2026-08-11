const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
const register = async (req, res) => {
  try {
    console.log("========== REGISTER ==========");
    console.log("Request Body:", req.body);

    const { name, email, password } = req.body;

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const existingUser = await User.findOne({ email });

    console.log("Existing User:", existingUser);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("New User Created:", user);

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error("Register Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Login User
const login = async (req, res) => {
  try {
    console.log("========== LOGIN ==========");
    console.log("Request Body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        score: user.score,
      },
    });

  } catch (err) {
    console.error("Login Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  register,
  login,
};