const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");
const resultRoutes = require("./routes/resultRoutes");

const app = express();

// ==============================
// CONNECT MONGODB
// ==============================
connectDB();

// ==============================
// MIDDLEWARE
// ==============================
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// ==============================
// ROUTES
// ==============================
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/results", resultRoutes);

// ==============================
// TEST ROUTES
// ==============================

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Test API is working!",
  });
});

app.post("/hello", (req, res) => {
  console.log("Hello route hit");

  res.json({
    message: "Hello POST works",
  });
});

// ==============================
// START SERVER
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});