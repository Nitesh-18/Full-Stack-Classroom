import {Classroom} from "../models/Classroom.js";
import {User} from "../models/User.js";

// Create a Classroom
const createClassroom = async (req, res) => {
  const { name, startTime, endTime, days } = req.body;

  try {
    const classroom = new Classroom({
      name,
      startTime,
      endTime,
      days,
    });

    await classroom.save();
    res
      .status(201)
      .json({ message: "Classroom created successfully", classroom });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all Classrooms
const getClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find()
      .populate("teacher")
      .populate("students");
    res.status(200).json(classrooms);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Assign a Teacher to a Classroom
const assignTeacher = async (req, res) => {
  const { classroomId, teacherId } = req.body;

  try {
    const classroom = await Classroom.findById(classroomId);
    const teacher = await User.findById(teacherId);

    if (teacher.role !== "Teacher") {
      return res.status(400).json({ message: "User is not a teacher" });
    }

    classroom.teacher = teacher;
    await classroom.save();

    res
      .status(200)
      .json({ message: "Teacher assigned successfully", classroom });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Assign a Student to a Classroom
const assignStudent = async (req, res) => {
  const { classroomId, studentId } = req.body;

  try {
    const classroom = await Classroom.findById(classroomId);
    const student = await User.findById(studentId);

    if (student.role !== "Student") {
      return res.status(400).json({ message: "User is not a student" });
    }

    classroom.students.push(student);
    await classroom.save();

    res
      .status(200)
      .json({ message: "Student assigned successfully", classroom });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export { createClassroom, assignStudent, assignTeacher, getClassrooms };
