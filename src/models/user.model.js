
import mongoose,{ Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const UserSchema = new Schema(
    {
        userName: {
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },

        email: {
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },

        fullName: {
            type:String,
            required:true,
            lowercase:true,
            trim:true
        },

        avatar:{
            type:String,
            required: true
        },

        coverImage: {
            type:String,
            required:false
        },

        password: {
            type:String,
            required:[true,"Password is requried"]
        },

        refreshToken:{
            type:String
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ]   

    },
    {
        timeseries:true
    }
)


UserSchema.pre("save", async function(next) {

    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10);
    next();
})

UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

UserSchema.method('generateAccessToken',function(){
    
    const token = jwt.sign({
        _id:this._id,
        email:this.email,
        userName: this.userName,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SERCRET, 
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })

    return token
}) 

UserSchema.method('generateRefreshToken',function(){

    return jwt.sign({
        _id:this._id
    },
    process.env.REFRESH_TOKEN_SERCRET, 
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
})


export const User = mongoose.model("User",UserSchema)