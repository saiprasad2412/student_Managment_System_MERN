import mongoose from "mongoose";

const attendanceSchema= new mongoose.Schema({
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
    date:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:["Present","Absent", "Late"],
        required:true
    }
});
const Attendance= mongoose.model("Attendance", attendanceSchema);