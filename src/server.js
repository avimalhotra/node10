const express=require('express');
const dotenv=require("dotenv").config();
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const parseurl=require('parseurl');

//const admin=require('./admin');
//const user=require('./user');
const [admin,user,product]=[require('./admin'), require('./user'),require('./product')];

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cookieParser());

// trust first proxy
app.set('trust proxy', 1); 
app.use(session({
    secret:"session",
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}))

app.use(express.static('src/public'));

// app.use((req,res,next)=>{
//     console.log('Time: %d', Date.now());
//     next();
// });


app.use( (req, res, next)=> {
    if (!req.session.views) {
      req.session.views = {}
    }
  
    // get the url pathname
    var pathname = parseurl(req).pathname
  
    // count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
  
    next()
  })

app.get("/",(req,res)=>{
    res.setHeader("Content-Type","text/html");
    //res.status(200).send( req.cookies);
    //res.status(200).send( req.sessionID);
        //req.session.username="avi";    
       
    res.send('Id :'+ req.sessionID+' Session Views :  '+ req.session.views['/'] + ' times');
});

app.post('/search',(req,res)=>{
    var days=["sun","mon","tues","wed","thurs","fri","sat"];
    var data=req.body;
    var no=data.split(":")[1];

   // res.header('Access-Control-Allow-Origin',"*");
    
    if( no<days.length){

        return res.send(days[no]);
    }
    else{
        return res.send("invalid day");
    }

});

app.get("/api",(req,res)=>{
    var data=["sun","mon","tues","wed","thurs","fri","sat"];
    res.header('Access-Control-Allow-Origin',"*");
    return res.send(data);
});
app.get("/api/:no",(req,res)=>{
    var data=["sun","mon","tues","wed","thurs","fri","sat"];
    var dayno=req.params.no;
    
    
    if( dayno<data.length){

        return res.send(data[dayno]);
    }
    else{
        return res.send("invalid day");
    }
});

app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.send("logout");
})

app.get("/setcookie",(req,res)=>{
    res.setHeader("Content-Type","text/html");
    res.cookie('id','212',{httpOnly: true});
    res.status(200).send("cookie saved");
});

app.get('/getcookie',(req,res)=>{
    const id=req.cookies.id;
    res.setHeader("Content-Type","text/html");
    if( id ){
        res.status(200).send(id);
    }
    else{
        res.status(200).send("No cookie found");
    }
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
