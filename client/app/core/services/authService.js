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

        authService.$inject = ['$q'];

        function authService($q) {
            var service = this;
            angular.extend(service, {
                login: login
            });

            function login(provider) {
                var deferred = $q.defer();
                //return $http.post('auth/' + provider);
                var authWindow = window.open('auth/' + provider);
                authWindow.onunload = function () {
                    debugger
                };
                return deferred.promise;
            }
        }
    }

})();
