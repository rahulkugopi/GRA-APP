const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({   
    active:{
        type: String,
        required: true,
        min:6,
        max:255 
    },
    menu:{ 
        type: String,
        required: true,
        min:6,
        max:255 
    },
    filepath :{ 
        type: String,
        required: true,
        min:6,
        max:255 
    },
    filename :{ 
        type: String,
        required: true,
        min:6,
        max:255 
    },
    dropdownactive :{ 
        type: String,
        required: true,
        min:6,
        max:255 
    },
    dropdownname :{ 
        type: String,
        min:6,
        max:255 
    }

});

module.exports = mongoose.model('menuDetails', menuSchema);
