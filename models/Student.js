const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    classId: {
      type: String,
      required: true,
      trim: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    parentEmails: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

studentSchema.index({ parentEmails: 1 });

module.exports = mongoose.model("Student", studentSchema);
