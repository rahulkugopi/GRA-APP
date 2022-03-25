const mongoose = require('mongoose');

const fewstepSchema = new mongoose.Schema({
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
    },
    grid: [{    
        gridheader:{ type: String, required: true },
        gridcontent:{ type: String, required: true },
        gridimage:{ type: String, required: true }    
    }]
});

module.exports = mongoose.model('fewstepDetails', fewstepSchema);
