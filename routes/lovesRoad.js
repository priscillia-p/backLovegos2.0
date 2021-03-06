var express = require('express');
var mongoose = require('mongoose');
var loves = require('../models/loves');
var utilisateur = require('../models/utilisateur');
var async = require('async');
var tokens =require('./Token/token');

var loveRouter = express.Router();

//Récupération de tous les loves de l'utilsateur connecté
loveRouter.get("/loves", function(req, res, next){
    let user = tokens.get(req.get("Auth-token"));
    loves.find({"idDest" : user._id}, function(err, allLoves){
        if(err) throw err;
        let loves = [];
        allLoves.forEach(l => {
            let lov = {
                "id": l._id,
                "dateHeure": l.dateHeure,
                "vu": l.vu
            }
            utilisateur.findById(l.idExp, function(err, u){
                if(err) console.log ("pas de expéditeur");
                lov.expediteur = {
                    "id": u._id,
                    "dateNaissance": u.dateNaissance,
                    "geoLoc": u.geoLoc,
                    "photo": u.photoUrl,
                    "nom": u.nom,
                    "prenom": u.prenom,
                    "motif": u.motif,
                    "trancheAgeRecherche": u.trancheAgeRecherche,
                    "genresRecherches": u.genresRecherches,
                    "presentation": u.presentation,
                    "genre": u.genre
                }
                loves.push(lov);
            });
        });
        res.json(loves);
    });
});

//Récupération des loves non lus
loveRouter.get("/loves-non-vus", function(req,res){
    let user = tokens.get(req.get("Auth-token"));
    loves.find({"idDest": user._id, "vu": false}, function(err, lovesNonVus){
        if(err) throw err;
        let loves = [];
        lovesNonVus.forEach(l => {
            let lov = {
                "id": l._id,
                "dateHeure": l.dateHeure,
                "vu": l.vu
            }
            utilisateur.findById(l.idExp, function(err, u){
                if(err) console.log ("pas de expéditeur");
                lov.expediteur = {
                    "id": u._id,
                    "dateNaissance": u.dateNaissance,
                    "geoLoc": u.geoLoc,
                    "photo": u.photoUrl,
                    "nom": u.nom,
                    "prenom": u.prenom,
                    "motif": u.motif,
                    "trancheAgeRecherche": u.trancheAgeRecherche,
                    "genresRecherches": u.genresRecherches,
                    "presentation": u.presentation,
                    "genre": u.genre
                }
                loves.push(lov);
            });
        });
        res.json(loves);
    });
});

//Envoi d'un love
loveRouter.post("/love", function(req, res, next){
    try{
        let love = new loves(req.body);
        let id = 0;
        console.log(love);
        loves.count({}, function(err, count){
            if(err) throw err;
            id = count;
            console.log(id);
            love._id = id + 1;
            console.log("apres" + love);
            return love;
        }).then(
            function(){
                console.log("then" + love);
                loves.create(love);
                return res.json({"success": "OK"});
            }

        )
       
    }catch(e){
        res.json({"success":"NOPE", "error": e});
    }
    
});

module.exports = loveRouter;