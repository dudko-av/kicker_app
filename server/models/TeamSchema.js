var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//require('./UserSchema');
//var userSchema = mongoose.model('User').schema;

var TeamSchema = new Schema({
    teamName: String,
    players: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Team', TeamSchema);