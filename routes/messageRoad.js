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
    newMessage.conversationId = req.body.conversationId;
    
    let id = 0;
    message.count({}, function(err, count){
        console.log("je suis ici 1...................")
        if (err) throw err;
        id = count;
        newMessage._id = id + 1;
        console.log("1 : " + newMessage);
    }).then(
        function(){
            try{
                console.log("je suis ici 2 ........................")
                message.create(newMessage).then(
                    function(){
                        console.log("le suis ici 3 ..........................;")
                        let conv;
                        conversation.findById(newMessage.conversationId, function(err, c){
                            if(err) throw err;
                            console.log("new messgae get conversation : " + c);
                            conv = c;
                        }).then(
                            function(){
                                console.log("je suis icic 4 ...............................")
                                conv.messages.push(newMessage);
                                conversation.update({},conv,function(err){
                                    if(err) return res.json({"success":"NOPE"});
                                    return  res.json({"success": "OK"});
                                });
                            }
                        );
                    }
                )
                
                //return newMessage;
            }catch(e){
                return res.json({"success":"NOPE"});
            }
        }
    );

   /* let conv;
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
    );*/
});

module.exports = messageRouter;