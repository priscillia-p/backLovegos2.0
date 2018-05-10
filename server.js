var http = require('http');
var app = require('./app');
var mongoose = require('mongoose');
var mongo = require("./mongo");

//mongoose.connect('mongodb://localhost/logos_core');
mongo();

var server = http.createServer(app);

server.listen(4300);