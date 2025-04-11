import mongoose,{Schema,Document} from "mongoose";

export interface IUser extends Document{
    firstname:string,
    lastname:string,
    email:string,
    username:string,
    password:string
}

const userSchema:Schema = new mongoose.Schema(
    {
        "firstname":{type:String,
            required:[true,"enter firstname"]
        },
        "lastname":{type:String,
            required:[true,"enter lastname"]
        },
        "email":{
            type:String,
            required:[true,"enter an email"],
            lowercase:true,
            unique:true
        },
        "username":{type:String,
            required:[true,"enter a username"]
        },
        "password":{type:String,
            required:[true,"enter a password"]
        }
    },
    {timestamps:true}
)
const userModel = mongoose.model<IUser>("userModel",userSchema)

export default userModel;