export const sendWithPrimaryProvider = async (data: any) => {
  // simulate failure randomly
  if (Math.random() < 0.5) {
    throw new Error("Primary Provider failed"); // mock a 5xx error
  }
};