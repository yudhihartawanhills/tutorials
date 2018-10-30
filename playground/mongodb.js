//const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

var obj = new ObjectID();
console.log(obj)

var user = { name: 'andrew', age: 25 };
var { name } = user;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server')
    const db = client.db('TodoApp');

    // db.collection('Todos').insertMany([{
    //     text: 'Something to do',
    //     completed: false
    // }, { 
    //     text: 'Yudhi',
    //     completed: true 
    // }
    // ], (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // })

    // db.collection('Users').insertMany([{
    //     name: 'James',
    //     age: 17,
    //     location:'Sydney'
    // }, { 
    //     name: 'Bondi',
    //     age: 17,
    //     location:'Sydney'
    // }
    // ], (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    // })

    client.close();
}
);
