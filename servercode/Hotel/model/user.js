const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema= Schema({
    nombre: String,
    direccion: String,
    numHabitacion: String,
    categoria: String,
    destino: String,
    fechaIni: String, //Año/mes/dia
    fechaFin: String,
    disponible : {type: Boolean, default: true},
    precio : {type : Number, default: -1}

});
module.exports = mongoose.model('Product',ProductSchema);