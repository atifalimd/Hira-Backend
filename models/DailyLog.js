const mongoose = require("mongoose");

const DailyLogSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },

  dhor: { type: String, default: "" },
  sabakPara: { type: String, default: "" },
  sabak: { type: String, default: "" },
  grade: { type: String, default: "" },
  detention: { type: Boolean, default: false },

  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isPresent: { type: Boolean, default: true },
});

DailyLogSchema.index({ studentId: 1, date: -1 });

module.exports = mongoose.model("DailyLog", DailyLogSchema);
