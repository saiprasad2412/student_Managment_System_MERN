import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app= express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//routes
import userRouter from "./routes/user.routes.js";
import studentRouter from "./routes/student.routes.js";
import courseRouter from "./routes/course.routes.js";
import teacherRouter from "./routes/teacher.routes.js";
import gradeRouter from "./routes/grade.routes.js";
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/students",studentRouter);
app.use("/api/v1/courses",courseRouter);
app.use("/api/v1/teacher",teacherRouter);
app.use("/api/v1/grade",gradeRouter);

export {app}
