var mongoose = require('mongoose');

module.exports.controller = function (app, io) {

    app.post('/game/get', function(req, res) {
        var Game = mongoose.model('Game');
        Game.findById(req.body.id).exec(function (err, game) {
            res.send(game);
        });
    });

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
        Game.findById(req.body.game._id, function (err, game) {
            if (game.players.length < 4) game.players.push(req.body.playerId || req.user._id);
            if (game.players.length == 4) {
                var random = Math.floor(Math.random() * 3) + 1;
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
        if (!authorized(req, res)) return;
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

    app.use('/games/players', function (req, res) {
        if (!authorized(req, res)) return;
        var User = mongoose.model('User');
        User.find(function (err, players) {
            res.send(players);
        });
    });

    app.use('/games/randomPlayers', function (req, res) {
        if (!authorized(req, res)) return;
        var Game = mongoose.model('Game');
        var newTeams = randomPlayers(req.body.players);
        Game.findOneAndUpdate({'_id': req.body._id}, {teams: newTeams}, function (err, game) {
            Game.findById(req.body._id).populate('createdBy players teams.players').exec(function(err, game) {
                io.emit('GAME_UPDATE', game);
                res.send(game);
            });
        });
    });

    function randomPlayers(playersList) {
        var playersStack = playersList.map(function (item) { return item._id || item; });
        var newTeams = [];
        var random = function () {
            return playersStack.splice(Math.floor(Math.random() * playersStack.length), 1);
        };
        while (playersStack.length > 1) {
            newTeams.push({players: [random(), random()]});
        }
        return newTeams;
    }

    function randomPlayers2(playersList) {
        var playerMap = {};
        for (var i = 0; i < playersList.length; i++) {
            playerMap[Math.random()] = playersList[i];
        }
        var keyList = [];
        for (var key in playerMap) {
            keyList.push(key);
        }
        keyList.sort();
        var generatedTeams = [];
        for (var i = 0; i < Math.floor(keyList.length / 4); i++) {
            console.log('Team #' + i);
            var playerIndex = i * 4;
            console.log('   Player1: ' + playerMap[keyList[playerIndex]].displayName);
            console.log('   Player2: ' + playerMap[keyList[playerIndex+1]].displayName);
            console.log('   Player3: ' + playerMap[keyList[playerIndex+2]].displayName);
            console.log('   Player4: ' + playerMap[keyList[playerIndex+3]].displayName);

        }
    }

    function authorized(req, res) {
        if (!req.user) res.sendStatus(401);
        return req.user ? true : false;
    }

};
