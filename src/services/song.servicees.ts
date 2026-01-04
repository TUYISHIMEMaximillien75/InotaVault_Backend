import { Song } from "../database/models/songs.model.ts";

export class SongService {

    getAllSongs = async () => {

        const songs = await Song.findAll();
        return songs;

    }

    getSongById = async (id: string) =>{
        const song = await Song.findByPk(id);
        // console.log(song?.view_count);
        // add one to view count
        if(song){

            const count_num = Number(song.view_count);
            song.view_count = count_num + 1;
            await song.save();
        }
        console.log(song?.view_count);

        return song;
    }
}