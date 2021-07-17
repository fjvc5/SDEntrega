
const app = require('./app.js');
const config = require('./config.js');

const mongoose = require('mongoose');
const fs = require('fs');
const https = require('https');

//const BD = mongoose.connect('mongodb://127.0.0.1:27017/avion'); //puerto mongo 27017
const BD = mongoose.connect('mongodb+srv://franvillena8:Francisco8@basedatos.857ac.mongodb.net/Reservas?retryWrites=true&w=majority'); //puerto mongo 27017


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




https.createServer(opciones,app).listen(config.PORT, ()=>{
    console.log("Server started at port: " + config.PORT);
});

