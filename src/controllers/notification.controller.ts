import { Request, Response } from "express";
import { enqueueNotification } from "../services/enqueueNotification.service";
import { logger } from "../utils/logger";

export const sendNotification = async (req: Request, res: Response) => {
  const { userId, message, type } = req.body;

  logger.info("Incoming notification request", {
    userId,
    type,
  });

  const job = await enqueueNotification({ userId, message, type });

  res.status(202).json({ message: "Notification queued successfully" });
};