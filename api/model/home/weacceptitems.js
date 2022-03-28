const mongoose = require('mongoose');

const weAcceptItemsSchema = new mongoose.Schema({   
    images:{ data:Buffer, contentType:String, fileName:String }    
});

module.exports = mongoose.model('weAcceptItemsDetails', weAcceptItemsSchema);
