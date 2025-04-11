"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJwt = exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
// hash password during login
const hashPassword = (password) => {
    return bcrypt_1.default.hash(password, 10);
};
exports.hashPassword = hashPassword;
// compare password during login
const comparePassword = (password, hash) => {
    return bcrypt_1.default.compare(password, hash);
};
exports.comparePassword = comparePassword;
// JWT secret
const createJwt = (user) => {
    const token = jsonwebtoken_1.default.sign({ id: user._id,
        email: user.email
    }, config_1.default.secret, { expiresIn: '1d' });
    return token;
};
exports.createJwt = createJwt;
