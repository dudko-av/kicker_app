var passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    config = require('../config').twitter;

module.exports = function () {
    passport.use(new TwitterStrategy(config, function (token, tokenSecret, profile, done) {
            var User = require('mongoose').model('User');
            User.find({provider: 'twitter', providerId: profile.id}, function (err, user) {
                if (user.length) {
                    done(null, user[0]);
                } else {
                    var newUser = new User({
                        displayName: profile.username,
                        provider: profile.provider,
                        providerId: profile.id
                    });
                    newUser.save(function () {
                        done(null, newUser);
                    });
                }
            });
        }
    ));
};
