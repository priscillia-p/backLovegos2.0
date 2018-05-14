var express = require('express');
var mongoose = require('mongoose');
var message = require('../models/message');
var conversation = require('../models/conversation');

var messageRouter = express.Router();

//get all messages
messageRouter.get("/", function(req,res,next){
    message.find({}, function(err,messages){
        if(err) throw err;
        console.log(messages);
        res.json(messages);
    });
});

//Envoi d'un message
messageRouter.post("/", function(req, res, next){
    let newMessage = new message();
    newMessage.contenu = req.body.message.contenu;
    newMessage.dateEnvoi = req.body.message.dateEnvoi;
    newMessage.auteur = req.body.message.auteur;
    newMessage.conversationId = req.body.idConversation;
    
    let id = 0;
    message.count({}, function(err, count){
        if (err) throw err;
        id = count;
        newMessage._id = id;
    }).then(
        function(){
            try{
                message.create(newMessage);
                return newMessage;
            }catch(e){
                return res.json({"success":"NOPE"});
            }
        }
    );

    let conv;
    conversation.findById(newMessage.conversationId, function(err, c){
        if(err) throw err;
        conv = c;
    }).then(
        function(){
            conv.messages.push(newMessage);
            conversation.update({},conv,function(err){
                if(err) return res.json({"success":"NOPE"});
                return  res.json({"success": "OK"});
            });
        }
    );
});

module.exports = messageRouter;