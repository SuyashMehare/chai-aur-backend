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
const router = express.Router()


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true, limit:'16kb'})) // try removing "express."
app.use(express.static("public"))
app.use(cookieParser())


router.get('/',(req,res,nxt) => {
    console.log('middleware');
    nxt()
})

router.get('/home',(req,res,nxt) => {
    console.log('middleware 2');
    nxt()
})


// app.use(router)

app.use((err,req,res,next)=>{

    console.log('error');
    res.status(err.statusCode).json({
        status : err.statusCode,
        message : err.message
    })
})

export {app}
