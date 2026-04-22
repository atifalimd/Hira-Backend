const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
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
    sabaq: {
      surah: String,
      verses: String, // e.g., "1-10"
      status: {
        type: String,
        enum: ["Excellent", "Good", "Needs Work"],
        default: "Good",
      },
    },
    sabaqi: {
      surah: String,
      pages: String,
    },
    manzil: {
      juz: String,
      status: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Log", logSchema);
