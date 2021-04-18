const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.status(200).send("User Page");
});

router.get('/view',(req,res)=>{
    res.status(200).send("User View ");
});
router.get('/review',(req,res)=>{
    res.status(200).send("User Review Page");
});

module.exports=router;