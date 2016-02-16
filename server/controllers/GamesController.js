var mongoose = require('mongoose');
module.exports.controller = function (app) {

    /**
     * a home page route
     */
    app.get('/game/create', function (req, res) {
        var Game = mongoose.model('Game');
        var Team = mongoose.model('Team');
        var game = new Game({});
        var team1 = new Team({});
        var team2 = new Team({});

        team1.teamName = "Blue";
        team2.teamName = "Red";

        game.date = Date.now();
        game.teams = [team1, team2];
        // any logic goes here
        game.save( function( err ){
            if(!err){
                console.log('Game saved!');
            }
        });
        res.send(game);
    });

    app.post('/game/addTeam', function (req, res) {
        var Game = mongoose.model('Game');
        var game = Game.findById(req.body.gameId);
        // any logic goes here
        res.send(game);
    });

    app.post('/game/addPlayer', function (req, res) {
        var Game = mongoose.model('Game');
        var Team = mongoose.model('Team');
        var Player = mongoose.model('User');

        var game = Game.findById(req.body.gameId);
        var team = Team.findById(req.body.teamId);
        var player = Player.findById(req.body.playerId);
        team.players.add(player);
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
