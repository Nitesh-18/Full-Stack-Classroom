import express from "express";
import {
  createTimetable,
  getClassroomTimetable,
} from "../controllers/timetableController.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a Timetable (Only teachers can create timetables)
router.post("/create", auth, createTimetable);

// Get Timetable for a Classroom
router.get("/:classroomId", auth, getClassroomTimetable);

export default router;
