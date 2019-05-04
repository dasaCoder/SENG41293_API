import express from 'express';
import db from './db/db';
import states_hash from './db/states_hash';
import states_titlecase from './db/states_titlecase';
import bodyParser from 'body-parser';
const redis = require('redis');

// Set up the express app
const app = express();

// Create Redis Client
let stHashClient = redis.createClient();


stHashClient.on('connect', function(){
    
    for(var hash of states_hash) {
        console.log(hash);
    }
});

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/codeToState', (req, res) => {

    const code = req.query.code;
    
    return res.status(200).send({
        success: 'true',
        message: states_hash[code]
    });

});


app.get('/stateToCode', (req, res) => {

    const stateName = req.query.state;
    
    states_titlecase.map((state) => {
    if (state.name === stateName) {
        return res.status(200).send({
        success: 'true',
        message: state.abbreviation,
        });
    } 
    });
return res.status(404).send({
    success: 'false',
    message: 'state does not exist',
    });
});

// // get all todos
// app.get('/api/v1/todos', (req, res) => {
//   res.status(200).send({
//     success: 'true',
//     message: 'todos retrieved successfully',
//     todos: db
//   })
// });

// app.post('/api/v1/todos', (req, res) => {
//     if(!req.body.title) {
//       return res.status(400).send({
//         success: 'false',
//         message: 'title is required'
//       });
//     } else if(!req.body.description) {
//       return res.status(400).send({
//         success: 'false',
//         message: 'description is required'
//       });
//     }
//    const todo = {
//      id: db.length + 1,
//      title: req.body.title,
//      description: req.body.description
//    }
//    db.push(todo);
//    return res.status(201).send({
//      success: 'true',
//      message: 'state added successfully',
//      todo
//    })
//   });


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});