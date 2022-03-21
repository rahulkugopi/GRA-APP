const mongoose = require('mongoose');

const secondSchema = new mongoose.Schema({
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
    subItem: {
        type: String,
        required: true,
        min:6,
        max:255
    }
});

module.exports = mongoose.model('secondDetails', secondSchema);
