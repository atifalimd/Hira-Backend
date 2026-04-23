// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const studentRoutes = require("./routes/studentRoutes");
// const logRoutes = require("./routes/logRoutes");

// const app = express();

// const allowedOrigins = [
//   "http://localhost:5173", // Your local frontend
//   "https://hirainstitute.co.uk", // Your live frontend
// ];

// // 1. Middleware - Clean & Secure
// app.use(express.json());
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://hirainstitute.co.uk",
//       "https://www.hirainstitute.co.uk",
//     ],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // 2. Database Connection - Simplified
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ Successfully connected to HIRA-Cluster"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // 3. Health Check Routes
// app.get("/", (req, res) => res.send("Hira Institute Backend is Running!"));

// // 4. Routes - Pointing to our new Auth structure
// // Note: I removed the Google Auth get route from here; it belongs in authRoutes.js if needed.
// app.use("/api/auth", require("./routes/authRoutes"));

// // Other routes (Keep these as placeholders until files are ready)
// app.use("/api/students", studentRoutes);
// app.use("/api/logs", logRoutes);
// app.use("/api/attendance", require("./routes/attendanceRoutes"));
// // Add others as you create the files...

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// });

// module.exports = app;

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import Routes
const studentRoutes = require("./routes/studentRoutes");
const logRoutes = require("./routes/logRoutes");
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();

// 1. Middleware
app.use(express.json());

// 2. CORS Configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://hirainstitute.co.uk",
      "https://www.hirainstitute.co.uk",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 3. Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Successfully connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 4. Health Check Route
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: "ok", message: "Hira Institute Backend is Running!" });
});

// 5. API Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/attendance", attendanceRoutes);

// 6. 404 Catch-all (This tells you exactly what URL failed)
app.use((req, res) => {
  console.log(`404 Error: ${req.method} ${req.url} not found`);
  res.status(404).json({ error: "Route not found", path: req.url });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

module.exports = app;
