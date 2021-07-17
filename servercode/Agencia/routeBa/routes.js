var express = require('express');
const fetch = require('node-fetch');
var router = express.Router();
const config = require('../config.js');

const auth = require('../middleware/index');

const URLBA = config.URL_Banco;


router.get('/cuenta', (req, res, next) => {
    //const Token = req.user.Token
    fetch (URLBA, {
        method: 'GET'
        // headers: {
        //     'Content-Type': 'application/json',
        //     //'Authorization': `Bearer ${Token}`
        // }
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

router.get('/cuenta/:id', (req, res, next) => {
    const ID = req.params.id;
        fetch (`${URLBA}/${ID}`)
        .then(res => res.json() )
        .then( myjson =>{
            res.json(myjson);
        }) 
        .catch(error=> {
            res.json({msg: 'El servidor se encuentra desabilitado. Intentelo más tarde.'})
            next()
        })
});




router.post('/cuenta', auth, (req, res) =>{ //Registrar
    const newElement = req.body;
    const Token = req.user.token;

    fetch (URLBA, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`
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

router.put('/cuenta/pago/:id', auth ,(req, res, next) => { //Funciona pero no se muestra nada en postman una vez actualizado
    const ID = req.params.id;
    
    const nuevoElemento = req.body;
    const Token = req.user.token;

    // console.log(nuevoElemento);
    // console.log(`${URLBA}/pago/${ID}`)


    fetch (`${URLBA}/pago/${ID}`,  {
        
        method: 'PUT',
        body: JSON.stringify(nuevoElemento),

        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${Token}` 
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