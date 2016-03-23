var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

require('./TeamSchema');
var teamSchema = mongoose.model('Team').schema;

var CREATED = 1;
var READY = 2;
var ACTIVE = 3;
var FINISHED = 4;

var GameSchema = new Schema({
    date:       {'type': Date, 'default': Date.now},
    createdBy:  {'type': Schema.Types.ObjectId, ref: 'User'},
    name:       String,
    wins:       {'type': Number, 'default': 10},
    players:    [{'type': Schema.Types.ObjectId, ref: 'User'}],
    teams:      [teamSchema],
    status:     {'type': Number, 'default': CREATED}
});

module.exports = mongoose.model('Game', GameSchema);
