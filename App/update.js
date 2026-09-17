const { connectDB, client } = require("./app");

async function updateProduct() {
    try {
        const { collection } = await connectDB();

        const result = await collection.updateOne(
            { id: 1 },
            {
                $set: {
                    price: 899.99,
                    units: 8
                }
            }
        );

        console.log("Products updated:", result.modifiedCount);

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

updateProduct();