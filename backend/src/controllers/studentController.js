import express from "express";
import { User } from "../models/User.js";
import bcrypt from 'bcryptjs';

const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { name, age, classroomId } = req.body;

    // Find the user by ID and ensure the role is 'Student'
    const updatedStudent = await User.findOneAndUpdate(
      { _id: studentId, role: "Student" },
      { name, age, classroomId },
      { new: true } // Return the updated document
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student updated successfully", updatedStudent });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    // Find the user by ID and ensure the role is 'Student'
    const deletedStudent = await User.findOneAndDelete({
      _id: studentId,
      role: "Student",
    });

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const createStudent = async (req, res) => {
  try {
    const { name, email, password, classroomId } = req.body;

    // Check if a student with the same email already exists
    const existingStudent = await User.findOne({ email, role: "Student" });
    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "Student with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student
    const newStudent = new User({
      name,
      email,
      password: hashedPassword,
      role: "Student",
      classroom: classroomId,
    });

    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Error creating student:", error);
    if (error.name === "ValidationError") {
      res
        .status(400)
        .json({ message: "Validation error", details: error.errors });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};

export { updateStudent, deleteStudent, createStudent };
