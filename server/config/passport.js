var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function () {
    var User = mongoose.model('User');

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        done(null, user.id);
    });

    require('./strategies/facebook')();
    require('./strategies/twitter')();

    return passport;
};
