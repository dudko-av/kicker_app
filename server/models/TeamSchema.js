var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TeamSchema = new Schema({
    teamName: String,
    players: [{type: Schema.Types.ObjectId, ref: 'User'}],
    scores: {type: Number, 'default': 0}
});

module.exports = mongoose.model('Team', TeamSchema);