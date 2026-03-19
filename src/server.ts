import app from "./app";
import { logger } from "./utils/logger";

const PORT = process.env.PORT || 3000;

//app starts listenting to the port
app.listen(PORT, () => {
  logger.info("Server started", {
    port: PORT,
    environment: process.env.NODE_ENV || "development",
  });
});