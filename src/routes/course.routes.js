import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addStudentsToCourse, createCourse, getCourseInfo } from "../controllers/course.controller.js";

const router=Router();

router.route("/create").post(verifyJWT,createCourse)
router.route("/add-students/:id").post(verifyJWT,addStudentsToCourse)
router.route("/getcourse-info/:id").get(verifyJWT,getCourseInfo)
export default router
