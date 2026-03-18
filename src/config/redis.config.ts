import { Redis, RedisOptions } from "ioredis";

// Redis config
const redisOptions: RedisOptions = {
  host: "127.0.0.1",
  port: 6379,
};

// Redis client instance
export const redisClient = new Redis(redisOptions);

// Export redisOptions for BullMQ
export const redisConnection = redisOptions;