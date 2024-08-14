import { Router } from "express";
import { updateStudent, deleteStudent, createStudent } from "../controllers/studentController.js";
import auth from "../middlewares/authMiddleware.js";

const router = Router();

// POST request to create a new student
router.post('/create-student',auth, createStudent);

// Update student details
router.put("/update-student/:id", auth, updateStudent);

// Delete a student by ID
router.delete("/delete-student/:id", auth, deleteStudent);

export default router;
