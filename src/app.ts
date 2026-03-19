import express from "express";
import notificationRoutes from "./routes/notification.routes";
import { requestLogger } from "./middlewares/logger.middleware";
import { healthController } from "./controllers/health.controller";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app = express();

app.use(express.json());
// Logger middleware
app.use(requestLogger)

// Route definations
app.use("/notifications", notificationRoutes);

// Health-check endpoint
app.get("/health", healthController);

// Error handler middleware
app.use(errorHandler);

export default app;