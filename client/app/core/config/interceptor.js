(function () {
    'use strict';

    angular
        .module('kicker_app')
        .config(config);

    config.$inject = ['$httpProvider'];

    function config($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }

})();
