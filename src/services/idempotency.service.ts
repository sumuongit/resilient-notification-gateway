import { redisClient } from "../config/redis.config";
import { logger } from "../utils/logger";

export const isDuplicateRequest = async (data: any): Promise<boolean> => {
  const key = `notification:${data.userId}:${data.message}`;

  const exists = await redisClient.get(key);

  if (exists) {
    logger.warn("Duplicate request blocked", {
      key,
      userId: data.userId,
    });
    return true;
  }

  await redisClient.set(key, "1", "EX", 60);

  logger.info("New request accepted", {
    key,
    userId: data.userId,
  });

  return false;
};