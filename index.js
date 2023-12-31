const express = require("express")
const cors = require("cors")
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
app.use(cors())
app.use(express.json())



const port = process.env.PORT || 5000;




const uri = `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASS}@cluster0.4bnj0wt.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});





async function run() {
    try {
        
        await client.connect();

        const BrandCollection = client.db('insertDB').collection('collection')

        const CartId = client.db('insertDB').collection('cartInfo')


        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await BrandCollection.insertOne(user)
            res.send(result)
        })
        app.post('/cartId', async (req, res) => {
            const user = req.body;
            const result = await CartId.insertOne(user)
            res.send(result)
        })


        app.get('/users', async (req, res) => {
            const result = await BrandCollection.find().toArray()
            res.send(result)
        })
        app.get('/cartId', async (req, res) => {
            const result = await CartId.find().toArray()
            res.send(result)
        })

        app.get('/users/:id', async (req, res) => {
            const id = req.params.id

            const query = {
                _id: new ObjectId(id)
            }
            const result = await BrandCollection.findOne(query)
            res.send(result)
        })


        app.put('/users/:id', async (req, res) => {
            const data = req.body
            const id = req.params.id
            const filter = {
                _id: new ObjectId(id)
            }
            const options = { upsert: true }
            const updateData = {
                $set: {
                    name: data.name,
                    photo: data.photo,
                    type: data.type,
                    price: data.price,
                    rating: data.rating,
                    brandName: data.brandName,
                    description: data.description,
                }
            }
            const result = await BrandCollection.updateOne(
                filter,
                updateData,
                options
            )
            res.send(result)
        })

        app.delete('/cartId/:id', async (req, res) => {
            const id = req.params.id
            const query = {
                _id: new ObjectId(id)
            }
            const result = await CartId.deleteOne(query)
            res.send(result)
        })





        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
    
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("express crud is running")
})

app.listen(port, () => {
    console.log(`example app ${port}`);
})