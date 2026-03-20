import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { logger } from "../utils/logger";

const notificationSchema = z.object({
    userId: z.string().min(1),
    message: z.string().min(1),
    type: z.enum(["email", "sms", "push"]),
});

export const validateNotification = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const result = notificationSchema.safeParse(req.body);

    if (!result.success) {
        logger.warn("Validation failed", {
            path: req.originalUrl,
            method: req.method,
            errors: result.error.issues,
            body: req.body,
        });

        return res.status(400).json({
            error: "Invalid request",
            details: result.error.issues,
        });
    }

    req.body = result.data;
    next();
};