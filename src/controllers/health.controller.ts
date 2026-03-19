// src/controllers/health.controller.ts
import { Request, Response } from "express";
import { redisClient } from "../config/redis.config";
import { logger } from "../utils/logger";

export const healthController = async (req: Request, res: Response) => {
    logger.info("Health check called", {
        uptime: process.uptime(),
    });
    try {
        await redisClient.ping();

        res.json({
            status: "ok",
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        logger.error("Health check failed", { error });

        res.status(500).json({
            status: "error",
            message: "Service unhealthy",
        });
    }
};