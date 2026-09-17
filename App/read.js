const { connectDB, client } = require("./app");

async function readProducts() {
    try {
        const { collection } = await connectDB();

        const products = await collection.find({}).toArray();

        console.log("Products:");

        console.log(products);

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

readProducts();