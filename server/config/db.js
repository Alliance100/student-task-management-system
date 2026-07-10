const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

    if (!uri) {
        console.error("❌ MongoDB Connection Failed: MONGO_URI environment variable is not defined");
        throw new Error("MONGO_URI environment variable is not defined");
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            maxPoolSize: 5
        };

        cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
            console.log("✅ MongoDB Connected Successfully");
            return mongooseInstance;
        }).catch((error) => {
            console.error("❌ MongoDB Connection Failed");
            console.error(error.message);
            cached.promise = null;
            throw error;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }

    return cached.conn;
};

module.exports = connectDB;