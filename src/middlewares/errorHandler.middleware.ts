import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

// Catches all errors
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error("Unhandled error", {
    message: err.message,
    stack: err.stack,
  });

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};