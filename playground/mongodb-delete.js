const { MongoClient, ObjectID } = require("mongodb");
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server')
    const db = client.db('TodoApp');

    // // deleteMany
    // db.collection('Todos').deleteMany({text:'Something to do'}).then((result)=>{
    //     console.log(result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text:'Yudhi'}).then((result)=>{
    //     console.log(result);
    // });
    
    // //findone and delete
    // db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
    //     console.log(result);
    // })

    db.collection('Todos').

    
    //client.close();
}
);
