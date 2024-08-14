import { Router } from 'express';
const router = Router();
import { getAllUsers } from '../controllers/userController.js';

// Route to get all users
router.get("/getusers", getAllUsers);

export default router;
