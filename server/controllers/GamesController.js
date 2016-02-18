var mongoose = require('mongoose');
module.exports.controller = function (app) {

    /**
     * a home page route
     */
    app.get('/game/create', function (req, res) {
        var Game = mongoose.model('Game');
        var game = new Game({
            date: new Date()
        });
        // any logic goes here
        game.save(function(err) {
            if(!err){
                console.log('Game saved!');
            } else {
                res.send(game);
            }
        });
    });

    app.post('/game/addTeam', function (req, res) {
        var Game = mongoose.model('Game');
        var game = Game.findById(req.gameId);
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
