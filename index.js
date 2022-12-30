const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=> {
    res.send("Poppers server is running on port 5000");
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fxdma7b.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function poppers () {
try{
    const userCollection = client.db('Poppers').collection('users');
    
    /* const user = {
        name: 'tabu',
        email: 'tabu@gmail.com'
    }
    const result = await userCollection.insertOne(user)
    console.log(result); */
    
    app.post('/users', async(req, res)=>{
        const poppersUser = req.body;
        // console.log(poppersUser);
        const result = await userCollection.insertOne(poppersUser)
        res.send(result);
    })
}
finally{

}
}
poppers().catch(err => console.error(err));

app.listen(port, ()=>{
    console.log(`Poppers server is running on port ${port}`)
})