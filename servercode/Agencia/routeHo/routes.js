var express = require('express');
const fetch = require('node-fetch');
var router = express.Router();
const config = require('../config.js');
const auth = require('../middleware/index');

const URLH = config.URL_Hotel;
// const Avion = require('../model/user.js');


router.get('/hotel', (req, res, next) => {
    fetch(URLH, {method: 'GET'}).then(res => res.json())
    .then(myjson => {
        res.json(myjson)
    }).catch(error => {
        console.log("Error: ",error),
        next();
    })
});

router.get('/hotel/:id', (req, res, next) => {
    const ID = req.params.id;
        fetch (`${URLH}/${ID}`)
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

router.post('/hotel', auth, (req, res, next) => {
    const nuevoElemento = req.body;
    //const Token = req.user.token;

    fetch (URLH,  {
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

router.put('/hotel/:id', auth, (req, res, next) => { //Funciona pero no se muestra nada en postman una vez actualizado
    const ID = req.params.id;
        
    const nuevoElemento = req.body;
    //const Token = req.user.token;

    fetch (`${URLH}/${ID}`,  {
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



module.exports = router;