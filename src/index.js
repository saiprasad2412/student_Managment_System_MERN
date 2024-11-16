// import dotenv from "dotenv"
// import { app } from "./app"
// import connectDB from "./db"

// dotenv.config(
//     {path: './env'}
// )
// connectDB().then(()=>{
//     app.listen(process.env.PORT || 8000, () => console.log(`Server running on port ${process.env.PORT}`))

// }).catch((err) => console.log("Error connecting to DB", err))

// require('dotenv').config({path:'./env'});
import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import { app } from './app.js';


dotenv.config({
    path:'./env'
})


connectDB().then(()=>{
    app.listen(process.env.PORT ||8000,()=>{
        console.log('server is running on port',process.env.PORT ||8000)
    })
})
.catch((err) => console.log('Mongodb connection failed',err))