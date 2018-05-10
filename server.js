var mongoose = require('mongoose');

var utilisateur = require('./models/utilisateur');

mongoose.connect('mongodb://localhost/logos_core');

utilisateur.find({}, function (err, users){
    if(err) throw err;

    console.log(users);
});