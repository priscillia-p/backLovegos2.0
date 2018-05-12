var mongoose = require('mongoose');
var user = require('./utilisateur');
var schema = mongoose.Schema;

var lovesSchema = mongoose.Schema({
    _id:{
        type: Number,
        required: false
    },
    dateHeure:{
        type: Date,
        required: false
    },
    vu:{
        type: Boolean,
        required: false
    },
    idExp:{
        type: Number,
        required: false
    },
    idDest:{
        type: Number,
        required: false
    }
});

var love = mongoose.model('loves', lovesSchema);

module.exports = love;