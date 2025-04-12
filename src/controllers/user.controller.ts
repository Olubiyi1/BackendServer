
import { Request, Response } from "express"; 
import {createUser,signIn} from "../services/user.service" 
import ResponseHandler from "../utils/responseHandler";   
import { verificationMail } from "../helpers/mailer"


export const registerUser = async(req: Request & { verificationToken?: string }, res: Response) => {
    try {
        // Get the token from the request object
      const token = req.verificationToken;

      if (!token) {
        return ResponseHandler.validationError(res, null, "Verification token not found");
      }
      const {error, data} = await createUser(req.body, token);
      
      if (error) {
        return ResponseHandler.validationError(res, null, error);
      }
      
      if(!data){
        return ResponseHandler.validationError(res,null,"User Data is missing")
      } 
      
      // Send verification email
      await verificationMail(data.email, token);
      
      return ResponseHandler.success(res, data, "user created successfully");
    } catch(error: any) {
      return ResponseHandler.validationError(res, null, error.message);
    }
  }

//  user login
export const loginUser = async(req:Request, res:Response)=>{    
  try{         
    const {email,password} = req.body        

    // checking if email and password exists before signing in
    if (!email || !password) {
      return ResponseHandler.validationError(res, null, "Email and password are required");
    }

    const {error,data}= await signIn(email,password);     
    
    if (error){             
      return ResponseHandler.validationError(res,null,error)       
    }  

    return ResponseHandler.success(res,data, "Login successful")     

    }   
    catch(error:any){        
        return ResponseHandler.validationError(res,null,error.message)   
    }
} 

