"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Db_1 = require("./config/Db");
const userRoute_routes_1 = __importDefault(require("./routes/userRoute.routes"));
const cors_1 = __importDefault(require("cors"));
const errorHandlers_1 = __importDefault(require("./middleware/errorHandlers"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["content-type", "Authorization"]
}));
// allowing express access json files
app.use(express_1.default.json());
// Db connection
(0, Db_1.connectDb)();
// routes handler
app.use("/api", userRoute_routes_1.default);
// Global error handler 
//  catch any errors that aren't explicitly caught by route handlers or middleware 
// catches unexpected errors (such as:Database connection issues.Unknown exceptions.Other server errors)
app.use(errorHandlers_1.default);
exports.default = app;
