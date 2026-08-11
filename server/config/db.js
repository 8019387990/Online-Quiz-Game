const mongoose = require("mongoose");
const dns = require("node:dns");

// Use Google's DNS servers
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

async function connectDB() {
  try {
    console.log("MONGO_URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Error:");
    console.error(err);
    process.exit(1);
  }
}

module.exports = connectDB;