import express from "express";
import {
  createClassroom,
  getClassrooms,
  assignTeacher,
  assignStudent,
} from "../controllers/classroomController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a Classroom (Principal only)
router.post("/create", auth, createClassroom);

// Get all Classrooms (Principal only)
router.get("/", auth, getClassrooms);

// Assign a Teacher to a Classroom (Principal only)
router.post("/assign-teacher", auth, assignTeacher);

// Assign a Student to a Classroom (Principal/Teacher)
router.post("/assign-student", auth, assignStudent);

export default router;
