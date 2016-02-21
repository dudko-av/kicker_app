var User = require('mongoose').model('User');

module.exports.controller = function (app, io) {
    app.use('/users/profile/update', function (req, res) {
        if (!authorized(req, res)) return;
        User.findByIdAndUpdate(req.user._id, req.body, {new: true}, function (err, profile) {
            res.send(profile);
        });
    });

    function authorized(req, res) {
        if (!req.user) res.sendStatus(401);
        return req.user ? true : false;
    }
};
