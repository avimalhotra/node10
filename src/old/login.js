const t=require('./event');

t.on("login",()=>{
    console.log("Login process begin");
});
t.on("login",()=>{
    console.log("Login process Done");
});