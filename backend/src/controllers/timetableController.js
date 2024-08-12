import Timetable from "../models/Timetable.js";
import Classroom from "../models/Classroom.js";

// Create Timetable for a Classroom
const createTimetable = async (req, res) => {
  const { classroomId, subject, startTime, endTime, day } = req.body;
  const teacherId = req.user.id; // Assuming teacher is logged in and authenticated

  try {
    const classroom = await Classroom.findById(classroomId);

    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    if (classroom.teacherId.toString() !== teacherId) {
      return res
        .status(403)
        .json({ message: "You are not assigned to this classroom" });
    }

    // Check if the timetable conflicts with existing ones
    const existingTimetable = await Timetable.findOne({
      classroomId,
      day,
      $or: [
        { startTime: { $lt: endTime, $gte: startTime } },
        { endTime: { $gt: startTime, $lte: endTime } },
      ],
    });

    if (existingTimetable) {
      return res
        .status(400)
        .json({ message: "Timetable conflicts with an existing period" });
    }

    const timetable = new Timetable({
      classroomId,
      subject,
      startTime,
      endTime,
      day,
      teacherId,
    });

    await timetable.save();
    res
      .status(201)
      .json({ message: "Timetable created successfully", timetable });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get Timetable for a Classroom
const getClassroomTimetable = async (req, res) => {
  const { classroomId } = req.params;

  try {
    const timetable = await Timetable.find({ classroomId }).populate(
      "teacherId",
      "name"
    );
    res.status(200).json(timetable);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export { getClassroomTimetable, createTimetable };
