const User =require('./User')
const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var ClientSchema = new mongoose.Schema({
    adresseL:{
        type:String,
        required:true,
        trim:true,
    },
    orders:[{type: mongoose.Schema.Types.ObjectId, ref:"Orders"}]
    
})
User.discriminator('Clients',ClientSchema)//heritage


//Export the model
module.exports = mongoose.model('Clients');