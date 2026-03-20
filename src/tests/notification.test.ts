import { processNotification } from "../services/notificationProcessor.service";
import { sendWithPrimaryProvider } from "../providers/primaryPprovider.provider";
import { sendWithSecondaryProvider } from "../providers/secondaryProvider.provider";

jest.mock("../providers/primaryPprovider.provider");
jest.mock("../providers/secondaryProvider.provider");

describe("Failover Logic", () => {
  it("should fallback to Secondary Provider when Primary Provider fails", async () => {
    (sendWithPrimaryProvider as jest.Mock).mockRejectedValue(new Error("fail"));
    (sendWithSecondaryProvider as jest.Mock).mockResolvedValue("success");

    const result = await processNotification({
      userId: "1",
      message: "test",
      type: "email",
    });

    expect(sendWithPrimaryProvider).toHaveBeenCalled();
    expect(sendWithSecondaryProvider).toHaveBeenCalled();
    expect(result).toBe("secondary");
  });

  it("should handle both providers failing", async () => {
    (sendWithPrimaryProvider as jest.Mock).mockRejectedValue(new Error("fail"));
    (sendWithSecondaryProvider as jest.Mock).mockRejectedValue(new Error("fail"));

    await expect(
      processNotification({ userId: "1", message: "test", type: "email" })
    ).rejects.toThrow();
  });
});