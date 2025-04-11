import mongoose from "mongoose";
import config from "./config";

export const connectDb = async()=>{
   try{
        await mongoose.connect(config.mongo_URL)
        console.log("connection to Db successful");
   }
   catch(error){
    console.log("failed to connect db")
   }
}
