import { Course } from "../models/course.model.js";
import { Student } from "../models/student.model.js";

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
 const addStudentsToCourse = async (req, res) => {
    console.log('req.body',req.params.id);
    
    try {
        // const { courseId } = req.params.id; // Course ID from the route
        const { studentIds } = req.body; // List of Student IDs to be added

        if (!studentIds || !Array.isArray(studentIds)) {
            return res.status(400).json({ success: false, message: "Provide a valid array of student IDs" });
        }
        // console.log('courseId',courseId);
        

        // Validate if course exists
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        // Validate if all students exist
        const validStudents = await Student.find({ _id: { $in: studentIds } });
        if (validStudents.length !== studentIds.length) {
            return res.status(404).json({
                success: false,
                message: "Some students were not found. Please check the provided IDs.",
            });
        }

        // Add students to the course's `courseStudents` field
        course.courseStudents.push(...studentIds.filter(id => !course.courseStudents.includes(id)));

        // Save the course
        await course.save();

        // Update students' `coursesEnrolled` field
        await Student.updateMany(
            { _id: { $in: studentIds } },
            { $addToSet: { coursesEnrolled: courseId } }
        );

        return res.status(200).json({ success: true, message: "Students added to the course successfully", course });

    } catch (error) {
        console.error("Error adding students to course:", error);
        return res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
}
const getCourseInfo = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate("courseStudents");
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }
        return res.status(200).json({ success: true, course });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message || "Something went wrong while getting course info" });
    }
}

export {createCourse,addStudentsToCourse,getCourseInfo}