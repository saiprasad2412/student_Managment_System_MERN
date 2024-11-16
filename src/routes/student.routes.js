import { Router } from "express";
import { createStudent, deleteStudent, getStudentInfo, updateStudentInfo } from "../controllers/student.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router=Router();

router.route("/create").post(verifyJWT,createStudent);
router.route("/:id").get(verifyJWT,getStudentInfo);
router.route("/:id").put(verifyJWT,updateStudentInfo);
router.route("/:id").delete(verifyJWT,deleteStudent);


export default router;