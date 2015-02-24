var mongoose = require('mongoose');
var Schema = mongoose.Schema;
   
 var UserSchema = new Schema({
    username: String,
    slackId: String,
    email: String,
    isAdmin: Boolean
});

module.exports = mongoose.model('User', UserSchema);