var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//get the uri from Heroku environment
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports={
    mongoose
}