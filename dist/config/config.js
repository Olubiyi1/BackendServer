"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: parseInt(process.env.PORT, 10),
    mongo_URL: process.env.MONGO_URL,
    secret: process.env.SECRET,
    host: process.env.MAIL_HOST,
    mail_Port: parseInt(process.env.MAIL_PORT, 10),
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
};
