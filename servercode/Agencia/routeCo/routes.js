var express = require('express');
const fetch = require('node-fetch');
var router = express.Router();
const config = require('../config.js');
const auth = require('../middleware/index');
const URLC = config.URL_Coche;
// const Avion = require('../model/user.js');


router.get('/coche', (req, res, next) => {
    fetch(URLC, {method: 'GET'}).then(res => res.json())
    .then(myjson => {
        res.json(myjson)
    }).catch(error => {
        console.log("Error: ",error),
        next();
    })
});

router.get('/coche/:id', (req, res, next) => {
    const ID = req.params.id;
        fetch (`${URLC}/${ID}`)
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

router.post('/coche',auth ,(req, res, next) => {
    const nuevoElemento = req.body;
    //const Token = req.user.token;

    fetch (URLC,  {
        method: 'POST',
        headers: {
            'Content-type':'application/json',
            //'Authorization':`Bearer ${Token}` 
        },
        body: JSON.stringify(nuevoElemento),
    })
    .then(res => res.json() )
    .then( myjson =>{
        res.json(myjson)
    })
    .catch(error=> {
        res.json({msg: 'El servidor se encuentra desabilitado. Intentelo más tarde.'})
        next()
    })
});

router.put('/coche/:id', auth, (req, res, next) => { //Funciona pero no se muestra nada en postman una vez actualizado
    const ID = req.params.id;
    
    const nuevoElemento = req.body;
    //const Token = req.user.token;
    
    fetch (`${URLC}/${ID}`,  {
        method: 'PUT',
        body: JSON.stringify(nuevoElemento),

        headers: {
            'Content-type': 'application/json',
            ///'Authorization':`Bearer ${Token}` 
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


// router.put('/coche/reserva/:id', auth, (req, res, next) => { //Funciona pero no se muestra nada en postman una vez actualizado
//     const ID = req.params.id;
        
//     const nuevoElemento = req.body;
//     //const Token = req.user.token;

//     fetch (`${URLC}/${ID}`,  {
//         method: 'PUT',
//         body: JSON.stringify(nuevoElemento),

//         headers: {
//             'Content-type': 'application/json',
//             ///'Authorization':`Bearer ${Token}` 
//         }

//     })
//     .then(res => res.json() )
//     .then( myjson =>{ 
//         res.json(myjson);
//     })
//     .catch(error=> {
//         res.json({msg: 'El servidor se encuentra desabilitado. Intentelo más tarde.'})
//         next()
//     })
// });



module.exports = router;