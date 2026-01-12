import { uploadSong } from "../../src/controllers/song.controller";
import { SongService } from "../../src/services/song.servicees";
import { uploadToCloudinary } from "../../src/utils/cloudinaryUpload";

jest.mock("../../src/services/song.servicees", () => {
  return {
    SongService: jest.fn().mockImplementation(() => ({
      createSong: jest.fn().mockResolvedValue({
        id: "uuid",
        title: "Test Song",
      }),
    })),
  };
});
jest.mock("../../src/utils/cloudinaryUpload");

describe("uploadSong controller", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = {
      body: {
        title: "Test Song",
        artist: "A",
        usage: "church",
      },
      files: {
        pdf: [{ buffer: Buffer.from("pdf") }],
      },
      user: { id: 1 },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    (uploadToCloudinary as jest.Mock).mockResolvedValue("https://cloudinary/file.pdf");

    (SongService as jest.Mock).mockImplementation(() => ({
      createSong: jest.fn().mockResolvedValue({ id: 1 }),
    }));
  });

  it("should upload song successfully", async () => {
    await uploadSong(req, res);

    expect(uploadToCloudinary).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
      })
    );
  });
});
