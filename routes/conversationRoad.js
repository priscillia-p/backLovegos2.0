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

//Création d'une nouvelle conversation
conversationRouter.post("/new-conversation", function(req, res,next){
    let participantsIds = req.body.participants;
    let participants = [];
    participantsIds.forEach(id => {
        user.findById(id,function(err, user){
            if(err) throw err;
            participants.push(user);
        });
    });

    let newConversation = new conversation();
    newConversation.participants = participants;
    let id = 0;

    conversation.count({}, function(err, count){
        if (err) throw err;
        id = count;
        newConversation._id = id + 1;
    }).then(
        function(){
            try{
                conversation.create(newConversation);
                return res.json({"success":"OK"});
            }catch(e){
                return res.json({"success":"NOPE"});
            }
            
        }
    )

});


module.exports = conversationRouter;