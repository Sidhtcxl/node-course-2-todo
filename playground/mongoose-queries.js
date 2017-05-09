const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '69119931cedc1a680c42b1e4';
if(!ObjectID.isValid(id)){
  console.log('Not Valid id');
}
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos',todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo',todo);
// });

// Todo.findById(id).then((todoById) => {
//   console.log('TodoById',todoById);
// }).catch((e)=> console.log(e));
User.findById(id).then((user)=>{
  if(!user){
    return console.log('Unable to find user');
  }
  console.log(JSON.stringify(user,undefined,2));
},(e)=>console.log(e));
