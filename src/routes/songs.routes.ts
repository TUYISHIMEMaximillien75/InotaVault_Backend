import { Router } from "express";
import { getSongByIdController, uploadSong } from "../controllers/song.controller.ts";
import { upload } from "../middlewares/upload.middleware.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";
import { getAllSongs } from "../controllers/song.controller.ts";
import { updateSongController } from "../controllers/song.controller.ts";
import { deleteSongController } from "../controllers/song.controller.ts";
const songsRouter = Router();

songsRouter.post(
  "/songs",
  authMiddleware,
  upload.fields([
    { name: "pdf", maxCount: 1 },
    { name: "audio", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  uploadSong
);

songsRouter.put(
  "/songs/:id",
  authMiddleware, 
  updateSongController)

songsRouter.delete(
  "/deletesongs/:id",
  authMiddleware,
  deleteSongController
);
songsRouter.get("/allsongs", getAllSongs)

songsRouter.get("/songs/:id", getSongByIdController)


export default songsRouter;
