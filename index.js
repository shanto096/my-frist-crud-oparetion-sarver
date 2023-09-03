const express = require('express')
const app = express()
const port = process.env.PROT || 5000

const cors = require('cors')
app.use(cors())
app.use(express.json())
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// shantokumar096
// WeN1uOhukEx9uVtG




const uri = "mongodb+srv://shantokumar096:WeN1uOhukEx9uVtG@cluster0.g50jtk2.mongodb.net/?retryWrites=true&w=majority";

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
        //  eivabe o kora jabe ......
        // const database = client.db("userDB");
        // const userCollection = database.collection("user");
        const userCollection = client.db("userDB").collection("user")


        // find/show all data
        app.get('/user', async(req, res) => {
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result)

        })

        // find/show one data
        app.get('/user/:id', async(req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await userCollection.findOne(query)
            res.send(result)
        })


        // create data
        app.post('/user', async(req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            res.send(result)
            console.log(user);
        })

        // update data
        app.put('/user/:id', async(req, res) => {
                const user = req.body
                const id = req.params.id
                console.log(user);
                const filter = { _id: new ObjectId(id) }
                const option = { upsert: true }
                const updateUser = {
                    $set: {
                        name: user.name,
                        email: user.email
                    }
                }
                const result = await userCollection.updateOne(filter, updateUser, option)
                res.send(result)
            })
            // delete data
        app.delete('/user/:id', async(req, res) => {
            const id = req.params.id;
            console.log('dtaa', id);
            const query = { _id: new ObjectId(id) }
            const result = await userCollection.deleteOne(query)
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


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})