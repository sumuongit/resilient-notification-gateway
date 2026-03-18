// import { Request, Response, NextFunction } from "express";
// import { isDuplicateRequest } from "../services/idempotency.service";

// export const idempotencyMiddleware = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const duplicate = await isDuplicateRequest(req.body);

//   if (duplicate) {
//     return res.status(429).json({ message: "Duplicate request" });
//   }

//   next();
// };

// src/middlewares/idempotency.ts
import { Request, Response, NextFunction } from "express";
import { redisClient } from "../config/redis.config";

// Middleware to prevent duplicate notifications
export const idempotency = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Unique key: user + message
    const key = `notification:${req.body.userId}:${req.body.message}`;

    const exists = await redisClient.get(key);
    if (exists) {
      return res.status(429).json({ message: "Duplicate request" });
    }

    // Save key with TTL 60 seconds (adjust as needed)
    await redisClient.set(key, "1", "EX", 60);

    next();
  } catch (err) {
    console.error("Idempotency error:", err);
    next(err);
  }
};