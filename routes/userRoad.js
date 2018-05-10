var express = require('express');
var mongoose = require('mongoose');
var utilisateur = require('../models/utilisateur');

var userRouter = express.Router();



userRouter.get("/", function(req,res){
    res.json({"message":"Bienvenue sur user"});
});

userRouter.get("/users",function(req,res){
    utilisateur.find({}, function (err, users){
        if(err) throw err;
        res.json(users)
        console.log(users);
        
    });
});

module.exports = userRouter;