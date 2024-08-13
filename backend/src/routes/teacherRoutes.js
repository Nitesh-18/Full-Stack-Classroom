import { Router } from 'express';
const router = Router();
import { createTeacher } from '../controllers/teacherController.js';
import auth from '../middlewares/authMiddleware.js';

// POST route to create a new teacher
router.post('/create-teacher',auth, createTeacher);

export default router;
