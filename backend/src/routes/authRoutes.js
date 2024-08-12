import { Router } from "express";
import { check } from "express-validator";
import { registerUser, loginUser } from "../controllers/authControllers.js";

const router = Router();

// Registration Route
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
    check("role", "Role is required").isIn(["Principal", "Teacher", "Student"]),
  ],
  registerUser
);

// Login Route
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  loginUser
);

export default router;
