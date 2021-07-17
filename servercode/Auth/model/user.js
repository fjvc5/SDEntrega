const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema= Schema({
    email:{type:String, unique:true, index:true, lowercase:true},
    nombreComp: String,
    pass: String,
    signUpdate: {type: Date, default: Date.now()}

});
module.exports = mongoose.model('Product',ProductSchema);

