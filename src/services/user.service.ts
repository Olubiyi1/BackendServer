import userModel,{IUser} from "../models/userSchema.model";
import { comparePassword,createJwt,hashPassword } from "../middleware/guard";



export const createUser = async (userData: IUser)=>{
    
    try{
        // checking if email already exist before registering
        const existingUser = await userModel.findOne({ email : userData.email});
        if (existingUser){
            return {error:"Email already Exists", data: null}
        }

        const password = await hashPassword(userData.password)
        const newUser = new userModel({...userData, password});

        const savedUser =  await newUser.save()
        return { error : null,data: savedUser}
       
    }
    catch(error:any){
        return { error: "failed to register new user",data: null}
    }
}


export const signIn = async(email:string, password: string)=>{
    try{
        // find the user by email
        const user = await userModel.findOne({email});

        // if no user found with that email
        if(!user){
            return {error :"invalid email or password", data: null}
        }

        // verify password match
        const isPasswordValid = await comparePassword(password, user.password);

        if(!isPasswordValid){
            return { error : "invalid email or password", data: null}
        }
        
        // create JWT
        const token =createJwt(
            {
                id: user._id,
                    email:user.email
            }
        )
        return {error:null, data:token};
    }catch (error:any){
        return {error: error.message}
    }
}
// export const logoutUser = async(email:string, password:string)=>{

//     try{
//         // const {email,password}= req.body;


//     }
//     catch(error){
//         return{error:"please try again", data:null}
//     }
