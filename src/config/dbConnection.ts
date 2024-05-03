import mongoose from "mongoose";
import { config } from "./config";

async function connectDB() {
    try {

        mongoose.connection.on("connected", () => {
            console.log("conntected to local database.")
        });

        mongoose.connection.on("error", () => {
            console.log("failed to establised connection with db")
        });
        
        await mongoose.connect(config.mongodb_url as string);

    } catch (error) {
        console.log("failed to connect to database", error)
        process.exit(1)
    }
}

export default connectDB;
