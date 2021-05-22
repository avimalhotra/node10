const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const Car=new Schema({
    name:String,
    brand:String,
    type:String,
    price:Number
},{collection:'cars'});

module.exports=mongoose.model('carModel',Car);