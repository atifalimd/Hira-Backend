const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

// POST: Mark attendance
router.post("/mark", async (req, res) => {
  try {
    const newEntry = new Attendance(req.body);
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
