const mongoose = require("mongoose");

const DailyLogSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // This allows us to search by range
    required: true,
  },
  // The 5 Sections
  dhor: { type: String, default: "" },
  sabakPara: { type: String, default: "" },
  sabak: { type: String, default: "" },
  grade: { type: String, default: "" },
  detention: { type: Boolean, default: false },

  // Meta-data for Admin/Teacher tracking
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isPresent: { type: Boolean, default: true },
});

// Indexing for high-performance searching by date and student
DailyLogSchema.index({ studentId: 1, date: -1 });

module.exports = mongoose.model("DailyLog", DailyLogSchema);
