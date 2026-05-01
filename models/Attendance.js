const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["Present", "Absent", "Late"], required: true },
  reason: { type: String },
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
