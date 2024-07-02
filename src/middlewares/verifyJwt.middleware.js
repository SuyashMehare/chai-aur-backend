import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";


export const verifyJwt = asyncHandler(async(req,res,next) => {

    try {
        const accessToken = req.cookies?.accessToken || req.headers("Authorization")?.replace("Bearer ","")
    
        if (!accessToken) {
            throw new ApiError(401,"Unauthorised request") 
        }
        
        const decodedToken = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SERCRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user){
            throw new ApiError(401,"Invalid access token")
        }
    
        req.user = user 
        next()

    } catch (error) {
        
        throw new ApiError(401,error?.message || "Invalid access token")
    }

})