const express=require('express');
const router=express.Router();

router.get("/",(req,res)=>{
    //res.status(200).send("Product page");
    res.render('product.html',{ data: [{name:"aaa", price:36, }, {name:"bbb", price:34, }, {name:"ccc", price:33,}, {name:"ddd", price:38, }], info:{ total:20, span:4}, ratings:4.5})
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
