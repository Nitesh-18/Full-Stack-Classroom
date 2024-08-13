import { Router } from "express";
import { updateStudent, deleteStudent } from "../controllers/studentController.js";
import auth from "../middlewares/authMiddleware.js";

const router = Router();

// Update student details
router.put("/update-student/:id", auth, updateStudent);

// Delete a student by ID
router.delete("/delete-student/:id", auth, deleteStudent);

export default router;
