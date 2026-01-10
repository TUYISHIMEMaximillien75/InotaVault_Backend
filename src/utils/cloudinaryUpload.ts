import cloudinary from "../config/cloudinary.ts";
import type { UploadApiOptions } from "cloudinary";

export const uploadToCloudinary = (
  buffer: Buffer,
  folder: string,
  filename?: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const options: UploadApiOptions = {
      folder,
      resource_type: "auto", // ✅ auto detects pdf/audio/video
      use_filename: true,
      unique_filename: false,
    };

    if (filename) {
      options.public_id = filename.replace(/\.[^/.]+$/, "");
    }

    cloudinary.uploader
      .upload_stream(options, (error, result) => {
        if (error) return reject(error);
        resolve(result!.secure_url);
      })
      .end(buffer);
  });
};