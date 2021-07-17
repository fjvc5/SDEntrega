var express = require('express');
var router = express.Router();

const Banco = require('../model/user.js');

var cuenta = "";

router.get('/cuenta', (req, res, next) => {
    Banco.find(function(err, products){
        if(err) {
            res.json(err);
        }
        else{
            cuenta =products;
            res.json(products);
        }
    });
});


router.get('/cuenta/:id', (req, res, next) => {

    let productID = req.params.id;
    Banco.findById(productID, (err, product) =>{
        if(err){
            res.json({msg:`No existe la tarjeta buscado`})
        }
        else{
            res.json({msg:"Tarjeta obtenido" , product: product})
        }
    });

});

//Pagary  y Devolver


router.put('/cuenta/pago/:id', (req, res, next) => {
    
    
    var put = {
        $set: {
            nombreBanco: req.body.nombreBanco,
            emailUser: req.body.emailUser,
            numTarjeta: req.body.numTarjeta,
            saldo: req.body.saldo

        }
    };
   
    Banco.findByIdAndUpdate(req.params.id, put, (err) => {
        if(err) {
            res.json(err);
        }
        else{
            res.json(put);
        }
    });

});


router.post('/cuenta', (req, res, next) => {
    let newProduct = new Banco({
        nombreBanco: req.body.nombreBanco,
        emailUser: req.body.emailUser,
        numTarjeta: req.body.numTarjeta,
        saldo: req.body.saldo
    });

    newProduct.save((err,products) =>{
        if(err) {
            res.json(err);
        }
        else{
            res.json({msg: 'Banco añadido a la BD'});
        }
    }) ;
    
});

// router.put('/cuenta/:id', (req, res, next) => {

//     var put = {
//         $set: {
//            nombreBanco: req.body.nombreBanco,
//            emailUser: req.body.emailUser,
//            numTarjeta: req.body.numTarjeta,
//            saldo: req.body.saldo
  
//         }
//     };
    
//     Banco.findByIdAndUpdate(req.params.id, put, (err) => {
//         if(err) {
//             res.json(err);
//         }
//         else{
//             res.json(put);
//         }
//     });

// });

router.delete('/cuenta/:id', (req, res, next) => {
    let productId= req.params.id;

    Banco.findById(productId,(err,product)=>{
        if(err){
            return res.json({msg: `Operación fallida`});
        }

        try{
            product.remove(err =>{
                if(err) res.json({msg: `Error al borrar el banco ${err}`})
    
                return res.json({msg: `El banco se ha borrado con éxito`});
            })
        }catch(error){
            return res.json({msg: `El banco solicitado no existe`});
        }
        
    });
});

module.exports = router;