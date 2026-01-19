import { Injectable } from '@nestjs/common';
import { CloundinaryProvider } from './cloundinary.provider';
import { v2 as cloudinary } from 'cloudinary';
import bufferToStream from 'buffer-to-stream';
@Injectable()
export class CloundinaryService {
    constructor(
        private cloudinaryProvider: CloundinaryProvider
    ) {}
    // funcion de subida de imagenes a cloundinary
    async uploadImage(file: any, folderName: string) {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: folderName },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result?.secure_url);
                }
            );
            // Transformar el buffer en un stream y subirlo a cloudinary
            bufferToStream(file.buffer).pipe(uploadStream);
        });
    }
    async deleteImage(url: string) {
        const regex = /\/upload\/(?:v\d+\/)?(.+)\.[^.]+$/;
        const match = url.match(regex);
        const publicId = match ? match[1] : null;
        if (!publicId) return;
        const result=new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(publicId, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
        });
        console.log(result)
    }
}
