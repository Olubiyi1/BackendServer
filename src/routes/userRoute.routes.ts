import express from "express"
import { registerUser, loginUser } from "../controllers/user.controller"
import {registerUserValidationSchema, loginValidationSchema} from "../validationSchemas/userValidationSchema"
import {validateRequest} from "../middleware/userValidationMiddleware"
import { tokenMiddleware } from "../middleware/emailVerificationToken"

const router = express.Router()

router.get("/",(req,res)=>{
    res.send("up and running")
})

router.post("/register", validateRequest(registerUserValidationSchema),tokenMiddleware.generateToken,registerUser);
router.post("/login", validateRequest(loginValidationSchema), loginUser);

export default router;