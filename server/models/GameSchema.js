var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GameSchema = new Schema({
    commands: [CommandSchema]
});

mongoose.model('Game', GameSchema);