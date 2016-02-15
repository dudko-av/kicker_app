var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    userName: String,
    games: Number,
    wins: Number,
    losses: Number,
    bloodEnemy: String,//another userId
    bestComp: String,//another userId
    achievements: Array
});

mongoose.model('User', UserSchema);
