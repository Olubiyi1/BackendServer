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
exports.signIn = exports.createUser = void 0;
const userSchema_model_1 = __importDefault(require("../models/userSchema.model"));
const guard_1 = require("../middleware/guard");
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // checking if email already exist before registering
        const existingUser = yield userSchema_model_1.default.findOne({ email: userData.email });
        if (existingUser) {
            return { error: "Email already Exists", data: null };
        }
        const password = yield (0, guard_1.hashPassword)(userData.password);
        const newUser = new userSchema_model_1.default(Object.assign(Object.assign({}, userData), { password }));
        const savedUser = yield newUser.save();
        return { error: null, data: savedUser };
    }
    catch (error) {
        return { error: "failed to register new user", data: null };
    }
});
exports.createUser = createUser;
const signIn = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // find the user by email
        const user = yield userSchema_model_1.default.findOne({ email });
        // if no user found with that email
        if (!user) {
            return { error: "invalid email or password", data: null };
        }
        // verify password match
        const isPasswordValid = yield (0, guard_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            return { error: "invalid email or password", data: null };
        }
        // create JWT
        const token = (0, guard_1.createJwt)({
            id: user._id,
            email: user.email
        });
        return { error: null, data: token };
    }
    catch (error) {
        return { error: error.message };
    }
});
exports.signIn = signIn;
// export const logoutUser = async(email:string, password:string)=>{
//     try{
//         // const {email,password}= req.body;
//     }
//     catch(error){
//         return{error:"please try again", data:null}
//     }
