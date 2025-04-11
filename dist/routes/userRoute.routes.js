"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userValidationSchema_1 = require("../validationSchemas/userValidationSchema");
const userValidationMiddleware_1 = require("../middleware/userValidationMiddleware");
// import { sendVerificationMail } from "../helpers/mailer"
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("up and running");
});
router.post("/register", (0, userValidationMiddleware_1.validateRequest)(userValidationSchema_1.registerUserValidationSchema), user_controller_1.registerUser);
router.post("/login", (0, userValidationMiddleware_1.validateRequest)(userValidationSchema_1.loginValidationSchema), user_controller_1.loginUser);
exports.default = router;
