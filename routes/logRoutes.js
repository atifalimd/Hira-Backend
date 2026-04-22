const express = require("express");
const router = express.Router();
const { createLog, getStudentLogs } = require("../controllers/logController");
const { protect } = require("../middleware/authMiddleware");

// Secure these routes with the 'protect' middleware
router.post("/", protect, createLog);
router.get("/:studentId", protect, getStudentLogs);

module.exports = router;
