import { Redis, RedisOptions } from "ioredis";
import { logger } from "../utils/logger";

// Redis config
const redisOptions: RedisOptions = {
  host: "127.0.0.1",
  port: 6379,
};

// Redis client instance
export const redisClient = new Redis(redisOptions);

redisClient.on("connect", () => {
  logger.info("Redis connected");
});

redisClient.on("error", (err) => {
  logger.error("Redis error", { err });
});

// Export redisOptions for BullMQ
export const redisConnection = redisOptions;