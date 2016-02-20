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

        authService.$inject = ['$q', '$http', '$rootScope', '$state', 'socket'];

        function authService($q, $http, $rootScope, $state, socket) {
            var service = this;
            angular.extend(service, {
                login: login,
                logout: logout,
                user: user
            });

            function login(provider) {
                var deferred = $q.defer();
                window.open('/auth/' + provider + '?socketId=' + socket.client.id, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=50, left=50, width=599, height=599");
                socket.on('USER_AUTHENTICATED', function () {
                    user().then(function (user) {
                        deferred.resolve(user);
                    });
                });
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
