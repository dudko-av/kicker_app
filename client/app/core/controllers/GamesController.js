(function () {
    'use strict';

    angular
        .module('kicker_app')
        .controller('GamesController', GamesController);

    GamesController.$inject = ['$injector', 'gamesService', 'socket'];

    function GamesController($injector, gamesService, socket) {
        var ctrl = this;
        angular.extend(ctrl, {
            create: create,
            addPlayer: addPlayer
        });

        init();

        function init() {
            gamesService.list().then(function (gamesList) {
                ctrl.gamesList = gamesList;
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
                        gamesService.create(game).then(function (res) {

                        });
                    }, function () {});
            }]);
        }

        function addPlayer(game) {
            gamesService.addPlayer(game).then(function (res) { debugger

            });
        }


    }

})();
