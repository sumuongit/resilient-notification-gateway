import { Router } from "express";
import { validateNotification } from "../middlewares/validateNotification.middleware";
import { idempotency } from "../middlewares/idempotency.middleware";
import { rateLimiter } from "../middlewares/rateLimiter.middleware";
import { sendNotification } from "../controllers/notification.controller";

const router = Router();

router.post("/", validateNotification, idempotency, rateLimiter, sendNotification);

export default router;