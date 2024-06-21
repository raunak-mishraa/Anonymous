import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}// this is a type definition for the connection object which will be returned by the function when database is connected

const connection: ConnectionObject = {};// creating an object of type ConnectionObject

export async function dbConnect():Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to database");
        return;
    }
    // connecting to the database
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "")
        console.log(db)
        connection.isConnected = db.connections[0].readyState;
        console.log("DB Connected Successfully");
    } catch (error) {
        console.log("Database connection failed!: ", error);
        process.exit(1);
    }
}