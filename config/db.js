import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

export default async function connectDb() {
    try {
        let conn = await mongoose.connect(process.env.MONGO_URI, { dbName: "event-db" });
        if (conn) {
            console.log("db connected !");
        }
    } catch (error) {
        console.log(error.message);
    }
}