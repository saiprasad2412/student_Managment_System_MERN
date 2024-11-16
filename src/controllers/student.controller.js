import { Student } from "../models/student.model.js";

const createStudent = async (req, res) => {
    try {
        const { firstName, lastName, email, rollNo,dateOfBirth,gender,address,phone, coursesEnrolled } = req.body;

        if(!firstName || !lastName || !email || !rollNo|| !dateOfBirth  || !gender || !address || !phone) {
            return res.status(400).json({success:false, message:"Please fill all the fields"});
        }
        const student = await Student.create({
            firstName,
            lastName,
            email,
            rollNo,
            dateOfBirth,
            gender,
            address,
            phone,
            coursesEnrolled
        });

        return res.status(201).json({success:true, message:"Student created successfully", student});
        
    } catch (error) {
        return res.status(500).json({success:false, message:error.message||"Something went wrong while creating student"})
        
    }
}
const getStudentInfo = async (req, res) => {
    try {
        // const student = await Student.findById(req.params.id).populate('coursesEnrolled',courseName)
        const student = await Student.findById(req.params.id).populate("coursesEnrolled");

        // .populate("Course").exec();
        if(!student) {
            return res.status(404).json({success:false, message:"Student not found"});
        }
        return res.status(200).json({success:true, student});
        
    } catch (error) {
        return res.status(500).json({success:false, message:error.message||"Something went wrong while getting student info"});
        
    }
}
const updateStudentInfo= async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if(!student) {
            return res.status(404).json({success:false, message:"Student not found"});
        }
        return res.status(200).json({success:true, student});
        
    } catch (error) {
        return res.status(500).json({success:false, message:error.message||"Something went wrong while updating student info"});
    }
}
const deleteStudent= async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if(!student) {
            return res.status(404).json({success:false, message:"Student not found"});
        }
        return res.status(200).json({success:true, message:"Student deleted successfully"});
        
    } catch (error) {
        return res.status(500).json({success:false, message:error.message||"Something went wrong while deleting student"});
    }
}   

export { createStudent, getStudentInfo,updateStudentInfo,deleteStudent }