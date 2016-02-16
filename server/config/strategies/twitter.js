var passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function () {
    passport.use(new TwitterStrategy({
            consumerKey: 'sKrTcP9bMAINWGBWUAsGLCmcL',
            consumerSecret: '2CyWwR7zP2Xt15eKuXAo2wUWZrwOOLEfyKKFcfhPgIuxRcsmOK',
            callbackURL: 'http://localhost:3333/auth/twitter/callback'
        }, function (token, tokenSecret, profile, done) {
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
