const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.get("/report/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const history = student.dhorLogs
      ? student.dhorLogs.slice(-5).reverse()
      : [];
    res.status(200).json({ name: student.name, history });
  } catch (err) {
    res.status(500).json({ message: "Error fetching report" });
  }
});

router.post("/add/:id", async (req, res) => {
  try {
    const { juz, quarter, mistakes } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { $push: { dhorLogs: { juz, quarter, mistakes, date: new Date() } } },
      { new: true }
    );
    const history = updatedStudent.dhorLogs.slice(-5).reverse();
    res.status(200).json({ history });
  } catch (err) {
    res.status(500).json({ message: "Failed to save entry" });
  }
});

router.delete("/delete/:studentId/:entryId", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.studentId,
      { $pull: { dhorLogs: { _id: req.params.entryId } } },
      { new: true }
    );
    const history = updatedStudent.dhorLogs.slice(-5).reverse();
    res.status(200).json({ history });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
