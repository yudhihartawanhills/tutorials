const {ObjectID} =require('mongodb');

const {mongoose} =require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} =require("./../server/models/user");

mongoose.Collection('user')

// var id = 'ww6bda6f0ae2b90a23e02ca4fd';

// if(!ObjectID.isValid(id)){
//     console.log("ID not valid");
// }

// Todo.find({
//     _id:id
// }).then((todos)=>{
//     console.log('Todos',todos);
// })

// Todo.findOne({
//     _id:id
// }).then((todo)=>{
//     console.log('Todo',todo);
// })

// Todo.findById({_id:id}).then((todo)=>{
//     if(!todo){
//         return console.log("id not found");
//     }
//     console.log('Todo',todo);
// }).catch((e)=>{console.log(e)});

User.findById('sss').then((user)=>{
    if (!user){
        return console.log('Unable to find user');
    }
    console.log(JSON.stringify(user,undefined,2));

},(e)=>{
    console.log(e);
})