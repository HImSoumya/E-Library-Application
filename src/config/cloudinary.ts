import { v2 as cloudinary } from 'cloudinary';
import { config } from './config';

cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key:  "",
    api_secret: config.api_secret
});

export default cloudinary;