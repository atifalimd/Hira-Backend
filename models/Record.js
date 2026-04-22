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
  type: { type: String, default: "Dhor" }, // Always "Dhor" for this section

  // This array stores the specific mistakes per quarter
  entries: [
    {
      juz: { type: Number, required: true },
      quarter: { type: String, required: true }, // e.g., "1/4", "1/2"
      mistakes: { type: Number, default: 0 },
    },
  ],
});

module.exports = mongoose.model("Record", RecordSchema);
