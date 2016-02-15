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

    /**
     * About page route
     */
    app.get('/login', function (req, res) {
        // any logic goes here
        res.render('users/login')
    });

};
