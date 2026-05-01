const Log = require("../models/Log");

exports.createLog = async (req, res) => {
  try {
    const { studentId, sabaq, sabaqi, manzil } = req.body;

    const log = await Log.create({
      studentId,
      teacherId: req.user._id,
      sabaq,
      sabaqi,
      manzil,
    });

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStudentLogs = async (req, res) => {
  try {
    const logs = await Log.find({ studentId: req.params.studentId }).sort({
      createdAt: -1,
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
