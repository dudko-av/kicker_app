var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    mongoose = require('mongoose');

module.exports = function () {
    passport.use(new FacebookStrategy({
            clientID: '1685748595015872',
            clientSecret: '814621629100fd4ac9f2ca1ed54e1fad',
            callbackURL: 'http://localhost:3333/auth/facebook'
        }, function(accessToken, refreshToken, profile, done) {
            var User = mongoose.model('User');
            console.log(123123);
            done(null, profile);
        }
    ));
};

