const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/sample', {useNewUrlParser: true, useUnifiedTopology: true});

const db=mongoose.connection;

db.on('error', (err)=> { console.error( err) }); 

db.once('open', function callback() {
    console.log('mongoose connected!');
});

module.exports=db;