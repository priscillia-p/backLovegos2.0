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
        prenom:{
            type: String
        },
        photo:{
            type:String
        }
    }],
    messages:[ {
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
}
]
});

conversationSchema.statics.createConversation = function(participants,callback){
    console.log("new conv parts: " + participants);
    let newConversation = new conversation();
    let response = false;
    let id = 0;

    conversation.count({}, function(err, count){
        console.log("dans le count.......")
        if (err) console.log(err);
        id = count;
        newConversation._id = id + 1;
        newConversation.participants = participants;
    }).then(
        function(){
           
                if(newConversation._id != null){
                    console.log('new conv : ' + newConversation);
                    conversation.create(newConversation);
                    response = true;
                    
                }
                console.log("create conversation response : " + response);
                return callback(null,newConversation);
        }
    )

    //return response;
}

//var conversation = mongoose.model('conversations', conversationSchema);
//module.exports = conversation;