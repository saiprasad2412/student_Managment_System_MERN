import mongoose from "mongoose";

const studentSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        // lowercase:true,
        trim:true,
        index:true
    },
    lastName:{
        type:String,
        required:true,
        // lowercase:true,
        trim:true,
        index:true
    },
    // fullName:{
    //     type:String,
    //     required:true,
    //     lowercase:true,
    //     trim:true,
    //     index:true
    // },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true,
    },
    rollNo:{
        type:String,
        required:true,
    },
    dateOfBirth:{
        type:Date,
        // required:true
    },
    gender:{
        type:String,
        enum:['Male','Female','Other'],
        required:true
    },
    address:{
        type:String,
        required:true
        // city:{
        //     type:String,
        //     required:true
        // },
        // state:{
        //     type:String,
        //     required:true
        // },
        // pincode:{
        //     type:String,
        //     required:true
        // },
    },
    phone:{
        type:String,
        required:true
    },
    coursesEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'  // Referring to the Course model
    }]
    
    

},{timestamps:true})

export const Student=mongoose.model("Student", studentSchema)