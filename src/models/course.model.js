import mongoose from "mongoose";
const courseSchema=new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        index:true
    },
    courseCode:{
        type:String,
        required:true,
        unique:true,
    },
    courseDescription:{
        type:String,
        required:true,
    },
    credits:{
        type:Number,
        required:true
    },
    courseTeacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher',
        // required:true
    },
    courseStudents:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
        // required:true
    }]
},{timestamps:true})

export const Course= mongoose.model("Course", courseSchema)