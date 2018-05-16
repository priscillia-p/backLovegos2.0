var express = require('express');
var mongoose = require('mongoose');
var user = require('../models/utilisateur');
var chat = require('../models/chatMessage');
var tokens =require('./Token/token');

var chatRouter = express.Router();

//Chargement d'une conversation
chatRouter.get('/conversation/:id', function(req, res){
    chat.findById(req.params.id, function(err, conv){
        if(err) return res.json({"success":"Nope"});
    });
});

//Récupération de toutes les conversation de l'utilisateur
chatRouter.get("/conversations", function(req, res){
    let user = tokens.get(req.get("Auth-token"));
    chat.aggregate.match({"utilisateurs":{$in:[user._id]}}, function(err,convs){
        if(err) return res.json({"success" : "Nope"});
        let rooms = [];
        convs.forEach(c => {
            let co = {"id": c._id, "titre": c.titre};
            rooms.push(co);
        });

        return res.json(rooms);
    });
});

//Création d'une nouvelle conversation
chatRouter.post("/new-conversation", function(req,res){
    let participants = req.body.participants;
    let newChat = new chat();

    chat.count({}, function(err, count){
        if(err) return res.json({"success":"Nope"});
        newChat._id = count + 1;
        newChat.utilisateurs = participants;
        newChat.messages = [];
    }).then(
        function(){
            chat.create(newChat);
            return res.json({"success": "OK", "idConversation" : newChat._id});
        }
    )
});

//Envoi d'un message
chatRouter.post("/message", function(req, res){
    let message = {"message":{}};
    message.message.contenu = req.body.message.contenu;
    message.message.dateEnvoi = req.body.message.dateEnvoi;
    message.message.auteur = req.body.message.auteur;
    let conv;
    chat.findById(req.body.idConversation, function(err, c){
        if(err) return res.json({"success":"Nope"});
        conv = c;
    }).then(
        function(){
            conv.messages.push(message);
            chat.update({}, conv, function(err){
                if(err) return res.json({"success":"Nope"});
                return res.json({"success":"OK"});
            });
        }
    )
});