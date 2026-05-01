const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.get("/report/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json({ history: student.gradeLogs || [] });
  } catch (err) {
    res.status(500).json({ message: "Error fetching grades" });
  }
});

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

    res.status(200).json({ history: updatedStudent.gradeLogs });
  } catch (err) {
    res.status(500).json({ message: "Failed to save Grade" });
  }
});

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
