import { logger } from "../utils/logger";

export const sendWithSecondaryProvider = async (data: any) => {
  logger.info("Secondary provider success", { userId: data.userId });
}