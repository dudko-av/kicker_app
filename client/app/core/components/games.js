(function () {
    'use strict';

    angular
        .module('kicker_app')
        .component('games', {
            templateUrl: 'app/core/views/games.html',
            controller: 'GamesController'
        });

})();
