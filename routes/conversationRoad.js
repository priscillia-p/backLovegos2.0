var express = require('express');
var mongoose = require('mongoose');
var user = require('../models/utilisateur');
var message = require('../models/message');
var conversation = require('../models/conversation');

var conversationRouter = express.Router();

//Chargement d'un conversation
conversationRouter.get("/:id", function(req, res, next){
    conversation.findById(req.params.id, function(err, conv){
        if (err) throw err;
        console.log(conv);
        res.json(conv);
    });
});

conversationRouter.get("/", function(req, res, next){
    conversation.find({}, function(err, convs){
        if (err) throw err;
        console.log(convs);
        res.json(convs);
    });
});


module.exports = conversationRouter;