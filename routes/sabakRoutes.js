const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// GET Sabak History
router.get("/report/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    // Use sabakHistory to match your Schema
    const history = student.sabakHistory ? student.sabakHistory : [];
    res.status(200).json({ history });
  } catch (err) {
    res.status(500).json({ message: "Error fetching Sabak" });
  }
});

// ADD Sabak Entry
router.post("/add/:id", async (req, res) => {
  try {
    const { lines, mistakes } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { $push: { sabakHistory: { lines, mistakes, date: new Date() } } },
      { new: true }
    );
    res.status(200).json({ history: updatedStudent.sabakHistory });
  } catch (err) {
    res.status(500).json({ message: "Failed to save Sabak" });
  }
});

// DELETE Sabak Entry
router.delete("/delete/:studentId/:entryId", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.studentId,
      { $pull: { sabakHistory: { _id: req.params.entryId } } },
      { new: true }
    );
    res.status(200).json({ history: updatedStudent.sabakHistory });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
