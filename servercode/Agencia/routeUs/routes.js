const { json } = require('body-parser');
var express = require('express');
const fetch = require('node-fetch');
var router = express.Router();
const config = require('../config.js');

const auth = require('../middleware/index');

const URLUS = config.URL_Auth;
const URLTOK = config.URL_Token;


router.get('/auth/usuarios', (req, res, next) => {
    //const Token = req.user.Token;


    fetch (URLUS, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${Token}`
        }
    })

    .then(res => res.json())
    .then(myjson => {
        res.json(myjson)
    })
    .catch(err => {
        res.json({ msg:'Servidor no habilitado. Prueba en unos minutos'})
        next();
    })

});

router.get('/auth/usuarios/:id', (req, res, next) => {
    const ID = req.params.id;
        fetch (`${URLUS}/${ID}`)
        .then(res => res.json() )
        .then( myjson =>{
            res.json(myjson);
        }) 
        .catch(error=> {
            res.json({msg: 'El servidor se encuentra desabilitado. Intentelo más tarde.'})
            next()
        })
});




router.post('/auth/usuarios', (req, res) =>{ //Registrar
    const newElement = req.body;
    //const Token = req.user.token;
    fetch (URLUS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${Token}`
        },
        body: JSON.stringify(newElement)
    })

    .then(res => res.json())
    .then(myjson =>{
        res.json(myjson)
    })
    .catch(error=>{
        res.json({ msg:'Servidor no habilitado. Prueba en unos minutos'})
        next();
    })
});

router.post('/auth/tokens', (req, res, next) => { //Obtener el Token
    const newElement = req.body;
    //const Token = req.user.token;
    fetch (URLTOK, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${Token}`
        },
        body: JSON.stringify(newElement)
    })
    .then(res => res.json())
    .then(myjson =>{
        res.json(myjson)
    })
    .catch(error=>{
        res.json({ msg:'Servidor no habilitado. Prueba en unos minutos'})
        next();
    })
});


module.exports = router;