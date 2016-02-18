var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    displayName: String,
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
