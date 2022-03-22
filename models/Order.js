const mongoose = require('mongoose'); // Erase if already required

const Schema = mongoose.Schema;
const ItemOrderProductSchema = new Schema({// schema in schema (more info date qte ...)
    product: {
        type: Schema.Types.ObjectID,
        ref: 'Products'
    },
    dateL: {
        type: String,
        trim: true,
        required: true
    },
    qte: {
        type: String,
        trim: true,
        required: true
    },
    color: {
        type: String,
        trim: true,
        required: true
    }
})
// Declare the Schema of the Mongo model
var OrderSchema = new mongoose.Schema({
    ref:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    priceTotal:{
        type:Number,
        required:true,
        trim:true,
    },
    dateOrder:{
        type:Date,
        required:true,
        trim:true,
    },
    QteTotal:{
        type:Number,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    products: [ItemOrderProductSchema],
    
    client:[{type:mongoose.Schema.Types.ObjectId,ref:'Clients'}]//get only id from client
    
},{timestamps: true});


//Export the model
module.exports = mongoose.model('Orders', OrderSchema);