import mongoose from "mongoose"

const teacherSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        lowercase:true,
    },
    lastName:{
        type:String,
        required:true,
        lowercase:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    phone:{
        type:String,
        required:true
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
},{timestamps:true})

export const Teacher=mongoose.model("Teacher", teacherSchema)