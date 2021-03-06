const { MongoClient, ObjectID } = require("mongodb");
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server')
    const db = client.db('TodoApp');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5bd795b8a7139b058caa72c3')
    // }).toArray().then((docs)=>
    // {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined,2));
    // },(err)=>{
    //     console.log('Unable to fetch todos',err);
    // })
    
    // db.collection('Todos').find().count().then((count)=>
    //     {
    //         console.log('Todos count:'+count);
    //     },(err)=>{
    //         console.log('Unable to fetch todos',err);
    //     })


    db.collection('Users').find({name:'James'}).count().then((count)=>{
        console.log(`James exists :${count} times`);
    })
    
    client.close();
}
);
