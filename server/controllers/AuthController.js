var passport = require('passport');
var mongoose = require('mongoose');

module.exports.controller = function (app, io) {
    app.use('/auth/user',function(req, res, next) {
        if (req.user) {
            res.send(req.user);
        } else {
            res.sendStatus(401);
        }
    });

    // Facebook
    app.use('/auth/facebook',function(req, res, next) {
        passport.authenticate('facebook', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.sendStatus(401); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                res.setHeader('content-type', 'application/javascript');
                return res.send('window.close()');
            });
            // return res.send(user);
        })(req, res, next);
    });

    app.use('/auth/facebook/callback', function(req, res, next) {
        passport.authenticate('facebook', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.sendStatus(401); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.send(user);
            });
            // return res.send(user);
        })(req, res, next);
    });

    // Twitter
    app.use('/auth/twitter',function(req, res, next) {
        passport.authenticate('twitter', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.sendStatus(401); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.send(user);
            });
            // return res.send(user);
        })(req, res, next);
    });

    app.use('/auth/twitter/callback', function(req, res, next) {
        passport.authenticate('twitter', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.sendStatus(401); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.send(user);
            });
            // return res.send(user);
        })(req, res, next);
    });

    app.use('/auth/android', function(req, res, next) {
        var profile = req.body;
        var User = require('mongoose').model('User');
        User.find({provider: profile.provider, providerId: profile.providerId}, function (err, user) {
            if (user.length) {
                // done(null, user[0]);
                req.logIn(user[0], function(err) {
                    if (err) { return next(err); }
                    return res.send(user);
                });
            } else {
                var newUser = new User(profile);
                newUser.save(function (err, user) {
                    // done(null, newUser);
                    req.logIn(user, function(err) {
                        if (err) { return next(err); }
                        return res.send(user);
                    });
                });
            }
        });
    });

    app.use('/managing-environment-variables', function(req, res, next) {
        res.send(process.env);
    });
};
