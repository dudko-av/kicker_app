var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

require('./TeamSchema');
var teamSchema = mongoose.model('Team').schema;

var GameSchema = new Schema({
    date: { type: Date, 'default': Date.now },
    teams: [teamSchema]
});

module.exports = mongoose.model('Game', GameSchema);
