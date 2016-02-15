var config = require('./config'),
    mongoose = require('mongoose'),
    fs = require('fs');

module.exports = function () {
    var db = mongoose.connect(config.db);
    fs.readdirSync('./server/models').forEach(function (file) {
        require('../models/' + file);
    });
    return db;
};
