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
       // console.log(convs);
        let rooms = [];
        convs.forEach(c => {
           let co = {"id": c._id, "titre": c.titre};
           rooms.push(co);
        });
        console.log("rooms : " + rooms);
        res.json(rooms);
    });
});

//Création d'une nouvelle conversation
conversationRouter.post("/new-conversation", function(req, res,next){
    let participantsIds = req.body.participants;
    console.log('new conv id part : ' + participantsIds);
    let participants = [];
    let response;
    participantsIds.forEach(id => {
        console.log("new conv id part : " + id);
        user.findById(id,function(err, user){
            if(err) throw err;
            console.log("new conv user : " + user);
            console.log("new conv user nom : " + user.nom);
            console.log("new conv user prenom : " + user.prenom);
            console.log("new conv user photo : " + user.photo);
            let part = {"nom": user.nom, "prenom": user.prenom, "photo":user.photo};
            participants.push(part);
        })
    });
    setTimeout(function(){
        conversation.createConversation(participants,(err, conv) =>{
            console.log("yeahhhhhhhhhhhh");
            console.log(conv)
            return res.json({"success": "OK", "idConversation" : conv._id});
        });
        
    }, 3000);
    
    

});


module.exports = conversationRouter;