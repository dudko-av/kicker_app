(function () {
    'use strict';

    angular
        .module('kicker_app')
        .service('tournamentsService', tournamentsService);

    tournamentsService.$inject = ['$injector'];

    function tournamentsService($injector) {
        var service = this;
        angular.extend(service, {
            create: create,
            list: list,
            addPlayer: addPlayer,
            addScore: addScore,
            randomPlayers: randomPlayers,
            players: players
        });

        function create(tournament) {
            return $injector.invoke(['$http', function ($http) {
                return $http.post('tournaments/create', tournament).then(function (res) {
                    return res.data;
                })
            }]);
        }

        function list() {
            return $injector.invoke(['$http', function ($http) {
                return $http.get('tournaments/list').then(function (res) {
                    return res.data;
                })
            }]);
        }

        function addPlayer(tournament) {
            return $injector.invoke(['$http', function ($http) {
                return $http.post('tournaments/addPlayer', tournament).then(function (res) {
                    return res.data;
                })
            }]);
        }

        function addScore(team) {
            return $injector.invoke(['$http', function ($http) {
                return $http.post('tournaments/addScore', team).then(function (res) {
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

        function randomPlayers(tournament) {
            return $injector.invoke(['$http', function ($http) {
                return $http.post('tournaments/randomPlayers', tournament).then(function (res) {
                    return res.data;
                })
            }]);
        }
    }

})();
