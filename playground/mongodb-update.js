
const { MongoClient, ObjectID } = require("mongodb");
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server')
    const db = client.db('TodoApp');

    db.collection('Users').findOneAndUpdate({
        name:"James"
    }, {
            $inc: {
                age:100000
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result);
        })


    //client.close();

});
