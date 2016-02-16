(function () {
    'use strict';

    angular
        .module('kicker_app')
        .provider('auth', authProvider);

    authProvider.$inject = [];

    function authProvider() {
        var provider = this;
        angular.extend(provider, {
            $get: ['$injector', function ($injector) {
                return $injector.instantiate(authService);
            }]
        });

        authService.$inject = ['$http'];

        function authService($http) {
            var service = this;
            angular.extend(service, {
                login: login
            });

            function login(provider) {
                return $http.post('auth/' + provider);
            }
        }
    }

})();
