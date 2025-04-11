"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseHandler_1 = __importDefault(require("../utils/responseHandler")); // Import ResponseHandler
const errorHandler = (err, req, res, next) => {
    console.error(err); // Log the error for debugging
    // Check for specific types of error
    if (err.name === 'ValidationError') {
        return responseHandler_1.default.validationError(res, err.errors, err.message, 400);
    }
    // Handle other errors (database, unexpected, etc.)
    if (err.statusCode === 404) {
        return responseHandler_1.default.notFound(res, null, err.message || 'Resource not found', 404);
    }
    // Catch all unhandled errors and send a generic error response
    return responseHandler_1.default.error(res, null, err.message || 'Internal Server Error', 500);
};
exports.default = errorHandler;
