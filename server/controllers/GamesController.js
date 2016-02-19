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
            Game.findById(game._id).populate('createdBy players').exec(function (err, game) {
                io.emit('GAME_NEW', game);
                res.send(game);
            });
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
        var Team = mongoose.model('Team');
        Game.findById(req.body._id, function (err, game) {
            if (game.players.length < 4) game.players.push(req.user._id);
            if (game.players.length == 4) {
                var random = Math.floor(Math.random() * 3);
                var team2 = game.players.filter(function (item, index) {
                    return index !== 0 && index !== random;
                });
                game.teams = [
                    {players: [game.players[0], game.players[random]]},
                    {players: team2}
                ];
            }
            game.save(function (err, game) {
                Game.findById(game._id).populate('createdBy players teams.players').exec(function (err, game) {
                    io.emit('GAME_ADDED_PLAYER', game);
                    res.send(game);
                });
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
        }).populate('createdBy players teams.players').exec(function(err, games) {
            res.send(games);
        });
    });

    app.use('/games/addScore', function (req, res) {
        var Game = mongoose.model('Game');
        Game.findOne({'_id': req.body.gameId}, {'teams': {$elemMatch: {'_id': req.body.teamId}}})
            .populate('createdBy players teams.players')
            .exec(function (err, game) {
                game.teams[0].scores += 1;
                req.body.scores = game.teams[0].scores;
                Game.update(
                    {_id: req.body.gameId, "teams._id": req.body.teamId},
                    {$set: {"teams.$.scores": game.teams[0].scores}},
                    {upsert: true},
                    function (err, updated) {
                        io.emit('GAME_SCORED', req.body);
                        res.send(game);
                    }
                );
            });

    });

};
