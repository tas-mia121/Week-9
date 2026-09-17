const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();

        console.log("Connected to MongoDB");

        const db = client.db("mydb");

        const collection = db.collection("products");

        console.log("Database: mydb");
        console.log("Collection: products");

        return { db, collection };
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

module.exports = {
    client,
    connectDB
};