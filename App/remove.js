const { connectDB, client } = require("./app");

async function removeProduct() {
    try {
        const { collection } = await connectDB();

        const result = await collection.deleteOne({
            id: 3
        });

        console.log("Products deleted:", result.deletedCount);

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

removeProduct();