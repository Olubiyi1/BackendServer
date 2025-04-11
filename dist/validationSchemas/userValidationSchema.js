"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidationSchema = exports.registerUserValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerUserValidationSchema = joi_1.default.object({
    firstname: joi_1.default.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
        'any.required': 'Please enter firstname',
        'string.empty': 'Firstname cannot be empty',
        'string.min': 'Firstname must be at least 2 characters long',
        'string.max': 'Firstname cannot exceed 50 characters'
    }),
    lastname: joi_1.default.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
        'any.required': 'Please enter lastname',
        'string.empty': 'Lastname cannot be empty',
        'string.min': 'Lastname must be at least 2 characters long',
        'string.max': 'Lastname cannot exceed 50 characters'
    }),
    email: joi_1.default.string()
        .email()
        .trim()
        .required()
        .lowercase()
        .messages({
        'any.required': 'Please enter an email',
        'string.email': 'Invalid email format',
        'string.empty': 'Email cannot be empty'
    }),
    username: joi_1.default.string()
        .trim()
        .min(3)
        .max(20)
        .pattern(new RegExp('^[a-zA-Z0-9_]+$'))
        .required()
        .messages({
        'any.required': 'Please enter a username',
        'string.empty': 'Username cannot be empty',
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username cannot exceed 20 characters',
        'string.pattern.base': 'Username can only contain letters, numbers, and underscores'
    }),
    password: joi_1.default.string()
        .trim()
        .min(8)
        .max(30)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
        .required()
        .messages({
        'any.required': 'Please enter a password',
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password cannot exceed 30 characters',
        'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character'
    })
});
exports.loginValidationSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email()
        .trim()
        .required()
        .messages({
        'string.email': 'Invalid email format',
        'string.empty': 'Email cannot be empty'
    }),
    password: joi_1.default.string()
        .trim()
        .required()
        .messages({
        'any.required': 'Please enter a password',
        'string.empty': 'Password cannot be empty'
    })
});
