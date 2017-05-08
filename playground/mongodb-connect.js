//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
    if(err){
        return  console.log('Unable To connect to MongoDB Server');
    }
    console.log('Connected to MongoDB Server');

    // db.collection('Todos').insertOne({
    //     text:'Something to do',
    //     completed: false
    // },(err,res) => {
    //     if(err){
    //         return console.log('Unable To Insert Todo');
    //     }
    //     console.log(JSON.stringify(res.ops,undefined,2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Siddharth',
    //     age: 23,
    //     location: 'Delhi'
    // },(err,res) => {
    //     if(err){
    //         return console.log('Unable To Store UserInfo');
    //     }
    //     console.log(JSON.stringify(res.ops,undefined,2));
    // });

    db.close();
});