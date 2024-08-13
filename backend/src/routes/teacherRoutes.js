import { Router } from 'express';
const router = Router();
import { assignClassroomToTeacher, createTeacher, deleteTeacher, updateTeacher } from '../controllers/teacherController.js';
import auth from '../middlewares/authMiddleware.js';

// POST route to create a new teacher
router.post('/create-teacher',auth, createTeacher);

router.put('/update-teacher/:id',auth, updateTeacher);

router.put('/assign-classroom-to-teacher/:id',auth, assignClassroomToTeacher);

router.delete('/delete-teacher/:id',auth, deleteTeacher);


export default router;
