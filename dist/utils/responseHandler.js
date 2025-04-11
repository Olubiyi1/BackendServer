"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseHandler {
    static success(res, data, message = "Operation successful", statusCode = 200) {
        res.status(statusCode).json({
            status: "success",
            message,
            data,
        });
    }
    static created(res, data, message = "Operation successful", statusCode = 201) {
        res.status(statusCode).json({
            status: "success",
            message,
            data
        });
    }
    static error(res, data, message = "Operation failed", statusCode = 500) {
        res.status(statusCode).json({
            status: "error",
            message,
            data
        });
    }
    static validationError(res, data, message = "Validation error", statusCode = 400) {
        res.status(statusCode).json({
            status: "fail",
            message,
            data
        });
    }
    static notFound(res, data, message = "Resource not found", statusCode = 404) {
        res.status(statusCode).json({
            status: "error",
            message,
            data
        });
    }
}
exports.default = ResponseHandler;
