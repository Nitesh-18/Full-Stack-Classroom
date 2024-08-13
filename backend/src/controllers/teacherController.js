import { User } from "../models/User.js"; // Assuming User model is defined

// Controller function to create a new teacher
const createTeacher = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Create a new user with the role of 'Teacher'
    const newTeacher = new User({
      name,
      email,
      password, // Make sure to hash the password before saving in production
      role: "Teacher",
    });

    // Save the new teacher to the database
    await newTeacher.save();

    res.status(201).json(newTeacher);
  } catch (error) {
    console.error("Error creating teacher:", error);
    res.status(500).json({ error: "Failed to create teacher" });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const teacher = await User.findOneAndDelete({
      _id: teacherId,
      role: "Teacher",
    });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting teacher" });
  }
};

const updateTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const teacher = await User.findByIdAndUpdate(teacherId, req.body, {
      new: true,
    });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json({ message: "Teacher updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating teacher" });
  }
};

const assignClassroomToTeacher = async (req, res) => {
  const teacherId = req.params.id;
  const classroomId = req.body.classroomId;
  try {
    const teacher = await User.findByIdAndUpdate(
      teacherId,
      { classroomId },
      { new: true }
    );
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating teacher" });
  }
};

export {
  createTeacher,
  deleteTeacher,
  updateTeacher,
  assignClassroomToTeacher,
};
