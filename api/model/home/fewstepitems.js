const mongoose = require('mongoose');

const fewstepItemsSchema = new mongoose.Schema({    
    gridheader:{
        type: String,
        required: true,
        min:6,
        max:255
    },
    gridcontent:{
        type: String,
        required: true,
        min:6,
        max:255
    },
    gridimage:{ data:Buffer, contentType:String, fileName:String }        
});

module.exports = mongoose.model('fewstepItemsDetails', fewstepItemsSchema);
