const express=require('express');
const dotenv=require("dotenv").config();
const bodyParser=require('body-parser');

//const admin=require('./admin');
//const user=require('./user');
const [admin,user,product]=[require('./admin'), require('./user'),require('./product')];

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 


app.use(express.static('src/public'));

// app.use((req,res,next)=>{
//     console.log('Time: %d', Date.now());
//     next();
// });

app.get("/",(req,res)=>{
    res.setHeader("Content-Type","text/html");
    res.status(200).send("<h1>Hello Express JS</h1>");
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
    console.log(req.body.name, req.body.pass);
    
    //res.status(200).send(req.query);
    //res.status(200).json(req.query);

    if( req.body.name="admin" && req.body.pass=="123456"){
        res.status(200).send(req.body);
    }
    else{
       // res.redirect()
        res.status(200).send('Invalid userid or password, <a href="/">Login</a>');

    }

});

// Router
app.use('/admin',admin);
app.use('/user',user);
app.use('/product',product);



/*Wildcard Handler*/
app.get("/**",(req,res)=>{
    res.status(404);
    res.setHeader("Content-Type","text/html");
    res.end("Page Not Found");
});

app.listen(process.env.PORT,()=>{
    console.log(`Express server running at http://127.0.0.1:${process.env.PORT}`);
})
