const mongoose = require('mongoose');

const fewreasonsSchema = new mongoose.Schema({
    visible:{
        type: String,
        required: true,
        min:6,
        max:255
    },
    mainheader:{
        type: String,
        required: true,
        min:6,
        max:255
    },
    maincontent:{
        type: String,
        required: true,
        min:6,
        max:255
    }   
});

module.exports = mongoose.model('fewreasonsDetails', fewreasonsSchema);
