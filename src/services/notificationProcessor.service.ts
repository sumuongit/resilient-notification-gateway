import { sendWithPrimaryProvider } from "../providers/primaryPprovider.provider";
import { sendWithSecondaryProvider } from "../providers/secondaryProvider.provider";

export const processNotification = async (data: any) => {
  try {
    await sendWithPrimaryProvider(data);
    return "primary";
  } catch {
    await sendWithSecondaryProvider(data);
    return "secondary";
  }
};