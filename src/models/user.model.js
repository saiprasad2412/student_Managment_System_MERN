import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:[true, "Password is required"]
    },
    role:{
        type:String,
        enum:["Student", "Teacher", "Admin"],
        required:true
    }
}, {timestamps:true})

//encrypt password
userSchema.pre("save",async function(next){
    if(!this.isModified("password"))next();
    this.password=await bcrypt.hash(this.password, 10)
})

//check password is correct or not
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken= function(){
    return jwt.sign({
        _id:this._id,
        email: this.email,
        role: this.role
    }, "NBGtfy76879vcgv", {
        expiresIn:"1d"
    })
}

export const User= mongoose.model("User", userSchema)