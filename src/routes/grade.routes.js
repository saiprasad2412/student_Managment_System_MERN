import { Router } from "express";
import { assignGrade } from "../controllers/grade.controller.js";

const router=Router();

router.route("/assign-grade").post(assignGrade);

export default router