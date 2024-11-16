import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(`mongodb+srv://saiprasad22010642:Saiprasad%402412@youtuvecluster.hykautx.mongodb.net/${DB_NAME}`);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(err){
        console.log("Error connecting to DB", err);
        process.exit(1);
        
    }
}

export default connectDB