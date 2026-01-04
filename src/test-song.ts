import { Song } from "./database/models/index.ts";

async function testSong() {
  const song = await Song.create({
    user_id: "PUT-EXISTING-USER-ID-HERE",
    title: "Amazing Grace",
    sheet_pdf: "https://cloudinary.com/sheet.pdf",
  });

  console.log(song.toJSON());
}

testSong();
