const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');
const { app } = require("./../server");
const { Todo } = require('./../models/todo');

const todos = [
    {
        _id: new ObjectID(),
        text: "first test todoo"
    },
    {
        _id: new ObjectID(),
        text: "Second test todo"
    }
]


beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();

                }).catch((e) => done(e));
            })
    });
    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send()
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});


describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todos', (done) => {

        request(app)
            .get(`/todos/${todos[1]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[1].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        //get 404 back
        request(app)
            .get(`/todos/5be0d040bcc75e100cbb2d2a`)
            .expect(404)
            .end(done);
    })
    it('should return 404 for non-object ids', (done) => {
        //todos/123
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .expect((res) => {
                expect(res.body.message).toBe("not valid")

            })
            .end(done);
    })


});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(hexId).then((todo) => {
                    expect(todo).not.toBeTruthy();
                    done();
                }).catch((e) =>
                    done(e)
                );
            })
    });
    it('should return 404 if todo not found', (done) => {
        //get 404 back
        request(app)
            .delete(`/todos/5be0d040bcc75e100cbb2d2a`)
            .expect(404)
            .end(done);

    });
    it('should return 404 if objectID is invalid', (done) => {
        //todos/123
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .expect((res) => {
                expect(res.body.message).toBe("not valid")

            })
            .end(done);
    });


});