
import { Request, Response } from "express"; 
import {createUser,signIn} from "../services/user.service" 
import ResponseHandler from "../utils/responseHandler";   


export const registerUser = async(req:Request, res:Response)=>{     
try{        
     const {error,data} = await createUser(req.body)         
if(error){             
 return ResponseHandler.validationError(res,null,error)       
 }       
return ResponseHandler.success(res,data,"user created successfully");   
 }    
 catch(error: any){         
return ResponseHandler.validationError(res,null, error.message)    
  } 
 }  

//  user login
export const loginUser = async(req:Request, res:Response)=>{    
    try{         
        const {email,password} = req.body        
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

