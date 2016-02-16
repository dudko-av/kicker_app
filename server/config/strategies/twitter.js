var passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function () {
    passport.use(new TwitterStrategy({
            consumerKey: 'sKrTcP9bMAINWGBWUAsGLCmcL',
            consumerSecret: '2CyWwR7zP2Xt15eKuXAo2wUWZrwOOLEfyKKFcfhPgIuxRcsmOK',
            callbackURL: 'http://localhost:3333/oauth/twitter/callback'
        }, function(token, tokenSecret, profile, done) {
            //User.findOrCreate(..., function(err, user) {
            //    if (err) { return done(err); }
            //    done(null, user);
            //});
            done(null, profile);
        }
    ));
};
