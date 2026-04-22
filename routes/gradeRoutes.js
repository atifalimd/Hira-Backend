const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// GET Grade History
router.get("/report/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Return full logs; Frontend handles the slicing/sorting
    res.status(200).json({ history: student.gradeLogs || [] });
  } catch (err) {
    res.status(500).json({ message: "Error fetching grades" });
  }
});

// ADD Grade Entry
router.post("/add/:id", async (req, res) => {
  try {
    const { score, comment } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $push: { gradeLogs: { score, comment, date: new Date() } },
      },
      { new: true }
    );
    // Return all logs to sync the frontend history state
    res.status(200).json({ history: updatedStudent.gradeLogs });
  } catch (err) {
    res.status(500).json({ message: "Failed to save Grade" });
  }
});

// DELETE Grade Entry
router.delete("/delete/:studentId/:entryId", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.studentId,
      { $pull: { gradeLogs: { _id: req.params.entryId } } },
      { new: true }
    );
    res.status(200).json({ history: updatedStudent.gradeLogs });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
