var mongoose = require('mongoose');

module.exports.controller = function (app, io) {

    app.post('/game/get', function(req, res) {
        if (!authorized(req, res)) return;
        var Game = mongoose.model('Game');
        Game.findById(req.body._id).populate('createdBy players teams.players').exec(function(err, games) {
            res.send(games);
        });
    });

    app.post('/games/create', function (req, res) {
        var Game = mongoose.model('Game');
        var Team = mongoose.model('Team');
        var game = new Game({
            createdBy: req.user._id,
            players: [req.user._id],
            teams : [new Team({players: [req.user._id]}), new Team()],
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
            Game.findById(game._id).populate('createdBy players teams.players').exec(function (err, game) {
                io.emit('GAME_NEW', game);
                res.send(game);
            });
        });
    });

    app.post('/games/update', function (req, res) {
        var Game = mongoose.model('Game');
        var game = req.body;

        Game.findByIdAndUpdate(req.body._id, game, function (err, game) {
            Game.findById(req.body._id).populate('createdBy players teams.players').exec(function(err, game) {
                io.emit('GAME_UPDATE', game);
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

    //TODO fix this shit
    app.post('/games/addPlayer', function (req, res) {
        var Game = mongoose.model('Game');
        var Team = mongoose.model('Team');
        Game.findById(req.body.game._id, function (err, game) {
            if (!game.teams.length) {
                game.teams = [new Team(), new Team()];
            }
            if (game.players.length < 4) game.players.push(req.body.playerId || req.user._id);
            if (game.players.length == 1) {
                game.teams = [
                    {players: [game.players[0]]}
                ]
            }
            if (game.players.length == 2) {
                game.teams[1].players.push(game.players[1]);
            }
            if (game.players.length == 3) {
                game.teams[0].players.push(game.players[2]);
            }
            if (game.players.length == 4) {
                game.status = 2;
                //var random = Math.floor(Math.random() * 3) + 1;
                //var team2 = game.players.filter(function (item, index) {
                //    return index !== 0 && index !== random;
                //});
                //game.teams = [
                //    {players: [game.players[0], game.players[random]]},
                //    {players: team2}
                //];
                game.teams[1].players.push(game.players[3]);
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

    // FIXME
    app.use('/games/addScore', function (req, res) {
        if (!authorized(req, res)) return;
        var Game = mongoose.model('Game');
        // Game.findOne({'_id': req.body.gameId}, {'teams': {$elemMatch: {'_id': req.body.teamId}}})
        Game.findById(req.body.gameId)
            .populate('createdBy players teams.players')
            .exec(function (err, game) {
                var scoredTeamIndex = 0;
                game.teams.forEach(function (team, index) {
                    if (team.id === req.body.teamId) {
                        scoredTeamIndex = index;
                        team.scores += 1;
                        if (team.scores === game.wins) {
                            game.status = 4;
                            // FIXME
                            team.players.forEach(function (pl) {
                                pl.wins += 1;
                                pl.save();
                            });
                            game.teams[index ? 0 : 1].players.forEach(function (pl) {
                                pl.losses += 1;
                                // FIXME
                                pl.save();
                            });
                        }
                    }
                });
                game.save(function (err) {
                    io.emit('GAME_UPDATE', game);
                    res.send(game);
                });
            });

    });

    app.use('/games/players', function (req, res) {
        if (!authorized(req, res)) return;
        var game  = req.body;
        getPlayersForGame(game, function (players) {
            res.send(players);
        });
    });

    /**
     * Getting players for game
     * Except that already in game
     * @param game
     */
    function getPlayersForGame(game, callback) {
        var Game = mongoose.model('Game');
        var User = mongoose.model('User');
        if (game._id) {
            Game.findById(game._id, function(err, game){
                var curPlayersId = game.players;
                User.find({ _id : { $nin: curPlayersId } }).exec(function (err, players) {
                    callback(players);
                });
            });
        } else {
            User.find(function (err, players) {
                callback(players);
            });
        }
    }

    app.use('/games/play', function (req, res) {
        if (!authorized(req, res)) return;
        var Game = mongoose.model('Game');
        Game.findOneAndUpdate({'_id': req.body._id}, {status: 3, wins: req.body.wins}, function (err, game) {
            Game.findById(req.body._id).populate('createdBy players teams.players').exec(function(err, game) {
                io.emit('GAME_UPDATE', game);
                res.send(game);
            });
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
