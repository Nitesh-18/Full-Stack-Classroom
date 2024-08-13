import { Router } from "express";
import { updateStudent, deleteStudent } from "../controllers/studentController";
import auth from "../middlewares/authMiddleware";

const router = Router();

// Update student details
router.put("/update/:id", auth, updateStudent);

// Delete a student by ID
router.delete("/delete/:id", auth, deleteStudent);

export default router;
