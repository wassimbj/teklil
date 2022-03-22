const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var SubCategorySchema = new mongoose.Schema({
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
    category: {//un seul
        type: mongoose.Schema.Types.ObjectID,
        ref:'Categorys'
    },
    products: {//un seul
        type: mongoose.Schema.Types.ObjectID,
        ref:'Prodcuts'
    }
},{timestamps: true})


//Export the model
module.exports = mongoose.model('SubCategorys', SubCategorySchema);