const mongoose = require('mongoose');

const firstSchema = new mongoose.Schema({
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
    image: {
        type: String,
        required: true,
        min:6,
        max:1024,
    },
    subitem: [{    
        item:{ type: String, required: true }
    }]
});

module.exports = mongoose.model('firstDetails', firstSchema);
