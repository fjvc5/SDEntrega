var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
const fs = require('fs');
const https = require('https');

const config = require('./config');


var app = express();

const route = require('./route/routes.js');
const { fstat } = require('fs');

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

mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useNewUrlParser', true)

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


mongoose.connect(config.db,(err,res)=>{
    
    if(err){
         return console.log(`Error al conectar al conectar a la base de datos`)
    }
    
    console.log(`El servicio de usuarios escuchando en https://localhost:3004/api/auth`);
    https.createServer(opciones, app).listen(config.port, () =>{
        
    }) ;
})