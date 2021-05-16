const mdb=require('mongodb').MongoClient;
const assert=require('assert');

const url = 'mongodb://localhost:27017';

const dbname="sample";

const client=new mdb(url,{ useUnifiedTopology: true });



const insertDocuments = (db, callback)=>{
    
    const collection = db.collection('cars');
    
    collection.insertMany([
        {name:'alto',brand:'maruti suzuki',type:'hatchback',price:400000}
    ], (err, result)=> {
        assert.strictEqual(err, null);
        assert.strictEqual(1, result.result.n);
        assert.strictEqual(1, result.ops.length);
        console.log("Inserted documents in collection");
        callback(result);
    });
};

const findDocuments = function(db, callback) {
    
    const collection = db.collection('cars');
   
    collection.find({name:'swift'}).toArray(function(err, docs) {
        assert.strictEqual(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
};
    


client.connect((err)=>{
    assert.strictEqual(null,err);
    console.log("Connected successfully to db");
    const db = client.db(dbname);

    //insertDocuments(db,()=>{client.close();})
    //findDocuments(db,()=>{client.close()});
    client.close()
});