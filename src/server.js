const express=require('express');
const dotenv=require("dotenv").config();

const app=express();


app.use(express.static('src/public'));

app.use((req,res,next)=>{
    console.log('Time: %d', Date.now());
    next();
});

app.get("/",(req,res)=>{
    res.setHeader("Content-Type","text/html");
    res.status(200).send("<h1>Hello Express JS</h1>");
});

app.get("/admin",(req,res)=>{
    res.status(200);
    res.setHeader("Content-Type","text/html");
    res.end("Hello Admin");
});
app.get("/user",(req,res)=>{
    res.status(200);
    res.setHeader("Content-Type","text/html");
    res.send("Hello User");
});

app.get("/product/:brand/:phone/:variant",(req,res)=>{
    res.status(200).send(req.params);
});
app.get("/courses/:type/:name",(req,res)=>{
    res.status(200).send(req.params);
});

app.get("/search",(req,res)=>{
    res.status(200).send(req.query);
    //res.status(200).send(`Search: ${req.query.q}`);
    //res.status(200).json({"data":req.query});
});

app.post("/contact",(req,res)=>{
    
    res.status(200).send(req.query);
    //res.status(200).send(req.query);
    //res.status(200).json(req.query);

});



/*Wildcard Handler*/
app.get("/**",(req,res)=>{
    res.status(404);
    res.setHeader("Content-Type","text/html");
    res.end("Page Not Found");
});

app.listen(process.env.PORT,()=>{
    console.log(`Express server running at http://127.0.0.1:${process.env.PORT}`);
})
