import type { Request, Response } from "express";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.ts";

import { Song } from "../database/models/songs.model.ts";
import { SongService } from "../services/song.servicees.ts";


const songService = new SongService();

interface MulterFiles {
    pdf?: Express.Multer.File[];
    audio?: Express.Multer.File[];
    video?: Express.Multer.File[];
}

interface RequestParams extends Request {
    params: {
        id: string;
    };
}

export const uploadSong = async (req: Request, res: Response) => {
    try {
        const { title, external_link } = req.body;
        const userId = (req as any).user.id;

        if (!title || !req.files?.pdf) {
            return res.status(400).json({ message: "Title and PDF are required" });
        }

        const pdfUrl = await uploadToCloudinary(
            (req.files as any).pdf[0].buffer,
            "songs.pdf",
            "raw"
        )

        const audioUrl = req.files?.audio
            ? await uploadToCloudinary(
                (req.files as any).audio[0].buffer,
                "songs/audio",
                "video"
            )
            : null

        const videoUrl = req.files?.video
            ? await uploadToCloudinary(
                (req.files as any).video[0].buffer,
                "songs/video",
                "video"
            )
            : null;

        const song = await Song.create({
            title,
            sheet_pdf: pdfUrl,
            audio_url: audioUrl,
            video_url: videoUrl,
            external_link,
            description: req.body.description || null,
            user_id: userId,
        })

        res.status(201).json({ success: true, data: song });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Upload failed" });
    }
}
export const getAllSongs = async (req: Request, res: Response) => {
    try {

        const songs = await songService.getAllSongs();
        res.status(200).json({ success: true, data: songs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve songs" });
    }
}

export const getSongByIdController = async (req: RequestParams, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Song ID is required" });
        }
        const song = await songService.getSongById(id);

        if (!song) {
            return res.status(404).json({ message: "Song not found" });
        }
        res.status(200).json({ success: true, data: song });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve song" });
    }
}
