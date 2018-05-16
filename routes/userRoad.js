var express = require('express');
var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');
var jwt = require('jsonwebtoken');
var utilisateur = require('../models/utilisateur');

var userRouter = express.Router();

const tokens = new Map();



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
userRouter.post("/login", (req, res, next) => {
    let body = req.body;
    let response = {success: false};

    utilisateur.authenticate(body.login.trim(), body.password.trim(), (err, user) => {
        if(err) {
            response.msg = err.msg;
            res.json(response);
        } else {
          //  utilisateur.findOne({"login":body.login.trim(), "password":body.password.trim()}, function(err, user){
               // if(err) throw err;

                let signData = user;
                let token = jwt.sign(signData, "logosCore", {
                    expiresIn: 604800
                });
                tokens.set(token,user);
                response.token = "Token " + token;
                response.user = user;
                response.success = true;
                response.msg = "User authentificated successfuly";
                
                res.json(response);
           // });
            

        }
    });
});

//récupération du profil d'un utilisateur par son profil
userRouter.get("/profil/:id", function(req,res,next){
    utilisateur.findById(req.params.id,function(err,user){
        if(err) throw err;
        res.json({'utilisateur': user});
    });
});

userRouter.post("/add", function(req,res,next){
   let user = new utilisateur();
   user.type = req.body.type;
   user.login = req.body.login;
   user.mail = req.body.mail;
   user.nom = req.body.nom;
   user.photo = req.body.photo;
   user.prenom = req.body.prenom;
   user.password = req.body.password;
    user.motifs = req.body.motifs;
    user.trancheAgeRecherche = req.body.trancheAgeRecherche;
    user.genresRecherche = req.body.genresRecherche;
    user.genre = req.body.genre;
    user.presentation = req.body.presentation;

    utilisateur.count({}, function(err, count){
        if(err) throw err;
        console.log(count);
        user._id = count + 1;
        console.log(user._id)
    }).then(
        function(){
            utilisateur.create(user);
            res.json({"success" : "OK"});
        }
    )


});

userRouter.put("/:id", function(req, res, next){
    let user;
    utilisateur.findById(req.params.id, function(err,u){
        if(err) throw err;
        user = u;
        user.nom = "kiki";
        user.save(function(err, userupdate){
            if (err) throw err;
            return res.json({"utilisateur": user});
        });
    });
});


//Récupération de profil recommandé
userRouter.get("/recommandations/:id", function(req,res,next){
    let user;
    utilisateur.findById(req.params.id, function(err, u){
        if (err) throw err;
        console.log(u);
        user = u;
        console.log(user.dateNaissance);
    }).then(
        function(){
            let motif = user.motifs;
            let ageRecherche = user.trancheAgeRecherche;
            let genre = user.genresRecherche;
            console.log('recommandation - user ageRecherche : ' + ageRecherche);
            console.log('recommandation - birth year : ' + user.dateNaissance - ageRecherche[0]);
            console.log('recommandation - min year : ' + user.dateNaissance - ageRecherche[0]);
           /* try{
                utilisateur.esSearch({
                    bool:{
                        must:[
                            {match:{motifs:motif}},
                            {match:{trancheAgeRecherche:ageRecherche}},
                            {match:{genresRecherche:genre}}
                        ]
                    }
                }).then(function(results){
                    console.log(results);
                });
            }catch(e){
                console.log("error " + e);
            }*/
           
        }
    );
   
});

module.exports = userRouter;