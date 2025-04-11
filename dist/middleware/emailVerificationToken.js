"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVerificationTokenMiddleware = void 0;
const crypto_1 = __importDefault(require("crypto"));
// Middleware to generate verification token
const generateVerificationTokenMiddleware = (req, res, next) => {
    try {
        // Extracting email from the request body
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }
        // Generate a secure verification token
        const verificationToken = crypto_1.default.randomBytes(32).toString('hex');
        // Attach the verification token to the request object for use in the controller
        req.body.verificationToken = verificationToken;
        // Proceed to the next middleware or controller
        next();
    }
    catch (error) {
        console.error('Error in token generation middleware:', error);
        return res.status(500).json({ message: 'Something went wrong, please try again later.' });
    }
};
exports.generateVerificationTokenMiddleware = generateVerificationTokenMiddleware;
