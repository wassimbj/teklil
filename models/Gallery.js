const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var GallerySchema = new mongoose.Schema({
    image:{
        type:String,
        required:true,
        trim:true,
    },
    
});


//Export the model
module.exports = mongoose.model('Gallerys', GallerySchema);