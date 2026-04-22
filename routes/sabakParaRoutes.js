const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Add Sabak entry (POST /api/sabak/add/:id)

router.get("/report/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Use the exact schema name here
    res.status(200).json({ history: student.sabakParaHistory || [] });
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ message: "Error fetching history" });
  }
});

router.post("/add/:id", async (req, res) => {
  try {
    const { juz, quarter, slide, mistakes } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          sabakParaHistory: { juz, quarter, slide, mistakes, date: new Date() },
        },
      },
      { new: true }
    );
    // Send back the last 5 Sabak entries
    const history = updatedStudent.sabakParaHistory.slice(-5).reverse();
    res.status(200).json({ history });
  } catch (err) {
    res.status(500).json({ message: "Failed to save SabakPara" });
  }
});

// Delete Sabak entry (DELETE /api/sabak/delete/:studentId/:entryId)
router.delete("/delete/:studentId/:entryId", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.studentId,
      { $pull: { sabakParaHistory: { _id: req.params.entryId } } },
      { new: true }
    );
    const history = updatedStudent.sabakParaHistory.slice(-5).reverse();
    res.status(200).json({ history });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
