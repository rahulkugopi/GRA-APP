const mongoose = require('mongoose');

const SecondItemsSchema = new mongoose.Schema({
    items:{
        type: String,
        required: true,
        min:6,
        max:255
    }
});

module.exports = mongoose.model('secondItemsDetails', SecondItemsSchema);
