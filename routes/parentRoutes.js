const express = require("express");
const router = express.Router();
const DailyLog = require("../models/DailyLog");

router.get("/history/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const { startDate, endDate } = req.query;

    let query = { studentId };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const logs = await DailyLog.find(query).sort({ date: -1 }); // Newest first
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

module.exports = router;
