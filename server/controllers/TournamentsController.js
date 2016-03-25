var mongoose = require('mongoose');

module.exports.controller = function (app, io) {

    app.use('/tournaments/create', function (req, res) {
        var Tournament = mongoose.model('Tournament');
        var trm = new Tournament(req.body);
        trm.save(function (err, trm) {
            res.send(trm);
        })
    });

    app.use('/tournaments/list', function (req, res) {
        var Tournament = mongoose.model('Tournament');
        Tournament.find(null, null, {
            skip: 0, // Starting Row
            limit: 10, // Ending Row
            sort:{
                date: -1 //Sort by Date Added DESC
            }
        }).populate('createdBy players').exec(function(err, trms) {
            res.send(trms);
        });
    });
};
