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

        authService.$inject = ['$q', '$http', '$rootScope', '$state'];

        function authService($q, $http, $rootScope, $state) {
            var service = this;
            angular.extend(service, {
                login: login,
                logout: logout,
                user: user
            });

            function login(provider) {
                var deferred = $q.defer();
                var authWindow = window.open('auth/' + provider, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
                authWindow.onunload = function () {
                    user().then(function (user) {
                        deferred.resolve(user);
                    });
                };
                return deferred.promise;
            }

            function user() {
                return $http.get('auth/user').then(function (res) {
                    return res.data;
                });
            }

            function logout() {
                $rootScope.user = null;
                $state.go('login');
            }
        }


    }

})();
