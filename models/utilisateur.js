var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');
var elastic = require('mongoose-elasticsearch-xp');
//var esClient = new mongoosastic.esClient({host:'localhost:9200'});
var schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    _id:{
        type: Number,
        required: false
    },
    type:{
        type: String,
        required: true,
        trim: true,
    },
    login: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    mail:{type: String,
        required: true,
        trim: true,},
    nom:{type: String,
        required: true,
        trim: true,},
    photo:{type: String,
        required: true,
        trim: true,},
    prenom:{type: String,
        required: true,
        trim: true,},
    statutPremium:{type: Boolean,
        required: true,
        trim: true,},
    password: {
        type: String,
        required: true
    },
    motifs:{
        type:Array,
        required:false
    },
    trancheAgeRecherche:{
        type:Array,
        required:false
    },
    genresRecherche:{
        type:Array,
        required: false
    },
    genre:{
        type: String,
        required: true
    },
    presentation:{
        type: String,
        required: false
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
UserSchema.plugin(elastic);
var utilisateur = mongoose.model('utilisateurs', UserSchema);
/*utilisateur.createMapping(function(err, mapping) {
    if (err) {
      console.log('error creating mapping (you can safely ignore this)');
      console.log(err);
    } else {
      console.log('mapping created!');
      console.log(mapping);
    }
  });*/



module.exports = utilisateur;