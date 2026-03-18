import { Queue } from "bullmq";
import { redisConnection } from "../config/redis.config";

// Create queue
export const notificationQueue = new Queue("notifications", {
  connection: redisConnection, // Uses Redis config
});