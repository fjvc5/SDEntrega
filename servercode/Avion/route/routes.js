var express = require('express');
var router = express.Router();

const Avion = require('../model/user.js');

router.get('/avion', (req, res, next) => {
    Avion.find(function(err, products){
        if(err) {
            res.json(err);
        }
        else{
            res.json(products);
        }
    });
});


router.get('/avion/:id', (req, res, next) => {

    let productID = req.params.id;
    Avion.findById(productID, (err, product) =>{
        if(err){
            res.json({msg:`No existe el coche buscado`})
        }
        else{
        res.json(product)
        }
    });

});

router.post('/avion', (req, res, next) => {
    let newProduct = new Avion({
        asiento: req.body.asiento,
        destino: req.body.destino,
        fechaIni: req.body.fechaIni, //Año/mes/dia
        fechaFin: req.body.fechaFin,
        disponible: req.body.disponible,
        precio: req.body.precio
    });

    newProduct.save((err,products) =>{
        if(err) {
            res.json(err);
        }
        else{
            res.json({msg: 'Avión añadido a la BD'});
        }
    }) ;
    
});

router.put('/avion/:id', (req, res, next) => {

    var put = {
        $set: {
            asiento: req.body.asiento,
            destino: req.body.destino,
            fechaIni: req.body.fechaIni, //Año/mes/dia
            fechaFin: req.body.fechaFin,
            disponible: req.body.disponible,
            precio: req.body.precio
        }
    };
    
    Avion.findByIdAndUpdate(req.params.id, put, (err) => {
        if(err) {
            res.json(err);
        }
        else{
            res.json(put);
        }
    });

});

router.delete('/avion/:id', (req, res, next) => {
    let productId= req.params.id;

    Avion.findById(productId,(err,product)=>{
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