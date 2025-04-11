
import { Request, Response, NextFunction } from "express";
import ResponseHandler from "../utils/responseHandler" // Import ResponseHandler

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err); // Log the error for debugging
  
  // Check for specific types of error
  if (err.name === 'ValidationError') {
    return ResponseHandler.validationError(res, err.errors, err.message, 400);
  }

  // Handle other errors (database, unexpected, etc.)
  if (err.statusCode === 404) {
    return ResponseHandler.notFound(res, null, err.message || 'Resource not found', 404);
  }

  // Catch all unhandled errors and send a generic error response
  return ResponseHandler.error(res, null, err.message || 'Internal Server Error', 500);
};

export default errorHandler;
