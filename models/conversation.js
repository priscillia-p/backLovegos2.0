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
    participants: {
       // type: Array,
        required: false
    },
    messages:{
        //type: Array,
        required: false
    },

});

var conversation = mongoose.model('conversation', conversationSchema);
module.exports = conversation;