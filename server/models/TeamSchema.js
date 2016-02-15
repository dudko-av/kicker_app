var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
require('./UserSchema');
var userSchema = mongoose.model('User').schema;

var TeamSchema = new Schema({
    players: [userSchema]
});

module.exports = mongoose.model('Team', TeamSchema);