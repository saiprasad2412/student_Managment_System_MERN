import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"

export const  verifyJWT = async (req, res, next) => {
    try {
        const token= req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");
        
        if(!token){
            return res.status(401).json({success:false, message:"Unauthorized request "})
        }

        const decodedToken = await jwt.verify(token, "NBGtfy76879vcgv");
        
        const user= await User.findById(decodedToken._id).select("-password -refreshToken");
        
        if(!user){
            return res.status(401).json({success:false, message:"Invalid Access Token "})
        }
        req.user=user;
        next();
        
    } catch (error) {
        return res.status(401).json({success:false, message:"Unauthorized............ " || error?.message})
    }
}