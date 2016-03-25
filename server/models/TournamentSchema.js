var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CREATED = 1;
var READY = 2;
var ACTIVE = 3;
var FINISHED = 4;

var TournamentSchema = new Schema({
    date:       {'type': Date, 'default': Date.now},
    createdBy:  {'type': Schema.Types.ObjectId, ref: 'User'},
    name:       String,
    players:    [{
        lives: Number,
        player: {'type': Schema.Types.ObjectId, ref: 'User'}
    }],
    status:     {'type': Number, 'default': CREATED}
});

module.exports = mongoose.model('Tournament', TournamentSchema);
