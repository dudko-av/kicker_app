(function () {
    'use strict';

    angular
        .module('kicker_app')
        .controller('TournamentsController', TournamentsController);

    TournamentsController.$inject = ['$rootScope', '$injector', '$mdToast', 'tournamentsService', 'socket'];

    function TournamentsController($rootScope, $injector, $mdToast, tournamentsService, socket) {
        var ctrl = this;
        angular.extend(ctrl, {
            create: create
        });

        init();

        function init() {
            tournamentsService.list().then(function (gamesList) {
                ctrl.gamesList = gamesList;
            });
            tournamentsService.players().then(function (playersList) {
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
                    .then(function (game) { debugger
                        angular.extend(game || {}, {
                            createdBy: $rootScope.user._id,
                            players: [$rootScope.user._id],
                            date: new Date()
                        });
                        tournamentsService.create(game).then(function (res) {
                            showToast('Game created');
                        });
                    }, function () {});
            }]);
        }

        function addPlayer(game, playerId) {
            tournamentsService.addPlayer({game: game, playerId: playerId}).then(function (res) {
                showToast('Player added');
            });
        }
        addPlayer.show = function (game) {
            if (game.players.length === 4) return false;
            return !game.players.filter(function (user) {
                return $rootScope.user._id === user._id;
            }).length;
        };

        function addScore(gameId, teamId) {
            tournamentsService.addScore({gameId: gameId, teamId: teamId}).then(function (res) {});
        }

        function randomPlayers(game) {
            tournamentsService.randomPlayers(game).then(function (res) {
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
            var toastParent = angular.element('.toast-parent');
            toastParent.css({height: '60px'});
            $mdToast.show($mdToast.simple()
                    .textContent(message)
                    .parent(toastParent[0])
                    .hideDelay(700)
                    .position('top right')
            ).then(function () {
                    toastParent.css({height: 0});
                });
        }

    }

})();
