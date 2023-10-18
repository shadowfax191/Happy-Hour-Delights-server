const express = require("express")
const cors =require("cors")
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000;




const uri = "mongodb+srv://shahariarhossain0599:9UrUR8m9KLsN8Z0O@cluster0.4bnj0wt.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});





async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const BrandCollection =client.db('insertDB').collection('collection')

    app.post('/users',async(req,res)=>{
       const user= req.body;
       const result= await BrandCollection.insertOne(user)
       res.send(result)
    })


    app.get('/users',async(req,res)=>{
       
        const result= await BrandCollection.find().toArray()

        res.send(result)
     })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send("curd is running")
})

app.listen(port,()=>{
    console.log(`example app ${port}`);
})