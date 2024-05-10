import { config as conf } from "dotenv";

conf()

const _config = {
    port: process.env.PORT,
    mongodb_url:process.env.MONGO_CONNECTION_STRIG,
    env:process.env.Node_ENV,
    jwtSecret:process.env.JWT_SECRET,
    cloudinary_cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
};

export const config = Object.freeze(_config);