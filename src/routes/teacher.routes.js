import { Router } from "express";
import { createTeacher } from "../controllers/teacher.controller.js";

const router=Router();
router.route("/create").post(createTeacher);

export default router;