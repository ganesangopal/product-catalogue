var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    emailAddress: String,
    password: String,
    salt: String,
    roles: Array
});
module.exports = mongoose.model('User', UserSchema);
