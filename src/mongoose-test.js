const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/sample', {useNewUrlParser: true, useUnifiedTopology: true});

const db=mongoose.connection;

const Schema=mongoose.Schema;

const Car=new Schema({
    name:String,
    brand:String,
    type:String,
    price:Number
},{collection:'cars'});

const carModel=mongoose.model('carModel',Car);

//var ignis=new carModel({name:"Ignis",brand:"Maruti Suzuki",type:"Hatchback",price:750000});


db.on('error',  (err)=> { console.error( err) }); 

db.once('open', function callback() {
   console.log('mongoose connected!');

//    ignis.save((err,data)=>{
//         if(err){
//             console.error(err);
//             db.close();
//         }
//         else
//         {
//             console.log(`${data.name} saved in database`);
//         }
//    })

// carModel.find({type:'hatchback'},(err,data)=>{
//     if(err){
//         console.error(err);
//         db.close();
//     }
//     else
//     {
//         console.log( data );
//     }
// })


  
});

