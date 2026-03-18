import { Request, Response } from "express";
import { enqueueNotification } from "../services/notification.service";

export const sendNotification = async (req: Request, res: Response) => {
  const { userId, message, type } = req.body;

  await enqueueNotification({ userId, message, type });

  res.status(202).json({ message: "Notification queued" });
};