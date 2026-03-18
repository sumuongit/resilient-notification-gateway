import express from "express";
import notificationRoutes from "./routes/notification.routes";
import { logger } from "./middlewares/logger.middleware";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app = express();

app.use(express.json());
// Logger middleware
app.use(logger)

// Middleware
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

//Route definations
app.use("/notifications", notificationRoutes);

//Error handler middleware
app.use(errorHandler);

export default app;