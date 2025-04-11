import express from "express"
import {connectDb} from "./config/Db"
import userRoute from "./routes/userRoute.routes";
import cors from "cors"
import errorHandler from "./middleware/errorHandlers";

const app = express()
app.use(cors({
    origin:"*",
    methods:["GET","PUT","POST","DELETE"],
    allowedHeaders:["content-type","Authorization"]
}))
// allowing express access json files
app.use(express.json())

// Db connection
connectDb();

// routes handler
app.use("/api",userRoute)

// Global error handler 
//  catch any errors that aren't explicitly caught by route handlers or middleware 
// catches unexpected errors (such as:Database connection issues.Unknown exceptions.Other server errors)

app.use(errorHandler);


export default app;