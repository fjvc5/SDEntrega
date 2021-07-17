var express = require('express');
var router = express.Router();

const Coche = require('../model/user.js');

router.get('/coche', (req, res, next) => {
    Coche.find(function(err, products){
        if(err) {
            res.json(err);
        }
        else{
            res.json(products);
        }
    });
});


router.get('/coche/:id', (req, res, next) => {

    let productID = req.params.id;
    Coche.findById(productID, (err, product) =>{
        if(err){
            res.json({msg:`No existe el coche buscado`})
        }
        else{
            res.json(product)
        }
    });

});

router.post('/coche', (req, res, next) => {
    let newProduct = new Coche({
        modelo: req.body.modelo,
        matricula: req.body.matricula,
        destino: req.body.destino,
        fechaIni: req.body.fechaIni,
        fechaFin: req.body.fechaFin,
        disponible: req.body.disponible,
        precio: req.body.precio
    });

    newProduct.save((err,products) =>{
        if(err) {
            res.json(err);
        }
        else{
            res.json({msg: 'Coche añadido a la BD'});
        }
    }) ;
    
});

router.put('/coche/:id', (req, res, next) => {
    
    var put = {
        $set: {
            modelo: req.body.modelo,
            matricula: req.body.matricula,
            destino: req.body.destino,
            fechaIni: req.body.fechaIni,
            fechaFin: req.body.fechaFin,
            disponible: req.body.disponible,
            precio: req.body.precio
        }
    };
    
    Coche.findByIdAndUpdate(req.params.id, put, (err) => {
        if(err) {
            res.json(err);
        }
        else{
            res.json(put);
        }
    });

});

// router.put('/coche/reserva/:id', (req, res, next) => {
    
//     var put = {
//         $set: {
           
     
//             disponible: false
            
//         }
//     };
    
//     Coche.findByIdAndUpdate(req.params.id, put, (err) => {
//         if(err) {
//             res.json(err);
//         }
//         else{
//             res.json(put);
//         }
//     });

// });

router.delete('/coche/:id', (req, res, next) => {
    let productId= req.params.id;

    Coche.findById(productId,(err,product)=>{
        if(err){
            return res.json({msg: `Operación fallida`});
        }

        try{
            product.remove(err =>{
                if(err) res.json({msg: `Error al borrar el coche ${err}`})
    
                return res.json({msg: `El coche se ha borrado con éxito`});
            })
        }catch(error){
            return res.json({msg: `El coche solicitado no existe`});
        }
        
    });
});

module.exports = router;