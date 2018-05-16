var mongoose = require('mongoose');

var ChatSchema = mongoose.Schema({
    _id:{
        type: Number,
        required: false
    },
    titre:{
        type: String,
        required: false
    },
    utilisateurs:[{
        type: Number
    }  
    ],
    messages:[{
        message:{
            contenu:{
                type: String
            },
            dateEnvoi:{
                type: Date
            },
            dateLecture:{
                type: Date
            },
            auteur:{
                type:Object
            }
        }
    }]
});

var chat = mongoose.model('conversations', ChatSchema);
module.exports = chat;