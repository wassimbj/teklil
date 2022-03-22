const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");//crypt password
const Schema=mongoose.Schema;
const baseOptions = {//client provider delevery =>user //heritage
    discriminatorKey: 'itemtype',
    collections: 'Users'
}
// Declare the Schema of the Mongo model
var UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
 
    trim: true,
  },
  adresse: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  tel: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
}, baseOptions, {timestamps: true})//heritage

 UserSchema.pre("save", function (next) { //crypt password
    this.password = bcrypt.hashSync(this.password, 10);
    next();
}) 
//Export the model
module.exports = mongoose.model("Users", UserSchema);
