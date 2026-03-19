import { Request, Response, NextFunction } from "express";
import { isDuplicateRequest } from "../services/idempotency.service";
import { logger } from "../utils/logger";

export const idempotency = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const duplicate = await isDuplicateRequest(req.body);

    if (duplicate) {
      return res.status(429).json({ message: "Duplicate request" });
    }

    next();
  } catch (err: any) {
    logger.error("Idempotency failed", {
      message: err?.message,
      stack: err?.stack,
      userId: req.body?.userId,
      path: req.originalUrl,
    });

    next(err);
  }
};