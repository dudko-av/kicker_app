var passport = require('passport');

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
            return res.send(user);
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
            return res.send(user);
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
            return res.send(user);
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
            return res.send(user);
        })(req, res, next);
    });

    app.use('/managing-environment-variables', function(req, res, next) {
        res.send(process.env);
    });

};
