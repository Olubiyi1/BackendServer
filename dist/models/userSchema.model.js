"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    "firstname": { type: String,
        required: [true, "enter firstname"]
    },
    "lastname": { type: String,
        required: [true, "enter lastname"]
    },
    "email": {
        type: String,
        required: [true, "enter an email"],
        lowercase: true,
        unique: true
    },
    "username": { type: String,
        required: [true, "enter a username"]
    },
    "password": { type: String,
        required: [true, "enter a password"]
    }
}, { timestamps: true });
const userModel = mongoose_1.default.model("userModel", userSchema);
exports.default = userModel;
