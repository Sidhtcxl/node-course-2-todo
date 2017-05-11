const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
},{
  _id: new ObjectID(),
  text: 'Second test todo',
  completed:true,
  completedAt: 333
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos)
  }).then(() => done());
});

describe('Post /todos',() => {
  it('should create a new todo',(done) =>{
    var text = 'Test todo Text';
    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err,res) => {
      if(err){
        return done(err);
      }

      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((err)=> done(err));
    });
  });

  it('should not create todo with invalid body data',(done)=>{
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err,res)=>{
      if(err){
        return done(err);
      }

      Todo.find().then((todos)=>{
        expect(todos.length).toBe(2);
        done();
      }).catch((err) => done(err));
    });
  });
});

describe('Get /Todos',() =>{
  it('should get all todos',(done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});

describe('Get /Todos:id',() =>{
  it('should get the todo od specific id',(done) =>{
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text)
    })
    .end(done);
  });

  it('should return 404 if todo not found',(done) => {
    request(app)
    .get(`/todo/${new ObjectID().toHexString()}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 for non-object ids',(done) => {
    request(app)
    .get('/todos/123')
    .expect(404)
    .end(done);
  });
});

describe('Delete /todos/:id',()=> {
  it('should remove the todo',(done)=> {
    var hexid = todos[1]._id.toHexString();
    request(app)
    .delete(`/todos/${hexid}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(hexid);
    })
    .end((err,res) => {
      if(err){
        return done(err);
      }
      Todo.findById(hexid).then((todo) =>{
        expect(todo).toNotExist();
        done();
      }).catch((e) => done(e));
    });
  });
  it('should return 404 if todo not found',(done) => {
    request(app)
    .delete(`/todo/${new ObjectID().toHexString()}`)
    .expect(404)
    .end(done);
  });
  it('should return 404 if id is not valid',(done) => {
    request(app)
    .delete('/todos/123')
    .expect(404)
    .end(done);
  });
});

describe('Patch /todos/:id',()=>{
  it('should update the todo',(done) =>{
    var hexid = todos[0]._id.toHexString();
    todos[0].text = 'Siddharth';
    todos[0].completed = true;
    request(app)
    .patch(`/todos/${hexid}`)
    .send(todos[0])
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe('Siddharth');
      expect(res.body.todo.completed).toBe(true);
      expect(res.body.todo.completedAt).toBeA('number');
    })
    .end(done);
  });
  it('should remove completedAt when the todo is not completed',(done) => {
    var id = todos[1]._id.toHexString();
    todos[1].text = 'Laila';
    todos[1].completed = false;
    request(app)
    .patch(`/todos/${id}`)
    .send(todos[1])
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe('Laila');
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toNotExist();
    })
    .end(done);
  });
});
