const express = require("express");
const router = express.Router();
const Record = require("../models/Record");

// POST: Save a Dhor Session
router.post("/add-dhor", async (req, res) => {
  try {
    const { studentId, teacherId, entries, date } = req.body;

    const newRecord = new Record({
      studentId,
      teacherId,
      entries, // This is the array of {juz, quarter, mistakes}
      date: date || Date.now(),
    });

    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: Fetch records for a specific student (To see history)
router.get("/student/:studentId", async (req, res) => {
  try {
    const records = await Record.find({ studentId: req.params.studentId }).sort(
      { date: -1 }
    );
    res.json(records);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/update-dhor/:id", async (req, res) => {
  try {
    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true } // returns the new version and checks rules
    );
    res.json(updatedRecord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
