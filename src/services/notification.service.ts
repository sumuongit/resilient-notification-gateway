import { notificationQueue } from "../queues/notification.queue";
import { isDuplicateRequest } from "./idempotency.service";

export const enqueueNotification = async (data: any) => {
  const duplicate = await isDuplicateRequest(data);

  if (duplicate) return;

  await notificationQueue.add("send", data);
};