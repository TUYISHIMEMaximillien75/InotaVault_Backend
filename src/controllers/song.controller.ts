import type { Request, Response } from "express";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.ts";
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
        const { title, external_link, description } = req.body;
        const userId = (req as any).user.id;
        const files = req.files as MulterFiles;

        if (!title || !files?.pdf?.[0]) {
            return res.status(400).json({
                message: "Title and PDF are required",
            });
        }

        // Upload PDF (required)
        const pdfUrl = await uploadToCloudinary(
            files.pdf[0].buffer,
            "songs/pdf",
            "raw"
        );

        // Upload optional files
        const audioUrl = files.audio?.[0]
            ? await uploadToCloudinary(
                files.audio[0].buffer,
                "songs/audio",
                "video"
            )
            : undefined;

        const videoUrl = files.video?.[0]
            ? await uploadToCloudinary(
                files.video[0].buffer,
                "songs/video",
                "video"
            )
            : undefined;

        const song = await songService.createSong({
            title,
            sheet_pdf: pdfUrl,
            audio_url: audioUrl,
            video_url: videoUrl,
            external_link: external_link || undefined,
            description: description || undefined,
            user_id: userId,
        });

        res.status(201).json({
            success: true,
            data: song,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Upload failed" });
    }
};
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

export const updateSongController = async (req: RequestParams, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, external_link } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Song ID is required" });
        }

        const song = await songService.updateSong(id, {
            title,
            description,
            external_link,
        });
        if (!song) {
            return res.status(404).json({ message: "Song not found" });
        }       

        res.status(200).json({ success: true, data: song });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update song" });
    }
}

export const deleteSongController = async (req: RequestParams, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Song ID is required" });
        }
        const success = await songService.deleteSong(id);
        if (!success) {
            return res.status(404).json({ message: "Song not found" });
        }
        res.status(200).json({ success: true, message: "Song deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete song" });
    }
}