import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME,DB_NAME_DUMMY } from "../constants.js";

dotenv.config()

async function connectDB(){
    
    try {
        let res = await mongoose.connect(`${process.env.MONGO_URI}${DB_NAME}`)
        console.log(`DB connected!! DB HOST : ${res.connection.host}`);
    } catch (error) {
        console.error('Not connecting to DB....',error);
        process.exit(1)
    }
}


export default connectDB;