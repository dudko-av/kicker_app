var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    config = require('../config').facebook;

module.exports = function () {
    passport.use(new FacebookStrategy(config, function(accessToken, refreshToken, profile, done) {
            done(null, profile);
        }
    ));
};
