(function () {
    'use strict';

    angular
        .module('socket.io')
        .provider('socket', socketProvider);

    function socketProvider() {
        var provider = this;
        angular.extend(provider, {
            $get: ['$injector', function ($injector) {
                return $injector.instantiate(socketService);
            }]
        });
        var socket = io('http://localhost:3333');

        socketService.$inject = ['$q', '$rootScope'];

        function socketService($q, $rootScope) {
            var service = this;
            angular.extend(service, {
                on: on
            });

            function on(eventName, callback) {
                socket.on(eventName, function (data) {
                    $rootScope.$apply(function () {
                        callback(data);
                    });
                });
                return socket;
            }
        }
    }

})();
