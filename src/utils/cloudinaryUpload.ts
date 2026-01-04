import cloudinary from "../config/cloudinary.ts";

export const uploadToCloudinary=(buffer: Buffer, folder: string, resource_type: "image" | "video" | "raw" ): Promise<string> =>{
    return new Promise((resolve, reject)=>{
        cloudinary.uploader.upload_stream(
            {folder, resource_type},
            (error, result) =>{
                if(error) return reject(error);
                resolve(result?.secure_url as string)
            }
        ).end(buffer);
    })
}