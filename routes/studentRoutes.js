const express = require("express");
const router = express.Router();
const {
  createStudent,
  getTeacherStudents,
  getParentStudents,
  linkParentToStudent,
} = require("../controllers/studentController");
const { protect } = require("../middleware/authMiddleware");

// PROTECTED ROUTES: Only logged-in users with a valid token can pass
router.post("/", protect, createStudent);
router.get("/", protect, getTeacherStudents);
router.get("/parent", protect, getParentStudents);
router.put("/link", protect, linkParentToStudent);

module.exports = router;
