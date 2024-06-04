import { v2 as cloudinary } from 'cloudinary'
import toStream from 'buffer-to-stream'
import sharp from 'sharp'

import dotenv from 'dotenv';
dotenv.config();  // allows .env to be accessed

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true
});

const upload = async function(file, folder) {
    const fileBuffer = await sharp(file).resize(1870).webp({ quality: 90 }).toBuffer();

    return new Promise(function(resolve, reject) {
        const upload = cloudinary.uploader.upload_stream(
            function(error, result) {
                // if there is an error, reject it, else resolve the result
                if (error) {
                    return reject(error);
                }
                resolve(result);
            }
        );
        // pipe upload stream to cloudinary
        toStream(fileBuffer).pipe(upload), {resource_type: 'auto', folder };
    });
}

export { upload };