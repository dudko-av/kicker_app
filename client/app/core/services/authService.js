(function () {
    'use strict';

    angular
        .module('kicker_app')
        .provider('auth', authProvider);

    function authProvider() {
        var provider = this;
        angular.extend(provider, {
            $get: ['$injector', function ($injector) {
                return $injector.instantiate(Service);
            }]
        });

        Service.$inject = ['$http'];

        function Service($http) {
            var service = this;
            angular.extend(service, {
                login: login
            });

            function login(provider) {
                return $http.post('auth/' + provider, {});
            }
        }
    }

})();