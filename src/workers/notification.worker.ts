import { Worker } from "bullmq";
import { redisConnection } from "../config/redis.config";
import { sendWithPrimaryProvider } from "../providers/primaryPprovider.provider";
import { sendWithSecondaryProvider } from "../providers/secondaryProvider.provider";

new Worker(
  "notifications",
  async (job) => {
    const data = job.data;

    try {
      await sendWithPrimaryProvider(data);
    } catch (err) {
      console.log("Primary Provider failed, switching to Secondary Provider");
      await sendWithSecondaryProvider(data);
    }
  },
  { connection: redisConnection }
);