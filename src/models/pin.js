const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const Pin=new Schema({
    officeName:String,
    pincode:Number,
    taluk:String,
    districtName:String,
    stateName:String
},{collection:'pincode'});

module.exports=mongoose.model('pinModel',Pin);