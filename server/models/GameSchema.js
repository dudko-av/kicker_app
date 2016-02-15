var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var teamSchema = mongoose.model('Team').schema;

var GameSchema = new Schema({
    commands: [teamSchema]
});

mongoose.model('Game', GameSchema);