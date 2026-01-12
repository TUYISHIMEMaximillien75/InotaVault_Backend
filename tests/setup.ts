import dotenv from "dotenv";
dotenv.config();

jest.mock("../src/config/cloudinary.ts", () => ({
  uploader: {
    upload_stream: jest.fn(() => ({
      end: jest.fn(),
    })),
  },
}));
