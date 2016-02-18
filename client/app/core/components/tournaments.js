(function () {
    'use strict';

    angular
        .module('kicker_app')
        .component('tournaments', {
            templateUrl: 'app/core/views/tournaments.html',
            controller: 'TournamentsController'
        });

})();
