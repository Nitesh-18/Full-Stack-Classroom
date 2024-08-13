import { Classroom } from "../models/Classroom.js";
import { User } from "../models/User.js";

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
      .populate("teacherId")
      .populate("students");
    res.json(classrooms);
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

    classroom.teacherId = teacher;
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

    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.role !== "Student") {
      return res.status(400).json({ message: "User is not a student" });
    }

    // Initialize the students array if it doesn't exist
    if (!classroom.students) {
      classroom.students = [];
    };

    classroom.students.push(student._id);
    await classroom.save();

    res
      .status(200)
      .json({ message: "Student assigned successfully", classroom });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const classroomDataFetch = async (req, res) => {
  try {
    const teacherId = req.user.id; // Assuming `authMiddleware` adds the logged-in user's id to `req.user`

    // Find the classroom assigned to this teacher
    const classroom = await Classroom.findOne({ teacherId }).populate("teacherId", "name");

    if (!classroom) {
      return res.status(404).json({ message: "No classroom assigned to this teacher" });
    }

    // Find all students in this classroom
    const students = await User.find({ role: "Student", classroomId: classroom._id }, "name age");

    res.json({ classroom, students });
  } catch (error) {
    console.error("Error fetching classroom and students:", error);
    res.status(500).json({ message: "Server error" });
  };
};


export { createClassroom, assignStudent, assignTeacher, getClassrooms , classroomDataFetch};
