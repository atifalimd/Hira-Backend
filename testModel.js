const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Student = require("./models/Student.js");

dotenv.config();

const test = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected for testing...");

    // Create a dummy student
    const dummy = await Student.create({
      name: "Test Student",
      classId: "Level-1-Gold", // Manual entry like the PDF
      teacherId: new mongoose.Types.ObjectId(), // Fake ID for now
    });

    console.log("✅ Student Model Working:", dummy);
    process.exit(0);
  } catch (err) {
    console.error("❌ Model Error:", err.message);
    process.exit(1);
  }
};

test();
