const express=require('express');
const dotenv=require("dotenv").config();
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const parseurl=require('parseurl');
const nunjucks=require('nunjucks');
const path=require('path');
const { title } = require('process');

const db=require('./dao');
const [Car,Pin,User]=[require('./models/cars'),require('./models/pin'),require('./models/user')];

const [admin,user,product]=[require('./routes/admin'), require('./routes/user'),require('./routes/product')];

const passport=require('passport');
const LocalStrategy = require('passport-local').Strategy;



const app=express();
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
passport.deserializeUser(function (user, next) {
    next(null, user);
});

passport.use( new LocalStrategy({ usernameField: 'name',passwordField:'userpass' },(username, password, done) => {  
    
    User.findOne({ name: username }, (err, user) => {
      
      if (err) { return done(err); }
      if (!user) { return done(null, null, { message: 'No user found!' }); }
      if (user.password!==password) {
       
        return done(null, null, { message: 'Username or password is incorrect!' });
      }
  
      return done(null, user, null);
    });
  }
));
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  }

app.get('/adminlogin', isAuthenticated, (req, res) => { res.render('login.html') });


//nunjucks.configure('views', { autoescape: true });
nunjucks.configure(path.resolve(__dirname,'public'),{
    express:app,
    autoscape:true,
    noCache:false,
    watch:true
}); 

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
  });

  app.post("/adminlogin",(req,res)=>{
        

        passport.authenticate('local', function (err, user, info) {

            if (err) {
              res.render('admin.html', { error: err });
            } else if (!user) {
               
              res.render('admin.html', { errorMessage: info.message });
        
            } else {
              //setting users in session
              req.logIn(user, function (err) {
                if (err) {
                   
                  res.render('admin.html', { error: err });
                } else {
                  res.render('login.html',{ name:user.name});
                }
              })
            }
          })(req, res);

  });

  app.get('/signout',(req,res)=>{
    req.logout();
    res.redirect('/');
  })


app.get("/",(req,res)=>{
    res.setHeader("Content-Type","text/html");
 
    Car.find({},(err,data)=>{
        if(err){
          res.status(200).send(`Error Found: ${err}`);
        }
        else if(data.length==0){
          //res.status(200).send("No pincode found");
          res.render('home.html',{name:"Homepage", data:err});
        }
        else{
          //res.status(200).send(data);
          res.render('home.html',{name:"Homepage", data:data});
        }
 
    });
    
});

app.get('/pincode',(req,res)=>{
    res.status(200).render('pincode.html');
});
app.get('/searchpin',(req,res)=>{
    let pin=req.query.pincode;

   Pin.find({pincode:pin},(err,data)=>{
       if(err){
        return res.status(200).send(`Error Found: ${err}`);
       }
       else if(data.length==0){
        return res.status(200).send("No pincode found");
       }
       else{
        return res.status(200).send(data);
       }

   });
});

app.post('/search',(req,res)=>{
    var days=["sun","mon","tues","wed","thurs","fri","sat"];
    var data=req.body;
    var no=data.split(":")[1];

    res.header('Access-Control-Allow-Origin',"*");
    
    if( no<days.length){
        return res.send(days[no]);
    }
    else{
        return res.send("invalid day");
    }

});


app.get('/savedata',(req,res)=>{

    let car=new Car({name:req.query.name, brand:req.query.brand, type:req.query.type, price:req.query.price });

    car.save((err,data)=>{
        if( err){
            
            res.status(200).send("Error");
        }
        else{
            
            res.status(200).send("Data Saved");
        }

    });
   
});

app.get("/searchcar",(req,res)=>{
    
    //res.send(req.query);

    Car.find({name:req.query.name},(err,data)=>{
        if(err){
            res.send(`Error: ${err}`);
        }
        else{
            
            if( data.length==0){
                res.status(200).render('search.html',{err:"No car found"});
            }
            else{
                res.status(200).render('search.html',{ data:data});
            }
        }
    })

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

    if( req.body.name=="admin" && req.body.pass=="123456"){

        res.status(200).send(req.body);
    }
    else{
       
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
