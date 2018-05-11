var mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    texteMessage: {
        type: String,
        required: true
    },
    heureEnvoi: {
        type: Date,
        required: true
    },
    expediteur: {
        type: String,
        required: true
    },
    conversationId:{
        type: Number,
        required: true
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

const Message = mongoose.model('message', MessageSchema);
module.exports = Message;