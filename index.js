const express = require(`express`)
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express()
//middleware
app.use(cors())
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i8hxp3j.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 

async function run(){
    try{
        const quizCollectionOne = client.db('Webapplication').collection('quizTypeOne')
        const categoriesCollections = client.db('Webapplication').collection('categories')


        app.get('/categories', async (req, res) => {
            const query = {}
            const resualt = await categoriesCollections.find(query).toArray();
            res.send(resualt)

        })

        app.get('/categoriesitem/:id', async(req,res) =>{
            const id = req.params.id;
            console.log(id)
            const query = {selectId :  id}
            const resualt = await categoriesCollections.findOne(query);
            res.send(resualt)
        })

        app.get('/quizone', async(req, res) => {
            const query= {};
            const quizes = await quizCollectionOne.find(query).toArray();
            res.send(quizes)
        })

        app.get('/quizone/:id', async(req, res) => {
            const id = req.params.id;
            const query= {_id : new ObjectId(id)};
            const quizes = await quizCollectionOne.findOne(query);
            console.log(quizes)
            res.send(quizes)
        })


    }
    finally{

    }
}
run().catch(err => console.log(err))

 
 









app.get('/', (req, res) => {
    res.send(`webapplication is running now`)
})

app.listen(port, () => {
    console.log(`the port is running ${port}`);
})