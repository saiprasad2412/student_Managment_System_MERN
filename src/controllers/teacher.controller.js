import { Teacher } from "../models/teacher.model.js";

const createTeacher=async(req,res)=>{
    try {
        const {firstName,lastName,email,phone,courses}=req.body;

        if(!firstName || !lastName || !email || !phone) {
            return res.status(400).json({success:false, message:"Please fill all the fields"});
        }
        const teacher=await Teacher.create({
            firstName,
            lastName,
            email,
            phone,
            courses
        });

        return res.status(201).json({success:true, message:"Teacher created successfully", teacher});
        
    } catch (error) {
        return res.status(500).json({success:false, message:error.message||"Something went wrong while creating teacher"})
        
    }
}
export {createTeacher}
    