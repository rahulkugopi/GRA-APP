const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
    visible:{
        type: String,
        required: true,
        min:6,
        max:255
    },
    items: [{    
        item:{ type: String, required: true }
    }]
});

module.exports = mongoose.model('footerDetails', footerSchema);
