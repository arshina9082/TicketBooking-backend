// const { times } = require('lodash');
// const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
var busSchema  =  new mongoose.Schema({
    title:{
        type: String
    },
    source:{
        type: String
    },
    dest:{
        type: String
    },
    time:{
        type: Number
    },
    date:{
        type: Date
    },
    fare:{
        type: Number
    }

});

mongoose.model('Bus', busSchema);