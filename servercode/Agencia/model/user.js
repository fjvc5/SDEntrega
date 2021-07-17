const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema= Schema({
    modelo: String,
    matricula: String,
    disponible : {type: Boolean, default: true},
    precio : {type : Number, default: -1}

});
module.exports = mongoose.model('Product',ProductSchema);