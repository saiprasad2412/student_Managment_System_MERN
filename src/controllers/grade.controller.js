import { Course } from "../models/course.model.js";
import { Grade } from "../models/grade.model.js";
import { Student } from "../models/student.model.js";

const assignGrade=async(req,res)=>{
    try {
        const {studentId, courseId,marksObtained,totalMarks}=req.body;
        if(!studentId || !courseId || !marksObtained || !totalMarks){
            return res.status(400).json({success:false, message:"Please provide all the fields"})
        }
        const student=await Student.findById(studentId);
        if(!student){
            return res.status(404).json({success:false, message:"Student not found"})
        }
        const course=await Course.findById(courseId);
        if(!course){
            return res.status(404).json({success:false, message:"Course not found"})
        }
        const grade=await Grade.create({
            student:studentId,
            course:courseId,
            marksObtained,
            totalMarks
        })
        return res.status(200).json({success:true, message:"Grade assigned successfully", grade});
        
    } catch (error) {
        return res.status(500).json({success:false, message:error.message||"Something went wrong while assigning grade"});
        
    }
}

export {assignGrade};