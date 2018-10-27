const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const products_controller = require('./products_controller.js');
require('dotenv').config();

//process.env.WHATEVER_YOU_NAMED_IT_IN_DOT_ENV, you can also use destructuring on this

var {SERVER_PORT, CONNECTION_STRING} = process.env;

const app = express();

app.use(bodyParser.json());
const port = SERVER_PORT || 3000;

massive(CONNECTION_STRING).then(connection=>{
    app.set('db',connection);
    }).catch(err => {
        console.log(err);
    });

app.post('/api/products', products_controller.create);

app.get('/api/products', products_controller.getAll);

app.get('/api/products/:id', products_controller.getOne);

app.put('/api/products/:id', products_controller.update);

app.delete('/api/products/:id', products_controller.delete);



    app.listen(port, () => {
        console.log(`listening on port ${port}`);
        })


