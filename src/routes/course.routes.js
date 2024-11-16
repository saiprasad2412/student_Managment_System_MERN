import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createCourse } from "../controllers/course.controller.js";

const router=Router();

router.route("/create").post(verifyJWT,createCourse)
export default router
