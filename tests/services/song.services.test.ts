import { SongService } from "../../src/services/song.servicees";
import { Song } from "../../src/database/models/songs.model";

jest.mock("../../src/database/models/songs.model", () => ({
  Song: {
    create: jest.fn(),
  },
}));

describe("SongService", () => {
  const service = new SongService();

  it("should create a song", async () => {
    // Arrange
    (Song.create as jest.Mock).mockResolvedValue({
      id: "uuid",
      title: "Test Song",
    });

    // Act
    const result = await service.createSong({
      title: "Test Song",
      sheet_pdf: "pdf-url",
      user_id: "user-1",
      artist: "Artist",
      usage: "Category"
    });

    // Assert
    expect(Song.create).toHaveBeenCalled();
    expect(result.song.title).toBe("Test Song");
  });
});
