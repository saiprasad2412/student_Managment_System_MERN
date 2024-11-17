import { json } from "express";
import {User} from "../models/user.model.js"

const registerUser = async(req,res)=>{
    try {
        const {firstName,lastName,email,password, role}=req.body;
        if(firstName==="" || lastName==="" || email==="" || password==="" || role===""){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            })
        }
        //check for user already exist or not
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(409),json({
                success:false,
                message:"User already exist"
            })
        }

        const user= await User.create({
            firstName,
            lastName,
            email,
            password,
            role
        })

        const createdUser= await User.findById(user._id).select("-password -refreshToken");

        if(!createdUser){
            return res.status(400).json({
                success:false,
                message:"Something went wrong while creating user"
            })
        }
        return res.status(201).json({
            success:true,
            message:"User created successfully",
            user:createdUser
        })
        
    } catch (error) {
        console.log("error in register user", error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while registering user"
        })
        
        
    }
}
const loginUser= async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(email===""|| password===""){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            })
        }

        //check for user already exist or not
        const existingUser= await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({
                success:false,
                message:"User not found , Register first"
            })
        }

        const isPasswordCorrect= await existingUser.isPasswordCorrect(password);
        if(!isPasswordCorrect){
            return res.status(401).json({
                success:false,
                message:"Credentials are not valid"
            })
        }

        const accessToken= existingUser.generateAccessToken();
        const loggedInUser= await User.findById(existingUser._id).select("-password -refreshToken");
        
        const options={
            httpOnly:true,
            secure:true 
        }
        return res.status(200).cookie("accessToken", accessToken, options).json({
            success:true,
            message:"User logged in successfully",
            user:loggedInUser
        }) 
        
    } catch (error) {
        console.log("error in login user", error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while login user"
        })
        
    }
}
const logoutUser= async(req,res)=>{
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset:{
                    accessToken:""
                }
            },
            {
                new:true
            }
        )
        const options={
            httpOnly:true,
            secure:true 
        }
        return res.status(200).clearCookie("accessToken", options).json({
            success:true,    
            message:"User logged out successfully"
        })
        
    } catch (error) {
        console.log("error in logout user", error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while logout user"
        })
        
    }
}
export {registerUser, loginUser, logoutUser}