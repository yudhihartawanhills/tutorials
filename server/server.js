const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var { ObjectId } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');


var app = express();
//const port = process.env.PORT || 3000;
const port = 3000;

app.use(bodyParser.json());

//create new todos
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    })
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    })

})

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    }).catch((err) => { console.log(err); })
});


//GET /todos/12345
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    //validate ID
    console.log(id);
    if (!ObjectId.isValid(id)) {
        res.status(404).send({ message: "not valid" });
    } else {
        console.log("Valid");
        Todo.findById({ _id: id }).then((todo) => {
            if (todo) {
                return res.status(200).send({ todo });
            } else {
                return res.status(404).send({ text: "" });
            }
        }).catch((e) => {
            res.status(404).send({});
        });

    }
})

app.delete('/todos/:id', (req, res) => {
    //get the id
    var id = req.params.id;

    if (!ObjectId.isValid(id)) {
        res.status(404).send({ message: "not valid" });
    } else {
        console.log("Id is valid");
        Todo.findByIdAndRemove(id).then((result) => {
            if (result == null) {
                return res.status(404).send({ message: "id not found" });
            }
            console.log(result);
            res.status(200).send(result);
        }).catch((e) => {
            res.status(404).send({});
        })
    }
})


app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectId.isValid(id)) {
        return res.status(404).send({ message: "not valid" });
    }

    if (_.isBoolean(body.completed)) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    })

})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
})




module.exports = { app };