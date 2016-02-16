var mongoose = require('mongoose');
module.exports.controller = function (app) {

    /**
     * a home page route
     */
    app.get('/game/create', function (req, res) {
        var Game = mongoose.model('Game');
        var game = new Game({});
        // any logic goes here
        res.send(game);
    });

    app.get('/game/addTeam', function (req, res) {
        var Game = mongoose.model('Game');
        var Team = mongoose.model('Team');
        var game = new Game({
            commands: [new Team(), new Team()]
        });
        game.save(function (err) {
            res.send(game);
        });
    });

    /**
     * About page route
     */
    app.get('/login', function (req, res) {
        // any logic goes here
        res.render('users/login')
    });

};
