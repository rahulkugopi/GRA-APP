const mongoose = require('mongoose');

const weacceptSchema = new mongoose.Schema({
    header:{
        type: String,
        required: true,
        min:6,
        max:255
    },
    content: {
        type: String,
        required: true,
        min:6,
        max:1024
    },
    images: [{    
        images:{ type: String, required: true }
    }]
});

module.exports = mongoose.model('weacceptDetails', weacceptSchema);
