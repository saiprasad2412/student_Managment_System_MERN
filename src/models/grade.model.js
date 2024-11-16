import mongoose from "mongoose";

const gradeSchema= new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
        required:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required:true
    },
    assignmentName:{
        type:String,
        required:true
    },
    marksObtained:{
        type:Number,
        required:true
    },
    totalMarks:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});
const Grade= mongoose.model("Grade", gradeSchema);