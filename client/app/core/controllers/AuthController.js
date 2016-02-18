(function () {
    'use strict';

    angular
        .module('kicker_app')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['auth'];

    function AuthController(auth) {
        var ctrl = this;
        angular.extend(ctrl, {
            login: login
        });

        function login(provider) {
            auth.login(provider).then(function (res) {
                debugger
            });
        }
    }

})();
