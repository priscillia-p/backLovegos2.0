var express = require('express');
var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');
var elastic = require('elasticsearch');
var jwt = require('jsonwebtoken');
var utilisateur = require('../models/utilisateur');
var loves = require('../models/loves');
var userjs = require('./userRoad.js');

var tokens = userjs.tokens;

var recomRouter = express.Router();

recomRouter.get("/recommandations/:id", function(req, res){
    utilisateur.findById(req.params.id, function(err, user){
        if(err) throw err;
        
        console.log(user.genresRecherche.length)
        return user;
    }).then(
        function(user){
            let mustGenre;
            let matchMotif = "";
            let temp;
            let date = new Date();
            let dateMin = (date.getFullYear() - (user.trancheAgeRecherche[1])) + '-01-01';
            let dateMax = (date.getFullYear() - (user.trancheAgeRecherche[0])) + '-12-31';
            if(user.genresRecherche.length = 1){
                mustGenre = {"genre": user.genresRecherche[0]};
            }else{
                mustGenre = {"genresRecherche" : user.genre};
            }
            console.log(mustGenre);
            console.log(user.dateNaissance);
            console.log( date.getFullYear() - (user.trancheAgeRecherche[1]));
            console.log("nb motifs: " + user.motifs.length);
            console.log("oojppj" + ((user.motifs.length)- 1));
            for(var i = 0; i < user.motifs.length; i++){
                console.log("i : " + i)
                
                /*if(i == 0){
                    console.log(i);
                    console.log("i: " + i + ":  " + user.motifs[i]);
                    matchMotif = user.motifs[i]
                    console.log(temp);
                }else if((i < ((user.motifs.length)- 1)) && i != 0){
                    temp += ',' + JSON.stringify({'match': {"motifs": user.motifs[i]}});
                    console.log(temp);
                }*/
                if(i < ((user.motifs.length)- 1)){
                    matchMotif += user.motifs[i] + " OR ";
                }
                
                if(i = ((user.motifs.length)- 1)){
                    console.log(i);
                    console.log("i: " + i + ":  " + user.motifs[i]);
                    matchMotif += user.motifs[i];
                }
                    
                
            }
           
            console.log(matchMotif);


           
            utilisateur.esSearch({query:{
               bool:{
                   must: [
                       {match: mustGenre},
                       {
                           range: {
                               dateNaissance: {
                                   gte: dateMin,
                                   lte: dateMax
                               }
                           }
                       }
                   ],
                   should: [
                       {query_string: {
                           default_field: "motifs",
                           query: matchMotif
                       }}
                   ]
            }
            }
            },{hydrate: true}, function(err, result){
            //console.log(result.hits.hits);
            return res.json({"utilisateurs": result.hits.hits});
            });


            
        }
    )
});


module.exports = recomRouter;