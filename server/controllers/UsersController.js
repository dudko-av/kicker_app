var User = require('mongoose').model('User');

module.exports.controller = function (app, io) {
    app.use('/users/profile/update', function (req, res) {
        if (!authorized(req, res)) return;
        User.findByIdAndUpdate(req.user._id, req.body, {new: true}, function (err, profile) {
            res.send(profile);
        });
    });

    app.post('/users/profile', function(req, res) {
        if (!authorized(req, res)) return;
        var User = mongoose.model('User');
        User.findById(req.body._id, function(err, user) {
            res.send(user);
        });

    });

    app.post('/users/profiles', function(req, res) {
        if (!authorized(req, res)) return;
        var playersIds = req.body;
        if (playersIds) {
            User.find({ _id : { $in: playersIds } }).exec(function (err, players) {
                res.send(players);
            });
        }


    });

    function authorized(req, res) {
        if (!req.user) res.sendStatus(401);
        return req.user ? true : false;
    }
};
