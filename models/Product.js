const mongoose = require('mongoose'); // Erase if already required


// Declare the Schema of the Mongo model
var ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        
        trim:true,
    },
    description:{
        type:String,
        
        trim:true,
    },
    price:{
        type:Number,
        
        trim:true,
    },
    refProduct:{
        type:String,
        
      
        trim:true,
    },
    qte:{
        type:Number,
        
        trim:true,
    },
    provider:{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Providers'
    },
    subCategory:{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'SubCategorys'
    },
    //galleries: [GallerySchema],
    orders:[{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Orders'
    }]
    
});


//Export the model
module.exports = mongoose.model('Products', ProductSchema);