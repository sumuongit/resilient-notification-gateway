import { notificationQueue } from "../queues/notification.queue";
import { logger } from "../utils/logger";

export const enqueueNotification = async (data: any) => {
  const job = await notificationQueue.add("send", data);

  logger.info("Notification queued", {
    userId: data.userId,
    type: data.type,
    jobId: job.id
  });

  return job;
};