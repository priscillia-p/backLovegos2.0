var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');
var elasticsearch = require('../elastic');
var elastic = require('mongoose-elasticsearch-xp');
//var esClient = new mongoosastic.esClient({host:'localhost:9200'});
var schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    _id:{
        type: Number,
        required: false,
        es_indexed: true
    },
    dateNaissance:{
        type:Date,
        es_indexed:true
    },
    geoLoc:{
        geo_point: {
            type: String,
            es_type: 'geo_point',
            es_lat_lon: true,
            es_indexed:true
        },
        lat:{
            type: Number,
            es_indexed:true
        },
        long:{
            type: Number,
            es_indexed:true
        }
    },
    type:{
        type: String,
        required: true,
        trim: true,
        es_indexed: false
    },
    login: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        es_indexed: false
    },
    mail:{type: String,
        required: true,
        trim: true,
        es_indexed: false
    },
    nom:{
        type: String,
        required: true,
        trim: true,
        es_indexed: true
    },
    photo:{type: String,
        required: false,
        trim: true,
        es_indexed: true
    },
    prenom:{type: String,
        required: true,
        trim: true,
        es_indexed: true
    },
    statutPremium:{type: Boolean,
        required: false,
        trim: true,
        es_indexed: false
    },
    password: {
        type: String,
        required: true,
        es_indexed: false
    },
    motifs:[{
        type:String,
        required:false,
        es_indexed: true
    }],
    trancheAgeRecherche:[{
        type: Number,
        required:false,
        es_indexed: true
    }],
    genresRecherche:[{
        type:String,
        required: false,
        es_indexed: true
    }],
    genre:{
        type: String,
        required: true,
        es_indexed: true
    },
    presentation:{
        type: String,
        required: false,
        es_indexed: true
    }
});

UserSchema.methods.getUserById = function(id, callback) {
    utilisateur.findById(id, callback);
}

UserSchema.methods.getUserByUserName = function(username, callback) {
    let query = {username: username};
    utilisateur.findOne(query, callback);
}

UserSchema.methods.getUsers = () => {
    return utilisateur.find({}, function(err, users){
        if (err) throw err;
        console.log(users);
    });
}

UserSchema.statics.authenticate = function(username, password, callback) {
    utilisateur.getUserByUserName(username, (err, user) => {
        if (err) return callback({msg: "There was an error on getting the user"});
        if (!user) {
            let error = {msg: "Wrong username or password"};
            return callback(error);
        } else {
            bcryptjs.compare(password, user.password, (err, result) => {
                if (result == true) {
                    return callback(null, user);
                } else {
                    let error = {msg: "Wrong username or password"};
                    return callback(error);
                }
            });
        }
    });
};

//UserSchema.plugin(mongoosastic);
UserSchema.plugin(mongoosastic);
var utilisateur = mongoose.model('utilisateurs', UserSchema);
var stream = utilisateur.synchronize();
var count = 0;

utilisateur.createMapping(function(err, mapping) {
    if (err) {
      console.log('error creating mapping (you can safely ignore this)');
      console.log(err);
    } else {
      console.log('mapping created!');
      console.log(mapping);
    }
  });

stream.on('data', function(err, doc){
    count++;
});
stream.on('close', function(){
    console.log('indexed ' + count + ' documents!');
});
stream.on('error', function(err){
    console.log(err);
});


  


module.exports = utilisateur;