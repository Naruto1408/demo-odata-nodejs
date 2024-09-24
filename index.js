const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectID } = require('mongodb');

const app = express();
const PORT = 3000;
const MONGO_URL = 'mongodb://mongo:27017/odata-demo';

app.use(bodyParser.json());

let db;

MongoClient.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, client) => {
    if (err) throw err;
    db = client.db('odata-demo');

    // Seed data
    const products = await db.collection('Products').find().toArray();
    if (products.length === 0) {
        await db.collection('Products').insertMany([
            { name: 'Product 1', price: 20.0 },
            { name: 'Product 2', price: 10.0 },
            { name: 'Product 3', price: 35.0 }
        ]);
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

app.get('/products', async (req, res) => {
    const products = await db.collection('Products').find().toArray();
    res.json(products);
});

app.get('/products/:id', async (req, res) => {
    const product = await db.collection('Products').findOne({ _id: new ObjectID(req.params.id) });
    res.json(product);
});

app.post('/products', async (req, res) => {
    const result = await db.collection('Products').insertOne(req.body);
    res.json(result.ops[0]);
});

app.put('/products/:id', async (req, res) => {
    const result = await db.collection('Products').updateOne({ _id: new ObjectID(req.params.id) }, { $set: req.body });
    const updatedProduct = await db.collection('Products').findOne({ _id: new ObjectID(req.params.id) });
    res.json(updatedProduct);
});

app.delete('/products/:id', async (req, res) => {
    await db.collection('Products').deleteOne({ _id: new ObjectID(req.params.id) });
    res.sendStatus(204);
});
