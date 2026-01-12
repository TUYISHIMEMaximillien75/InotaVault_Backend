import { uploadToCloudinary } from "../../src/utils/cloudinaryUpload";

describe("uploadToCloudinary", () => {
  it("should return secure_url when upload succeeds", async () => {
    const mockUrl = "https://cloudinary.com/test.pdf";

    const cloudinary = require("../../src/config/cloudinary.ts");
    cloudinary.uploader.upload_stream.mockImplementation(
      (_: any, cb: any) => {
        cb(null, { secure_url: mockUrl });
        return { end: jest.fn() };
      }
    );

    const result = await uploadToCloudinary(
      Buffer.from("test"),
      "songs",
      "auto"
    );

    expect(result).toBe(mockUrl);
  });
});
