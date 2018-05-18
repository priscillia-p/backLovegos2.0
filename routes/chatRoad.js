var express = require('express');
var mongoose = require('mongoose');
var user = require('../models/utilisateur');
var chat = require('../models/chatMessage');
var tokens =require('./Token/token');

var chatRouter = express.Router();

//Chargement d'une conversation
chatRouter.get('/conversation/:id', function(req, res){
    let conv;
    chat.findById(req.params.id, function(err, c){
        if(err) return res.json({"success":"Nope"});
        //return res.json(conv)
        conv = c;
    }).then(
        function(){
            let conversatioFound = {};
            console.log("conver foud : " + conv);
            conversatioFound.id = conv._id;
            conversatioFound.titre = conv.titre;
            //conversatioFound.messages = conv.messages;
            conversatioFound.messages = [];
            conv.messages.forEach(m => {
                console.log("message de la conversation : " + m);
                let msg = {"contenu": m.message.contenu, "dateEnvoi":m.message.dateEnvoi, "dateLecture": m.message.dateLecture};
                user.findById(m.message.auteur, function(err, aut){
                    console.log(aut);
                    if(err) console.log("pas d'auteur");
                    msg.auteur = {"nom":aut.nom, "prenom": aut.prenom, "photo": aut.photoUrl};
                });
                conversatioFound.messages.push(msg);
            });
            conversatioFound.participants = [];
           // console.log("conversation found : " + conv.utilisateurs)
            /*conv.utilisateurs.forEach(u => {
                user.findById(u._id, function(err,util){
                    let part = {"nom": util.nom, "prenom": util.prenom, "photo": util.photoUrl};
                    conversatioFound.participants.push(part);
                });
            });*/
            console.log("auteur des messages :" + conversatioFound.messages);
            user.findById(conv.utilisateurs[0], function(err, u1){
                let part = {"nom": u1.nom, "prenom": u1.prenom, "photo": u1.photoUrl};
                conversatioFound.participants.push(part);
            }).then(
                function(){
                    user.findById(conv.utilisateurs[1], function(err, u2){
                        let part = {"nom": u2.nom, "prenom": u2.prenom, "photo": u2.photoUrl};
                        conversatioFound.participants.push(part);
                        return res.json(conversatioFound);
                    });
                }
            )
            
            
        }
    )
});

//Récupération de toutes les conversation de l'utilisateur
chatRouter.get("/conversations", function(req, res){
    let user = tokens.get(req.get("Auth-token"));
    console.log("conversations de l'utilisateur")
    chat.aggregate([{"$match":{"utilisateurs":{"$in":[user._id]}}}], function(err, convs){
        if(err) return res.json({"success": "Nope"});
        let rooms = [];
        convs.forEach(c => {
            let co = {"id": c._id, "titre": c.titre};
            rooms.push(co);
        });
        console.log(rooms);
        return res.json(rooms);
    })
});

//Création d'une nouvelle conversation
chatRouter.post("/new-conversation", function(req,res){
    let participants = req.body.participants;
    let titre = req.body.titre;
    console.log("titre conversation : " + req.body.titre);
    let newChat = new chat();

    chat.count({}, function(err, count){
        if(err) return res.json({"success":"Nope"});
        console.log("new conv count : " + count);
        newChat._id = count + 2;
        newChat.utilisateurs = participants;
        newChat.titre = titre;
        newChat.messages = [];
        console.log("new conv : " + newChat);
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
        console.log("new message conv : " + c);
        conv = c;
    }).then(
        function(){
            conv.messages.push(message);
            console.log("new message conv avec messages : " + conv);
            chat.update({"_id":conv._id},conv, function(err){
                if(err) return res.json({"success":"Nope", "message":err});
                return res.json({"success":"OK"});
            });
        }
    )
});

module.exports = chatRouter;