const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const User=new Schema({
    name:String,
    password:String
},{collection:'user'});

module.exports=mongoose.model('userModel',User);