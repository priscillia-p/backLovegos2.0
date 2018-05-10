var express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors');
var user = require('./routes/userRoad');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.use('/users',user);

module.exports = app;