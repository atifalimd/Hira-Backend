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
    // The "Magic" Array: Stores emails of parents authorized to see this student
    parentEmails: [
      {
        type: String,
        lowercase: true, // Forces "MOM@email.com" to "mom@email.com"
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

// This index makes searching by email much faster
studentSchema.index({ parentEmails: 1 });

module.exports = mongoose.model("Student", studentSchema);
