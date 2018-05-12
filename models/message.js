var mongoose = require('mongoose');
var user = require('./utilisateur');
var schema = mongoose.Schema;

const MessageSchema = mongoose.Schema({
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
    idConversation:{
        type: Number,
        required: false
    }

});

MessageSchema.statics.addMessage = (message, callback) => {
    message.save(callback);
};

MessageSchema.statics.getMessages = (callback) => {
    Message.find({}, callback);
};
MessageSchema.statics.getMessageByConver = (id, callback) => {
    essage.find({conversation_id: id}, callback);
};

var Message = mongoose.model('message', MessageSchema);
module.exports = Message;