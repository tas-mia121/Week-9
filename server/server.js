const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();

const PORT = 3000;

const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

app.use(cors());
app.use(bodyParser.json());

async function getCollection() {
    if (!client.topology) {
        await client.connect();
    }

    const db = client.db("mydb");

    return db.collection("products");
}


// GET ALL PRODUCTS
app.get("/products", async (req, res) => {
    try {
        const collection = await getCollection();

        const products = await collection.find({}).toArray();

        res.json(products);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to get products"
        });
    }
});


// ADD PRODUCT
app.post("/products", async (req, res) => {
    try {
        const collection = await getCollection();

        const product = req.body;

        if (!product.id || !product.name || !product.price) {
            return res.status(400).json({
                error: "id, name and price are required"
            });
        }

        const existingProduct = await collection.findOne({
            id: Number(product.id)
        });

        if (existingProduct) {
            return res.status(409).json({
                error: "A product with this id already exists"
            });
        }

        product.id = Number(product.id);
        product.price = Number(product.price);
        product.units = Number(product.units);

        const result = await collection.insertOne(product);

        res.status(201).json({
            message: "Product added successfully",
            product: {
                _id: result.insertedId,
                ...product
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to add product"
        });
    }
});


// DELETE PRODUCT
app.delete("/products/:id", async (req, res) => {
    try {
        const collection = await getCollection();

        const productId = new ObjectId(req.params.id);

        const result = await collection.deleteOne({
            _id: productId
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        res.json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            error: "Invalid product ID"
        });
    }
});


// UPDATE PRODUCT
app.put("/products/:id", async (req, res) => {
    try {
        const collection = await getCollection();

        const productId = new ObjectId(req.params.id);

        const updatedProduct = {
            ...req.body
        };

        delete updatedProduct._id;

        if (updatedProduct.id !== undefined) {
            updatedProduct.id = Number(updatedProduct.id);
        }

        if (updatedProduct.price !== undefined) {
            updatedProduct.price = Number(updatedProduct.price);
        }

        if (updatedProduct.units !== undefined) {
            updatedProduct.units = Number(updatedProduct.units);
        }

        const result = await collection.updateOne(
            { _id: productId },
            { $set: updatedProduct }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        res.json({
            message: "Product updated successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            error: "Invalid product ID"
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});