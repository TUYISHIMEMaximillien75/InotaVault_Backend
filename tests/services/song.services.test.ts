import { SongService } from "../../src/services/song.servicees";
import { Song } from "../../src/database/models/songs.model";

jest.mock("../../src/database/models/songs.model");

describe("SongService", () => {
  const service = new SongService();

  it("should create a song", async () => {
    (Song.create as jest.Mock).mockResolvedValue({
      id: 1,
      title: "Test Song",
    });

    const result = await service.createSong({
      title: "Test Song",
      sheet_pdf: "url",
      user_id: "etrgdrer1",
      artist: "Artist",
      usage: "Category"
    });

    expect(Song.create).toHaveBeenCalled();
    expect(result.title).toBe("Test Song");
  });
});
