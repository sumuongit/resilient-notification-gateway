import { Worker } from "bullmq";
import { redisConnection } from "../config/redis.config";
import { sendWithPrimaryProvider } from "../providers/primaryPprovider.provider";
import { sendWithSecondaryProvider } from "../providers/secondaryProvider.provider";
import { logger } from "../utils/logger";

new Worker(
    "notifications",
    async (job) => {
        const data = job.data;

        logger.info("Job started", { jobId: job.id, data });

        try {
            await sendWithPrimaryProvider(data);

            logger.info("Sent via primary provider", { jobId: job.id });
        } catch (err) {
            logger.error("Primary provider failed", { jobId: job.id, err });

            await sendWithSecondaryProvider(data);

            logger.info("Sent via secondary provider", { jobId: job.id });
        }
    },
    { connection: redisConnection }
);