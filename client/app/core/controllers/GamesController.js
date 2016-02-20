(function () {
    'use strict';

    angular
        .module('kicker_app')
        .controller('GamesController', GamesController);

    GamesController.$inject = ['$injector', '$mdToast', 'gamesService', 'socket'];

    function GamesController($injector, $mdToast, gamesService, socket) {
        var ctrl = this;
        angular.extend(ctrl, {
            create: create,
            addPlayer: addPlayer,
            addScore: addScore,
            randomPlayers: randomPlayers,
            showButton: showButton
        });

        init();

        function init() {
            gamesService.list().then(function (gamesList) {
                ctrl.gamesList = gamesList;
            });
            gamesService.players().then(function (playersList) {
                ctrl.playersList = playersList;
            });

            socket.on('GAME_NEW', function (game) {
                ctrl.gamesList.unshift(game);
            });

            socket.on('GAME_ADDED_PLAYER', function (game) {
                angular.forEach(ctrl.gamesList, function (item) {
                    if (item._id === game._id) {
                        angular.extend(item, game);
                    }
                });
            });

            socket.on('GAME_UPDATE', function (game) {
                angular.forEach(ctrl.gamesList, function (item) {
                    if (item._id === game._id) {
                        angular.extend(item, game);
                    }
                });
            });

            socket.on('GAME_SCORED', function (data) {
                angular.forEach(ctrl.gamesList, function (item) {
                    if (item._id === data.gameId) {
                        item.teams.map(function (team) {
                            if (team._id === data.teamId) {
                                team.scores = data.scores;
                            }
                            return team;
                        });
                    }
                });
            });
        }

        function create($event) {
            $injector.invoke(['$mdDialog', function ($mdDialog) {
                $mdDialog.show({
                        controller: ['$scope', '$mdDialog', function ($scope, $mdDialog) {
                            $scope.create = $mdDialog.hide;
                        }],
                        templateUrl: 'app/core/views/dialogs/game-create.html',
                        parent: angular.element(document.body),
                        targetEvent: $event,
                        clickOutsideToClose: true
                    })
                    .then(function (game) {
                        angular.extend(game || {}, {date: new Date()});
                        gamesService.create(game).then(function (res) {
                            showToast('Game created');
                        });
                    }, function () {});
            }]);
        }

        function addPlayer(game, playerId) {
            gamesService.addPlayer({game: game, playerId: playerId}).then(function (res) {
                showToast('Player added');
            });
        }

        function addScore(gameId, teamId) {
            gamesService.addScore({gameId: gameId, teamId: teamId}).then(function (res) {});
        }

        function randomPlayers(game) {
            gamesService.randomPlayers(game).then(function (res) {
                showToast('Players randomized');
            });
        }

        function showButton(name, game) {
            return $injector.invoke(['$rootScope', function ($rootScope) {
                switch (name) {
                    case 'addPlayer': return !game.players.filter(function (user) {
                        return $rootScope.user._id === user._id;
                    }).length;
                    break;
                }
            }]);
        }

        function showToast(message) {
            $mdToast.show($mdToast.simple()
                .textContent(message)
                .parent(angular.element('.toast-parent')[0])
                .hideDelay(700)
                .position('top right')
            );
        }
    }

})();
