const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema= Schema({
    emailUser: String,
    modeloCoche: String,
    matricula:String,
    habitacionHotel: String,
    nombreHotel:String,
    asientoAvion: String,
    desAvi: String


});
module.exports = mongoose.model('Product',ProductSchema);