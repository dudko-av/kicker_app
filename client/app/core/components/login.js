(function () {
    'use strict';

    angular
        .module('kicker_app')
        .component('login', {
            templateUrl: 'app/core/views/login.html',
            controller: 'AuthController'
        });

})();
