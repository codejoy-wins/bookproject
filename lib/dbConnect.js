import mongoose from 'mongoose';

// Retrieve the MongoDB URI from the environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Check if the URI is defined
if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    // If the connection is already cached, return it
    if (cached.conn) {
        return cached.conn;
    }

    // If there’s no cached connection, create one
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
