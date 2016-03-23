var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var AchievementSchema = new Schema({
    name: String,
    desc: String,
    img: String // what type to use?
});

module.exports = mongoose.model('Achievement', AchievementSchema);