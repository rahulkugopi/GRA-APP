const mongoose = require('mongoose');

const firstSchema = new mongoose.Schema({
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
    content: {
        type: String,
        required: true,
        min:6,
        max:1024
    },
    image:{ data:Buffer, contentType:String, fileName:String }    
});

module.exports = mongoose.model('firstDetails', firstSchema);
