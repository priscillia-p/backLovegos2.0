var mongoose = require('mongoose');
var schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    login: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    mail:{type: String,
        required: true,
        trim: true,
        unique: true},
    nom:{type: String,
        required: true,
        trim: true,
        unique: true},
    photo:{type: String,
        required: true,
        trim: true,
        unique: true},
    prenom:{type: String,
        required: true,
        trim: true,
        unique: true},
    premium:{type: String,
        required: true,
        trim: true,
        unique: true},
    password: {
        type: String,
        required: true
    }
});

var utilisateur = mongoose.model('utilisateur', UserSchema);

module.exports = utilisateur;