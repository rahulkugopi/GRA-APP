const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({  
    items:{ type: String, required: true }
});

module.exports = mongoose.model('footerDetails', footerSchema);
