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

// DEBUGGING MIDDLEWARE: Log every request
app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} request to: ${req.url}`
  );
  next();
});

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

// ... all your app.use routes are ABOVE this ...

// --- MOVE THE DEBUG BLOCK HERE ---
if (app._router && app._router.stack) {
  console.log("--- REGISTERED ROUTES ---");
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      console.log(
        `Route: ${Object.keys(middleware.route.methods)} ${
          middleware.route.path
        }`
      );
    } else if (middleware.name === "router") {
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          console.log(
            `Router Path: ${Object.keys(handler.route.methods)} /api/auth${
              handler.route.path
            }`
          );
        }
      });
    }
  });
  console.log("-------------------------");
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

module.exports = app;
