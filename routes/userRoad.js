var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var utilisateur = require('../models/utilisateur');

var userRouter = express.Router();



userRouter.get("/", function(req,res){
    res.json({"message":"Bienvenue sur user"});
});

//Récupération de tous les utilisateurs
userRouter.get("/all",function(req,res){
    utilisateur.find({}, function (err, users){
        if(err) throw err;
        res.json(users)
        console.log(users);
        
    });
});

//Récupération des élèves lovegos
userRouter.get("/student", function(req,res){
    utilisateur.find({"type":"EleveLovegos"}, function(err, students){
        if(err) throw err;
        res.json(students);
    });
});

//authentification d'un user
userRouter.post("/authenticate", (req, res, next) => {
    let body = req.body;
    let response = {success: false};

    utilisateur.authenticate(body.login.trim(), body.password.trim(), (err, user) => {
        if(err) {
            response.msg = err.msg;
            res.json(response);
        } else {
            let signData = {
                id: user._id,
                username: user.username
            };
            let token = jwt.sign(signData, config.secret, {
                expiresIn: 604800
            })

            response.token = "JWT " + token;
            response.user = signData;
            response.success = true;
            response.msg = "User authentificated successfuly";
            
            res.json(response);

        }
    })
});

//récupération du profil d'un utilisateur par son profil
userRouter.get("/profil/:id", function(req,res,next){
    utilisateur.findById(req.params.id,function(err,user){
        if(err) throw err;
        res.json({'utilisateur': user});
    });
})

module.exports = userRouter;