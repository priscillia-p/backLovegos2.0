var express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors');
var user = require('./routes/userRoad');
var love = require('./routes/lovesRoad');
var conversation = require('./routes/conversationRoad');
var message = require('./routes/messageRoad');
var rec = require('./routes/recommandationRoad');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.use('/lovegos/users',user);
app.use('/lovegos', love);
app.use('/lovegos/conversation', conversation);
app.use('/lovegos/message', message);
app.use('/lovegos', rec);

module.exports = app;