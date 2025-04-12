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
exports.loginUser = exports.registerUser = void 0;
const user_service_1 = require("../services/user.service");
const responseHandler_1 = __importDefault(require("../utils/responseHandler"));
const mailer_1 = require("../helpers/mailer");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the token from the request object
        const token = req.verificationToken;
        if (!token) {
            return responseHandler_1.default.validationError(res, null, "Verification token not found");
        }
        const { error, data } = yield (0, user_service_1.createUser)(req.body, token);
        if (error) {
            return responseHandler_1.default.validationError(res, null, error);
        }
        if (!data) {
            return responseHandler_1.default.validationError(res, null, "User Data is missing");
        }
        // Send verification email
        yield (0, mailer_1.verificationMail)(data.email, token);
        return responseHandler_1.default.success(res, data, "user created successfully");
    }
    catch (error) {
        return responseHandler_1.default.validationError(res, null, error.message);
    }
});
exports.registerUser = registerUser;
//  user login
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // checking if email and password exists before signing in
        if (!email || !password) {
            return responseHandler_1.default.validationError(res, null, "Email and password are required");
        }
        const { error, data } = yield (0, user_service_1.signIn)(email, password);
        if (error) {
            return responseHandler_1.default.validationError(res, null, error);
        }
        return responseHandler_1.default.success(res, data, "Login successful");
    }
    catch (error) {
        return responseHandler_1.default.validationError(res, null, error.message);
    }
});
exports.loginUser = loginUser;
