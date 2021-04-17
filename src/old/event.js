const event=require("events").EventEmitter;

let emitter=new event();
module.exports=emitter;

// emitter.on("complete",(x,y)=>{
//     console.log(`Task finished by ${x}`);
//     y.handled=true;
// });
// emitter.on("complete",(x,y)=>{
//     if( y.handled){
//         console.log(`Task finished by ${x}`);
//     }
// });


// emitter.emit("complete","user",{ handled:false});

// emitter.once("done",()=>{
//     console.log("done");
// });

// emitter.emit("done");
// emitter.emit("done");

let l=require("./login");
let a=require("./account");

emitter.emit("login");
emitter.emit("account");
