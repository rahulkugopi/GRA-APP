const mongoose = require('mongoose');

const weAcceptItemsSchema = new mongoose.Schema({
    items:{
        type: String,
        required: true,
        min:6,
        max:255
    }
});

module.exports = mongoose.model('weAcceptItemsDetails', weAcceptItemsSchema);
