var express = require('express');
var router = express.Router();

const Reserva = require('../model/user.js');

router.get('/reservas', (req, res, next) => {
    Reserva.find(function(err, products){
        if(err) {
            res.json(err);
        }
        else{
            res.json(products);
        }
    });
});


router.get('/reservas/:id', (req, res, next) => {

    let productID = req.params.id;
    Reserva.findById(productID, (err, product) =>{
        if(err){
            res.json({msg:`No existe la reserva buscado`})
        }
        else{
            res.json({msg:"Reserva obtenida" , product: product})
        }
    });

});

router.post('/reservas', (req, res, next) => {
    
    let newProduct = new Reserva({
        emailUser: req.body.emailUser,
        modeloCoche: req.body.modeloCoche,
        matricula: req.body.matricula,
        habitacionHotel: req.body.habitacionHotel,
        nombreHotel: req.body.nombreHotel,
        asientoAvion: req.body.asientoAvion,
        desAvi: req.body.desAvi
    });

    newProduct.save((err,products) =>{
        if(err) {
            res.json(err);
        }
        else{
            res.json({msg: 'Reserva añadida a la BD'});
        }
    }) ;
    
});


router.delete('/reservas/:id', (req, res, next) => {
    let productId= req.params.id;

    Reserva.findById(productId,(err,product)=>{
        if(err){
            return res.json({msg: `Operación fallida`});
        }

        try{
            product.remove(err =>{
                if(err) res.json({msg: `Error al borrar la reserva ${err}`})
    
                return res.json({msg: `La reserva se ha borrado con éxito`});
            })
        }catch(error){
            return res.json({msg: `La reserva solicitado no existe`});
        }
        
    });
});

module.exports = router;