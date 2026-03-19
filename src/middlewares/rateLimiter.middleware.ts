import { Request, Response, NextFunction } from "express";
import { redisClient } from "../config/redis.config";
import { logger } from "../utils/logger";

export const rateLimiter = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.body.userId;

        if (!userId) {
            return res.status(400).json({ error: "userId is required" });
        }

        const key = `rate:${userId}`;

        // Increment request count
        const count = await redisClient.incr(key);

        // Set expiry only on first request
        if (count === 1) {
            await redisClient.expire(key, 60); // 60 seconds window
        }

        if (count > 10) {
            logger.warn("Rate limit exceeded", { userId });
            return res.status(429).json({ error: "Rate limit exceeded" });
        }

        next();
    } catch (err) {
        logger.error("Rate limiter error", {
            //message: err?.message,
            //stack: err?.stack,
            userId: req.body?.userId,
            path: req.originalUrl,
            method: req.method,
        });

        next(err);
    }
};