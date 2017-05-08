//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
    if(err){
        return  console.log('Unable To connect to MongoDB Server');
    }
    console.log('Connected to MongoDB Server');

    // db.collection('Todos').deleteMany({text:'Eat Lunch'}).then((res) =>{
    //     console.log(res);
    // });
    // db.collection('Todos').deleteOne({text:'Eat Lunch'}).then((res)=>{
    //     console.log(res);
    // });
    // db.collection('Todos').findOneAndDelete({completed:false}).then((res)=>{
    //     console.log(res);
    // });
    // db.collection('Users').deleteMany({name:'Siddharth'}).then((res)=> {
    //     console.log(res);
    // });
    db.collection('Users').findOneAndDelete({name:'Rahul'}).then((res)=> {
        console.log(res);
    });

    db.close();
});