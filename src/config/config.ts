import dotenv from "dotenv";
dotenv.config();

export default {
    port:parseInt(process.env.PORT as string,10),
    mongo_URL:process.env.MONGO_URL as string,
    secret:process.env.SECRET as string,
    host:process.env.MAIL_HOST as string,
    mail_Port:parseInt(process.env.MAIL_PORT as string, 10),
    user:process.env.MAIL_USER as string,
    pass:process.env.MAIL_PASS as string
}
