import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from "../config/config";


// hash password during login
export const hashPassword = (password: string)=>{
    return bcrypt.hash(password,10)
}

// compare password during login
export const comparePassword = (password: string,hash: string)=>{
    return bcrypt.compare(password,hash)
}

// JWT secret
export const createJwt= (user:any)=>{
    const token = jwt.sign(
        { id: user._id,
            email:user.email
        },
         config.secret,
        {expiresIn: '1d'}
    );
    return token;
} ;

