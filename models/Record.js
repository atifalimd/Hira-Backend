const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: Date, default: Date.now },
  type: { type: String, default: "Dhor" },

  entries: [
    {
      juz: { type: Number, required: true },
      quarter: { type: String, required: true },
      mistakes: { type: Number, default: 0 },
    },
  ],
});

module.exports = mongoose.model("Record", RecordSchema);
