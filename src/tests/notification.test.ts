import { sendWithPrimaryProvider } from "../providers/primaryPprovider.provider";
import { sendWithSecondaryProvider } from "../providers/secondaryProvider.provider";

// Mock providers
jest.mock("../providers/providerA");
jest.mock("../providers/providerB");

describe("Failover Logic", () => {
  it("should fallback to Secondary Provider when Primary Provider fails", async () => {
    (sendWithPrimaryProvider as jest.Mock).mockRejectedValue(new Error("fail"));
    (sendWithSecondaryProvider as jest.Mock).mockResolvedValue("success");

    const data = { userId: "1", message: "test", type: "email" };

    try {
      await sendWithPrimaryProvider(data);
    } catch {
      await sendWithSecondaryProvider(data);
    }

    expect(sendWithPrimaryProvider).toHaveBeenCalled();
    expect(sendWithSecondaryProvider).toHaveBeenCalled();
  });
});