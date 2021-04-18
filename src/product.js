const express=require('express');
const router=express.Router();

router.get("/",(req,res)=>{
    res.status(200).send("Product page");
});
router.get("/:brand",(req,res)=>{
    res.status(200).send("Brand page");
});
router.get("/:brand/:phone",(req,res)=>{
    res.status(200).send("Phone Page");
});
router.get("/:brand/:phone/:variant",(req,res)=>{
    res.status(200).send(req.params);
});

module.exports=router;
