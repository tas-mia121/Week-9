const { connectDB, client } = require("./app");

async function addProducts() {
    try {
        const { collection } = await connectDB();

        // Drop the collection before execution
        await collection.drop().catch(() => {});

        const products = [
            {
                id: 1,
                name: "Laptop",
                type: "Electronics",
                description: "A laptop computer for everyday use",
                price: 999.99,
                units: 10
            },
            {
                id: 2,
                name: "Keyboard",
                type: "Electronics",
                description: "A wireless keyboard",
                price: 59.99,
                units: 25
            },
            {
                id: 3,
                name: "Office Chair",
                type: "Furniture",
                description: "A comfortable office chair",
                price: 199.99,
                units: 15
            }
        ];

        await collection.insertMany(products);

        console.log("3 products added successfully");

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

addProducts();