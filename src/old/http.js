const http=require("http");
const fs=require("fs");
const env=require("dotenv").config();

const server=http.createServer((req,res)=>{
    //res.statusCode=200;
    //res.setHeader('Content-Type','text/html');
    

    if( req.url=="/" && req.method=="GET"){
        fs.readFile("src/index.html",(err,data)=>{
            if( err){
                res.writeHead(404,{'Content-Type':'text/html'});    
                res.write("File not found");
                res.end();
            }
            else{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.write(data);
                res.end();
            }
        })
       
    }
    else if( req.url=="/web" && req.method=="GET"){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write("<h1>");
        res.write(` Node Web Application -  ${process.version}`);
        res.write("</h1>");
        res.end();
    }
    else{
        res.writeHead(404,{'Content-Type':'text/html'});
        res.write("<h1>");
        res.write(`Page not found`);
        res.write("</h1>");
        res.end();
    }


});

server.listen(process.env.PORT,()=>{
    console.log(`Server running at http://127.0.0.1:${process.env.PORT}`);
});