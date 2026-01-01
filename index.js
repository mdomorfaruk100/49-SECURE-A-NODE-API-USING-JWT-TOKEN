const express = require('express');
const {MongoClient, ServerApiVersion} = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000

app.use(cors());
app.use(bodyParser.json());

const client = new MongoClient(uri, {
    serverApi:{
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

client.connect().then(client => {
    const bookings = client.db('burjAlArab').collection('bookings');
    console.log('connected')
    app.post('/addBooking', (req, res) => {
        const newBooking = req.body;
        bookings.insertOne(newBooking).then(result => {
            res.send(result.insertedId);
        })
    })
})

app.get('/', (req, res)=>{
    res.send('Hello World!');
})

app.listen(port);
