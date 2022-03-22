const User =require('./User')
const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var DeliverySchema = new mongoose.Schema({
    num:{
        type:String,
        required:true,
        trim:true,
    }
    
})
User.discriminator('Deliverys',DeliverySchema)//heritage


//Export the model
module.exports = mongoose.model('Deliverys');