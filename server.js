require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");
const logRoutes = require("./routes/logRoutes");

const app = express();

// 1. Middleware - Clean & Secure
app.use(express.json());
app.use(cors());

// 2. Database Connection - Simplified
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Successfully connected to HIRA-Cluster"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 3. Health Check Routes
app.get("/", (req, res) => res.send("Hira Institute Backend is Running!"));

// 4. Routes - Pointing to our new Auth structure
// Note: I removed the Google Auth get route from here; it belongs in authRoutes.js if needed.
app.use("/api/auth", require("./routes/authRoutes"));

// Other routes (Keep these as placeholders until files are ready)
app.use("/api/students", studentRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/attendance", require("./routes/attendanceRoutes"));
// Add others as you create the files...


const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
}

module.exports = app;
