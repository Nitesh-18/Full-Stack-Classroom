import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/authRoutes.js";
import auth from "./middlewares/authMiddleware.js";


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
// Init Middleware
app.use(express.json());

// Define Routes
app.use("/api/auth", router);

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

app.get('/api/protected', auth, (req, res) => {
    res.json({ message: `Hello ${req.user.role}, you have accessed a protected route!` });
  });

export {app};