import { Song } from "../database/models/songs.model.ts";
import type { createSongAttributes } from "../types/song.types.ts";
export class SongService {

    createSong = async (songData: createSongAttributes) => {
        const song = await Song.create(songData);
        return song;
    }

    getAllSongs = async () => {

        const songs = await Song.findAll();
        return songs;

    }

    getSongById = async (id: string) => {
        const song = await Song.findByPk(id);
        // console.log(song?.view_count);
        // add one to view count
        if (song) {

            const count_num = Number(song.view_count);
            song.view_count = count_num + 1;
            await song.save();
        }
        console.log(song?.view_count);

        return song;
    }

    updateSong = async (id: string, updateData: Partial<createSongAttributes>) => {
        const song = await Song.findByPk(id);
        if (!song) {
            return null;
        }
        await song.update(updateData);
        return song;
    }

    deleteSong = async (id: string) => {
        const song = await Song.findByPk(id);
        if (!song) {
            return false;
        }
        await song.destroy();
        return true;
    }

}

// const song = await Song.create({
//     title,
//     sheet_pdf: pdfUrl + ".pdf",
//     audio_url: audioUrl,
//     video_url: videoUrl,
//     external_link,
//     description: req.body.description || null,
//     user_id: userId,
// })

// song.title = title || song.title;
//         song.description = description || song.description;
//         song.external_link = external_link || song.external_link;
//         await song.save();