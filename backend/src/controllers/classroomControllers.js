import Classroom from "../models/Classroom.js";
import User from "../models/User.js";

// Create Classroom
export const createClassroom = async (req, res) => {
  const { name, startTime, endTime, days } = req.body;

  try {
    // Create the classroom
    const classroom = new Classroom({
      name,
      startTime,
      endTime,
      days,
    });

    await classroom.save();
    res.status(201).json(classroom);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Assign Teacher to Classroom
export const assignTeacher = async (req, res) => {
  const { teacherId, classroomId } = req.body;

  try {
    const teacher = await User.findById(teacherId);
    const classroom = await Classroom.findById(classroomId);

    if (!teacher || !classroom) {
      return res
        .status(404)
        .json({ message: "Teacher or Classroom not found" });
    }

    if (teacher.role !== "Teacher") {
      return res.status(400).json({ message: "User is not a teacher" });
    }

    // Assign the teacher
    classroom.teacher = teacherId;
    await classroom.save();

    res.json({ message: "Teacher assigned to classroom", classroom });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
