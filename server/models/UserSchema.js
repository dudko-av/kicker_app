var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    displayName: String,
    image: {type: String, 'default': 'http://icons.iconarchive.com/icons/femfoyou/angry-birds/1024/angry-bird-icon.png'},
    provider: String,
    providerId: String,
    games: {'type': Number, 'default': 0},
    wins: {'type': Number, 'default': 0},
    losses: {'type': Number, 'default': 0},
    bloodEnemy: String, // another userId
    bestComp: String, // another userId
    achievements: [{type: mongoose.Schema.Types.ObjectId, ref: 'Achievement'}]
});

module.exports = mongoose.model('User', UserSchema);
