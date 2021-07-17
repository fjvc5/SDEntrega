const { json } = require('body-parser');
var express = require('express');
const fetch = require('node-fetch');
var router = express.Router();
const config = require('../config.js');

const auth = require('../middleware/index');

const URLA = config.URL_Avion;

// const Avion = require('../model/user.js');

router.get('/avion', (req, res, next) => {
    fetch(URLA, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(myjson => {
        res.json(myjson)
    }).catch(error => {
        console.log("Error: ",error),
        next();
    })
});

router.get('/avion/:id', (req, res, next) => {
    const ID = req.params.id;
        fetch (`${URLA}/${ID}`)
        .then(res => res.json() )
        .then( myjson =>{
            res.json(
            myjson
            );
        }) 
        .catch(error=> {
            res.json({msg: 'El servidor se encuentra desabilitado. Intentelo más tarde.'})
            next()
        })
});


router.post('/avion', auth ,(req, res, next) => {
    const nuevoElemento = req.body;
    const Token = req.user.token;

    fetch (URLA,  {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${Token}` 
        },
        body: JSON.stringify(nuevoElemento), //Creo que sobra la coma
    })
    .then(res => res.json() )
    .then( myjson =>{
        res.json({
            msg: myjson.msg,
        })
    })
    .catch(error=> {
        res.json({msg: 'El servidor se encuentra desabilitado. Intentelo más tarde.'})
        next()
    })
});


router.put('/avion/:id', auth ,(req, res, next) => { //Funciona pero no se muestra nada en postman una vez actualizado
    const ID = req.params.id;
        
    const nuevoElemento = req.body;
    const Token = req.user.token;

    fetch (`${URLA}/${ID}`,  {
        method: 'PUT',
        body: JSON.stringify(nuevoElemento),

        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${Token}` 
        }

    })
    .then(res => res.json() )
    .then( myjson =>{ 
        res.json({
            msg: myjson.msg
        });
    })
    .catch(error=> {
        res.json({msg: 'El servidor se encuentra desabilitado. Intentelo más tarde.'})
        next()
    })
});


//No implementamos DELETE, pues la agencia no debería poder borrar Hoteles, Coches o Vuelos.


module.exports = router;