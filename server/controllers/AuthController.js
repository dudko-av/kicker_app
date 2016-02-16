var passport = require('passport');

module.exports.controller = function (app) {
    app.use('/auth/facebook',function(req, res, next) {
        passport.authenticate('facebook', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.redirect('/login'); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.redirect('/users/' + user.username);
            });
        })(req, res, next);
    });

    app.use('/auth/facebook/callback', function(req, res, next) {
        passport.authenticate('facebook', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.redirect('/login'); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.redirect('/users/' + user.username);
            });
        })(req, res, next);
    });

    app.use('/auth/twitter',function(req, res, next) {
        passport.authenticate('twitter', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.redirect('/login'); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.redirect('/users/' + user.username);
            });
        })(req, res, next);
    });


    // Twitter
    app.use('/auth/twitter/callback', function(req, res, next) {
        passport.authenticate('twitter', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.redirect('/login'); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.redirect('/users/' + user.username);
            });
        })(req, res, next);
    });

};
