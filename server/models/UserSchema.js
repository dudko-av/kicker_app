var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    displayName: String,
    image: {type: String, 'default': 'http://icons.iconarchive.com/icons/femfoyou/angry-birds/1024/angry-bird-icon.png'},
    provider: String,
    providerId: String,
    games: Number,
    wins: Number,
    losses: Number,
    bloodEnemy: String, // another userId
    bestComp: String, // another userId
    achievements: Array
});

module.exports = mongoose.model('User', UserSchema);
