export const v2 = {
  config: jest.fn(),
  uploader: {
    upload: jest.fn().mockResolvedValue({
      secure_url: "https://mocked.cloudinary.com/file.jpg",
      public_id: "mocked-file-id",
    }),
  },
};
