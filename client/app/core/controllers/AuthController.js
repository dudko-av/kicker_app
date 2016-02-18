(function () {
    'use strict';

    angular
        .module('kicker_app')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['$rootScope', '$state', 'auth'];

    function AuthController($rootScope, $state, auth) {
        var ctrl = this;
        angular.extend(ctrl, {
            login: login
        });

        function login(provider) {
            auth.login(provider).then(function (user) {
                $rootScope.user = user;
                $state.go('index');
            });
        }
    }

})();
