import { notificationQueue } from "../queues/notification.queue";
import { logger } from "../utils/logger";
import { isDuplicateRequest } from "./idempotency.service";

export const enqueueNotification = async (data: any) => {
  const duplicate = await isDuplicateRequest(data);

  if (duplicate) return;

  const job = await notificationQueue.add("send", data);

  logger.info("Notification queued", {
    userId: data.userId,
    type: data.type,
    jobId: data.id
  });
};