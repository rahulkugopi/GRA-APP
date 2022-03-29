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
    image:{ data:Buffer, contentType:String, fileName:String },
    buttonactive:{
        type: String,
        required: true,
        min:6,
        max:255 
    },
    buttonname: {
        type: String,
        min:6,
        max:255
    },
    buttonurl: {
        type: String,       
        min:6,
        max:255
    }
});

module.exports = mongoose.model('bannerDetails', bannerSchema);
