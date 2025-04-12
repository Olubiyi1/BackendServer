"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenMiddleware = void 0;
const crypto_1 = __importDefault(require("crypto"));
exports.tokenMiddleware = {
    // Generate a verification token and attach to request object
    generateToken: (req, res, next) => {
        try {
            // Generate a random 32-byte hex string
            const verificationToken = crypto_1.default.randomBytes(32).toString('hex');
            // Attach the token to the request object for use in subsequent middleware/route handlers
            req.verificationToken = verificationToken;
            next();
        }
        catch (error) {
            console.error('Error generating verification token:', error);
            res.status(500).json({ error: 'Failed to generate verification token' });
        }
    }, // <-- Missing comma was here
    // Verify a token from request
    verifyToken: (req, res, next) => {
        const { token } = req.query;
        if (!token) {
            return res.status(400).json({ error: 'Verification token is required' });
        }
        req.validatedToken = token;
        next();
    }
};
