var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var userSchema = mongoose.model('User').schema;

var TeamSchema = new Schema({
    players: [userSchema]
});

mongoose.model('Team', TeamSchema);