import mongoose from 'mongoose';
import * as dotenv from "dotenv";

dotenv.config()

export const connect = async () => {
    return mongoose.connect(process.env.MONGODB_URI as string)
}