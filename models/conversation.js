var mongoose = require('mongoose');
var user = require('./utilisateur');
var message = require('./message');
var schema = mongoose.Schema;

var conversationSchema = mongoose.Schema({
    _id:{
        type:Number,
        required:false
    },
    titre:{
        type:String,
        required: false
    },
    participants: [{
        nom:{
            type: String
        },
        prenom: {
            type: String
        },
        photo: {
            type: String
        }
    }],
    messages:[{
        _id:{
            type: Number,
            required: false
        },
        contenu: {
            type: String,
            required: true
        },
        dateEnvoi: {
            type: Date,
            required: false
        },
        dateLecture: {
            type: String,
            required: false
        },
        auteur:{
            type: Object,
            required: true
        },
        conversationId:{
            type: Number,
            required: false
        }
    }]
});

var conversation = mongoose.model('conversation', conversationSchema);
module.exports = conversation;