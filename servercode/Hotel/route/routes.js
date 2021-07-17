var express = require('express');
var router = express.Router();

const Hotel = require('../model/user.js');

router.get('/hotel', (req, res, next) => {
    Hotel.find(function(err, products){
        if(err) {
            res.json(err);
        }
        else{
            res.json(products);
        }
    });
});


router.get('/hotel/:id', (req, res, next) => {

    let productID = req.params.id;
    Hotel.findById(productID, (err, product) =>{
        if(err){
            res.json({msg:`No existe el hotel buscado`})
        }
        else{
            res.json(product)
        }
    });

});

router.post('/hotel', (req, res, next) => {
    let newProduct = new Hotel({
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        numHabitacion: req.body.numHabitacion,
        categoria: req.body.categoria,
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
            res.json({msg: 'Hotel añadido a la BD'});
        }
    }) ;
    
});

router.put('/hotel/:id', (req, res, next) => {

    var put = {
        $set: {
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            numHabitacion: req.body.numHabitacion,
            categoria: req.body.categoria,
            destino: req.body.destino,
            fechaIni: req.body.fechaIni, //Año/mes/dia
            fechaFin: req.body.fechaFin,
            disponible: req.body.disponible,
            precio: req.body.precio
        }
    };
    
    Hotel.findByIdAndUpdate(req.params.id, put, (err) => {
        if(err) {
            res.json(err);
        }
        else{
            res.json(put);
        }
    });

});

router.delete('/hotel/:id', (req, res, next) => {
    let productId= req.params.id;

    Hotel.findById(productId,(err,product)=>{
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