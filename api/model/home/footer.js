const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
    content1:{
        type: String,
        required: true,
        min:6,
        max:255
    },
    content2: {
        type: String,
        required: true,
        min:6,
        max:1024
    },
    content3: {
        type: String,
        required: true,
        min:6,
        max:1024
    },
    content4: {
        type: String,
        required: true,
        min:6,
        max:1024
    }
});

module.exports = mongoose.model('footerDetails', footerSchema);
