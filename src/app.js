const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('../config');


app.use(bodyParser.json({
    limit: "5mb"
}));

app.use(bodyParser.urlencoded({
    extended: true
}));


//models declaration


//routes declaration

//EXEMPLO: 
const indexRoute = require('./routes/index-route');


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute);
//app.use('/user', indexRoute);


module.exports = app;