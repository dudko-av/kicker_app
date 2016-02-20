(function () {
    'use strict';

    angular
        .module('kicker_app')
        .service('gamesService', gamesService);

    gamesService.$inject = ['$injector'];

    function gamesService($injector) {
        var service = this;
        angular.extend(service, {
            create: create,
            list: list,
            addPlayer: addPlayer,
            addScore: addScore,
            players: players
        });

        function create(game) {
            return $injector.invoke(['$http', function ($http) {
                return $http.post('games/create', game).then(function (res) {
                    return res.data;
                })
            }]);
        }

        function list() {
            return $injector.invoke(['$http', function ($http) {
                return $http.get('games/list').then(function (res) {
                    return res.data;
                })
            }]);
        }

        function addPlayer(game) {
            return $injector.invoke(['$http', function ($http) {
                return $http.post('games/addPlayer', game).then(function (res) {
                    return res.data;
                })
            }]);
        }

        function addScore(team) {
            return $injector.invoke(['$http', function ($http) {
                return $http.post('games/addScore', team).then(function (res) {
                    return res.data;
                })
            }]);
        }

        function players() {
            return $injector.invoke(['$http', function ($http) {
                return $http.post('games/players', {}).then(function (res) {
                    return res.data;
                })
            }]);
        }
    }

})();
