import { registerUser, loginUser,logoutUser } from "../controllers/registerUser.controller.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import { Router } from "express";
const router = Router();



router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(verifyJwt,logoutUser)


export default router