const Student = require("../models/Student");

// @desc    Create a student with parent emails
// @route   POST /api/students
exports.createStudent = async (req, res) => {
  try {
    // Capturing parent emails from the teacher's input
    const { name, classId, parentEmail1, parentEmail2 } = req.body;

    // Filter out empty strings to keep the array clean
    const parentEmails = [parentEmail1, parentEmail2].filter(
      (email) => email && email.trim() !== ""
    );

    const student = await Student.create({
      name,
      classId,
      teacherId: req.user._id,
      parentEmails, // Using the new array-based system
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all students for the logged-in teacher
exports.getTeacherStudents = async (req, res) => {
  try {
    const students = await Student.find({ teacherId: req.user._id });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get students for a parent (matching by their registration email)
exports.getParentStudents = async (req, res) => {
  try {
    // Automated matching: Find students where the parent's email is in the list
    const students = await Student.find({
      parentEmails: req.user.email,
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Manual Link (Updated to use Email instead of parentId)
exports.linkParentToStudent = async (req, res) => {
  try {
    const { studentId } = req.body;

    // Instead of setting a 'parentId', we add the parent's email to the authorized list
    const student = await Student.findByIdAndUpdate(
      studentId,
      { $addToSet: { parentEmails: req.user.email } }, // $addToSet prevents duplicate emails
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.json({ message: "Student linked successfully!", student });
  } catch (error) {
    res.status(500).json({ message: "Invalid Student ID format." });
  }
};
