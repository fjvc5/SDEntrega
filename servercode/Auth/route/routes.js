const express = require('express');
const router = express.Router();
const Auth = require('../model/user.js');
const bcrypt = require('bcryptjs');
const token = require('../servicios/token');
const serv = require('../servicios/encrypt');


router.post('/auth/tokens', (req, res, next) => { //Obtener el Token
    const pass = req.body.pass;
    
    
    Auth.findOne({email: `${req.body.email}`}, (err, user) => {
        //console.log(email);
        if(err){
            return res.json({msg:'Fallo en la conexion'});
        }
        else{
            if(user == null){
                return res.json({msg:'Usuario o contraseña invalidos'});
            }
            else{
                let hash = user.pass;

                if(serv.revisaPass(pass, hash)){
                    const tokenAux = token.nuevoToken(user);

                    return res.json({
                        msg: 'Acceso concedido',
                        token: tokenAux
                    })
                }
                else{
                    return res.json({msg:'Usuario o contraseña invalidos'});
                }
            }
        }
    });
});


router.post('/auth/usuarios', (req, res) =>{ //Registrar

    const salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.pass, salt);
    let user = new Auth();
    
    Auth.exists({email:`${req.body.email}`}, (err, doc) =>{
        
        if(err){
            return res.json({msg: 'Fallo en la conexion'});
        }
        else{
            if(doc == true){
                
                return res.json({msg: 'Usuario ya existente'});
                
            }
            else{
                user.email = req.body.email;
                user.nombreComp = req.body.nombreComp;
                user.pass = hash;
                //user.signUpdate = req.body.signUpdate;

                user.save();

                return res.json({msg: 'Usuario creado'});
            }
        }

    });

});

router.put('/auth/usuarios/:id', (req, res, next) => {

    var put = {
        $set: {
            email: req.body.email,
            nombreComp: req.body.nombreComp,
            pass: req.body.pass,
            signUpdate: req.body.signUpdate
        }
    };
    
    Auth.findByIdAndUpdate(req.params.id, put, (err) => {
        if(err) {
            res.json(err);
        }
        else{
            res.json(put);
        }
    });

});


router.get('/auth/usuarios', (req, res, next) => {
    Auth.find({}, (err, user) =>{
        //console.log(user);
        if(err){
            return res.json({msg: 'Fallo en la conexion'});
        }

        if(user == false){
            return res.status(404).send({msg: `No existen usuarios`})
        }
        res.json(user);
    });
});

router.get('/auth/usuarios/:id', (req, res, next) => {

    let productID = req.params.id;
    Auth.findById(productID, (err, product) =>{
        if(err){
            res.json({msg:`No existe el coche buscado`})
        }
        else{
            res.json({msg:"Usuario obtenido" , product: product})
        }
    });

});


module.exports = router;