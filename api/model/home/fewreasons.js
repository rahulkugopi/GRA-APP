const mongoose = require('mongoose');

const fewreasonsSchema = new mongoose.Schema({
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
    },
    grid: [{    
        gridheader:{ type: String, required: true },
        gridcontent:{ type: String, required: true },
        gridimage:{ type: String, required: true }    
    }]
});

module.exports = mongoose.model('fewreasonsDetails', fewreasonsSchema);
