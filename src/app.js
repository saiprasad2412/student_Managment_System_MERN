import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Apply CORS middleware with specific configuration
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Import Routes
import userRouter from "./routes/user.routes.js";
import studentRouter from "./routes/student.routes.js";
import courseRouter from "./routes/course.routes.js";
import teacherRouter from "./routes/teacher.routes.js";
import gradeRouter from "./routes/grade.routes.js";

// Mount Routes
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/teacher", teacherRouter);
app.use("/api/v1/grade", gradeRouter);

export { app };
