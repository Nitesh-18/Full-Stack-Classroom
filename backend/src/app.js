import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import auth from "./middlewares/authMiddleware.js";
import classroomRoutes from './routes/classroomRoutes.js';
import timetableRoutes from './routes/timetableRoutes.js';
import { getAllUsers } from "./controllers/userController.js";
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// Init Middleware
app.use(express.json());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Define Routes
app.use("/api/auth", authRoutes); // <-- Added auth routes

app.use("/api/classrooms", classroomRoutes); // <-- Added classroom routes

app.use("/api/timetable", timetableRoutes); // Timetable Routes

app.use("/api/users", userRoutes); // To fetch All users

app.use("/api/users", studentRoutes); 

app.use("/api/users", teacherRoutes); 

app.get("/api/protected", auth, (req, res) => {
  res.json({
    message: `Hello ${req.user.role}, you have accessed a protected route!`,
  });
});

export { app };
