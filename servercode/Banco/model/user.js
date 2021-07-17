const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema= Schema({
    nombreBanco: String,
    emailUser: String,
    numTarjeta: String,
    saldo: String
});
module.exports = mongoose.model('Product',ProductSchema);