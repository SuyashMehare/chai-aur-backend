import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const generateAccessNdRefreshToken = () => {
    
    try {
        let accessToken = User.generateAccessToken()
        let refreshToken = User.generateRefreshToken();

        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"Sowething went wrong in generating refersh & accesss tokens")
    }
}

const registerUser = asyncHandler(async(req,res) => {

    console.log(req.body);
    const { userName, fullName, email, password } = req.body

    if([userName, fullName, email, password].some((field) => field?.trim() === "")){
        throw new ApiError(400,"Provide all required fields")
    }

    const userExist =  await User.findOne(
         {$or : [{ userName },{ email }] }
    )

    if(userExist){
        throw new ApiError(409,"username or email already exist");
    }

    // const avatarLocalPath = req.files?.avatar[0]?.path;
    const avatarLocalPath = "F:/Chai aur backend/public/temp/myAvatar.png"
    
    let coverImageLocalPath = "F:/Chai aur backend/public/temp/myCoverImage.jpg";

    // if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
    //     coverImageLocalPath = req.files.coverImage[0].path;
    // }

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        // coverImage: coverImage?.url || "",
        coverImage: coverImage.url,
        email,
        password,
        userName:userName.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500,"Something went wrong during registering the user")
    }

    return res.status(201).json(new ApiResponse(200,createdUser,"User is registered"))
})
    

const loginUser = asyncHandler(async(req,res) => {

    const{username, email, password} = req.body;

    const userExist = await User.findOne({
        $or: [{username},{email}]
    })

    if(userExist){
        throw new ApiError(401,"User doesn't exist")
    }

    const isPassCorrect = await User.isPasswordCorrect(userExist.password)

    if(!isPassCorrect) {
        throw new ApiError(401,"Password is incorrect")
    }

    const{accessToken,refreshToken} = await generateAccessNdRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }) //Edge Case: docemntNotFoundError


    const options = {
        httpOnly:true,
        secure:true
    }

    return 
    res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,
            {
                user:loggedInUser, accessToken, refreshToken
            }
        ),
        "User logged In Successfully"
    )
 })    


const logoutUser = asyncHandler(async(req,res) => {
    
    /** cookies: access token
     * 1. fetch {access,refresh} token from cookie
     * 2. CHECK: {access,refresh} token is valid or not
     * 3. FETCH: fetch refresh token user from db
     * 4. REMOVE: refresh token from user object
     * 5. *EXPIRE: {access,refresh} token
     * 6. *RETURN: cookie with {access:null, refresh:null} token
     */


})





export {
    
    registerUser
}