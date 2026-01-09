import { SongService } from "../../src/services/song.servicees";

describe("Song service testing", ()=>{
    const songService = new SongService();

    it("should have create song method", () =>{
        expect(songService.createSong).toBeTruthy();
    });

    it("should have getAllSongs method", () =>{
        expect(songService.getAllSongs).toBeDefined();
    })

})