var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var utilisateur = require('../models/utilisateur');

var userRouter = express.Router();



userRouter.get("/", function(req,res){
    res.json({"message":"Bienvenue sur user"});
});

userRouter.get("/all",function(req,res){
    utilisateur.find({}, function (err, users){
        if(err) throw err;
        res.json(users)
        console.log(users);
        
    });
});

userRouter.get("/student", function(req,res){
    utilisateur.find({"type_utilisateur":"Eleve","statutPremium":true}, function(err, students){
        if(err) throw err;
        res.json(students);
    });
});

userRouter.post("/authenticate", (req, res, next) => {
    let body = req.body;
    let response = {success: false};

    utilisateur.authenticate(body.username.trim(), body.password.trim(), (err, user) => {
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
})

module.exports = userRouter;