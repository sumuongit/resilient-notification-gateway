import { redisClient } from "../config/redis.config";

export const isDuplicateRequest = async (data: any): Promise<boolean> => {
  const key = `notification:${data.userId}:${data.message}`;

  const exists = await redisClient.get(key);
  if (exists) return true;

  await redisClient.set(key, "1", "EX", 60);
  return false;
};