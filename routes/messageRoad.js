var express = require('express');
var mongoose = require('mongoose');
var message = require('../models/message');

var messageRouter = express.Router();

//get all messages
messageRouter.get("/", function(req,res,next){
    message.find({}, function(err,messages){
        if(err) throw err;
        console.log(messages);
        res.json(messages);
    })
})

module.exports = messageRouter;