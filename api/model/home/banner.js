const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    name:{
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
    buttonname: {
        type: String,
        required: true,
        min:6,
        max:255
    },
    buttonurl: {
        type: String,
        required: true,
        min:6,
        max:255
    }
});

module.exports = mongoose.model('bannerDetails', bannerSchema);
