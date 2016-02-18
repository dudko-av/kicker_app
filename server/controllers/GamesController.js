var mongoose = require('mongoose');

module.exports.controller = function (app, io) {

    app.post('/games/create', function (req, res) {
        var Game = mongoose.model('Game');
        var Team = mongoose.model('Team');
        var game = new Game({
            createdBy: req.user._id,
            players: [req.user._id],
            name: req.body.name
        });
        //var team1 = new Team({});
        //var team2 = new Team({});

        //team1.teamName = "Blue";
        //team2.teamName = "Red";

        //game.date = Date.now();
        //game.teams = [team1, team2];
        //// any logic goes here
        game.save(function (err) {
            if (!err) {
                io.emit('GAME_NEW', game);
                res.send(game);
            }
        });
    });

    app.post('/games/addTeam', function (req, res) {
        var Game = mongoose.model('Game');
        var game = Game.findById(req.body.gameId);
        // any logic goes here
        res.send(game);
    });

    app.post('/games/addPlayer', function (req, res) {
        var Game = mongoose.model('Game');
        Game.findById(req.body._id, function (err, game) {
            game.players.push(req.user._id);
            game.save(function (err, game) {
                io.emit('GAME_ADDED_PLAYER', game);
                res.send(game);
            });
        });
    });

    app.get('/games/addTeam', function (req, res) {
        var Game = mongoose.model('Game');
        var Team = mongoose.model('Team');
        var game = new Game({
            commands: [new Team(), new Team()]
        });
        game.save(function (err) {
            res.send(game);
        });
    });

    app.use('/games/list', function (req, res) {
        var Game = mongoose.model('Game');
        Game.find(null, null, {
            skip: 0, // Starting Row
            limit: 10, // Ending Row
            sort:{
                date: -1 //Sort by Date Added DESC
            }
        }).populate('createdBy').populate('players').exec(function(err, games) {
            res.send(games);
        });
    });

};
