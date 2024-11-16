import { Course } from "../models/course.model.js";

const createCourse= async (req, res) => {
    try {
        const{courseName, courseCode, courseDescription, credits,courseStudents}=req.body;

        if(!courseName || !courseCode || !courseDescription || !credits || !courseStudents) {
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            })
        }
        const newCourse= await Course.create({
            courseName,
            courseCode,
            courseDescription,
            credits,
            courseStudents
        })

        return res.status(201).json({
            success:true,
            message:"Course created successfully",
            newCourse
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message||"Something went wrong while creating course"
        })
        
    }
}

export {createCourse}