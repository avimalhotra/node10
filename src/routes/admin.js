const express=require('express');
const router=express.Router();

router.use((req,res,next)=>{
    console.log('Admin login at: ', Date.now());
    next();
});

router.get('/',(req,res)=>{
    //res.status(200).send("Admin Page");
    res.render("admin.html",{name:"admin"});
});

router.get('/add',(req,res)=>{
    res.status(200).send("Admin Add Page",);
});
router.get('/remove',(req,res)=>{
    res.status(200).send("Admin Remove Page");
});


module.exports=router;