var express = require('express');
var mongoose = require('mongoose');
var loves = require('../models/loves');
var user = require('../models/utilisateur');
var async = require('async');

var loveRouter = express.Router();

loveRouter.get("/loves", function(req, res, next){
    let token = req.headers.Auth-token;
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