var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function () {
    var db = mongoose.connect(config.db);
    require('../models/UserSchema');
    require('../models/GameSchema');
    require('../models/TeamSchema');
    return db;
};
