import { config as conf } from "dotenv";

conf()

const _config = {
    port: process.env.PORT,
    mongodb_url:process.env.MONGO_CONNECTION_STRIG,
    env:process.env.Node_ENV,
    jwtSecret:process.env.JWT_SECRET
};

export const config = Object.freeze(_config);