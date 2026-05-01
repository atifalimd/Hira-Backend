const Student = require("../models/Student");

exports.createStudent = async (req, res) => {
  try {
    const { name, classId, parentEmail1, parentEmail2 } = req.body;
    const parentEmails = [parentEmail1, parentEmail2].filter(
      (email) => email && email.trim() !== ""
    );

    const student = await Student.create({
      name,
      classId,
      teacherId: req.user._id,
      parentEmails,
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTeacherStudents = async (req, res) => {
  try {
    const students = await Student.find({ teacherId: req.user._id });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getParentStudents = async (req, res) => {
  try {
    const students = await Student.find({
      parentEmails: req.user.email,
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.linkParentToStudent = async (req, res) => {
  try {
    const { studentId } = req.body;

    const student = await Student.findByIdAndUpdate(studentId, { new: true });

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.json({ message: "Student linked successfully!", student });
  } catch (error) {
    res.status(500).json({ message: "Invalid Student ID format." });
  }
};
