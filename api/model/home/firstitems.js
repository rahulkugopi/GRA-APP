const mongoose = require('mongoose');

const firstItemsSchema = new mongoose.Schema({
    items:{
        type: String,
        required: true,
        min:6,
        max:255
    }
});

module.exports = mongoose.model('firstItemsDetails', firstItemsSchema);
