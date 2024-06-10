class CustomError extends Error {
    
    constructor(messsage,statusCode){

        super(messsage || 'error')
        this.statusCode = statusCode || 500;
        this.isOperational = true;
    }
}

import express, { urlencoded } from "express";
import cors  from "cors";
import cookieParser from "cookie-parser";

const app = express();


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true, limit:'16kb'})) // try removing "express."
app.use(express.static("public"))
app.use(cookieParser())


// import routers
import userRouter from "./routers/user.router.js";

//
app.use("/api/v1/users",userRouter);


app.use((err,req,res,next)=>{

    
    console.log('error',err);
    res.status(err.statusCode || 500).json({
        status : err.statusCode,
        message : err.message
    })
})

export {app}
