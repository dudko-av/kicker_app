var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    userName: String
});

mongoose.model('User', UserSchema);
