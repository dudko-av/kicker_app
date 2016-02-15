(function () {
    'use strict';

    angular
        .module('kicker_app')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('', '');

        $stateProvider
            .state('login', {
                url: '/login',
                template: '<login></login>'
            });
    }

})();
