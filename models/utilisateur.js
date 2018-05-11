var mongoose = require('mongoose');
var schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    type_utilisateur:{
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
    }
});

var utilisateur = mongoose.model('utilisateur', UserSchema);

module.exports = utilisateur;