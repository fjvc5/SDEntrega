// const moment = require('moment');
const config = require('../config');
const jwt = require('jwt-simple');

function isAuth(req, res, next){
   
    // console.log(req.headers.authorization);


    if(!req.headers.authorization){
        return res.json({msg:"Token no enviado"});
    }

    const token = req.headers.authorization.split(" ")[1]; //Se declaran aquí para que no de error y si pueda salir el mensaje
    var payload = 0;

    try{
        payload = jwt.decode(token, config.SECRET_TOKEN);

    }catch(err){
        return res.json({msg:"Token erroneo"});
    }

    req.user={
        id: payload.sub,
        token: token
    }

    next();
}

module.exports = isAuth;