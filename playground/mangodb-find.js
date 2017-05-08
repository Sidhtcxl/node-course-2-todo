//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
    if(err){
        return  console.log('Unable To connect to MongoDB Server');
    }
    console.log('Connected to MongoDB Server');

    // db.collection('Todos').find({_id:new ObjectID('5910537706f31f1afca6f9e2')}).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err) => {
    //     console.log('Unable to fetch todos',err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(count);
    // },(err) => {
    //     console.log('Unable to fetch todos',err);
    // });    

    db.collection('Users').find({name:'Siddharth'}).toArray().then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs,undefined,2));
    },(err) => {
        console.log('Unable to find User');
    })
    
    //db.close();
});