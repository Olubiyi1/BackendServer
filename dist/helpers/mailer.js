"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationMail = void 0;
// Simplified function to send a verification email without tokens
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../src/config/config"));
const transporter = nodemailer_1.default.createTransport({
    host: config_1.default.host,
    port: config_1.default.mail_Port,
    secure: false,
    auth: {
        user: config_1.default.user,
        pass: config_1.default.pass,
    },
});
// Function to send verification email
const verificationMail = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    const verificationLink = token;
    // email content
    const mailOptions = {
        // sender address
        from: config_1.default.user,
        to: email,
        subject: 'Email Verification',
        text: 'Please verify your email address',
        html: `<p>Please verify your email address by clicking on the verification link ${verificationLink}.</p>`,
    };
    // send mail
    try {
        const info = yield transporter.sendMail(mailOptions);
        console.log('Verification email sent!', info.messageId);
        return info;
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw Error('Failed to send email');
    }
});
exports.verificationMail = verificationMail;
