const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    image:{
        type:String,
        required:true,
        trim:true,
    },
    subCategory:[//plusieur []
        {
        type: mongoose.Schema.Types.ObjectID,
        ref:'SubCategorys'
    }
    ]
    
},{timestamps: true});


//Export the model
module.exports = mongoose.model('Categorys', CategorySchema);