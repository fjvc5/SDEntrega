var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
const fs = require('fs');
const https = require('https');
const PORT = 3002;

var app = express();

const route = require('./route/routes.js');
const { fstat } = require('fs');

//const BD = mongoose.connect('mongodb://127.0.0.1:27017/avion'); //puerto mongo 27017
const BD = mongoose.connect('mongodb+srv://franvillena8:Francisco8@basedatos.857ac.mongodb.net/Hoteles?retryWrites=true&w=majority'); //puerto mongo 27017

app.use(cors());

app.use(bodyparser.json());
app.use('/api', route);

app.get('/', (req, res) => {
    res.send("Roger am here dude");
});


const opciones = {
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem')
}


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

mongoose.connection.on('connected', () =>{

    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) =>{

    console.log(err);
});


https.createServer(opciones,app).listen(PORT, ()=>{
    console.log("Server started at port: " + PORT);
});

