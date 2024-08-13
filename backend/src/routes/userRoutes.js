import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import  auth  from "../middlewares/authMiddleware.js"; // Add auth middleware if needed

const router = express.Router();

// Route to get all users
router.get("/getusers", getAllUsers);

export default router;
