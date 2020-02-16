var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  id : String,
  name: String,
  email: String,  
});
//Export model
module.exports = mongoose.model('User', UserSchema,'users');