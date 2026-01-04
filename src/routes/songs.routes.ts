import { Router } from "express";
import { uploadSong } from "../controllers/song.controller.ts";
import { upload } from "../middlewares/upload.middleware.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";

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

// songsRouter.get("/songs", getAllSongs)

export default songsRouter;
