const Log = require("../models/Log");

// @desc    Create a daily progress log
// @route   POST /api/logs
exports.createLog = async (req, res) => {
  try {
    const { studentId, sabaq, sabaqi, manzil } = req.body;

    const log = await Log.create({
      studentId,
      teacherId: req.user._id, // From Auth Middleware
      sabaq,
      sabaqi,
      manzil,
    });

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logs for a specific student
// @route   GET /api/logs/:studentId
exports.getStudentLogs = async (req, res) => {
  try {
    const logs = await Log.find({ studentId: req.params.studentId }).sort({
      createdAt: -1,
    }); // Newest first
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
