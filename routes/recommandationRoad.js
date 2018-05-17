var express = require('express');
var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');
var elastic = require('elasticsearch');
var jwt = require('jsonwebtoken');
var utilisateur = require('../models/utilisateur');
var loves = require('../models/loves');

var tokens =require('./Token/token');

var recomRouter = express.Router();

//Recommandation des utilisateurs corresppondant au critères de recherche de l'utilisateur
recomRouter.get("/recommandations", function(req, res){
    let user = tokens.get(req.get("Auth-token"));
    console.log("")
   
    let mustGenre;
    let matchMotif = "";
    let date = new Date();
    let dateMin = (date.getFullYear() - (user.trancheAgeRecherche[1])) + '-01-01';
    let dateMax = (date.getFullYear() - (user.trancheAgeRecherche[0])) + '-12-31';

    if(user.genresRecherches.length = 1){
        mustGenre = {"genre": user.genresRecherches[0]};
    }else{
         mustGenre = {"genresRecherche" : user.genre};
    }

    for(var i = 0; i < user.motif.length; i++){
        console.log("i : " + i)
        if(i < ((user.motif.length)- 1)){
            matchMotif += user.motif[i] + " OR ";
        }
                
        if(i = ((user.motif.length)- 1)){
            matchMotif += user.motif[i];
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
                },
                {
                    match:{
                        type:"eleveLovegos"
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
});


module.exports = recomRouter;