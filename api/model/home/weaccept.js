const mongoose = require('mongoose');

const weacceptSchema = new mongoose.Schema({
    visible:{
        type: String,
        required: true,
        min:6,
        max:255
    },
    header:{
        type: String,
        required: true,
        min:6,
        max:255
    },    
    images: [{    
        images:{ type: String, required: true }
    }]
});

module.exports = mongoose.model('weacceptDetails', weacceptSchema);
