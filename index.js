const express = require('express');
const {MongoClient, ServerApiVersion} = require('mongodb');
const app = express();
const port = 3000;

const client = new MongoClient(uri, {
    serverApi:{
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

client.connect().then(client => {
    console.log('connected')
})

app.get('/', (req, res)=>{
    res.send('Hello World!');
})

app.listen(port);
