import express from "express";
import {
  createClassroom,
  getClassrooms,
  assignTeacher,
  assignStudent,
  classroomDataFetch,
} from "../controllers/classroomController.js";

import auth from "../middlewares/authMiddleware.js";


const router = express.Router();

// Create a Classroom (Principal only)
router.post("/create", auth, createClassroom);

// Get all Classrooms (Principal only)
router.get("/", getClassrooms);

// Assign a Teacher to a Classroom (Principal only)
router.post("/assign-teacher", auth, assignTeacher);

// Assign a Student to a Classroom (Principal/Teacher)
router.post("/assign-student", auth, assignStudent);

router.get("/teacher-classroom", auth, classroomDataFetch);

export default router;
