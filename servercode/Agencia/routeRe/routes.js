var express = require('express');
const fetch = require('node-fetch');
var router = express.Router();
const config = require('../config.js');
const auth = require('../middleware/index');

const URLR = config.URL_Reserva;
// const Avion = require('../model/user.js');


router.get('/reservas', (req, res, next) => {
    fetch(URLR, {method: 'GET'}).then(res => res.json())
    .then(myjson => {
        res.json(myjson)
    }).catch(error => {
        console.log("Error: ",error),
        next();
    })
});

router.get('/reserva/:id', (req, res, next) => {
    const ID = req.params.id;
        fetch (`${URLR}/${ID}`)
        .then(res => res.json() )
        .then( myjson =>{
            res.json({
            product: myjson.product
            });
        }) 
        .catch(error=> {
            res.json({msg: 'El servidor se encuentra desabilitado. Intentelo más tarde.'})
            next()
        })
});

router.post('/reservas', auth, (req, res, next) => {
    const nuevoElemento = req.body;
    //const Token = req.user.token;

    fetch (URLR,  {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            // 'Authorization':`Bearer ${Token}` 
        },
        body: JSON.stringify(nuevoElemento),
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

router.put('/reservas/:id', auth, (req, res, next) => { //Funciona pero no se muestra nada en postman una vez actualizado
    const ID = req.params.id;
        
    const nuevoElemento = req.body;
    //const Token = req.user.token;

    fetch (`${URLR}/${ID}`,  {
        method: 'PUT',
        body: JSON.stringify(nuevoElemento),

        headers: {
            'Content-Type': 'application/json'
           //'Authorization':`Bearer ${Token}` 
        }

    })
    .then(res => res.json() )
    .then( myjson =>{ 
        res.json(myjson);
    })
    .catch(error=> {
        res.json({msg: 'El servidor se encuentra desabilitado. Intentelo más tarde.'})
        next()
    })
});

router.delete('/reservas/:id', auth, (req, res, next) => { //Funciona pero no se muestra nada en postman una vez actualizado
    const ID = req.params.id;
        
    
    //const Token = req.user.token;

    fetch (`${URLR}/${ID}`,  {
        method: 'DELETE',

        headers: {
            'Content-Type': 'application/json'
           //'Authorization':`Bearer ${Token}` 
        }

    })
    .then(res => res.json() )
    .then( myjson =>{ 
        res.json(myjson);
    })
    .catch(error=> {
        res.json({msg: 'El servidor se encuentra desabilitado. Intentelo más tarde.'})
        next()
    })
});



module.exports = router;